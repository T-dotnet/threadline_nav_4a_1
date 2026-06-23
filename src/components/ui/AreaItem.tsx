import React from 'react';
import { cn } from '../../lib/utils';
import { EvidenceBadge } from './EvidenceBadge';

interface AreaItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  impact?: string;
  evidence: number;
  description: string | React.ReactNode;
  sources: string[];
}

export const AreaItem = React.forwardRef<HTMLDivElement, AreaItemProps>(
  ({ className, title, impact = "", evidence, description, sources, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("border-t border-black/10 py-6 px-0.5", className)}
        {...props}
      >
        <div className="flex items-start justify-between gap-4.5 max-md:flex-wrap">
          <div>
            <div className="text-[1.22rem] font-medium tracking-tight text-[var(--color-thread-dark-slate)]">
              {title}
            </div>
            {impact && (
              <div className="text-[0.78rem] text-[var(--color-thread-gray)] mt-1 font-sans">
                {impact}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end flex-shrink-0 pt-1">
            <EvidenceBadge
              level={evidence}
              layout="col"
              align="end"
              variant="default"
              labelClassName="font-semibold"
            />
          </div>
        </div>
        
        {typeof description === 'string' ? (
          <p className="text-[0.96rem] text-[var(--color-thread-gray)] leading-relaxed max-w-[62ch] mt-3 font-sans">
            {description}
          </p>
        ) : (
          <div className="mt-3">
            {description}
          </div>
        )}

        {sources && sources.length > 0 && (
          <div className="flex gap-1.75 flex-wrap mt-3.5">
            {sources.map((s: string) => (
              <span
                key={s}
                className="text-[0.7rem] text-[var(--color-thread-gray)] border border-black/10 rounded-full px-2.5 py-1"
              >
                <strong className="text-[var(--color-thread-dark-slate)] font-semibold">
                  {s}
                </strong>
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

AreaItem.displayName = 'AreaItem';
