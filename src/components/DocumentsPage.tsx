import { motion } from "motion/react";
import {
  Search,
  ChevronRight,
  Lock,
  Users,
  Upload,
  FileText,
  Folder,
  Camera,
  Activity,
  Check,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useState, useMemo } from "react";
import { PageIcon } from "./ui/PageIcon";
import { ActionLink } from "./ui/ActionLink";
import { FadeInScroll } from "./ui/FadeInScroll";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

const INITIAL_FILES = [
  {
    typeId: "report",
    typeName: "Report",
    name: "Actionable Clarity Report",
    date: "8 Jun 2026",
    shared: false,
    icon: FileText,
  },
  {
    typeId: "schoolpack",
    typeName: "School Pack",
    name: "School Clarity Pack",
    date: "8 Jun 2026",
    shared: true,
    sharedWith: "Homeroom Teacher",
    icon: Folder,
  },
  {
    typeId: "school",
    typeName: "School",
    name: "Teacher Meeting Preparation Notes",
    date: "10 Jun 2026",
    shared: false,
    icon: Camera,
  },
  {
    typeId: "clinical",
    typeName: "Clinical",
    name: "Parent Observations Log — Sleep Prep",
    date: "12 Jun 2026",
    shared: true,
    sharedWith: "Dr. Sarah Vance",
    icon: Activity,
  },
  {
    typeId: "report",
    typeName: "Report",
    name: "Progress Review — Early Baseline",
    date: "15 Jun 2026",
    shared: false,
    icon: FileText,
  },
];

import { Child } from "../types";

