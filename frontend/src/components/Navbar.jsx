import React, { useState, useEffect } from 'react';

export default function Navbar() {
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [selectedLang, setSelectedLang] = useState('English');
    const [selectedFlag, setSelectedFlag] = useState('us');

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
            <div className="relative">
                <button 
                    onClick={() => setShowLangDropdown(!showLangDropdown)}
                    className="bg-emerald-400 text-black px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium text-sm md:text-base flex items-center gap-2">
                    <img src={`https://flagcdn.com/16x12/${selectedFlag}.png`} alt="flag" className="w-4 h-3" />
                    {selectedLang} ▾
                </button>
                {showLangDropdown && (
                    <div className="absolute top-full mt-2 right-0 bg-[#0b1224] text-sm border border-emerald-400/30 rounded-lg overflow-hidden min-w-[140px]">
                        <button onClick={() => { setSelectedLang('English'); setSelectedFlag('us'); setShowLangDropdown(false); }} className="w-full px-4 py-2 text-left hover:bg-emerald-400/20 transition flex items-center gap-2">
                            <img src="https://flagcdn.com/16x12/us.png" alt="US" className="w-4 h-3" /> English
                        </button>
                        <button onClick={() => { setSelectedLang('Hindi'); setSelectedFlag('in'); setShowLangDropdown(false); }} className="w-full px-4 py-2 text-left hover:bg-emerald-400/20 transition flex items-center gap-2">
                            <img src="https://flagcdn.com/16x12/in.png" alt="IN" className="w-4 h-3" /> Hindi
                        </button>
                    </div>
                )}
            </div>
            </div>
        </nav>
    </>
    );
}