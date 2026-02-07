"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Button Component
 * 
 * Reusable button with multiple variants and sizes.
 * Implements smooth animations using Framer Motion.
 * 
 * @component
 * @example
 * <Button variant="primary" size="lg">Daftar Sekarang</Button>
 * <Button variant="outline">Pelajari</Button>
 */

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  isExternal?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const variantStyles = {
  primary: "bg-[var(--brand-green-primary)] text-white hover:bg-[var(--brand-green-dark)] shadow-lg shadow-[var(--brand-green-primary)]/25",
  secondary: "bg-[var(--brand-green-lighter)] text-[var(--brand-green-dark)] hover:bg-[var(--brand-green-light)]/30",
  outline: "border-2 border-[var(--brand-green-primary)] text-[var(--brand-green-primary)] hover:bg-[var(--brand-green-primary)] hover:text-white",
  ghost: "text-[var(--brand-green-primary)] hover:bg-[var(--brand-green-lighter)]",
  gold: "bg-gradient-to-r from-[var(--accent-gold-dark)] to-[var(--accent-gold)] text-white hover:from-[var(--accent-gold)] hover:to-[var(--accent-gold-light)] shadow-lg shadow-[var(--accent-gold)]/25",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm min-h-[36px]",
  md: "px-6 py-3 text-base min-h-[44px]",
  lg: "px-8 py-4 text-lg min-h-[48px]",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  isExternal = false,
  disabled = false,
  type = "button",
  icon,
  iconPosition = "right",
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-xl
    transition-all duration-300 ease-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green-primary)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
    active:scale-[0.98]
    cursor-pointer
    min-w-[44px] min-h-[44px]
  `;

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
    </>
  );

  // Motion wrapper for smooth animations
  const MotionWrapper = ({ children }: { children: ReactNode }) => (
    <motion.span
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <MotionWrapper>
        <a
          href={href}
          className={classes}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
          aria-disabled={disabled}
        >
          {content}
        </a>
      </MotionWrapper>
    );
  }

  return (
    <MotionWrapper>
      <button
        type={type}
        className={classes}
        onClick={onClick}
        disabled={disabled}
      >
        {content}
      </button>
    </MotionWrapper>
  );
}
