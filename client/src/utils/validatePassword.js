export const passwordRules = [
  {
    label: 'At least 8 characters',
    message: 'Password must be at least 8 characters long',
    test: (p) => p.length >= 8,
  },
  {
    label: 'At least 1 special character (e.g. ! @ # $ %)',
    message: 'Password must contain at least one special character (e.g. ! @ # $ %)',
    test: (p) => /[^A-Za-z0-9\s]/.test(p),
  },
];

export const validatePassword = (password) => {
  const failed = passwordRules.find((rule) => !rule.test(password));
  return failed ? failed.message : null; // null = valid
};

// Rules shown on Settings > Change Password
export const changePasswordRules = [
  { label: 'include lower and upper characters', test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
  { label: 'include at least 1 number or symbol', test: (p) => /[0-9]/.test(p) || /[^A-Za-z0-9\s]/.test(p) },
  { label: 'be at least 8 characters long', test: (p) => p.length >= 8 },
  { label: 'cannot contain spaces and “|” symbol', test: (p) => !/\s/.test(p) && !p.includes('|') },
];