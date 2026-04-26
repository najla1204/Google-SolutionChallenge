"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am the ImpactFlow AI. I can help you find urgent needs, match volunteers, or answer questions about the platform. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch');
      }

      const data = await response.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      }
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, I'm having trouble connecting right now. ${error.message || ''}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-black text-white rounded-none border-2 border-brand flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-8 h-8 text-brand" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] h-[600px] max-h-[85vh] bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col z-50 animate-in slide-in-from-bottom-4 fade-in duration-200">
          {/* Header */}
          <div className="p-4 bg-black text-white flex items-center justify-between border-b-2 border-brand">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-brand" />
              <h3 className="font-black italic uppercase tracking-widest text-sm">ImpactFlow AI</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:text-brand transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50 relative">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-none border-2 border-black flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-brand text-white' : 'bg-black text-white'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-brand" />}
                </div>
                <div className={`p-4 border-2 border-black text-sm font-bold leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                  msg.role === 'user' ? 'bg-white text-black' : 'bg-white text-black'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 max-w-[90%]">
                <div className="w-10 h-10 rounded-none border-2 border-black flex-shrink-0 flex items-center justify-center bg-black text-white">
                  <Bot className="w-5 h-5 text-brand animate-pulse" />
                </div>
                <div className="p-4 border-2 border-black bg-white flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Loader2 className="w-5 h-5 animate-spin text-brand" />
                  <span className="text-xs font-black uppercase tracking-widest text-black/50">Analyzing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-1" />
          </div>

          {/* Input Area */}
          <form onSubmit={sendMessage} className="p-4 bg-white border-t-2 border-black relative">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about urgent needs..."
                className="flex-1 border-2 border-black bg-slate-50 p-4 text-sm font-bold outline-none focus:border-brand transition-colors"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-14 h-14 bg-brand text-white border-2 border-black flex items-center justify-center hover:bg-black hover:text-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-3 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Powered by Groq</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
