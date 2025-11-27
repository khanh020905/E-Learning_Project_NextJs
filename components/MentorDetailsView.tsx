import React, { useState } from 'react';
import { 
  ArrowLeft, Star, Users, Award, Mail, Globe, CheckCircle, 
  Briefcase, GraduationCap, Play, ThumbsUp, MessageSquare, Send 
} from 'lucide-react';
import { Mentor, Course } from '../types';
import { useRouter } from './RouterMock';
import { MOCK_COURSES } from '../constants';

interface MentorDetailsViewProps {
  mentor: Mentor | null;
  onViewCourse: (course: Course) => void;
}

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

const MentorDetailsView: React.FC<MentorDetailsViewProps> = ({ mentor, onViewCourse }) => {
  const router = useRouter();
  
  // Rating & Review State
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isRated, setIsRated] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([
    { 
      id: '1', 
      name: 'Emily Davis', 
      avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=random', 
      rating: 5, 
      date: '3 weeks ago', 
      comment: 'An incredible mentor! She helped me understand complex algorithms in a way that finally made sense.' 
    },
    { 
      id: '2', 
      name: 'James Wilson', 
      avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=random', 
      rating: 5, 
      date: '1 month ago', 
      comment: 'Very patient and knowledgeable. Highly recommend taking any of her courses.' 
    }
  ]);

  if (!mentor) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Mentor not found</h2>
        <button onClick={() => router.push('/')} className="text-indigo-600 font-bold hover:underline">Back to Home</button>
      </div>
    );
  }

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

  // Filter courses by this mentor
  const mentorCourses = MOCK_COURSES.filter(c => c.instructor === mentor.name);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20 animate-in fade-in duration-300">
      
      {/* Header / Banner */}
      <div className="bg-slate-900 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-slate-900 z-0"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 opacity-20 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 relative z-10">
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center gap-2 text-indigo-300 hover:text-white mb-8 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Mentors
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
             {/* Avatar */}
             <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white p-1 shadow-2xl overflow-hidden shrink-0">
               <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover rounded-2xl" />
             </div>

             {/* Basic Info */}
             <div className="flex-1 text-white">
                <div className="flex items-center gap-2 mb-2">
                   <h1 className="text-3xl md:text-5xl font-bold font-serif">{mentor.name}</h1>
                   <CheckCircle className="w-6 h-6 text-blue-400 fill-blue-400/20" />
                </div>
                <p className="text-xl text-indigo-200 font-medium mb-4 flex items-center gap-2">
                   {mentor.title || 'Senior Instructor'} 
                   {mentor.company && <span className="text-slate-400 text-base font-normal">• {mentor.company}</span>}
                </p>
                
                <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-slate-300">
                   <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-white">{mentor.rating}</span> Rating
                   </div>
                   <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-indigo-400" />
                      <span className="font-bold text-white">{mentor.totalStudents.toLocaleString()}</span> Students
                   </div>
                   <div className="flex items-center gap-1.5">
                      <Play className="w-4 h-4 text-indigo-400" />
                      <span className="font-bold text-white">{mentorCourses.length}</span> Courses
                   </div>
                </div>
             </div>

             {/* Actions */}
             <div className="flex gap-3">
                <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-colors backdrop-blur-sm">
                   <Mail className="w-5 h-5" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-colors backdrop-blur-sm">
                   <Globe className="w-5 h-5" />
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-900/50 transition-all hover:scale-105 active:scale-95">
                   Follow
                </button>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
         
         {/* Left Column: Bio & Certs */}
         <div className="lg:col-span-2 space-y-10">
            
            {/* About */}
            <section>
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                     <Briefcase className="w-5 h-5" />
                  </div>
                  About {mentor.name.split(' ')[0]}
               </h2>
               <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                     {mentor.bio || "No biography available."}
                  </p>
                  
                  <div className="mt-8">
                     <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Areas of Expertise</h3>
                     <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map((skill, idx) => (
                           <span key={idx} className="px-4 py-2 bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 rounded-xl font-medium border border-slate-200 dark:border-slate-600">
                              {skill}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            </section>

             {/* Certificates */}
             {mentor.certificates && mentor.certificates.length > 0 && (
              <section>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                       <Award className="w-5 h-5" />
                    </div>
                    Credentials & Awards
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mentor.certificates.map((cert, idx) => (
                       <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-4">
                          <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/10 rounded-full flex items-center justify-center shrink-0">
                             <GraduationCap className="w-6 h-6 text-amber-500" />
                          </div>
                          <div>
                             <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{cert}</h4>
                             <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Verified Credential</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </section>
            )}

            {/* Reviews & Feedback Section */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                 <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                    <MessageSquare className="w-5 h-5" />
                 </div>
                 Reviews & Feedback
              </h2>
              
              {/* Review Form */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
                 {!isRated ? (
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                             <h3 className="text-lg font-bold text-slate-900 dark:text-white">Rate this Mentor</h3>
                             <p className="text-slate-500 dark:text-slate-400 text-sm">Share your experience to help others.</p>
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
                                            : 'text-slate-200 dark:text-slate-700'
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
                             placeholder="Write your feedback..."
                             className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:text-white min-h-[100px]"
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
                       <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Thanks for your feedback!</h3>
                    </div>
                 )}
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
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
            </section>
         </div>

         {/* Right Column: Courses */}
         <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Courses ({mentorCourses.length})</h2>
            <div className="space-y-6">
               {mentorCourses.length > 0 ? (
                  mentorCourses.map((course) => (
                     <div 
                        key={course.id} 
                        onClick={() => onViewCourse(course)}
                        className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                     >
                        <div className="h-32 overflow-hidden relative">
                           <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           <div className="absolute top-2 left-2">
                              <span className="px-2 py-1 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-bold rounded-md backdrop-blur-sm">
                                 {course.category}
                              </span>
                           </div>
                        </div>
                        <div className="p-4">
                           <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {course.title}
                           </h3>
                           <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                              <span className="flex items-center gap-1">
                                 <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {course.rating}
                              </span>
                              <span className="flex items-center gap-1">
                                 <Users className="w-3 h-3" /> {course.students}
                              </span>
                           </div>
                        </div>
                     </div>
                  ))
               ) : (
                  <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl text-center text-slate-500">
                     No active courses at the moment.
                  </div>
               )}
            </div>
         </div>

      </div>
    </div>
  );
};

export default MentorDetailsView;