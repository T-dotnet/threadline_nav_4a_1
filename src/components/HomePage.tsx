import { motion } from "motion/react";
import { Check, ChevronRight, Calendar, Plus, Send } from "lucide-react";
import { cn } from "../lib/utils";
import React, { useState, useRef } from "react";
import { Child } from "../types";
import { getChildData } from "../data";
import { ProgressBar } from "./ui/ProgressBar";
import { PageHeader } from "./ui/PageHeader";
import { HeroQuoteCard } from "./ui/HeroQuoteCard";
import { ActionLink } from "./ui/ActionLink";
import { FadeInScroll } from "./ui/FadeInScroll";
import { Button } from "./ui/Button";

export default function HomePage({
  onPageChange,
  currentChild,
}: {
  onPageChange: (page: any) => void;
  currentChild: Child;
}) {
  const [isActionDone, setIsActionDone] = useState(false);
  const data = getChildData(currentChild).home;

  const [aiInput, setAiInput] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim() && !attachedFile) return;

    setIsSubmitting(true);
    setShowResponse(true);

    const userQuery = aiInput.toLowerCase();
    let response = `I've analyzed your request for ${currentChild.name}. Let me prepare a tailored recommendation for you...`;

    if (
      userQuery.includes("letter") ||
      userQuery.includes("school") ||
      userQuery.includes("teacher")
    ) {
      response = `Drafted a school advocacy outline for ${currentChild.name} regarding transition support. This asks teachers to offer clear visual warnings 3 minutes before any major routine changes. Ready in resources.`;
    } else if (
      userQuery.includes("routine") ||
      userQuery.includes("morning") ||
      userQuery.includes("at home")
    ) {
      response = `Recommended action: Create a structured routine grid of early morning stages for ${currentChild.name}, utilising visual timers or tick-off charts.`;
    } else if (userQuery.includes("focus") || userQuery.includes("attention")) {
      response = `Instruction strategy: Introduce brief, 5-minute play-based co-regulation tactics for ${currentChild.name} to anchor focus prior to high-performance tasks.`;
    } else {
      response = `AI analysis active: Preparing proactive behavioral and academic adjustments based on ${currentChild.name}'s current clinical patterns.`;
    }

    setResponseMessage("Drafting recommendations...");

    setTimeout(() => {
      setResponseMessage(response);
      setIsSubmitting(false);
    }, 1200);

    setAiInput("");
  };

  const isLiam = currentChild.name === "Liam";
  const synthesisQuote = isLiam 
    ? "Liam has achieved all current developmental milestones for this phase; focus now shifts to long-term enrichment and peer-leadership skills."
    : "Maya is showing marked improvements in auditory processing, though focus remains heavily tethered to circadian stability.";
  
  const progressValue = isLiam ? 100 : 65;
  const progressStatus = isLiam ? "all goals met — maintenance phase" : "on track — steady progress";
  const nextReview = isLiam ? "12 December" : "12 September";
  const evidenceTag = isLiam ? "Consolidated" : "Emerging";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1000px] mx-auto pt-16 px-11 pb-16 max-md:px-5"
    >
      <PageHeader
        kicker="Tuesday · Good morning"
        title="Here's where to put your energy today, Sarah."
        titleClassName="text-[4rem] leading-[4.5rem] max-w-[18ch]"
        className="mb-24"
      />

      <div className="grid grid-cols-[1.6fr_1fr] md:gap-x-10 max-md:grid-cols-1 max-md:gap-y-14">
        <div className="flex flex-col max-md:gap-y-14 md:contents">
          {/* Focus Card */}
          <FadeInScroll className="md:col-start-1 md:row-start-1">
            <HeroQuoteCard
              kicker="Key synthesis"
              quote={synthesisQuote}
              evidenceLevel={3}
              evidenceText={evidenceTag}
              className="h-full"
              action={
                <Button
                  type="button"
                  variant="mint"
                  onClick={() => onPageChange("emerging-details")}
                  rightIcon={<ChevronRight className="w-3.5 h-3.5 stroke-[2]" />}
                >
                  Learn more
                </Button>
              }
            />
          </FadeInScroll>

        </div>

        <div className="flex flex-col max-md:gap-y-6 md:contents">
          {/* Stat Card */}
          <FadeInScroll delay={0.1} className="md:col-start-2 md:row-start-1 bg-[var(--hero-secondary-bg)] text-[var(--hero-secondary-text)] rounded-bl-[32px] p-7.5 flex flex-col h-full">
            <span className="text-[0.75rem] tracking-[0.1em] uppercase opacity-70 font-medium mb-5 block flex-shrink-0">
              This quarter's plan
            </span>
            <div className="flex-1 min-h-[1.5rem]"></div>
            <div className="flex flex-col mt-auto">
              <div className="flex items-end gap-3.5 mb-5.5">
                <div className="font-serif text-[4rem] leading-[4.5rem] tracking-[-2.2px]">
                  {progressValue}%
                </div>
                <div className="text-[1.125rem] opacity-80 leading-tight pb-[0.8rem]">
                  {progressStatus.split(' — ')[0]} —<br />
                  {progressStatus.split(' — ')[1]}
                </div>
              </div>
              <div className="mb-5.5">
                <ProgressBar
                  value={progressValue}
                  max={100}
                  heightClass="h-3"
                  isSecondary
                  colorClass="bg-[var(--hero-secondary-text)]"
                />
              </div>
              <div className="flex items-center gap-2 text-[0.84rem] opacity-60 border-t border-current/10 pt-4.5">
                <Calendar className="w-4 h-4 stroke-[1.8]" />
                <span>
                  Next review:{" "}
                  <strong className="opacity-100">
                    {nextReview}
                  </strong>
                </span>
              </div>
            </div>
          </FadeInScroll>

        </div>
      </div>

      {/* Timeline List - Full Width */}
      <FadeInScroll delay={0.1} className="mt-20 mb-10">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-thread-mid-green)] font-medium">
            Now · Next · Later
          </span>
          <ActionLink
            variant="default"
            as="button"
            onClick={() => onPageChange("priorities")}
          >
            View all priorities
          </ActionLink>
        </div>

        <div className="mt-1.5 flex flex-col">
          <TimelineItem
            tag="Now"
            title={data.timeline.now.title}
            meta={data.timeline.now.meta}
            content={data.timeline.now.content}
            progress={35}
            isFirst
            active
          />
          <TimelineItem
            tag="Next"
            title={data.timeline.next.title}
            meta={data.timeline.next.meta}
            content={data.timeline.next.content}
            progress={15}
          />
          <TimelineItem
            tag="Later"
            title={data.timeline.later.title}
            meta={data.timeline.later.meta}
            content={data.timeline.later.content}
            progress={0}
          />
          <div className="border-b border-black/10" />
        </div>
      </FadeInScroll>

      {/* AI Sticky Floating Input Bar */}
      <div className="sticky bottom-6 left-0 right-0 z-40 mt-14">
        {showResponse && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="max-w-[640px] mx-auto mb-4 bg-white/95 backdrop-blur border border-black/5 rounded-tl-[32px] p-5 shadow-[0_12px_40px_-10px_rgba(22,36,60,0.12)] relative"
          >
            <button
              onClick={() => setShowResponse(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors w-6 h-6 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 cursor-pointer text-[1rem]"
            >
              ×
            </button>
            <div className="text-[0.66rem] tracking-[0.14em] uppercase text-[var(--color-thread-mid-green)] font-bold mb-1.5">
              Co-Pilot Assistant
            </div>
            <p
              className={cn(
                "text-[0.94rem] leading-relaxed transition-opacity duration-200",
                isSubmitting
                  ? "text-slate-400 italic font-normal"
                  : "text-slate-700",
              )}
            >
              {responseMessage}
            </p>
          </motion.div>
        )}

        <form
          onSubmit={handleAISubmit}
          className="bg-white rounded-full p-2 pl-4 pr-2 flex items-center gap-2.5 shadow-[0_12px_40px_-8px_rgba(22,36,60,0.15),_0_0_20px_2px_rgba(108,122,114,0.06)] border border-black/5 max-w-[640px] mx-auto hover:border-black/10 hover:shadow-[0_16px_48px_-8px_rgba(22,36,60,0.18),_0_0_24px_4px_rgba(108,122,114,0.08)] transition-all duration-300"
        >
          <input
            type="file"
            id="ai-file-upload"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <button
            type="button"
            onClick={triggerFileUpload}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-50 hover:bg-[var(--color-thread-off-white)] text-[var(--color-thread-muted-green)] hover:text-[var(--color-thread-mid-green)] flex items-center justify-center transition-all cursor-pointer relative"
            title="Attach file"
          >
            <Plus className="w-[19px] h-[19px] stroke-[2]" />
            {attachedFile && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[var(--color-thread-mid-green)] rounded-full" />
            )}
          </button>

          <input
            type="text"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder={`Ask AI or draft a letter for ${currentChild.name}...`}
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-[0.98rem] text-slate-800 placeholder:text-slate-400 py-1.5 focus:outline-none"
          />

          <button
            type="submit"
            disabled={!aiInput.trim() && !attachedFile}
            className={cn(
              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer",
              aiInput.trim() || attachedFile
                ? "bg-[var(--color-thread-mid-green)] text-white hover:opacity-90 shadow-sm"
                : "bg-slate-100 text-slate-300 cursor-not-allowed",
            )}
          >
            <Send className="w-[17px] h-[17px] stroke-[2.2]" />
          </button>
        </form>
        {attachedFile && (
          <div className="max-w-[640px] mx-auto mt-2.5 px-4 animate-in fade-in slide-in-from-bottom-1 duration-200">
            <div className="inline-flex items-center gap-2 bg-[var(--color-thread-light-green)]/40 border border-[var(--color-thread-mid-green)]/20 px-3 py-1 rounded-full text-[0.82rem] text-[var(--color-thread-mid-green)] font-medium">
              <span className="truncate max-w-[200px]">
                {attachedFile.name}
              </span>
              <button
                type="button"
                onClick={() => setAttachedFile(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer text-[1.1rem] leading-none"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TimelineItem({
  tag,
  title,
  meta,
  content,
  progress = 0,
  active = false,
  isFirst = false,
}: any) {
  const [isOpen, setIsOpen] = useState(active);

  return (
    <div
      className={cn(
        "border-t border-black/10 cursor-pointer group hover:bg-black/[0.01] transition-all",
        isOpen && "bg-black/[0.01]",
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center gap-4 py-5.5 px-1">
        <span
          className={cn(
            "text-[0.75rem] tracking-[0.1em] font-medium w-12 flex-shrink-0 uppercase",
            active
              ? "text-[var(--color-thread-mid-green)]"
              : "text-[var(--color-thread-placeholder)]",
          )}
        >
          {tag}
        </span>
        <div className="flex-1">
          <div
            className={cn(
              "text-[1.18rem] font-medium tracking-tight",
              active
                ? "text-[var(--color-thread-heading)]"
                : "text-[var(--color-thread-dark-slate)]",
            )}
          >
            {title}
            <div className="text-[0.8rem] text-[var(--color-thread-gray)] font-normal mt-0.5 tracking-normal">
              {meta}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 w-[22px] h-[22px] relative">
          <div className="absolute left-0 top-1/2 w-full h-[1.5px] bg-[var(--color-thread-dark-slate)] transition-all" />
          <div
            className={cn(
              "absolute top-0 left-1/2 h-full w-[1.5px] bg-[var(--color-thread-dark-slate)] transition-all",
              isOpen && "scale-y-0",
            )}
          />
        </div>
      </div>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[260px]" : "max-h-0",
        )}
      >
        <div className="px-16 pb-6.5 max-md:px-0">
          <span className="text-[0.6rem] tracking-[0.14em] uppercase text-slate-500 font-semibold mb-2 block">
            Why this matters most
          </span>
          <p className="text-[0.96rem] text-slate-500 leading-relaxed max-w-[60ch]">
            {content}
          </p>
          <div className="border-t border-black/10 mt-4 pt-3.5 flex items-center justify-between">
            <span className="text-[0.78rem] text-slate-500 font-medium">
              Plan Progress: {progress}%
            </span>
            <ActionLink variant="slate" as="span">
              See details
            </ActionLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickLink({ label, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3.5 py-4 px-0.5 border-t border-black/10 transition-all",
        onClick ? "cursor-pointer group" : "cursor-default opacity-50",
      )}
    >
      <span className="flex-1 text-[0.96rem] font-medium group-hover:text-[var(--color-thread-mid-green)] transition-colors">
        {label}
      </span>
      <ChevronRight className="w-4 h-4 text-slate-500 stroke-[1.8]" />
    </div>
  );
}
