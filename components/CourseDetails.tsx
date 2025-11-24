import React, { useState } from 'react';
import { X, Play, Clock, FileText, CheckCircle, Star, Share2, Bookmark } from 'lucide-react';
import { Course } from '../types';
import PaymentModal from './PaymentModal';

interface CourseDetailsProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (courseId: string) => void;
  isEnrolled: boolean;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, isOpen, onClose, onEnroll, isEnrolled }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor'>('overview');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  if (!isOpen) return null;

  // Mock Curriculum Data
  const curriculum = [
    { title: "Introduction & Fundamentals", duration: "45m", lessons: 3 },
    { title: "Core Concepts & Theory", duration: "2h 15m", lessons: 8 },
    { title: "Practical Application", duration: "3h 30m", lessons: 12 },
    { title: "Advanced Techniques", duration: "2h 45m", lessons: 6 },
    { title: "Final Project & Assessment", duration: "1h 30m", lessons: 1 },
  ];

  const handleEnrollClick = () => {
    if (isEnrolled) {
      // Logic to go to course player could be added here
      alert("Opening Course Player...");
    } else {
      setIsPaymentOpen(true);
    }
  };

  const handlePaymentSuccess = () => {
    onEnroll(course.id);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row border border-slate-200 dark:border-slate-800">
          
          {/* Left Side - Image & Actions */}
          <div className="w-full md:w-2/5 bg-slate-900 relative flex flex-col">
            <div className="h-48 md:h-64 relative overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                  {course.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-8 flex-1 flex flex-col text-white">
              <h2 className="text-2xl font-bold mb-2 leading-tight">{course.title}</h2>
              <div className="flex items-center gap-2 text-amber-400 mb-4">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{course.rating}</span>
                <span className="text-slate-400 text-sm">({course.students} ratings)</span>
              </div>

              <div className="mt-auto space-y-4">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold">${course.price}</span>
                  <span className="text-slate-400 line-through text-lg mb-1">${(course.price * 1.2).toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={handleEnrollClick}
                  className={`w-full font-bold py-3 rounded-xl transition-all shadow-lg ${
                    isEnrolled 
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-900/50' 
                    : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-900/50'
                  }`}
                >
                  {isEnrolled ? 'Go to Course' : 'Enroll Now'}
                </button>
                
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-2.5 rounded-xl text-sm font-medium transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-2.5 rounded-xl text-sm font-medium transition-colors">
                    <Bookmark className="w-4 h-4" /> Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full md:w-3/5 flex flex-col h-full bg-white dark:bg-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`pb-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${activeTab === 'overview' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' : ''}`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('curriculum')}
                  className={`pb-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${activeTab === 'curriculum' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' : ''}`}
                >
                  Curriculum
                </button>
                <button 
                  onClick={() => setActiveTab('instructor')}
                  className={`pb-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${activeTab === 'instructor' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' : ''}`}
                >
                  Instructor
                </button>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">About this course</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{course.description} This comprehensive course is designed to take you from beginner to advanced concepts through practical, hands-on projects.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">What you'll learn</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((_, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Master core principles and best practices of {course.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Requirements</h3>
                    <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1 ml-1">
                      <li>Basic understanding of computer operations</li>
                      <li>No prior experience required</li>
                      <li>A willingness to learn and practice</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
                    <span>5 Sections • 30 Lectures</span>
                    <span>10h 45m Total Length</span>
                  </div>
                  {curriculum.map((item, idx) => (
                    <div key={idx} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-indigo-200 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/20 transition-colors group cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">{idx + 1}. {item.title}</h4>
                        <span className="text-xs font-medium text-slate-400">{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          {item.lessons} Video Lessons
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          2 Resources
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} alt={course.instructor} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{course.instructor}</h3>
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium">Senior Lecturer & Expert</p>
                      <div className="flex gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4.8 Rating</span>
                        <span className="flex items-center gap-1"><Play className="w-3 h-3" /> 12 Courses</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 Years Exp.</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed text-sm">
                    <p>
                      {course.instructor} is a highly experienced educator with over a decade of industry experience. They have helped thousands of students transition into professional careers.
                    </p>
                    <p>
                      Known for a clear teaching style and practical approach, their courses focus on real-world application rather than just theory.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        course={course}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default CourseDetails;