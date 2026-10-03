import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, body) => {
  return resend.emails.send({
    from: 'Ungka Portal <onboarding@resend.dev>', // Resend's shared test sender — works immediately, no domain setup needed
    to,
    subject,
    text: body,
  });
};
