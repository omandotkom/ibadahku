/**
 * Type Definitions for ibadahku.id
 * Centralized type management for consistency across components
 */

/**
 * Umroh Package Type
 * Represents a travel package offering for Umroh
 */
export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in days
  hotelStars: 3 | 4 | 5;
  airline: string;
  departureDate: string;
  features: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
  image?: string;
}

/**
 * Navigation Item Type
 * Used for navigation menus
 */
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: NavItem[];
}

/**
 * Testimonial Type
 * Customer review/testimonial
 */
export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  avatar?: string;
  rating: number;
  packageName?: string;
  date: string;
}

/**
 * Feature/Service Type
 * Represents a feature or service offering
 */
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

/**
 * FAQ Item Type
 * Frequently Asked Questions
 */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Contact Form Data Type
 * Structure for contact form submission
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  packageInterest?: string;
}

/**
 * Social Media Link Type
 */
export interface SocialLink {
  platform: "facebook" | "instagram" | "twitter" | "youtube" | "whatsapp";
  url: string;
  label: string;
}

/**
 * Site Configuration Type
 */
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    whatsapp: string;
  };
  social: SocialLink[];
}
