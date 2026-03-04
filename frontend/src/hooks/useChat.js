import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/api';

export const useChat = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: 'Hello! I am a sample RAG chatbot powered by FastAPI and React. How can I help you today?',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const sendMessage = async (text) => {
        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: text.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMsg]);
        setIsTyping(true);

        try {
            const data = await sendChatMessage(userMsg.text);

            const botMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: data.response,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error("Error communicating with backend:", error);
            const errorMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: 'Sorry, I am having trouble connecting to the server. Is the FastAPI backend running?',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return {
        messages,
        isTyping,
        messagesEndRef,
        sendMessage
    };
};
