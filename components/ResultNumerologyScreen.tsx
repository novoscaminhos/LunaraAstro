
import React, { useState } from 'react';
import { View, UserData, NumerologyData } from '../types';
import ShareModal from './ShareModal';
import { 
  MOTIVATION_DESCRIPTIONS, 
  IMPRESSION_DESCRIPTIONS, 
  EXPRESSION_DESCRIPTIONS,
  DESTINY_DESCRIPTIONS,
  MISSION_DESCRIPTIONS,
  BIRTH_DAY_DESCRIPTIONS,
  KARMIC_DEBT_DESCRIPTIONS,
  KARMIC_LESSON_DESCRIPTIONS,
  HIDDEN_TENDENCY_DESCRIPTIONS,
  PERSONAL_YEAR_DESCRIPTIONS,
  PERSONAL_MONTH_DESCRIPTIONS,
  PSYCHIC_NUMBER_DESCRIPTIONS,
  PROFESSIONAL_POTENTIAL_DESCRIPTIONS,
  SUBCONSCIOUS_RESPONSE_DESCRIPTIONS,
  FAVORABLE_COLORS,
  MARITAL_HARMONY_TEXTS,
  MARITAL_HARMONY_TABLE,
  LIFE_CYCLE_1_DESCRIPTIONS,
  LIFE_CYCLE_2_DESCRIPTIONS,
  LIFE_CYCLE_3_DESCRIPTIONS,
  DECISIVE_MOMENT_1_DESCRIPTIONS,
  DECISIVE_MOMENT_2_DESCRIPTIONS,
  DECISIVE_MOMENT_3_DESCRIPTIONS,
  DECISIVE_MOMENT_4_DESCRIPTIONS,
  CHALLENGE_DESCRIPTIONS,
  INTER_VALUE_DESCRIPTIONS,
  ASCENSION_DESCRIPTIONS,
  ARCANE_DESCRIPTIONS
} from '../data/astralData';

interface ResultNumerologyScreenProps {
  userData: UserData;
  onNavigate: (view: View) => void;
  numerologyData?: NumerologyData | null;
}

