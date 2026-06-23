import { motion } from "motion/react";
import { Plus, Check, ChevronRight } from "lucide-react";
import { Child } from "../types";
import { cn } from "../lib/utils";
import { useState } from "react";
import { Input } from "./ui/Input";

interface SettingsPageProps {
  onPageChange: (page: any) => void;
  currentChild: Child;
  childrenList: Child[];
  onChildChange: (child: Child) => void;
  onAddChildRequest: () => void;
}

export default function SettingsPage({
  onPageChange,
  currentChild,
  childrenList,
  onChildChange,
  onAddChildRequest,
}: SettingsPageProps) {
  const [nickname, setNickname] = useState("Sarah");
  const [email, setEmail] = useState("sarah@example.com");
  const [receiveNotifications, setReceiveNotifications] = useState(true);

  const getNextReview = (name: string) => {
    if (name === "Maya") return "12 September";
    if (name === "Liam") return "18 October";
    if (name === "Sophia") return "24 September";
    return "12 September";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-[800px] mx-auto pt-16 px-11 pb-24 max-md:px-5"
    >
      <div className="mb-24">
        <span className="text-[0.66rem] tracking-[0.2em] uppercase text-slate-500 font-semibold mb-3 block">
          Account & Workspace Configs
        </span>
        <h1 className="font-semibold text-[2rem] leading-tight tracking-tight mb-3">
          Settings
        </h1>
        <p className="text-[1.05rem] text-slate-500 max-w-[50ch]">
          Manage active profiles, family access settings, clinical workspace
          credentials, and UI configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-x-12 gap-y-12 mb-16 border-b border-black/10 pb-16">
        <div>
          <h2 className="text-[1.1rem] font-semibold text-slate-900 tracking-tight">
            Parent Metadata
          </h2>
          <p className="text-[0.9rem] text-slate-500 mt-2 leading-relaxed">
            Update your contact details and how you'd like to be addressed in
            the application.
          </p>
        </div>
        <div className="bg-white rounded-tr-[36px] p-8 shadow-premium-light">
          <div className="mb-6">
            <label className="text-[0.66rem] tracking-[0.16em] uppercase text-slate-500 font-bold mb-2.5 block">
              Primary Parent Nickname
            </label>
            <Input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="mb-8" id="notification-settings-section">
            <label className="text-[0.66rem] tracking-[0.16em] uppercase text-slate-500 font-bold mb-2.5 block">
              Contact Notification Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <div className="flex items-center justify-between py-2 border-t border-black/5 mt-6 mb-2">
              <span className="text-[0.85rem] text-slate-700 font-medium">
                Receive email notifications
              </span>
              <button
                onClick={() => setReceiveNotifications(!receiveNotifications)}
                className={cn(
                  "w-[42px] h-[24px] rounded-full transition-colors relative cursor-pointer",
                  receiveNotifications ? "bg-[var(--color-thread-mid-green)]" : "bg-black/10",
                )}
              >
                <div
                  className={cn(
                    "w-[18px] h-[18px] bg-white rounded-full absolute top-[3px] transition-all shadow-sm",
                    receiveNotifications ? "left-[21px]" : "left-[3px]",
                  )}
                />
              </button>
            </div>

            <div className="flex justify-start pt-2 pb-1">
              <button className="text-[0.84rem] font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                Manage notification preferences
              </button>
            </div>
          </div>
          <button className="bg-slate-900 text-white text-[0.9rem] font-semibold px-6 py-3 rounded-full hover:bg-slate-800 transition-colors">
            Save Parent Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-x-12 gap-y-12">
        <div>
          <h2 className="text-[1.1rem] font-semibold text-slate-900 tracking-tight">
            Registered Children Profiles
          </h2>
          <p className="text-[0.9rem] text-slate-500 mt-2 leading-relaxed">
            Manage the children in your workspace. Switch between active
            profiles to view their specific timelines and resources.
          </p>
        </div>
        <div>
          <button
            onClick={onAddChildRequest}
            className="flex items-center gap-2.5 mb-6 text-slate-600 hover:text-slate-900 font-medium text-[0.9rem] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-black/20 bg-white transition-colors">
              <Plus className="w-4 h-4 stroke-[2]" />
            </div>
            Add new child profile
          </button>

          <div className="space-y-4">
            {childrenList.map((child, i) => {
              const isActive = currentChild.name === child.name;
              const cornerClasses = [
                "rounded-tl-[32px]",
                "rounded-tr-[32px]",
                "rounded-br-[32px]",
                "rounded-bl-[32px]",
              ];
              const cornerClass = cornerClasses[i % cornerClasses.length];

              return (
                <div
                  key={child.name}
                  className={cn(
                    "bg-white p-6 transition-all flex items-center justify-between gap-6",
                    isActive
                      ? "shadow-sm shadow-[var(--color-thread-mid-green)]/20"
                      : "shadow-premium-light hover:shadow-md",
                    cornerClass,
                  )}
                >
                  <div className="flex items-center gap-4.5">
                    <div className="w-[46px] h-[46px] rounded-full bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)] flex items-center justify-center font-semibold text-[1.2rem] font-serif flex-shrink-0">
                      {child.initial}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[1.1rem] text-slate-900 tracking-tight">
                        {child.name}
                      </h3>
                      <p className="text-[0.84rem] text-slate-500 mt-0.5">
                        Age {child.age} · Next Review on{" "}
                        {getNextReview(child.name)}
                      </p>
                    </div>
                  </div>

                  {isActive ? (
                    <div className="flex items-center gap-2 text-[var(--color-thread-mid-green)] bg-[var(--color-thread-light-green)]/40 px-3.5 py-1.5 rounded-full">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span className="text-[0.74rem] font-bold tracking-wide uppercase">
                        Currently Active
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onChildChange(child)}
                      className="text-[0.84rem] font-semibold text-slate-600 hover:text-slate-900 bg-[var(--color-thread-off-white)] hover:bg-[var(--color-thread-light-green)] border border-black/5 px-4 py-2 rounded-full transition-colors whitespace-nowrap"
                    >
                      Switch Active
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Style Guide Audit Block */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-x-12 gap-y-12 mt-16 border-t border-black/10 pt-16">
        <div>
          <h2 className="text-[1.1rem] font-semibold text-slate-900 tracking-tight">
            Design Tokens & Styles
          </h2>
          <p className="text-[0.9rem] text-slate-500 mt-2 leading-relaxed">
            Audit the fully scanned application color codes, typography hierarchy scales, 
            micro-components, and container layout rules in an interactive style guide.
          </p>
        </div>
        <div>
          <div className="bg-white p-6 rounded-tr-[36px] shadow-premium-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-[1.1rem] text-slate-900 tracking-tight">
                Scanned Style Guide
              </h3>
              <p className="text-[0.84rem] text-slate-500 mt-0.5">
                Fonts, interactive buttons, border shapes, and hex palettes.
              </p>
            </div>
            <button
              onClick={() => onPageChange("style-guide")}
              className="text-[0.84rem] font-semibold text-[var(--color-thread-mid-green)] hover:text-white bg-[var(--color-thread-light-green)] hover:bg-[var(--color-thread-mid-green)] px-5 py-2.5 rounded-full transition-all whitespace-nowrap inline-flex items-center gap-1.5 shadow-sm"
            >
              Open Design Guide <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
