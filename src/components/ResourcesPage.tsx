import { motion } from "motion/react";
import {
  Search,
  ChevronRight,
  Download,
  Play,
  Printer,
  Check,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useState, useMemo } from "react";
import { ActionLink } from "./ui/ActionLink";
import { ListItemCard } from "./ui/ListItemCard";
import { FadeInScroll } from "./ui/FadeInScroll";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

import img2912 from "../assets/images/IMG_2912.jpeg";
import img2947 from "../assets/images/IMG_2947.jpeg";

const ALL_GUIDES = [
  {
    category: "Tools & Templates",
    catId: "tools",
    title: "Developing a Calming Bedtime Wind-Down",
    description:
      "A visual template with calming colour shifts — steps to swap screen time for sensory, hands-on cues that help Maya settle.",
    readTime: "8 min read",
    image: img2912,
  },
  {
    category: "Health & Clinical",
    catId: "health",
    title: "How Sleep and ADHD Interact in Growing Brains",
    description:
      "Clear, reassuring neuroscience on why dopamine profiles affect circadian rhythms — and how to work with Maya's natural bedtime schedule rather than against it.",
    readTime: "6 min read",
    image: img2947,
  },
  {
    category: "Tools & Templates",
    catId: "tools",
    title: "Questions to Discuss With Your Pediatrician",
    description:
      "A simple printable question list to bring to your next check-up, prompting useful conversations about the biological factors affecting Maya's sleep.",
    readTime: "5 min read",
    image: img2912,
  },
  {
    category: "Classroom Strategies",
    catId: "classroom",
    title: "Classroom Accommodation Strategies for ADHD Fatigue",
    description:
      "Creative, respectful options the school can use to help Maya restabilise — without feeling singled out — when fatigue spikes around 10:30 AM.",
    readTime: "10 min read",
    image: img2947,
  },
  {
    category: "Emotional Regulation",
    catId: "emotional",
    title: "Deep Breathing & Co-Regulation for Bedtime Resistance",
    description:
      "Short audio prompts and play-based breathing — like blowing out imaginary stars — for a calm, cooperative parent-child bedtime ritual.",
    readTime: "7 min read",
    image: img2912,
  },
];

