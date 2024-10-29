import React, { useEffect, useState, useRef } from 'react'; 
import { Link } from 'react-router-dom';
import '../styles/valkyraai.css';

function ValkyraAI() {
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const textAreaRef = useRef(null);
  const [messages, setMessages] = useState([
    { id: 1, text: "Bienvenue dans le chatbot Valkyra ! Comment puis-je vous aider aujourd'hui ?", from: 'bot' },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputValue, from: 'user' }]);
      setInputValue('');
      textAreaRef.current.style.height = 'auto';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Chargement...</h2>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="app-sidebar">
          <h2 className="app-name">Valkyra AI</h2>
          <Link className="app-sidebar-link" to="/">Accueil</Link>
          <a className="app-sidebar-link" href="#new-prompt">Générer</a>
          <a className="app-sidebar-link" href="#settings">Réglages</a>
          <a className="app-sidebar-link" href="#help">Aide</a>
          <div className="sidebar-historique">
            <h4>Historique</h4>
          </div>
        </div>

        <div className="chat-section">
          <div className="messages-section">
            {messages.map((message) => (
              <div key={message.id} className={`message-box ${message.from}`}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          <div className="input-section">
            <button className="file-button">
              <i className='bx bx-paperclip'></i>
            </button>
            <textarea
              className="input-message"
              placeholder="Tapez votre message..."
              rows="1"
              maxLength={8192}
              value={inputValue}
              ref={textAreaRef}
              onChange={(e) => {
                setInputValue(e.target.value);
                handleInput(e);
              }}
            />
            <button className="send-button" onClick={handleSendMessage}>
              <i className='bx bx-paper-plane'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValkyraAI;
