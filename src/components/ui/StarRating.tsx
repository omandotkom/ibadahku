/**
 * StarRating Component
 * 
 * Displays a star rating with filled and empty stars.
 * 
 * @component
 * @example
 * <StarRating rating={5} />
 * <StarRating rating={4.5} size="lg" />
 */

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export default function StarRating({
  rating,
  size = "md",
  className = "",
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`Rating: ${rating} out of 5 stars`}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`${sizeStyles[size]} fill-[var(--accent-gold)] text-[var(--accent-gold)]`}
        />
      ))}
      
      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className={`${sizeStyles[size]} text-gray-300`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={`${sizeStyles[size]} fill-[var(--accent-gold)] text-[var(--accent-gold)]`} />
          </div>
        </div>
      )}
      
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={`${sizeStyles[size]} text-gray-300`}
        />
      ))}
    </div>
  );
}
