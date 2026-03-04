import React from 'react';

const TypingIndicator = () => {
    return (
        <div className="flex flex-col max-w-[80%] self-start items-start animate-fade-in">
            <div className="flex gap-1.5 px-5 py-4.5 bg-gray-800/80 border border-white/5 rounded-2xl rounded-bl-sm items-center h-12">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-duration:1.4s] [animation-delay:-0.32s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-duration:1.4s] [animation-delay:-0.16s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-duration:1.4s]"></div>
            </div>
        </div>
    );
};

export default TypingIndicator;
