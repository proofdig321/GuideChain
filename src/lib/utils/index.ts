import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { VALIDATION_RULES, ERROR_MESSAGES } from "@/constants";

// Utility function for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency values
export function formatCurrency(amount: string | number, currency = "USDC"): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return `${numAmount.toFixed(2)} ${currency}`;
}

// Format wallet address
export function formatAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

// Format date
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Format date and time
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Calculate platform fee
export function calculatePlatformFee(amount: string | number, feePercentage = 7.5): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return (numAmount * (feePercentage / 100)).toFixed(2);
}

// Calculate guide earnings after platform fee
export function calculateGuideEarnings(amount: string | number, feePercentage = 7.5): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  const fee = numAmount * (feePercentage / 100);
  return (numAmount - fee).toFixed(2);
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate Ethereum address
export function isValidAddress(address: string): boolean {
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  return addressRegex.test(address);
}

// Validate guide name
export function validateGuideName(name: string): string | null {
  if (!name.trim()) return ERROR_MESSAGES.INVALID_INPUT;
  if (name.length < VALIDATION_RULES.MIN_NAME_LENGTH) {
    return `Name must be at least ${VALIDATION_RULES.MIN_NAME_LENGTH} characters`;
  }
  if (name.length > VALIDATION_RULES.MAX_NAME_LENGTH) {
    return `Name must be less than ${VALIDATION_RULES.MAX_NAME_LENGTH} characters`;
  }
  return null;
}

// Validate description
export function validateDescription(description: string): string | null {
  if (!description.trim()) return ERROR_MESSAGES.INVALID_INPUT;
  if (description.length < VALIDATION_RULES.MIN_DESCRIPTION_LENGTH) {
    return `Description must be at least ${VALIDATION_RULES.MIN_DESCRIPTION_LENGTH} characters`;
  }
  if (description.length > VALIDATION_RULES.MAX_DESCRIPTION_LENGTH) {
    return `Description must be less than ${VALIDATION_RULES.MAX_DESCRIPTION_LENGTH} characters`;
  }
  return null;
}

// Validate price
export function validatePrice(price: number): string | null {
  if (price < VALIDATION_RULES.MIN_PRICE) {
    return `Price must be at least $${VALIDATION_RULES.MIN_PRICE}`;
  }
  if (price > VALIDATION_RULES.MAX_PRICE) {
    return `Price must be less than $${VALIDATION_RULES.MAX_PRICE}`;
  }
  return null;
}

// Validate rating
export function validateRating(rating: number): string | null {
  if (rating < VALIDATION_RULES.MIN_RATING || rating > VALIDATION_RULES.MAX_RATING) {
    return `Rating must be between ${VALIDATION_RULES.MIN_RATING} and ${VALIDATION_RULES.MAX_RATING}`;
  }
  return null;
}

// Sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

// Download file
export function downloadFile(data: string, filename: string, type = "text/plain"): void {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Get file extension
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

// Check if date is in the past
export function isDateInPast(date: string | Date): boolean {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj < new Date();
}

// Check if date is in the future
export function isDateInFuture(date: string | Date): boolean {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj > new Date();
}

// Get days between dates
export function getDaysBetween(date1: string | Date, date2: string | Date): number {
  const d1 = typeof date1 === "string" ? new Date(date1) : date1;
  const d2 = typeof date2 === "string" ? new Date(date2) : date2;
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Format rating with stars
export function formatRating(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return "★".repeat(fullStars) + 
         (hasHalfStar ? "☆" : "") + 
         "☆".repeat(emptyStars) + 
         ` (${rating.toFixed(1)})`;
}

// Generate random color for avatars
export function generateAvatarColor(address: string): string {
  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
    "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"
  ];
  const index = parseInt(address.slice(-2), 16) % colors.length;
  return colors[index];
}

// Local storage helpers
export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
  
  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.clear();
  },
};

// Session storage helpers
export const sessionStorage = {
  get: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null;
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save to sessionStorage:", error);
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    window.sessionStorage.removeItem(key);
  },
};