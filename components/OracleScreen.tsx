
import React from 'react';
import { OracleState, DailyHoroscope } from '../types';
import { IconSun, IconMoon, IconMercury, IconVenus, IconMars, IconJupiter, IconSaturn, IconZodiacGeneric } from './Icons';

interface OracleScreenProps {
  state: OracleState;
  onBack: () => void;
}

export default function OracleScreen({ state, onBack }: OracleScreenProps) {
  
  const getPlanetIcon = (planetName: string) => {
    const name = planetName.toLowerCase();
    if (name.includes('sol')) return <IconSun className="text-yellow-400" size={24} />;
    if (name.includes('lua')) return <IconMoon className="text-blue-200" size={24} />;
    if (name.includes('mercúrio')) return <IconMercury className="text-emerald-400" size={24} />;
    if (name.includes('vênus')) return <IconVenus className="text-pink-400" size={24} />;
    if (name.includes('marte')) return <IconMars className="text-red-500" size={24} />;
    if (name.includes('júpiter')) return <IconJupiter className="text-orange-400" size={24} />;
    if (name.includes('saturno')) return <IconSaturn className="text-indigo-400" size={24} />;
    return <IconZodiacGeneric className="text-white/40" size={24} />;
  };

  const isStructuredData = (data: any): data is DailyHoroscope => {
    return data && typeof data === 'object' && 'skyNow' in data;
  };

  return (
    <div className="flex h-screen flex-col bg-celestial-gradient max-w-md mx-auto overflow-y-auto no-scrollbar">
      <header className="p-4 flex items-center justify-between sticky top-0 bg-background-dark/95 backdrop-blur-md z-10 border-b border-white/5">
        <button onClick={onBack} className="material-symbols-outlined text-white/70">arrow_back</button>
        <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary-light">Lunara Oráculo</span>
            <span className="text-[8px] uppercase font-bold text-white/30 tracking-widest">
                Céu do Momento
            </span>
        </div>
        <div className="w-6"></div>
      </header>

      <main className="flex-1 p-6 flex flex-col items-center">
        {state.loading ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-6 animate-pulse mt-20">
            <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                <div className="relative w-32 h-32 rounded-full border-2 border-primary/40 flex items-center justify-center bg-background-dark">
                    <span className="material-symbols-outlined text-5xl text-primary animate-spin-slow">auto_awesome</span>
                </div>
            </div>
            <div className="text-center space-y-2">
                <p className="text-sm font-bold uppercase tracking-widest text-primary-light">Calculando Efemérides</p>
                <p className="text-[10px] text-white/40 italic">
                   Sincronizando planetas com o tempo real...
                </p>
            </div>
          </div>
        ) : (
          <div className="w-full animate-fade-in-up pb-10">
            
            {isStructuredData(state.response) ? (
              <>
                 {/* Current Sky List */}
                 <section className="mb-8">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4 text-center">Configuração Planetária Atual</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {state.response.skyNow.map((pos, idx) => (
                           <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                              <div className="w-8 h-8 flex items-center justify-center bg-background-dark rounded-lg">
                                 {getPlanetIcon(pos.planet)}
                              </div>
                              <div>
                                 <p className="text-[10px] font-bold text-white uppercase">{pos.planet}</p>
                                 <p className="text-[9px] text-primary-light">{pos.sign}</p>
                              </div>
                           </div>
                        ))}
                    </div>
                 </section>

                 {/* Advice Cards */}
                 <section className="space-y-4 mb-8">
                     {/* Love Card */}
                     <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-500/20 rounded-2xl p-5 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-pink-400">favorite</span>
                            <h4 className="text-xs font-bold uppercase text-pink-200 tracking-widest">Amor & Relações</h4>
                        </div>
                        <p className="text-sm text-white/90 leading-relaxed font-lato">{state.response.advice.love}</p>
                     </div>

                     {/* Finance Card */}
                     <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/20 rounded-2xl p-5 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-amber-400">attach_money</span>
                            <h4 className="text-xs font-bold uppercase text-amber-200 tracking-widest">Finanças & Carreira</h4>
                        </div>
                        <p className="text-sm text-white/90 leading-relaxed font-lato">{state.response.advice.finance}</p>
                     </div>

                     {/* Health Card */}
                     <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/20 rounded-2xl p-5 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-emerald-400">vital_signs</span>
                            <h4 className="text-xs font-bold uppercase text-emerald-200 tracking-widest">Saúde & Vitalidade</h4>
                        </div>
                        <p className="text-sm text-white/90 leading-relaxed font-lato">{state.response.advice.health}</p>
                     </div>
                 </section>

                 {/* Mantra */}
                 <div className="text-center p-6 bg-white/5 rounded-3xl border border-white/5 relative">
                    <span className="material-symbols-outlined text-4xl text-white/10 absolute top-2 left-4">format_quote</span>
                    <p className="text-lg font-serif italic text-white/80 relative z-10">"{state.response.mantra}"</p>
                 </div>
              </>
            ) : (
              // Fallback for simple text response (error case or old format)
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <p className="text-lg font-serif text-white/90 leading-relaxed text-justify whitespace-pre-wrap">
                    {state.response as string}
                </p>
              </div>
            )}

            <button 
                onClick={onBack}
                className="w-full mt-10 py-4 bg-primary/20 border border-primary/40 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-primary/30 transition-all"
            >
                Retornar
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
