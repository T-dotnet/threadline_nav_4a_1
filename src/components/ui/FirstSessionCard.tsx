import { CalendarClock } from "lucide-react";
import { cn } from "../../lib/utils";

interface FirstSessionCardProps {
  date: string;
  time: string;
  className?: string;
}

export function FirstSessionCard({ date, time, className }: FirstSessionCardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--hero-secondary-bg)] text-[var(--hero-secondary-text)] rounded-bl-[32px] p-7.5 flex flex-col h-full min-h-[260px]",
        className
      )}
    >
      <span className="text-[0.68rem] tracking-[0.12em] uppercase opacity-75 font-medium mb-5 block">
        First session
      </span>
      <div className="w-12 h-12 rounded-full bg-[var(--hero-secondary-icon-bg)] text-[var(--hero-secondary-icon-text)] flex items-center justify-center mb-6">
        <CalendarClock className="w-5 h-5 stroke-[1.8]" />
      </div>
      <div className="font-serif text-[2.4rem] leading-[1.05] tracking-tight text-[var(--color-thread-heading)]">
        {date}
      </div>
      <div className="mt-2 text-[1rem] opacity-75">
        {time} · Telehealth
      </div>
      <div className="mt-auto pt-5 border-t border-current/10 text-[0.84rem] opacity-70">
        Dr. Naomi Clark
      </div>
    </div>
  );
}
