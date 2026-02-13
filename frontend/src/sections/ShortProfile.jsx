import React, { useContext } from "react";
// import "./index.css";
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { LanguageContext } from '../LanguageContext';
export default function ShortProfile() {
        const [profileRef, profileVisible] = useScrollAnimation();
        const [comingSoonRef, comingSoonVisible] = useScrollAnimation();
        const { t } = useContext(LanguageContext);
    return (
    <>
    <section className="relative z-10 py-20 px-6">
        {/* Short Profile */}
      <div className="flex justify-center w-full">
        <h2 className="text-5xl font-mono font-bold text-white mt-24 mb-10 relative inline-block overflow-hidden group cursor-pointer">
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">{t('profile.title')}</span>
          <span className="absolute inset-0 bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </h2>
      </div>
      

      {/* Profile Card */}
        <div ref={profileRef} className={`max-w-5xl mx-auto grid md:grid-cols-2 gap-10 transition-all duration-700 ${profileVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Left Image/Gradient Card */}
        <div className="bg-gradient-to-br from-indigo-700 to-purple-700 rounded-3xl p-10 relative">
          <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 w-fit flex gap-4">
            <span className="text-emerald-400 font-medium">{t('profile.professional_tab')}</span>
            <span className="text-white/70">{t('profile.personal_tab')}</span>
          </div>

          <p className="mt-8 text-white/80">
            {t('profile.professional_text')}
          </p>
        </div>

        {/* Right Text Card */}
        <div className="border border-gray-700 rounded-3xl p-10 bg-[#0b1224]">
          <p className="text-2xl font-mono leading-relaxed">
            {t('profile.personal_text')}
          </p>
        </div>
      </div>
      </section>

      {/* Coming Soon Section */}
      <section ref={comingSoonRef} className={`relative z-10 py-20 px-6 transition-all duration-700 ${comingSoonVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="max-w-4xl mx-auto text-center pb-16">
          <div className="relative inline-block">
            <h2 className="text-6xl font-mono font-bold text-white mb-6 animate-pulse">
              {t('extra.coming_soon')}
            </h2>
            <div className="absolute -inset-4 bg-emerald-400/20 blur-xl rounded-full animate-pulse"></div>
          </div>
          
          <p className="text-gray-400 text-xl mt-8 mb-12">
            {t('extra.building')}
          </p>

          <div className="flex justify-center gap-4 ">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-4 h-4 bg-emerald-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </section>
    </>
    );
}