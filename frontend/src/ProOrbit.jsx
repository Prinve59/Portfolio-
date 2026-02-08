import React from 'react';

export default function ProOrbit({ children, size = 'w-64 h-64 md:w-96 md:h-96' }) {
  return (
    <div className={`relative ${size}`}>
      {/* Outer orbit ring */}
      <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-spin-slow" 
           style={{ animationDuration: '20s' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
      </div>
      
      {/* Middle orbit ring */}
      <div className="absolute inset-4 rounded-full border-2 border-emerald-400/50 animate-spin-reverse" 
           style={{ animationDuration: '15s' }}>
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-emerald-300 rounded-full shadow-lg shadow-emerald-300/50"></div>
      </div>
      
      {/* Inner orbit ring */}
      <div className="absolute inset-8 rounded-full border-2 border-emerald-400/70 animate-spin-slow" 
           style={{ animationDuration: '10s' }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></div>
      </div>
      
      {/* Center content */}
      <div className="absolute inset-12 rounded-full border-4 border-emerald-400 p-3 bg-[#070b1a] overflow-hidden">
        {children}
      </div>
    </div>
  );
}
