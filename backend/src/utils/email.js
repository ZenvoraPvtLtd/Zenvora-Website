const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send Welcome Email on Registration
const sendWelcomeEmail = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: [user.email, process.env.ADMIN_EMAIL],
      subject: "Welcome to Zenvora Graduate Services",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h1 style="color: #0891b2; text-align: center;">Welcome to Zenvora Graduate Services</h1>
            
            <p>Dear <strong>${user.name}</strong>,</p>
            
            <p>Thank you for registering with Zenvora Graduate Services. Your account has been successfully created!</p>
            
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Account Details:</h3>
              <p><strong>Name:</strong> ${user.name}</p>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Role:</strong> ${user.role || "User"}</p>
            </div>
            
            <p>You can now log in to your account and start using our services.</p>
            
            <p style="text-align: center; margin-top: 30px;">
              <a href="${process.env.CLIENT_URL}/login" style="display: inline-block; padding: 10px 20px; background-color: #0891b2; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Go to Login
              </a>
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #666; text-align: center;">
              If you did not create this account, please contact us immediately at ${process.env.ADMIN_EMAIL}
            </p>
            
            <p style="font-size: 12px; color: #666; text-align: center;">
              © 2026 Zenvora Infotech. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${user.email}`);
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
};

// Send Login Notification Email
const sendLoginNotification = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: [user.email, process.env.ADMIN_EMAIL],
      subject: "Login Alert - Zenvora Graduate Services",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h1 style="color: #0891b2; text-align: center;">Login Alert</h1>
            
            <p>Dear <strong>${user.name}</strong>,</p>
            
            <p>A login to your Zenvora Graduate Services account has been recorded.</p>
            
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Login Information:</h3>
              <p><strong>Account:</strong> ${user.email}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Service:</strong> Zenvora Graduate Services</p>
            </div>
            
            <p style="color: #d97706; font-weight: bold;">If this wasn't you, please change your password immediately and contact support.</p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #666; text-align: center;">
              For security reasons, we never ask for your password via email.
            </p>
            
            <p style="font-size: 12px; color: #666; text-align: center;">
              © 2026 Zenvora Infotech. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Login notification sent to ${user.email}`);
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
};

// Verify email configuration
const verifyEmailConfig = async () => {
  try {
    await transporter.verify();
    console.log("Email configuration verified successfully");
    return true;
  } catch (error) {
    console.error("Email configuration error:", error.message);
    return false;
  }
};

module.exports = {
  transporter,
  sendWelcomeEmail,
  sendLoginNotification,
  verifyEmailConfig,
};
