import React, { useState } from 'react';
import { Save, Mail, User, Lock, RefreshCw, Camera } from 'lucide-react';

interface SettingsViewProps {
  currentUser: any;
  onUpdateUser: (user: any) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ currentUser, onUpdateUser }) => {
  const [formData, setFormData] = useState(currentUser);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onUpdateUser(formData);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Modify Information</h2>
        <p className="text-slate-500 dark:text-slate-400">Update your personal details and security settings</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
             {/* Avatar Section */}
             <div className="flex flex-col items-center sm:items-start space-y-4 border-b border-slate-100 dark:border-slate-700 pb-8">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Profile Picture</label>
              <div className="flex items-center gap-6">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden ring-4 ring-slate-50 dark:ring-slate-800">
                        <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <button 
                        type="button"
                        onClick={() => setFormData({...formData, avatar: `https://ui-avatars.com/api/?name=${formData.name}&background=random&time=${Date.now()}`})}
                        className="absolute bottom-0 right-0 p-1.5 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-colors"
                        title="Generate Random"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex-1">
                    <div className="flex gap-3">
                         <input 
                            type="text"
                            value={formData.avatar}
                            onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                            className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl text-sm outline-none focus:border-indigo-500"
                            placeholder="https://..."
                        />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Supports Image URLs only</p>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Role</label>
                  <input 
                    type="text"
                    value={formData.role}
                    readOnly
                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 rounded-xl cursor-not-allowed"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
            </div>

            {/* Security */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Security</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                 </div>
            </div>

            <div className="flex items-center justify-end pt-4">
               {isSuccess && (
                 <span className="text-green-600 font-medium mr-4 animate-in fade-in">Changes saved successfully!</span>
               )}
               <button 
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-2 transition-all"
               >
                 <Save className="w-4 h-4" />
                 Save Information
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;