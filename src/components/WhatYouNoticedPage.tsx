import { motion } from "motion/react";
import {
  ArrowRight,
  ClipboardList,
  Clock,
  Home,
  Layers,
  PencilLine,
  Search,
} from "lucide-react";
import { Page } from "../types";
import { useCurrentChild } from "../context/ChildContext";
import { PageContainer } from "./ui/PageContainer";
import { PageHeader } from "./ui/PageHeader";
import { HeroQuoteCard } from "./ui/HeroQuoteCard";
import { HeroActionCard } from "./ui/HeroActionCard";
import { SectionDescription } from "./ui/SectionDescription";
import { SectionLabel } from "./ui/SectionLabel";
import { SectionTitle } from "./ui/SectionTitle";
import { FadeInScroll } from "./ui/FadeInScroll";
import { AreaItem } from "./ui/AreaItem";
import { StrategyCard } from "./ui/StrategyCard";
import { PageFooterCTA } from "./ui/PageFooterCTA";
import { Button } from "./ui/Button";
import watercolorBgImg from "../assets/images/watercolor_bg_1782427011739.jpg";

interface WhatYouNoticedPageProps {
  onPageChange: (page: Page) => void;
  onOpenSetup?: (step?: 1 | 2 | 3 | 4 | 5 | "welcome") => void;
}

const noticeDescriptions: Record<string, string> = {
  "Attention & focus": "Keep examples of when focus is easiest, when it slips, and what helps bring attention back without pressure.",
  "Behaviour & emotions": "Notice the moments before big feelings or behaviour changes, especially transitions, demands, tiredness, or sensory load.",
  Sleep: "Track the rhythm around bedtime, waking, night settling, and how sleep seems to shape the next day.",
  Learning: "Bring examples of what feels hard, what feels easy, and any difference between understanding something and showing it.",
  "Movement & coordination": "Watch for patterns around balance, handwriting, dressing, sports, fatigue, or movement-seeking.",
  "Speech & communication": "Notice how communication changes across home, school, peers, new places, or tired moments.",
  Friendships: "Hold onto examples of connection, conflict, play, withdrawal, or moments where social rules feel unclear.",
};

function formatList(items: string[]) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0].toLowerCase();
  if (items.length === 2) return `${items[0].toLowerCase()} and ${items[1].toLowerCase()}`;
  return `${items.slice(0, -1).map((item) => item.toLowerCase()).join(", ")}, and ${items[items.length - 1].toLowerCase()}`;
}

