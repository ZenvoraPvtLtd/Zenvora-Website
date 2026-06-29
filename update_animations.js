const fs = require('fs');

// ==== Update ServicesSection ====
let servicesFile = fs.readFileSync('frontend/src/sections/ServicesSection.jsx', 'utf8');

// Add import
if (!servicesFile.includes('framer-motion')) {
  servicesFile = servicesFile.replace(
    'import { Link } from "react-router-dom";',
    'import { Link } from "react-router-dom";\nimport { motion } from "framer-motion";'
  );
}

// Update ServiceCard
servicesFile = servicesFile.replace(
  /<article\s+className="group relative overflow-hidden/g,
  '<motion.article\n      initial={{ opacity: 0, y: 30 }}\n      whileInView={{ opacity: 1, y: 0 }}\n      viewport={{ once: true, margin: "-50px" }}\n      transition={{ duration: 0.5 }}\n      className="group relative overflow-hidden'
);
servicesFile = servicesFile.replace(/<\/article>/g, '</motion.article>');

// Update ProcessCard
servicesFile = servicesFile.replace(
  /<div className="relative">/g,
  '<motion.div\n      initial={{ opacity: 0, y: 30 }}\n      whileInView={{ opacity: 1, y: 0 }}\n      viewport={{ once: true, margin: "-50px" }}\n      transition={{ duration: 0.5 }}\n      className="relative">'
);
servicesFile = servicesFile.replace(/<\/div>\n  \);\n}/g, '</motion.div>\n  );\n}'); // close ProcessCard motion.div

fs.writeFileSync('frontend/src/sections/ServicesSection.jsx', servicesFile);

// ==== Update AboutSection ====
let aboutFile = fs.readFileSync('frontend/src/sections/AboutSection.jsx', 'utf8');

if (!aboutFile.includes('framer-motion')) {
  aboutFile = aboutFile.replace(
    'import { Link } from "react-router-dom";',
    'import { Link } from "react-router-dom";\nimport { motion } from "framer-motion";'
  );
}

// Stats Cards (map uses idx)
aboutFile = aboutFile.replace(
  /<div\s+key={idx}\s+className="rounded-xl p-8 text-left transition-transform duration-300 hover:-translate-y-1"/g,
  '<motion.div\n                key={idx}\n                initial={{ opacity: 0, y: 30 }}\n                whileInView={{ opacity: 1, y: 0 }}\n                viewport={{ once: true, margin: "-50px" }}\n                transition={{ duration: 0.5, delay: idx * 0.1 }}\n                className="rounded-xl p-8 text-left transition-transform duration-300 hover:-translate-y-1"'
);

// Mission/Vision cards
aboutFile = aboutFile.replace(
  /<div\s+className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"\s+style={{/g,
  '<motion.div\n                initial={{ opacity: 0, y: 30 }}\n                whileInView={{ opacity: 1, y: 0 }}\n                viewport={{ once: true, margin: "-50px" }}\n                transition={{ duration: 0.5 }}\n                className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"\n                style={{'
);

// Core Values Cards (map uses idx)
aboutFile = aboutFile.replace(
  /<div\s+key={idx}\s+className="rounded-2xl p-7 transition-all duration-300"\s+style={{/g,
  '<motion.div\n                key={idx}\n                initial={{ opacity: 0, y: 30 }}\n                whileInView={{ opacity: 1, y: 0 }}\n                viewport={{ once: true, margin: "-50px" }}\n                transition={{ duration: 0.5, delay: idx * 0.1 }}\n                className="rounded-2xl p-7 transition-all duration-300"\n                style={{'
);

// Team Cards (map uses idx)
aboutFile = aboutFile.replace(
  /<div\s+key={idx}\s+className="rounded-2xl p-6 text-center transition-all duration-300"\s+style={{/g,
  '<motion.div\n                key={idx}\n                initial={{ opacity: 0, y: 30 }}\n                whileInView={{ opacity: 1, y: 0 }}\n                viewport={{ once: true, margin: "-50px" }}\n                transition={{ duration: 0.5, delay: idx * 0.1 }}\n                className="rounded-2xl p-6 text-center transition-all duration-300"\n                style={{'
);

// Make sure to close the modified div tags properly by doing a general replace of matching closing divs, but since they are deeply nested it's better to just replace all `</div>`? NO, that would break everything.
// Instead, let's fix the closing tags. Actually, we replaced `<div` with `<motion.div`. If we don't replace `</div>` with `</motion.div>`, it will break JSX!

// Fix for AboutSection: it's hard to reliably find the matching closing div with regex. I should use `multi_replace_file_content` instead of a regex script to avoid breaking the JSX tree.
