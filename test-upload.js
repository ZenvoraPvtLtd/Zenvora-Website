const fs = require('fs');

async function test() {
  fs.writeFileSync('test-resume.pdf', 'dummy pdf content');
  
  const form = new FormData();
  form.append('name', 'Test User');
  form.append('email', 'test@example.com');
  form.append('role', 'Developer');
  
  const fileBuffer = fs.readFileSync('test-resume.pdf');
  const blob = new Blob([fileBuffer], { type: 'application/pdf' });
  form.append('resume', blob, 'test-resume.pdf');
  
  try {
    console.log('Sending request...');
    const res = await fetch('http://localhost:5000/api/careers/apply', {
      method: 'POST',
      body: form
    });
    const data = await res.json();
    console.log('Response:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}
test();
