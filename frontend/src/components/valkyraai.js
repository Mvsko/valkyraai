import React, { useEffect, useState, useRef } from 'react'; 
import { Link } from 'react-router-dom';
import '../styles/valkyraai.css';
import axios from 'axios';

function ValkyraAI() {
    const [loading, setLoading] = useState(true);
    const [webhookUrl, setWebhookUrl] = useState('');
    const [inputValue, setInputValue] = useState('');
    const textAreaRef = useRef(null);
    const [isSending, setIsSending] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Bienvenue dans le chatbot Valkyra ! Comment puis-je vous aider aujourd'hui ?", from: 'bot' },
    ]);


    useEffect(() => {
        const fetchConfig = async () => {
            const response = await axios.get('http://localhost:5000/api/config');
            setWebhookUrl(response.data.webhookUrl);
        };
        fetchConfig();
    }, []);
    
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

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            setIsSending(true);
            const userMessage = { id: Date.now(), text: inputValue, from: 'user' };
            setMessages([...messages, userMessage]);
            const startTime = Date.now();

            try {
                const apiResponse = await axios.post('http://localhost:5000/api/message', { message: inputValue });
                console.log("Réponse de l'API:", apiResponse.data);
                const id = apiResponse.data.id || "None";
                const generatedText = apiResponse.data.generatedText || "Pas de texte généré";
                const status = apiResponse.data.status || "Inconnu";
                const provider = apiResponse.data.provider || "Inconnu";
                const cost = apiResponse.data.cost || 0;


                const endTime = Date.now();
                const responseTime = endTime - startTime;
                const discordPayload = {
                    embeds: [
                        {
                            title: "Nouveau Message",
                            description: `+ **User:** ${inputValue}\n+ **Bot:** ${generatedText}`,
                            color: 0xFFC300,
                            timestamp: new Date(),
                            footer: {
                                text: "Valkyra AI",
                                icon_url: "https://media.discordapp.net/attachments/1300692143312080926/1300812745326727268/valkyra-logo.png?ex=672233c6&is=6720e246&hm=c341e6fe0d5ba359f47e86428809a5c34c9c167163589d4fe7090103b9bf94ed&=&format=webp&quality=lossless&width=671&height=671"
                            },
                            fields: [
                                {
                                    name: "Informations",
                                    value: `\`\`\`ID: ${id}\nTemps de réponse: ${responseTime} ms\nStatus: ${status}\nProvider: ${provider}\nCost: ${cost}\n\`\`\``,
                                    inline: false
                                }
                            ]
                        }
                    ]
                };
                
                
                fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(discordPayload)
                }).then(response => {
                    if (!response.ok) {
                        console.error("Erreur lors de l'envoi au webhook:", response.statusText);
                    }
                }).catch(error => {
                    console.error("Erreur lors de l'envoi au webhook:", error);
                });

                const botMessage = { id: Date.now() + 2, text: generatedText, from: 'bot' };
                setMessages(prevMessages => [...prevMessages, botMessage]);

            } catch (error) {
                console.error("Erreur lors de la récupération de la réponse de l'API:", error);
                const discordPayload = {
                    embeds: [
                        {
                            title: "Erreur",
                            description: `+ **User:** ${inputValue}\n+ **Bot:** Une erreur s'est produite lors de l'appel de l'API.`,
                            color: 0xD21F3C,
                            fields: [
                                {
                                    name: "Détails de l'erreur",
                                    value: error.response ? JSON.stringify(error.response.data) : "Erreur inconnue"
                                }
                            ],
                            timestamp: new Date(),
                            footer: {
                                text: "Valkyra AI",
                                icon_url: "https://media.discordapp.net/attachments/1300692143312080926/1300812745326727268/valkyra-logo.png?ex=672233c6&is=6720e246&hm=c341e6fe0d5ba359f47e86428809a5c34c9c167163589d4fe7090103b9bf94ed&=&format=webp&quality=lossless&width=671&height=671"
                            }
                        }
                    ]
                };
                fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(discordPayload)
                });
            }
            setInputValue('');
            textAreaRef.current.style.height = 'auto';
            setIsSending(false);
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
                            disabled={isSending}
                        />
                        <button className="send-button" onClick={handleSendMessage} disabled={isSending}>
                            <i className='bx bx-paper-plane'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ValkyraAI;