export default function DocumentsPage({ currentChild }: { currentChild: Child }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [files, setFiles] = useState(INITIAL_FILES);

  const filteredFiles = useMemo(() => {
    return files.filter((f) => {
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" || f.typeId === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter, files]);

  const toggleShare = (index: number) => {
    const newFiles = [...files];
    const file = newFiles[index];
    if (file.shared) {
      file.shared = false;
      file.sharedWith = undefined;
    } else {
      file.shared = true;
      file.sharedWith = "your care circle";
    }
    setFiles(newFiles);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1000px] mx-auto pt-16 px-11 pb-16 max-md:px-5"
    >
      <div className="mb-24">
        <span className="text-[0.66rem] tracking-[0.2em] uppercase text-slate-500 font-semibold mb-6 block">
          AES-256 secure storage
        </span>
        <h1 className="font-semibold text-4xl tracking-tighter leading-[1.08] max-w-[16ch]">
          Documents locker.
        </h1>
        <p className="text-[1.05rem] text-slate-500 leading-relaxed max-w-[58ch] mt-8">
          Store, view and share every clinical report, school summary and parent
          note — in one secure place, shared only when you choose.
        </p>
        <div className="flex gap-4.5 mt-6 text-[0.82rem] text-slate-500 flex-wrap">
          <span className="flex items-center gap-2">
            <Lock className="w-[15px] h-[15px] stroke-[1.8] text-[var(--color-thread-mid-green)]" />{" "}
            End-to-end encrypted · AES-256
          </span>
          <span className="flex items-center gap-2">
            <Users className="w-[15px] h-[15px] stroke-[1.8] text-[var(--color-thread-mid-green)]" />{" "}
            Active child · {currentChild.name}
          </span>
        </div>
      </div>

      {/* Upload Section */}
      <FadeInScroll className="mb-24">
        <div className="bg-watercolor rounded-br-[36px] p-7.5">
          <div className="bg-white rounded-bl-[32px] p-7.5 shadow-premium">
            <div className="mb-5.5">
              <span className="text-[0.66rem] tracking-[0.2em] uppercase text-slate-500 font-semibold mb-2.5 block text-uppercase text-slate-400">
                Add to locker
              </span>
              <h2 className="font-semibold text-[1.4rem] tracking-tight">
                Add a custom document or tracker log.
              </h2>
            </div>
            <p className="text-[0.94rem] text-slate-500 leading-relaxed mb-6">
              Prepare and encrypt clinical paperwork, homework energy logs or
              letters manually.
            </p>
            <div className="mt-3.5 border-1.5 border-dashed border-black/10 rounded-tr-[24px] p-10 text-center bg-[var(--color-thread-light-green)]/30 cursor-pointer hover:border-[var(--color-thread-mid-green)] hover:bg-[var(--color-thread-light-green)]/50 transition-all group">
              <PageIcon variant="white" icon={<Upload className="w-[22px] h-[22px] stroke-[1.7]" />} className="mx-auto" />
              <div className="text-[1rem] font-semibold tracking-tight text-slate-900">
                Drag and drop a file here, or click to upload manually
              </div>
              <div className="text-[0.82rem] text-slate-500 mt-1.75">
                PDF, DOC, DOCX, XLS or PNG. Max size 25MB.
              </div>
            </div>
          </div>
        </div>
      </FadeInScroll>

      {/* Files Section */}
      <FadeInScroll className="mb-24">
        <div className="mb-5.5">
          <span className="text-[0.66rem] tracking-[0.2em] uppercase text-slate-500 font-semibold mb-2.5 block text-uppercase">
            {currentChild.name}'s documents
          </span>
          <h2 className="font-semibold text-[1.4rem] tracking-tight">
            Everything in one place.
          </h2>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-slate-400 stroke-[1.8]" />
          <Input
            type="text"
            placeholder="Search documents…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="search"
          />
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          <FilterTab
            active={filter === "all"}
            label="All files"
            onClick={() => setFilter("all")}
          />
          <FilterTab
            active={filter === "report"}
            label="Report"
            onClick={() => setFilter("report")}
          />
          <FilterTab
            active={filter === "schoolpack"}
            label="School Pack"
            onClick={() => setFilter("schoolpack")}
          />
          <FilterTab
            active={filter === "school"}
            label="School"
            onClick={() => setFilter("school")}
          />
          <FilterTab
            active={filter === "clinical"}
            label="Clinical"
            onClick={() => setFilter("clinical")}
          />
        </div>

        <span className="text-[0.66rem] tracking-[0.16em] uppercase text-slate-400 font-semibold mb-4 mt-6 block">
          {filteredFiles.length} {filteredFiles.length === 1 ? "file" : "files"}{" "}
          · sorted by clinical document type
        </span>

        {filteredFiles.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filteredFiles.map((file, i) => {
              const cornerClasses = [
                "rounded-tr-[20px]",
                "rounded-tl-[20px]",
                "rounded-br-[20px]",
                "rounded-bl-[20px]",
              ];
              const cornerClass = cornerClasses[i % cornerClasses.length];
              return (
                <FileItem
                  key={file.name}
                  {...file}
                  onToggleShare={() => toggleShare(files.indexOf(file))}
                  cornerClass={cornerClass}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-black/10 rounded-2xl text-slate-500">
            No documents match your search.
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

      {/* Education & Advocacy Section */}
      <FadeInScroll className="mb-24">
        <div className="mb-5.5">
          <span className="text-[0.66rem] tracking-[0.2em] uppercase text-slate-500 font-semibold mb-2.5 block text-uppercase">
            Education & Advocacy
          </span>
          <h2 className="font-semibold text-[1.4rem] tracking-tight">
            About {currentChild.name}'s files cupboard
          </h2>
        </div>

        <div className="bg-white rounded-none rounded-tr-[36px] p-7.5 overflow-hidden relative">
          <p className="text-[0.98rem] text-slate-500 leading-relaxed max-w-[64ch] mb-8 relative z-10">
            Clinical descriptions are frequently heavy and trigger unnecessary
            parenting alarmism. Threadline's summaries and Packs translation
            translate heavy raw medical reports into active school checklists.
          </p>

          <div className="flex flex-col gap-6 relative z-10">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-thread-mid-green)] text-white flex items-center justify-center mt-0.5">
                <Check className="w-[13px] h-[13px] stroke-[3]" />
              </div>
              <div>
                <h4 className="text-[1.05rem] font-bold tracking-tight text-slate-900">
                  Clinical Grade
                </h4>
                <p className="text-[0.9rem] text-slate-500 mt-1">
                  All documents are timestamped and clinical summaries are
                  clinically verified.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-thread-mid-green)] text-white flex items-center justify-center mt-0.5">
                <Check className="w-[13px] h-[13px] stroke-[3]" />
              </div>
              <div>
                <h4 className="text-[1.05rem] font-bold tracking-tight text-slate-900">
                  100% Private
                </h4>
                <p className="text-[0.9rem] text-slate-500 mt-1">
                  Your records are securely encrypted and can never be traded
                  with insurers.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-thread-mid-green)] text-white flex items-center justify-center mt-0.5">
                <Check className="w-[13px] h-[13px] stroke-[3]" />
              </div>
              <div>
                <h4 className="text-[1.05rem] font-bold tracking-tight text-slate-900">
                  School Packs
                </h4>
                <p className="text-[0.9rem] text-slate-500 mt-1">
                  Dynamic sheets focus strictly on school energy needs to help
                  homeroom teachers integrate accommodations easily.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-thread-mid-green)] text-white flex items-center justify-center mt-0.5">
                <Check className="w-[13px] h-[13px] stroke-[3]" />
              </div>
              <div>
                <h4 className="text-[1.05rem] font-bold tracking-tight text-slate-900">
                  Doctor Connection
                </h4>
                <p className="text-[0.9rem] text-slate-500 mt-1">
                  Let clinical associates view parent evening logs instantly.
                </p>
              </div>
            </div>
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

function FileItem({
  name,
  typeName,
  date,
  shared,
  sharedWith,
  icon: Icon,
  onToggleShare,
  cornerClass = "rounded-2xl",
}: any) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 bg-white p-4.5 transition-all hover:shadow-md group",
        cornerClass,
      )}
    >
      <div className="w-[42px] h-[42px] rounded-xl bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)] flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 stroke-[1.7]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[1.04rem] font-bold tracking-tight truncate">
          {name}
        </div>
        <div className="flex items-center gap-3 mt-1.25">
          <span className="text-[0.56rem] tracking-[0.12em] uppercase font-bold text-[var(--color-thread-mid-green)] bg-[var(--color-thread-light-green)] rounded-full px-2.25 py-0.75">
            {typeName}
          </span>
          <span className="text-[0.78rem] text-slate-400 font-medium">
            {date}
          </span>
        </div>
        <div
          className={cn(
            "text-[0.8rem] mt-2 flex items-center gap-1.75",
            shared ? "text-[var(--color-thread-mid-green)] font-medium" : "text-slate-400",
          )}
        >
          {shared && (
            <div className="w-[7px] h-[7px] rounded-full bg-[var(--color-thread-mid-green)]" />
          )}
          {shared ? `Shared with ${sharedWith}` : "Not shared yet"}
        </div>
      </div>
      <Button
        onClick={onToggleShare}
        variant="muted"
        className="flex-shrink-0 text-[0.82rem]"
      >
        {shared ? "Make private" : "Share with care circle"}
      </Button>
    </div>
  );
}
