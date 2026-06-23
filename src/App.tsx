/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Page, Child } from './types';
import DashboardLayout from './components/DashboardLayout';
import HomePage from './components/HomePage';
import UnderstandingPage from './components/UnderstandingPage';
import PrioritiesPage from './components/PrioritiesPage';
import RoadmapPage from './components/RoadmapPage';
import ReviewsPage from './components/ReviewsPage';
import ResourcesPage from './components/ResourcesPage';
import DocumentsPage from './components/DocumentsPage';
import SettingsPage from './components/SettingsPage';
import EmergingDetailsPage from './components/EmergingDetailsPage';
import AllChildrenPage from './components/AllChildrenPage';
import StyleGuidePage from './components/StyleGuidePage';

const INITIAL_CHILDREN: Child[] = [
  { name: 'Maya', age: 9, initial: 'M' },
  { name: 'Liam', age: 6, initial: 'L' },
  { name: 'Sophia', age: 12, initial: 'S' }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('all-children');
  const [childrenList, setChildrenList] = useState<Child[]>(INITIAL_CHILDREN);
  const [currentChild, setCurrentChild] = useState<Child>(INITIAL_CHILDREN[0]);
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);

  // Initialize themes safely from localStorage or fallback
  useEffect(() => {
    let savedTheme = 'energetic';
    let savedFont = 'modern-serif';
    let savedHeroStyle = 'white';
    let savedSecondaryStyle = 'light';
    
    try {
      savedTheme = localStorage.getItem('thread-theme') || 'energetic';
      savedFont = localStorage.getItem('thread-font') || 'modern-serif';
      savedHeroStyle = localStorage.getItem('thread-hero-style') || 'white';
      savedSecondaryStyle = localStorage.getItem('thread-secondary-style') || 'light';
    } catch (e) {
      console.warn("Storage access is blocked or restricted:", e);
    }

    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-font', savedFont);
    document.documentElement.setAttribute('data-hero-style', savedHeroStyle);
    document.documentElement.setAttribute('data-hero-secondary', savedSecondaryStyle);
  }, []);

  const handleAddChild = (child: Child) => {
    setChildrenList(prev => [...prev, child]);
    setCurrentChild(child); // Switch to the new child automatically
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} currentChild={currentChild} />;
      case 'understanding':
        return <UnderstandingPage onPageChange={setCurrentPage} currentChild={currentChild} />;
      case 'priorities':
        return <PrioritiesPage onPageChange={setCurrentPage} currentChild={currentChild} />;
      case 'roadmap':
        return <RoadmapPage onPageChange={setCurrentPage} currentChild={currentChild} />;
      case 'reviews':
        return <ReviewsPage onPageChange={setCurrentPage} currentChild={currentChild} />;
      case 'resources':
        return <ResourcesPage currentChild={currentChild} />;
      case 'documents':
        return <DocumentsPage currentChild={currentChild} />;
      case 'settings':
        return <SettingsPage 
          onPageChange={setCurrentPage} 
          currentChild={currentChild} 
          childrenList={childrenList} 
          onChildChange={setCurrentChild} 
          onAddChildRequest={() => setIsAddChildModalOpen(true)}
        />;
      case 'emerging-details':
        return <EmergingDetailsPage onPageChange={setCurrentPage} currentChild={currentChild} />;
      case 'all-children':
        return <AllChildrenPage 
          onPageChange={setCurrentPage} 
          childrenList={childrenList} 
          onChildChange={setCurrentChild} 
        />;
      case 'style-guide':
        return <StyleGuidePage onPageChange={setCurrentPage} />;
      default:
        return <AllChildrenPage 
          onPageChange={setCurrentPage} 
          childrenList={childrenList} 
          onChildChange={setCurrentChild} 
        />;
    }
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      currentChild={currentChild}
      childrenList={childrenList}
      onChildChange={setCurrentChild}
      isAddChildModalOpen={isAddChildModalOpen}
      onAddChildRequest={() => setIsAddChildModalOpen(true)}
      onCloseAddChildModal={() => setIsAddChildModalOpen(false)}
      onAddChild={handleAddChild}
    >
      {renderPage()}
    </DashboardLayout>
  );
}
