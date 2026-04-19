import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'critical' | 'high' | 'medium' | 'outline';
  className?: string;
}

export const Badge = ({ children, variant = 'primary', className = '' }: BadgeProps) => {
  const variants = {
    primary: "bg-brand/10 text-brand border-brand",
    critical: "bg-red-500/10 text-red-600 border-red-600",
    high: "bg-orange-500/10 text-orange-600 border-orange-600",
    medium: "bg-blue-500/10 text-blue-600 border-blue-600",
    outline: "bg-transparent text-black border-black/20"
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-none border-2 text-[10px] font-black uppercase tracking-widest ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
