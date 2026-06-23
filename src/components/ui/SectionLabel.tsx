import React from 'react';
import { cn } from '../../lib/utils';

interface SectionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className, ...props }: SectionLabelProps) {
  return (
    <span 
      className={cn(
        "text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-thread-mid-green)] font-medium mb-2.5 block",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
