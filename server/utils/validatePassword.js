export const validatePassword = (password) => {
  if (typeof password !== 'string' || password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!/[^A-Za-z0-9\s]/.test(password)) {
    return 'Password must contain at least one special character (e.g. ! @ # $ %)';
  }
  return null; // valid
};

// Rules for changing a password (Settings > Change Password)
export const validateNewPassword = (password) => {
  if (typeof password !== 'string' || password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return 'Password must include both lowercase and uppercase letters';
  }
  if (!/[0-9]/.test(password) && !/[^A-Za-z0-9\s]/.test(password)) {
    return 'Password must include at least 1 number or symbol';
  }
  if (/\s/.test(password)) {
    return 'Password cannot contain spaces';
  }
  if (password.includes('|')) {
    return 'Password cannot contain the "|" symbol';
  }
  return null; // valid
};