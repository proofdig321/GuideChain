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
  const sizeStyles = {
    sm: { padding: '32px 0' },
    md: { padding: '48px 0' }, 
    lg: { padding: '64px 0' }
  };

  const iconSizes = {
    sm: { fontSize: '36px' },
    md: { fontSize: '60px' },
    lg: { fontSize: '80px' }
  };

  return (
    <div style={{
      textAlign: 'center',
      ...sizeStyles[size]
    }}>
      <div style={{
        ...iconSizes[size],
        marginBottom: '16px',
        lineHeight: '1'
      }}>{icon}</div>
      <h3 style={{
        fontSize: 'clamp(18px, 4vw, 24px)',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '8px',
        lineHeight: '1.3'
      }}>{title}</h3>
      <p style={{
        color: '#6b7280',
        marginBottom: '24px',
        maxWidth: '448px',
        margin: '0 auto 24px auto',
        fontSize: 'clamp(14px, 3vw, 16px)',
        lineHeight: '1.5',
        padding: '0 16px'
      }}>{description}</p>
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '14px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}