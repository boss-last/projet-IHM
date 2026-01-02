
import React from 'react';
import { IUA_COURSES, UPCOMING_EXAMS } from '../constants';
import { Calendar, ChevronRight, Clock, Star, Zap } from 'lucide-react';
import { AppView } from '../types';

interface DashboardProps {
  onStartQuiz: () => void;
  onOpenChat: (courseName?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartQuiz, onOpenChat }) => {
  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Section */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800">Salut, Jean 👋</h2>
        <p className="text-slate-500 text-sm">Il te reste 12 jours avant les partiels.</p>
      </section>

      {/* Stats Quick Grid */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-3xl border border-blue-100 flex flex-col gap-2">
          <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white">
            <Clock size={16} />
          </div>
          <span className="text-2xl font-bold text-blue-900">14h</span>
          <span className="text-xs text-blue-600 font-medium">Étudié cette semaine</span>
        </div>
        <div className="bg-orange-50 p-4 rounded-3xl border border-orange-100 flex flex-col gap-2">
          <div className="bg-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-white">
            <Zap size={16} />
          </div>
          <span className="text-2xl font-bold text-orange-900">85%</span>
          <span className="text-xs text-orange-600 font-medium">Objectifs atteints</span>
        </div>
      </section>

      {/* Upcoming Exams */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Calendar size={18} className="text-blue-600" /> Examens à venir
          </h3>
          <button className="text-xs font-bold text-blue-600">Voir tout</button>
        </div>
        <div className="space-y-3">
          {UPCOMING_EXAMS.map((exam) => {
            const course = IUA_COURSES.find(c => c.id === exam.courseId);
            return (
              <div key={exam.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="text-2xl bg-slate-50 w-12 h-12 flex items-center justify-center rounded-xl border border-slate-100">
                    {course?.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{course?.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{exam.date}</span>
                      <span>•</span>
                      <span>{exam.room}</span>
                    </div>
                  </div>
                </div>
                {exam.priority === 'high' && (
                  <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-1 rounded-full uppercase">Urgent</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Action - AI Tutor */}
      <section 
        className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl cursor-pointer active:scale-95 transition-transform"
        onClick={() => onOpenChat()}
      >
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Star className="text-orange-400 fill-orange-400" size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Nouveau à l'IUA</span>
          </div>
          <h3 className="text-xl font-bold leading-tight">Besoin d'aide pour un concept complexe ?</h3>
          <p className="text-sm text-blue-100 opacity-80">Demande à notre tuteur IA de t'expliquer n'importe quel chapitre.</p>
          <button className="bg-white text-blue-800 px-4 py-2 rounded-xl text-xs font-black uppercase mt-2 flex items-center gap-2">
            Discuter avec l'IA <ChevronRight size={14} />
          </button>
        </div>
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[-40px] left-[-20px] w-48 h-48 bg-orange-500/20 rounded-full blur-3xl"></div>
      </section>

      {/* Subject Selector */}
      <section className="space-y-4">
        <h3 className="font-bold text-slate-800">Tes matières</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {IUA_COURSES.map((course) => (
            <div 
              key={course.id} 
              className="min-w-[140px] bg-white border border-slate-100 p-4 rounded-3xl shadow-sm text-center space-y-3 flex flex-col items-center hover:border-blue-200 transition-colors"
            >
              <div className="text-3xl bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl">
                {course.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-xs line-clamp-1">{course.name}</h4>
                <p className="text-[10px] text-slate-400">{course.code}</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onStartQuiz(); }}
                className="w-full py-2 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-bold hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                Réviser
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
