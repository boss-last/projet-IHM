
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell
} from 'recharts';
import { TrendingUp, Award, Clock, BookOpen } from 'lucide-react';

const studyData = [
  { day: 'Lun', hours: 2.5 },
  { day: 'Mar', hours: 1.5 },
  { day: 'Mer', hours: 4.0 },
  { day: 'Jeu', hours: 3.2 },
  { day: 'Ven', hours: 2.8 },
  { day: 'Sam', hours: 5.5 },
  { day: 'Dim', hours: 1.0 },
];

const scoreHistory = [
  { exam: 'Quiz 1', score: 65 },
  { exam: 'Quiz 2', score: 72 },
  { exam: 'Quiz 3', score: 85 },
  { exam: 'Quiz 4', score: 80 },
  { exam: 'Quiz 5', score: 92 },
];

const COLORS = ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#F97316', '#FB923C'];

const ProgressView: React.FC = () => {
  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <section className="text-center space-y-2">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Ma Progression</h2>
        <p className="text-slate-500 text-sm">Analyse de tes efforts et résultats.</p>
      </section>

      {/* Highlights Grid */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1">
          <Clock className="text-blue-600 mb-2" size={20} />
          <p className="text-2xl font-black text-slate-800">20.5h</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Temps total</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1">
          <Award className="text-orange-500 mb-2" size={20} />
          <p className="text-2xl font-black text-slate-800">82%</p>
          <p className="text-[10px) font-bold text-slate-400 uppercase tracking-widest">Moyenne Quiz</p>
        </div>
      </section>

      {/* Study Time Chart */}
      <section className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-600" /> Temps d'étude
          </h3>
          <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">7 derniers jours</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}}
                dy={10}
              />
              <YAxis hide />
              <Tooltip 
                cursor={{fill: '#f8fafc'}} 
                contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
              />
              <Bar dataKey="hours" radius={[8, 8, 8, 8]} barSize={24}>
                {studyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.hours > 3 ? '#1E40AF' : '#93C5FD'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Quiz History */}
      <section className="bg-slate-900 p-6 rounded-[40px] text-white space-y-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <BookOpen size={18} className="text-orange-400" /> Évolution Scores
            </h3>
            <span className="text-[10px] font-bold text-slate-400">Progression continue</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                   contentStyle={{backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155'}}
                   itemStyle={{color: '#f97316'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#F97316" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#F97316', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
        {/* Fixed: Replaced mismatched </div> with </section> */}
      </section>

      {/* Achievements */}
      <section className="space-y-4">
        <h3 className="font-bold text-slate-800 uppercase tracking-widest text-xs">Badges obtenus</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {[
            { label: 'Assidu', color: 'bg-green-100 text-green-700', icon: '🔥' },
            { label: 'Major', color: 'bg-blue-100 text-blue-700', icon: '🎓' },
            { label: 'Noctambule', color: 'bg-indigo-100 text-indigo-700', icon: '🌙' },
            { label: 'Rapide', color: 'bg-orange-100 text-orange-700', icon: '⚡' },
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-2xl shadow-sm ${badge.color}`}>
                {badge.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-tight">{badge.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProgressView;
