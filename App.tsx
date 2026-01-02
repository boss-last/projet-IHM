
import React, { useState } from 'react';
import { AppView } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StudyChat from './components/StudyChat';
import QuizView from './components/QuizView';
import ProgressView from './components/ProgressView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return (
          <Dashboard 
            onStartQuiz={() => setCurrentView(AppView.QUIZ)} 
            onOpenChat={() => setCurrentView(AppView.STUDY_CHAT)} 
          />
        );
      case AppView.STUDY_CHAT:
        return <StudyChat />;
      case AppView.QUIZ:
        return <QuizView />;
      case AppView.PROGRESS:
        return <ProgressView />;
      default:
        return <Dashboard 
          onStartQuiz={() => setCurrentView(AppView.QUIZ)} 
          onOpenChat={() => setCurrentView(AppView.STUDY_CHAT)} 
        />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 sm:py-8">
      {/* Desktop Preview Wrapper - Mimics a phone on larger screens */}
      <Layout currentView={currentView} setView={setCurrentView}>
        {renderView()}
      </Layout>
    </div>
  );
};

export default App;