export default function ResultNumerologyScreen({ userData, onNavigate, numerologyData }: ResultNumerologyScreenProps) {
  const [showShare, setShowShare] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!numerologyData) return null;

  const { 
    destinyNumber, 
    missionNumber, 
    motivationNumber, 
    impressionNumber, 
    expressionNumber, 
    birthDayNumber,
    karmicDebts,
    karmicLessons,
    hiddenTendencies,
    personalYear,
    personalMonth,
    psychicNumber,
    subconsciousResponse,
    lifeCycle1,
    lifeCycle2,
    lifeCycle3,
    decisiveMoment1,
    decisiveMoment2,
    decisiveMoment3,
    decisiveMoment4,
    challenge1,
    challenge2,
    challenge3,
    interValueNumber,
    ascensionType,
    arcaneNumber,
    ageRef1,
    ageRef2,
    ageRef3,
    ageRefCycle2
  } = numerologyData;

  const handleShare = async () => {
    const shareData = {
      title: 'Lunara Numerologia',
      text: `Meu Número de Destino é ${destinyNumber}, Missão ${missionNumber} e estou no Ano Pessoal ${personalYear}! Descubra o seu com Lunara.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        setShowShare(true);
      }
    } else {
      setShowShare(true);
    }
  };

  const InfoCard = ({ title, number, description, id, colorClass = "text-primary", bgClass = "bg-primary/10", subtitle = "Toque para ler a análise" }: any) => {
    const isExpanded = expandedSection === id;
    
    return (
      <div className={`bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-lg ring-1 ring-primary/20' : ''}`}>
        <button 
          onClick={() => setExpandedSection(isExpanded ? null : id)}
          className="w-full p-5 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${bgClass} ${colorClass}`}>
              {typeof number === 'string' ? <span className="material-symbols-outlined">{number}</span> : number}
            </div>
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${colorClass}`}>{title}</span>
              <div className="text-[10px] text-slate-400 dark:text-white/40 mt-0.5">{subtitle}</div>
            </div>
          </div>
          <span className={`material-symbols-outlined text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        
        {isExpanded && (
          <div className="px-5 pb-5 animate-fade-in">
            <div className="h-px w-full bg-gray-100 dark:bg-white/5 mb-4"></div>
            <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed text-justify font-lato">
              {description || "Descrição não disponível."}
            </p>
          </div>
        )}
      </div>
    );
  };

  const harmonyData = MARITAL_HARMONY_TABLE[psychicNumber] || { vibra: "-", atrai: "-", oposto: "-", passivo: "-" };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark">
      <ShareModal 
        isOpen={showShare} 
        onClose={() => setShowShare(false)} 
        title="Compartilhar Numerologia"
        shareText={`Meu Número de Destino é ${destinyNumber} e minha Missão é ${missionNumber}!`}
      />
      
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/10">
        <button 
            onClick={() => onNavigate(View.INPUT_NUMEROLOGY)}
            className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col items-center flex-1 mx-2">
          <span className="text-xs font-medium text-primary uppercase tracking-widest">Mapa Cabalístico</span>
          <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight tracking-tight truncate">{userData.name.split(' ')[0]}</h2>
        </div>
        <button 
          onClick={handleShare}
          className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      {/* Main Content Scroll Area */}
      <main className="flex-1 flex flex-col pb-24 p-4 gap-4">
        
        {/* Destaque: Destino e Missão */}
        <section className="grid grid-cols-2 gap-4">
           <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-white/10">
                 <span className="material-symbols-outlined text-8xl">route</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">Destino</p>
              <h3 className="text-4xl font-bold mb-1">{destinyNumber}</h3>
              <p className="text-[10px] opacity-70 leading-tight">Caminho Evolutivo</p>
           </div>
           
           <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-white/10">
                 <span className="material-symbols-outlined text-8xl">flag</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">Missão</p>
              <h3 className="text-4xl font-bold mb-1">{missionNumber}</h3>
              <p className="text-[10px] opacity-70 leading-tight">Vocação da Alma</p>
           </div>
        </section>

        {/* Karmic Debt Warning */}
        {karmicDebts.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex gap-4 items-start animate-pulse">
             <span className="material-symbols-outlined text-red-400 text-2xl mt-1">warning</span>
             <div>
                <h4 className="text-red-400 font-bold text-sm uppercase tracking-wide mb-1">Atenção: Dívida Cármica</h4>
                <p className="text-xs text-red-300/80 leading-relaxed">
                   Seu mapa indica a presença dos números {karmicDebts.join(', ')}. Isso sinaliza aprendizados importantes trazidos de vidas passadas.
                </p>
             </div>
          </div>
        )}

        {/* Arcano Pessoal */}
        <section className="bg-gradient-to-r from-violet-900/30 to-fuchsia-900/30 rounded-2xl p-5 border border-violet-500/20 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
           <div className="flex items-center gap-3 mb-2 relative z-10">
              <span className="material-symbols-outlined text-fuchsia-300 text-2xl">auto_awesome</span>
              <h3 className="text-sm font-bold text-fuchsia-200 uppercase tracking-widest">Arcano Pessoal</h3>
           </div>
           
           <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-16 h-16 bg-fuchsia-500/20 border border-fuchsia-500/40 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-inner">
                  {arcaneNumber}
              </div>
              <p className="text-[10px] text-fuchsia-200/80 italic leading-relaxed max-w-[200px]">
                Sua vibração arquetípica, revelando potenciais latentes e a essência da sua jornada heroica.
              </p>
           </div>
           
           <div className="h-px w-full bg-white/10 mb-4"></div>
           
           <p className="text-sm text-white leading-relaxed font-serif text-justify relative z-10">
              {ARCANE_DESCRIPTIONS[arcaneNumber] || "Descrição não disponível para este arcano."}
           </p>
        </section>

        {/* Grau de Ascensão */}
        <section className="bg-white/5 dark:bg-white/5 rounded-2xl p-5 border border-white/10">
           <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-violet-300">psychology_alt</span>
              <h3 className="text-xs font-bold text-violet-200 uppercase tracking-widest">Grau de Ascensão</h3>
           </div>
           <p className="text-[10px] text-violet-200/60 mb-3 italic leading-relaxed">
             Este índice não influi diretamente na vida da pessoa, sendo apenas um indicativo do desenvolvimento material, mental e espiritual do ser humano.
           </p>
           <p className="text-sm text-white leading-relaxed font-lato pl-4 border-l-2 border-violet-500/30">
              {ASCENSION_DESCRIPTIONS[ascensionType]}
           </p>
        </section>

        {/* Core Analysis List */}
        <section className="flex flex-col gap-3">
           <h3 className="text-xs font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest ml-1 mt-2">Ciclos Temporais</h3>
           <InfoCard 
              id="personalYear" title="Ano Pessoal" number={personalYear} 
              description={PERSONAL_YEAR_DESCRIPTIONS[personalYear]} 
              subtitle="Energia regente do ano atual"
              colorClass="text-amber-400" bgClass="bg-amber-500/10"
           />
           <InfoCard 
              id="personalMonth" title="Mês Pessoal" number={personalMonth} 
              description={PERSONAL_MONTH_DESCRIPTIONS[personalMonth]} 
              subtitle="Vibrações para o mês atual"
              colorClass="text-yellow-300" bgClass="bg-yellow-500/10"
           />
           
           <h3 className="text-xs font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest ml-1 mt-4">Essência Pessoal</h3>
           <InfoCard 
              id="psychic" title="Número Psíquico" number={psychicNumber} 
              description={PSYCHIC_NUMBER_DESCRIPTIONS[psychicNumber]} 
              subtitle="Características da sua personalidade base (Dia Nasc.)"
              colorClass="text-cyan-400" bgClass="bg-cyan-500/10"
           />
           <InfoCard 
              id="professional" title="Potencial Profissional" number={expressionNumber} 
              description={PROFESSIONAL_POTENTIAL_DESCRIPTIONS[expressionNumber]} 
              subtitle="Carreira e Habilidades (Baseado na Expressão)"
              colorClass="text-blue-400" bgClass="bg-blue-500/10"
           />
           <InfoCard 
              id="subconscious" title="Resposta Subconsciente" number={subconsciousResponse} 
              description={SUBCONSCIOUS_RESPONSE_DESCRIPTIONS[subconsciousResponse]} 
              subtitle="Reações instintivas e ocultas"
              colorClass="text-purple-400" bgClass="bg-purple-500/10"
           />
           <div className="bg-surface-dark border border-white/5 rounded-2xl p-5 flex items-center justify-between">
              <div>
                 <span className="text-xs font-bold text-white uppercase tracking-widest">Cores Favoráveis</span>
                 <p className="text-[10px] text-white/40 mt-1">Para equilíbrio e harmonia</p>
              </div>
              <div className="text-right">
                 <p className="text-sm font-bold text-white/80 max-w-[150px] leading-tight">
                    {FAVORABLE_COLORS[destinyNumber]}
                 </p>
              </div>
           </div>

           {/* Harmonia Conjugal (Baseado no Psíquico) */}
           <div className="bg-surface-dark border border-white/5 rounded-2xl p-5 mt-4">
              <div className="flex items-center gap-2 mb-4">
                 <span className="material-symbols-outlined text-pink-400">favorite</span>
                 <h3 className="text-xs font-bold text-white uppercase tracking-widest">Harmonia Relacional</h3>
              </div>
              <p className="text-xs text-white/60 mb-4 italic">
                 {MARITAL_HARMONY_TEXTS[psychicNumber]}
              </p>
              <div className="grid grid-cols-2 gap-3 text-center">
                 <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                    <span className="text-[9px] uppercase font-bold text-pink-300 block mb-1">Vibra Com</span>
                    <span className="text-sm font-bold text-white">{harmonyData.vibra}</span>
                 </div>
                 <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                    <span className="text-[9px] uppercase font-bold text-green-300 block mb-1">Atrai</span>
                    <span className="text-sm font-bold text-white">{harmonyData.atrai}</span>
                 </div>
                 <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                    <span className="text-[9px] uppercase font-bold text-red-300 block mb-1">Oposto</span>
                    <span className="text-sm font-bold text-white">{harmonyData.oposto}</span>
                 </div>
                 <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                    <span className="text-[9px] uppercase font-bold text-blue-300 block mb-1">Passivo</span>
                    <span className="text-sm font-bold text-white">{harmonyData.passivo}</span>
                 </div>
              </div>
           </div>

           {interValueNumber > 0 && (
              <InfoCard 
                 id="interVal" title="Relação Inter-valor" number={interValueNumber} 
                 description={INTER_VALUE_DESCRIPTIONS[interValueNumber]} 
                 subtitle="O número que mais aparece no seu nome"
                 colorClass="text-fuchsia-400" bgClass="bg-fuchsia-500/10"
              />
           )}

           {/* Desafios */}
           <h3 className="text-xs font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest ml-1 mt-4">Desafios na Vida</h3>
           <InfoCard 
              id="chal1" title="1º Desafio (0-28 anos)" number={challenge1} 
              description={CHALLENGE_DESCRIPTIONS[challenge1]} 
              subtitle="Barreiras da juventude"
              colorClass="text-rose-400" bgClass="bg-rose-500/10"
           />
           <InfoCard 
              id="chal2" title="2º Desafio (28-56 anos)" number={challenge2} 
              description={CHALLENGE_DESCRIPTIONS[challenge2]} 
              subtitle="Barreiras da maturidade"
              colorClass="text-rose-400" bgClass="bg-rose-500/10"
           />
           <InfoCard 
              id="chal3" title="Desafio Principal (56-84 anos)" number={challenge3} 
              description={CHALLENGE_DESCRIPTIONS[challenge3]} 
              subtitle="O desafio dominante por toda a vida"
              colorClass="text-red-500" bgClass="bg-red-600/10"
           />

           <h3 className="text-xs font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest ml-1 mt-4">Momentos Decisivos</h3>
           <InfoCard 
              id="mom1" title="1º Momento Decisivo" number={decisiveMoment1} 
              description={DECISIVE_MOMENT_1_DESCRIPTIONS[decisiveMoment1]} 
              subtitle={`Do nascimento até ${ageRef1} anos`}
              colorClass="text-lime-400" bgClass="bg-lime-500/10"
           />
           <InfoCard 
              id="mom2" title="2º Momento Decisivo" number={decisiveMoment2} 
              description={DECISIVE_MOMENT_2_DESCRIPTIONS[decisiveMoment2]} 
              subtitle={`De ${ageRef1 + 1} até ${ageRef2} anos`}
              colorClass="text-green-400" bgClass="bg-green-500/10"
           />
           <InfoCard 
              id="mom3" title="3º Momento Decisivo" number={decisiveMoment3} 
              description={DECISIVE_MOMENT_3_DESCRIPTIONS[decisiveMoment3]} 
              subtitle={`De ${ageRef2 + 1} até ${ageRef3} anos`}
              colorClass="text-emerald-400" bgClass="bg-emerald-500/10"
           />
           <InfoCard 
              id="mom4" title="4º Momento Decisivo" number={decisiveMoment4} 
              description={DECISIVE_MOMENT_4_DESCRIPTIONS[decisiveMoment4]} 
              subtitle={`A partir de ${ageRef3 + 1} anos`}
              colorClass="text-teal-400" bgClass="bg-teal-500/10"
           />

           <h3 className="text-xs font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest ml-1 mt-4">Tríade da Personalidade</h3>
           <InfoCard 
              id="mot" title="Motivação (Alma)" number={motivationNumber} 
              description={MOTIVATION_DESCRIPTIONS[motivationNumber]} 
              colorClass="text-pink-500" bgClass="bg-pink-500/10"
           />
           <InfoCard 
              id="imp" title="Impressão (Ego)" number={impressionNumber} 
              description={IMPRESSION_DESCRIPTIONS[impressionNumber]} 
              colorClass="text-blue-500" bgClass="bg-blue-500/10"
           />
           <InfoCard 
              id="exp" title="Expressão (Completa)" number={expressionNumber} 
              description={EXPRESSION_DESCRIPTIONS[expressionNumber]} 
              colorClass="text-purple-500" bgClass="bg-purple-500/10"
           />

           <h3 className="text-xs font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest ml-1 mt-4">Ciclos de Vida</h3>
           <InfoCard 
              id="lifeCycle1" title="1º Ciclo de Vida" number={lifeCycle1} 
              description={LIFE_CYCLE_1_DESCRIPTIONS[lifeCycle1]} 
              subtitle={`Do nascimento até ${ageRef1} anos`}
              colorClass="text-cyan-400" bgClass="bg-cyan-500/10"
           />
           <InfoCard 
              id="lifeCycle2" title="2º Ciclo de Vida" number={lifeCycle2} 
              description={LIFE_CYCLE_2_DESCRIPTIONS[lifeCycle2]} 
              subtitle={`De ${ageRef1 + 1} até ${ageRefCycle2} anos`}
              colorClass="text-sky-400" bgClass="bg-sky-500/10"
           />
           <InfoCard 
              id="lifeCycle3" title="3º Ciclo de Vida" number={lifeCycle3} 
              description={LIFE_CYCLE_3_DESCRIPTIONS[lifeCycle3]} 
              subtitle={`A partir de ${ageRefCycle2 + 1} anos (Final)`}
              colorClass="text-blue-400" bgClass="bg-blue-500/10"
           />

           {/* Lições e Tendências */}
           {(karmicLessons.length > 0 || hiddenTendencies.length > 0) && (
             <>
               <h3 className="text-xs font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest ml-1 mt-4">Aprendizados & Padrões</h3>
               {karmicLessons.map(n => (
                 <InfoCard 
                    key={`lesson-${n}`}
                    id={`lesson-${n}`} title={`Lição Cármica ${n}`} number={n} 
                    description={KARMIC_LESSON_DESCRIPTIONS[n]} 
                    subtitle="Ausência no nome: Qualidade a desenvolver"
                    colorClass="text-orange-400" bgClass="bg-orange-500/10"
                 />
               ))}
               {hiddenTendencies.map(n => (
                 <InfoCard 
                    key={`tendency-${n}`}
                    id={`tendency-${n}`} title={`Tendência Oculta ${n}`} number={n} 
                    description={HIDDEN_TENDENCY_DESCRIPTIONS[n]} 
                    subtitle="Excesso no nome: Desejo recorrente"
                    colorClass="text-violet-400" bgClass="bg-violet-500/10"
                 />
               ))}
             </>
           )}

           {karmicDebts.length > 0 && (
             <>
               <h3 className="text-xs font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest ml-1 mt-4">Reajuste Cármico</h3>
               {karmicDebts.map(debt => (
                 <InfoCard 
                    key={debt}
                    id={`debt-${debt}`} title={`Dívida Cármica ${debt}`} number={debt} 
                    description={KARMIC_DEBT_DESCRIPTIONS[debt]} 
                    colorClass="text-red-400" bgClass="bg-red-500/10"
                 />
               ))}
             </>
           )}
        </section>

        {/* Pyramid Visualization */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-white/5 text-center mt-2">
            <h3 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4">Pirâmide do Nome</h3>
            <div className="flex flex-col items-center gap-1 overflow-x-auto pb-2">
                {numerologyData.pyramid.slice(0, 6).map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1 justify-center">
                    {row.values.map((val, valIndex) => (
                    <div 
                        key={`${rowIndex}-${valIndex}`}
                        className={`
                        flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold
                        ${rowIndex === 0 ? 'bg-primary/20 text-primary' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/60'}
                        `}
                    >
                        {val}
                    </div>
                    ))}
                </div>
                ))}
            </div>
        </section>

      </main>
    </div>
  );
}
