import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Clock, Star, Users, Trash2, Edit } from 'lucide-react';
import { Course } from '../types';
import { MOCK_COURSES } from '../constants';

const CourseManager: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Partial<Course>>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const handleEdit = (course: Course) => {
    setCurrentCourse(course);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setCurrentCourse({ image: 'https://picsum.photos/400/250' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && currentCourse.id) {
      setCourses(courses.map(c => c.id === currentCourse.id ? { ...c, ...currentCourse } as Course : c));
    } else {
      const newCourse: Course = {
        ...currentCourse,
        id: Math.random().toString(36).substr(2, 9),
        students: 0,
        rating: 0,
      } as Course;
      setCourses([...courses, newCourse]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Courses</h2>
          <p className="text-slate-500">Manage learning content and curriculum</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm shadow-indigo-200"
        >
          <Plus className="w-5 h-5" />
          Create Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="h-48 overflow-hidden relative">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 flex gap-2">
                 <button onClick={() => handleEdit(course)} className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-indigo-500 hover:text-white transition-colors shadow-sm">
                    <Edit className="w-4 h-4" />
                 </button>
                 <button onClick={() => handleDelete(course.id)} className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-red-500 hover:text-white transition-colors shadow-sm">
                    <Trash2 className="w-4 h-4" />
                 </button>
              </div>
              <div className="absolute top-3 left-3">
                 <span className="px-3 py-1 bg-indigo-600/90 text-white text-xs font-bold rounded-full backdrop-blur-sm shadow-sm">
                    {course.category}
                 </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{course.title}</h3>
                <span className="text-indigo-600 font-bold">${course.price}</span>
              </div>
              <p className="text-slate-500 text-sm line-clamp-2 mb-4 h-10">{course.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{course.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} alt="" />
                  </div>
                  <span className="text-xs font-medium text-slate-700">{course.instructor}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900">{isEditing ? 'Edit Course' : 'Create New Course'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Course Title</label>
                  <input 
                    required
                    type="text" 
                    value={currentCourse.title || ''}
                    onChange={e => setCurrentCourse({...currentCourse, title: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    placeholder="e.g. Mastering Advanced TypeScript"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                  <select 
                    value={currentCourse.category || ''}
                    onChange={e => setCurrentCourse({...currentCourse, category: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Science">Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Price ($)</label>
                  <input 
                    type="number" 
                    value={currentCourse.price || ''}
                    onChange={e => setCurrentCourse({...currentCourse, price: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div className="md:col-span-2">
                   <label className="block text-sm font-semibold text-slate-700 mb-2">Instructor Name</label>
                   <input 
                    type="text" 
                    value={currentCourse.instructor || ''}
                    onChange={e => setCurrentCourse({...currentCourse, instructor: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    placeholder="Dr. John Doe"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <div className="relative">
                    <textarea 
                        rows={4}
                        value={currentCourse.description || ''}
                        onChange={e => setCurrentCourse({...currentCourse, description: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
                        placeholder="Describe what students will learn..."
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
                >
                  {isEditing ? 'Update Course' : 'Publish Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManager;