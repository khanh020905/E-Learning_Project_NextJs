import React, { useState } from 'react';
import { Search, Filter, Play, Star, Users, ArrowRight } from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { Course } from '../types';

interface ExploreCoursesViewProps {
  onEnroll?: (courseId: string) => void;
  enrolledCourseIds?: string[];
  onViewCourse: (course: Course) => void;
}

const categories = ["All", "Development", "Design", "Business", "Marketing", "Science", "Arts", "Data Science"];

const ExploreCoursesView: React.FC<ExploreCoursesViewProps> = ({ onEnroll, enrolledCourseIds = [], onViewCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Explore Our Catalog</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Find the perfect course to upgrade your skills and advance your career.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col gap-6">
        <div className="relative max-w-xl mx-auto w-full">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
           <input 
             type="text" 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             placeholder="Search for courses, topics, or instructors..."
             className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-white"
           />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
           {categories.map(cat => (
             <button
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                 selectedCategory === cat 
                   ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
                   : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-700'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div 
              key={course.id} 
              onClick={() => onViewCourse(course)}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col cursor-pointer"
            >
              <div className="h-56 overflow-hidden relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                   <span className="px-3 py-1.5 bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-bold rounded-lg backdrop-blur-sm shadow-sm uppercase tracking-wide">
                      {course.category}
                   </span>
                </div>
                {/* Overlay Play Icon */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all">
                       <Play className="w-6 h-6 text-white ml-1 fill-white" />
                    </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                     <Star className="w-4 h-4 fill-current" />
                     <span>{course.rating}</span>
                     <span className="text-slate-400 font-normal ml-1">({course.students})</span>
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
                  <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-bold text-sm flex items-center gap-1">
                     Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No courses found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your search terms or filters.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="mt-6 text-indigo-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCoursesView;