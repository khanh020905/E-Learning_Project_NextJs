import React from 'react';
import { Play, Clock, Award, MoreHorizontal, BookOpen } from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { Course } from '../types';

interface MyCoursesViewProps {
  enrolledCourseIds?: string[];
}

const MyCoursesView: React.FC<MyCoursesViewProps> = ({ enrolledCourseIds = [] }) => {
  // Filter courses based on enrolled IDs
  // If no IDs provided (e.g., first load), default to empty or mock as needed. 
  // Here we strictly follow the state.
  const myCourses = MOCK_COURSES.filter(c => enrolledCourseIds.includes(c.id)).map(c => ({
    ...c,
    progress: Math.floor(Math.random() * 30) // Simulate some progress for newly added courses
  }));

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Courses</h2>
        <p className="text-slate-500 dark:text-slate-400">Continue learning where you left off</p>
      </div>

      {myCourses.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700 shadow-sm">
           <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-indigo-400" />
           </div>
           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Courses Yet</h3>
           <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
             You haven't enrolled in any courses yet. Browse our catalog to find your next learning adventure!
           </p>
           {/* Note: This button relies on parent navigation, simplified here visually */}
           <button className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
             Browse Courses
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all group">
              <div className="h-40 overflow-hidden relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="bg-white text-slate-900 rounded-full p-3 transform scale-90 hover:scale-100 transition-transform">
                      <Play className="w-6 h-6 ml-1" />
                   </button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                   <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md uppercase tracking-wide">{course.category}</span>
                   <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                      <MoreHorizontal className="w-5 h-5" />
                   </button>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 mb-2">{course.title}</h3>
                
                <div className="space-y-2 mb-4">
                   <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                      <span>{course.progress}% Complete</span>
                      <span>{course.progress === 100 ? 'Completed' : 'In Progress'}</span>
                   </div>
                   <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                          className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${course.progress}%` }}
                      />
                   </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                   <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Last accessed just now</span>
                   </div>
                   <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                      {course.progress === 0 ? 'Start' : 'Resume'}
                   </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Browse More Card */}
          <button className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center p-6 text-slate-400 hover:text-indigo-600 hover:border-indigo-300 dark:hover:border-indigo-700 dark:hover:text-indigo-400 transition-colors h-full min-h-[300px]">
             <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-3">
                <Award className="w-6 h-6" />
             </div>
             <span className="font-bold">Browse More Courses</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCoursesView;