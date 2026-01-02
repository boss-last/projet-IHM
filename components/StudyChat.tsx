
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import { getStudyBuddyResponse } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const StudyChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Salut Jean ! Je suis ton assistant de révision IUA. Quelle notion souhaites-tu approfondir aujourd'hui ?", sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getStudyBuddyResponse(input);
    const botMsg: Message = { id: (Date.now() + 1).toString(), text: response || "Erreur", sender: 'bot', timestamp: new Date() };
    
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-50 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Chat Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-orange-500' : 'bg-blue-600'}`}>
                {msg.sender === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
              </div>
              <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-orange-500 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-2 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-blue-600" />
                <span className="text-xs text-slate-400 italic">L'IA réfléchit...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pose ta question (ex: 'Explique-moi la théorie du mandat')..."
            className="w-full bg-slate-100 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none pr-10"
          />
          <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400" size={16} />
        </div>
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 text-white w-10 h-10 rounded-2xl flex items-center justify-center transition-colors shadow-lg shadow-blue-200"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default StudyChat;
