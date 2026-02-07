/**
 * Utility Functions for ibadahku.id
 * Helper functions for common operations
 */

/**
 * Format price to Indonesian Rupiah currency format
 * @param price - Number to format
 * @returns Formatted price string (e.g., "Rp 25.000.000")
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format date to Indonesian locale string
 * @param date - Date string or Date object
 * @returns Formatted date string (e.g., "15 Januari 2024")
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Truncate text to specified length with ellipsis
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

/**
 * Generate slug from string
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Debounce function for performance optimization
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Check if device is mobile based on user agent
 * @param userAgent - User agent string
 * @returns Boolean indicating if mobile device
 */
export function isMobile(userAgent: string): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
}

/**
 * Smooth scroll to element by ID
 * @param elementId - ID of element to scroll to
 */
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

/**
 * Get current year for copyright
 * @returns Current year as string
 */
export function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}

/**
 * Validate Indonesian phone number
 * @param phone - Phone number to validate
 * @returns Boolean indicating if valid
 */
export function isValidIndonesianPhone(phone: string): boolean {
  // Format: +62 or 08 followed by 8-12 digits
  const regex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
  return regex.test(phone.replace(/\s/g, ""));
}

/**
 * Calculate discount percentage
 * @param originalPrice - Original price
 * @param discountedPrice - Discounted price
 * @returns Discount percentage
 */
export function calculateDiscount(
  originalPrice: number,
  discountedPrice: number
): number {
  if (originalPrice <= 0 || discountedPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}
