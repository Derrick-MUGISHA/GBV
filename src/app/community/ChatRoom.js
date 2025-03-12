"use client";
import { useState, useEffect } from 'react';
import { db, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from '../lib/firebase';

export default function ChatRoom({ groupId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderName, setSenderName] = useState('Anonymous');

  // Fetch messages in real-time
  useEffect(() => {
    const messagesRef = collection(db, 'groups', groupId, 'messages');
    const q = query(messagesRef, orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate().toLocaleString()
      }));
      setMessages(messagesData);
    });
    return () => unsubscribe();
  }, [groupId]);

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messagesRef = collection(db, 'groups', groupId, 'messages');
    await addDoc(messagesRef, {
      text: newMessage,
      sender: senderName,
      timestamp: serverTimestamp()
    });
    setNewMessage('');
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <input
        type="text"
        placeholder="Your name (optional)"
        value={senderName}
        onChange={(e) => setSenderName(e.target.value)}
      />
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.sender}: </strong>
            {msg.text} <em>({msg.timestamp})</em>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}