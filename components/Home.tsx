

"use client";

import React, { useState } from 'react';
import { Play, Star, Clock, ArrowRight, Sparkles, Globe, Mail, Phone, Users, Award, Briefcase } from 'lucide-react';
import { MOCK_COURSES, MOCK_MENTORS } from '../constants';
import { Course, Language, Mentor } from '../types';
import { TRANSLATIONS } from '../translations';
import { useRouter } from './RouterMock';

interface HomeProps {
  lang?: Language;
  onEnroll?: (courseId: string) => void;
  enrolledCourseIds?: string[];
  onViewCourse: (course: Course) => void;
  onViewMentor?: (mentor: Mentor) => void;
}

const Home: React.FC<HomeProps> = ({ lang = 'en', onEnroll, enrolledCourseIds = [], onViewCourse, onViewMentor }) => {
  const router = useRouter();
  const t = TRANSLATIONS[lang].home;
  const featuredCourses = MOCK_COURSES.slice(0, 3);
  const featuredMentors = MOCK_MENTORS.slice(0, 3);

  const handleApplyClick = () => {
    router.push('/apply-to-teach');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      {/* Main Content Container */}
      <div className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-16 pb-12">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-3xl p-8 md:p-16 overflow-hidden shadow-xl shadow-indigo-200 dark:shadow-none">
          {/* Abstract decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500 opacity-10 rounded-full -ml-20 -mb-20 blur-2xl"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-indigo-50 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.badge}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              {t.heroTitle} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-pink-200">THK</span>
            </h1>
            <p className="text-indigo-100 text-lg mb-10 max-w-xl leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => router.push('/explore')} 
                className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-xl shadow-indigo-900/20"
              >
                {t.exploreBtn}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-indigo-900/40 text-white border border-white/20 px-8 py-4 rounded-2xl font-semibold hover:bg-indigo-900/60 transition-all backdrop-blur-md">
                {t.learnMoreBtn}
              </button>
            </div>
          </div>
        </div>

        {/* Preferred/Featured Courses Section */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{t.featuredTitle}</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">{t.featuredSubtitle}</p>
            </div>
            <button onClick={() => router.push('/explore')} className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2 transition-colors group">
              {t.viewAll} 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div 
                key={course.id} 
                onClick={() => onViewCourse(course)}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col cursor-pointer"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white/20 backdrop-blur-md border border-white/40 w-16 h-16 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 ml-1 fill-white" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                     <span className="px-3 py-1.5 bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-bold rounded-lg backdrop-blur-sm shadow-sm uppercase tracking-wide">
                        {course.category}
                     </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                       <Star className="w-4 h-4 fill-current" />
                       <span>{course.rating}</span>
                       <span className="text-slate-400 font-normal ml-1">({course.students} students)</span>
                    </div>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-lg">${course.price}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{course.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6 flex-1">{course.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700 mt-auto">
                    <div className="flex items-center gap-3">
                      <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-700 shadow-sm" alt="" />
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-2.5 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5" />
                      <span>12h 30m</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expert Mentors Section */}
        <section className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 md:p-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
             <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
                <Award className="w-4 h-4" />
                <span>World-Class Faculty</span>
             </div>
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{t.mentorsTitle}</h2>
             <p className="text-lg text-slate-500 dark:text-slate-400">
               {t.mentorsSubtitle}
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {featuredMentors.map((mentor) => (
                <div 
                  key={mentor.id} 
                  onClick={() => onViewMentor && onViewMentor(mentor)}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all hover:shadow-lg group text-center cursor-pointer transform hover:-translate-y-1"
                >
                   <div className="w-24 h-24 mx-auto mb-4 relative">
                      <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-slate-50 dark:ring-slate-700 group-hover:ring-indigo-100 dark:group-hover:ring-indigo-900 transition-all">
                         <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-800" title="Available for mentoring"></div>
                   </div>
                   
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 transition-colors">{mentor.name}</h3>
                   <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">{mentor.title || `${mentor.expertise[0]} Specialist`}</p>
                   
                   <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {mentor.expertise.slice(0, 3).map((skill, idx) => (
                         <span key={idx} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium">
                            {skill}
                         </span>
                      ))}
                   </div>

                   <div className="flex items-center justify-center gap-6 border-t border-slate-100 dark:border-slate-700 pt-4">
                      <div className="text-center">
                         <div className="flex items-center gap-1 text-slate-900 dark:text-white font-bold">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span>{mentor.rating}</span>
                         </div>
                         <span className="text-xs text-slate-500 dark:text-slate-400">Rating</span>
                      </div>
                      <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
                      <div className="text-center">
                         <div className="flex items-center gap-1 text-slate-900 dark:text-white font-bold">
                            <Users className="w-4 h-4 text-indigo-500" />
                            <span>{mentor.totalStudents}</span>
                         </div>
                         <span className="text-xs text-slate-500 dark:text-slate-400">Students</span>
                      </div>
                   </div>
                </div>
             ))}
          </div>
          
          <div className="mt-10 text-center">
             <button onClick={() => router.push('/mentors')} className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                {t.meetMentors} <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </section>

        {/* Join Faculty / Hire Mentor Section - Academic Style */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-12 md:p-16 text-center shadow-xl ring-1 ring-white/10">
          {/* Background Decor */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl mb-8 ring-1 ring-white/10">
              <Briefcase className="w-8 h-8 text-indigo-300" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif tracking-tight text-white">{t.joinFacultyTitle}</h2>
            <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              {t.joinFacultySubtitle}
            </p>
            <button 
              onClick={handleApplyClick}
              className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10 flex items-center gap-2 mx-auto"
            >
              {t.applyBtn} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>

      {/* Footer - Full Width */}
      <footer className="bg-slate-900 text-slate-400 relative overflow-hidden mt-auto w-full">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 opacity-10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 border-b border-slate-800 pb-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/50">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">THK</h2>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {t.footerDesc}
              </p>
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">
                    <Globe className="w-5 h-5" />
                 </div>
                 <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">
                    <Mail className="w-5 h-5" />
                 </div>
                 <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">
                    <Phone className="w-5 h-5" />
                 </div>
              </div>
            </div>
            
            <div className="md:col-span-2 md:col-start-7">
              <h3 className="text-white font-bold text-lg mb-6">Platform</h3>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">Browse Courses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Mentors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing Plans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Business</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-white font-bold text-lg mb-6">Resources</h3>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

             <div className="md:col-span-2">
              <h3 className="text-white font-bold text-lg mb-6">Legal</h3>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
            <p>© 2023 THK Inc. All rights reserved.</p>
            <p className="text-slate-500">{t.madeWith}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;