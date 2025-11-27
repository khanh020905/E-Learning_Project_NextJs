import React, { useState } from 'react';
import { 
  Play, Star, Clock, FileText, CheckCircle, Share2, Bookmark, 
  ArrowLeft, Users, Globe, Award, Lock, ChevronDown, ChevronUp, MessageSquare, Send, ThumbsUp
} from 'lucide-react';
import { Course } from '../types';
import { useRouter } from './RouterMock';
import PaymentModal from './PaymentModal';

interface CourseFullViewProps {
  course: Course | null;
  onEnroll: (courseId: string) => void;
  isEnrolled: boolean;
}

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

const CourseFullView: React.FC<CourseFullViewProps> = ({ course, onEnroll, isEnrolled }) => {
  const router = useRouter();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  
  // Rating & Review State
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isRated, setIsRated] = useState(false);
  
  const [reviews, setReviews] = useState<Review[]>([
    { 
      id: '1', 
      name: 'Michael Chen', 
      avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random', 
      rating: 5, 
      date: '2 days ago', 
      comment: 'This course was absolutely amazing! The instructor explained everything clearly and the projects were very practical.' 
    },
    { 
      id: '2', 
      name: 'Sarah Wilson', 
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=random', 
      rating: 4, 
      date: '1 week ago', 
      comment: 'Great content, but I wish there were more practice exercises in the second module. Still highly recommended!' 
    }
  ]);

  if (!course) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <button onClick={() => router.push('/')} className="text-indigo-600 font-bold hover:underline">Back to Home</button>
      </div>
    );
  }

  // Extended Mock Data for Full Page
  const curriculum = [
    { 
      title: "Part 1: Introduction & Fundamentals", 
      duration: "45m", 
      videos: [
        { title: "Welcome to the Course", time: "05:00", isFree: true },
        { title: "Setting up your Environment", time: "15:00", isFree: true },
        { title: "Core Concepts Overview", time: "25:00", isFree: false }
      ]
    },
    { 
      title: "Part 2: Deep Dive into Theory", 
      duration: "2h 15m", 
      videos: [
        { title: "Understanding the Basics", time: "45:00", isFree: false },
        { title: "Advanced Theory Analysis", time: "1:30:00", isFree: false }
      ]
    },
    { 
      title: "Part 3: Practical Application", 
      duration: "3h 30m", 
      videos: [
        { title: "Project 1: Getting Started", time: "1:00:00", isFree: false },
        { title: "Project 1: Finishing Touches", time: "1:00:00", isFree: false },
        { title: "Case Studies", time: "1:30:00", isFree: false }
      ]
    },
  ];

  const whatYouWillLearn = [
    "Master the core principles and advanced techniques of the subject.",
    "Build real-world projects to add to your professional portfolio.",
    "Understand industry best practices and workflow optimization.",
    "Gain confidence to tackle complex problems independently.",
    "Learn from actual case studies and examples.",
    "Receive a certificate of completion to showcase your skills."
  ];

  const handleEnrollClick = () => {
    if (isEnrolled) {
      alert("Opening Course Player...");
    } else {
      setIsPaymentOpen(true);
    }
  };

  const handlePaymentSuccess = () => {
    onEnroll(course.id);
  };

  const toggleSection = (idx: number) => {
    setExpandedSection(expandedSection === idx ? null : idx);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0 || !comment.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      name: 'You',
      avatar: 'https://ui-avatars.com/api/?name=You&background=random',
      rating: userRating,
      date: 'Just now',
      comment: comment
    };

    setReviews([newReview, ...reviews]);
    setIsRated(true);
    setComment('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20 animate-in fade-in duration-300">
      
      {/* Top Navigation / Breadcrumb */}
      <div className="bg-slate-900 text-slate-300 py-4 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
          <button onClick={() => router.push('/')} className="hover:text-white flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </button>
          <span>/</span>
          <span className="text-white font-medium truncate">{course.category}</span>
          <span>/</span>
          <span className="text-indigo-400 font-medium truncate">{course.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left: Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">{course.title}</h1>
            <p className="text-lg text-slate-300 leading-relaxed">{course.description} Join thousands of students who have transformed their careers with this comprehensive curriculum.</p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-5 h-5 fill-current" />
                <span>{course.rating}</span>
                <span className="text-slate-400 font-normal underline ml-1 cursor-pointer">({course.students * 3} ratings)</span>
              </div>
              <div className="flex items-center gap-1 text-slate-300">
                <Users className="w-4 h-4" />
                <span>{course.students} students enrolled</span>
              </div>
              <div className="flex items-center gap-1 text-slate-300">
                <Globe className="w-4 h-4" />
                <span>Last updated 10/2023</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} alt={course.instructor} className="w-10 h-10 rounded-full border-2 border-slate-700" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Created by</p>
                <p className="font-bold text-indigo-300 hover:text-indigo-200 cursor-pointer">{course.instructor}</p>
              </div>
            </div>
          </div>

          {/* Right: Placeholder for sticky card alignment in desktop */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* What You'll Learn Box */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What you'll learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Section */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Course Content</h2>
            <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
              <span>{curriculum.length} sections • {curriculum.reduce((acc, curr) => acc + curr.videos.length, 0)} lectures • 12h 45m total length</span>
              <button onClick={() => setExpandedSection(null)} className="text-indigo-600 font-bold hover:underline">Collapse all</button>
            </div>
            
            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800">
              {curriculum.map((section, idx) => (
                <div key={idx} className="border-b border-slate-200 dark:border-slate-700 last:border-none">
                  <button 
                    onClick={() => toggleSection(idx)}
                    className="w-full flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      {expandedSection === idx ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                      <span className="font-bold text-slate-900 dark:text-white">{section.title}</span>
                    </div>
                    <span className="text-sm text-slate-500">{section.videos.length} lectures • {section.duration}</span>
                  </button>
                  
                  {expandedSection === idx && (
                    <div className="bg-white dark:bg-slate-900/50 p-2">
                       {section.videos.map((video, vIdx) => (
                         <div key={vIdx} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg group cursor-pointer transition-colors">
                            <div className="flex items-center gap-3">
                               {video.isFree ? (
                                 <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                               ) : (
                                 <Lock className="w-4 h-4 text-slate-400" />
                               )}
                               <span className={`text-sm ${video.isFree ? 'text-indigo-700 dark:text-indigo-400 font-medium' : 'text-slate-600 dark:text-slate-300'}`}>
                                 {video.title}
                               </span>
                            </div>
                            <div className="flex items-center gap-4">
                              {video.isFree && <span className="text-xs font-bold text-green-600 border border-green-200 px-2 py-0.5 rounded">Preview</span>}
                              <span className="text-xs text-slate-400">{video.time}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Bio */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Instructor</h2>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-2xl">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="shrink-0">
                  <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} alt={course.instructor} className="w-24 h-24 rounded-full object-cover ring-4 ring-slate-100 dark:ring-slate-700" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition-colors cursor-pointer">{course.instructor}</h3>
                   <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">Senior Software Engineer & Best-Selling Instructor</p>
                   <div className="flex gap-6 mb-4 text-sm text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.8 Rating</span>
                      <span className="flex items-center gap-1"><Award className="w-4 h-4" /> 15,000 Reviews</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 50,000 Students</span>
                   </div>
                   <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                     I am a passionate developer and educator with over 10 years of experience in the industry. My mission is to make complex topics accessible to everyone. I believe in learning by doing, which is why my courses are project-based.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Student Feedback Section */}
          <div>
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Student Feedback</h2>
             
             {/* Review Form */}
             <div className="bg-indigo-50 dark:bg-slate-800/50 border border-indigo-100 dark:border-slate-700 p-6 sm:p-8 rounded-2xl mb-8">
               {!isRated ? (
                 <form onSubmit={handleSubmitReview} className="space-y-4">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Write a Review</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">How would you rate your experience?</p>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setUserRating(star)}
                            className="transition-transform hover:scale-110 focus:outline-none"
                          >
                            <Star 
                              className={`w-8 h-8 ${
                                star <= (hoverRating || userRating) 
                                  ? 'fill-amber-400 text-amber-400' 
                                  : 'text-slate-300 dark:text-slate-600'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                   </div>
                   
                   <div>
                     <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us what you liked or what could be improved..."
                        className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:text-white min-h-[100px]"
                        required
                     />
                   </div>
                   
                   <div className="flex justify-end">
                      <button 
                        type="submit"
                        disabled={userRating === 0 || !comment.trim()}
                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                         <Send className="w-4 h-4" /> Submit Review
                      </button>
                   </div>
                 </form>
               ) : (
                 <div className="text-center py-6 animate-in fade-in zoom-in">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                       <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Thank you for your review!</h3>
                    <p className="text-slate-500 dark:text-slate-400">Your feedback helps us improve the learning experience.</p>
                 </div>
               )}
             </div>

             {/* Reviews List */}
             <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 animate-in slide-in-from-bottom-2">
                     <div className="flex items-start gap-4">
                        <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1">
                           <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-slate-900 dark:text-white">{review.name}</h4>
                              <span className="text-xs text-slate-500 dark:text-slate-400">{review.date}</span>
                           </div>
                           <div className="flex items-center gap-1 mb-3">
                              {[1, 2, 3, 4, 5].map((star) => (
                                 <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'}`} />
                              ))}
                           </div>
                           <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Sticky Sidebar Card */}
        <div className="lg:col-span-1 relative">
           <div className="sticky top-24 space-y-6">
              
              {/* Preview Card */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 lg:-mt-64 relative z-10">
                 {/* Video Player Placeholder */}
                 <div className="relative h-48 bg-black group cursor-pointer">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-indigo-600 fill-indigo-600 ml-1" />
                       </div>
                    </div>
                    <div className="absolute bottom-4 text-center w-full text-white font-bold text-sm tracking-wide">Preview this course</div>
                 </div>

                 <div className="p-6 md:p-8">
                    <div className="flex items-end gap-3 mb-6">
                       <span className="text-4xl font-bold text-slate-900 dark:text-white">${course.price}</span>
                       <span className="text-lg text-slate-400 line-through mb-1.5">${(course.price * 1.5).toFixed(2)}</span>
                       <span className="text-sm font-bold text-green-600 mb-2 ml-auto">33% OFF</span>
                    </div>

                    <button 
                      onClick={handleEnrollClick}
                      className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 mb-4 ${
                         isEnrolled 
                         ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-900/30' 
                         : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-900/30'
                      }`}
                    >
                      {isEnrolled ? 'Go to Course' : 'Enroll Now'}
                    </button>
                    
                    <p className="text-center text-xs text-slate-500 mb-6">30-Day Money-Back Guarantee</p>

                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">This course includes:</h4>
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-6">
                       <li className="flex gap-3"><Play className="w-4 h-4 shrink-0" /> 12.5 hours on-demand video</li>
                       <li className="flex gap-3"><FileText className="w-4 h-4 shrink-0" /> 5 downloadable resources</li>
                       <li className="flex gap-3"><Globe className="w-4 h-4 shrink-0" /> Full lifetime access</li>
                       <li className="flex gap-3"><Award className="w-4 h-4 shrink-0" /> Certificate of completion</li>
                    </ul>

                    <div className="flex gap-4 pt-6 border-t border-slate-100 dark:border-slate-700">
                       <button className="flex-1 font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 text-sm transition-colors">Share</button>
                       <button className="flex-1 font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 text-sm transition-colors">Gift this course</button>
                    </div>
                 </div>
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
    </div>
  );
};

export default CourseFullView;