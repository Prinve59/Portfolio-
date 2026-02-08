import React from 'react';
export default function Back({ children }) {
    return (
        <div className="min-h-screen bg-[#070b1a] text-white relative overflow-hidden">
      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
      </div>
    );
}