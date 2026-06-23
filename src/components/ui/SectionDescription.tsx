import React from 'react';
import { cn } from '../../lib/utils';

interface SectionDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export function SectionDescription({ children, className, ...props }: SectionDescriptionProps) {
  return (
    <p 
      className={cn(
        "text-[1rem] text-[var(--color-thread-gray)] leading-relaxed max-w-[64ch]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
