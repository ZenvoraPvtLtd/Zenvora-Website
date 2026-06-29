const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Configure multer to store uploaded files on disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../../../uploads/resumes");
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

router.post("/parse", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No resume file provided" });
    }

    // Read the file for parsing
    const dataBuffer = fs.readFileSync(req.file.path);
    const resumeUrl = `/uploads/resumes/${req.file.filename}`;
    
    let extractedData = {
      email: "",
      phone: "",
      name: "",
      skills: "",
      resumeUrl: resumeUrl,
    };

    try {
      // Parse the PDF buffer
      const data = await pdfParse(dataBuffer);
      const text = data.text;

      // Regular expressions for extraction
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
      const phoneRegex = /(?:\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;

      const emailMatch = text.match(emailRegex);
      const phoneMatch = text.match(phoneRegex);

      // Basic heuristic for Name
      const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      let nameMatch = "";
      if (lines.length > 0) {
        const potentialName = lines[0];
        if (potentialName.length < 50 && !emailRegex.test(potentialName) && !phoneRegex.test(potentialName)) {
          nameMatch = potentialName;
        }
      }

      // Extract common skills
      const commonSkills = [
        "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Ruby", "PHP", "Swift", "Kotlin", "Go", "Rust",
        "React", "Angular", "Vue", "Next.js", "Nuxt", "Svelte",
        "Node.js", "Express", "Django", "Flask", "Spring Boot", "Laravel", "Ruby on Rails",
        "MongoDB", "PostgreSQL", "MySQL", "SQLite", "Redis", "Firebase",
        "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Linux", "Git", "GitHub", "GitLab",
        "HTML", "CSS", "Sass", "Tailwind CSS", "Bootstrap", "Material UI",
        "Figma", "Adobe XD", "UI/UX", "REST API", "GraphQL", "Machine Learning", "Data Science"
      ];

      const extractedSkills = [];
      const lowerText = text.toLowerCase();
      
      commonSkills.forEach(skill => {
        const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapeRegExp(skill)}\\b`, 'i');
        
        if (regex.test(text) || lowerText.includes(skill.toLowerCase())) {
           if (/[^a-zA-Z0-9]/.test(skill)) {
               if (lowerText.includes(skill.toLowerCase())) {
                   extractedSkills.push(skill);
               }
           } else {
               if (regex.test(text)) {
                   extractedSkills.push(skill);
               }
           }
        }
      });

      extractedData.email = emailMatch ? emailMatch[0] : "";
      extractedData.phone = phoneMatch ? phoneMatch[0] : "";
      extractedData.name = nameMatch || "";
      extractedData.skills = extractedSkills.join(", ");
      
    } catch (parseError) {
      console.warn("Could not parse PDF text, skipping autofill. Error:", parseError.message);
      // We continue without parsed data, so the user can still upload the file
    }

    res.json({
      success: true,
      data: extractedData,
      message: "Resume processed successfully",
    });

  } catch (error) {
    console.error("Resume parsing error:", error);
    res.status(500).json({ success: false, message: "Error parsing resume: " + error.message });
  }
});

module.exports = router;
