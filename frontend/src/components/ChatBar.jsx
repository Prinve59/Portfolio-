import React, { useState, useContext, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { LanguageContext } from '../LanguageContext';

const BACKEND_URL ='http://204.48.16.29';

export default function ChatBar() {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useContext(LanguageContext);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    const query = message.trim();
    if (!query || loading) return;
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setMessage('');
    setIsOpen(true);
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/ask/?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.answer || data.error }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: t('chat.error') }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Messages panel - slides up above the bar when open */}
      {isOpen && (
        <div className="fixed bottom-[72px] left-0 right-0 z-40 bg-[#0b1224] border-t border-emerald-400/30 flex flex-col" style={{ height: '20vh' }}>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-gray-500 text-sm text-center mt-8">{t('chat.empty')}</p>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-emerald-400 text-black rounded-br-none'
                    : 'bg-[#111827] text-gray-200 border border-gray-700 rounded-bl-none'
                }`}>
                  {msg.role === 'bot' ? (
                    <ReactMarkdown
                      components={{
                        a: ({ href, children }) => (
                          <a href={href} target="_blank" rel="noreferrer" className="text-emerald-400 underline">{children}</a>
                        ),
                        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                      }}
                    >{msg.text}</ReactMarkdown>
                  ) : msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#111827] border border-gray-700 px-4 py-2 rounded-2xl rounded-bl-none">
                  <span className="text-emerald-400 text-sm animate-pulse">{t('chat.thinking')}</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      )}

      {/* Bottom bar - always visible */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0b1224] border-t border-emerald-400/30 p-4 z-50">
        <div className="max-w-4xl mx-auto flex gap-3 items-center">
          <button
            onClick={() => setIsOpen(o => !o)}
            className="text-emerald-400 text-xl hover:scale-110 transition"
            title={isOpen ? 'Close chat' : 'Open chat'}
          >
            {isOpen ? '✕' : '💬'}
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chat.prompt')}
            className="flex-1 bg-[#070b1a] text-white px-6 py-3 rounded-full border border-gray-700 focus:border-emerald-400 focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-emerald-400 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            {t('chat.send')}
          </button>
        </div>
      </div>
    </>
  );
}
