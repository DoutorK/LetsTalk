import { useState } from 'react';
import { useSocket } from './hooks/useSocket';
import { useMessages } from './hooks/useMessages';
import './App.css';

function App() {
  const { isConnected } = useSocket();
  const { messages, sendMessage } = useMessages(); 
  const [inputValue, setInputValue] = useState<string>('');

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

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
            <small>{new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</small>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleSend} disabled={!isConnected}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default App;