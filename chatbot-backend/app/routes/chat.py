import re

from fastapi import APIRouter

from pydantic import BaseModel

from langchain_google_genai._common import GoogleGenerativeAIError

from app.services.email_service import (
    EMAIL_TOPICS,
    send_topic_email,
    send_user_question_email
)

from app.services.rag_pipeline import (
    answer_from_local_context,
    answer_without_embeddings,
    get_qa_chain
)


router = APIRouter()

CONTACT_FAQS = [
    {
        "question": "How fast will your team respond?",
        "answer": "Most inquiries receive a response within one business day. Urgent project requests are prioritized.",
    },
    {
        "question": "Can I request a project estimate?",
        "answer": "Yes. Choose the relevant service, share your goals, and the team will follow up with next steps.",
    },
    {
        "question": "Do you support international clients?",
        "answer": "Yes. We can coordinate meetings and delivery across time zones for remote-first projects.",
    },
    {
        "question": "Is my information secure?",
        "answer": "Your inquiry is sent directly to the backend contact endpoint and stored for follow-up by the team.",
    },
]

EXPERTS = [
    {
        "id": 1,
        "name": "Aarav Mehta",
        "role": "Principal MERN Architect",
        "department": "Engineering",
        "experience": 9,
        "availability": "Available",
        "skills": ["React", "Node.js", "MongoDB", "System Design"],
        "bio": "Aarav leads complex MERN builds from architecture to launch, with a focus on performance, clean APIs, and maintainable delivery.",
        "certifications": ["AWS Solutions Architect", "MongoDB Developer", "React Performance Specialist"],
        "achievements": ["Scaled SaaS platform to 1M users", "Delivered 40+ production launches"],
        "techStack": ["React", "Node.js", "Express", "MongoDB", "Redis"],
        "projects": ["Enterprise CRM", "Fintech Dashboard", "Learning Platform"],
    },
    {
        "id": 2,
        "name": "Isha Rao",
        "role": "AI Product Specialist",
        "department": "AI",
        "experience": 7,
        "availability": "Booking",
        "skills": ["LLMs", "Python", "MLOps", "Automation"],
        "bio": "Isha designs intelligent workflows, AI assistants, and automation systems that connect business operations with modern language models.",
        "certifications": ["TensorFlow Developer", "Azure AI Engineer", "Prompt Engineering Expert"],
        "achievements": ["Built support AI reducing tickets by 38%", "Led 12 automation pilots"],
        "techStack": ["Python", "OpenAI", "LangChain", "TensorFlow", "FastAPI"],
        "projects": ["AI Support Bot", "Document Intelligence", "Lead Scoring Engine"],
    },
    {
        "id": 3,
        "name": "Kabir Soni",
        "role": "Cloud & DevOps Lead",
        "department": "Cloud",
        "experience": 10,
        "availability": "Available",
        "skills": ["AWS", "Docker", "Kubernetes", "CI/CD"],
        "bio": "Kabir builds reliable cloud infrastructure, deployment pipelines, and observability systems for high-availability products.",
        "certifications": ["AWS DevOps Professional", "Certified Kubernetes Administrator"],
        "achievements": ["Cut cloud spend by 32%", "Built zero-downtime release pipelines"],
        "techStack": ["AWS", "Kubernetes", "Docker", "Terraform", "GitHub Actions"],
        "projects": ["Cloud Migration", "Observability Platform", "SRE Playbooks"],
    },
    {
        "id": 4,
        "name": "Naina Kapoor",
        "role": "Cybersecurity Consultant",
        "department": "Security",
        "experience": 8,
        "availability": "Available",
        "skills": ["AppSec", "Threat Modeling", "SOC 2", "Audits"],
        "bio": "Naina helps teams ship safer products through security reviews, risk modeling, compliance guidance, and hands-on remediation.",
        "certifications": ["CEH", "ISO 27001 Lead Implementer", "SOC 2 Practitioner"],
        "achievements": ["Closed 240+ security findings", "Led audits for fintech products"],
        "techStack": ["OWASP", "Burp Suite", "SIEM", "Node Security", "Cloud IAM"],
        "projects": ["Fintech Security Review", "SOC 2 Readiness", "API Hardening"],
    },
    {
        "id": 5,
        "name": "Reyansh Jain",
        "role": "UX Systems Designer",
        "department": "Design",
        "experience": 6,
        "availability": "Booking",
        "skills": ["UX Strategy", "Design Systems", "Figma", "Research"],
        "bio": "Reyansh creates product experiences with structured design systems, accessible flows, and strong engineering handoff.",
        "certifications": ["Google UX Design", "Design Systems Professional"],
        "achievements": ["Improved onboarding conversion by 29%", "Built 4 enterprise design systems"],
        "techStack": ["Figma", "Framer", "Storybook", "Tailwind", "Accessibility"],
        "projects": ["SaaS Redesign", "Healthcare Portal", "Design System"],
    },
    {
        "id": 6,
        "name": "Meera Shah",
        "role": "Data Engineering Lead",
        "department": "Engineering",
        "experience": 8,
        "availability": "Available",
        "skills": ["Data Pipelines", "MongoDB", "Analytics", "ETL"],
        "bio": "Meera turns scattered business data into trusted pipelines, dashboards, and decision-ready analytics systems.",
        "certifications": ["MongoDB Associate", "Databricks Lakehouse Fundamentals"],
        "achievements": ["Processed 3B+ events monthly", "Reduced reporting time from days to minutes"],
        "techStack": ["MongoDB", "Python", "Kafka", "Spark", "Power BI"],
        "projects": ["Analytics Warehouse", "Real-time ETL", "Revenue Dashboard"],
    },
]


