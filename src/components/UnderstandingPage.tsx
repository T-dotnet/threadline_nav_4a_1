import { motion } from "motion/react";
import { Clock, Users, ArrowRight, Download } from "lucide-react";
import { cn } from "../lib/utils";
import { Child } from "../types";
import { getChildData } from "../data";
import { PageHeader } from "./ui/PageHeader";
import { HeroQuoteCard } from "./ui/HeroQuoteCard";
import { PageIcon } from "./ui/PageIcon";
import { HeroActionCard } from "./ui/HeroActionCard";
import { SectionTitle } from "./ui/SectionTitle";
import { SectionLabel } from "./ui/SectionLabel";
import { InsightCard } from "./ui/InsightCard";
import { ValueCard } from "./ui/ValueCard";
import { AreaItem } from "./ui/AreaItem";
import { FadeInScroll } from "./ui/FadeInScroll";
import { Button } from "./ui/Button";

export default function UnderstandingPage({
  onPageChange,
  currentChild,
}: {
  onPageChange: (page: any) => void;
  currentChild: Child;
}) {
  const data = getChildData(currentChild).understanding;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1000px] mx-auto pt-16 px-11 pb-16 max-md:px-5"
    >
      <PageHeader
        kicker="Understanding · What's happening"
        title={`A clear picture of how ${currentChild.name} is doing.`}
        titleClassName="text-[4rem] leading-[4.5rem] max-w-[16ch]"
        className="mb-24"
        description={
          <div className="flex gap-4.5 text-[0.82rem] text-[var(--color-thread-gray)] flex-wrap">
            <span className="flex items-center gap-1.5">
              <Clock className="w-[15px] h-[15px] stroke-[1.8] text-[var(--color-thread-mid-green)]" />{" "}
              Updated 14 June 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-[15px] h-[15px] stroke-[1.8] text-[var(--color-thread-mid-green)]" />{" "}
              Brought together from 4 sources
            </span>
          </div>
        }
      />

      {/* Picture Card */}
      <HeroQuoteCard
        kicker="The picture so far"
        quote={data.description}
        evidenceLevel={3}
        evidenceText="Strong, consistent evidence"
        className="mb-24"
        rightNode={
          <HeroActionCard
            icon={<Download className="w-[22px] h-[22px] stroke-[1.7]" />}
            title="Report"
            subtitle="Download PDF"
          />
        }
      />

      {/* Strengths Section */}
      <FadeInScroll className="mb-24">
        <div className="mb-5.5">
          <SectionLabel>
            What's going well
          </SectionLabel>
          <SectionTitle>
            Strengths to build on.
          </SectionTitle>
        </div>

        <div className="relative rounded-br-[36px] p-7.5 bg-watercolor">
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            <InsightCard
              icon={
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <circle cx="9" cy="9" r="3.4" />
                  <circle cx="15" cy="9" r="3.4" />
                  <circle cx="9" cy="15" r="3.4" />
                  <circle cx="15" cy="15" r="3.4" />
                </svg>
              }
              title="Creative Play"
              description="Displays rich imaginative flow, abstract play and artistic task retention. A real strength to integrate into curriculum pathways."
              cornerClass="rounded-tr-[28px]"
              variant="premium"
            />
            <InsightCard
              icon={
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M12 3l8 8-8 8-8-8z" />
                  <path d="M12 8l4 4-4 4-4-4z" />
                </svg>
              }
              title="Verbal Comprehension"
              description="Excellent grasp of spoken guidelines and a highly adaptive communicative scope. Enthusiastic sharing is seen daily."
              cornerClass="rounded-tl-[28px]"
              variant="premium"
            />
            <InsightCard
              icon={
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="12" cy="12" r="7" />
                </svg>
              }
              title="Social Empathy"
              description="Deep sensitivity to family members and primary playground buddies. Welcomes constructive social feedback loop cues."
              cornerClass="rounded-bl-[28px]"
              variant="premium"
            />
          </div>
        </div>
      </FadeInScroll>

      {/* Areas Affecting Section */}
      <FadeInScroll className="mb-24">
        <div className="mb-5.5">
          <SectionLabel>
            What we're seeing
          </SectionLabel>
          <SectionTitle>
            Areas affecting {currentChild.name}'s day.
          </SectionTitle>
        </div>

        <div className="border-b border-black/10">
          {data.focusAreas.map((area, idx) => (
            <AreaItem
              key={idx}
              title={area.title}
              impact=""
              evidence={3}
              description={area.description}
              sources={area.sources}
            />
          ))}
        </div>
      </FadeInScroll>

      {/* Values Section */}
      <FadeInScroll className="grid grid-cols-2 gap-4.5 mb-24 max-md:grid-cols-1">
        <ValueCard
          solid
          title="Evidence → formulation"
          content="Every insight here is traced to its source and reviewed by a qualified clinician — not generated in isolation. Where the evidence is strong, we say so plainly."
          cornerClass="rounded-tr-[32px]"
        />
        <ValueCard
          title="Honest about uncertainty"
          content="Where the evidence isn't strong enough, we don't force a conclusion. 'More to explore' is a valid, useful result — and the picture keeps building as new information arrives."
          cornerClass="rounded-bl-[32px]"
        />
      </FadeInScroll>

      {/* Forward Button */}
      <div className="flex items-center justify-between gap-5 border-t border-black/10 pt-7.5 flex-wrap">
        <div className="font-serif font-normal text-[1.55rem] leading-[1.34] tracking-tight text-[var(--color-thread-heading)] max-w-[24ch]">
          Understanding what's happening is the start.
        </div>
        <Button
          onClick={() => onPageChange("priorities")}
          variant="forest"
          className="px-5.5 py-3.5 text-[0.92rem] inline-flex items-center gap-2"
        >
          See what matters most <ArrowRight className="w-4 h-4 stroke-[2]" />
        </Button>
      </div>
    </motion.div>
  );
}






