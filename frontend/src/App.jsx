import React from 'react';
import './index.css';

import Header from './components/Layout/Header';
import ChatBubble from './components/Chat/ChatBubble';
import ChatInput from './components/Chat/ChatInput';
import TypingIndicator from './components/Chat/TypingIndicator';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isTyping, messagesEndRef, sendMessage } = useChat();

  return (
    <div className="min-h-screen bg-[#0b0f19] flex justify-center items-center p-4 sm:p-8 overflow-hidden relative text-gray-100 font-sans font-['Inter']">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[50%] left-[15%] w-96 h-96 bg-purple-600/15 rounded-full blur-[100px] -translate-y-1/2"></div>
        <div className="absolute top-[30%] left-[85%] w-[28rem] h-[28rem] bg-pink-500/15 rounded-full blur-[120px] -translate-x-1/2"></div>
      </div>

      <div className="w-full max-w-[900px] h-[90vh] max-h-[800px] bg-gray-900/70 backdrop-blur-xl border border-white/5 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col relative z-10 animate-fade-in-up">
        {/* Header Component */}
        <Header />

        {/* Chat Messages Container */}
        <div className="flex-1 p-8 overflow-y-auto flex flex-col gap-6 scroll-smooth">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}

          {isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Component */}
        <ChatInput onSendMessage={sendMessage} isTyping={isTyping} />
      </div>
    </div>
  );
}

export default App;
