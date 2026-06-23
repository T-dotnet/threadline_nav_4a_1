import { ReactNode, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import AddChildModal from "./AddChildModal";
import { Page, Child } from "../types";
import { AnimatePresence } from "motion/react";

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage: Page;
  onPageChange: (page: Page) => void;
  currentChild: Child;
  childrenList: Child[];
  onChildChange: (child: Child) => void;
  isAddChildModalOpen: boolean;
  onAddChildRequest: () => void;
  onCloseAddChildModal: () => void;
  onAddChild: (child: Child) => void;
}

export default function DashboardLayout({
  children,
  currentPage,
  onPageChange,
  currentChild,
  childrenList,
  onChildChange,
  isAddChildModalOpen,
  onAddChildRequest,
  onCloseAddChildModal,
  onAddChild,
}: DashboardLayoutProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [currentPage]);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-thread-off-white)] font-sans antialiased text-[var(--color-thread-darkest)]">
      <Sidebar currentPage={currentPage} onPageChange={onPageChange} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          currentPage={currentPage}
          currentChild={currentChild}
          childrenList={childrenList}
          onChildChange={onChildChange}
          onAddChildRequest={onAddChildRequest}
          onPageChange={onPageChange}
        />

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto scroll-smooth"
        >
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </div>
      </main>

      <AddChildModal
        isOpen={isAddChildModalOpen}
        onClose={onCloseAddChildModal}
        onAdd={onAddChild}
      />
    </div>
  );
}
