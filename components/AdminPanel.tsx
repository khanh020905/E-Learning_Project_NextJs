import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Info, Settings, Save } from 'lucide-react';
import { MOCK_LOGS } from '../constants';

const AdminPanel: React.FC = () => {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Administration</h2>
          <p className="text-slate-500">System settings and audit logs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900">System Settings</h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
               <label className="flex items-center justify-between cursor-pointer group">
                 <span className="text-slate-700 font-medium group-hover:text-indigo-600 transition-colors">Allow New Registrations</span>
                 <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked readOnly className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                 </div>
               </label>
               <p className="text-xs text-slate-400 mt-1">If disabled, no new users can sign up.</p>
            </div>
            
            <div className="border-t border-slate-100 pt-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Platform Name</label>
              <input type="text" value="THK" readOnly className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500" />
            </div>

            <div className="border-t border-slate-100 pt-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Support Email</label>
              <input type="email" value="support@thk.edu" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" />
            </div>

             <div className="pt-2">
                <button className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-colors">
                  <Save className="w-4 h-4" />
                  Save Configuration
                </button>
             </div>
          </div>
        </div>

        {/* Logs Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
           <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900">Audit Logs</h3>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[500px]">
            <div className="divide-y divide-slate-100">
              {MOCK_LOGS.map((log) => (
                <div key={log.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      log.type === 'error' ? 'bg-red-100 text-red-600' :
                      log.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {log.type === 'error' ? <AlertTriangle className="w-3.5 h-3.5" /> :
                       log.type === 'warning' ? <Info className="w-3.5 h-3.5" /> :
                       <CheckCircle className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{log.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{log.user}</span>
                        <span className="text-xs text-slate-400">{log.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
               <div className="p-4 hover:bg-slate-50 transition-colors opacity-60">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                       <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                     <div>
                      <p className="text-sm font-medium text-slate-900">User "Alice" updated profile</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">Alice Johnson</span>
                        <span className="text-xs text-slate-400">2023-10-25 09:12:00</span>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button className="text-xs text-slate-500 font-medium hover:text-indigo-600 transition-colors">Download Full Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;