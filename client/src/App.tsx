import { useState, useEffect } from 'react'
import {useSocket} from './hooks/useSocket';
import './App.css'

interface Message {
  id: string;
  text: string;
  timestamp: number;
} 

function App() {

  const {socket, isConnected} = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (!socket) return;

    socket.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = () => {
     if (!socket || !inputValue.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: inputValue,
      timestamp: Date.now(),
    };

    socket.emit('message', message);
    setInputValue('');
  }

  return (
   <div className="App">
      <h1>LetsTalk 💬</h1>
      
      <div className="status">
        Status: {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
      </div>

      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <span>{msg.text}</span>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage} disabled={!isConnected}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default App;