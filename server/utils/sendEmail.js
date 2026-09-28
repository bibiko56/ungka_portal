export const sendEmail = async (to, subject, body) => {
  // TODO: swap for a real provider (Nodemailer, SendGrid, etc.) before launch
  console.log(`[MOCK EMAIL] To: ${to} | Subject: ${subject} | Body: ${body}`);
  return { status: 'mock-sent', to, subject };
};