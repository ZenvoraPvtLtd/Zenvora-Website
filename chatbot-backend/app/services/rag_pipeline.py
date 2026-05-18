import os
import hashlib

from dotenv import load_dotenv

from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_community.vectorstores import FAISS

from langchain_google_genai import (
    GoogleGenerativeAIEmbeddings,
    ChatGoogleGenerativeAI
)

from langchain.chains import ConversationalRetrievalChain

from langchain.memory import ConversationBufferMemory

from app.services.scrapper import scrape_frontend

from app.services.prompts import SYSTEM_PROMPT

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_EMBEDDING_MODEL = os.getenv(
    "GEMINI_EMBEDDING_MODEL",
    "models/gemini-embedding-001"
)
GEMINI_CHAT_MODEL = os.getenv("GEMINI_CHAT_MODEL", "gemini-2.5-flash")
RAG_INDEX_DIR = os.getenv(
    "RAG_INDEX_DIR",
    os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "rag_index"))
)
RAG_SOURCE_HASH_FILE = os.path.join(RAG_INDEX_DIR, "source.sha256")

qa_chain = None
website_context = None


memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)


def build_rag():

    website_text = scrape_frontend()

    if not website_text.strip():
        raise RuntimeError(
            "No frontend content found for RAG. Check that frontend/src has readable files."
        )

    embeddings = GoogleGenerativeAIEmbeddings(
        model=GEMINI_EMBEDDING_MODEL,
        google_api_key=GEMINI_API_KEY
    )

    source_hash = hashlib.sha256(website_text.encode("utf-8")).hexdigest()

    if _has_fresh_index(source_hash):
        vectorstore = FAISS.load_local(
            RAG_INDEX_DIR,
            embeddings,
            allow_dangerous_deserialization=True
        )
    else:
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=12000,
            chunk_overlap=800
        )

        docs = splitter.create_documents([website_text])

        if not docs:
            raise RuntimeError("No RAG documents were created from the frontend content.")

        vectorstore = FAISS.from_documents(
            docs,
            embeddings
        )
        vectorstore.save_local(RAG_INDEX_DIR)
        _write_source_hash(source_hash)

    retriever = vectorstore.as_retriever()

    llm = ChatGoogleGenerativeAI(
        model=GEMINI_CHAT_MODEL,
        google_api_key=GEMINI_API_KEY,
        temperature=0.3
    )

    qa_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory
    )

    return qa_chain


def _has_fresh_index(source_hash):
    index_file = os.path.join(RAG_INDEX_DIR, "index.faiss")

    if not os.path.exists(index_file) or not os.path.exists(RAG_SOURCE_HASH_FILE):
        return False

    with open(RAG_SOURCE_HASH_FILE, "r", encoding="utf-8") as file:
        return file.read().strip() == source_hash


def _write_source_hash(source_hash):
    os.makedirs(RAG_INDEX_DIR, exist_ok=True)

    with open(RAG_SOURCE_HASH_FILE, "w", encoding="utf-8") as file:
        file.write(source_hash)


def get_qa_chain():
    global qa_chain

    if qa_chain is None:
        qa_chain = build_rag()

    return qa_chain


def answer_without_embeddings(user_message):
    context = get_website_context()

    llm = ChatGoogleGenerativeAI(
        model=GEMINI_CHAT_MODEL,
        google_api_key=GEMINI_API_KEY,
        temperature=0.3
    )

    prompt = f"""
{SYSTEM_PROMPT}

Website content:
{context[:50000]}

User question:
{user_message}

Answer the user based on the website content. Keep the answer helpful, concise, and in the same language style as the user.
"""

    response = llm.invoke(prompt)
    return response.content


def get_website_context():
    global website_context

    if website_context is None:
        website_context = scrape_frontend()

    return website_context


def answer_from_local_context(user_message):
    context = get_website_context()
    query_words = [
        word
        for word in user_message.lower().replace("?", " ").split()
        if len(word) > 3
    ]

    lines = [
        line.strip()
        for line in context.splitlines()
        if line.strip() and not line.strip().startswith(("import ", "export "))
    ]

    matches = [
        line
        for line in lines
        if any(word in line.lower() for word in query_words)
    ][:8]

    if matches:
        clean_matches = "\n".join(f"- {line}" for line in matches)
        return f"Is query se related website content mein yeh information mili:\n{clean_matches}"

    return "Is query se related exact information website content mein available nahi mili. Aap services, jobs, experts, company information ya contact ke baare mein pooch sakte hain."
