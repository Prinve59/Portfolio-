import React, { useState, useEffect } from 'react';

export default function Navbar() {
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col md:flex-row justify-between items-center px-4 md:px-[9vw] py-4 md:py-6 bg-[#070b1a]/60 backdrop-blur-lg border-b border-emerald-400/10 gap-4 md:gap-0">
            <h1 className="relative inline-block overflow-hidden font-jetbrains text-2xl md:text-[36px] font-semibold text-white transition-colors duration-300 cursor-pointer group">
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Prinve59 <span className="text-emerald-400 group-hover:text-black">.</span>
            </span>
            <span className="absolute inset-0 bg-emerald-400 w-0 group-hover:w-full transition-all duration-300 -z-10"></span>
            </h1>
            <div className="flex gap-3 md:gap-6 items-center text-sm md:text-xl text-white">
            <a href="#" className="hover:text-emerald-400">Personal</a>
            <a href="#" className="hover:text-emerald-400">Contact</a>
            <button className="bg-emerald-400 text-black px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium text-sm md:text-base">
                English ▾
            </button>
            </div>
        </nav>
    </>
    );
}