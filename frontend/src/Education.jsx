import React from "react";
import "./index.css";
import { useScrollAnimation } from './useScrollAnimation';

function Education() {
  const [cardsRef, cardsVisible] = useScrollAnimation();

  return (
      <section className="relative z-10 py-20 px-6">
      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-14">
        <h2 className="text-5xl font-mono font-bold text-white relative inline-block overflow-hidden group cursor-pointer">
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">Education</span>
          <span className="absolute inset-0 bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </h2>
      </div>

      {/* Education Cards */}
      <div ref={cardsRef} className={`grid md:grid-cols-3 gap-8 max-w-7xl mx-auto transition-all duration-700 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Card 1 */}
        <div className="border border-gray-700 rounded-2xl p-8 bg-[#0b1224] hover:border-emerald-400 transition">
          <h3 className="text-xl font-semibold mb-2">
            High School Certificate
          </h3>

          <p className="text-gray-400 mb-4">
            Apr 2019 - Mar 2020
            <span className="l-0 text-emerald-400 ml-4">🎓 86.4%</span>
          </p>

          <p className="text-gray-500">
            Army Public School Patiala Cantt - Honorary Student
          </p>
        </div>
        <div className="border border-gray-700 rounded-2xl p-8 bg-[#0b1224] hover:border-emerald-400 transition">
          <h3 className="text-xl font-semibold mb-2">
            Inter School Certificate
          </h3>

          <p className="text-gray-400 mb-4">
            Apr 2021 - Jun 2022
            <span className="text-emerald-400 ml-4">🎓 81%</span>
          </p>

          <p className="text-gray-500">
            Army Public School Jhansi Cantt - Honorary Student
          </p>
        </div>

        {/* Card 2 */}
        <div className="border border-gray-700 rounded-2xl p-8 bg-[#0b1224] hover:border-emerald-400 transition">
          <h3 className="text-xl font-semibold mb-2">
            B.Tech in Computer Science
          </h3>

          <p className="text-gray-400 mb-4">
            2023 - 2027
            <span className="text-emerald-400 ml-4">🎓 8.0 CGPA</span>
          </p>

          <p className="text-gray-500">
            KIET Group of Institutions
          </p>
        </div>
      </div>
      </section>
  
      
      
   
  )
}

export default Education
