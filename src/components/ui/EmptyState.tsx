/**
 * Empty State Component
 * Professional handling when no data exists
 */

"use client";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon: string;
  size?: "sm" | "md" | "lg";
}

export function EmptyState({ 
  title, 
  description, 
  actionLabel, 
  onAction, 
  icon,
  size = "md" 
}: EmptyStateProps) {
  const sizeClasses = {
    sm: "py-8",
    md: "py-12", 
    lg: "py-16"
  };

  const iconSizes = {
    sm: "text-4xl",
    md: "text-6xl",
    lg: "text-8xl"
  };

  return (
    <div className={`text-center ${sizeClasses[size]}`}>
      <div className={`${iconSizes[size]} mb-4`}>{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}