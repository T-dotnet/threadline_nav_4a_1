import { motion } from "motion/react";
import { 
  Palette, 
  Type, 
  Layers, 
  ToggleLeft, 
  Check, 
  Copy, 
  ExternalLink,
  Sparkles,
  Info,
  Sliders,
  Code,
  Terminal,
  RefreshCw,
  Play,
  Heart,
  HelpCircle,
  Eye,
  CreditCard,
  Star,
  Bookmark,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Calendar,
  ArrowRight,
  Activity
} from "lucide-react";
import { useState } from "react";
import { Page } from "../types";
import { Button } from "./ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { ProgressBar } from "./ui/ProgressBar";
import { ActionLink } from "./ui/ActionLink";
import { cn } from "../lib/utils";

interface StyleGuidePageProps {
  onPageChange: (page: Page) => void;
}

export default function StyleGuidePage({ onPageChange }: StyleGuidePageProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Live Component Playground States
  const [pgVariant, setPgVariant] = useState<'mint' | 'slate' | 'white' | 'muted' | 'link' | 'forest'>('forest');
  const [pgText, setPgText] = useState('Explore Clinical Insights');
  const [pgIsLoading, setPgIsLoading] = useState(false);
  const [pgIsDisabled, setPgIsDisabled] = useState(false);
  const [pgLeftIcon, setPgLeftIcon] = useState(true);
  const [pgRightIcon, setPgRightIcon] = useState(false);
  const [pgPreviewBg, setPgPreviewBg] = useState<'light' | 'forest' | 'slate'>('light');
  const [pgLogs, setPgLogs] = useState<string[]>([
    `Playground successfully initialized with 'forest' variant.`
  ]);

  // Interactive Card Template states
  const [genericCardStatus, setGenericCardStatus] = useState<'active' | 'completed'>('active');
  const [prioritySubtasks, setPrioritySubtasks] = useState<boolean[]>([true, false, false]);
  const [strategyExpanded, setStrategyExpanded] = useState<boolean>(true);
  const [valueCardForest, setValueCardForest] = useState<boolean>(true);
  const [resourceBookmarked, setResourceBookmarked] = useState<boolean>(false);
  const [quarterProgressValue, setQuarterProgressValue] = useState<number>(75);
  const [synthesisExpanded, setSynthesisExpanded] = useState<boolean>(false);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setPgLogs(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 4)]);
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopiedText(label);
        setTimeout(() => setCopiedText(null), 2000);
      } else {
        throw new Error('Clipboard not available');
      }
    } catch (err) {
      console.warn('Failed to copy text: ', err);
    }
  };

  // Color Definitions from index.css
  const colors = [
    { name: "Mid Green (Unified Primary Accent)", value: "#108560", variable: "var(--color-thread-mid-green)", desc: "Main brand action color, active states, active progression bars. Consolidated with Theme Forest and Deep Forest." },
    { name: "Dark Forest (Theme Forest - Consolidated)", value: "#108560", variable: "var(--color-thread-dark-forest)", desc: "Consolidated with Mid Green for design minimalism and unified visual focus." },
    { name: "Deep Forest (Dark Accent - Consolidated)", value: "#108560", variable: "var(--color-thread-deep-forest)", desc: "Consolidated with Mid Green for design minimalism and unified visual focus." },
    { name: "Light Green (Soft Background)", value: "#E6F4ED", variable: "var(--color-thread-light-green)", desc: "Subtle backgrounds, select item states, buttons highlight background" },
    { name: "Cream (Warm Contrast)", value: "#EEE9D9", variable: "var(--color-thread-cream)", desc: "Cozy warm layout dividers, container outlines, retro accents" },
    { name: "Off White (Main Canvas)", value: "#F5F7F6", variable: "var(--color-thread-off-white)", desc: "Body and slate-level background canvases across pages" },
    { name: "Dark Slate (Body Copy)", value: "#1F2937", variable: "var(--color-thread-dark-slate)", desc: "Standard high contrast reading text and labels" },
    { name: "Gray (Secondary Text)", value: "#6B7280", variable: "var(--color-thread-gray)", desc: "De-emphasized subtitles, clinical review timestamps, metadata" },
  ];

  // Font families description from index.css and source code
  const fonts = [
    {
      family: 'Hero Page Title (Fraunces display)',
      usage: "Primary visual anchor of main pages. Sets an empathetic, premium, human clinical-arts mood.",
      sample: "Here's where to put your energy today, Sarah.",
      classes: "font-serif text-[3.8rem] leading-[4.3rem] tracking-[-0.075rem] text-[var(--color-thread-heading)]"
    },
    {
      family: 'Subheading / Key Quote (Fraunces serif)',
      usage: "Key synthesis callouts, clinician diagnosis blocks, and core priority summaries.",
      sample: "“Maya is showing marked improvements in auditory processing, though focus remains heavily tethered to circadian stability.”",
      classes: "font-serif text-[1.55rem] leading-[1.34] tracking-tight text-[var(--hero-text)] font-normal"
    },
    {
      family: 'Card Title / Section Header (Fraunces medium-serif)',
      usage: "Container category headers, interactive module titles, and diagnostic row headers.",
      sample: "Transition Support & School Letters",
      classes: "font-serif text-[1.25rem] text-[var(--color-thread-heading)] font-normal"
    },
    {
      family: 'Child Row Card Title (Fraunces medium-serif)',
      usage: "Individual child visual cards and directory list main titles.",
      sample: "Maya",
      classes: "font-serif font-normal text-[1.8rem] tracking-tight leading-none text-[var(--color-thread-heading)]"
    },
    {
      family: 'Clinician Synthesis Quote (Fraunces serif [1.38rem])',
      usage: "Compact clinician summary narratives, professional quotes, and clinical evidence callouts.",
      sample: "“Maya finds it hard to sustain focus in structured tasks, especially in the classroom.”",
      classes: "font-serif font-normal text-[1.38rem] leading-[1.4] tracking-tight text-[var(--color-thread-heading)]"
    },
    {
      family: 'Large Sans-Serif Page/Section Header (Sans-serif Medium)',
      usage: "Primary visual headings for high level clinical content groupings (such as 'Strengths to build on.').",
      sample: "Strengths to build on.",
      classes: "font-sans font-medium text-[2rem] leading-[1.05] tracking-[-1.12px] text-[var(--color-thread-heading)]"
    },
    {
      family: 'Secondary Card Heading (Sans-serif Semibold)',
      usage: "Sub-section headings, card inner group titles, and primary grid module names.",
      sample: "Priority Milestones & Development Track",
      classes: "font-sans font-semibold text-[1.12rem] tracking-tight text-slate-900"
    },
    {
      family: 'Tertiary Widget Heading / Action Label (Sans-serif Small Bold)',
      usage: "Context labels, form section separators, small card item headers, and grid subtitles.",
      sample: "Recommended Focus Area",
      classes: "font-sans font-bold text-[0.88rem] tracking-tight text-slate-800"
    },
    {
      family: 'Serif Display Numerals & Percentages (Fraunces Display for statistics)',
      usage: "Large-format scores, percentages, milestone metrics counters, and key numerical figures.",
      sample: "95% achieved",
      classes: "font-serif text-[3.2rem] leading-none tracking-tight text-[var(--color-thread-heading)]"
    },
    {
      family: 'Standard Body Copy (Inter Sans UI font)',
      usage: "Core descriptive paragraphs, bullet points, narrative summaries, and form text entry lists.",
      sample: "Strategies to manage ADHD-linked morning fatigue and prepare sensory transitions before she steps into the new classroom layout.",
      classes: "font-sans text-[0.98rem] text-slate-500 leading-relaxed font-normal"
    },
    {
      family: 'Tracked Upper Tags & Labels (Bold upper tracking)',
      usage: "Section dividers, context tags, evidence formulation status ('STRONG FORMULATION'), time of day indicators, and dashboard category prefixes.",
      sample: "STRONG FORMULATION  ·  FAMILY SYNTHESIS  ·  TUESDAY MORNING",
      classes: "text-[0.68rem] tracking-[0.12em] uppercase font-bold text-[var(--color-thread-mid-green)] font-sans"
    },
    {
      family: 'Interaction Button Copy (Semi-bold Pill Sans)',
      usage: "Primary and secondary action buttons with high click clarity and clean inner spacing curves.",
      sample: "Learn more insights",
      classes: "font-sans font-semibold text-[0.82rem] leading-none text-slate-800"
    },
    {
      family: 'Interactive Text Link (Underlined inline action)',
      usage: "Nested page navigators, subtle secondary actions, external references, and toggle buttons.",
      sample: "Style Guide & Design Tokens",
      classes: "font-sans text-[0.84rem] font-semibold underline underline-offset-2 text-[var(--color-thread-dark-forest)] hover:text-[var(--color-thread-deep-forest)] transition-colors inline"
    },
    {
      family: 'Clinical Metrics / Status Stamps (High accuracy Monospace)',
      usage: "Evidence metrics ratios, date timestamps, system coordinates, or background configurations.",
      sample: "0.72rem · MONO · CODE · ACTIVE (3/3)",
      classes: "font-mono text-[0.72rem] text-slate-500 tracking-normal font-semibold uppercase"
    },
    {
      family: 'Activity Context / Clinical Review Timestamp (Subtle Sans-serif)',
      usage: "Clinical target timestamps, progress calendar headers, and scheduled review notes.",
      sample: "Next clinical review: 12 September",
      classes: "font-sans text-[0.8rem] text-slate-600 tracking-normal font-normal"
    },
    {
      family: 'Diagnostic Observer Source Pill (Mini Capsule Label)',
      usage: "Miniature pill-badges detailing contributors to an observed trait (such as 'You', 'Teacher', 'Clinician', 'Maya').",
      sample: "You · Teacher · Clinician · Maya",
      classes: "font-sans text-[0.7rem] font-semibold text-[var(--color-thread-dark-slate)]"
    }
  ];

  // Rounded Corner Container Types seen in actual code
  const shapes = [
    { name: "Dynamic Top Right Card Curve", class: "rounded-tr-[36px]", desc: "Used specifically on premium Synthesis Cards, providing an organic, editorial visual language" },
    { name: "Dynamic Bottom Left Card Curve", class: "rounded-bl-[32px]", desc: "Used for this Quarter's planning progress charts and calendar scheduling card blocks" },
    { name: "Full Component Back Canvas Slate", class: "rounded-2xl", desc: "Found on generic modal screens, user notifications settings tiles, and primary interactive containers" },
    { name: "Pill/Utility Controls", class: "rounded-full", desc: "Rounded-full standard profiles, learning actions buttons, active switch profiles badges, indicators" }
  ];

  // Button design specs, classes, and file usages
  const buttonsInfo = [
    {
      variant: 'forest',
      name: 'Forest Primary Action',
      classCode: 'bg-[var(--color-thread-dark-forest)] text-white font-semibold text-[0.82rem] px-4.5 py-2.5 rounded-full hover:bg-[var(--color-thread-deep-forest)] transition-all shadow-sm',
      usage: 'Used as the primary visual CTA for heavy clinical actions, saving changes, establishing priorities, and completing main flow checkpoints.',
      whereUsed: 'PrioritiesPage (Add Priority action), AddChildModal (Create custom profile), StyleGuide Page (Forest Presets demo)',
      sampleText: 'Establish Care Milestone'
    },
    {
      variant: 'mint',
      name: 'Mint Diagnostic Highlight',
      classCode: 'bg-[var(--color-thread-light-green)] text-[var(--color-thread-heading)] font-semibold text-[0.82rem] px-4.5 py-2.5 rounded-full hover:opacity-95 shadow-sm transition-all',
      usage: 'Promoting focus area discoveries, displaying emerging clinical patterns, navigating to user resource notes, and interactive medical diagnostics.',
      whereUsed: 'HomePage (Emerging Details navigator link), StyleGuide Page (Mint action triggers, background selectors)',
      sampleText: 'View Emerging Details'
    },
    {
      variant: 'slate',
      name: 'Slate Global Confirm',
      classCode: 'bg-slate-900 text-white text-[0.98rem] font-semibold px-6 py-3 rounded-full hover:bg-slate-800 transition-colors shadow-sm',
      usage: 'Utilized across high-importance system inputs, configuration saving prompts, settings modifications, or global dashboard profile settings saves.',
      whereUsed: 'SettingsPage (Save active clinical settings logs), AddChildModal (Primary details trigger callback)',
      sampleText: 'Confirm and Save Plan'
    },
    {
      variant: 'white',
      name: 'White Contrast',
      classCode: 'bg-white text-[var(--color-thread-dark-forest)] font-semibold text-[0.82rem] px-4.5 py-2.5 rounded-full hover:bg-slate-50 shadow-sm transition-all',
      usage: 'High value interactive actions positioned directly over dark organic backgrounds or custom media card panels.',
      whereUsed: 'TopBar (Active child selector menu items, child context selector buttons), HomePage (File upload dropzone frame)',
      sampleText: 'Upload Assessment File'
    },
    {
      variant: 'muted',
      name: 'Muted Control',
      classCode: 'text-[0.84rem] font-semibold text-slate-600 hover:text-slate-900 bg-[var(--color-thread-off-white)] hover:bg-[var(--color-thread-light-green)] border border-black/5 px-4 py-2 rounded-full transition-colors whitespace-nowrap',
      usage: 'Employed for low-destruction secondary actions, settings forms tab controllers, timeline category toggles, or cancelling current configurations.',
      whereUsed: 'SettingsPage (Clear database/logs callbacks), Roadmap Page (Segment selection milestone tabs)',
      sampleText: 'Filter Timeline'
    },
    {
      variant: 'link',
      name: 'Underlined Link',
      classCode: 'text-[0.84rem] text-[var(--color-thread-dark-slate)] font-semibold border-b border-[var(--color-thread-dark-slate)] pb-0.5 hover:opacity-70 transition-all',
      usage: 'Quiet text actions, document lists downloads prompts, expanding deeper diagnostic observations drawers, or minor inline clinical review references.',
      whereUsed: 'HomePage (Priorities secondary drawer links), StyleGuide Page (Preset link items), Document list files index table',
      sampleText: 'Read Full Evaluation Letter'
    }
  ];

  // Card styles, structures, templates and codebase usages mapped to custom presets
  const cardsInfo = [
    {
      name: "Generic UI Wrapper Card",
      type: "Wrapper Shell Layout",
      classCode: "bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/50 overflow-hidden relative transition-all duration-300",
      usage: "A translucent glassmorphic viewport shell that forms the standard wrapper for modules, lists, and form segments.",
      whereUsed: "src/components/ui/Card.tsx, AllChildrenPage.tsx, TopBar.tsx",
      sampleType: "generic"
    },
    {
      name: "Priority Card",
      type: "Action Rank Milestone",
      classCode: "relative bg-white p-7.5 mb-4.5 overflow-hidden rounded-[20px] shadow-premium",
      usage: "Accommodates detailed text lists, meta tags, and rank order info alongside nested off-white info panels.",
      whereUsed: "src/components/PrioritiesPage.tsx (PriorityCard)",
      sampleType: "priority"
    },
    {
      name: "Strategy Card",
      type: "Interlocking Playbook Block",
      classCode: "bg-white p-6.5 shadow-premium rounded-[18px]",
      usage: "Used in roadmaps and multi-step plans to bundle step lists separated by hairline dividers with aligned lead icon indicators.",
      whereUsed: "src/components/RoadmapPage.tsx (StrategyCard)",
      sampleType: "strategy"
    },
    {
      name: "Strength Observation",
      type: "Top-Right Asymmetric Accent",
      classCode: "bg-white p-6.5 rounded-tr-[32px] flex flex-col text-left",
      usage: "Designed for clinical strengths highlights, where asymmetric rounded-tr styling complements high-contrast circular iconography frames.",
      whereUsed: "src/components/UnderstandingPage.tsx (StrengthCard)",
      sampleType: "strength"
    },
    {
      name: "Value Circle Card (Solid / Light)",
      type: "Zen Radial Watermark",
      classCode: "p-7.5 relative overflow-hidden rounded-[20px] bg-[var(--color-thread-dark-forest)] text-white or bg-[var(--color-thread-cream)] text-[var(--color-thread-darkest)]",
      usage: "Displays core values and qualitative assessments carrying decorative concentric SVG circle background overlays.",
      whereUsed: "src/components/UnderstandingPage.tsx (ValueCard), src/components/EmergingDetailsPage.tsx",
      sampleType: "value"
    },
    {
      name: "Resource Guide Card",
      type: "Visual Reference Item",
      classCode: "bg-white flex flex-col cursor-pointer transition-all group overflow-hidden rounded-tr-[32px] hover:scale-[1.02]",
      usage: "Grid-structured card encapsulating media-aspect covers (16:9), text containers with tracking elements, and summary metadata footers.",
      whereUsed: "src/components/ResourcesPage.tsx (GuideCard)",
      sampleType: "guide"
    },
    {
      name: "Synthesis Card (Asymmetric)",
      type: "Premium Editorial Card",
      classCode: "relative p-8 border rounded-tr-[36px] overflow-hidden flex flex-col justify-between h-[300px] bg-[var(--color-thread-dark-forest)] text-white border-transparent",
      usage: "A large focal card used as a visual anchor. Uses customized top-right curve and ambient background rings.",
      whereUsed: "src/components/AllChildrenPage.tsx (Synthesis Card)",
      sampleType: "synthesis"
    },
    {
      name: "Quarter Plan Card (Asymmetric)",
      type: "Premium Editorial Card",
      classCode: "relative p-8 border border-black/5 rounded-bl-[32px] overflow-hidden flex flex-col justify-between h-[300px] bg-white text-[var(--color-thread-dark-slate)]",
      usage: "Used in pairing with the Synthesis Card, mirroring the visual layout with a custom asymmetric bottom-left corner.",
      whereUsed: "src/components/AllChildrenPage.tsx (Quarter Plan Card)",
      sampleType: "quarter"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-[1100px] mx-auto pt-16 px-11 pb-24 max-md:px-5 font-sans"
    >
      {/* Page Header */}
      <div className="mb-16">
        <span className="text-[0.75rem] tracking-[0.12em] uppercase text-[var(--color-thread-mid-green)] font-bold mb-4 block">
          Internal Design Token & Style Audit
        </span>
        <h1 className="font-serif font-normal text-[3.8rem] leading-[4.3rem] tracking-[-0.075rem] text-[var(--color-thread-heading)]">
          The Design System.
        </h1>
        <p className="text-[1.02rem] text-[var(--color-thread-gray)] mt-4.5 max-w-[65ch] leading-relaxed">
          Comprehensive design system inventory mapping all typography scales, hex colors, 
          container configurations, micro-behaviours, and UI components configured for Threadline.
        </p>
      </div>

      {/* Grid of Contents */}
      <div className="space-y-16">
        
        {/* Colors Palette Section */}
        <section className="bg-white rounded-tr-[36px] p-10 border border-black/5 shadow-sm">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="w-10 h-10 rounded-full bg-[var(--color-thread-light-green)] flex items-center justify-center text-[var(--color-thread-mid-green)]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[1.5rem] font-serif font-normal text-[var(--color-thread-heading)]">
                Dynamic Themes & Colors
              </h2>
              <p className="text-slate-500 text-[0.88rem] mt-0.5">
                Primary Tailwind custom utilities mapped to variable definitions supporting Energetic and Classic profiles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {colors.map((c) => (
              <div 
                key={c.name} 
                className="group relative p-5 bg-[var(--color-thread-off-white)] border border-black/5 rounded-xl hover:border-black/10 transition-all flex flex-col justify-between"
              >
                <div 
                  className="w-full h-[80px] rounded-lg shadow-inner mb-4 relative overflow-hidden"
                  style={{ backgroundColor: c.value }}
                >
                  <button
                    onClick={() => handleCopy(c.value, c.name)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[0.75rem] font-semibold gap-1.5 transition-opacity"
                  >
                    {copiedText === c.name ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedText === c.name ? "Copied!" : "Copy Hex"}
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold text-[0.92rem] text-slate-800 leading-tight">
                    {c.name}
                  </h3>
                  <code className="text-[0.72rem] text-[var(--color-thread-gray)] font-mono block mt-1.5">
                    {c.variable}
                  </code>
                  <p className="text-[0.75rem] text-slate-500 leading-snug mt-2.5">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Background Harmony & Contrast Matrix */}
          <div className="mt-12 pt-10 border-t border-black/5">
            <h3 className="text-[1.05rem] font-serif font-normal text-[var(--color-thread-heading)] mb-2">
              Background Color Harmony & Contrast Scan
            </h3>
            <p className="text-slate-500 text-[0.84rem] mb-6 max-w-[70ch]">
              Threadline uses selective dynamic backgrounds to divide information clusters. This matrix outlines compliant text colors, action accents, and label classes designed specifically for each background type.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              
              {/* Premium Forest Dark BG */}
              <div className="bg-[var(--color-thread-dark-forest)] p-6 rounded-tr-[28px] rounded-bl-[20px] shadow-sm border border-black/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-emerald-100 bg-emerald-900/30 px-2 py-0.5 rounded-full">
                      Dark Background
                    </span>
                    <span className="text-[0.65rem] font-mono text-emerald-200/40">--color-thread-dark-forest</span>
                  </div>
                  <h4 className="font-serif font-normal text-white text-[1.45rem] tracking-tight leading-tight mb-2">
                    Premium Forest Slate
                  </h4>
                  <p className="text-emerald-100/75 text-[0.84rem] leading-relaxed mb-4">
                    Best for high-priority clinician summaries. Ensures cozy, eyes-safe focus in low-light environments.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2.5">
                  <div className="flex justify-between items-center text-[0.75rem]">
                    <span className="text-emerald-200/70 font-medium">Headings</span>
                    <span className="text-white font-semibold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-white" /> White (#FFF)
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[0.75rem]">
                    <span className="text-emerald-200/70 font-medium">Body Description</span>
                    <span className="text-emerald-100/80 font-semibold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-100/80" /> Emerald 100
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[0.75rem]">
                    <span className="text-emerald-200/70 font-medium">Accents / Badges</span>
                    <span className="text-[var(--color-thread-light-green)] font-semibold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-thread-light-green)]" /> Light Green
                    </span>
                  </div>
                </div>
              </div>

              {/* Cozy Warm Cream BG */}
              <div className="bg-[var(--color-thread-cream)] p-6 rounded-2xl shadow-sm border border-black/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-[#4B4130] bg-[#E5DCB8]/50 px-2 py-0.5 rounded-full">
                      Warm Mid-tone
                    </span>
                    <span className="text-[0.65rem] font-mono text-amber-900/40">--color-thread-cream</span>
                  </div>
                  <h4 className="font-serif font-normal text-[var(--color-thread-heading)] text-[1.45rem] tracking-tight leading-tight mb-2">
                    Organic Cream Linen
                  </h4>
                  <p className="text-[#4B554F] text-[0.84rem] leading-relaxed mb-4">
                    Excellent for dividers, review timelines, school layout boundaries, and tactile retro notes.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-black/10 space-y-2.5">
                  <div className="flex justify-between items-center text-[0.75rem]">
                    <span className="text-slate-500 font-medium">Headings</span>
                    <span className="text-[var(--color-thread-heading)] font-semibold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-thread-heading)]" /> Forest Green
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[0.75rem]">
                    <span className="text-slate-500 font-medium">Body Description</span>
                    <span className="text-slate-800 font-semibold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-800" /> Slate 800
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[0.75rem]">
                    <span className="text-slate-500 font-medium">Accents / Muted</span>
                    <span className="text-slate-600 font-semibold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-600" /> Slate 600
                    </span>
                  </div>
                </div>
              </div>

              {/* Soft Light Green BG */}
              <div className="bg-[var(--color-thread-light-green)] p-6 rounded-tl-[24px] rounded-br-[28px] shadow-sm border border-[var(--color-thread-mid-green)]/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-[var(--color-thread-mid-green)] bg-white/60 px-2 py-0.5 rounded-full">
                      Soft Highlight
                    </span>
                    <span className="text-[0.65rem] font-mono text-emerald-950/40">--color-thread-light-green</span>
                  </div>
                  <h4 className="font-serif font-normal text-[var(--color-thread-heading)] text-[1.45rem] tracking-tight leading-tight mb-2">
                    Mint Herbal Velvet
                  </h4>
                  <p className="text-emerald-950/70 text-[0.84rem] leading-relaxed mb-4">
                    Used for resource summaries, selected checkboxes, active toggles, and positive feedback badges.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--color-thread-mid-green)]/15 space-y-2.5">
                  <div className="flex justify-between items-center text-[0.75rem]">
                    <span className="text-emerald-950/60 font-medium">Headings</span>
                    <span className="text-[var(--color-thread-heading)] font-semibold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-thread-heading)]" /> Forest Green
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[0.75rem]">
                    <span className="text-emerald-950/60 font-medium">Body Description</span>
                    <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-700" /> Slate 700
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[0.75rem]">
                    <span className="text-emerald-950/60 font-medium">Strong Accent</span>
                    <span className="text-[var(--color-thread-mid-green)] font-semibold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-thread-mid-green)]" /> Mid Green (#108560)
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Micro Interaction Tool */}
            <div className="mt-8 p-6 bg-slate-50/50 border border-black/5 rounded-2xl">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                <span className="text-[0.68rem] tracking-[0.16em] uppercase text-slate-400 font-bold block">
                  Interactive Background-Color Reader
                </span>
                <div className="flex gap-2">
                  <span className="text-[0.72rem] text-slate-500 font-medium">Current active theme:</span>
                  <span className="text-[0.72rem] bg-amber-500/10 text-amber-800 font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                    Classic & Energetic Responsive Stack
                  </span>
                </div>
              </div>
              <p className="text-[0.84rem] text-slate-600 leading-relaxed max-w-[85ch]">
                Because our theme shifts dynamically based on user selection (Classic vs Energetic configured in the system user settings), components automatically scale their contrasts. Verify that all child elements read colors from root CSS parameters (like <span className="font-mono text-[0.75rem] text-slate-850 px-1 py-0.5 bg-slate-100 rounded">text-[var(--color-thread-heading)]</span>) to maintain perfect accessibility rules across light, cream, and dark Forest skins.
              </p>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="bg-white rounded-bl-[32px] p-10 border border-black/5 shadow-sm">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="w-10 h-10 rounded-full bg-[var(--color-thread-light-green)] flex items-center justify-center text-[var(--color-thread-mid-green)]">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[1.5rem] font-serif font-normal text-[var(--color-thread-heading)]">
                Typographic Hierarchy
              </h2>
              <p className="text-slate-500 text-[0.88rem] mt-0.5">
                Pairing serif displays for clinical human insights with modern high-legibility sans-serifs for dashboard metrics.
              </p>
            </div>
          </div>

          <div className="space-y-8 divide-y divide-black/5">
            {fonts.map((f, i) => (
              <div key={f.family} className={`pt-8 first:pt-0 flex max-md:flex-col gap-6`}>
                <div className="w-[280px] flex-shrink-0">
                  <h3 className="font-bold text-[0.95rem] text-slate-900 leading-tight">
                    {f.family}
                  </h3>
                  <p className="text-[0.8rem] text-slate-500 mt-2 leading-relaxed">
                    {f.usage}
                  </p>
                  <button
                    onClick={() => handleCopy(f.classes, f.family)}
                    className="mt-3.5 text-[0.7rem] bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-2 py-1.5 rounded inline-flex items-center gap-1.5"
                  >
                    {copiedText === f.family ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3 h-3" />}
                    Copy class code
                  </button>
                </div>

                <div className="flex-1 bg-[var(--color-thread-off-white)] p-6 rounded-xl border border-black/5 flex items-center">
                  <span className={f.classes}>
                    {f.sample}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Font Weights & Variations Matrix */}
          <div className="mt-12 pt-10 border-t border-black/5">
            <h3 className="text-[1.05rem] font-serif font-normal text-[var(--color-thread-heading)] mb-2">
              Font Weights & Variations Comparison
            </h3>
            <p className="text-slate-500 text-[0.84rem] mb-6 max-w-[70ch]">
              Maintaining a clear, intentional typographic rhythm is about pairing weights correctly. Compare light, regular, medium, and bold expressions of our standard families below.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Serif Weights Comparison */}
              <div className="bg-[var(--color-thread-off-white)] p-6 rounded-2xl border border-black/5">
                <div className="flex items-center justify-between mb-4.5 border-b border-black/5 pb-3">
                  <span className="text-[0.68rem] tracking-[0.1em] uppercase font-bold text-slate-700">
                    Fraunces (Serif Style Family)
                  </span>
                  <span className="text-[0.7rem] bg-emerald-50 text-[var(--color-thread-mid-green)] font-semibold px-2 py-0.5 rounded animate-pulse">
                    Clinical Elegant
                  </span>
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <span className="w-16 font-mono text-[0.7rem] text-slate-400 mt-1 uppercase">Regular</span>
                    <div>
                      <div className="font-serif font-normal text-[1.6rem] leading-tight text-[var(--color-thread-heading)]">
                        Humanized Growth Plans
                      </div>
                      <span className="text-[0.7rem] text-slate-400 font-mono">font-serif font-normal (400)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-black/5 pt-4">
                    <span className="w-16 font-mono text-[0.7rem] text-slate-400 mt-1 uppercase">Medium</span>
                    <div>
                      <div className="font-serif font-medium text-[1.6rem] leading-tight text-slate-900">
                        Humanized Growth Plans
                      </div>
                      <span className="text-[0.7rem] text-slate-400 font-mono">font-serif font-medium (500)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-black/5 pt-4">
                    <span className="w-16 font-mono text-[0.7rem] text-slate-400 mt-1 uppercase">Bold</span>
                    <div>
                      <div className="font-serif font-bold text-[1.6rem] leading-tight text-slate-950">
                        Humanized Growth Plans
                      </div>
                      <span className="text-[0.7rem] text-slate-400 font-mono">font-serif font-bold (700)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-black/5 pt-4">
                    <span className="w-16 font-mono text-[0.7rem] text-slate-400 mt-1 uppercase">Black</span>
                    <div>
                      <div className="font-serif font-black text-[1.6rem] leading-tight text-slate-950">
                        Humanized Growth Plans
                      </div>
                      <span className="text-[0.7rem] text-slate-400 font-mono">font-serif font-black (900)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sans-Serif Weights Comparison */}
              <div className="bg-[var(--color-thread-off-white)] p-6 rounded-2xl border border-black/5">
                <div className="flex items-center justify-between mb-4.5 border-b border-black/5 pb-3">
                  <span className="text-[0.68rem] tracking-[0.1em] uppercase font-bold text-slate-700">
                    Inter (Sans-Serif Style Family)
                  </span>
                  <span className="text-[0.7rem] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                    Neutral High-Legibility
                  </span>
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <span className="w-16 font-mono text-[0.7rem] text-slate-400 mt-1 uppercase">Regular</span>
                    <div>
                      <div className="font-sans font-normal text-[1.3rem] leading-tight text-slate-800 tracking-tight">
                        Support Strategies & Focus Tracker
                      </div>
                      <span className="text-[0.7rem] text-slate-400 font-mono">font-sans font-normal (400)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-black/5 pt-4">
                    <span className="w-16 font-mono text-[0.7rem] text-slate-400 mt-1 uppercase">Medium</span>
                    <div>
                      <div className="font-sans font-medium text-[1.3rem] leading-tight text-slate-900 tracking-tight">
                        Support Strategies & Focus Tracker
                      </div>
                      <span className="text-[0.7rem] text-slate-400 font-mono">font-sans font-medium (500)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-black/5 pt-4">
                    <span className="w-16 font-mono text-[0.7rem] text-slate-400 mt-1 uppercase">Semibold</span>
                    <div>
                      <div className="font-sans font-semibold text-[1.3rem] leading-tight text-slate-950 tracking-tight">
                        Support Strategies & Focus Tracker
                      </div>
                      <span className="text-[0.7rem] text-slate-400 font-mono">font-sans font-semibold (600)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-black/5 pt-4">
                    <span className="w-16 font-mono text-[0.7rem] text-slate-400 mt-1 uppercase">Bold</span>
                    <div>
                      <div className="font-sans font-bold text-[1.3rem] leading-tight text-slate-950 tracking-tight">
                        Support Strategies & Focus Tracker
                      </div>
                      <span className="text-[0.7rem] text-slate-400 font-mono">font-sans font-bold (700)</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Containers, Shapes & Borders */}
        <section className="bg-white rounded-xl p-10 border border-black/5 shadow-sm">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="w-10 h-10 rounded-full bg-[var(--color-thread-light-green)] flex items-center justify-center text-[var(--color-thread-mid-green)]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[1.5rem] font-serif font-normal text-[var(--color-thread-heading)]">
                Borders, Shapes & Backgrounds
              </h2>
              <p className="text-slate-500 text-[0.88rem] mt-0.5">
                Unique cornering presets and custom background effects creating signature organic shapes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {shapes.map((s) => (
                <div key={s.name} className="flex gap-4 p-4 border border-black/5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-11 h-11 bg-emerald-50 text-[var(--color-thread-mid-green)] font-mono text-[0.75rem] flex items-center justify-center font-bold border border-emerald-100/30 rounded-lg">
                    C3
                  </div>
                  <div>
                    <h4 className="font-semibold text-[0.9rem] text-slate-900">{s.name}</h4>
                    <code className="text-[0.72rem] text-[var(--color-thread-mid-green)] bg-[var(--color-thread-light-green)] px-1.5 py-0.5 rounded font-mono mt-1 inline-block">
                      {s.class}
                    </code>
                    <p className="text-[0.78rem] text-slate-500 mt-2 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Background Showcase */}
            <div className="bg-[var(--color-thread-off-white)] border border-black/5 rounded-2xl p-6.5 flex flex-col justify-between">
              <div>
                <span className="text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-thread-mid-green)] font-bold mb-2.5 block">
                  Watercolor Texture Accent
                </span>
                <p className="text-[0.86rem] text-slate-600 leading-relaxed mb-6">
                  Featured on the primary app backdrop canvas, linear gradient coupled with soft organic paint spots provides a warm clinical sensory atmosphere.
                </p>
              </div>

              {/* Visualized block */}
              <div className="w-full h-[120px] rounded-xl bg-watercolor flex items-center justify-center">
                <span className="bg-white/90 backdrop-blur-md border border-neutral-200/50 rounded-full px-5 py-2 text-[0.82rem] font-semibold tracking-wide shadow-sm text-slate-800">
                  bg-watercolor utility styled
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons and Custom Controls Section with Matrix Table */}
        <section className="bg-white rounded-tr-[36px] p-10 border border-black/5 shadow-sm w-full font-sans">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="w-10 h-10 rounded-full bg-[var(--color-thread-light-green)] flex items-center justify-center text-[var(--color-thread-mid-green)]">
              <ToggleLeft className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[1.50rem] font-serif font-normal text-[var(--color-thread-heading)]">
                Button Style Mapping & Codebase Matrix (BTN)
              </h2>
              <p className="text-slate-500 text-[0.88rem] mt-0.5">
                Detailed matrix mapping the core button styles used within the codebase, their usage guidelines, and codebase file sources.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Responsive Table Layout */}
            <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-xs">
              <table className="w-full text-left border-collapse min-w-[750px]">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-black/5 text-[0.68rem] uppercase tracking-wider text-slate-500 font-bold font-sans">
                    <th className="py-4.5 px-6 font-semibold">Variant Spec</th>
                    <th className="py-4.5 px-6 font-semibold">Tailwind Classes (Appearance)</th>
                    <th className="py-4.5 px-6 font-semibold max-w-[260px]">Usage & Meaning</th>
                    <th className="py-4.5 px-6 font-semibold">Where Used in Codebase</th>
                    <th className="py-4.5 px-6 font-semibold text-right">Interactive Preview</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-[0.82rem] text-slate-600 font-sans">
                  {buttonsInfo.map((btn) => (
                    <tr key={btn.variant} className="hover:bg-slate-50/40 transition-colors">
                      
                      {/* Variant API Spec */}
                      <td className="py-4.5 px-6 align-middle font-sans">
                        <div className="font-bold text-slate-900 text-[0.86rem] mb-0.5">{btn.name}</div>
                        <code className="text-[0.64rem] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-mono font-semibold inline-block">
                          variant="{btn.variant}"
                        </code>
                      </td>

                      {/* Styles CSS Code */}
                      <td className="py-4.5 px-6 align-middle max-w-[240px]">
                        <div className="font-mono text-[0.66rem] text-slate-500 leading-relaxed bg-[var(--color-thread-off-white)] p-2 rounded-lg border border-black/5 mb-1.5 line-clamp-2 hover:line-clamp-none transition-all cursor-help" title={btn.classCode}>
                          {btn.classCode}
                        </div>
                        <button
                          onClick={() => handleCopy(btn.classCode, btn.name)}
                          className="text-[0.68rem] text-[var(--color-thread-mid-green)] hover:text-slate-900 font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedText === btn.name ? (
                            <span className="flex items-center gap-1 text-emerald-600"><Check className="w-3 h-3" /> Classes Copied</span>
                          ) : (
                            <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy class string</span>
                          )}
                        </button>
                      </td>

                      {/* Usage & Meaning */}
                      <td className="py-4.5 px-6 align-middle max-w-[260px] leading-relaxed text-[0.78rem] text-slate-550">
                        {btn.usage}
                      </td>

                      {/* Where Used list */}
                      <td className="py-4.5 px-6 align-middle">
                        <div className="flex flex-wrap gap-1 max-w-[220px]">
                          {btn.whereUsed.split(', ').map((loc) => (
                            <span key={loc} className="text-[0.64rem] bg-[var(--color-thread-light-green)]/40 text-[var(--color-thread-heading)] font-semibold px-2 py-0.5 rounded border border-[var(--color-thread-mid-green)]/10 font-sans tracking-tight">
                              {loc}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Sample Preview button with Callback */}
                      <td className="py-4.5 px-6 align-middle text-right">
                        <Button
                          variant={btn.variant as any}
                          onClick={() => {
                            addLog(`Blueprint: '${btn.name}' clicked! Triggering dynamic path callback...`);
                            // Dynamically map navigation page depending on target
                            const navigationMap: Record<string, string> = {
                              forest: "priorities",
                              mint: "resources",
                              slate: "settings",
                              white: "all-children",
                              muted: "roadmap",
                              link: "documents"
                            };
                            const targetPage = navigationMap[btn.variant];
                            if (targetPage) onPageChange(targetPage as any);
                          }}
                          className="cursor-pointer select-none hover:scale-102 transform active:scale-98 transition-all px-4 py-2 text-[0.76rem] font-bold h-9 whitespace-nowrap inline-flex"
                        >
                          {btn.sampleText}
                        </Button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[var(--color-thread-light-green)]/35 rounded-2xl p-5 border border-[var(--color-thread-mid-green)]/15 text-[0.82rem] text-slate-700 leading-relaxed font-sans">
              <strong className="text-[var(--color-thread-heading)] font-semibold block mb-0.5">Component Integration Checklist</strong>
              Fully unified button mapping allows seamless navigation and state flow testing. These exact variants render reliably within settings drawers, priority tables, dialog sheets, and diagnostic dashboards.
            </div>
          </div>
        </section>

        {/* Card Style Mapping & Template Matrix */}
        <section className="bg-white rounded-bl-[36px] p-10 border border-black/5 shadow-sm w-full font-sans">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="w-10 h-10 rounded-full bg-[var(--color-thread-light-green)] flex items-center justify-center text-[var(--color-thread-mid-green)]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[1.50rem] font-serif font-normal text-[var(--color-thread-heading)]">
                Active Card Style Mapping & Codebase Templates
              </h2>
              <p className="text-slate-500 text-[0.88rem] mt-0.5">
                Mapping exact card visual layouts, custom curvature options, and qualitative structural presets documented from actual workspace pages.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Responsive Cards Table */}
            <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-xs">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-black/5 text-[0.68rem] uppercase tracking-wider text-slate-500 font-bold font-sans">
                    <th className="py-4.5 px-6 font-semibold">Card Name & Presets</th>
                    <th className="py-4.5 px-6 font-semibold max-w-[240px]">Tailwind Classes (Structure)</th>
                    <th className="py-4.5 px-6 font-semibold max-w-[280px]">Usage, Shape & Meaning</th>
                    <th className="py-4.5 px-6 font-semibold">Source Core Codebase Map</th>
                    <th className="py-4.5 px-6 font-semibold text-right">Interactive Composition Live Preview</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-[0.82rem] text-slate-600 font-sans">
                  {cardsInfo.map((card) => (
                    <tr key={card.name} className="hover:bg-slate-50/40 transition-colors">
                      
                      {/* Name & Type */}
                      <td className="py-4.5 px-6 align-middle font-sans">
                        <div className="font-bold text-slate-900 text-[0.86rem] mb-0.5">{card.name}</div>
                        <span className="text-[0.66rem] text-[var(--color-thread-mid-green)] bg-[var(--color-thread-light-green)] px-2 py-0.5 rounded font-semibold inline-block">
                          {card.type}
                        </span>
                      </td>

                      {/* Tailwind CSS Classes */}
                      <td className="py-4.5 px-6 align-middle max-w-[240px]">
                        <div className="font-mono text-[0.66rem] text-slate-500 leading-relaxed bg-[var(--color-thread-off-white)] p-2 rounded-lg border border-black/5 mb-1.5 line-clamp-2 hover:line-clamp-none transition-all cursor-help" title={card.classCode}>
                          {card.classCode}
                        </div>
                        <button
                          onClick={() => handleCopy(card.classCode, card.name)}
                          className="text-[0.68rem] text-[var(--color-thread-mid-green)] hover:text-slate-900 font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedText === card.name ? (
                            <span className="flex items-center gap-1 text-emerald-600"><Check className="w-3 h-3" /> Classes Copied</span>
                          ) : (
                            <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy class string</span>
                          )}
                        </button>
                      </td>

                      {/* Usage, Shape & Meaning */}
                      <td className="py-4.5 px-6 align-middle max-w-[280px] leading-relaxed text-[0.78rem] text-slate-550">
                        {card.usage}
                      </td>

                      {/* Source Mapping files */}
                      <td className="py-4.5 px-6 align-middle">
                        <div className="flex flex-wrap gap-1 max-w-[240px]">
                          {card.whereUsed.split(', ').map((loc) => (
                            <span key={loc} className="text-[0.64rem] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded border border-black/5 font-mono tracking-tight break-all">
                              {loc}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Live miniature visual preview */}
                      <td className="py-5 px-6 align-middle text-right">
                        <div className="inline-flex justify-end pr-2 text-left">
                          {card.sampleType === 'generic' && (
                            <Card hoverable className="w-[310px]">
                              <CardHeader>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-[0.62rem] tracking-wider uppercase font-bold text-slate-400">CareTeam Node</span>
                                  <span 
                                    onClick={() => {
                                      const nextStatus = genericCardStatus === 'active' ? 'completed' : 'active';
                                      setGenericCardStatus(nextStatus);
                                      addLog(`Generic Card: Simulated clinician session state toggled to '${nextStatus}'`);
                                    }}
                                    className={cn(
                                      "text-[0.64rem] px-2.5 py-0.5 rounded-full font-bold cursor-pointer transition-colors",
                                      genericCardStatus === 'active' 
                                        ? 'bg-emerald-100 text-emerald-800 animate-pulse' 
                                        : 'bg-slate-100 text-slate-600'
                                    )}
                                  >
                                    {genericCardStatus === 'active' ? '● LIVE SESSION' : '✓ COMPLETED'}
                                  </span>
                                </div>
                                <CardTitle className="text-[1.12rem] leading-snug">
                                  Speech & Language Assessment
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-[0.84rem] text-slate-500 leading-relaxed">
                                  Initial diagnostics mapping phoneme markers and alveolar fricatives.
                                </p>
                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--color-thread-light-gray)]/50">
                                  <div className="text-[0.74rem] text-slate-400 font-semibold">SLP: Dr. C. Chen</div>
                                  <button 
                                    onClick={() => addLog("Generic Card CTA: Selected 'Review Diagnostics' channel.")}
                                    className="text-[0.78rem] font-bold text-[var(--color-thread-mid-green)] hover:opacity-80 transition-opacity cursor-pointer"
                                  >
                                    Review Diagnostics &rarr;
                                  </button>
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          {card.sampleType === 'priority' && (
                            <div className="w-[320px] bg-white p-7.5 overflow-hidden rounded-[20px] shadow-premium border border-black/5 flex flex-col">
                              <div className="flex gap-3.5 items-start mb-4 relative">
                                <span className="text-[0.75rem] tracking-[0.1em] uppercase font-medium px-4 py-2 rounded-full bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)] flex-shrink-0 mt-1">
                                  Next
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="font-sans font-medium text-[1.22rem] tracking-tight text-[var(--color-thread-dark-slate)] mb-1">
                                    Emotional regulation
                                  </div>
                                  <div className="text-[0.82rem] text-[var(--color-thread-gray)] font-sans">
                                    Moderate impact · prepare months ahead
                                  </div>
                                </div>
                              </div>
                              <p className="text-[1rem] text-slate-500 leading-relaxed mb-5 relative">
                                Frustration around homework cycles gets real. Tackling attention first does double duty.
                              </p>
                              <div className="bg-[var(--color-thread-off-white)] rounded-[20px] px-5.5 py-4 mb-4.5 relative">
                                <span className="text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-thread-mid-green)] font-medium mb-2 block">
                                  Why it ranks here
                                </span>
                                <div className="space-y-0">
                                  <div className="flex justify-between text-[0.86rem] border-b border-black/5 py-2.25">
                                    <span className="text-slate-500">Functional impact</span>
                                    <span className="font-medium text-slate-700">Moderate</span>
                                  </div>
                                  <div className="flex justify-between text-[0.86rem] pt-2.25">
                                    <span className="text-slate-500">Family burden</span>
                                    <span className="font-medium text-slate-700">High</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-[0.88rem] flex items-center gap-2.5 text-slate-500 leading-tight mt-auto pt-3">
                                <ArrowRight className="w-4 h-4 flex-shrink-0 text-[var(--color-thread-mid-green)]" />
                                <span>Linked to <strong>Classroom attention</strong></span>
                              </div>
                            </div>
                          )}

                          {card.sampleType === 'strategy' && (
                            <div className="w-[310px] bg-white p-6.5 shadow-premium rounded-[18px] border border-black/5 flex flex-col text-left">
                              <div className="flex items-center gap-2.75 mb-3.5">
                                <div className="w-[34px] h-[34px] rounded-[9px] bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)] flex items-center justify-center flex-shrink-0">
                                  <Activity className="w-4.5 h-4.5 stroke-[1.8]" />
                                </div>
                                <h3 className="text-[1.05rem] font-semibold tracking-tight text-slate-800 font-sans">
                                  At school
                                </h3>
                              </div>
                              <div className="flex flex-col">
                                {[
                                  "Seat Maya near the front, away from busy pathways.",
                                  "Break tasks into short, clear, manageable chunks.",
                                  "Agree a quiet, subtle redirection signal."
                                ].map((item, i) => (
                                  <div 
                                    key={i} 
                                    className={cn(
                                      "flex gap-2.75 py-2.75 text-[0.92rem] text-slate-600 leading-relaxed font-sans",
                                      i === 0 && "pt-0"
                                    )}
                                  >
                                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-thread-mid-green)] mt-[8px]" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {card.sampleType === 'strength' && (
                            <div className="w-[310px] bg-white p-6.5 rounded-tr-[32px] flex flex-col text-left">
                              <div className="w-[46px] h-[46px] rounded-[13px] bg-[var(--color-thread-light-green)] flex items-center justify-center text-[var(--color-thread-mid-green)] mb-4.5">
                                <Star className="w-[20px] h-[20px] stroke-[1.8] fill-emerald-100" />
                              </div>
                              <h3 className="text-[1.16rem] font-semibold tracking-tight text-[var(--color-thread-heading)] mb-2.5 leading-tight font-sans">
                                Creative Play
                              </h3>
                              <p className="text-[0.9rem] text-slate-500 leading-relaxed font-sans">
                                Displays rich imaginative flow, abstract play and artistic task retention. A real strength to build on.
                              </p>
                            </div>
                          )}

                          {card.sampleType === 'value' && (
                            <div 
                              onClick={() => {
                                setValueCardForest(!valueCardForest);
                                addLog(`Value Card: Swapped live preview theme to ${!valueCardForest ? "Solid Deep Forest" : "Warm Vintage Cream"}`);
                              }}
                              className={cn(
                                "p-7.5 relative overflow-hidden w-[320px] h-[180px] rounded-[20px] transition-all duration-350 shadow-sm cursor-pointer flex flex-col justify-between text-left",
                                valueCardForest ? "bg-[var(--color-thread-dark-forest)] text-white" : "bg-[var(--color-thread-cream)] text-[var(--color-thread-darkest)]"
                              )}
                            >
                              <svg
                                className="absolute -right-[70px] -top-[80px] opacity-15 pointer-events-none"
                                width="240"
                                height="240"
                              >
                                <circle cx="120" cy="120" r="48" fill="none" stroke={valueCardForest ? "white" : "black"} strokeOpacity={valueCardForest ? "1" : "0.2"} strokeWidth="1" />
                                <circle cx="120" cy="120" r="82" fill="none" stroke={valueCardForest ? "white" : "black"} strokeOpacity={valueCardForest ? "1" : "0.2"} strokeWidth="1" />
                                <circle cx="120" cy="120" r="116" fill="none" stroke={valueCardForest ? "white" : "black"} strokeOpacity={valueCardForest ? "1" : "0.2"} strokeWidth="1" />
                              </svg>
                              <div className="relative">
                                <h3 className="text-[1.18rem] font-semibold tracking-tight mb-2 relative font-sans">
                                  Evidence &rArr; Formulation
                                </h3>
                                <p className={cn("text-[0.92rem] leading-relaxed relative", valueCardForest ? "text-white/85" : "text-slate-600 font-sans")}>
                                  Every clinique is traced back to its source and confirmed with certified reviewers.
                                </p>
                              </div>
                              <span className="text-[0.68rem] font-mono tracking-wider opacity-65 font-bold block">
                                Click to Flip Style View &rarr;
                              </span>
                            </div>
                          )}

                          {card.sampleType === 'guide' && (
                            <div className="w-[310px] bg-white flex flex-col cursor-pointer transition-all group overflow-hidden rounded-tr-[32px] hover:scale-[1.02] duration-300 text-left">
                              <div className="w-full aspect-[16/9] overflow-hidden bg-slate-100 relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-thread-light-green)]/70 to-[var(--color-thread-cream)]/40 z-[1]" />
                              </div>
                              <div className="p-6 flex flex-col flex-1">
                                <span className="text-[0.58rem] tracking-[0.14em] uppercase text-[var(--color-thread-muted-green)] font-bold mb-3 font-sans">Parent Methods</span>
                                <h3 className="text-[1.18rem] font-semibold tracking-tight leading-tight mb-2 text-slate-900 font-serif">
                                  Interactive Vocalization Timing
                                </h3>
                                <p className="text-[0.9rem] text-slate-500 leading-relaxed font-sans">
                                  Actionable feedback strategies mapping daily child-led verbal learning profiles.
                                </p>
                                <div className="flex items-center justify-between pt-4 mt-8">
                                  <span className="text-[0.78rem] text-slate-400 font-sans">12 min read</span>
                                  <ActionLink variant="slate" as="span" className="group-hover:text-[var(--color-thread-mid-green)]">
                                    Read guide
                                  </ActionLink>
                                </div>
                              </div>
                            </div>
                          )}

                          {card.sampleType === 'synthesis' && (
                            <div className="w-[320px] h-[300px] relative p-8 rounded-tr-[36px] overflow-hidden flex flex-col justify-between bg-[var(--color-thread-dark-forest)] text-white shadow-md transition-shadow">
                              <svg
                                className="absolute -right-16 -bottom-20 pointer-events-none text-white/10"
                                width="260"
                                height="260"
                              >
                                <circle cx="130" cy="130" r="48" fill="none" stroke="currentColor" strokeWidth="1" />
                                <circle cx="130" cy="130" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
                                <circle cx="130" cy="130" r="114" fill="none" stroke="currentColor" strokeWidth="1" />
                              </svg>

                              <div className="relative">
                                <span className="text-[0.68rem] tracking-[0.12em] uppercase font-bold mb-4 block text-emerald-200 font-sans">
                                  Clinician Synthesis Summary
                                </span>
                                <p className="font-serif font-normal text-[1.38rem] leading-[1.4] tracking-tight text-white max-w-[34ch]">
                                  "Maya is showing marked improvements in auditory processing, though focus remains tethered to circadian stability."
                                </p>
                              </div>

                              <div className="flex items-center justify-between mt-auto relative pt-4">
                                <div className="inline-flex items-center gap-2">
                                  <div className="inline-flex gap-1 items-center">
                                    {[1, 2, 3].map((l) => (
                                      <span key={l} className="w-1.25 h-1.25 rounded-full bg-emerald-300 transition-all font-sans" />
                                    ))}
                                  </div>
                                  <span className="text-[0.68rem] tracking-[0.06em] uppercase font-bold text-emerald-100 font-sans">
                                    Strong formulation
                                  </span>
                                </div>
                                <button 
                                  onClick={() => addLog("Synthesis Card Clinician Open Insights triggered.")}
                                  className="bg-white text-[var(--color-thread-dark-forest)] font-semibold text-[0.82rem] px-4.5 py-2.5 rounded-full hover:bg-slate-50 transition-all font-sans cursor-pointer shadow-sm inline-flex items-center gap-1"
                                >
                                  Open Insights <ChevronRight className="w-3.5 h-3.5 stroke-[2]" />
                                </button>
                              </div>
                            </div>
                          )}

                          {card.sampleType === 'quarter' && (
                            <div className="w-[320px] h-[300px] bg-[var(--hero-secondary-bg)] border border-black/5 text-[var(--hero-secondary-text)] rounded-bl-[32px] p-7.5 flex flex-col justify-between transition-shadow relative">
                              <div>
                                <span className="text-[0.68rem] tracking-[0.12em] uppercase opacity-75 font-bold mb-5 block font-sans">
                                  This Quarter's Plan Progress
                                </span>
                                
                                <div className="flex items-end gap-3.5 mt-4 mb-2">
                                  <div className="font-serif text-[3.6rem] leading-none tracking-[-1.5px] font-normal">
                                    {quarterProgressValue}%
                                  </div>
                                  <div className="text-[0.98rem] opacity-90 leading-snug pb-1 flex flex-col font-sans">
                                    <span className="font-bold">on track</span>
                                    <span className="opacity-75 text-[0.82rem]">steady progress</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col mt-auto w-full">
                                <div className="mb-5">
                                  <ProgressBar
                                    value={quarterProgressValue}
                                    max={100}
                                    heightClass="h-2.5"
                                    isSecondary
                                    colorClass="bg-[var(--hero-secondary-text)]"
                                  />
                                </div>
                                
                                <div className="flex items-center gap-2 text-[0.8rem] opacity-75 border-t border-current/10 pt-4">
                                  <Calendar className="w-4 h-4 stroke-[1.8]" />
                                  <span className="font-sans">
                                    Next clinical review: <strong className="font-semibold ml-1">12 September</strong>
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[var(--color-thread-cream)] text-[var(--color-thread-darkest)] rounded-2xl p-5 border border-black/5 text-[0.82rem] leading-relaxed font-sans">
              <strong className="text-[var(--color-thread-heading)] font-semibold block mb-0.5">Card Curvature Guidelines</strong>
              Consistent corner presets help establish proper content hierarchy. Standardized wrapper modules employ symmetric <code className="text-xs bg-black/5 px-1 rounded font-mono font-bold">rounded-2xl</code> curves to preserve clean, nested interfaces, while premium landing segments leverage dynamic asymmetric strokes.
            </div>
          </div>
        </section>

      </div>

      {/* Audit Meta Footer */}
      <div className="mt-14 pt-8 border-t border-black/5 flex justify-between items-center flex-wrap gap-4 text-[0.84rem] text-slate-500">
        <span className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[var(--color-thread-mid-green)]" />
          Active Threadline Style Guide · Dynamic stylesheet verification
        </span>
        <ActionLink
          onClick={() => onPageChange("settings")}
          variant="default"
          as="button"
        >
          Return to Settings page
        </ActionLink>
      </div>
    </motion.div>
  );
}
