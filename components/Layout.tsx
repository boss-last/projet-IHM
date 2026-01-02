
import React from 'react';
import { AppView } from '../types';
import { 
  LayoutDashboard, 
  MessageSquare, 
  BookOpen, 
  BarChart3, 
  GraduationCap,
  Calendar
} from 'lucide-react';

interface LayoutProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setView, children }) => {
  const navItems = [
    { view: AppView.DASHBOARD, icon: LayoutDashboard, label: 'Accueil' },
    { view: AppView.STUDY_CHAT, icon: MessageSquare, label: 'Tuteur IA' },
    { view: AppView.QUIZ, icon: BookOpen, label: 'Quiz' },
    { view: AppView.PROGRESS, icon: BarChart3, label: 'Suivi' },
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="bg-blue-800 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-lg">
            <GraduationCap className="text-blue-800 w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">IUA Success</h1>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest font-semibold">Excellence & Rigueur</p>
          </div>
        </div>
        <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white/20">
          JD
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 hide-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 px-2 py-3 flex justify-around items-center z-50 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? 'text-blue-700' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-blue-50' : ''}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold uppercase ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
