from fastapi import APIRouter

from pydantic import BaseModel

from app.services.rag_pipeline import qa_chain


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
    response = qa_chain.invoke({
        "question": user_message
    })

    return {

        "reply": response["answer"],

        "suggestions": [
            "Tell me about services",
            "How to apply for jobs?",
            "About company",
            "Contact support"
        ]
    }