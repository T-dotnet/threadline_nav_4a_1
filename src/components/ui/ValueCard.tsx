import React from 'react';
import { cn } from '../../lib/utils';

interface ValueCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  content: string | React.ReactNode;
  solid?: boolean;
  cornerClass?: string;
}

export const ValueCard = React.forwardRef<HTMLDivElement, ValueCardProps>(
  ({ className, title, content, solid = false, cornerClass = "rounded-[20px]", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-7.5 relative overflow-hidden",
          cornerClass,
          solid
            ? "bg-[var(--color-thread-mid-green)] text-white"
            : "bg-[var(--color-thread-cream)] text-[var(--color-thread-darkest)]",
          className
        )}
        {...props}
      >
        <svg
          className="absolute -right-[70px] -top-[80px] opacity-15 pointer-events-none"
          width="240"
          height="240"
        >
          <circle
            cx="120"
            cy="120"
            r="48"
            fill="none"
            stroke={solid ? "white" : "black"}
            strokeOpacity={solid ? "1" : "0.2"}
            strokeWidth="1"
          />
          <circle
            cx="120"
            cy="120"
            r="82"
            fill="none"
            stroke={solid ? "white" : "black"}
            strokeOpacity={solid ? "1" : "0.2"}
            strokeWidth="1"
          />
          <circle
            cx="120"
            cy="120"
            r="116"
            fill="none"
            stroke={solid ? "white" : "black"}
            strokeOpacity={solid ? "1" : "0.2"}
            strokeWidth="1"
          />
        </svg>
        <h3 className="text-[1.18rem] font-semibold tracking-tight mb-2.5 relative">
          {title}
        </h3>
        {typeof content === 'string' ? (
          <p
            className={cn(
              "text-[0.92rem] leading-relaxed relative",
              solid ? "text-white/85" : "text-[var(--color-thread-gray)]",
            )}
          >
            {content}
          </p>
        ) : (
          <div className="relative text-[0.92rem]">
            {content}
          </div>
        )}
      </div>
    );
  }
);

ValueCard.displayName = 'ValueCard';
