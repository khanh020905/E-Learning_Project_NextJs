"use client";

import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudentManager from './components/StudentManager';
import CourseManager from './components/CourseManager';
import MentorManager from './components/MentorManager';
import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
import ProfileView from './components/ProfileView';
import SettingsView from './components/SettingsView';
import MyCoursesView from './components/MyCoursesView';
import ApplyToTeachView from './components/ApplyToTeachView';
import ExploreCoursesView from './components/ExploreCoursesView';
import BlogView from './components/BlogView';
import Auth from './components/Auth';
import ChatBot from './components/ChatBot';
import CourseFullView from './components/CourseFullView'; // Import new Full View
import { Language, Role, Course, Student, Mentor } from './types';
import { MOCK_COURSES, MOCK_STUDENTS, MOCK_MENTORS } from './constants'; 
import { Bell, Search, Menu, Book, User, Settings, Moon, Sun, LogOut, Globe, Repeat, GraduationCap, Users } from 'lucide-react';
import { TRANSLATIONS } from './translations';
import { RouterProvider, useRouter, useCurrentView, usePathname } from './components/RouterMock';

// --- Main Layout Component ---
const Layout: React.FC<{ 
  isAuthenticated: boolean; 
  onLogout: () => void;
  user: any;
  onUpdateUser: (u: any) => void;
  lang: Language;
  setLang: (l: Language) => void;
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
  enrolledCourseIds: string[];
  onEnroll: (id: string) => void;
  selectedCourse: Course | null;
  onViewCourse: (course: Course) => void;
}> = ({ 
  isAuthenticated, onLogout, user, onUpdateUser, lang, setLang, isDarkMode, setIsDarkMode, enrolledCourseIds, onEnroll, selectedCourse, onViewCourse
}) => {
  const router = useRouter();
  const currentView = useCurrentView();
  const pathname = usePathname();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{type: 'Course' | 'Student' | 'Mentor', data: any}[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Refs for click outside
  const notificationWrapperRef = useRef<HTMLDivElement>(null);
  const userMenuWrapperRef = useRef<HTMLDivElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  // Translations
  const t = TRANSLATIONS[lang].menu;

  // Mock Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome to THK Learning! 🎓", time: "Just now", read: false },
    { id: 2, text: "New course 'Advanced Python' added.", time: "2 hrs ago", read: false },
    { id: 3, text: "Your profile was successfully updated.", time: "1 day ago", read: true },
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationWrapperRef.current && !notificationWrapperRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuWrapperRef.current && !userMenuWrapperRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search Logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const results: {type: 'Course' | 'Student' | 'Mentor', data: any}[] = [];

    // Search Courses (Available to everyone)
    MOCK_COURSES.forEach(course => {
      if (course.title.toLowerCase().includes(lowerQuery) || course.category.toLowerCase().includes(lowerQuery)) {
        results.push({ type: 'Course', data: course });
      }
    });

    // Search Students & Mentors (Admin Only)
    if (user.role === 'Admin') {
      MOCK_STUDENTS.forEach(student => {
        if (student.name.toLowerCase().includes(lowerQuery) || student.email.toLowerCase().includes(lowerQuery)) {
          results.push({ type: 'Student', data: student });
        }
      });

      MOCK_MENTORS.forEach(mentor => {
        if (mentor.name.toLowerCase().includes(lowerQuery)) {
          results.push({ type: 'Mentor', data: mentor });
        }
      });
    }

    setSearchResults(results.slice(0, 6)); // Limit to 6 results
  }, [searchQuery, user.role]);

  const handleSearchResultClick = (result: {type: string, data: any}) => {
    setSearchQuery('');
    setIsSearchFocused(false);

    if (result.type === 'Course') {
      onViewCourse(result.data); // Navigate to Full Page Course View
    } else if (result.type === 'Student') {
      router.push('/students');
    } else if (result.type === 'Mentor') {
      router.push('/mentors');
    }
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'vi' : 'en');
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // --- Role Switching Logic (Next.js Style) ---
  const switchRole = (newRole: Role) => {
    // 1. Update the User State
    onUpdateUser({ ...user, role: newRole });
    setIsUserMenuOpen(false);

    // 2. Redirect logic if user loses access to current page
    // If switching to User, they shouldn't be on Admin pages
    if (newRole === 'User') {
       const adminRoutes = ['/students', '/courses', '/mentors', '/admin', '/dashboard'];
       if (adminRoutes.includes(pathname)) {
         router.push('/'); // Redirect to Home
       }
    }
  };

  // Render Content based on Route and Role
  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Home 
          lang={lang} 
          onEnroll={onEnroll}
          enrolledCourseIds={enrolledCourseIds}
          onViewCourse={onViewCourse}
        />;
      case 'dashboard':
        return user.role === 'Admin' ? <Dashboard lang={lang} /> : <div className="p-20 text-center text-slate-500">Access Denied: Admin Only</div>;
      case 'explore':
        return <ExploreCoursesView onEnroll={onEnroll} enrolledCourseIds={enrolledCourseIds} onViewCourse={onViewCourse} />;
      case 'course-details':
        return <CourseFullView course={selectedCourse} onEnroll={onEnroll} isEnrolled={selectedCourse ? enrolledCourseIds.includes(selectedCourse.id) : false} />;
      case 'students':
        return user.role === 'Admin' ? <StudentManager /> : <div className="p-20 text-center text-slate-500">Access Denied: Admin Only</div>;
      case 'courses':
        return user.role === 'Admin' ? <CourseManager /> : <div className="p-20 text-center text-slate-500">Access Denied: Admin Only</div>;
      case 'mentors':
        return user.role === 'Admin' ? <MentorManager /> : <div className="p-20 text-center text-slate-500">Access Denied: Admin Only</div>;
      case 'admin':
        return user.role === 'Admin' ? <AdminPanel /> : <div className="p-20 text-center text-slate-500">Access Denied: Admin Only</div>;
      case 'user-profile':
        return <ProfileView user={user} />;
      case 'user-settings':
        return <SettingsView currentUser={user} onUpdateUser={onUpdateUser} />;
      case 'my-courses':
        return <MyCoursesView enrolledCourseIds={enrolledCourseIds} />;
      case 'apply-to-teach':
        return <ApplyToTeachView />;
      case 'blog':
        return <BlogView user={user} />;
      default:
        return <Dashboard lang={lang} />;
    }
  };

  return (
    <div className={`flex min-h-screen font-sans ${isDarkMode ? 'dark bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        lang={lang}
        userRole={user.role}
      />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Header - Increased padding for bigger size */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-8">
          <div className="flex items-center justify-between max-w-7xl mx-auto relative">
            {/* Left Section: Menu & Logo */}
            <div className="flex items-center gap-4 md:gap-6 shrink-0 z-10">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                <Menu className="w-8 h-8 text-slate-600 dark:text-slate-300" />
              </button>
              
              {/* Clickable Logo Home Link - Increased Size */}
              <div 
                className="flex items-center gap-3 cursor-pointer group" 
                onClick={() => router.push('/')}
              >
                 <div className="w-12 h-12 relative">
                   <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md group-hover:scale-105 transition-transform">
                      <path d="M50 98C20 82 10 55 10 30V12L50 2L90 12V30C90 55 80 82 50 98Z" className="fill-indigo-600" stroke="white" strokeWidth="2"/>
                      <path d="M50 98C20 82 10 55 10 30V12L50 2" className="fill-black/10" />
                      <path d="M30 40C30 40 40 43 50 40C60 43 70 40 70 40V65C70 65 60 68 50 65C40 68 30 65 30 65V40Z" fill="white" />
                      <path d="M50 40V65" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
                   </svg>
                 </div>
                 <div className="hidden md:block">
                   <h1 className="text-2xl font-bold tracking-tight font-serif text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">THK</h1>
                 </div>
              </div>
            </div>

            {/* Center Section: Search Bar (Absolute Centered) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg justify-center z-20">
               <div className="relative w-full" ref={searchWrapperRef}>
                 <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl px-5 py-3 w-full focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-sm">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setIsSearchFocused(true); }}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder={user.role === 'Admin' ? "Search courses, students, mentors..." : "Search courses..."}
                    className="bg-transparent border-none outline-none text-base ml-3 w-full text-slate-900 dark:text-white placeholder-slate-500"
                  />
                </div>

                {/* Search Results Dropdown */}
                {isSearchFocused && searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {searchResults.length > 0 ? (
                      <ul>
                        {searchResults.map((result, index) => (
                          <li 
                            key={index}
                            onClick={() => handleSearchResultClick(result)}
                            className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-slate-50 dark:border-slate-700/50 last:border-none flex items-center gap-3"
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              result.type === 'Course' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' :
                              result.type === 'Student' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                              'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                            }`}>
                              {result.type === 'Course' && <Book className="w-4 h-4" />}
                              {result.type === 'Student' && <Users className="w-4 h-4" />}
                              {result.type === 'Mentor' && <GraduationCap className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                                {result.type === 'Course' ? result.data.title : result.data.name}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                                {result.type} {result.type === 'Course' && `• ${result.data.category}`}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-slate-500 dark:text-slate-400 text-sm">
                        No results found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
               </div>
            </div>

            {/* Right Section: Notifications & User */}
            <div className="flex items-center gap-3 md:gap-6 shrink-0 z-10">
              <div className="flex items-center gap-2 md:gap-4">
                {/* Notification Bell */}
                <div className="relative" ref={notificationWrapperRef}>
                  <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative transition-colors"
                  >
                    <Bell className="w-7 h-7 text-slate-600 dark:text-slate-300" />
                    {unreadCount > 0 && (
                      <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                    )}
                  </button>

                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                       <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                         <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                         <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline">Mark all read</span>
                       </div>
                       <div className="max-h-[300px] overflow-y-auto">
                          {notifications.length === 0 ? (
                             <div className="p-8 text-center text-slate-500 text-sm">No new notifications</div>
                          ) : (
                             notifications.map(n => (
                               <div key={n.id} onClick={() => markAsRead(n.id)} className={`p-4 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer transition-colors ${!n.read ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}>
                                  <div className="flex gap-3">
                                     <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!n.read ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
                                     <div>
                                        <p className={`text-sm ${!n.read ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{n.text}</p>
                                        <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                                     </div>
                                  </div>
                               </div>
                             ))
                          )}
                       </div>
                       <div className="p-3 bg-slate-50 dark:bg-slate-800/50 text-center border-t border-slate-100 dark:border-slate-700">
                          <button className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">View All History</button>
                       </div>
                    </div>
                  )}
                </div>

                {/* User Profile Dropdown */}
                <div className="relative" ref={userMenuWrapperRef}>
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <div className="text-right hidden md:block">
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1">{user.name}</p>
                      <div className="flex items-center justify-end gap-1">
                         <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'Admin' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                         <p className="text-xs text-slate-500 dark:text-slate-400 leading-none">{user.role}</p>
                      </div>
                    </div>
                    <img 
                      src={user.avatar}
                      alt="Profile" 
                      className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-700 shadow-sm object-cover"
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                      <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/20 md:hidden">
                         <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                         <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                      </div>
                      
                      <div className="p-2 space-y-1">
                        <button 
                          onClick={() => { router.push('/profile'); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4" />
                          {t.userInfo}
                        </button>
                        <button 
                           onClick={() => { router.push('/settings'); setIsUserMenuOpen(false); }}
                           className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          {t.modifyInfo}
                        </button>
                        <button 
                           onClick={() => { router.push('/my-courses'); setIsUserMenuOpen(false); }}
                           className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-colors"
                        >
                          <Book className="w-4 h-4" />
                          {t.myCourses}
                        </button>
                      </div>

                      <div className="border-t border-slate-100 dark:border-slate-700 p-2 space-y-1">
                        <button 
                          onClick={() => setIsDarkMode(!isDarkMode)}
                          className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                            {t.darkMode}
                          </div>
                          <div className={`w-10 h-5 rounded-full relative transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${isDarkMode ? 'left-6' : 'left-1'}`}></div>
                          </div>
                        </button>
                        
                        <button 
                          onClick={toggleLanguage}
                          className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
                        >
                          <div className="flex items-center gap-3">
                             <Globe className="w-4 h-4" />
                             {t.language}
                          </div>
                          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 rounded-lg p-1">
                             <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${lang === 'en' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-400'}`}>EN</span>
                             <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${lang === 'vi' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-400'}`}>VI</span>
                          </div>
                        </button>
                      </div>
                      
                      {/* Demo Controls: Role Switcher */}
                      <div className="border-t border-slate-100 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-900/50">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                             <Repeat className="w-3 h-3" /> Switch Role (Demo)
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                             <button 
                              onClick={() => switchRole('User')}
                              className={`px-3 py-2 text-xs font-bold rounded-lg border transition-all ${
                                user.role === 'User' 
                                ? 'bg-indigo-600 text-white border-indigo-600' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                              }`}
                             >
                               User
                             </button>
                             <button 
                              onClick={() => switchRole('Admin')}
                              className={`px-3 py-2 text-xs font-bold rounded-lg border transition-all ${
                                user.role === 'Admin' 
                                ? 'bg-indigo-600 text-white border-indigo-600' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                              }`}
                             >
                               Admin
                             </button>
                          </div>
                      </div>

                      <div className="border-t border-slate-100 dark:border-slate-700 p-2">
                        <button 
                          onClick={onLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          {t.logOut}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 scroll-smooth">
           {renderContent()}
        </main>
      </div>
      
      {/* AI ChatBot Overlay */}
      <ChatBot />
    </div>
  );
};

// --- Root App Component ---
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null); 
  const [lang, setLang] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleUpdateUser = (updatedUser: any) => {
    setUser(updatedUser);
  };

  const handleEnroll = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds([...enrolledCourseIds, courseId]);
    }
  };

  return (
    <RouterProvider>
      {isAuthenticated ? (
        <LayoutWrapper 
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          user={user}
          onUpdateUser={handleUpdateUser}
          lang={lang}
          setLang={setLang}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          enrolledCourseIds={enrolledCourseIds}
          onEnroll={handleEnroll}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </RouterProvider>
  );
};

// Helper wrapper to access router context
const LayoutWrapper: React.FC<any> = (props) => {
  const router = useRouter();
  
  const handleViewCourse = (course: Course) => {
    props.setSelectedCourse(course);
    router.push('/course-details');
  };

  return <Layout {...props} onViewCourse={handleViewCourse} />;
};

export default App;