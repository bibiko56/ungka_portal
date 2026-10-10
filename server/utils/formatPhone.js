// Converts common Philippine mobile formats to E.164 (+63XXXXXXXXXX).
// Returns null if it isn't a valid PH mobile number.
export const toE164PH = (input) => {
  if (!input) return null;

  let digits = String(input).replace(/\D/g, ''); // strip +, spaces, dashes, brackets

  if (digits.startsWith('63')) digits = digits.slice(2);      // 63917... -> 917...
  else if (digits.startsWith('0')) digits = digits.slice(1);  // 0917...  -> 917...

  // PH mobile numbers are 10 digits after the country code and start with 9
  if (digits.length !== 10 || !digits.startsWith('9')) return null;

  return `+63${digits}`;
};

// 09XXXXXXXXX: the format we store from now on
export const toLocalPH = (input) => {
  const e164 = toE164PH(input);
  return e164 ? `0${e164.slice(3)}` : null;
};

// Matches the same number however it was saved before: +639..., 639..., 09..., 9...,
// with any spaces, dashes, dots, or brackets in between
export const phoneLookupRegex = (input) => {
  const e164 = toE164PH(input);
  if (!e164) return null;
  const body = e164.slice(3).split('').join('\\D*');
  return new RegExp(`^\\D*(?:63\\D*)?(?:0\\D*)?${body}\\D*$`);
};
