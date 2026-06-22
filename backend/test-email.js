require("dotenv").config();
const { sendApplicationEmail } = require("./src/utils/email.js");

async function test() {
  console.log("Testing email...");
  const res = await sendApplicationEmail({
    name: "Test User",
    email: "ps2855074@gmail.com", // Send to same email for testing
    jobTitle: "Test Job"
  });
  console.log("Result:", res);
  process.exit();
}

test();
