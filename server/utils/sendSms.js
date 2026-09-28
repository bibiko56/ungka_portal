export const sendSms = async (to, body) => {
  // TODO: replace with a real provider (Twilio, Semaphore, etc.) before launch
  console.log(`[MOCK SMS] To: ${to} | Message: ${body}`);
  return { status: 'mock-sent', to, body };
};