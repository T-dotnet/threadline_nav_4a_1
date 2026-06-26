import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'now' | 'future' | 'clinical' | 'active';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'clinical', ...props }, ref) => {
    const variants = {
      now: 'bg-[var(--color-thread-mid-green)] text-white border-transparent font-medium uppercase tracking-[0.1em] text-[0.7rem] px-3.5 py-1.5',
      future: 'bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)] border-transparent font-medium uppercase tracking-[0.1em] text-[0.7rem] px-3.5 py-1.5',
      clinical: 'bg-emerald-50 text-[var(--color-thread-mid-green)] border border-emerald-100/30 text-[0.68rem] px-2.5 py-1 font-medium',
      active: 'bg-[var(--color-thread-light-green)]/40 text-[var(--color-thread-mid-green)] border-transparent font-medium tracking-wide uppercase text-[0.74rem] px-3.5 py-1.5',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border transition-all duration-200',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

