import React from 'react';
import Link from 'next/link';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  variant?: 'default' | 'accent' | 'urgent';
  href?: string;
}

export const StatCard = ({ label, value, subtext, variant = 'default', href }: StatCardProps) => {
  const variants = {
    default: "bg-white text-black border-black hover:bg-slate-50 transition-colors cursor-pointer",
    accent: "bg-brand text-white border-black hover:brightness-110 transition-all cursor-pointer",
    urgent: "bg-red-600 text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
  };

  const content = (
    <div className={`p-6 border-2 flex flex-col h-full ${variants[variant]}`}>
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

  if (href) {
    return <Link href={href} className="block h-full">{content}</Link>;
  }

  return content;
};
