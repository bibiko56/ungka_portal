import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // STARTTLS, not implicit TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async (to, subject, body) => {
  return transporter.sendMail({
    from: `"Ungka Portal" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: body,
  });
};
