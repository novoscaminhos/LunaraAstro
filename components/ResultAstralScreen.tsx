
import React, { useState, useMemo } from 'react';
import { View, UserData, AstralChartData, PlanetPosition } from '../types';
import { 
  IconSun, IconMoon, IconAscendant, IconMercury, IconVenus, IconMars, IconJupiter, IconSaturn, 
  IconUranus, IconNeptune, IconPluto, IconZodiacGeneric, IconLilith, IconChiron, IconMC, IconNode
} from './Icons';
import ShareModal from './ShareModal';
import AstralChartSVG from './AstralChartSVG';
import { 
  PLANETS_IN_HOUSES, 
  PLANET_SYMBOLOGY, 
  FORTUNE_HOUSES,
  FORTUNE_SIGNS,
  ESSENTIAL_DIGNITIES
} from '../data/astralData';

interface ResultAstralScreenProps {
  userData: UserData;
  chartData: AstralChartData | null;
  onNavigate: (view: View) => void;
  onSave?: () => void;
  onRealTimeTransits: () => void;
}

const getPlanetIcon = (name: string, size: number = 24) => {
  const n = name.toLowerCase();
  if (n.includes('sol')) return <IconSun size={size} className="text-yellow-400" />;
  if (n.includes('lua')) return <IconMoon size={size} className="text-blue-200" />;
  if (n.includes('ascendente')) return <IconAscendant size={size} className="text-primary-light" />;
  if (n.includes('marte')) return <IconMars size={size} className="text-red-500" />;
  if (n.includes('vênus')) return <IconVenus size={size} className="text-pink-400" />;
  if (n.includes('júpiter')) return <IconJupiter size={size} className="text-orange-400" />;
  if (n.includes('saturno')) return <IconSaturn size={size} className="text-indigo-400" />;
  if (n.includes('lilith')) return <IconLilith size={size} className="text-slate-500" />;
  if (n.includes('kiron') || n.includes('quiron')) return <IconChiron size={size} className="text-teal-400" />;
  if (n.includes('mercúrio')) return <IconMercury size={size} className="text-emerald-400" />;
  if (n.includes('urano')) return <IconUranus size={size} className="text-cyan-400" />;
  if (n.includes('netuno')) return <IconNeptune size={size} className="text-indigo-300" />;
  if (n.includes('plutão')) return <IconPluto size={size} className="text-slate-400" />;
  if (n.includes('fortuna')) return <span className="material-symbols-outlined text-gold" style={{fontSize: size}}>payments</span>;
  if (n.includes('céu') || n.includes('mc')) return <IconMC size={size} className="text-indigo-200" />;
  if (n.includes('nodo')) return <IconNode size={size} className="text-purple-400" />;
  return <IconZodiacGeneric size={size} className="text-white/20" />;
};

