import { motion } from "motion/react";
import {
  Clock,
  Layers,
  Check,
  ArrowRight,
  FileText,
  Home,
  Download,
} from "lucide-react";
import { cn } from "../lib/utils";

import { Child } from "../types";
import { PageHeader } from "./ui/PageHeader";
import { HeroQuoteCard } from "./ui/HeroQuoteCard";
import { PageIcon } from "./ui/PageIcon";
import { HeroActionCard } from "./ui/HeroActionCard";
import { SectionTitle } from "./ui/SectionTitle";
import { SectionLabel } from "./ui/SectionLabel";
import { SectionDescription } from "./ui/SectionDescription";
import { FadeInScroll } from "./ui/FadeInScroll";
import { TimelineStep } from "./ui/TimelineStep";
import { Button } from "./ui/Button";

export default function RoadmapPage({
  onPageChange,
  currentChild,
}: {
  onPageChange: (page: any) => void;
  currentChild: Child;
}) {
  const isLiam = currentChild.name === "Liam";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1000px] mx-auto pt-16 px-11 pb-16 max-md:px-5"
    >
      <PageHeader
        kicker="Roadmap · What to do"
        title={isLiam ? "Plan complete." : "Your plan, in clear steps."}
        titleClassName="text-[4rem] leading-[4.5rem] max-w-[16ch]"
        className="mb-24"
        description={
          <div className="flex gap-4.5 text-[0.82rem] text-[var(--color-thread-gray)] flex-wrap">
            <span className="flex items-center gap-1.5">
              <Clock className="w-[15px] h-[15px] stroke-[1.8] text-[var(--color-thread-mid-green)]" />{" "}
              Updated 14 June 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-[15px] h-[15px] stroke-[1.8] text-[var(--color-thread-mid-green)]" />{" "}
              Sequenced to build on itself
            </span>
          </div>
        }
      />

      <HeroQuoteCard
        kicker="The plan"
        quote={
          isLiam
            ? "Liam has successfully navigated the core roadmap. All initial intervention steps are finalized and verified."
            : "A short, prioritised plan — not a 40-page report. A few things to do, in an order where each step makes the next one easier."
        }
        className="mb-24"
        rightNode={
          <HeroActionCard
            icon={<Download className="w-[22px] h-[22px] stroke-[1.7]" />}
            title="Roadmap"
            subtitle="Download PDF"
          />
        }
        action={
          <div className="font-semibold text-[0.84rem] opacity-70">
            Focused on{" "}
            <strong className="opacity-100 ml-1">
              {isLiam ? "Maintenance & Enrichment" : "Classroom attention"}
            </strong> · {isLiam ? "Goal status: 100%" : "your Now priority"}
          </div>
        }
      />


      {/* Next Actions Section */}
      <FadeInScroll className="mb-24">
        <div className="mb-5.5">
          <SectionLabel>
            Recommended next actions
          </SectionLabel>
          <SectionTitle>
            {isLiam ? "Past milestones." : "Do these, in this order."}
          </SectionTitle>
        </div>

        <div className="relative mt-1">
          {/* Vertical Line */}
          <div className="absolute left-[11px] top-3.5 bottom-5 w-[2px] bg-black/10" />

          {isLiam ? (
            <>
              <TimelineStep
                done
                title="All core assessments completed"
                meta="March 2026 · Threadline"
                metaTag="Done"
                description="Liam's profile is fully mapped and integrated across clinical and educational benchmarks."
              />
              <TimelineStep
                done
                title="Social Integration Routines"
                meta="May 2026 · You + School"
                metaTag="Done"
                description="Custom peer-interaction templates are now part of Liam's daily school experience."
              />
              <TimelineStep
                done
                title="Self-Correction Mastery"
                meta="June 2026 · You"
                metaTag="Done"
                description="Liam has achieved independent regulation milestones. No further active routines required."
              />
            </>
          ) : (
            <>
              <TimelineStep
                done
                title="Assessment completed"
                meta="14 June · Threadline"
                metaTag="Done"
                description={`The full picture is in — brought together from you, ${currentChild.name}'s teacher, your clinician, and ${currentChild.name} herself.`}
              />
              <TimelineStep
                active
                title={`Share the classroom strategy pack with ${currentChild.name}'s teacher`}
                meta="This week · You"
                metaTag="In progress"
                description={`A short, teacher-friendly summary of what helps ${currentChild.name} focus, ready to send or hand over.`}
              />
              <TimelineStep
                todo
                title="Agree classroom accommodations with the school"
                meta="Next 2 weeks · You + School"
                metaTag="To do"
                description="A 20-minute conversation to put a few of the school strategies below in place and decide who's tracking them."
              />
            </>
          )}
        </div>
      </FadeInScroll>

      {/* Strategies Section */}
      <FadeInScroll className="mb-24">
        <div className="mb-5.5">
          <SectionLabel>
            Strategies that help
          </SectionLabel>
          <SectionTitle>
            Practical things to try.
          </SectionTitle>
        </div>

        <div className="relative rounded-br-[36px] p-7.5 bg-watercolor">
          <div className="grid grid-cols-2 gap-4.5 max-md:grid-cols-1">
            <StrategyCard
              title="At school"
              icon={<FileText className="w-[18px] h-[18px] stroke-[1.8]" />}
              items={isLiam ? [
                "Liam leads small peer groups during creative projects.",
                "Utilize advanced logic puzzles for extension during down time.",
                "Monthly check-in with teacher to maintain social velocity.",
              ] : [
                `Seat ${currentChild.name} near the front, away from busy walkways and windows.`,
                "Break tasks into short, clear chunks with quick check-ins.",
                "Use visual timers and simple written checklists.",
                "Agree a quiet signal for when she's drifting, instead of calling it out.",
              ]}
              cornerClass="rounded-tr-[28px]"
            />
            <StrategyCard
              title="At home"
              icon={<Home className="w-[18px] h-[18px] stroke-[1.8]" />}
              items={isLiam ? [
                "Encourage independent hobby exploration (e.g., coding, building).",
                "Shift from co-regulation to independent reflection sessions.",
                "Allow Liam to choose his own organizational tools.",
              ] : [
                "Keep homework at the same time and place each day.",
                "Short focused bursts with movement breaks between them.",
                "Clear the workspace of phones, screens and clutter.",
                "Notice and name what went well, however small.",
              ]}
              cornerClass="rounded-bl-[28px]"
            />
          </div>
        </div>
      </FadeInScroll>

      {/* Supports Section */}
      <FadeInScroll className="mb-24">
        <div className="mb-5.5">
          <SectionLabel>
            Supports worth exploring
          </SectionLabel>
          <SectionTitle>
            Options, not obligations.
          </SectionTitle>
        </div>
        <SectionDescription className="mb-4.5">
          {isLiam ? (
            "Liam's support structure is now self-sustaining. These options are for future enrichment."
          ) : (
            `Only what's likely to help, given where ${currentChild.name} is now. Explore these at your own pace, with your clinician.`
          )}
        </SectionDescription>

        <div className="border-b border-black/10">
          <SupportingRef
            title={isLiam ? "Leadership mentorship" : "School support plan"}
            description={isLiam ? "Connecting Liam with older student mentors to foster leadership skills." : "Formalise the classroom accommodations so they hold steady across teachers and terms."}
            status={isLiam ? "Suggested" : "Suggested"}
          />
          <SupportingRef
            title={isLiam ? "Creative Logic Course" : "Occupational therapy — focus & regulation"}
            description={isLiam ? "External curriculum to keep Liam's high creative retention challenged." : "Worth considering if the home strategies need more hands-on support down the track."}
            status={isLiam ? "Optional" : "Optional"}
          />
          <SupportingRef
            title={isLiam ? "Annual Review" : "GP / paediatric review"}
            description={isLiam ? "Scheduled baseline check to ensure maintenance phase remains stable." : "Keep your GP in the loop so medical options can be discussed if and when they're relevant."}
            status="In place"
          />
        </div>
      </FadeInScroll>

      {/* Forward Button */}
      <div className="flex items-center justify-between gap-5 border-t border-black/10 pt-7.5 flex-wrap">
        <div className="font-serif font-normal text-[1.55rem] leading-[1.34] tracking-tight text-[var(--color-thread-heading)] max-w-[24ch]">
          A plan only works if you track it.
        </div>
        <Button
          onClick={() => onPageChange("reviews")}
          variant="forest"
          className="px-5.5 py-3.5 text-[0.92rem] inline-flex items-center gap-2"
        >
          See how it's going <ArrowRight className="w-4 h-4 stroke-[2]" />
        </Button>
      </div>
    </motion.div>
  );
}



