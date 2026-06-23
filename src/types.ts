export type Page = 'home' | 'understanding' | 'priorities' | 'roadmap' | 'reviews' | 'resources' | 'documents' | 'settings' | 'emerging-details' | 'all-children' | 'style-guide';

export interface Child {
  name: string;
  age: number;
  initial: string;
}

export interface Priority {
  tag: 'Now' | 'Next' | 'Later';
  name: string;
  meta: string;
  why: string;
  impact?: 'High' | 'Moderate' | 'Low';
  risk?: string;
  burden?: string;
  capacity?: string;
  progress?: number;
  dependencies?: string;
}

export interface Strategy {
  title: string;
  icon: 'school' | 'home';
  items: string[];
}

export interface Resource {
  category: string;
  title: string;
  description: string;
  readTime: string;
}

export interface DocFile {
  name: string;
  type: string;
  date: string;
  shared: boolean;
  sharedWith?: string;
}