export default function WhatYouNoticedPage({ onPageChange, onOpenSetup }: WhatYouNoticedPageProps) {
  const { currentChild } = useCurrentChild();
  const notices = currentChild.intake?.notices || [];
  const notes = currentChild.intake?.notes?.trim() || "";
  const hasNotices = notices.length > 0;
  const noticedSummary = hasNotices
    ? `You flagged ${formatList(notices)} for ${currentChild.name}. These are early parent observations, kept visible so the first session can start from what you are already seeing.`
    : `This page will hold the areas you flag during setup, so ${currentChild.name}'s first session can start from what you are already seeing.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-16 pb-16"
    >
      <PageContainer>
        <PageHeader
          kicker="Intake · What you noticed"
          title={`${currentChild.name}'s early signals, kept in one place.`}
          titleClassName="text-[2.2rem] xs:text-[2.6rem] sm:text-[3.2rem] md:text-[4rem] leading-[1.15] md:leading-[4.5rem] max-w-[17ch]"
          className="mb-12"
          description={
            <div className="flex gap-4.5 text-[0.82rem] text-[var(--color-thread-gray)] flex-wrap">
              <span className="flex items-center gap-1.5">
                <Clock className="w-[15px] h-[15px] stroke-[1.8] text-[var(--color-thread-mid-green)]" />{" "}
                Intake in progress
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-[15px] h-[15px] stroke-[1.8] text-[var(--color-thread-mid-green)]" />{" "}
                Based on setup step 2
              </span>
            </div>
          }
        />

        <div className="w-full h-[200px] rounded-t-[24px] sm:rounded-t-[32px] overflow-hidden relative border border-black/5">
          <img
            src={watercolorBgImg}
            alt="Watercolor Accent"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <HeroQuoteCard
          kicker="Share what you've noticed"
          quote={noticedSummary}
          showQuotes={false}
          className="mb-24"
          rightNode={
            <HeroActionCard
              icon={<Search className="w-[22px] h-[22px] stroke-[1.7]" />}
              title={notices.length}
              subtitle="Parent observations"
            />
          }
          action={
            <div className="font-medium text-[0.84rem] opacity-70">
              Source{" "}
              <strong className="opacity-100 ml-1">
                Setup step 2
              </strong> · not a clinical conclusion yet
            </div>
          }
        />

        <FadeInScroll className="mb-24">
          <div>
            <SectionLabel>
              Supports worth exploring
            </SectionLabel>
            <SectionTitle>
              Areas to hold in mind.
            </SectionTitle>
          </div>
          <SectionDescription className="mb-6">
            These notes help the clinician prepare for the first conversation. They do not label the pattern; they simply keep your observations clear and easy to revisit.
          </SectionDescription>

          <div className="border-b border-black/10">
            {hasNotices ? (
              notices.map((notice) => (
                <AreaItem
                  key={notice}
                  title={notice}
                  description={noticeDescriptions[notice] || "Keep a few real examples close by so this can be explored during the first session."}
                  status="Emerging"
                />
              ))
            ) : (
              <AreaItem
                title="No areas selected yet"
                description={
                  <div>
                    <p className="text-[0.96rem] text-[var(--color-thread-gray)] leading-relaxed max-w-[62ch] font-sans mb-4">
                      Use setup step 2 to flag what you are noticing for {currentChild.name}. This page will update from those selections.
                    </p>
                    <Button
                      type="button"
                      variant="mint"
                      onClick={() => onOpenSetup?.(2)}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5 stroke-[2]" />}
                    >
                      Add observations
                    </Button>
                  </div>
                }
              />
            )}
            {notes && (
              <AreaItem
                title="Your own words"
                description={
                  <p className="text-[0.96rem] text-[var(--color-thread-gray)] leading-relaxed max-w-[62ch] font-sans">
                    {notes}
                  </p>
                }
                status="In place"
                icon={<PencilLine className="w-3 h-3" />}
              />
            )}
          </div>
        </FadeInScroll>

        <FadeInScroll className="mb-24">
          <div>
            <SectionLabel>
              Strategies that help
            </SectionLabel>
            <SectionTitle>
              Practical things to try.
            </SectionTitle>
          </div>

          <div className="relative rounded-br-[36px] p-12 bg-watercolor">
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <StrategyCard
                title="Before the session"
                icon={<ClipboardList className="w-[18px] h-[18px] stroke-[1.8]" />}
                items={[
                  hasNotices
                    ? `Keep one concrete example for ${notices[0].toLowerCase()} if it shows up this week.`
                    : "Keep one concrete example of anything that stands out this week.",
                  "Note what happened before, what helped, and what changed afterward.",
                  "Bring school notes, reports, or examples if they show the pattern clearly.",
                ]}
                cornerClass="rounded-tr-[28px]"
                className="shadow-premium border border-black/[0.03]"
              />
              <StrategyCard
                title="At home"
                icon={<Home className="w-[18px] h-[18px] stroke-[1.8]" />}
                items={[
                  "Keep routines steady while the assessment picture is still forming.",
                  "Use small, low-pressure supports instead of trying a full new plan.",
                  `Notice what already helps ${currentChild.name}, and repeat it on harder days.`,
                ]}
                cornerClass="rounded-bl-[28px]"
                className="shadow-premium border border-black/[0.03]"
              />
            </div>
          </div>
        </FadeInScroll>
      </PageContainer>

      <PageFooterCTA
        title="Want to add or change what you noticed?"
        buttonText="Review setup"
        buttonIcon={<ArrowRight className="w-4 h-4 stroke-[2]" />}
        onClick={() => {
          if (onOpenSetup) {
            onOpenSetup();
            return;
          }
          onPageChange("home");
        }}
      />
    </motion.div>
  );
}
