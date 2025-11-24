

"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  LogOut,
  Home,
  X,
  Compass,
  MessageSquare
} from 'lucide-react';
import { Language, Role } from '../types';
import { TRANSLATIONS } from '../translations';
import { useRouter, usePathname } from './RouterMock';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  userRole: Role;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, lang, userRole }) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = TRANSLATIONS[lang].nav;

  // Define menu items with allowed roles
  const menuItems = [
    { href: '/', label: t.home, icon: Home, roles: ['Admin', 'User'] },
    // Only Admin can see Dashboard Stats
    { href: '/dashboard', label: t.dashboard, icon: LayoutDashboard, roles: ['Admin'] },
    // Explore is for everyone
    { href: '/explore', label: "Explore Courses", icon: Compass, roles: ['Admin', 'User'] },
    { href: '/my-courses', label: TRANSLATIONS[lang].menu.myCourses, icon: BookOpen, roles: ['User'] }, 
    // Blog
    { href: '/blog', label: t.blog, icon: MessageSquare, roles: ['Admin', 'User'] },
    
    { href: '/students', label: t.students, icon: Users, roles: ['Admin'] },
    { href: '/courses', label: t.courses, icon: BookOpen, roles: ['Admin'] }, 
    { href: '/mentors', label: t.mentors, icon: GraduationCap, roles: ['Admin'] },
    { href: '/admin', label: t.admin, icon: ShieldCheck, roles: ['Admin'] },
  ];

  // Filter items based on current role
  const visibleItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity" 
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`w-72 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-8 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 relative drop-shadow-lg">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M50 98C20 82 10 55 10 30V12L50 2L90 12V30C90 55 80 82 50 98Z" className="fill-indigo-600" stroke="white" strokeWidth="2"/>
                <path d="M50 98C20 82 10 55 10 30V12L50 2" className="fill-black/10" />
                <path d="M30 40C30 40 40 43 50 40C60 43 70 40 70 40V65C70 65 60 68 50 65C40 68 30 65 30 65V40Z" fill="white" />
                <path d="M50 40V65" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
                <text x="50" y="85" fontFamily="serif" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle" letterSpacing="2">THK</text>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight font-serif">THK</h1>
              <p className="text-[10px] text-indigo-300 uppercase tracking-widest">Academy</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href);
                  onClose(); 
                }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <span className="font-medium text-lg">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="mb-4 px-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Role</span>
            <div className="flex items-center gap-2 mt-1">
               <span className={`inline-block w-2 h-2 rounded-full ${userRole === 'Admin' ? 'bg-red-500' : 'bg-green-500'}`}></span>
               <span className="text-sm font-medium text-white">{userRole}</span>
            </div>
          </div>
          <button className="w-full flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-colors">
            <LogOut className="w-6 h-6" />
            <span className="font-medium text-lg">{t.signOut}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;