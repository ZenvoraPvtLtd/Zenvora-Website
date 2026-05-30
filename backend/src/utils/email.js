const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
  secure: process.env.SMTP_SECURE === "true",
  service: process.env.SMTP_HOST ? undefined : process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL_USER || "ps2855074@gmail.com",
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD,
  },
});

// Send Welcome Email on Registration
const sendWelcomeEmail = async (user) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_FROM || process.env.EMAIL_FROM || '"Zenvora Portal" <noreply@zenvora.com>',
      to: [user.email, process.env.ADMIN_EMAIL || "ps2855074@gmail.com"],
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
              <a href="${process.env.CLIENT_URL || "http://localhost:3000"}/login" style="display: inline-block; padding: 10px 20px; background-color: #0891b2; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Go to Login
              </a>
            </p>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

            <p style="font-size: 12px; color: #666; text-align: center;">
              If you did not create this account, please contact us immediately at ${process.env.ADMIN_EMAIL || "ps2855074@gmail.com"}
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
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const mailOptions = {
      from: process.env.MAIL_FROM || process.env.EMAIL_FROM || '"Zenvora Portal" <noreply@zenvora.com>',
      to: "ps2855074@gmail.com",
      subject: `🔔 Login Alert: ${user.name} logged in to Zenvora`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 40px 10px;">
          <div style="max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
            <div style="text-align: center; margin-bottom: 24px;">
              <span style="font-size: 40px;">🔔</span>
              <h1 style="color: #0f172a; font-size: 24px; font-weight: 800; margin: 12px 0 6px 0; tracking: -0.025em;">User Login Activity</h1>
              <p style="color: #64748b; font-size: 14px; margin: 0;">Zenvora Graduate Services Security Alert</p>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 12px; margin: 24px 0; border: 1px solid #e2e8f0;">
              <h3 style="margin-top: 0; color: #334155; font-size: 15px; font-weight: 700; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px;">Activity Summary</h3>
              <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 500; width: 35%;">User Name:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${user.name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 500;">User Email:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${user.email}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Timestamp:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${timestamp}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Platform:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">Zenvora Graduate Services</td>
                </tr>
              </table>
            </div>
            
            <p style="font-size: 13px; color: #64748b; text-align: center; margin-top: 30px;">
              This is an automated system notification for the Zenvora HRM portal.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
            
            <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
              © 2026 Zenvora Pvt Ltd. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Login notification successfully sent to ps2855074@gmail.com for user ${user.email}`);
    return true;
  } catch (error) {
    console.error("Email notification send error:", error);
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

// Send Password Reset Email
const sendPasswordResetEmail = async (user, resetLink) => {
  try {
    const recipientEmail = typeof user === "string" ? user : user.email;
    const recipientName = typeof user === "string" ? "there" : user.name;

    const mailOptions = {
      from: process.env.MAIL_FROM || process.env.EMAIL_FROM || '"Zenvora Portal" <noreply@zenvora.com>',
      to: recipientEmail,
      subject: "Password Reset Request - Zenvora Admin Portal",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h1 style="color: #0891b2; text-align: center;">Password Reset Request</h1>

            <p>Dear <strong>${recipientName}</strong>,</p>

            <p>We received a request to reset your Zenvora Admin Portal password. If you did not request this, please ignore this email.</p>

            <p>To reset your password, click the button below. This link will expire in 1 hour.</p>

            <p style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="display: inline-block; padding: 12px 30px; background-color: #0891b2; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                Reset Password
              </a>
            </p>

            <p style="font-size: 12px; color: #666; text-align: center; margin-top: 20px;">
              Or copy and paste this link in your browser:<br/>
              <code style="background-color: #f3f4f6; padding: 5px 10px; border-radius: 3px; display: inline-block; word-break: break-all; margin-top: 10px;">
                ${resetLink}
              </code>
            </p>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

            <p style="font-size: 12px; color: #666; text-align: center;">
              This password reset link will expire in 1 hour.
            </p>

            <p style="font-size: 12px; color: #666; text-align: center;">
              If you did not request a password reset, please contact us immediately at ${process.env.ADMIN_EMAIL || "ps2855074@gmail.com"}
            </p>

            <p style="font-size: 12px; color: #666; text-align: center;">
              © 2026 Zenvora Infotech. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${recipientEmail}`);
    return true;
  } catch (error) {
    console.error("Password reset email error:", error);
    return false;
  }
};

module.exports = {
  transporter,
  sendWelcomeEmail,
  sendLoginNotification,
  sendPasswordResetEmail,
  verifyEmailConfig,
};
