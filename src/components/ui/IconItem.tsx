import React from 'react';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

interface IconItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  title: string;
  description?: string;
  iconClassName?: string;
  containerClassName?: string;
}

export const IconItem = React.forwardRef<HTMLDivElement, IconItemProps>(
  ({ className, icon: Icon, title, description, iconClassName, containerClassName, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-start gap-4', className)} {...props}>
        <div className={cn('p-3 bg-[var(--color-thread-cream)] rounded-xl shrink-0', containerClassName)}>
          <Icon className={cn('w-6 h-6 text-[var(--color-thread-mid-green)]', iconClassName)} />
        </div>
        <div>
          <h4 className="font-medium text-slate-900 text-[0.95rem] mb-1">{title}</h4>
          {description && (
            <p className="text-sm text-slate-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);
IconItem.displayName = 'IconItem';
