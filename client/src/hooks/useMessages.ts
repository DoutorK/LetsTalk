import { useState, useEffect, useCallback } from 'react';
import { useSocket } from './useSocket';

interface Message {
  id: string;
  text: string;
  timestamp: number;
}

export const useMessages = () => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [socket]);

  const sendMessage = useCallback((text: string) => {
    if (!socket || !text.trim()) return;
    const message: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, message]);

    socket.emit('message', message);
  }, [socket]);

  return { messages, sendMessage };
};