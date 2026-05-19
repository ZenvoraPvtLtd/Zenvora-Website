import os
import smtplib
from email.message import EmailMessage

from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST") or os.getenv("EMAIL_HOST") or "smtp.gmail.com"
SMTP_PORT = int(os.getenv("SMTP_PORT") or os.getenv("EMAIL_PORT") or "587")
SMTP_USER = os.getenv("SMTP_USER") or os.getenv("EMAIL_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD") or os.getenv("EMAIL_PASSWORD")
SMTP_FROM = os.getenv("SMTP_FROM") or os.getenv("EMAIL_FROM") or SMTP_USER
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL") or SMTP_FROM


EMAIL_TOPICS = {
    "View Services": {
        "subject": "Zenvora Services Information",
        "body": """
Hi,

Here are Zenvora's core services:

- Cloud Architecture: AWS, Azure, GCP, migrations, cost optimization, reliability.
- AI & Machine Learning: LLMs, NLP, automation, MLOps, generative AI integrations.
- Product Engineering: React, Node.js, Flutter, web and mobile application development.
- Cybersecurity: assessments, penetration testing, compliance, monitoring.
- Data Engineering: pipelines, warehouses, analytics, dashboards.
- DevOps & Platform: CI/CD, Kubernetes, Docker, SRE practices.

You can reply to this email or contact the team to discuss your requirement.

Regards,
Zenvora Team
""",
    },
    "About Experts": {
        "subject": "Zenvora Experts Information",
        "body": """
Hi,

Zenvora has experts across MERN engineering, AI, cloud, cybersecurity, UX, and data engineering.

Featured experts include:

- Aarav Mehta: Principal MERN Architect
- Isha Rao: AI Product Specialist
- Kabir Soni: Cloud & DevOps Lead
- Naina Kapoor: Cybersecurity Consultant
- Reyansh Jain: UX Systems Designer
- Meera Shah: Data Engineering Lead

The team can help with architecture, development, automation, cloud, security, and consultation.

Regards,
Zenvora Team
""",
    },
    "Contact Team": {
        "subject": "Zenvora Contact Team Information",
        "body": """
Hi,

You can contact Zenvora through:

- Email: zenvorainfo.com@zenvorainfo.com
- Phone: +91 97551 25038
- WhatsApp: +91 97551 25038
- Office: 206, Sagun Arcade, Vijay Nagar, Indore, Madhya Pradesh

Business hours:
- Monday - Friday: 10:00 AM - 7:00 PM
- Saturday: 10:00 AM - 2:00 PM
- Sunday: Closed

Regards,
Zenvora Team
""",
    },
    "Company Information": {
        "subject": "Zenvora Company Information",
        "body": """
Hi,

Zenvora Infotech Pvt. Ltd. is a next-generation IT solutions company based in Indore.

The company delivers cloud infrastructure, AI systems, secure applications, product engineering, DevOps, and digital transformation services for businesses in India and beyond.

Highlights:
- 50+ happy clients
- 100+ projects delivered
- 98% satisfaction rate
- India-rooted, global-ready delivery

Regards,
Zenvora Team
""",
    },
}


def send_topic_email(to_email, topic):
    topic = resolve_topic(topic)

    if topic not in EMAIL_TOPICS:
        return False, "Please select a valid topic."

    if not SMTP_USER or not SMTP_PASSWORD or not SMTP_FROM:
        return False, "Email service is not configured. Please set SMTP_USER, SMTP_PASSWORD, and SMTP_FROM in chatbot-backend/.env."

    topic_content = EMAIL_TOPICS[topic]

    message = EmailMessage()
    message["Subject"] = topic_content["subject"]
    message["From"] = SMTP_FROM
    message["To"] = to_email
    message.set_content(topic_content["body"].strip())

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(message)
    except Exception as error:
        return False, f"Email could not be sent right now: {error}"

    return True, f"{topic} details have been sent to {to_email}."


def send_user_question_email(user_email, question):
    if not SMTP_USER or not SMTP_PASSWORD or not SMTP_FROM or not ADMIN_EMAIL:
        return False, "Email service is not configured. Please set SMTP_USER, SMTP_PASSWORD, SMTP_FROM, and ADMIN_EMAIL in chatbot-backend/.env."

    message = EmailMessage()
    message["Subject"] = "New chatbot question from Zenvora website"
    message["From"] = SMTP_FROM
    message["To"] = ADMIN_EMAIL
    message["Reply-To"] = user_email
    message.set_content(f"""
New question received from the chatbot.

User email:
{user_email}

Question:
{question}

Please reply directly to the user using the email above.
""".strip())

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(message)
    except Exception as error:
        return False, f"Question could not be emailed right now: {error}"

    return True, "Your question has been sent to our team. They will reply to you by email soon."


def resolve_topic(topic):
    normalized_topic = normalize_topic(topic)

    aliases = {
        "services": "View Services",
        "view services": "View Services",
        "service": "View Services",
        "about experts": "About Experts",
        "experts": "About Experts",
        "our experts": "About Experts",
        "expert": "About Experts",
        "contact team": "Contact Team",
        "contact": "Contact Team",
        "support": "Contact Team",
        "company information": "Company Information",
        "company": "Company Information",
        "about company": "Company Information",
    }

    for email_topic in EMAIL_TOPICS:
        if normalized_topic == normalize_topic(email_topic):
            return email_topic

    return aliases.get(normalized_topic, topic)


def normalize_topic(topic):
    return " ".join(str(topic).strip().lower().split())