class ChatRequest(BaseModel):
    message: str


class EmailInfoRequest(BaseModel):
    email: str
    topic: str


class EmailQuestionRequest(BaseModel):
    email: str
    question: str


@router.post("/chat")
def chat(req: ChatRequest):

    user_message = req.message.lower()
    intent = detect_intent(user_message)
    matched_faq = find_matching_faq(user_message)
    matched_experts = find_matching_experts(user_message)

    if intent == "experts" or matched_experts:
        experts_to_show = matched_experts or EXPERTS[:3]

        return {
            "reply": format_expert_reply(experts_to_show),
            "intent": "experts",
            "page": "/experts",
            "experts": experts_to_show,
            "suggestions": [
                "Show AI experts",
                "Show cloud experts",
                "Book consultation"
            ]
        }

    if intent == "services":
        return intent_response(
            "services",
            "Zenvora can help with AI automation, cloud architecture, product engineering, cybersecurity, data engineering, and DevOps. For AI automation, our team can build workflows, AI assistants, LLM integrations, and business process automation.",
            "/services",
            ["AI automation", "Cloud solutions", "Product engineering", "Contact team"]
        )

    if intent == "contact":
        return intent_response(
            "contact",
            "You can contact Zenvora by email, phone, WhatsApp, or the contact form. The team usually responds within one business day.",
            "/contact",
            ["Send my question by email", "Contact Team", "Request estimate"]
        )

    if intent == "company":
        return intent_response(
            "company",
            "Zenvora Infotech Pvt. Ltd. is an Indore-based IT solutions company delivering cloud, AI, secure applications, product engineering, DevOps, and digital transformation services.",
            "/about",
            ["View Services", "About Experts", "Contact Team"]
        )

    if intent == "jobs":
        return intent_response(
            "jobs",
            "Great, you can apply from the Careers page. Open it, choose the role or internship track that fits you, and submit your details there. Our hiring team will review your application and get back to you.",
            "/careers",
            ["Open Careers", "How to apply for jobs?", "Contact Team"]
        )

    if is_faq_list_request(user_message):
        return {
            "reply": "Here are the frequently asked questions:",
            "faqs": CONTACT_FAQS,
            "suggestions": [
                "Tell me about services",
                "About experts",
                "Contact support"
            ]
        }

    if matched_faq:
        return {
            "reply": matched_faq["answer"],
            "suggestions": [
                "Tell me about services",
                "How to apply for jobs?",
                "Contact support"
            ]
        }

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


def intent_response(intent, reply, page, suggestions):
    page_titles = {
        "services": "Services",
        "contact": "Contact",
        "company": "About Zenvora",
        "jobs": "Careers",
    }

    action_labels = {
        "services": "View services",
        "contact": "Contact team",
        "company": "About company",
        "jobs": "Open Careers page",
    }

    return {
        "reply": reply,
        "intent": intent,
        "page": page,
        "pageTitle": page_titles.get(intent, "Open page"),
        "actionLabel": action_labels.get(intent, "Open page"),
        "suggestions": suggestions
    }


@router.get("/faqs")
def get_faqs():

    return {
        "faqs": CONTACT_FAQS
    }


@router.get("/experts")
def get_experts():

    return {
        "experts": EXPERTS
    }


@router.get("/email-topics")
def get_email_topics():

    return {
        "topics": list(EMAIL_TOPICS.keys())
    }


@router.post("/email-info")
def email_info(req: EmailInfoRequest):
    if not is_valid_email(req.email):
        return {
            "success": False,
            "reply": "Please enter a valid email address."
        }

    success, message = send_topic_email(req.email, req.topic)

    return {
        "success": success,
        "reply": message
    }


