require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User.model");
const Job = require("./models/Job.model");
const Application = require("./models/Application.model");
const Contact = require("./models/Contact.model");

const users = [
  { name: "Zenvora Admin", email: "admin@zenvora.com", password: "password123", role: "admin", isActive: true },
  { name: "Alice Johnson", email: "alice@example.com", password: "password123", role: "user", isActive: true },
  { name: "Bob Smith", email: "bob@example.com", password: "password123", role: "user", isActive: true },
  { name: "Carol White", email: "carol@example.com", password: "password123", role: "user", isActive: false },
  { name: "David Brown", email: "david@example.com", password: "password123", role: "user", isActive: true },
  { name: "Frank Lee", email: "frank@example.com", password: "password123", role: "user", isActive: true },
  { name: "Grace Kim", email: "grace@example.com", password: "password123", role: "user", isActive: true },
  { name: "Henry Davis", email: "henry@example.com", password: "password123", role: "user", isActive: false },
  { name: "Iris Wilson", email: "iris@example.com", password: "password123", role: "user", isActive: true },
  { name: "Jack Taylor", email: "jack@example.com", password: "password123", role: "user", isActive: true },
];

const jobs = [
  { title: "Frontend Developer", location: "Remote", type: "Full-time", department: "Engineering", description: "Build modern UIs using React and Tailwind.", requirements: ["React", "Tailwind CSS", "TypeScript"], isActive: true },
  { title: "Backend Engineer", location: "New York, NY", type: "Full-time", department: "Engineering", description: "Design and build scalable Node.js APIs.", requirements: ["Node.js", "MongoDB", "REST APIs"], isActive: true },
  { title: "UI/UX Designer", location: "Remote", type: "Contract", department: "Design", description: "Create user-centred designs and prototypes.", requirements: ["Figma", "User Research", "Prototyping"], isActive: true },
  { title: "DevOps Engineer", location: "Austin, TX", type: "Full-time", department: "Infrastructure", description: "Manage CI/CD pipelines and cloud infrastructure.", requirements: ["AWS", "Docker", "Kubernetes"], isActive: true },
  { title: "Product Manager", location: "San Francisco, CA", type: "Full-time", department: "Product", description: "Drive product vision and roadmap.", requirements: ["Agile", "Roadmapping", "Stakeholder Management"], isActive: true },
  { title: "Data Analyst", location: "Remote", type: "Part-time", department: "Data", description: "Analyse business data and produce insights.", requirements: ["SQL", "Python", "Tableau"], isActive: true },
  { title: "Mobile Developer", location: "Remote", type: "Full-time", department: "Engineering", description: "Build cross-platform mobile apps with React Native.", requirements: ["React Native", "iOS", "Android"], isActive: false },
  { title: "QA Engineer", location: "Chicago, IL", type: "Full-time", department: "Engineering", description: "Ensure software quality through automated and manual testing.", requirements: ["Selenium", "Jest", "Test Planning"], isActive: true },
  { title: "Marketing Specialist", location: "Remote", type: "Full-time", department: "Marketing", description: "Drive growth through digital marketing campaigns.", requirements: ["SEO", "Google Ads", "Content Strategy"], isActive: true },
  { title: "Sales Executive", location: "Boston, MA", type: "Full-time", department: "Sales", description: "Identify and close new business opportunities.", requirements: ["CRM", "Negotiation", "B2B Sales"], isActive: true },
  { title: "HR Manager", location: "Remote", type: "Full-time", department: "HR", description: "Oversee hiring, onboarding, and employee relations.", requirements: ["Recruitment", "HRIS", "Employment Law"], isActive: true },
  { title: "Security Engineer", location: "Washington, DC", type: "Full-time", department: "Security", description: "Protect systems and data from security threats.", requirements: ["Penetration Testing", "SIEM", "Zero Trust"], isActive: true },
];

