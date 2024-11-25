// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import './styles.css';

const socket = io('http://localhost:4000');

const App = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    const sendMessage = (message) => {
        socket.emit('sendMessage', message);
    };

    return (
        <div className="app">
            <h1>Blockchain Messaging App</h1>
            <MessageList messages={messages} />
            <MessageForm sendMessage={sendMessage} />
        </div>
    );
};

export default App;
