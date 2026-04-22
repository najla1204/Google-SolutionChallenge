import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'critical' | 'high' | 'medium' | 'outline';
  className?: string;
}

export const Badge = ({ children, variant = 'primary', className = '' }: BadgeProps) => {
  const variants = {
    primary: "bg-[#0f172a] text-white border-[#0f172a]",
    critical: "bg-[#7c2d12] text-white border-[#7c2d12]", // Deep dark red/orange error-like but professional
    high: "bg-[#451a03] text-white border-[#451a03]",   // Very dark amber
    medium: "bg-[#171717] text-white border-[#171717]", // Deep charcoal
    outline: "bg-transparent text-black border-black/10"
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-none border-2 text-[10px] font-black uppercase tracking-widest ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
