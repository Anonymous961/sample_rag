// Create an Axios instance or use fetch wrapper for API calls
const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const sendChatMessage = async (messageText) => {
    const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
    });

    if (!response.ok) {
        throw new Error('Network error');
    }

    // Currently we use a standard JSON response for simplicity.
    // We can easily upgrade this fetch call to handle ReadableStream for streaming
    return await response.json();
};
