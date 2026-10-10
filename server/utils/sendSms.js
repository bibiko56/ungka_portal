import { toE164PH } from './formatPhone.js';

export const sendSms = async (to, body) => {
  const recipient = toE164PH(to);
  if (!recipient) {
    throw new Error(`Invalid Philippine mobile number: "${to}"`);
  }

  const res = await fetch(
    `https://api.textbee.dev/api/v1/gateway/devices/${process.env.TEXTBEE_DEVICE_ID}/send-sms`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.TEXTBEE_API_KEY,
      },
      body: JSON.stringify({ recipients: [recipient], message: body }),
    }
  );

  if (!res.ok) {
    throw new Error(`Textbee error: ${await res.text()}`);
  }

  return res.json();
};