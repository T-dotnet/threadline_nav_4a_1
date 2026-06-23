import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  variant?: 'default' | 'search';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, variant = 'default', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'w-full transition-all font-medium placeholder:font-normal placeholder:text-[var(--color-thread-placeholder)] focus:outline-none',
          variant === 'default' && 'bg-[var(--color-thread-off-white)]/50 border border-black/10 rounded-xl px-4 py-3 text-[0.95rem] text-[var(--color-thread-dark-slate)] focus:ring-2 focus:ring-[var(--color-thread-mid-green)]/20 focus:border-[var(--color-thread-mid-green)]/30',
          variant === 'search' && 'bg-white border border-black/10 rounded-xl px-10.5 py-3 text-[0.94rem] focus:border-[var(--color-thread-mid-green)] focus:ring-2 focus:ring-[var(--color-thread-mid-green)]/10',
          error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500/30',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

