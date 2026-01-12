import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { UserProfile } from '../types';

interface ChatOverlayProps {
  user: UserProfile;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatOverlay: React.FC<ChatOverlayProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Hey ${user.name}! I'm Milo. Ready to optimize your ${user.goal.replace('_', ' ')} plan? Ask me anything!` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini Chat Session
  useEffect(() => {
    if (isOpen && !chatSessionRef.current) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatSessionRef.current = ai.chats.create({
                model: 'gemini-3-flash-preview',
                config: {
                    systemInstruction: `You are Milo, an elite, encouraging, and data-driven running coach. 
                    
                    User Profile:
                    - Name: ${user.name}
                    - Experience Level: ${user.level}
                    - Primary Goal: ${user.goal}
                    
                    Your capabilities:
                    1. Provide specific workout advice (intervals, tempo, long runs).
                    2. Adjust weekly plans if the user is tired or injured.
                    3. Offer nutrition and recovery tips suitable for runners.
                    4. Be concise, use motivating language, and runner terminology (e.g., negative splits, cadence, VO2 max).
                    
                    Tone: Professional, warm, and energetic. Use emojis sparingly.`
                }
            });
        } catch (e) {
            console.error("Failed to init AI", e);
        }
    }
  }, [isOpen, user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
        if (!chatSessionRef.current) {
             const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
             chatSessionRef.current = ai.chats.create({ model: 'gemini-3-flash-preview' });
        }
        
        const response: GenerateContentResponse = await chatSessionRef.current.sendMessage({ message: userMsg });
        const text = response.text || "I'm analyzing your request... one sec.";
        setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
        console.error("Chat error:", error);
        setMessages(prev => [...prev, { role: 'model', text: "I hit a wall. Can you check your connection?" }]);
    } finally {
        setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
        <button 
            onClick={() => setIsOpen(true)}
            className="fixed bottom-28 right-6 size-14 bg-ink text-white rounded-2xl shadow-2xl flex items-center justify-center z-50 hover:scale-105 transition-transform border border-white/20 group"
        >
            <span className="material-symbols-outlined text-3xl icon-filled group-hover:rotate-12 transition-transform">smart_toy</span>
            <span className="absolute -top-1 -right-1 size-3 bg-primary rounded-full border-2 border-bg-page animate-pulse"></span>
        </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end sm:justify-center sm:items-end pointer-events-none">
        {/* Backdrop for mobile */}
        <div className="absolute inset-0 bg-ink/20 backdrop-blur-sm sm:hidden pointer-events-auto" onClick={() => setIsOpen(false)}></div>
        
        {/* Chat Window */}
        <div className="pointer-events-auto w-full h-[85vh] sm:h-[600px] sm:w-[400px] sm:mr-6 sm:mb-28 bg-[#F5F4F0] sm:rounded-[2rem] rounded-t-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-slide-up border border-white/50 relative">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-md border-b border-ink/5 z-10">
                <div className="flex items-center gap-4">
                    <div className="size-12 bg-ink text-white rounded-full flex items-center justify-center shadow-lg shadow-ink/20">
                         <span className="material-symbols-outlined icon-filled text-2xl">smart_toy</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-ink text-lg leading-none mb-1">Milo</h3>
                        <span className="text-[10px] uppercase font-bold text-primary tracking-widest flex items-center gap-1.5">
                            <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            AI Coach Active
                        </span>
                    </div>
                </div>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="size-10 flex items-center justify-center rounded-full bg-bg-base hover:bg-ink/10 text-ink transition-colors"
                >
                    <span className="material-symbols-outlined">expand_more</span>
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-[#F5F4F0] scroll-smooth">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                        <div className={`max-w-[85%] p-5 text-[15px] leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                            ? 'bg-ink text-white rounded-[1.5rem] rounded-tr-sm' 
                            : 'bg-white text-ink rounded-[1.5rem] rounded-tl-sm border border-stone-border/20'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex justify-start animate-fade-in">
                        <div className="bg-white px-5 py-4 rounded-[1.5rem] rounded-tl-sm border border-stone-border/20 shadow-sm flex items-center gap-1.5">
                            <span className="size-1.5 bg-ink/40 rounded-full animate-bounce"></span>
                            <span className="size-1.5 bg-ink/40 rounded-full animate-bounce delay-100"></span>
                            <span className="size-1.5 bg-ink/40 rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-ink/5 pb-8 sm:pb-4">
                <div className="flex items-end gap-2 bg-bg-page p-2 pr-2 rounded-[2rem] border border-ink/5 focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-inner">
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Ask Milo for advice..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-ink placeholder:text-ink/40 pl-5 py-3 resize-none max-h-32 min-h-[50px] text-base"
                        rows={1}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="size-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20 disabled:opacity-50 hover:scale-105 active:scale-95 transition-all mb-0.5"
                    >
                        <span className="material-symbols-outlined icon-filled text-2xl">arrow_upward</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ChatOverlay;