const getAspectMeta = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes('trígono') || t.includes('trine') || t.includes('sextil')) {
    return { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', status: 'Harmônico' };
  }
  if (t.includes('quadratura') || t.includes('square') || t.includes('oposição')) {
    return { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', status: 'Desafiador' };
  }
  return { color: 'text-primary-light', bg: 'bg-primary/10', border: 'border-primary/20', status: 'Dinâmico' };
};

const getDignityInfo = (p: PlanetPosition) => {
  // 1. Prioriza dignidade manual se informada e diferente de "Peregrino"
  if (p.dignity && p.dignity !== "Peregrino") {
      const type = p.dignity;
      if (type === 'Domicílio') return { label: 'Domicílio', icon: 'home', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', desc: 'Força Máxima. O planeta está em sua própria casa.' };
      if (type === 'Exaltação') return { label: 'Exaltação', icon: 'workspace_premium', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', desc: 'Alta Performance. O planeta é um convidado de honra.' };
      if (type === 'Detrimento') return { label: 'Detrimento', icon: 'warning', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', desc: 'Desafio. O planeta está no signo oposto ao seu lar.' };
      if (type === 'Queda') return { label: 'Queda', icon: 'arrow_downward', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', desc: 'Debilidade. O planeta está desconfortável para agir.' };
  }

  // 2. Fallback para cálculo automático se não houver manual
  const dignityData = ESSENTIAL_DIGNITIES[p.name];
  if (!dignityData) return null;

  if (dignityData.domicile.includes(p.sign)) {
    return { 
      label: 'Domicílio', 
      icon: 'home', 
      color: 'text-green-400', 
      bg: 'bg-green-500/10', 
      border: 'border-green-500/20',
      desc: 'Força Máxima (Calculado)'
    };
  }
  if (dignityData.exaltation.includes(p.sign)) {
    return { 
      label: 'Exaltação', 
      icon: 'workspace_premium', 
      color: 'text-blue-400', 
      bg: 'bg-blue-500/10', 
      border: 'border-blue-500/20',
      desc: 'Alta Performance (Calculado)'
    };
  }
  if (dignityData.detriment.includes(p.sign)) {
    return { 
      label: 'Detrimento', 
      icon: 'warning', 
      color: 'text-orange-400', 
      bg: 'bg-orange-500/10', 
      border: 'border-orange-500/20',
      desc: 'Desafio (Calculado)'
    };
  }
  if (dignityData.fall.includes(p.sign)) {
    return { 
      label: 'Queda', 
      icon: 'arrow_downward', 
      color: 'text-red-400', 
      bg: 'bg-red-500/10', 
      border: 'border-red-500/20',
      desc: 'Debilidade (Calculado)'
    };
  }
  
  // Não retorna nada se for peregrino calculado para limpar a UI
  return null;
};

export default function ResultAstralScreen({ userData, chartData, onNavigate, onSave, onRealTimeTransits }: ResultAstralScreenProps) {
  const [showShare, setShowShare] = useState(false);
  const [expandedPlanet, setExpandedPlanet] = useState<string | null>(null);

  const planetGroups = useMemo(() => {
    if (!chartData) return { personal: [], social: [], transpersonal: [], points: [] };
    
    // Create consistent PlanetPosition objects for MC and NN to be used in list
    const mc: PlanetPosition = { 
        name: "Meio do Céu", 
        sign: chartData.midheaven.sign, 
        house: 10, 
        degree: chartData.midheaven.degree || 0,
        category: 'Transpersonal',
        technicalContext: chartData.midheaven.careerInterpretation
    };
    
    const nn: PlanetPosition = { 
        name: "Nodo Norte", 
        sign: chartData.northNode.sign, 
        house: 0, 
        degree: chartData.northNode.degree || 0,
        category: 'Transpersonal',
        technicalContext: chartData.northNode.technicalContext
    };

    const all = [
      chartData.sun,
      chartData.moon,
      chartData.ascendant,
      mc,
      nn,
      ...(chartData.partOfFortune ? [chartData.partOfFortune] : []),
      ...chartData.planets
    ];

    return {
      personal: all.filter(p => p.category === 'Personal'),
      social: all.filter(p => p.category === 'Social'),
      transpersonal: all.filter(p => p.category === 'Transpersonal'),
      points: all.filter(p => p.category === 'Point')
    };
  }, [chartData]);

  if (!chartData) return <div className="h-screen bg-background-dark"></div>;

  // Prepare full planet list for SVG, including MC and Node
  const planetsForSVG: PlanetPosition[] = [
      chartData.sun, 
      chartData.moon, 
      chartData.ascendant, 
      { 
          name: "Meio do Céu", 
          sign: chartData.midheaven.sign, 
          house: 10, 
          degree: chartData.midheaven.degree || 0 
      },
      { 
          name: "Nodo Norte", 
          sign: chartData.northNode.sign, 
          house: 0, 
          degree: chartData.northNode.degree || 0 
      },
      ...(chartData.partOfFortune ? [chartData.partOfFortune] : []), 
      ...chartData.planets
  ];

  const PlanetCard: React.FC<{ p: PlanetPosition }> = ({ p }) => {
    const isExpanded = expandedPlanet === p.name;
    const relatedAspects = chartData.aspects?.filter(a => a.planet1 === p.name || a.planet2 === p.name) || [];
    const isFortune = p.name === "Parte da Fortuna";
    const isMC = p.name === "Meio do Céu";
    const isNN = p.name === "Nodo Norte";
    const dignity = getDignityInfo(p);
    
    let interpretation = p.technicalContext || PLANETS_IN_HOUSES[p.house]?.[p.name] || "";
    if (isFortune) {
        interpretation = `${FORTUNE_SIGNS[p.sign]} ${FORTUNE_HOUSES[p.house]}`;
    }

    return (
      <div className={`bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 ${isExpanded ? 'bg-white/[0.08] border-primary/40' : ''}`}>
        <button 
          onClick={() => setExpandedPlanet(isExpanded ? null : p.name)}
          className="w-full p-4 flex items-center justify-between text-left focus:outline-none group"
        >
           <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-2xl bg-white/5 transition-all duration-300 ${isExpanded ? 'bg-primary/30' : ''}`}>
                 {getPlanetIcon(p.name, 24)}
              </div>
              <div>
                 <div className="flex items-center gap-2">
                    <h4 className={`text-[11px] font-bold uppercase tracking-widest ${isFortune ? 'text-gold' : 'text-white'}`}>{p.name}</h4>
                    <span className="text-[9px] text-white/40 uppercase">{p.sign}</span>
                    {p.isRetrograde && (
                        <span className="text-[9px] font-bold text-red-400 border border-red-500/30 bg-red-500/10 px-1 rounded">Rx</span>
                    )}
                 </div>
                 <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[9px] text-white/30 uppercase tracking-tighter">
                        {p.house > 0 ? `Casa ${p.house}` : 'Ponto Calculado'} {p.degree !== undefined ? `• ${p.degree}°` : ''}
                    </p>
                    {dignity && !isExpanded && (
                        <span className={`text-[7px] font-bold px-1.5 py-px rounded-full border ${dignity.color} ${dignity.bg} ${dignity.border} uppercase`}>
                            {dignity.label}
                        </span>
                    )}
                 </div>
              </div>
           </div>
           <span className={`material-symbols-outlined text-white/20 transition-transform ${isExpanded ? 'rotate-180 text-primary-light' : ''}`}>expand_more</span>
        </button>
        
        {isExpanded && (
          <div className="px-5 pb-6 space-y-4 animate-fade-in-up">
             <div className="h-px w-full bg-white/5"></div>
             
             {/* Dignity Section (if applicable) */}
             {dignity && (
                 <div className={`flex items-start gap-3 p-3 rounded-xl border ${dignity.bg} ${dignity.border}`}>
                    <span className={`material-symbols-outlined ${dignity.color} text-lg`}>{dignity.icon}</span>
                    <div>
                        <span className={`text-[10px] font-bold uppercase ${dignity.color}`}>{dignity.label} Essencial</span>
                        <p className="text-[10px] text-white/60 leading-tight">{dignity.desc}</p>
                    </div>
                 </div>
             )}

             {p.isRetrograde && (
                 <div className="flex items-start gap-3 p-3 rounded-xl border border-red-500/20 bg-red-500/5">
                    <span className="material-symbols-outlined text-red-400 text-lg">history</span>
                    <div>
                        <span className="text-[10px] font-bold uppercase text-red-400">Movimento Retrógrado</span>
                        <p className="text-[10px] text-white/60 leading-tight">A energia deste planeta está voltada para dentro. Revisão, reavaliação e carma pendente são temas fortes aqui.</p>
                    </div>
                 </div>
             )}

             <div>
                <h5 className="text-[8px] font-bold text-white/20 uppercase mb-2">Função e Efeito</h5>
                <p className="text-[11px] text-white/80 leading-relaxed font-serif italic border-l-2 border-primary/20 pl-4">
                   {isFortune && <span className="text-gold/80 font-bold">KPI CÓSMICO: </span>}
                   {PLANET_SYMBOLOGY[p.name]} {interpretation}
                </p>
             </div>

             {relatedAspects.length > 0 && (
               <div className="space-y-2">
                 <h5 className="text-[8px] font-bold text-white/20 uppercase mb-2">Geometria Sagrada</h5>
                 {relatedAspects.map((aspect, aIdx) => (
                   <div key={aIdx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-white/60">{aspect.type} com {aspect.planet1 === p.name ? aspect.planet2 : aspect.planet1}</span>
                        <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded ${getAspectMeta(aspect.type).bg} ${getAspectMeta(aspect.type).color}`}>{getAspectMeta(aspect.type).status}</span>
                      </div>
                      <p className="text-[10px] text-white/40 italic leading-snug">{aspect.interpretation}</p>
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-dark overflow-y-auto no-scrollbar pb-32">
      <header className="sticky top-0 z-50 glass-panel p-4 flex items-center justify-between border-b border-white/5">
        <button onClick={() => onNavigate(View.HOME)} className="material-symbols-outlined text-white/70">arrow_back</button>
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-light">Dossier Astral • {userData.name.split(' ')[0]}</h2>
        <button onClick={() => setShowShare(true)} className="material-symbols-outlined text-white/70">share</button>
      </header>

      <main className="p-6">
        <section className="mb-10 text-center">
            <AstralChartSVG planets={planetsForSVG} cusps={chartData.houseCusps} aspects={chartData.aspects} />
        </section>

        {chartData.partOfFortune && (
            <section className="mb-12">
                <div className="bg-gradient-to-br from-gold/20 via-background-dark to-background-dark border border-gold/30 rounded-3xl p-6 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[100px] text-gold">payments</span>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-gold">stars</span>
                        <h3 className="text-gold text-[11px] font-bold uppercase tracking-[0.2em]">KPI CÓSMICO: Parte da Fortuna</h3>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-3xl font-bold text-white">{chartData.partOfFortune.sign}</div>
                        <div className="text-sm text-white/40 uppercase">Casa {chartData.partOfFortune.house}</div>
                    </div>
                    <p className="text-[12px] text-white/70 leading-relaxed font-serif italic">
                        "Onde corpo, mente e circunstância entram em sinergia. Seu fluxo operacional de prosperidade ativa-se através de {FORTUNE_SIGNS[chartData.partOfFortune.sign]}"
                    </p>
                </div>
            </section>
        )}

        <section className="space-y-12">
            <div>
                <h3 className="text-primary-light text-[9px] font-bold uppercase tracking-[0.4em] mb-4 pl-1">Planetas Pessoais (Psique)</h3>
                <div className="space-y-3">
                    {planetGroups.personal.map((p, i) => <PlanetCard key={i} p={p} />)}
                </div>
            </div>

            <div>
                <h3 className="text-indigo-400 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 pl-1">Planetas Sociais (Integração)</h3>
                <div className="space-y-3">
                    {planetGroups.social.map((p, i) => <PlanetCard key={i} p={p} />)}
                </div>
            </div>

            <div>
                <h3 className="text-white/40 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 pl-1">Transpessoais e Pontos de Evolução</h3>
                <div className="space-y-3">
                    {planetGroups.transpersonal.map((p, i) => <PlanetCard key={i} p={p} />)}
                    {planetGroups.points.map((p, i) => p.name !== "Parte da Fortuna" && <PlanetCard key={i} p={p} />)}
                </div>
            </div>
        </section>

        <div className="mt-12 space-y-4 pb-20">
            <button onClick={() => onNavigate(View.FULL_REPORT)} className="w-full py-5 bg-button-gradient rounded-2xl font-bold uppercase tracking-[0.3em] text-[11px] text-white shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
                <span className="material-symbols-outlined">description</span> Gerar Dossier Completo (PDF)
            </button>
        </div>
      </main>

      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} />
    </div>
  );
}
