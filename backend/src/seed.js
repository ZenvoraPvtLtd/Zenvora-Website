require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User.model");
const Job = require("./models/Job.model");

const users = [
  { name: "Alice Johnson", email: "alice@example.com", password: "password123", role: "user", isActive: true },
  { name: "Bob Smith", email: "bob@example.com", password: "password123", role: "user", isActive: true },
  { name: "Carol White", email: "carol@example.com", password: "password123", role: "user", isActive: false },
  { name: "David Brown", email: "david@example.com", password: "password123", role: "user", isActive: true },
  // { name: "Eva Martinez", email: "eva@example.com", password: "password123", role: "admin", isActive: true },
  { name: "Zenvora Admin", email: "admin@zenvora.com", password: "password123", role: "admin", isActive: true },
  { name: "Frank Lee", email: "frank@example.com", password: "password123", role: "user", isActive: true },
  { name: "Grace Kim", email: "grace@example.com", password: "password123", role: "user", isActive: true },
  { name: "Henry Davis", email: "henry@example.com", password: "password123", role: "user", isActive: false },
  { name: "Iris Wilson", email: "iris@example.com", password: "password123", role: "user", isActive: true },
  { name: "Jack Taylor", email: "jack@example.com", password: "password123", role: "user", isActive: true },
  // { name: "Karen Anderson", email: "karen@example.com", password: "password123", role: "admin", isActive: true },
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
      if (!passwordWorks) {
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

  console.log(`Seeded ${addedUsers} users, ${addedJobs} jobs.`);
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