function StrategyCard({
  title,
  icon,
  items,
  cornerClass = "rounded-[18px]",
}: any) {
  return (
    <div
      className={cn(
        "bg-white p-6.5 shadow-premium",
        cornerClass,
      )}
    >
      <div className="flex items-center gap-2.75 mb-3.5">
        <div className="w-[34px] h-[34px] rounded-[9px] bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)] flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-[1.05rem] font-semibold tracking-tight leading-none text-[var(--color-thread-dark-slate)]">
          {title}
        </h3>
      </div>
      <div className="flex flex-col">
        {items.map((item: string, i: number) => (
          <div
            key={i}
            className={cn(
              "flex gap-2.75 py-2.75 border-t border-[var(--color-thread-light-gray)]/50 text-[0.92rem] text-[var(--color-thread-dark-slate)] leading-relaxed",
              i === 0 && "border-t-0 pt-0",
            )}
          >
            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-thread-mid-green)] mt-[8px]" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportingRef({ title, description, status }: any) {
  return (
    <div className="border-t border-[var(--color-thread-light-gray)] py-5 px-0.5 flex items-start justify-between gap-4.5">
      <div className="flex-1">
        <div className="text-[1.08rem] font-medium tracking-tight text-[var(--color-thread-dark-slate)]">
          {title}
        </div>
        <div className="text-[0.88rem] text-[var(--color-thread-gray)] mt-1 leading-relaxed max-w-[56ch]">
          {description}
        </div>
      </div>
      <span
        className={cn(
          "flex-shrink-0 text-[0.6rem] tracking-[0.1em] uppercase font-bold px-2.75 py-1.5 rounded-full whitespace-nowrap mt-0.75",
          status === "Suggested" &&
            "bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)]",
          status === "Optional" &&
            "bg-[var(--color-thread-off-white)] text-[var(--color-thread-gray)] border border-black/10",
          status === "In place" &&
            "bg-[var(--color-thread-mid-green)] text-white",
        )}
      >
        {status}
      </span>
    </div>
  );
}
