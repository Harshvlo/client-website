import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// console.log("=================================");
// console.log("SMTP_HOST =", process.env.SMTP_HOST);
// console.log("SMTP_PORT =", process.env.SMTP_PORT);
// console.log("SMTP_SECURE =", process.env.SMTP_SECURE);
// console.log("SMTP_USER =", process.env.SMTP_USER);
// console.log("CONTACT_TO_EMAIL =", process.env.CONTACT_TO_EMAIL);
// console.log("=================================");

const app = express();
const port = process.env.PORT || 4000;

const CLIENT_EMAIL =
  process.env.CONTACT_TO_EMAIL || "info@vexarocouriersolutions.com";

const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "info@vexarocouriersolutions.com";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
  logger: true,
  debug: true,
});

const limiter = rateLimit({
  windowMs:
    Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MINUTES || 15) * 60 * 1000,
  max: Number(process.env.CONTACT_RATE_LIMIT_MAX || 5),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests. Please try again later.",
  },
});

app.use(cors());
app.use(express.json());
app.use("/api/contact", limiter);

const escapeHtml = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, company, subject, message, botField } =
      req.body;

    if (botField?.trim()) {
      return res.status(400).json({ success: false, error: "Spam detected." });
    }

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields.",
      });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address.",
      });
    }

    const phoneNormalized = phone.replace(/\s/g, "");

    if (!/^[6-9]\d{9}$/.test(phoneNormalized)) {
      return res.status(400).json({
        success: false,
        error: "Invalid phone number.",
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: "Message must be at least 10 characters.",
      });
    }

    const sentAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const cleanCompany = company?.trim() || "N/A";

    const html = `
      <h2>New VEXARO Contact Form Enquiry</h2>

      <table cellpadding="6" cellspacing="0" border="0">
        <tr>
          <td><strong>Submitted At</strong></td>
          <td>${escapeHtml(sentAt)}</td>
        </tr>

        <tr>
          <td><strong>Full Name</strong></td>
          <td>${escapeHtml(name)}</td>
        </tr>

        <tr>
          <td><strong>Email</strong></td>
          <td>${escapeHtml(email)}</td>
        </tr>

        <tr>
          <td><strong>Phone</strong></td>
          <td>${escapeHtml(phone)}</td>
        </tr>

        <tr>
          <td><strong>Company</strong></td>
          <td>${escapeHtml(cleanCompany)}</td>
        </tr>

        <tr>
          <td><strong>Subject</strong></td>
          <td>${escapeHtml(subject)}</td>
        </tr>

        <tr>
          <td><strong>Message</strong></td>
          <td>${escapeHtml(message).replace(/\n/g, "<br/>")}</td>
        </tr>
      </table>
    `;

    const text = `
New VEXARO Contact Form Enquiry

Submitted At: ${sentAt}

Full Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${cleanCompany}

Subject:
${subject}

Message:
${message}
`;

    const replyHtml = `
      <p>Dear ${escapeHtml(name)},</p>
      <p>Thank you for contacting VEXARO Courier Solutions.</p>
      <p>We have successfully received your enquiry and our team will get back to you within 2 business hours.</p>
      <p>Regards,<br/>VEXARO Courier Solutions<br/>https://vexarocouriersolutions.com</p>
    `;

    const replyText = `Dear ${name},\n\nThank you for contacting VEXARO Courier Solutions.\n\nWe have successfully received your enquiry and our team will get back to you within 2 business hours.\n\nRegards,\nVEXARO Courier Solutions\nhttps://vexarocouriersolutions.com`;

    const companyMail = await transporter.sendMail({
      from: `"Vexaro Courier Solutions" <${FROM_EMAIL}>`,
      to: CLIENT_EMAIL,
      replyTo: `"${name}" <${email}>`,
      subject: `VEXARO Website Enquiry: ${subject}`,
      text,
      html,
    });

    const visitorMail = await transporter.sendMail({
      from: `"Vexaro Courier Solutions" <${FROM_EMAIL}>`,
      to: `"${name}" <${email}>`,
      subject: "Thank You for Contacting VEXARO",
      text: replyText,
      html: replyHtml,
    });

    console.log("EMAILS SENT SUCCESSFULLY");
    console.log(companyMail);
    console.log(visitorMail);

    return res.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("=================================");
    console.error("CONTACT FORM ERROR");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to send email.",
    });
  }
});

app.listen(port, () => {
  console.log(`Contact form API server listening on http://localhost:${port}`);
});
