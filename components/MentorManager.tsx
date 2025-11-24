import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Mail, Award, Star, Image as ImageIcon, Lock, RefreshCw } from 'lucide-react';
import { Mentor, UserStatus } from '../types';
import { MOCK_MENTORS } from '../constants';

const MentorManager: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>(MOCK_MENTORS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMentor, setCurrentMentor] = useState<Partial<Mentor> & { password?: string }>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (id: string) => {
    if (window.confirm('Remove this mentor?')) {
      setMentors(mentors.filter(m => m.id !== id));
    }
  };

  const handleEdit = (mentor: Mentor) => {
    setCurrentMentor({ ...mentor, password: '' });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setCurrentMentor({ 
        status: UserStatus.Active, 
        expertise: [],
        avatar: `https://ui-avatars.com/api/?name=New+Mentor&background=random`
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const expertiseArray = typeof currentMentor.expertise === 'string' 
      ? (currentMentor.expertise as string).split(',').map(s => s.trim()) 
      : currentMentor.expertise;

    const mentorData = { ...currentMentor, expertise: expertiseArray };
    delete mentorData.password; // Don't store in state for demo

    if (isEditing && currentMentor.id) {
      setMentors(mentors.map(m => m.id === currentMentor.id ? { ...m, ...mentorData } as Mentor : m));
    } else {
      const newMentor: Mentor = {
        ...mentorData,
        id: Math.random().toString(36).substr(2, 9),
        rating: 5.0,
        totalStudents: 0,
      } as Mentor;
      setMentors([...mentors, newMentor]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Mentors</h2>
          <p className="text-slate-500">Expert instructors and guides</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm shadow-indigo-200"
        >
          <Plus className="w-5 h-5" />
          Add Mentor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm bg-slate-100" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{mentor.name}</h3>
                  <div className="flex items-center gap-1 text-slate-500 text-sm mb-1">
                    <Mail className="w-3 h-3" />
                    {mentor.email}
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    mentor.status === UserStatus.Active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {mentor.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Expertise</p>
                 <div className="flex flex-wrap gap-2">
                   {mentor.expertise.map((skill, idx) => (
                     <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md border border-indigo-100">
                       {skill}
                     </span>
                   ))}
                 </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex gap-4 text-sm font-medium">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-indigo-500" />
                    <span>{mentor.totalStudents} Students</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{mentor.rating}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => handleEdit(mentor)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                   </button>
                   <button onClick={() => handleDelete(mentor.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

       {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
             <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">{isEditing ? 'Edit Mentor' : 'Add New Mentor'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
               {/* Avatar Preview & Edit */}
               <div className="flex justify-center mb-6">
                <div className="relative group">
                   <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden">
                     <img src={currentMentor.avatar} alt="Preview" className="w-full h-full object-cover" />
                   </div>
                   <button 
                    type="button"
                    onClick={() => setCurrentMentor({...currentMentor, avatar: `https://ui-avatars.com/api/?name=${currentMentor.name || 'New'}&background=random&time=${Date.now()}`})}
                    className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-colors"
                    title="Generate Random Avatar"
                   >
                     <RefreshCw className="w-4 h-4" />
                   </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={currentMentor.name || ''}
                  onChange={e => setCurrentMentor({...currentMentor, name: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      required
                      type="email" 
                      value={currentMentor.email || ''}
                      onChange={e => setCurrentMentor({...currentMentor, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {isEditing ? 'New Password (leave blank to keep)' : 'Password'}
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="password" 
                      value={currentMentor.password || ''}
                      onChange={e => setCurrentMentor({...currentMentor, password: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                      required={!isEditing}
                      placeholder="••••••••"
                    />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Avatar URL</label>
                <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={currentMentor.avatar || ''}
                      onChange={e => setCurrentMentor({...currentMentor, avatar: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-xs text-slate-600"
                      placeholder="https://..."
                    />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Expertise (comma separated)</label>
                <input 
                  required
                  type="text" 
                  value={Array.isArray(currentMentor.expertise) ? currentMentor.expertise.join(', ') : currentMentor.expertise || ''}
                  onChange={e => setCurrentMentor({...currentMentor, expertise: e.target.value as any})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  placeholder="Math, Science, Art"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select 
                  value={currentMentor.status}
                  onChange={e => setCurrentMentor({...currentMentor, status: e.target.value as UserStatus})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                >
                  {Object.values(UserStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                >
                  Save Mentor
                </button>
              </div>
            </form>
          </div>
        </div>
       )}
    </div>
  );
};

export default MentorManager;