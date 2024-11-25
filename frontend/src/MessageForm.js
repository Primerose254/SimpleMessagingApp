// frontend/src/MessageForm.js
import React, { useState } from 'react';

const MessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit} className="message-form">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default MessageForm;
