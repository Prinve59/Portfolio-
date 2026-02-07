import React from "react";
import "./index.css";
function Education() {
  return (
    <div className="min-h-screen bg-[#070b1a] text-white relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <section className="relative z-10 py-20 px-6">
      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-14">
        <h2 className="text-5xl font-mono font-bold text-white relative inline-block overflow-hidden group cursor-pointer">
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">Education</span>
          <span className="absolute inset-0 bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </h2>
      </div>

      {/* Education Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
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

      {/* Short Profile */}
      <h2 className="text-5xl font-mono font-bold text-white text-center mt-24 mb-10 relative inline-block overflow-hidden group cursor-pointer mx-auto flex-center">
        <span className="relative z-10 group-hover:text-black transition-colors duration-300">Short Profile</span>
        <span className="absolute inset-0 bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </h2>

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        
        {/* Left Image/Gradient Card */}
        <div className="bg-gradient-to-br from-indigo-700 to-purple-700 rounded-3xl p-10 relative">
          <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 w-fit flex gap-4">
            <span className="text-emerald-400 font-medium">Professional</span>
            <span className="text-white/70">Personal</span>
          </div>

          <p className="mt-8 text-white/80">
            Passionate full-stack developer who enjoys building impactful and
            fun web apps.
          </p>
        </div>

        {/* Right Text Card */}
        <div className="border border-gray-700 rounded-3xl p-10 bg-[#0b1224]">
          <p className="text-2xl font-mono leading-relaxed">
            Fluent in English, <br />
            Passionate about Web Development, AI & building meaningful
            projects.
          </p>
        </div>
      </div>
      </section>

      {/* Coming Soon Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative inline-block">
            <h2 className="text-6xl font-mono font-bold text-white mb-6 animate-pulse">
              More Coming Soon...
            </h2>
            <div className="absolute -inset-4 bg-emerald-400/20 blur-xl rounded-full animate-pulse"></div>
          </div>
          
          <p className="text-gray-400 text-xl mt-8 mb-12">
            🚀 Building amazing features for you
          </p>

          <div className="flex justify-center gap-4">
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
    </div>
   
  )
}

export default Education
