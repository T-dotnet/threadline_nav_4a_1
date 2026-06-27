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
  { id: 'child-maya', name: 'Maya', age: 9, initial: 'M' },
  { id: 'child-liam', name: 'Liam', age: 6, initial: 'L' },
  { id: 'child-sophia', name: 'Sophia', age: 12, initial: 'S' }
];

const CHILDREN_STORAGE_KEY = 'threadline-children';
const CURRENT_CHILD_STORAGE_KEY = 'threadline-current-child';

const CANONICAL_CHILDREN_BY_ID: Record<string, Child> = {
  'child-maya': INITIAL_CHILDREN[0],
  'child-liam': INITIAL_CHILDREN[1],
  'child-sophia': INITIAL_CHILDREN[2],
};

const LEGACY_CANONICAL_ID_ALIASES: Record<string, string> = {
  'child-maya-0': 'child-maya',
  'child-liam-1': 'child-liam',
  'child-sophia-2': 'child-sophia',
};

function createChildId() {
  return `child-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function childIdFor(child: Child, index: number) {
  if (!child.id && index === 0 && child.name === 'Maya') return 'child-maya';
  if (!child.id && index === 1 && child.name === 'Liam') return 'child-liam';
  if (!child.id && index === 2 && child.name === 'Sophia') return 'child-sophia';
  return child.id || `child-${child.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'profile'}-${index}`;
}

function normalizeChildren(children: Child[]) {
  return children.map((child, index) => {
    const id = LEGACY_CANONICAL_ID_ALIASES[childIdFor(child, index)] || childIdFor(child, index);
    const canonicalChild = CANONICAL_CHILDREN_BY_ID[id];
    return canonicalChild || {
      ...child,
      id,
    };
  });
}

function readStoredChildren() {
  try {
    const stored = localStorage.getItem(CHILDREN_STORAGE_KEY);
    if (!stored) return INITIAL_CHILDREN;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? normalizeChildren(parsed) : INITIAL_CHILDREN;
  } catch {
    return INITIAL_CHILDREN;
  }
}

function readStoredCurrentChild(children: Child[]) {
  try {
    const stored = localStorage.getItem(CURRENT_CHILD_STORAGE_KEY);
    const storedId = stored ? LEGACY_CANONICAL_ID_ALIASES[stored] || stored : stored;
    return children.find((child) => child.id === storedId || child.name === storedId) || children[0];
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
      localStorage.setItem(CURRENT_CHILD_STORAGE_KEY, currentChild.id || currentChild.name);
    } catch {
      // Storage can be unavailable in restricted contexts; in-memory state still works.
    }
  }, [childrenList, currentChild.id, currentChild.name]);

  const setChild = useCallback((child: Child) => {
    setCurrentChild(child);
  }, []);

  const addChild = useCallback((child: Child) => {
    const childWithId = { ...child, id: child.id || createChildId() };
    setChildrenList((prev) => [...prev, childWithId]);
    setCurrentChild(childWithId);
  }, []);

  const updateChild = useCallback((child: Child) => {
    const targetId = child.id || currentChild.id;
    const childWithId = { ...child, id: targetId || createChildId() };
    setChildrenList((prev) => prev.map((item) => {
      if (targetId) return item.id === targetId ? childWithId : item;
      return item === currentChild ? childWithId : item;
    }));
    setCurrentChild(childWithId);
  }, [currentChild]);

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
