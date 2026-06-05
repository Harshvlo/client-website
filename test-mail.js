import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,

  auth: {
    user: "info@vexarocouriersolutions.com",
    pass: "Vexaro@2026",
  },

  logger: true,
  debug: true,
});

try {
  const result = await transporter.sendMail({
    from: "info@vexarocouriersolutions.com",
    to: "ashutoshshrivastav1009@gmail.com",
    subject: "SMTP Direct Test",
    text: "Testing SMTP connection",
  });

  console.log(result);
} catch (err) {
  console.error(err);
}