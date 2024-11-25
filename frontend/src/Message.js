// frontend/src/Message.js
import React from 'react';
import './styles.css';

const Message = ({ message }) => (
    <div className="message">
        <div className="message-content">{message}</div>
    </div>
);

export default Message;
