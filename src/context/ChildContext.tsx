import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Child } from '../types';

interface ChildContextType {
  childrenList: Child[];
  currentChild: Child;
  setChild: (child: Child) => void;
  addChild: (child: Child) => void;
  updateChild: (child: Child) => void;
}

const INITIAL_CHILDREN: Child[] = [
  { name: 'Maya', age: 9, initial: 'M' },
  { name: 'Liam', age: 6, initial: 'L' },
  { name: 'Sophia', age: 12, initial: 'S' }
];

const CHILDREN_STORAGE_KEY = 'threadline-children';
const CURRENT_CHILD_STORAGE_KEY = 'threadline-current-child';

function readStoredChildren() {
  try {
    const stored = localStorage.getItem(CHILDREN_STORAGE_KEY);
    if (!stored) return INITIAL_CHILDREN;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CHILDREN;
  } catch {
    return INITIAL_CHILDREN;
  }
}

function readStoredCurrentChild(children: Child[]) {
  try {
    const storedName = localStorage.getItem(CURRENT_CHILD_STORAGE_KEY);
    return children.find((child) => child.name === storedName) || children[0];
  } catch {
    return children[0];
  }
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export function ChildProvider({ children }: { children: ReactNode }) {
  const [childrenList, setChildrenList] = useState<Child[]>(readStoredChildren);
  const [currentChild, setCurrentChild] = useState<Child>(() => readStoredCurrentChild(readStoredChildren()));

  useEffect(() => {
    try {
      localStorage.setItem(CHILDREN_STORAGE_KEY, JSON.stringify(childrenList));
      localStorage.setItem(CURRENT_CHILD_STORAGE_KEY, currentChild.name);
    } catch {
      // Storage can be unavailable in restricted contexts; in-memory state still works.
    }
  }, [childrenList, currentChild.name]);

  const setChild = useCallback((child: Child) => {
    setCurrentChild(child);
  }, []);

  const addChild = useCallback((child: Child) => {
    setChildrenList((prev) => [...prev, child]);
    setCurrentChild(child);
  }, []);

  const updateChild = useCallback((child: Child) => {
    setChildrenList((prev) => prev.map((item) => item.name === currentChild.name || item.name === child.name ? child : item));
    setCurrentChild(child);
  }, [currentChild.name]);

  const value = React.useMemo(() => ({
    childrenList,
    currentChild,
    setChild,
    addChild,
    updateChild
  }), [childrenList, currentChild, setChild, addChild, updateChild]);

  return (
    <ChildContext.Provider value={value}>
      {children}
    </ChildContext.Provider>
  );
}

export function useCurrentChild() {
  const context = useContext(ChildContext);
  if (context === undefined) {
    throw new Error('useCurrentChild must be used within a ChildProvider');
  }
  return context;
}
