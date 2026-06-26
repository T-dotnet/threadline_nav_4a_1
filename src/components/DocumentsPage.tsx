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
import { useCallback } from "react";
import { PageHeader } from "./ui/PageHeader";
import { SectionTitle } from "./ui/SectionTitle";
import { SectionLabel } from "./ui/SectionLabel";
import { SectionDescription } from "./ui/SectionDescription";
import { PageIcon } from "./ui/PageIcon";
import { ActionLink } from "./ui/ActionLink";
import { FadeInScroll } from "./ui/FadeInScroll";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { FilterTab } from "./ui/FilterTab";
import { FileItem } from "./ui/FileItem";
import { ChecklistItem } from "./ui/ChecklistItem";
import { PageContainer } from "./ui/PageContainer";
import { useCurrentChild } from "../context/ChildContext";
import { useLocker } from "../context/LockerContext";

export default function DocumentsPage() {
  const { currentChild } = useCurrentChild();
  const { search, setSearch, filter, setFilter, toggleShare, filteredFiles } = useLocker();
  const isNew = Boolean(currentChild.isNew);

  const handleClear = useCallback(() => {
    setSearch("");
    setFilter("all");
  }, [setSearch, setFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-16 pb-16"
    >
      <PageContainer>
        <PageHeader
        kicker="AES-256 secure storage"
        title="Documents locker."
        titleClassName="text-[2.2rem] xs:text-[2.6rem] sm:text-[3.2rem] md:text-[4rem] leading-[1.15] md:leading-[4.5rem] max-w-[16ch]"
        description={
          <>
            <SectionDescription>
              {isNew
                ? `Add reports, school notes, parent observations, or examples that may help the clinician prepare for ${currentChild.name}'s first assessment.`
                : "Store, view and share every clinical report, school summary and parent note — in one secure place, shared only when you choose."}
            </SectionDescription>
            <div className="flex gap-4 mt-6 text-[0.82rem] text-[var(--color-thread-gray)] flex-wrap">
              <span className="flex items-center gap-2">
                <Lock className="w-[15px] h-[15px] stroke-[1.8] text-[var(--color-thread-mid-green)]" />{" "}
                End-to-end encrypted · AES-256
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-[15px] h-[15px] stroke-[1.8] text-[var(--color-thread-mid-green)]" />{" "}
                Active child · {currentChild.name}
              </span>
            </div>
          </>
        }
        className="mb-24"
      />

      {/* Upload Section */}
      <FadeInScroll className="mb-24">
        <div className="bg-watercolor rounded-br-[36px] p-12">
          <div className="bg-white rounded-bl-[32px] p-7.5 shadow-premium">
            <div className="mb-8">
              <SectionLabel>
                ADD TO LOCKER
              </SectionLabel>
              <SectionTitle className="mb-0">
                {isNew ? "Add documents before assessment." : "Add a custom document or tracker log."}
              </SectionTitle>
            </div>
            <SectionDescription className="mb-10 max-w-[55ch]">
              {isNew
                ? "Upload anything useful now. The assessment pages will use reviewed context later, not unverified assumptions."
                : "Prepare and encrypt clinical paperwork, homework energy logs or letters manually."}
            </SectionDescription>
            <div className="mt-4 border-1.5 border-dashed border-black/10 rounded-tr-[24px] p-10 text-center bg-[var(--color-thread-light-green)]/30 cursor-pointer hover:border-[var(--color-thread-mid-green)] hover:bg-[var(--color-thread-light-green)]/50 transition-all group">
              <PageIcon variant="white" icon={<Upload className="w-[22px] h-[22px] stroke-[1.7]" />} className="mx-auto" />
              <div className="text-[1rem] font-medium tracking-tight text-slate-900">
                Drag and drop a file here, or click to upload manually
              </div>
              <div className="text-[0.82rem] text-slate-500 mt-2">
                PDF, DOC, DOCX, XLS or PNG. Max size 25MB.
              </div>
            </div>
          </div>
        </div>
      </FadeInScroll>

      {/* Files Section */}
      <FadeInScroll className="mb-24">
        <div className="mb-8">
          <SectionLabel>
            {currentChild.name.toUpperCase()}'S DOCUMENTS
          </SectionLabel>
          <SectionTitle className="mb-0">
            {isNew ? "Context ready for review." : "Everything in one place."}
          </SectionTitle>
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

        <span className="text-[0.66rem] tracking-[0.16em] uppercase text-slate-400 font-medium mb-4 mt-6 block">
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
                  onToggleShare={() => toggleShare(i)}
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
              onClick={handleClear}
              className="mt-3 block mx-auto font-medium"
            >
              Clear search
            </ActionLink>
          </div>
        )}
      </FadeInScroll>

      {/* Education & Advocacy Section */}
      <FadeInScroll className="mb-24">
        <div>
          <SectionLabel>
            Education & Advocacy
          </SectionLabel>
          <SectionTitle>
            {isNew ? `Preparing ${currentChild.name}'s first picture` : `About ${currentChild.name}'s files cupboard`}
          </SectionTitle>
        </div>

        <div className="bg-white rounded-none rounded-tr-[36px] p-7.5 overflow-hidden relative">
          <SectionDescription className="mb-8 relative z-10 max-w-[64ch]">
            {isNew
              ? "Before assessment, documents are treated as context for the clinician to review. They help form the first picture without turning early notes into conclusions."
              : "Clinical descriptions are frequently heavy and trigger unnecessary parenting alarmism. Threadline's summaries and Packs translation translate heavy raw medical reports into active school checklists."}
          </SectionDescription>

          <div className="flex flex-col gap-6 relative z-10">
            <ChecklistItem
              title={isNew ? "Clinician Context" : "Clinical Grade"}
              description={isNew ? "Uploaded files sit with the intake materials for review before and after the first session." : "All documents are timestamped and clinical summaries are clinically verified."}
            />
            <ChecklistItem
              title="100% Private"
              description="Your records are securely encrypted and can never be traded with insurers."
            />
            <ChecklistItem
              title={isNew ? "No Assumptions" : "School Packs"}
              description={isNew ? "The app will not turn uploaded files into priorities until the assessment is complete." : "Dynamic sheets focus strictly on school energy needs to help homeroom teachers integrate accommodations easily."}
            />
            <ChecklistItem
              title={isNew ? "Easy to Add Later" : "Doctor Connection"}
              description={isNew ? "You can keep adding school notes, reports, or examples as the picture develops." : "Let clinical associates view parent evening logs instantly."}
            />
          </div>
        </div>
      </FadeInScroll>
      </PageContainer>
    </motion.div>
  );
}
