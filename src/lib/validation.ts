export const validateFileUpload = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, and PDF files are allowed' };
  }
  
  return { valid: true };
};

export const sanitizeFileName = (fileName: string): string => {
  return fileName.replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, 100);
};