const seed = async () => {
  await connectDB();

  // Seed users (skip existing emails)
  let addedUsers = 0;
  for (const u of users) {
    const exists = await User.findOne({ email: u.email }).select("+password");
    if (!exists) {
      await User.create(u);
      addedUsers++;
    } else {
      const passwordWorks = await exists.comparePassword(u.password);
      // Force update admin user or if password doesn't match
      if (!passwordWorks || u.role === "admin") {
        exists.password = u.password;
        exists.name = u.name;
        exists.role = u.role;
        exists.isActive = u.isActive;
        await exists.save();
      }
    }
  }

  // Seed jobs (skip if title already exists)
  let addedJobs = 0;
  for (const j of jobs) {
    const exists = await Job.findOne({ title: j.title });
    if (!exists) {
      await Job.create(j);
      addedJobs++;
    }
  }

  let addedApplications = 0;
  let addedContacts = 0;

  // Add a few recent documents if the last 7 days are empty
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentUsers = await User.countDocuments({ createdAt: { $gte: sevenDaysAgo } });
  const recentJobs = await Job.countDocuments({ createdAt: { $gte: sevenDaysAgo } });
  const recentApps = await Application.countDocuments({ createdAt: { $gte: sevenDaysAgo } });
  const recentContacts = await Contact.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

  if (recentUsers < 3) {
    const now = new Date();
    const recentUserSamples = [
      { name: "Tara Singh", email: "tara.singh@example.com", password: "password123", role: "user", isActive: true },
      { name: "Karan Mehta", email: "karan.mehta@example.com", password: "password123", role: "user", isActive: true },
      { name: "Nina Shah", email: "nina.shah@example.com", password: "password123", role: "user", isActive: true },
    ];
    for (let i = 0; i < recentUserSamples.length; i++) {
      const createdAt = new Date(now);
      createdAt.setDate(now.getDate() - i);
      await User.create({ ...recentUserSamples[i], createdAt });
      addedUsers++;
    }
  }

  if (recentJobs < 2) {
    const now = new Date();
    const recentJobSamples = [
      { title: "Cloud Engineer", location: "Remote", type: "Full-time", department: "Infrastructure", description: "Manage cloud infrastructure and automation.", requirements: ["AWS", "Terraform", "CI/CD"], isActive: true },
      { title: "AI Engineer", location: "Bangalore", type: "Full-time", department: "AI", description: "Build AI models and integrate them into products.", requirements: ["Python", "TensorFlow", "Machine Learning"], isActive: true },
    ];
    for (let i = 0; i < recentJobSamples.length; i++) {
      const createdAt = new Date(now);
      createdAt.setDate(now.getDate() - i);
      await Job.create({ ...recentJobSamples[i], createdAt });
      addedJobs++;
    }
  }

  if (recentApps < 3) {
    const now = new Date();
    const recentAppSamples = [
      { name: "Suhana Reddy", email: "suhana.reddy@example.com", phone: "9123456701", jobTitle: "Cloud Engineer", status: "pending", coverLetter: "I have cloud expertise.", skills: "AWS, Terraform", resumeUrl: "http://example.com/resume.pdf" },
      { name: "Rohan Gupta", email: "rohan.gupta@example.com", phone: "9234567810", jobTitle: "AI Engineer", status: "reviewed", coverLetter: "I build intelligent systems.", skills: "Python, ML", resumeUrl: "http://example.com/resume.pdf" },
      { name: "Anjali Rao", email: "anjali.rao@example.com", phone: "9345678920", jobTitle: "Frontend Developer", status: "pending", coverLetter: "I build beautiful interfaces.", skills: "React, CSS", resumeUrl: "http://example.com/resume.pdf" },
    ];
    for (let i = 0; i < recentAppSamples.length; i++) {
      const createdAt = new Date(now);
      createdAt.setDate(now.getDate() - i);
      await Application.create({ ...recentAppSamples[i], createdAt });
      addedApplications++;
    }
  }

  if (recentContacts < 2) {
    const now = new Date();
    const recentContactSamples = [
      { firstName: "Akash", lastName: "Verma", email: "akash.verma@example.com", phone: "9456123780", company: "DevCorp", service: "Product Engineering", inquiryType: "Project", department: "Sales", preferredContact: "email", message: "Need product engineering support.", status: "new" },
      { firstName: "Meera", lastName: "Shah", email: "meera.shah@example.com", phone: "9567123489", company: "SoftTech", service: "Cybersecurity", inquiryType: "Consulting", department: "Sales", preferredContact: "phone", message: "Need cybersecurity assistance.", status: "new" },
    ];
    for (let i = 0; i < recentContactSamples.length; i++) {
      const createdAt = new Date(now);
      createdAt.setDate(now.getDate() - i);
      await Contact.create({ ...recentContactSamples[i], createdAt });
      addedContacts++;
    }
  }

  // Seed applications if none exist
  const applicationCount = await Application.countDocuments();
  if (applicationCount === 0) {
    const jobsList = await Job.find().limit(6);
    const appSamples = [
      { name: "Sanjay Jain", email: "sanjay.jain@example.com", phone: "9876543210", jobTitle: jobsList[0]?.title || "Frontend Developer", status: "pending", coverLetter: "I am excited to apply.", skills: "React, Tailwind, JavaScript", resumeUrl: "http://example.com/resume.pdf" },
      { name: "Ayesha Khan", email: "ayesha.khan@example.com", phone: "9911223344", jobTitle: jobsList[1]?.title || "Backend Engineer", status: "reviewed", coverLetter: "My experience matches the role.", skills: "Node.js, MongoDB, REST APIs", resumeUrl: "http://example.com/resume.pdf" },
      { name: "Vikram Singh", email: "vikram.singh@example.com", phone: "9988776655", jobTitle: jobsList[2]?.title || "UI/UX Designer", status: "accepted", coverLetter: "Design is my passion.", skills: "Figma, Prototyping", resumeUrl: "http://example.com/resume.pdf" },
      { name: "Riya Patel", email: "riya.patel@example.com", phone: "9123456780", jobTitle: jobsList[3]?.title || "DevOps Engineer", status: "rejected", coverLetter: "I have strong automation skills.", skills: "AWS, Docker, Kubernetes", resumeUrl: "http://example.com/resume.pdf" },
      { name: "Mohit Sharma", email: "mohit.sharma@example.com", phone: "9001122334", jobTitle: jobsList[4]?.title || "Product Manager", status: "pending", coverLetter: "I have product leadership experience.", skills: "Agile, Roadmapping", resumeUrl: "http://example.com/resume.pdf" },
      { name: "Nisha Verma", email: "nisha.verma@example.com", phone: "9044556677", jobTitle: jobsList[5]?.title || "Data Analyst", status: "reviewed", coverLetter: "I love analyzing trends.", skills: "SQL, Python, Tableau", resumeUrl: "http://example.com/resume.pdf" },
    ];

    const baseDate = new Date();
    for (let i = 0; i < appSamples.length; i++) {
      const createdAt = new Date(baseDate);
      createdAt.setDate(baseDate.getDate() - i);
      await Application.create({ ...appSamples[i], createdAt });
      addedApplications++;
    }
  }

  // Seed contacts if none exist
  const contactCount = await Contact.countDocuments();
  if (contactCount === 0) {
    const contactSamples = [
      { firstName: "Anita", lastName: "Sharma", email: "anita.sharma@example.com", phone: "9988776655", company: "TechWorks", service: "AI & Machine Learning", inquiryType: "Project", department: "Sales", preferredContact: "email", message: "Need help building an AI solution.", status: "new" },
      { firstName: "Raj", lastName: "Kumar", email: "raj.kumar@example.com", phone: "9876543210", company: "InnoTech", service: "Cloud Architecture", inquiryType: "Consulting", department: "Sales", preferredContact: "phone", message: "Looking for cloud architecture advice.", status: "reviewed" },
      { firstName: "Priya", lastName: "Desai", email: "priya.desai@example.com", phone: "9123456780", company: "GlobalX", service: "DevOps & Platform", inquiryType: "Project", department: "Sales", preferredContact: "email", message: "Need DevOps support for our platform.", status: "new" },
      { firstName: "Arjun", lastName: "Patel", email: "arjun.patel@example.com", phone: "9001122334", company: "FutureTech", service: "Product Engineering", inquiryType: "Hiring", department: "Sales", preferredContact: "phone", message: "Interested in product engineering services.", status: "closed" },
    ];

    const baseContactDate = new Date();
    for (let i = 0; i < contactSamples.length; i++) {
      const createdAt = new Date(baseContactDate);
      createdAt.setDate(baseContactDate.getDate() - i);
      await Contact.create({ ...contactSamples[i], createdAt });
      addedContacts++;
    }
  }

  console.log(`Seeded ${addedUsers} users, ${addedJobs} jobs, ${addedApplications} applications, ${addedContacts} contacts.`);
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