export default function ResourcesPage({ currentChild }: { currentChild: any }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const isLiam = currentChild.name === "Liam";

  const guidesWithDynamicName = useMemo(() => {
    return ALL_GUIDES.map(g => ({
      ...g,
      description: g.description.replace(/Maya/g, currentChild.name)
    }));
  }, [currentChild.name]);

  const filteredGuides = useMemo(() => {
    return guidesWithDynamicName.filter((g) => {
      const matchSearch =
        g.title.toLowerCase().includes(search.toLowerCase()) ||
        g.description.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" || g.catId === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter, guidesWithDynamicName]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1000px] mx-auto pt-16 px-11 pb-16 max-md:px-5"
    >
      <div className="mb-24">
        <span className="text-[0.66rem] tracking-[0.2em] uppercase text-slate-500 font-semibold mb-4 block">
          Resource library · Clinical-grade guidance
        </span>
        <h1 className="font-semibold text-4xl tracking-tighter leading-[1.08] max-w-[16ch]">
          Personalised resources.
        </h1>
        <p className="text-[1.05rem] text-slate-500 leading-relaxed max-w-[58ch] mt-8">
          Short, practical, clinical-grade guides — tailored to {currentChild.name}'s current
          focus areas, so what you see first is what's most useful right now.
        </p>
        <div className="flex items-center gap-2 text-[0.8rem] text-slate-500 mt-3.5">
          <Check className="w-3.5 h-3.5 text-[var(--color-thread-mid-green)] stroke-[1.8]" /> Sorted
          by clinical focus matching
        </div>
      </div>

      <FadeInScroll
        className="relative bg-[var(--hero-bg)] text-[var(--hero-text)] rounded-tr-[36px] p-10 overflow-hidden mb-24 transition-all"
      >
        <svg
          className="absolute -right-[100px] -bottom-[130px] pointer-events-none"
          style={{ opacity: 'var(--hero-ring-opacity)' }}
          width="340"
          height="340"
        >
          <circle
            cx="170"
            cy="170"
            r="64"
            fill="none"
            stroke="currentColor"
            strokeOpacity="1"
            strokeWidth="1"
          />
          <circle
            cx="170"
            cy="170"
            r="112"
            fill="none"
            stroke="currentColor"
            strokeOpacity="1"
            strokeWidth="1"
          />
          <circle
            cx="170"
            cy="170"
            r="160"
            fill="none"
            stroke="currentColor"
            strokeOpacity="1"
            strokeWidth="1"
          />
        </svg>

        <span className="text-[0.66rem] tracking-[0.2em] uppercase text-[var(--hero-accent)] font-semibold mb-4.5 block">
          Featured guide
        </span>
        <p className="font-serif font-normal text-[1.55rem] leading-[1.34] tracking-tight max-w-[30ch] relative">
          {isLiam ? "Fostering long-term developmental velocity." : "Starting the upcoming school term with confidence."}
        </p>
        <p className="text-[1rem] opacity-70 leading-relaxed max-w-[54ch] mt-3.5 relative">
          {isLiam ? (
            `Advanced strategies for ${currentChild.name} to generalise his social integration wins into diverse, unstructured environments.`
          ) : (
            `Strategies to manage ADHD-linked morning fatigue and prepare sensory transitions before ${currentChild.name} steps into the new classroom.`
          )}
        </p>
        <Button
          variant="mint"
          className="mt-6 relative"
          rightIcon={<ChevronRight className="w-3.5 h-3.5 stroke-[2]" />}
        >
          Read article
        </Button>
      </FadeInScroll>

      {/* Modules Section */}
      <FadeInScroll className="mb-24">
        <div className="mb-5.5">
          <span className="text-[0.66rem] tracking-[0.2em] uppercase text-slate-500 font-semibold mb-2.5 block text-uppercase">
            Available modules
          </span>
          <h2 className="font-semibold text-[1.4rem] tracking-tight">
            Personalised to {currentChild.name}'s focus.
          </h2>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-slate-400 stroke-[1.8]" />
          <Input
            type="text"
            placeholder="Search guides…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="search"
          />
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          <FilterTab
            active={filter === "all"}
            label="All guides"
            onClick={() => setFilter("all")}
          />
          <FilterTab
            active={filter === "tools"}
            label="Tools & Templates"
            onClick={() => setFilter("tools")}
          />
          <FilterTab
            active={filter === "health"}
            label="Health & Clinical"
            onClick={() => setFilter("health")}
          />
          <FilterTab
            active={filter === "classroom"}
            label="Classroom Strategies"
            onClick={() => setFilter("classroom")}
          />
          <FilterTab
            active={filter === "emotional"}
            label="Emotional Regulation"
            onClick={() => setFilter("emotional")}
          />
        </div>

        <span className="text-[0.66rem] tracking-[0.16em] uppercase text-slate-400 font-semibold mb-6 block">
          {filteredGuides.length}{" "}
          {filteredGuides.length === 1 ? "article" : "articles"} found
        </span>

        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            {filteredGuides.map((guide, i) => {
              const cornerClasses = [
                "rounded-tr-[32px]",
                "rounded-tl-[32px]",
                "rounded-br-[32px]",
                "rounded-bl-[32px]",
              ];
              const cornerClass = cornerClasses[i % cornerClasses.length];
              return <GuideCard key={i} {...guide} cornerClass={cornerClass} childName={currentChild.name} />;
            })}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-black/10 rounded-2xl text-slate-500">
            No guides match your search.
            <ActionLink
              variant="default"
              as="button"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="mt-3 block mx-auto font-semibold"
            >
              Clear search
            </ActionLink>
          </div>
        )}
      </FadeInScroll>

      {/* Directory Section */}
      <FadeInScroll className="mb-24">
        <div className="mb-5.5">
          <span className="text-[0.66rem] tracking-[0.2em] uppercase text-slate-500 font-semibold mb-2.5 block text-uppercase">
            Browse directory
          </span>
          <h2 className="font-semibold text-[1.4rem] tracking-tight">
            Browse by topic.
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-2.5 max-md:grid-cols-1">
          {[
            "Understanding ADHD",
            "Emotional Regulation",
            "School Support",
            "Learning & Cognition",
            "Daily Routines",
            "Working with Professionals",
          ].map((t, i) => (
            <ListItemCard key={i}>{t}</ListItemCard>
          ))}
        </div>
      </FadeInScroll>

      {/* Locker Section */}
      <FadeInScroll className="mb-24">
        <div className="mb-5.5">
          <span className="text-[0.66rem] tracking-[0.2em] uppercase text-slate-500 font-semibold mb-2.5 block text-uppercase">
            Aids & exercises locker
          </span>
          <h2 className="font-semibold text-[1.4rem] tracking-tight">
            Quick activities locker.
          </h2>
        </div>

        <div className="relative rounded-br-[36px] p-7.5 bg-watercolor">
          <div className="grid grid-cols-3 gap-3.5 max-md:grid-cols-1">
            <LockerItem
              icon={<Download className="w-[19px] h-[19px] stroke-[1.8]" />}
              title="Download templates"
              description="Editable letter templates, transition checklists and customisable behaviour journals."
              action="Download printable PDFs"
              cornerClass="rounded-tl-[32px]"
            />
            <LockerItem
              icon={<Play className="w-[19px] h-[19px] stroke-[1.8]" />}
              title="Watch short videos"
              description="5-minute play-based co-regulation tactics designed for real parents."
              action="Launch video player"
              cornerClass="rounded-tr-[32px]"
            />
            <LockerItem
              icon={<Printer className="w-[19px] h-[19px] stroke-[1.8]" />}
              title="Print classroom guides"
              description="Double-sided sheets designed for teachers, tutors and clinical aides."
              action="Generate print format"
              cornerClass="rounded-br-[32px]"
            />
          </div>
        </div>
      </FadeInScroll>
    </motion.div>
  );
}

function FilterTab({ label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-[0.84rem] font-medium border border-black/10 transition-all cursor-pointer",
        active
          ? "bg-[var(--color-thread-mid-green)] text-white border-[var(--color-thread-mid-green)]"
          : "bg-white text-slate-500 hover:text-slate-900 hover:border-[var(--color-thread-mid-green)]",
      )}
    >
      {label}
    </button>
  );
}

