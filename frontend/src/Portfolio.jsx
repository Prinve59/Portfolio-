import React from "react";
import "./index.css";
import { useScrollAnimation } from './useScrollAnimation';



export default function PortfolioHero() {
  const [heroRef, heroVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "https://drive.google.com/uc?export=download&id=1qahWSbLuB6Zu0HzGZndZX6JD-ACr6vBr"; // file URL
    link.download = "myresume.pdf"; // filename
    link.click();
  };
  return (
    <div className="min-h-screen bg-[#070b1a] text-white relative overflow-hidden ">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-[9vw] py-6 bg-[#070b1a]/70 backdrop-blur-lg border-b border-emerald-400/10" style={{ minHeight: "8rem" }}>

        <h1 className="relative inline-block overflow-hidden font-jetbrains text-[36px] font-semibold leading-[40px] text-white transition-colors duration-300 cursor-pointer group">
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">
            Prinve59 <span className="text-emerald-400 group-hover:text-black">.</span>
          </span>
          <span className="absolute inset-0 bg-emerald-400 w-0 group-hover:w-full transition-all duration-300 -z-10"></span>
        </h1>

        <div className="flex gap-6 items-center text-xl">
          <a href="#" className="hover:text-emerald-400">Personal</a>
          <a href="#" className="hover:text-emerald-400">Contact</a>
          <button className="bg-emerald-400 text-black px-4 py-2 rounded-full font-medium">
            English ▾
          </button>
        </div>
      </nav>

      {/* Blur separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>

      {/* Hero */}
      <section ref={heroRef} className={`relative z-10 grid md:grid-cols-2 gap-10 px-[9vw] py-14 items-center transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Left */}
        <div>
          <p className="text-gray-400 mb-2">Software Engineer</p>

          <h2 className="text-5xl md:text-6xl font-mono mb-4">
            Hello I'm
          </h2>

          <h1 className="text-5xl md:text-6xl font-bold text-emerald-400 leading-tight relative inline-block overflow-hidden
  font-jetbrains text-[36px] font-semibold leading-[40px]
  text-white hover:text-black
  transition-colors duration-300
  
  before:absolute before:inset-0
  before:bg-emerald-400
  before:w-0 hover:before:w-full
  before:transition-all before:duration-300
  before:-z-10
">
            Prince <br />
          </h1>

          <p className="text-gray-400 mt-6 max-w-lg">
            Full-Stack Developer | Django & ML Enthusiast | Building scalable and user-friendly web apps
          </p>

          <div className="flex gap-4 mt-8 items-center">
            <button className="border border-emerald-400 text-emerald-400 px-6 py-3 rounded-full hover:bg-emerald-400 hover:text-black transition" onClick={handleDownload}>
              VIEW CV →
            </button>

            {/* Socials */}
            <div className="flex gap-3">
              <a href="https://facebook.com/prinve599" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-emerald-400 rounded-full text-emerald-400 hover:bg-emerald-400 hover:text-black cursor-pointer transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com/prinve59_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-emerald-400 rounded-full text-emerald-400 hover:bg-emerald-400 hover:text-black cursor-pointer transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://linkedin.com/prinve59" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-emerald-400 rounded-full text-emerald-400 hover:bg-emerald-400 hover:text-black cursor-pointer transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="mailto:prinve59@gmail.com" className="w-10 h-10 flex items-center justify-center border border-emerald-400 rounded-full text-emerald-400 hover:bg-emerald-400 hover:text-black cursor-pointer transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
              <a href="https://github.com/prinve59" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-emerald-400 rounded-full text-emerald-400 hover:bg-emerald-400 hover:text-black cursor-pointer transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Avatar */}
        <div className="flex justify-center">
          <div className="relative w-96 h-96 rounded-full border-4 border-emerald-400 p-3 z-1000">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400 animate-spin-slow" />
            <img
              src="/LOGO.jpg"
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className={`relative z-10 grid grid-cols-2 md:grid-cols-4 gap-10 px-8 pb-16 text-center pt-[10vh] transition-all duration-700 ${statsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {[
          ["21", "Age"],
          ["1", "Year of experience"],
          ["8", "Projects worked on"],
          ["5", "Projects Deployed"],
        ].map(([num, label], i) => (
          <div key={i}>
            <h3 className="text-4xl font-bold">{num}</h3>
            <p className="text-gray-400 text-xl mt-2">{label}</p>
          </div>
        ))}
      </section>

      {/* Custom animation */}
      <style>
        {`
          .animate-spin-slow {
            animation: spin 12s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg);}
            to { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}
