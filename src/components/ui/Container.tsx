/**
 * Container Component
 * 
 * Responsive container with consistent max-width and padding.
 * Mobile-first design approach.
 * 
 * @component
 * @example
 * <Container size="lg">
 *   <Content />
 * </Container>
 */

import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  id?: string;
}

const sizeStyles = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export default function Container({
  children,
  size = "xl",
  className = "",
  id,
}: ContainerProps) {
  return (
    <div
      id={id}
      className={`
        mx-auto w-full
        px-4 sm:px-6 lg:px-8 xl:px-12
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