@router.post("/email-question")
def email_question(req: EmailQuestionRequest):
    if not is_valid_email(req.email):
        return {
            "success": False,
            "reply": "Please enter a valid email address."
        }

    if len(req.question.strip()) < 5:
        return {
            "success": False,
            "reply": "Please enter your question before sending."
        }

    success, message = send_user_question_email(req.email, req.question.strip())

    return {
        "success": success,
        "reply": message
    }


def is_valid_email(email):
    return re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email.strip()) is not None


def detect_intent(user_message):
    normalized_message = normalize_text(user_message)
    message_words = set(normalized_message.split())

    intent_keywords = {
        "experts": {
            "expert",
            "experts",
            "specialist",
            "consultant",
            "developer",
            "engineer",
            "architect",
            "team",
            "mern",
            "cloud",
            "devops",
            "security",
            "cybersecurity",
            "design",
            "data",
        },
        "services": {
            "service",
            "services",
            "solution",
            "solutions",
            "automation",
            "automate",
            "ai",
            "artificial",
            "machine",
            "learning",
            "ml",
            "llm",
            "chatbot",
            "cloud",
            "aws",
            "azure",
            "gcp",
            "website",
            "web",
            "app",
            "application",
            "software",
            "development",
            "devops",
            "cybersecurity",
            "security",
            "data",
            "analytics",
            "pipeline",
            "collab",
            "collaboration",
            "project",
            "build",
        },
        "contact": {
            "contact",
            "call",
            "email",
            "mail",
            "whatsapp",
            "phone",
            "support",
            "reach",
            "talk",
            "connect",
            "meeting",
            "consultation",
            "estimate",
            "quote",
            "pricing",
        },
        "company": {
            "company",
            "about",
            "zenvora",
            "mission",
            "vision",
            "who",
            "story",
            "information",
        },
        "jobs": {
            "job",
            "jobs",
            "career",
            "careers",
            "internship",
            "apply",
            "hiring",
            "vacancy",
            "opening",
        },
    }

    scores = {
        intent: len(message_words & keywords)
        for intent, keywords in intent_keywords.items()
    }

    if "ai automation" in normalized_message:
        scores["services"] += 3

    if "about expert" in normalized_message or "about experts" in normalized_message:
        scores["experts"] += 4

    if "our expert" in normalized_message or "our experts" in normalized_message:
        scores["experts"] += 4

    if "project estimate" in normalized_message or "request estimate" in normalized_message:
        scores["contact"] += 2

    best_intent = max(scores, key=scores.get)

    if scores[best_intent] == 0:
        return None

    return best_intent


def find_matching_faq(user_message):
    normalized_message = normalize_text(user_message)

    for faq in CONTACT_FAQS:
        normalized_question = normalize_text(faq["question"])

        if normalized_message == normalized_question:
            return faq

        question_words = {
            word
            for word in normalized_question.split()
            if len(word) > 3
        }
        message_words = set(normalized_message.split())

        if question_words and len(question_words & message_words) >= 2:
            return faq

    return None


def is_faq_list_request(user_message):
    message_words = set(normalize_text(user_message).split())
    return bool(message_words & {"faq", "faqs", "question", "questions"})


def normalize_text(text):
    return "".join(
        char.lower() if char.isalnum() else " "
        for char in text
    ).strip()


def find_matching_experts(user_message):
    normalized_message = normalize_text(user_message)

    expert_keywords = {
        "expert",
        "experts",
        "specialist",
        "consultant",
        "developer",
        "engineer",
        "architect",
        "mern",
        "ai",
        "cloud",
        "devops",
        "security",
        "cybersecurity",
        "design",
        "data",
    }
    message_words = set(normalized_message.split())

    matched = []

    for expert in EXPERTS:
        searchable_text = normalize_text(
            " ".join([
                expert["name"],
                expert["role"],
                expert["department"],
                " ".join(expert["skills"]),
                " ".join(expert["techStack"]),
                expert["bio"],
            ])
        )
        expert_words = set(searchable_text.split())

        if message_words & expert_words:
            matched.append(expert)

    if matched:
        return matched[:3]

    if message_words & expert_keywords:
        return EXPERTS[:3]

    return []


def format_expert_reply(experts):
    lines = ["Here are the most relevant Zenvora experts:"]

    for expert in experts:
        skills = ", ".join(expert["skills"])
        lines.append(
            f"{expert['name']} - {expert['role']} ({expert['experience']}+ years, {expert['availability']}). Skills: {skills}. {expert['bio']}"
        )

    return "\n".join(lines)
