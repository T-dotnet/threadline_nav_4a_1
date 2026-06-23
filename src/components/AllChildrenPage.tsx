import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronRight, Calendar, Users, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import { Child, Page } from "../types";
import { ProgressBar } from "./ui/ProgressBar";
import { PageHeader } from "./ui/PageHeader";
import { EvidenceBadge } from "./ui/EvidenceBadge";
import { ActionLink } from "./ui/ActionLink";
import { Button } from "./ui/Button";

interface AllChildrenPageProps {
  onPageChange: (page: Page) => void;
  childrenList: Child[];
  onChildChange: (child: Child) => void;
}

export default function AllChildrenPage({
  onPageChange,
  childrenList,
  onChildChange,
}: AllChildrenPageProps) {
  const [isSecondaryLight, setIsSecondaryLight] = useState(true);

  useEffect(() => {
    let style = "light";
    try {
      style = localStorage.getItem("thread-secondary-style") || "light";
    } catch (e) {
      console.warn("Storage access is blocked or restricted:", e);
    }
    setIsSecondaryLight(style === "light");
  }, []);

  // Helper to retrieve child-specific premium synthesis quote and progression details
  const getChildSynthesisData = (childName: string) => {
    switch (childName) {
      case "Liam":
        return {
          quote: "Liam has achieved all current developmental milestones for this phase; focus now shifts to long-term enrichment and peer-leadership skills.",
          evidenceLevel: 3,
          progress: 100,
          progressText: "all goals met — maintenance phase",
          nextReview: "12 December",
          accentColor: "text-[var(--color-thread-mid-green)]",
          theme: "green",
        };
      case "Sophia":
        return {
          quote: "Sophia exhibits brilliant verbal reasoning and high peer sensitivity, but academic organization challenges necessitate visual scheduling aids.",
          evidenceLevel: 3,
          progress: 58,
          progressText: "good pacing — steady progress",
          nextReview: "24 September",
          accentColor: "text-[var(--color-thread-mid-green)]",
          theme: "white",
        };
      case "Maya":
      default:
        return {
          quote: "Maya is showing marked improvements in auditory processing, though focus remains heavily tethered to circadian stability.",
          evidenceLevel: 3,
          progress: 65,
          progressText: "on track — steady progress",
          nextReview: "12 September",
          accentColor: "text-[var(--color-thread-mid-green)]",
          theme: "white",
        };
    }
  };

  const handleFocusChild = (child: Child) => {
    onChildChange(child);
    onPageChange("home");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1100px] mx-auto pt-16 px-11 pb-16 max-md:px-5 font-sans"
    >
      <PageHeader
        kicker="Family Synthesis · Overview"
        title="All Children at a glance."
        description="Monitor your family's dynamic clinical profiles and milestones side-by-side. Use any profile card to dive directly into detailed assessments."
        titleClassName="text-[3.8rem] leading-[4.3rem]"
      />

      <div className="flex flex-col gap-16">
        {childrenList.map((child, index) => {
          const childData = getChildSynthesisData(child.name);
          const isGreenTheme = childData.theme === "green";

          return (
            <motion.section
              key={child.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="border-b border-black/5 pb-14 last:border-0"
              id={`child-section-${child.name.toLowerCase()}`}
            >
              {/* Child Section Row Header */}
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-[44px] h-[44px] rounded-full bg-[var(--color-thread-mid-green)] text-white flex items-center justify-center font-semibold text-[1.05rem] font-serif shadow-sm">
                    {child.initial}
                  </div>
                  <div>
                    <h2 className="text-[1.8rem] font-serif font-normal tracking-tight text-[var(--color-thread-heading)] leading-none">
                      {child.name}'s Profile
                    </h2>
                    <span className="text-[0.84rem] text-slate-500 font-medium block mt-1">
                      Age {child.age} · Developmental track
                    </span>
                  </div>
                </div>

                <ActionLink
                  variant="forest"
                  as="button"
                  onClick={() => handleFocusChild(child)}
                  id={`focus-${child.name.toLowerCase()}`}
                  icon={ArrowRight}
                  className="text-[0.88rem]"
                >
                  Manage {child.name}'s Dashboard
                </ActionLink>
              </div>

              {/* Cards Grid: Synthesis (left) and Quarter Plan (right) */}
              <div className="grid grid-cols-[1.5fr_1fr] md:gap-x-8 max-md:grid-cols-1 max-md:gap-y-8">
                
                {/* Dynamic Synthesis Card */}
                <div
                  className={cn(
                    "relative p-8 rounded-tr-[36px] overflow-hidden flex flex-col justify-between h-[300px] transition-shadow",
                    isGreenTheme 
                      ? "bg-[var(--color-thread-mid-green)] text-white" 
                      : "bg-[var(--hero-bg)] text-[var(--color-thread-dark-slate)]"
                  )}
                  id={`synthesis-card-${child.name.toLowerCase()}`}
                >
                  {/* Decorative Background Rings */}
                  <svg
                    className={cn(
                      "absolute -right-16 -bottom-20 pointer-events-none transition-opacity",
                      isGreenTheme ? "text-white/10" : "text-[var(--color-thread-mid-green)]/5"
                    )}
                    width="260"
                    height="260"
                  >
                    <circle cx="130" cy="130" r="48" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="130" cy="130" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="130" cy="130" r="114" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>

                  <div className="relative">
                    <span
                      className={cn(
                        "text-[0.68rem] tracking-[0.12em] uppercase font-bold mb-4 block",
                        isGreenTheme ? "text-emerald-200" : "text-[var(--color-thread-mid-green)]"
                      )}
                    >
                      Clinician Synthesis Summary
                    </span>
                    <p className="font-serif font-normal text-[1.38rem] leading-[1.4] tracking-tight max-w-[34ch]">
                      "{childData.quote}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto relative">
                    <EvidenceBadge
                      level={childData.evidenceLevel}
                      label="Strong formulation"
                      variant={isGreenTheme ? 'green' : 'default'}
                      labelClassName={cn("text-[0.68rem] tracking-[0.06em] font-bold", isGreenTheme ? "text-emerald-100" : "text-slate-400")}
                    />

                    <Button
                      onClick={() => {
                        onChildChange(child);
                        onPageChange("understanding");
                      }}
                      variant={isGreenTheme ? "white" : "mint"}
                      rightIcon={<ChevronRight className="w-3.5 h-3.5 stroke-[2]" />}
                    >
                      Open Insights
                    </Button>
                  </div>
                </div>

                {/* Quarter Plan Card */}
                <div
                  className="bg-[var(--hero-secondary-bg)] text-[var(--hero-secondary-text)] rounded-bl-[32px] p-7.5 flex flex-col justify-between h-[300px] transition-shadow relative"
                  id={`plan-card-${child.name.toLowerCase()}`}
                >
                  <div>
                    <span className="text-[0.68rem] tracking-[0.12em] uppercase opacity-75 font-bold mb-5 block">
                      This Quarter's Plan Progress
                    </span>
                    
                    <div className="flex items-end gap-3.5 mb-2 mt-4">
                      <div className="font-serif text-[3.6rem] leading-none tracking-[-1.5px] font-normal">
                        {childData.progress}%
                      </div>
                      <div className="text-[0.98rem] opacity-90 leading-snug pb-1 flex flex-col">
                        <span>on track</span>
                        <span className="opacity-75 text-[0.82rem]">{childData.progressText}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mt-auto w-full">
                    <div className="mb-5">
                      <ProgressBar
                        value={childData.progress}
                        max={100}
                        heightClass="h-2.5"
                        isSecondary
                        colorClass="bg-[var(--hero-secondary-text)]"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 text-[0.8rem] opacity-75 border-t border-current/10 pt-4">
                      <Calendar className="w-4 h-4 stroke-[1.8]" />
                      <span>
                        Next clinical review:{" "}
                        <strong className="font-semibold ml-1">
                          {childData.nextReview}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.section>
          );
        })}
      </div>

      {/* Footer support notice */}
      <div className="mt-8 pt-8 border-t border-black/5 flex justify-between items-center flex-wrap gap-4 text-[0.84rem] text-slate-500 text-center md:text-left">
        <span className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[var(--color-thread-mid-green)]" />
          Coordinated clinical care dashboard for families
        </span>
        <ActionLink
          variant="default"
          as="button"
          onClick={() => onPageChange("settings")}
          icon={null}
        >
          Manage profile settings & credentials
        </ActionLink>
      </div>
    </motion.div>
  );
}
