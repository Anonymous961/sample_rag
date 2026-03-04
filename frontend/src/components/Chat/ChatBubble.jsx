import React from 'react';

const ChatBubble = ({ message }) => {
    const isUser = message.sender === 'user';

    return (
        <div className={`flex flex-col max-w-[80%] animate-slide-in-up ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
            <div
                className={`px-5 py-4 text-[0.95rem] leading-relaxed shadow-[0_4px_15px_rgba(0,0,0,0.1)] ${isUser
                        ? 'bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-2xl rounded-br-sm'
                        : 'bg-gray-800/80 border border-white/5 text-gray-100 rounded-2xl rounded-bl-sm'
                    }`}
            >
                {message.text}
            </div>
            <div className="text-xs text-gray-400 mt-1.5 px-1 mx-1">{message.timestamp}</div>
        </div>
    );
};

export default ChatBubble;
