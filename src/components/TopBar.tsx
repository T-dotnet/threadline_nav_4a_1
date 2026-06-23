import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Bell,
  Plus,
  Settings,
  LogOut,
  Sliders,
  Users,
  Palette,
} from "lucide-react";
import { Child } from "../types";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface TopBarProps {
  currentPage?: any;
  currentChild: Child;
  childrenList: Child[];
  onChildChange: (child: Child) => void;
  onAddChildRequest: () => void;
  onPageChange: (page: any) => void;
}

export default function TopBar({
  currentPage,
  currentChild,
  childrenList,
  onChildChange,
  onAddChildRequest,
  onPageChange,
}: TopBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const alertsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        alertsRef.current &&
        !alertsRef.current.contains(event.target as Node)
      ) {
        setIsAlertsOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-11 py-4.5 border-b border-black/5 bg-[var(--color-thread-off-white)] sticky top-0 z-10 max-md:px-5">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 bg-white rounded-full p-1.5 pr-2.5 cursor-pointer shadow-sm hover:shadow-md transition-all font-sans"
        >
          {currentPage === "all-children" ? (
            <>
              <div className="w-[30px] h-[30px] rounded-full bg-[var(--color-thread-mid-green)] text-white flex items-center justify-center font-semibold text-[0.82rem] transition-all">
                <Users className="w-3.5 h-3.5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="font-semibold text-[0.9rem] text-slate-900">
                  All Children
                </span>
                <span className="text-[0.68rem] text-slate-500 mt-0.5">
                  Family synthesis
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="w-[30px] h-[30px] rounded-full bg-[var(--color-thread-mid-green)] text-white flex items-center justify-center font-semibold text-[0.82rem] font-serif">
                {currentChild.initial}
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="font-semibold text-[0.9rem] text-slate-900">
                  {currentChild.name}
                </span>
                <span className="text-[0.72rem] text-slate-500 mt-0.5">
                  Age {currentChild.age}
                </span>
              </div>
            </>
          )}
          <ChevronDown
            className={cn(
              "w-[15px] h-[15px] text-slate-500 stroke-[2] ml-1 transition-transform duration-200",
              isDropdownOpen && "rotate-180",
            )}
          />
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-14 left-0 w-60 bg-white rounded-2xl border border-black/5 shadow-dropdown py-2 z-50 font-sans"
            >
              <div className="px-4 py-2.5">
                <span className="text-[0.6rem] tracking-[0.16em] uppercase text-slate-400 font-semibold">
                  Select Child Profile
                </span>
              </div>

              <div className="flex flex-col">
                <button
                  onClick={() => {
                    onPageChange("all-children");
                    setIsDropdownOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3.5 px-4 py-3 w-full text-left transition-all border-b border-black/5 group/all",
                    currentPage === "all-children"
                      ? "bg-slate-50"
                      : "hover:bg-slate-50"
                  )}
                  id="all-children-dropdown-option"
                >
                  <div className={cn(
                    "w-[34px] h-[34px] rounded-full flex items-center justify-center font-semibold text-[0.86rem] transition-all",
                    currentPage === "all-children"
                      ? "bg-[var(--color-thread-mid-green)] text-white"
                      : "bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)] group-hover/all:bg-[var(--color-thread-mid-green)] group-hover/all:text-white"
                  )}>
                    <Users className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className={cn(
                      "text-[0.92rem] tracking-tight font-semibold",
                      currentPage === "all-children"
                        ? "text-[var(--color-thread-mid-green)]"
                        : "text-[var(--color-thread-heading)]"
                    )}>
                      All Children Overview
                    </span>
                    <span className="text-[0.7rem] text-slate-500 mt-1">
                      Family synthesis & schemes
                    </span>
                  </div>
                </button>

                {childrenList.map((child, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onChildChange(child);
                      if (currentPage === "all-children") {
                        onPageChange("home");
                      }
                      setIsDropdownOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3.5 px-4 py-2.5 w-full text-left transition-colors",
                      (currentChild.name === child.name && currentPage !== "all-children")
                        ? "bg-slate-50"
                        : "hover:bg-slate-50",
                    )}
                  >
                    <div className="w-[34px] h-[34px] rounded-full bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)] flex items-center justify-center font-semibold text-[0.86rem] font-serif">
                      {child.initial}
                    </div>
                    <div className="flex flex-col leading-none">
                      <span
                        className={cn(
                          "text-[0.92rem] tracking-tight",
                          (currentChild.name === child.name && currentPage !== "all-children")
                            ? "font-semibold text-slate-900"
                            : "font-medium text-slate-700",
                        )}
                      >
                        {child.name}
                      </span>
                      <span className="text-[0.7rem] text-slate-500 mt-0.5">
                        Age {child.age}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="border-t border-black/5 mt-2 pt-2 px-2">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onAddChildRequest();
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 w-full text-left hover:bg-slate-50 rounded-xl transition-colors group"
                >
                  <div className="w-[28px] h-[28px] rounded-full border border-black/10 flex items-center justify-center text-slate-400 group-hover:text-slate-600 transition-colors">
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-[0.84rem] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                    Add child profile
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative" ref={alertsRef}>
          <button
            onClick={() => setIsAlertsOpen(!isAlertsOpen)}
            className="w-10.5 h-10.5 rounded-full bg-white border border-black/10 flex items-center justify-center text-slate-900 relative cursor-pointer hover:border-black/20 transition-all group"
          >
            <span className="absolute top-[10px] right-[11px] w-[7px] h-[7px] rounded-full bg-[var(--color-thread-mid-green)] border-2 border-white shadow-sm" />
            <Bell className="w-[19px] h-[19px] stroke-[1.8]" />
          </button>

          <AnimatePresence>
            {isAlertsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-14 right-0 w-[380px] bg-white rounded-[24px] border border-black/5 shadow-modal py-6 z-50 font-sans"
              >
                <div className="px-6 mb-5">
                  <span className="text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-thread-mid-green)] font-medium mb-1.5 block">
                    Live updates for {currentChild.name}
                  </span>
                  <h2 className="text-[1.05rem] font-semibold text-[var(--color-thread-dark-slate)] tracking-tight leading-none">
                    Development Alerts
                  </h2>
                </div>

                <div className="flex flex-col gap-3.5 px-6 mb-6 max-h-[340px] overflow-y-auto">
                  <div className="bg-white rounded-[16px] p-4.5 relative overflow-hidden shadow-sm hover:shadow-md transition-all group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-thread-mid-green)]" />
                    <h3 className="font-semibold text-[var(--color-thread-dark-slate)] text-[0.95rem] mb-1.5 tracking-tight group-hover:text-[var(--color-thread-mid-green)] transition-colors">
                      Sleep latency watch:
                    </h3>
                    <p className="text-[0.88rem] text-[var(--color-thread-gray)] leading-relaxed">
                      Mild circadian disruption detected. Recommended routine
                      alignment before reviews day.
                    </p>
                  </div>

                  <div className="bg-white rounded-[16px] p-4.5 relative overflow-hidden shadow-sm hover:shadow-md transition-all group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-thread-mid-green)]" />
                    <h3 className="font-semibold text-[var(--color-thread-dark-slate)] text-[0.95rem] mb-1.5 tracking-tight group-hover:text-[var(--color-thread-mid-green)] transition-colors">
                      Primary strategy completed:
                    </h3>
                    <p className="text-[0.88rem] text-[var(--color-thread-gray)] leading-relaxed">
                      Parent feedback form compiled & secure cloud-synced to
                      primary clinical therapist.
                    </p>
                  </div>
                </div>

                <div className="border-t border-black/5 px-6 pt-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsAlertsOpen(false)}
                      className="text-[0.84rem] font-semibold text-[var(--color-thread-gray)] hover:text-[var(--color-thread-dark-slate)] transition-colors"
                    >
                      Cleared all notices
                    </button>
                  </div>
                  <button className="text-[0.84rem] font-medium text-[var(--color-thread-gray)] hover:text-[var(--color-thread-mid-green)] transition-colors">
                    Refresh Logs
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="w-10.5 h-10.5 rounded-full bg-[var(--color-thread-mid-green)] text-white flex items-center justify-center font-semibold text-[0.86rem] font-serif cursor-pointer hover:opacity-90 transition-all shadow-sm"
          >
            S
          </button>

          <AnimatePresence>
            {isProfileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-14 right-0 w-64 bg-white rounded-2xl border border-black/5 shadow-dropdown py-2.5 z-50 font-sans"
              >
                <div className="px-4.5 py-2 mb-1.5 border-b border-black/5">
                  <span className="text-[0.65rem] tracking-[0.12em] uppercase text-slate-400 font-bold block mb-0.5">
                    Clinical Workspace
                  </span>
                  <span className="text-[0.80rem] font-medium text-slate-700 block truncate">
                    dnstudio.syd@gmail.com
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 px-1.5">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onPageChange("style-guide");
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left hover:bg-slate-50 transition-colors group"
                  >
                    <Palette className="w-[18px] h-[18px] text-slate-400 group-hover:text-[var(--color-thread-mid-green)] transition-colors" />
                    <span className="text-[0.90rem] font-medium text-slate-700 group-hover:text-slate-900">
                      Style & Design Tokens
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onPageChange("settings");
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left hover:bg-slate-50 transition-colors group"
                  >
                    <Settings className="w-[18px] h-[18px] text-slate-400 group-hover:text-slate-600 transition-colors" />
                    <span className="text-[0.90rem] font-medium text-slate-700 group-hover:text-slate-900">
                      App Settings
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onPageChange("settings");
                      setTimeout(() => {
                        const target = document.getElementById("notification-settings-section");
                        if (target) {
                          target.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }, 120);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left hover:bg-slate-50 transition-colors group"
                  >
                    <Bell className="w-[18px] h-[18px] text-slate-400 group-hover:text-amber-500 transition-colors" />
                    <span className="text-[0.90rem] font-medium text-slate-700 group-hover:text-slate-900">
                      Notification Settings
                    </span>
                  </button>

                  <div className="border-t border-black/5 my-1" />

                  <button 
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left hover:bg-red-50 transition-colors group"
                  >
                    <LogOut className="w-[18px] h-[18px] text-slate-400 group-hover:text-red-500 transition-colors" />
                    <span className="text-[0.90rem] font-medium text-slate-700 group-hover:text-red-600">
                      Log out
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
