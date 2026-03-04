import React, { useState, useRef } from 'react';

const ChatInput = ({ onSendMessage, isTyping }) => {
    const [inputValue, setInputValue] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping || isUploading) return;

        onSendMessage(inputValue);
        setInputValue('');
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset the input value so the same file can be selected again
        e.target.value = null;

        if (file.type !== 'application/pdf' && file.type !== 'text/plain') {
            alert('Only PDF and TXT files are supported.');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            // Add a visual notification of success
            alert('Knowledge Base trained successfully!');

        } catch (error) {
            alert(error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="p-6 sm:px-8 sm:py-6 bg-gray-900/60 border-t border-white/5 rounded-b-3xl shrink-0">
            <form
                onSubmit={handleSubmit}
                className="flex items-center bg-black/20 border border-white/5 rounded-full px-2 py-2 pl-4 transition-all duration-300 focus-within:border-purple-500/50 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
            >
                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.txt"
                    className="hidden"
                />

                {/* Upload Button */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="p-2 text-gray-400 hover:text-purple-400 transition-colors mr-2 disabled:opacity-50"
                    title="Upload Document"
                >
                    {isUploading ? (
                        <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <svg className="w-5 h-5 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                        </svg>
                    )}
                </button>

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={isUploading ? "Training knowledge base..." : "Type your message here..."}
                    disabled={isTyping || isUploading}
                    className="flex-1 bg-transparent border-none text-gray-100 text-base font-['Inter'] outline-none placeholder:text-gray-500/60"
                    autoFocus
                />
                <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-br from-purple-500 to-purple-700 text-white border-none w-11 h-11 rounded-full flex justify-center items-center shrink-0 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] active:scale-95 disabled:opacity-50 disabled:bg-gray-500 disabled:hover:scale-100 disabled:hover:shadow-none disabled:cursor-not-allowed"
                    aria-label="Send message"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
