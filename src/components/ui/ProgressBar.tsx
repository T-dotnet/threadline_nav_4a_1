import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  colorClass?: string;
  heightClass?: string;
  showLabel?: boolean;
  isSecondary?: boolean;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, colorClass = 'bg-[var(--color-thread-mid-green)]', heightClass = 'h-1.5', showLabel = false, isSecondary = false, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    return (
      <div className={className} {...props}>
        {showLabel && (
          <div className="flex justify-between items-center mb-1.5 text-xs font-medium text-[var(--color-thread-gray)]">
            <span>Progress</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        )}
        <div ref={ref} className={cn('w-full rounded-full overflow-hidden', isSecondary ? 'bg-[var(--hero-secondary-track)]' : 'bg-slate-100', heightClass)}>
          <motion.div 
            className={cn('h-full rounded-full', colorClass)}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>
    );
  }
);
ProgressBar.displayName = 'ProgressBar';
