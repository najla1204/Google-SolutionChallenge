import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  variant?: 'default' | 'accent' | 'urgent';
}

export const StatCard = ({ label, value, subtext, variant = 'default' }: StatCardProps) => {
  const variants = {
    default: "bg-white text-black border-black",
    accent: "bg-brand text-white border-black",
    urgent: "bg-red-600 text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
  };

  return (
    <div className={`p-6 border-2 flex flex-col ${variants[variant]}`}>
      <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${variant === 'default' ? 'text-black/40' : 'text-white/60'}`}>
        {label}
      </span>
      <div className="text-5xl font-black italic tracking-tighter mb-2">{value}</div>
      {subtext && (
        <span className={`text-[10px] font-bold ${variant === 'default' ? 'text-black/60' : 'text-white/80'}`}>
          {subtext}
        </span>
      )}
    </div>
  );
};
