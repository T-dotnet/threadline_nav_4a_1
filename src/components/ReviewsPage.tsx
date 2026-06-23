import { motion } from "motion/react";
import {
  Clock,
  Calendar,
  ArrowUpRight,
  Minus,
  Plus,
  Check,
  Download,
} from "lucide-react";
import { cn } from "../lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

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

const data = [
  { name: "14 Jun", value: 165 },
  { name: "Jul", value: 150 },
  { name: "Aug", value: 128 },
  { name: "Now", value: 105 },
  { name: "Future", value: 80 },
  { name: "12 Sep", value: 52 },
];

const liamData = [
  { name: "Mar", value: 180 },
  { name: "Apr", value: 140 },
  { name: "May", value: 90 },
  { name: "Jun", value: 50 },
  { name: "Now", value: 20 },
  { name: "End", value: 0 },
];

export default function ReviewsPage({
  onPageChange,
  currentChild,
}: {
  onPageChange: (page: any) => void;
  currentChild: Child;
}) {
  const isLiam = currentChild.name === "Liam";
  const activeData = isLiam ? liamData : data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1000px] mx-auto pt-16 px-11 pb-16 max-md:px-5"
    >
      <PageHeader
        kicker="Reviews · How we're progressing"
        title={`How ${currentChild.name}'s doing over time.`}
        titleClassName="text-[4rem] leading-[4.5rem] max-w-[16ch]"
        className="mb-24"
        description={
          <div className="flex gap-4.5 text-[0.82rem] text-[var(--color-thread-gray)] flex-wrap">
            <span className="flex items-center gap-1.5">
              <Clock className="w-[15px] h-[15px] stroke-[1.8] text-[var(--color-thread-mid-green)]" />{" "}
              Updated 14 June 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-[15px] h-[15px] stroke-[1.8] text-[var(--color-thread-mid-green)]" />{" "}
              {isLiam ? "Maintenance phase active" : "Next full review 12 September"}
            </span>
          </div>
        }
      />

      <HeroQuoteCard
        kicker="The long view"
        quote={
          isLiam ? (
            `Liam has achieved all baseline targets. His profile now reflects a state of sustained developmental mastery.`
          ) : (
            `Most assessments are a snapshot. Yours keeps updating — so the picture stays true as ${currentChild.name} grows, not frozen at the day you got the report.`
          )
        }
        className="mb-24"
        rightNode={
          <HeroActionCard
            icon={<Download className="w-[22px] h-[22px] stroke-[1.7]" />}
            title={isLiam ? "Summary" : "Reminder"}
            subtitle="Download report"
          />
        }
        action={
          <div>
            <div className="mt-6 flex items-center gap-3 w-full max-w-[420px] relative">
              <div className="flex-1 h-[5px] rounded-full bg-black/5 overflow-hidden">
                <div
                  className="bg-[var(--hero-accent)] h-full rounded-full"
                  style={{ width: isLiam ? "100%" : "65%" }}
                />
              </div>
              <span className="text-[0.78rem] opacity-70 flex-shrink-0">
                {isLiam ? "100% · complete" : "65% · on track"}
              </span>
            </div>
            <div className="inline-flex items-center gap-2.25 mt-1.5 relative font-semibold text-[0.84rem] opacity-80">
              {isLiam ? "Maintenance tracking enabled" : "Next full review · 12 September"}
            </div>
          </div>
        }
      />


      {/* Progress Chart Section */}
      <FadeInScroll className="mb-24">
        <div className="mb-5.5">
          <SectionLabel className="mb-2">
            Progress over time
          </SectionLabel>
          <SectionTitle>
            {isLiam ? "Milestones achieved." : "The trend, not a single moment."}
          </SectionTitle>
        </div>

        <div className="bg-[var(--color-thread-light-green)] border-[var(--color-thread-light-gray)] rounded-tr-[36px] p-7.5 pb-4">
          <SectionLabel className="mb-2">
            {isLiam ? "Overall Developmental Consolidation" : "Focus & engagement at school"}
          </SectionLabel>
          <h3 className="text-[1.15rem] font-semibold tracking-tight text-[var(--color-thread-dark-slate)] mb-5.5">
            {isLiam ? "Goal reached in June" : "Trending up since the assessment"}
          </h3>

          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activeData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-thread-mid-green)"
                      stopOpacity={0.14}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-thread-mid-green)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" hide={true} />
                <YAxis hide={true} domain={[0, 200]} reversed />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-thread-mid-green)"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between mt-3 text-[0.72rem] text-[var(--color-thread-gray)] px-2 tracking-[0.03em] uppercase font-medium">
            {isLiam ? (
              <>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span className="font-bold text-[var(--color-thread-dark-slate)]">
                  Jun
                </span>
                <span>Now</span>
              </>
            ) : (
              <>
                <span>14 Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span className="font-bold text-[var(--color-thread-dark-slate)]">
                  Now
                </span>
                <span>12 Sep</span>
              </>
            )}
          </div>
        </div>
        <SectionDescription className="mt-6">
          {isLiam ? (
            "Liam's trajectory mirrors the planned interventions perfectly. He has settled into a maintenance rhythm where new skills are generalized across home and school automatically."
          ) : (
            `A steady upward trend since the assessment as the classroom strategies take hold. The predicted path is where we'd expect ${currentChild.name} to be by your first full review on 12 September.`
          )}
        </SectionDescription>
      </FadeInScroll>

      {/* What's Changed Section */}
      <FadeInScroll className="mb-24">
        <div className="bg-watercolor rounded-br-[36px] p-7.5">
          <div className="bg-white rounded-bl-[32px] p-7.5 shadow-premium">
            <div className="mb-5.5">
              <SectionLabel>
                What's changed
              </SectionLabel>
              <SectionTitle>
                {isLiam ? "Current status summaries." : "How the picture has moved."}
              </SectionTitle>
            </div>
            <div className="border-b border-black/10">
              {isLiam ? (
                <>
                  <TrendItem
                    title="Self-Correction"
                    note="Fully independent in most social contexts."
                    status="Complete"
                    icon={<Check className="w-3 h-3 stroke-[2.4]" />}
                  />
                  <TrendItem
                    title="Task Endurance"
                    note="Extended engagement is now a stable characteristic."
                    status="Complete"
                    icon={<Check className="w-3 h-3 stroke-[2.4]" />}
                  />
                  <TrendItem
                    title="Social Connection"
                    note="Emerging as a peer leader in school creative projects."
                    status="Strength"
                    icon={<ArrowUpRight className="w-3 h-3 stroke-[2.4]" />}
                  />
                </>
              ) : (
                <>
                  <TrendItem
                    title="Classroom attention"
                    note="Focus in class is improving as the strategies take hold."
                    status="Improving"
                    icon={<ArrowUpRight className="w-3 h-3 stroke-[2.4]" />}
                  />
                  <TrendItem
                    title="Emotional regulation at home"
                    note="Holding steady — likely to ease further as attention improves."
                    status="Steady"
                    icon={<Minus className="w-3 h-3 stroke-[2.4]" />}
                  />
                  <TrendItem
                    title="Sleep"
                    note="A new signal since the assessment — now on the watchlist."
                    status="Emerging"
                    icon={<Plus className="w-3 h-3 stroke-[2.4]" />}
                  />
                  <TrendItem
                    title="Friendships & social connection"
                    note="Still going well — no change needed."
                    status="Strength"
                    icon={<Check className="w-3 h-3 stroke-[2.4]" />}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </FadeInScroll>

      {/* Review Rhythm Section */}
      <FadeInScroll className="mb-24">
        <div className="mb-5.5">
          <SectionLabel>
            Your review rhythm
          </SectionLabel>
          <SectionTitle>
            Clarity that keeps up.
          </SectionTitle>
        </div>

        <div className="relative mt-1">
          <div className="absolute left-[11px] top-3.5 bottom-5 w-[2px] bg-black/10" />
          <TimelineStep
            done
            title="Assessment & first picture"
            meta="14 June · baseline established"
            description="The starting point — what's happening, what matters most, and the first plan."
          />
          <TimelineStep
            active
            title="Progress tracking"
            meta="Now · between reviews"
            description="We watch how priorities move week to week and flag anything emerging — like sleep — before it becomes urgent."
          />
          <TimelineStep
            todo
            title="First full review"
            meta="12 September · You + Threadline"
            description="Revisit priorities, update the plan, and confirm what's improved and what to focus on next."
          />
          <TimelineStep
            todo
            title="Ongoing reviews"
            meta={`Each term · As ${currentChild.name} grows`}
            description="The picture keeps updating across the years — because needs shift, and clarity shouldn't expire."
          />
        </div>
      </FadeInScroll>

      {/* Forward Button */}
      <div className="flex items-center justify-between gap-5 border-t border-black/10 pt-7.5 flex-wrap">
        <div className="font-serif font-normal text-[1.55rem] leading-[1.34] tracking-tight text-[var(--color-thread-heading)] max-w-[24ch]">
          This is the loop that keeps your clarity current.
        </div>
        <Button
          onClick={() => onPageChange("home")}
          variant="forest"
          className="px-5.5 py-3.5 text-[0.92rem] inline-flex items-center gap-2"
        >
          Back to today's focus <Check className="w-4 h-4 stroke-[2]" />
        </Button>
      </div>
    </motion.div>
  );
}

function TrendItem({ title, note, status, icon }: any) {
  return (
    <div className="border-t border-[var(--color-thread-light-gray)] py-4.5 px-0.5 flex items-center gap-4.5">
      <div className="flex-1 min-w-0">
        <div className="text-[1.08rem] font-medium tracking-tight text-[var(--color-thread-dark-slate)] truncate">
          {title}
        </div>
        <div className="text-[0.84rem] text-[var(--color-thread-gray)] mt-0.75 leading-relaxed">
          {note}
        </div>
      </div>
      <span
        className={cn(
          "flex-shrink-0 text-[0.6rem] tracking-[0.1em] uppercase font-bold px-2.75 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap",
          status === "Improving" &&
            "bg-[var(--color-thread-mid-green)] text-white",
          status === "Steady" &&
            "bg-[var(--color-thread-off-white)] text-[var(--color-thread-gray)] border border-black/10",
          status === "Emerging" &&
            "bg-[var(--color-thread-cream)] text-[var(--color-thread-darkest)]",
          status === "Strength" &&
            "bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)]",
        )}
      >
        {icon}
        {status}
      </span>
    </div>
  );
}


