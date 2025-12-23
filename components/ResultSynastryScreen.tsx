import React, { useState } from 'react';
import { View, UserData } from '../types';
import { IconSun, IconMoon, IconMercury, IconVenus, IconMars } from './Icons';
import ShareModal from './ShareModal';

interface ResultSynastryScreenProps {
  userData: UserData;
  partnerData: UserData;
  onNavigate: (view: View) => void;
}

export default function ResultSynastryScreen({ userData, partnerData, onNavigate }: ResultSynastryScreenProps) {
  const [showShare, setShowShare] = useState(false);

  // Mock calculation
  const compatibilityScore = 88;

  const handleShare = async () => {
    const shareData = {
      title: 'Lunara Sinastria',
      text: `Nossa compatibilidade astral é de ${compatibilityScore}%! Descubra a sua também no Lunara.`,
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

  const aspectsDetails = [
    {
      planet: "Sol",
      icon: <IconSun size={20} />,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/20",
      title: "Identidade & Ego",
      aspectName: "Trígono de Sol",
      description: "Existe uma harmonia natural entre as essências de vocês. Os objetivos de vida se alinham sem esforço, permitindo que um apoie a individualidade do outro sem se sentir ameaçado."
    },
    {
      planet: "Lua",
      icon: <IconMoon size={20} />,
      color: "text-blue-300",
      bgColor: "bg-blue-300/10",
      borderColor: "border-blue-300/20",
      title: "Emoções & Conforto",
      aspectName: "Lua em Gêmeos / Lua em Libra",
      description: "Uma conexão emocional fluida e intelectual. Vocês se sentem seguros conversando sobre o que sentem, embora às vezes racionalizem demais as emoções ao invés de apenas senti-las."
    },
    {
      planet: "Mercúrio",
      icon: <IconMercury size={20} />,
      color: "text-purple-300",
      bgColor: "bg-purple-300/10",
      borderColor: "border-purple-300/20",
      title: "Comunicação",
      aspectName: "Mercúrio Sextil Júpiter",
      description: "O diálogo entre vocês é otimista e expansivo. Vocês adoram fazer planos grandiosos juntos e raramente ficam sem assunto. A compreensão intelectual é um ponto forte."
    },
    {
      planet: "Vênus",
      icon: <IconVenus size={20} />,
      color: "text-pink-300",
      bgColor: "bg-pink-300/10",
      borderColor: "border-pink-300/20",
      title: "Amor & Valores",
      aspectName: "Vênus Conjunção Marte",
      description: "Este é um dos indicadores mais fortes de atração física e romântica. O estilo de amar de um atende perfeitamente aos desejos e impulsos do outro. Paixão intensa."
    },
    {
      planet: "Marte",
      icon: <IconMars size={20} />,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      borderColor: "border-red-400/20",
      title: "Ação & Desejo",
      aspectName: "Marte Quadratura Saturno",
      description: "Pode haver momentos de frustração onde o ritmo de um é bloqueado pela cautela do outro. É necessário paciência para coordenar as ações conjuntas sem conflito."
    }
  ];

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden">
      <ShareModal 
        isOpen={showShare} 
        onClose={() => setShowShare(false)} 
        title="Compartilhar Sinastria"
        shareText={`Nossa compatibilidade astral é de ${compatibilityScore}%! ❤️`}
      />

      {/* Top App Bar - Fixed */}
      <header className="flex items-center justify-between p-4 pb-2 z-20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5 absolute top-0 w-full">
        <button 
            onClick={() => onNavigate(View.HOME)}
            className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Sinastria</h1>
        <div className="flex w-10 items-center justify-end">
          <button 
            onClick={handleShare}
            className="text-slate-900 dark:text-white flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">ios_share</span>
          </button>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pt-16 pb-32">
        {/* Hero Section: Score */}
        <section className="relative flex flex-col items-center justify-center pt-8 pb-6 px-6 bg-gradient-to-b from-pink-900/10 to-transparent">
           {/* Names */}
          <div className="flex items-center justify-center gap-4 mb-6 w-full">
             <div className="flex flex-col items-center">
               <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30 mb-1">
                  <span className="font-bold text-lg">A</span>
               </div>
               <span className="text-[10px] uppercase font-bold text-white/60 truncate max-w-[80px]">{userData.name.split(' ')[0]}</span>
             </div>
             
             <div className="flex flex-col items-center">
               <span className="material-symbols-outlined text-pink-400 animate-pulse">favorite</span>
             </div>

             <div className="flex flex-col items-center">
               <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 border border-pink-500/30 mb-1">
                  <span className="font-bold text-lg">{partnerData.name ? partnerData.name.charAt(0) : 'P'}</span>
               </div>
               <span className="text-[10px] uppercase font-bold text-white/60 truncate max-w-[80px]">{partnerData.name ? partnerData.name.split(' ')[0] : 'Parceiro'}</span>
             </div>
          </div>

          {/* Big Circle Score */}
          <div className="relative w-48 h-48 flex items-center justify-center">
             {/* Background Glow */}
             <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
             
             {/* SVG Circle Progress */}
             <svg className="w-full h-full transform -rotate-90">
               <circle 
                 cx="96" cy="96" r="88" 
                 stroke="currentColor" strokeWidth="8" fill="transparent" 
                 className="text-white/10" 
               />
               <circle 
                 cx="96" cy="96" r="88" 
                 stroke="currentColor" strokeWidth="8" fill="transparent" 
                 strokeDasharray={2 * Math.PI * 88} 
                 strokeDashoffset={2 * Math.PI * 88 * (1 - compatibilityScore / 100)} 
                 className="text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] transition-all duration-1000 ease-out"
                 strokeLinecap="round"
               />
             </svg>
             
             <div className="absolute flex flex-col items-center">
               <span className="text-5xl font-display font-bold text-white">{compatibilityScore}%</span>
               <span className="text-xs uppercase tracking-widest text-pink-300 font-medium mt-1">Compatibilidade</span>
             </div>
          </div>
          
          <p className="mt-4 text-center text-white/80 text-sm italic max-w-xs">
            "Uma conexão intensa e transformadora, marcada por profunda compreensão emocional."
          </p>
        </section>

        {/* Aspects Grid (Summary) */}
        <section className="px-4 py-2">
          <h3 className="text-white text-base font-bold mb-3 px-1">Resumo dos Pilares</h3>
          <div className="grid grid-cols-1 gap-3">
            {/* Aspect 1 */}
            <div className="bg-surface-dark border border-white/5 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-300 shrink-0">
                 <IconMoon size={24} />
              </div>
              <div className="flex-1">
                 <div className="flex justify-between items-center mb-1">
                   <h4 className="font-bold text-white">Emocional</h4>
                   <span className="text-xs font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Excelente</span>
                 </div>
                 <div className="w-full bg-white/5 rounded-full h-1.5">
                   <div className="bg-blue-400 h-1.5 rounded-full w-[90%]"></div>
                 </div>
              </div>
            </div>
             {/* Aspect 2 */}
             <div className="bg-surface-dark border border-white/5 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-300 shrink-0">
                 <IconMars size={24} />
              </div>
              <div className="flex-1">
                 <div className="flex justify-between items-center mb-1">
                   <h4 className="font-bold text-white">Atração</h4>
                   <span className="text-xs font-bold bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">Intenso</span>
                 </div>
                 <div className="w-full bg-white/5 rounded-full h-1.5">
                   <div className="bg-red-500 h-1.5 rounded-full w-[95%]"></div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Analysis Section */}
        <section className="px-4 py-6">
          <div className="flex items-center gap-2 mb-4 px-1">
            <span className="material-symbols-outlined text-pink-400 text-lg">auto_awesome</span>
            <h3 className="text-white text-lg font-bold">Interpretação Detalhada</h3>
          </div>
          
          <div className="flex flex-col gap-4">
            {aspectsDetails.map((item, index) => (
              <div key={index} className="group relative overflow-hidden bg-surface-dark rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all">
                <div className={`absolute top-0 right-0 w-24 h-24 ${item.bgColor} rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-110`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${item.bgColor} ${item.color} border ${item.borderColor}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold leading-tight">{item.title}</h4>
                      <p className={`text-xs font-medium uppercase tracking-wider ${item.color}`}>{item.planet}</p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <span className="inline-block py-1 px-2 rounded-md bg-white/5 text-[10px] font-bold text-white/70 border border-white/5 uppercase tracking-wide">
                      {item.aspectName}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Aspect Highlight */}
        <div className="px-4 pb-4">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-900/40 to-purple-900/40 border border-pink-500/20 relative overflow-hidden">
             <div className="absolute -right-6 -top-6 w-20 h-20 bg-pink-500/20 blur-xl rounded-full"></div>
             <h4 className="font-bold text-pink-200 text-sm mb-2 flex items-center gap-2 relative z-10">
               <span className="material-symbols-outlined text-sm">stars</span>
               Aspecto de Alma
             </h4>
             <p className="text-white text-base font-bold relative z-10">Sol Conjunção Ascendente</p>
             <p className="text-xs text-white/70 mt-2 font-light leading-relaxed relative z-10">
               Esta é uma das melhores indicações para um relacionamento duradouro. Vocês se entendem intuitivamente e a identidade de um reforça a do outro, criando um laço difícil de quebrar.
             </p>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center z-30 pointer-events-none max-w-md mx-auto">
        <button className="pointer-events-auto bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_4px_20px_rgba(219,39,119,0.4)] flex items-center gap-2 transform transition-transform active:scale-95 border border-pink-400/20 backdrop-blur-sm">
          <span className="material-symbols-outlined">auto_stories</span>
          <span>Análise Completa em PDF</span>
        </button>
      </div>
      
       {/* Gradient overlay at bottom */}
       <div className="fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background-dark to-transparent pointer-events-none z-10 max-w-md mx-auto"></div>
    </div>
  );
}