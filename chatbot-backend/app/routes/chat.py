from fastapi import APIRouter

from pydantic import BaseModel

from langchain_google_genai._common import GoogleGenerativeAIError

from app.services.rag_pipeline import (
    answer_from_local_context,
    answer_without_embeddings,
    get_qa_chain
)


router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(req: ChatRequest):

    user_message = req.message.lower()

    # Greeting Logic
    if user_message in ["hi", "hello", "hey"]:

        return {
            "reply": """
Hello 👋 Welcome to Zenvora.

How can I help you today?
""",

            "options": [
                "View Services",
                "About Experts",
                "Contact Team",
                "Apply For Job",
                "Company Information"
            ],

            "suggestions": [
                "Tell me about services",
                "How to apply for jobs?",
                "Who are your experts?",
                "How can I contact support?"
            ]
        }

    # AI Response
    try:
        response = get_qa_chain().invoke({
            "question": user_message
        })
    except GoogleGenerativeAIError as error:
        error_text = str(error)

        if "429" in error_text or "quota" in error_text.lower():
            try:
                reply = answer_without_embeddings(user_message)
            except GoogleGenerativeAIError:
                reply = answer_from_local_context(user_message)

            return {
                "reply": reply,
                "suggestions": [
                    "Tell me about services",
                    "How to apply for jobs?",
                    "About company",
                    "Contact support"
                ]
            }

        raise

    return {

        "reply": response["answer"],

        "suggestions": [
            "Tell me about services",
            "How to apply for jobs?",
            "About company",
            "Contact support"
        ]
    }