function GuideCard({
  category,
  title,
  description,
  readTime,
  image,
  cornerClass = "rounded-tr-[32px]",
}: any) {
  return (
    <div
      className={cn(
        "bg-white flex flex-col cursor-pointer transition-all group overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01]",
        cornerClass,
      )}
    >
      {image && (
        <div className="w-full aspect-[16/9] overflow-hidden relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <span className="text-[0.58rem] tracking-[0.14em] uppercase text-[var(--color-thread-mid-green)] font-bold mb-3 font-sans">
          {category}
        </span>
        <h3 className="text-[1.18rem] font-semibold tracking-tight leading-tight mb-2 text-slate-900 font-sans">
          {title}
        </h3>
        <p className="text-[0.9rem] text-slate-500 leading-relaxed flex-1 font-sans">
          {description}
        </p>
        <div className="flex items-center justify-between pt-4 mt-8">
          <span className="text-[0.78rem] text-slate-400 font-sans">{readTime}</span>
          <ActionLink variant="slate" as="span" className="group-hover:text-[var(--color-thread-mid-green)]">
            Read guide
          </ActionLink>
        </div>
      </div>
    </div>
  );
}

function LockerItem({
  icon,
  title,
  description,
  action,
  cornerClass = "rounded-[18px]",
}: any) {
  return (
    <div className={cn("bg-white p-6 flex flex-col shadow-sm hover:shadow-md transition-all", cornerClass)}>
      <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--color-thread-light-green)]/60 text-[var(--color-thread-muted-green)] flex items-center justify-center mb-3.5">
        {icon}
      </div>
      <h3 className="text-[1.02rem] font-semibold tracking-tight mb-1.75 text-slate-900 leading-tight">
        {title}
      </h3>
      <p className="text-[0.86rem] text-slate-500 leading-relaxed mb-3.5">
        {description}
      </p>
      <div className="mt-auto pt-2">
        <ActionLink variant="default" as="button" className="hover:opacity-70">
          {action}
        </ActionLink>
      </div>
    </div>
  );
}
