
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, BookOpen, ArrowLeft, CheckCircle } from 'lucide-react';

interface AuthProps {
  onLogin: (user: any) => void;
}

type AuthView = 'login' | 'register' | 'forgot_password';

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [view, setView] = useState<AuthView>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      
      if (view === 'forgot_password') {
        setResetSent(true);
        return;
      }

      // Mock User Data
      const user = {
        name: view === 'login' ? 'Demo User' : name,
        email: email,
        role: 'User', // Default role
        avatar: `https://ui-avatars.com/api/?name=${view === 'login' ? 'Demo+User' : name}&background=6366f1&color=fff`
      };
      
      onLogin(user);
    }, 1500);
  };

  const handleBackToLogin = () => {
    setView('login');
    setResetSent(false);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 lg:h-full lg:w-1/2 lg:rounded-r-[50px] z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500 opacity-10 rounded-full -ml-20 -mb-20 blur-2xl"></div>
        
        <div className="hidden lg:flex flex-col justify-center h-full px-16 text-white relative z-10">
           <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">THK Learning</h1>
           </div>
           <h2 className="text-5xl font-bold mb-6 leading-tight">
             Unlock Your <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-pink-200">True Potential</span>
           </h2>
           <p className="text-indigo-100 text-lg max-w-md leading-relaxed">
             Join thousands of students mastering new skills, advancing careers, and exploring passions on the world's most intuitive e-learning platform.
           </p>
           
           <div className="flex gap-4 mt-8">
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <img key={i} src={`https://ui-avatars.com/api/?background=random&name=User+${i}`} className="w-10 h-10 rounded-full border-2 border-indigo-600" alt="User" />
               ))}
             </div>
             <div className="flex flex-col justify-center">
               <span className="font-bold">2,500+</span>
               <span className="text-xs text-indigo-200">Happy Students</span>
             </div>
           </div>
        </div>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md lg:ml-auto lg:mr-20 bg-white rounded-3xl shadow-2xl shadow-indigo-200 overflow-hidden border border-slate-100">
        <div className="p-8 sm:p-10">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {view === 'login' && 'Welcome Back!'}
              {view === 'register' && 'Create Account'}
              {view === 'forgot_password' && 'Reset Password'}
            </h2>
            <p className="text-slate-500 text-sm">
              {view === 'login' && 'Please sign in to access your dashboard.'}
              {view === 'register' && 'Start your 30-day free trial today.'}
              {view === 'forgot_password' && 'Enter your email to receive a reset link.'}
            </p>
          </div>

          {view === 'forgot_password' && resetSent ? (
            <div className="text-center py-8 animate-in fade-in zoom-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Check your email</h3>
              <p className="text-slate-500 text-sm mb-6">
                We've sent a password reset link to <span className="font-semibold text-slate-700">{email}</span>
              </p>
              <button 
                onClick={handleBackToLogin}
                className="text-indigo-600 font-bold hover:underline flex items-center justify-center gap-2 mx-auto"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Log In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {view === 'register' && (
                <div className="space-y-1.5 animate-in slide-in-from-right-4 duration-300">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {view !== 'forgot_password' && (
                <div className="space-y-1.5 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                    {view === 'login' && (
                      <button 
                        type="button"
                        onClick={() => setView('forgot_password')}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {view === 'login' && (
                      <>Sign In <ArrowRight className="w-5 h-5" /></>
                    )}
                    {view === 'register' && (
                      <>Create Account <ArrowRight className="w-5 h-5" /></>
                    )}
                    {view === 'forgot_password' && (
                      <>Send Reset Link <Mail className="w-5 h-5" /></>
                    )}
                  </>
                )}
              </button>
            </form>
          )}

          {!resetSent && (
            <div className="mt-8 text-center">
              {view === 'forgot_password' ? (
                <button 
                  onClick={handleBackToLogin}
                  className="text-slate-500 text-sm hover:text-indigo-600 font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Log In
                </button>
              ) : (
                <p className="text-slate-500 text-sm">
                  {view === 'login' ? "Don't have an account?" : "Already have an account?"}
                  <button 
                    onClick={() => setView(view === 'login' ? 'register' : 'login')}
                    className="ml-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
                  >
                    {view === 'login' ? 'Sign Up' : 'Log In'}
                  </button>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
