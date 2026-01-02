
import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, HelpCircle, Loader2, Sparkles, Trophy } from 'lucide-react';
import { generateQuizFromTopic } from '../services/geminiService';
import { QuizQuestion } from '../types';

const QuizView: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const startQuiz = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    const generated = await generateQuizFromTopic(topic);
    setQuestions(generated);
    setCurrentIdx(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setQuizComplete(false);
    setIsGenerating(false);
  };

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === questions[currentIdx].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] p-8 text-center space-y-6 animate-pulse">
        <div className="bg-blue-100 p-6 rounded-full">
          <Loader2 size={48} className="text-blue-600 animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Génération intelligente en cours...</h2>
          <p className="text-sm text-slate-500 italic">"L'IA analyse ton sujet pour créer un examen sur mesure pour l'IUA."</p>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className="p-8 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="relative inline-block">
          <div className="bg-orange-100 p-8 rounded-full">
            <Trophy size={64} className="text-orange-500" />
          </div>
          <div className="absolute -top-2 -right-2 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-white">
            {score}
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-800">Quiz Terminé !</h2>
          <p className="text-slate-500">Tu as obtenu {score} sur {questions.length} questions.</p>
        </div>

        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-left space-y-2">
          <h4 className="font-bold text-sm text-slate-800">Analyse de performance :</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {score >= 4 
              ? "Excellent travail ! Tu maîtrises bien ce sujet. Continue comme ça pour ton examen final."
              : score >= 2 
                ? "Pas mal, mais quelques concepts restent à revoir. Utilise le Tuteur IA pour clarifier tes doutes."
                : "Attention, ce sujet semble difficile. N'hésite pas à demander un résumé complet à l'IA avant de retenter."}
          </p>
        </div>

        <button 
          onClick={() => setQuestions([])}
          className="w-full bg-blue-700 text-white py-4 rounded-2xl font-bold hover:bg-blue-800 shadow-xl shadow-blue-200"
        >
          Nouveau Quiz
        </button>
      </div>
    );
  }

  if (questions.length > 0) {
    const q = questions[currentIdx];
    return (
      <div className="p-6 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Question {currentIdx + 1} / {questions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-500" 
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="bg-blue-50 w-10 h-10 rounded-xl flex items-center justify-center text-blue-600">
            <HelpCircle size={20} />
          </div>
          <h3 className="font-bold text-slate-800 text-lg leading-tight">{q.question}</h3>
        </div>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctAnswer;
            const isSelected = i === selectedOption;
            let bgColor = "bg-white border-slate-100";
            if (isAnswered) {
              if (isCorrect) bgColor = "bg-green-50 border-green-200 text-green-700";
              else if (isSelected) bgColor = "bg-red-50 border-red-200 text-red-700";
            } else if (isSelected) {
              bgColor = "bg-blue-50 border-blue-200 text-blue-700";
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={isAnswered}
                className={`w-full p-5 rounded-2xl border text-left text-sm font-medium transition-all shadow-sm flex items-center justify-between ${bgColor}`}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="text-green-500 shrink-0" size={18} />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500 shrink-0" size={18} />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 text-xs leading-relaxed text-blue-800">
              <span className="font-black uppercase tracking-widest block mb-1">Explication :</span>
              {q.explanation}
            </div>
            <button
              onClick={nextQuestion}
              className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 shadow-lg"
            >
              {currentIdx === questions.length - 1 ? "Voir les résultats" : "Question Suivante"} 
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Générateur de Quiz</h2>
        <p className="text-slate-500 text-sm">Pratique avec des questions personnalisées.</p>
      </div>

      <div className="bg-gradient-to-br from-indigo-500 to-blue-700 p-8 rounded-[40px] text-white space-y-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="bg-white/20 p-3 rounded-2xl w-fit">
            <Sparkles className="text-white" size={24} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-indigo-100">Sujet de révision</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Macroéconomie internationale, Droit des sociétés..."
              className="w-full bg-white/10 border-2 border-white/20 rounded-2xl py-4 px-5 text-white placeholder:text-indigo-200 focus:bg-white/20 focus:outline-none transition-all font-medium"
            />
          </div>
          <button
            onClick={startQuiz}
            disabled={!topic.trim()}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-400 text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-orange-900/20 active:scale-95 transition-all"
          >
            Lancer le Quiz IA
          </button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 uppercase tracking-widest text-xs">Sujets suggérés</h3>
        <div className="grid grid-cols-2 gap-3">
          {['Droit Civil', 'Finance', 'Logistique', 'Marketing'].map(s => (
            <button 
              key={s}
              onClick={() => setTopic(s)}
              className="p-4 bg-white border border-slate-100 rounded-3xl text-xs font-bold text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all text-left shadow-sm"
            >
              #{s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizView;
