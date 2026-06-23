import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronRight } from 'lucide-react';

interface ListItemCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
}

export function ListItemCard({ children, className, ...props }: ListItemCardProps) {
  return (
    <div 
      className={cn(
        "flex-1 flex items-center justify-between rounded-xl px-4 py-3.5 bg-white cursor-pointer transition-all group shadow-sm hover:shadow-md",
        className
      )}
      {...props}
    >
      <span className="text-[0.92rem] font-medium text-[var(--color-thread-dark-slate)]">{children}</span>
      <ChevronRight className="w-4 h-4 text-slate-400 stroke-[1.8] group-hover:text-[var(--color-thread-mid-green)] transition-colors" />
    </div>
  );
}
