export const sendSms = async (to, body) => {
  const res = await fetch(
    `https://api.textbee.dev/api/v1/gateway/devices/${process.env.TEXTBEE_DEVICE_ID}/send-sms`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.TEXTBEE_API_KEY,
      },
      body: JSON.stringify({
        recipients: [to],
        message: body,
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Textbee error: ${errText}`);
  }

  return res.json();
};