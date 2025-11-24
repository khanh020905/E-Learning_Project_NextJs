import React from 'react';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface DashboardProps {
  lang?: Language;
}

const data = [
  { name: 'Jan', students: 400, revenue: 2400 },
  { name: 'Feb', students: 300, revenue: 1398 },
  { name: 'Mar', students: 500, revenue: 9800 },
  { name: 'Apr', students: 780, revenue: 3908 },
  { name: 'May', students: 890, revenue: 4800 },
  { name: 'Jun', students: 990, revenue: 5800 },
  { name: 'Jul', students: 1290, revenue: 7800 },
];

const StatCard: React.FC<{ title: string; value: string; trend: string; isPositive: boolean; icon: React.ReactNode }> = ({ title, value, trend, isPositive, icon }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
        {icon}
      </div>
      <span className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
        {trend}
      </span>
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ lang = 'en' }) => {
  const t = TRANSLATIONS[lang].dashboard;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t.totalStudents}
          value="2,543" 
          trend="+12.5%" 
          isPositive={true} 
          icon={<Users className="w-6 h-6" />} 
        />
        <StatCard 
          title={t.activeCourses}
          value="45" 
          trend="+4.2%" 
          isPositive={true} 
          icon={<BookOpen className="w-6 h-6" />} 
        />
        <StatCard 
          title={t.totalRevenue}
          value="$45,231" 
          trend="+8.1%" 
          isPositive={true} 
          icon={<DollarSign className="w-6 h-6" />} 
        />
        <StatCard 
          title={t.avgEngagement}
          value="87%" 
          trend="-2.4%" 
          isPositive={false} 
          icon={<TrendingUp className="w-6 h-6" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{t.revenueOverview}</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1e293b' }}
                />
                <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{t.recentActivity}</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 shrink-0" />
                <div>
                  <p className="text-sm text-slate-900 dark:text-white font-medium">{t.newEnrollment} "Advanced React"</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">2 {t.ago}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors">
            {t.viewAll}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;