// Security utilities for input sanitization and logging
export const sanitizeForLog = (input: any): string => {
  if (typeof input === 'string') {
    return input.replace(/[\r\n]/g, '').substring(0, 1000);
  }
  return JSON.stringify(input).substring(0, 1000);
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 1000);
};

export const validateAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const validateAmount = (amount: string): boolean => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0 && num < 1000000;
};