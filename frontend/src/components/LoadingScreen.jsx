import React, { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#070b1a] flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <h1 className="text-6xl font-mono font-bold text-white mb-8 animate-pulse">
            Prinve59<span className="text-emerald-400">.</span>
          </h1>
          <div className="absolute -inset-8 bg-emerald-400/20 blur-3xl rounded-full animate-pulse"></div>
        </div>
        
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
