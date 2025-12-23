
import React, { useState, useRef, useEffect } from 'react';
import { View } from '../types';
import { 
  PLANET_SYMBOLOGY, 
  SIGN_PROFILES, 
  HOUSE_DESCRIPTIONS, 
  POLARITY_GENERAL, 
  YIN_ENERGY, 
  YANG_ENERGY,
  LOVE_PROFILES,
  QUALITY_GENERAL,
  QUALITY_TYPES
} from '../data/astralData';
import { 
  IconSun, IconMoon, IconMercury, IconVenus, IconMars, IconJupiter, IconSaturn, 
  IconUranus, IconNeptune, IconPluto, IconLilith, IconChiron, IconAscendant 
} from './Icons';

interface LearnScreenProps {
  onNavigate: (view: View) => void;
}

export default function LearnScreen({ onNavigate }: LearnScreenProps) {
  const [activeTab, setActiveTab] = useState<'Planetas' | 'Signos' | 'Casas' | 'Energias' | 'Qualidades' | 'Amor'>('Planetas');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Efeito para centralizar a tab ativa
  useEffect(() => {
    const activeBtn = tabsRef.current.get(activeTab);
    if (activeBtn && scrollContainerRef.current) {
        activeBtn.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
  }, [activeTab]);

  const getPlanetIcon = (name: string) => {
    switch (name) {
      case 'Sol': return <IconSun />;
      case 'Lua': return <IconMoon />;
      case 'Mercúrio': return <IconMercury />;
      case 'Vênus': return <IconVenus />;
      case 'Marte': return <IconMars />;
      case 'Júpiter': return <IconJupiter />;
      case 'Saturno': return <IconSaturn />;
      case 'Urano': return <IconUranus />;
      case 'Netuno': return <IconNeptune />;
      case 'Plutão': return <IconPluto />;
      case 'Lilith': return <IconLilith />;
      case 'Kiron': return <IconChiron />;
      case 'Ascendente': return <IconAscendant />;
      case 'Nodo Verd.': return <span className="material-symbols-outlined">all_inclusive</span>;
      default: return <span className="material-symbols-outlined">public</span>;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Planetas':
        return (
          <div className="flex flex-col gap-4 animate-fade-in-up">
            {Object.entries(PLANET_SYMBOLOGY).map(([planet, description], index) => (
              <div key={index} className="bg-surface-dark p-4 rounded-xl border border-white/5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                  {getPlanetIcon(planet)}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{planet}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{description as string}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'Signos':
        return (
          <div className="flex flex-col gap-4 animate-fade-in-up">
            {Object.entries(SIGN_PROFILES).map(([sign, description], index) => (
              <div key={index} className="bg-surface-dark p-4 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold text-lg">{sign}</h3>
                  <span className="material-symbols-outlined text-white/20">stars</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed text-justify">{description as string}</p>
              </div>
            ))}
          </div>
        );
      case 'Casas':
        return (
          <div className="flex flex-col gap-4 animate-fade-in-up">
            {Object.entries(HOUSE_DESCRIPTIONS).map(([number, description], index) => {
              const descStr = description as string;
              const [title, text] = descStr.split(':');
              return (
                <div key={index} className="bg-surface-dark p-4 rounded-xl border border-white/5 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-3 opacity-5">
                      <span className="text-6xl font-bold text-white">{number}</span>
                   </div>
                  <h3 className="text-primary font-bold text-base mb-1 uppercase tracking-wide">{title || `Casa ${number}`}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{text || description}</p>
                </div>
              );
            })}
          </div>
        );
      case 'Energias':
        return (
          <div className="flex flex-col gap-6 animate-fade-in-up">
            <div className="bg-gradient-to-br from-primary/20 to-transparent p-5 rounded-2xl border border-primary/20">
              <h3 className="text-white font-bold text-xl mb-2">{POLARITY_GENERAL.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">{POLARITY_GENERAL.intro}</p>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <p className="text-xs text-gray-400 italic">"{POLARITY_GENERAL.taoism}"</p>
              </div>
            </div>

            {/* Yang Card */}
            <div className="bg-surface-dark p-5 rounded-2xl border border-yellow-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-yellow-500">light_mode</span>
              </div>
              <h4 className="text-yellow-500 font-bold text-lg mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">bolt</span>
                {YANG_ENERGY.title}
              </h4>
              <p className="text-sm text-gray-300 mb-4">{YANG_ENERGY.traits}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {YANG_ENERGY.keywords.map(kw => (
                  <span key={kw} className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full border border-yellow-500/20">{kw}</span>
                ))}
              </div>
              <div className="border-t border-white/5 pt-4">
                <p className="text-xs font-bold text-white/50 uppercase mb-2">Signos Relacionados</p>
                <p className="text-sm text-gray-300 font-medium">{YANG_ENERGY.signs.join(', ')}</p>
              </div>
            </div>

            {/* Yin Card */}
            <div className="bg-surface-dark p-5 rounded-2xl border border-blue-400/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-blue-400">dark_mode</span>
              </div>
              <h4 className="text-blue-400 font-bold text-lg mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">water_drop</span>
                {YIN_ENERGY.title}
              </h4>
              <p className="text-sm text-gray-300 mb-4">{YIN_ENERGY.traits}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {YIN_ENERGY.keywords.map(kw => (
                  <span key={kw} className="text-[10px] bg-blue-400/10 text-blue-400 px-2 py-1 rounded-full border border-blue-400/20">{kw}</span>
                ))}
              </div>
              <div className="border-t border-white/5 pt-4">
                <p className="text-xs font-bold text-white/50 uppercase mb-2">Signos Relacionados</p>
                <p className="text-sm text-gray-300 font-medium">{YIN_ENERGY.signs.join(', ')}</p>
              </div>
            </div>
          </div>
        );
      case 'Qualidades':
        return (
          <div className="flex flex-col gap-6 animate-fade-in-up">
            <div className="bg-gradient-to-br from-indigo-500/20 to-transparent p-5 rounded-2xl border border-indigo-500/20">
              <h3 className="text-white font-bold text-xl mb-2">{QUALITY_GENERAL.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4 text-justify">{QUALITY_GENERAL.intro}</p>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <p className="text-xs text-indigo-200 italic">{QUALITY_GENERAL.concept}</p>
              </div>
            </div>

            {QUALITY_TYPES.map((quality) => (
               <div key={quality.id} className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden">
                  <div className={`p-4 border-b border-white/5 flex items-center justify-between ${
                      quality.id === 'cardinal' ? 'bg-red-500/10' :
                      quality.id === 'fixed' ? 'bg-blue-500/10' : 'bg-green-500/10'
                  }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            quality.id === 'cardinal' ? 'bg-red-500/20 text-red-400' :
                            quality.id === 'fixed' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                        }`}>
                           <span className="material-symbols-outlined text-lg">
                              {quality.id === 'cardinal' ? 'start' : quality.id === 'fixed' ? 'lock' : 'cached'}
                           </span>
                        </div>
                        <div>
                           <h3 className="text-white font-bold text-lg leading-none">{quality.title}</h3>
                           <p className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">{quality.keyword}</p>
                        </div>
                      </div>
                  </div>
                  
                  <div className="p-5">
                      <p className="text-sm text-gray-300 leading-relaxed mb-6 text-justify">{quality.description}</p>
                      
                      <div className="space-y-4">
                          <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest">Signos desta qualidade</h4>
                          {quality.signs.map((sign, idx) => (
                             <div key={idx} className="relative pl-4 border-l-2 border-white/10">
                                <span className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${
                                   quality.id === 'cardinal' ? 'bg-red-500' :
                                   quality.id === 'fixed' ? 'bg-blue-500' : 'bg-green-500'
                                }`}></span>
                                <h5 className="text-sm font-bold text-white mb-1">{sign.name}</h5>
                                <p className="text-xs text-gray-400 leading-relaxed">{sign.desc}</p>
                             </div>
                          ))}
                      </div>
                  </div>
               </div>
            ))}
          </div>
        );
      case 'Amor':
        return (
          <div className="flex flex-col gap-6 animate-fade-in-up">
            <div className="text-center mb-4">
               <h3 className="text-pink-300 font-bold text-lg uppercase tracking-widest">Perfís Amorosos</h3>
               <p className="text-xs text-white/50 mt-1">Como cada signo expressa afeto e desejo</p>
            </div>
            {Object.entries(LOVE_PROFILES).map(([sign, profile], index) => {
              const p = profile as { man: string, woman: string };
              return (
                <div key={index} className="bg-surface-dark rounded-2xl border border-pink-500/20 overflow-hidden">
                  <div className="bg-gradient-to-r from-pink-500/10 to-transparent p-4 flex items-center gap-3 border-b border-white/5">
                    <span className="material-symbols-outlined text-pink-400">favorite</span>
                    <h3 className="text-white font-bold text-lg">{sign}</h3>
                  </div>
                  <div className="p-5 space-y-6">
                    <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold text-blue-300 uppercase tracking-wider mb-2">
                          <span className="material-symbols-outlined text-base">man</span> Homem de {sign}
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed text-justify border-l-2 border-blue-500/30 pl-3">
                          {p.man}
                        </p>
                    </div>
                    <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold text-pink-300 uppercase tracking-wider mb-2">
                          <span className="material-symbols-outlined text-base">woman</span> Mulher de {sign}
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed text-justify border-l-2 border-pink-500/30 pl-3">
                          {p.woman}
                        </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-dark max-w-md mx-auto">
      {/* Top Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 pb-2 bg-background-dark/90 backdrop-blur-md border-b border-white/5">
        <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-widest uppercase text-white">Glossário Astral</h2>
      </header>

      {/* Tabs */}
      <section className="px-4 py-4 sticky top-14 z-40 bg-background-dark/95 backdrop-blur-sm">
        <div 
            ref={scrollContainerRef}
            className="flex p-1 bg-surface-dark rounded-xl overflow-x-auto no-scrollbar gap-1 scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {['Planetas', 'Signos', 'Casas', 'Energias', 'Qualidades', 'Amor'].map((tab) => (
            <button
              key={tab}
              ref={(el) => { if (el) tabsRef.current.set(tab, el); }}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 min-w-[80px] py-3 text-xs font-bold rounded-lg transition-all uppercase tracking-wide whitespace-nowrap px-3 snap-center ${
                activeTab === tab 
                  ? 'bg-primary text-white shadow-lg scale-105' 
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-24">
        {renderContent()}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 pb-[env(safe-area-inset-bottom)] max-w-md mx-auto bg-background-dark/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-around px-2">
          <a className="group flex flex-1 flex-col items-center justify-center gap-1 p-2 cursor-pointer" onClick={() => onNavigate(View.HOME)}>
            <span className="material-symbols-outlined text-2xl text-white/40 group-hover:text-white transition-colors">home</span>
            <span className="text-[10px] font-medium text-white/40 group-hover:text-white transition-colors">Início</span>
          </a>
          <a className="group flex flex-1 flex-col items-center justify-center gap-1 p-2 cursor-pointer" onClick={() => onNavigate(View.SAVED_MAPS)}>
            <span className="material-symbols-outlined text-2xl text-white/40 group-hover:text-white transition-colors">history_edu</span>
            <span className="text-[10px] font-medium text-white/40 group-hover:text-white transition-colors">Salvos</span>
          </a>
          <a className="group flex flex-1 flex-col items-center justify-center gap-1 p-2 cursor-pointer" onClick={() => onNavigate(View.LEARN)}>
            <span className="material-symbols-outlined text-2xl text-primary transition-colors">menu_book</span>
            <span className="text-[10px] font-medium text-white transition-colors">Aprender</span>
          </a>
          <a className="group flex flex-1 flex-col items-center justify-center gap-1 p-2 cursor-pointer" onClick={() => onNavigate(View.PROFILE)}>
            <span className="material-symbols-outlined text-2xl text-white/40 group-hover:text-white transition-colors">person</span>
            <span className="text-[10px] font-medium text-white/40 group-hover:text-white transition-colors">Perfil</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
