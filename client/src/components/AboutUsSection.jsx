import React from 'react';
import { ShieldCheck, HeartHandshake, Users } from 'lucide-react';

export default function AboutUsSection() {
  return (
    <section className="w-full bg-[#1e4620] text-white py-16 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Decorative background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Section Heading with Accent Highlight */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            About <span className="text-lime-400">Us</span>
          </h2>
          <div className="w-20 h-1 bg-lime-400 mx-auto rounded-full" />
        </div>

        {/* Intro Paragraph */}
        <p className="text-center text-emerald-100 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
          Barangay Ungka II is a growing and vibrant community committed to providing accessible, responsive, and reliable services to its residents. Through the efforts of its barangay officials, health center personnel, and community workers, the barangay strives to address the needs of every resident and promote the overall welfare of the community.
        </p>

        {/* Key Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-all space-y-3">
            <div className="w-12 h-12 bg-lime-400/20 text-lime-400 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Efficient Service</h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Focusing on public service, health, safety, and community development to deliver reliable support.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-all space-y-3">
            <div className="w-12 h-12 bg-lime-400/20 text-lime-400 rounded-xl flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Digital Innovation</h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Embracing digital solutions like UServe to make barangay and health center services seamless to access.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-all space-y-3">
            <div className="w-12 h-12 bg-lime-400/20 text-lime-400 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Connected Community</h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Connecting residents directly with local officials to access essential assistance faster.
            </p>
          </div>

        </div>

        {/* Closing Mission Statement Card */}
        <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-2xl p-6 sm:p-8 text-center max-w-3xl mx-auto shadow-inner">
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-medium">
            Together, Barangay Ungka II and its residents work toward building a safe, healthy, inclusive, and progressive community where everyone can receive the support and services they deserve.
          </p>
        </div>

      </div>
    </section>
  );
}