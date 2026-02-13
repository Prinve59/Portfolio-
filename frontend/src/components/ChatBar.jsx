import React, { useState, useContext } from 'react';
import { LanguageContext } from '../LanguageContext';

export default function ChatBar() {
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const { t } = useContext(LanguageContext);

  const handleSend = () => {
    if (message.trim()) {
      setShowPopup(true);
      setMessage('');
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-[#0b1224] border-t border-emerald-400/30 p-4 z-40">
        <div className="max-w-4xl mx-auto flex gap-3">
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
            className="bg-emerald-400 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            {t('chat.send')}
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-[#0b1224] border-2 border-emerald-400 rounded-2xl p-8 text-center animate-bounce">
            <h2 className="text-3xl font-bold text-emerald-400 mb-2">{t('chat.soon')}</h2>
            <p className="text-gray-400">{t('chat.development')}</p>
          </div>
        </div>
      )}
    </>
  );
}
