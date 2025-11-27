
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ViewState } from '../types';

// Map URL paths to internal ViewState
const PATH_MAP: Record<string, ViewState> = {
  '/': 'home',
  '/dashboard': 'dashboard',
  '/students': 'students',
  '/courses': 'courses',
  '/explore': 'explore',
  '/mentors': 'mentors',
  '/admin': 'admin',
  '/profile': 'user-profile',
  '/settings': 'user-settings',
  '/my-courses': 'my-courses',
  '/apply-to-teach': 'apply-to-teach',
  '/blog': 'blog',
  '/course-details': 'course-details', // New Route
};

// Reverse map for usePathname
const VIEW_TO_PATH: Record<ViewState, string> = Object.entries(PATH_MAP).reduce((acc, [path, view]) => {
  acc[view] = path;
  return acc;
}, {} as Record<ViewState, string>);

interface RouterContextType {
  currentView: ViewState;
  push: (href: string) => void;
  pathname: string;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: ReactNode; initialView?: ViewState }> = ({ children, initialView = 'home' }) => {
  const [currentView, setCurrentView] = useState<ViewState>(initialView);

  const push = (href: string) => {
    const view = PATH_MAP[href];
    if (view) {
      setCurrentView(view);
      window.location.hash = href; 
    } else {
      console.warn(`No route found for: ${href}`);
    }
  };

  const pathname = VIEW_TO_PATH[currentView] || '/';

  return (
    <RouterContext.Provider value={{ currentView, push, pathname }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return { push: context.push };
};

export const usePathname = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('usePathname must be used within a RouterProvider');
  }
  return context.pathname;
};

export const useCurrentView = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useCurrentView must be used within a RouterProvider');
  }
  return context.currentView;
};