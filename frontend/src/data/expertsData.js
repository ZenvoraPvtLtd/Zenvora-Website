import {
  FaAws,
  FaDocker,
  FaGithub,
  FaLinkedinIn,
  FaNodeJs,
  FaPython,
  FaReact,
  FaXTwitter,
} from "react-icons/fa6";
import { SiKubernetes, SiMongodb, SiOpenai, SiTensorflow } from "react-icons/si";

const avatar = (name, from, to) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${from}"/>
          <stop offset="1" stop-color="${to}"/>
        </linearGradient>
      </defs>
      <rect width="220" height="220" rx="34" fill="#020617"/>
      <circle cx="160" cy="42" r="70" fill="url(#g)" opacity=".35"/>
      <circle cx="66" cy="170" r="82" fill="url(#g)" opacity=".24"/>
      <circle cx="110" cy="82" r="38" fill="url(#g)"/>
      <path d="M45 188c12-47 42-72 65-72s53 25 65 72" fill="url(#g)"/>
      <text x="110" y="205" text-anchor="middle" fill="white" font-size="20" font-family="Arial" font-weight="700">${name}</text>
    </svg>
  `)}`;

export const teams = ["All", "Engineering", "AI", "Cloud", "Security", "Design"];

export const experts = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Principal MERN Architect",
    department: "Engineering",
    experience: 9,
    availability: "Available",
    image: avatar("AM", "#22d3ee", "#2563eb"),
    skills: ["React", "Node.js", "MongoDB", "System Design"],
    bio: "Aarav leads complex MERN builds from architecture to launch, with a focus on performance, clean APIs, and maintainable delivery.",
    certifications: ["AWS Solutions Architect", "MongoDB Developer", "React Performance Specialist"],
    achievements: ["Scaled SaaS platform to 1M users", "Delivered 40+ production launches"],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Redis"],
    projects: ["Enterprise CRM", "Fintech Dashboard", "Learning Platform"],
    timeline: ["2016 Frontend Engineer", "2019 Full-stack Lead", "2023 Principal Architect"],
    socials: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: 2,
    name: "Isha Rao",
    role: "AI Product Specialist",
    department: "AI",
    experience: 7,
    availability: "Booking",
    image: avatar("IR", "#38bdf8", "#7c3aed"),
    skills: ["LLMs", "Python", "MLOps", "Automation"],
    bio: "Isha designs intelligent workflows, AI assistants, and automation systems that connect business operations with modern language models.",
    certifications: ["TensorFlow Developer", "Azure AI Engineer", "Prompt Engineering Expert"],
    achievements: ["Built support AI reducing tickets by 38%", "Led 12 automation pilots"],
    techStack: ["Python", "OpenAI", "LangChain", "TensorFlow", "FastAPI"],
    projects: ["AI Support Bot", "Document Intelligence", "Lead Scoring Engine"],
    timeline: ["2017 Data Analyst", "2020 ML Engineer", "2024 AI Product Specialist"],
    socials: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: 3,
    name: "Kabir Soni",
    role: "Cloud & DevOps Lead",
    department: "Cloud",
    experience: 10,
    availability: "Available",
    image: avatar("KS", "#0ea5e9", "#14b8a6"),
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    bio: "Kabir builds reliable cloud infrastructure, deployment pipelines, and observability systems for high-availability products.",
    certifications: ["AWS DevOps Professional", "Certified Kubernetes Administrator"],
    achievements: ["Cut cloud spend by 32%", "Built zero-downtime release pipelines"],
    techStack: ["AWS", "Kubernetes", "Docker", "Terraform", "GitHub Actions"],
    projects: ["Cloud Migration", "Observability Platform", "SRE Playbooks"],
    timeline: ["2014 Linux Admin", "2018 DevOps Engineer", "2022 Cloud Lead"],
    socials: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: 4,
    name: "Naina Kapoor",
    role: "Cybersecurity Consultant",
    department: "Security",
    experience: 8,
    availability: "Available",
    image: avatar("NK", "#06b6d4", "#1d4ed8"),
    skills: ["AppSec", "Threat Modeling", "SOC 2", "Audits"],
    bio: "Naina helps teams ship safer products through security reviews, risk modeling, compliance guidance, and hands-on remediation.",
    certifications: ["CEH", "ISO 27001 Lead Implementer", "SOC 2 Practitioner"],
    achievements: ["Closed 240+ security findings", "Led audits for fintech products"],
    techStack: ["OWASP", "Burp Suite", "SIEM", "Node Security", "Cloud IAM"],
    projects: ["Fintech Security Review", "SOC 2 Readiness", "API Hardening"],
    timeline: ["2016 Security Analyst", "2019 AppSec Engineer", "2023 Security Consultant"],
    socials: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: 5,
    name: "Reyansh Jain",
    role: "UX Systems Designer",
    department: "Design",
    experience: 6,
    availability: "Booking",
    image: avatar("RJ", "#67e8f9", "#2563eb"),
    skills: ["UX Strategy", "Design Systems", "Figma", "Research"],
    bio: "Reyansh creates product experiences with structured design systems, accessible flows, and strong engineering handoff.",
    certifications: ["Google UX Design", "Design Systems Professional"],
    achievements: ["Improved onboarding conversion by 29%", "Built 4 enterprise design systems"],
    techStack: ["Figma", "Framer", "Storybook", "Tailwind", "Accessibility"],
    projects: ["SaaS Redesign", "Healthcare Portal", "Design System"],
    timeline: ["2018 UI Designer", "2020 Product Designer", "2024 UX Systems Designer"],
    socials: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: 6,
    name: "Meera Shah",
    role: "Data Engineering Lead",
    department: "Engineering",
    experience: 8,
    availability: "Available",
    image: avatar("MS", "#38bdf8", "#0891b2"),
    skills: ["Data Pipelines", "MongoDB", "Analytics", "ETL"],
    bio: "Meera turns scattered business data into trusted pipelines, dashboards, and decision-ready analytics systems.",
    certifications: ["MongoDB Associate", "Databricks Lakehouse Fundamentals"],
    achievements: ["Processed 3B+ events monthly", "Reduced reporting time from days to minutes"],
    techStack: ["MongoDB", "Python", "Kafka", "Spark", "Power BI"],
    projects: ["Analytics Warehouse", "Real-time ETL", "Revenue Dashboard"],
    timeline: ["2017 BI Developer", "2020 Data Engineer", "2023 Data Lead"],
    socials: { linkedin: "#", github: "#", twitter: "#" },
  },
];

export const stats = [
  { label: "Certified Experts", value: 42 },
  { label: "Projects Delivered", value: 120 },
  { label: "Avg. Experience", value: 8 },
  { label: "Client Rating", value: 98, suffix: "%" },
];

export const technologies = [
  { name: "React", icon: FaReact },
  { name: "Node.js", icon: FaNodeJs },
  { name: "MongoDB", icon: SiMongodb },
  { name: "AWS", icon: FaAws },
  { name: "Docker", icon: FaDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "Python", icon: FaPython },
  { name: "OpenAI", icon: SiOpenai },
  { name: "TensorFlow", icon: SiTensorflow },
];

export const testimonials = [
  {
    quote: "Zenvora's experts understood the architecture challenge quickly and helped us ship a stable platform in record time.",
    name: "Priya N.",
    role: "Founder, SaaS Startup",
  },
  {
    quote: "Their cloud and security guidance saved us weeks of trial and error. The team felt senior from day one.",
    name: "Rahul V.",
    role: "CTO, Fintech",
  },
  {
    quote: "The design and MERN team worked like one unit. Our dashboard became faster, cleaner, and easier to use.",
    name: "Ananya S.",
    role: "Product Manager",
  },
];

export const socialIcons = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  twitter: FaXTwitter,
};
