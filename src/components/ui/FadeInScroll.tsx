import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface FadeInScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
}

export const FadeInScroll = React.forwardRef<HTMLDivElement, FadeInScrollProps>(
  ({ className, children, delay = 0, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
FadeInScroll.displayName = 'FadeInScroll';
