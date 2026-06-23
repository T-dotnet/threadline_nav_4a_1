import { motion } from "motion/react";
import { Clock, Info, ArrowRight, Download, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

import { Child } from "../types";
import { PageHeader } from "./ui/PageHeader";
import { HeroQuoteCard } from "./ui/HeroQuoteCard";
import { FactRow } from "./ui/FactRow";
import { PageIcon } from "./ui/PageIcon";
import { HeroActionCard } from "./ui/HeroActionCard";
import { SectionTitle } from "./ui/SectionTitle";
import { SectionLabel } from "./ui/SectionLabel";
import { SectionDescription } from "./ui/SectionDescription";
import { ListItemCard } from "./ui/ListItemCard";
import { FadeInScroll } from "./ui/FadeInScroll";
import { ActionLink } from "./ui/ActionLink";
import { Button } from "./ui/Button";

export default function PrioritiesPage({
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
        kicker="Priorities · What matters most"
        title="Where to focus — and why."
        titleClassName="text-[4rem] leading-[4.5rem] max-w-[16ch]"
        className="mb-24"
        description={
          <div className="flex gap-4.5 text-[0.82rem] text-[var(--color-thread-gray)] flex-wrap">
            <span className="flex items-center gap-1.5">
              <Clock className="w-[15px] h-[15px] stroke-[1.8] text-[var(--color-thread-mid-green)]" />{" "}
              Updated 14 June 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Info className="w-[15px] h-[15px] stroke-[1.8] text-[var(--color-thread-mid-green)]" />{" "}
              Built from {currentChild.name}'s understanding profile
            </span>
          </div>
        }
      />

      <FadeInScroll className="mb-24">
        <HeroQuoteCard
          kicker="How we prioritise"
          quote={
            isLiam
              ? "Liam has met his core goals. We now prioritize advanced social integration and leadership-readiness milestones."
              : `We don't hand you a list of everything. We rank what matters by its real impact on ${currentChild.name} — and show the reasoning behind every call.`
          }
          className="h-full"
          rightNode={
            <HeroActionCard
              icon={<Download className="w-[22px] h-[22px] stroke-[1.7]" />}
              title="Priority list"
              subtitle="Download PDF"
            />
          }
          action={
            <p className="text-[0.84rem] opacity-70 relative leading-relaxed max-w-[48ch]">
              Each priority is weighed by{" "}
              <strong className="opacity-100">functional impact</strong>,{" "}
              <strong className="opacity-100">developmental risk</strong>,{" "}
              <strong className="opacity-100">family burden</strong>,{" "}
              <strong className="opacity-100">family capacity</strong>, and{" "}
              <strong className="opacity-100">
                how priorities depend on one another
              </strong>
              .
            </p>
          }
        />
      </FadeInScroll>

      <FadeInScroll className="mb-24">
        <div className="mb-5.5">
          <SectionLabel>
            Now · Next · Later
          </SectionLabel>
          <SectionTitle>
            {isLiam ? "Everything is on track." : "Three priorities, in order."}
          </SectionTitle>
        </div>

        <div className="mt-6 flex flex-col">
          {isLiam ? (
            <>
              <TimelineItem
                tag="Done"
                title="Transitional Irritability"
                meta="Completed · Strategic co-regulation in place"
                content="Liam has internalised several calming routines. He now identifies frustration triggers early and self-corrects without adult intervention in 90% of observed sessions."
                facts={{
                  "Functional impact": "High",
                  "Success rate": "Strong",
                  "Family burden": "Low",
                  "Family capacity": "Strong",
                }}
                dependency="This success allows us to move towards <strong>Advanced Creative Depth</strong>."
                progress={100}
                active
              />
              <TimelineItem
                tag="Done"
                title="Task Retention"
                meta="Completed · Excellent creative depth"
                content="Memory and task sequencing are now strengths. Liam can follow multi-step instructions and remain engaged in complex play for over 45 minutes."
                facts={{
                  "Retention score": "High",
                  "Task completion": "Strong",
                  "Clinical confidence": "High",
                }}
                dependency="Liam is ready for <strong>Peer Leadership</strong> roles in small group settings."
                progress={100}
              />
            </>
          ) : (
            <>
              <TimelineItem
                tag="Now"
                title="Classroom attention"
                meta="High impact · clearest theme across every source"
                content={`Trouble staying focused in class is currently the biggest drag on ${currentChild.name}'s learning and self-confidence. Addressing it first tends to make other supports work better too.`}
                facts={{
                  "Functional impact": "High",
                  "Developmental risk": "Moderate",
                  "Family burden": "Moderate",
                  "Family capacity": "Strong",
                }}
                dependency="Progress here should also ease <strong>Emotional regulation</strong> and <strong>school participation</strong>."
                progress={35}
                active
              />
              <TimelineItem
                tag="Next"
                title="Emotional regulation at home"
                meta="Moderate impact · prepare over coming months"
                content="Frustration around homework and changes in routine is real, and it's hard on home life. But it sits downstream of attention — so we expect it to ease as focus improves. That's why it's next, not now: tackling attention first does double duty."
                facts={{
                  "Functional impact": "Moderate",
                  "Emotional distress": "Moderate",
                  "Family burden": "High",
                  "Depends on": "Attention",
                }}
                dependency="Linked to <strong>Classroom attention</strong> — we'll revisit this as that improves."
                progress={15}
              />
              <TimelineItem
                tag="Later"
                title="Friendships & social connection"
                meta="Safe to wait · currently a strength"
                content={`${currentChild.name} has warm, steady friendships and real empathy — this is going well, so it doesn't need your attention today. Naming it 'later' is deliberate: it means you can set it down without worrying you've missed something.`}
                facts={{
                  "Functional impact": "Low",
                  "Developmental risk": "Low",
                }}
                dependency="We'll surface this again if anything changes."
                progress={0}
              />
            </>
          )}
          <div className="border-b border-black/10" />
        </div>
      </FadeInScroll>

      {/* Connect Section */}
      <FadeInScroll className="mb-24">
        <div className="mb-5.5">
          <SectionLabel>
            How these connect
          </SectionLabel>
          <SectionTitle className="mb-10">
            Priorities aren't independent.
          </SectionTitle>
        </div>
        <div className="flex items-center gap-2.5 max-md:flex-col max-md:items-stretch mb-4.5 mt-2 w-full">
          <ListItemCard>Sleep</ListItemCard>
          <ListItemCard>Attention</ListItemCard>
          <ListItemCard>Emotional regulation</ListItemCard>
          <ListItemCard>School participation</ListItemCard>
        </div>
        <SectionDescription className="mt-8">
          {isLiam ? (
            <>
              For Liam, we previously saw how sleep stability anchored his gains in attention. 
              Now that these are robust, we're monitoring how this foundation supports higher-level social complex tasks.
            </>
          ) : (
            <>
              Sleep can feed into attention, which shapes emotional regulation and
              how {currentChild.name} takes part at school. Ordering priorities along this chain
              means each step you take makes the next one easier — and stops you
              spreading effort across things that may resolve on their own.
            </>
          )}
        </SectionDescription>
      </FadeInScroll>

      {/* Watchlist Section */}
      <FadeInScroll className="relative bg-[var(--color-thread-cream)] rounded-br-[36px] p-7 overflow-hidden mb-24">
        <svg
          className="absolute -right-[70px] -top-[80px] opacity-10 pointer-events-none"
          width="220"
          height="220"
        >
          <circle
            cx="110"
            cy="110"
            r="45"
            fill="none"
            stroke="black"
            strokeOpacity="1"
            strokeWidth="1"
          />
          <circle
            cx="110"
            cy="110"
            r="75"
            fill="none"
            stroke="black"
            strokeOpacity="1"
            strokeWidth="1"
          />
          <circle
            cx="110"
            cy="110"
            r="105"
            fill="none"
            stroke="black"
            strokeOpacity="1"
            strokeWidth="1"
          />
        </svg>
        <SectionLabel className="mb-3">
          On the watchlist
        </SectionLabel>
        <SectionTitle className="mb-6 relative">
          Sleep
        </SectionTitle>
        <SectionDescription className="relative">
          Not a ranked priority yet — but because sleep can feed into attention,
          we're keeping an eye on it. If the signal grows, it may move into Now
          or Next, and you'll be the first to know.
        </SectionDescription>
      </FadeInScroll>

      {/* Forward Button */}
      <div className="flex items-center justify-between gap-5 border-t border-black/10 pt-7.5 flex-wrap">
        <div className="font-serif font-normal text-[1.55rem] leading-[1.34] tracking-tight text-[var(--color-thread-heading)] max-w-[24ch]">
          Now you know what matters most.
        </div>
        <Button
          onClick={() => onPageChange("roadmap")}
          variant="forest"
          className="px-5.5 py-3.5 text-[0.92rem] inline-flex items-center gap-2"
        >
          See what to do <ArrowRight className="w-4 h-4 stroke-[2]" />
        </Button>
      </div>
    </motion.div>
  );
}

function TimelineItem({
  tag,
  title,
  meta,
  content,
  facts = {},
  dependency,
  progress = 0,
  active = false,
}: any) {
  // Accordion is always open and not toggleable as per feedback
  return (
    <div
      className={cn(
        "border-t border-black/10 transition-all"
      )}
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
      </div>
      <div className="overflow-hidden transition-all duration-300 opacity-100">
        <div className="px-16 pb-12 max-md:px-2">
          <div className="grid grid-cols-1 gap-12">
            <div className="grid grid-cols-[1fr,1fr] gap-12 max-lg:grid-cols-1 max-lg:gap-8">
              <div className="space-y-6">
                <div>
                  <span className="text-[0.6rem] tracking-[0.14em] uppercase text-slate-500 font-semibold mb-2 block">
                    Why This matter the most
                  </span>
                  <p className="text-[0.96rem] text-slate-500 leading-relaxed">
                    {content}
                  </p>
                </div>

                {dependency && (
                  <div className="text-[0.88rem] flex items-center gap-2.5 text-slate-500 leading-tight">
                    <ArrowRight className="w-[15px] h-[15px] flex-shrink-0 stroke-[2] text-[var(--color-thread-placeholder)]" />
                    <span dangerouslySetInnerHTML={{ __html: dependency }} />
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-none rounded-tr-[36px] h-fit shadow-premium-light">
                <span className="text-[0.6rem] tracking-[0.14em] uppercase text-slate-500 font-semibold mb-3 block">
                  Clinical weighting
                </span>
                <div className="grid grid-cols-2 gap-x-12 gap-y-1">
                  {Object.entries(facts).map(([label, value]) => (
                    <FactRow key={label} label={label} value={value as string} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 flex items-center justify-between">
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

function PriorityCard({
  tag,
  title,
  meta,
  why,
  facts = {},
  dependency,
  cornerClass = "rounded-[20px]",
}: any) {
  return (
    <div
      className={cn(
        "relative bg-white p-7.5 mb-4.5 overflow-hidden",
        cornerClass,
      )}
    >
      <div className="flex gap-3.5 items-start mb-4 relative">
        <span className="text-[0.75rem] tracking-[0.1em] uppercase font-medium px-4 py-2 rounded-full bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)] flex-shrink-0 mt-1">
          {tag}
        </span>
        <div className="flex-1">
          <div className="font-sans font-medium text-[1.22rem] tracking-tight text-[var(--color-thread-dark-slate)] mb-1">
            {title}
          </div>
          <div className="text-[0.82rem] text-[var(--color-thread-gray)]">
            {meta}
          </div>
        </div>
      </div>
      <SectionDescription className="mb-5 relative">
        {why}
      </SectionDescription>
      <div className="bg-[var(--color-thread-off-white)] rounded-[20px] px-5.5 py-4 mb-4.5 relative">
        <SectionLabel className="mb-2">
          {tag === "Next" ? "Why it ranks here" : "Why it can wait"}
        </SectionLabel>
        <div className="grid grid-cols-2 gap-x-9 max-md:grid-cols-1">
          {facts && Object.entries(facts).map(([k, v]) => (
            <FactRow key={k} label={k} value={v as string} />
          ))}
        </div>
      </div>
      <div className="text-[0.88rem] flex items-center gap-2.5 text-[var(--color-thread-gray)] leading-tight relative">
        <ArrowRight className="w-[15px] h-[15px] flex-shrink-0 stroke-[2] text-[var(--color-thread-placeholder)]" />
        <span dangerouslySetInnerHTML={{ __html: dependency }} />
      </div>
    </div>
  );
}


