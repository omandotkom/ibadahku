/**
 * Badge Component
 * 
 * Small label component for displaying status or categories.
 * 
 * @component
 * @example
 * <Badge variant="popular">Populer</Badge>
 * <Badge variant="recommended">Recommended</Badge>
 */

import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "popular" | "recommended" | "success" | "warning" | "info";
  className?: string;
}

const variantStyles = {
  default: "bg-[var(--surface-elevated)] text-[var(--text-secondary)] border-[var(--border)]",
  popular: "bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent",
  recommended: "bg-gradient-to-r from-[var(--brand-green-primary)] to-[var(--brand-green-light)] text-white border-transparent",
  success: "bg-[var(--brand-green-lighter)] text-[var(--brand-green-dark)] border-[var(--brand-green-light)]",
  warning: "bg-amber-100 text-amber-800 border-amber-300",
  info: "bg-blue-100 text-blue-800 border-blue-300",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        border shadow-sm
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
