
import React, { useState } from 'react';

export default function SplashScreen() {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-starry-sky font-lato text-white">
      {/* Stars Background */}
      <div className="absolute inset-0 z-0">
        <div className="star w-1 h-1 top-1/4 left-1/4" style={{"--duration": "3s", "--delay": "0s", "--opacity": "0.8"} as React.CSSProperties}></div>
        <div className="star w-0.5 h-0.5 top-1/3 left-3/4" style={{"--duration": "4s", "--delay": "1s", "--opacity": "0.6"} as React.CSSProperties}></div>
        <div className="star w-1 h-1 top-3/4 left-1/3" style={{"--duration": "5s", "--delay": "2s", "--opacity": "0.9"} as React.CSSProperties}></div>
        <div className="star w-0.5 h-0.5 top-10 left-10" style={{"--duration": "2.5s", "--delay": "0.5s", "--opacity": "0.7"} as React.CSSProperties}></div>
        <div className="star w-1 h-1 bottom-1/4 right-1/4" style={{"--duration": "3.5s", "--delay": "1.5s", "--opacity": "0.8"} as React.CSSProperties}></div>
      </div>

      {/* Rotating Rings */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[120vw] h-[120vw] md:w-[80vh] md:h-[80vh] rounded-full border border-white/5 animate-spin-slow relative opacity-30">
          <div className="absolute inset-0 border border-white/5 rounded-full scale-75"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-6 animate-fade-in-up">
        <div className="relative w-48 h-48 mb-8 flex items-center justify-center animate-float">
          <div className="absolute w-40 h-40 bg-gold/20 rounded-full blur-3xl animate-pulse-slow"></div>
          
          <div className="relative w-40 h-40 rounded-full border-4 border-gold/30 flex items-center justify-center overflow-hidden bg-background-dark shadow-[0_0_50px_rgba(212,175,55,0.2)]">
            {!imgError ? (
              <img 
                src="Logo.jpeg"
                alt="Lunara Logo"
                className={`w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="material-symbols-outlined text-6xl text-gold animate-pulse">auto_awesome</span>
            )}
            {!imgLoaded && !imgError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-white/10 animate-spin">progress_activity</span>
              </div>
            )}
          </div>
        </div>

        <div className="text-center space-y-1">
          <h1 className="font-serif text-5xl text-gold tracking-widest drop-shadow-lg leading-tight uppercase">
            LUNARA
          </h1>
          <p className="font-serif text-2xl text-glow-gold tracking-[0.2em] font-light lowercase opacity-90">
            astrologia
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full opacity-50"></div>
          <p className="text-[10px] text-blue-200/60 font-light tracking-[0.3em] uppercase animate-pulse">
             Iniciando jornada cósmica
          </p>
        </div>
      </div>
    </div>
  );
}
