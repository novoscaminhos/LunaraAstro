
import React from 'react';
import { View, UserData, AstralChartData, NumerologyData } from '../types';
import { SIGN_PROFILES, PLANETS_IN_HOUSES, HOUSE_DESCRIPTIONS, FORTUNE_SIGNS, FORTUNE_HOUSES } from '../data/astralData';

interface FullReportScreenProps {
  userData: UserData;
  chartData: AstralChartData;
  numerologyData?: NumerologyData | null;
  onNavigate: (view: View) => void;
}

export default function FullReportScreen({ userData, chartData, numerologyData, onNavigate }: FullReportScreenProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-0 font-serif overflow-y-auto no-scrollbar print:bg-white report-container">
      {/* Menu Superior */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md p-4 border-b flex justify-between items-center z-50 shadow-sm print:hidden">
         <button onClick={() => onNavigate(View.RESULT_ASTRAL)} className="text-primary flex items-center gap-2 font-bold">
            <span className="material-symbols-outlined">arrow_back</span> Voltar
         </button>
         <button onClick={() => window.print()} className="bg-primary text-white px-8 py-2 rounded-lg font-bold shadow-lg shadow-primary/20 flex items-center gap-2">
            <span className="material-symbols-outlined">print</span> Salvar como PDF
         </button>
      </div>

      <div className="max-w-[21cm] mx-auto bg-white my-8 shadow-2xl print:my-0 print:shadow-none min-h-screen relative main-report-paper">
        
        {/* PÁGINA 1: CAPA */}
        <div className="px-[2.5cm] py-[3cm] flex flex-col items-center justify-center h-[29.7cm] border-b-2 border-slate-100 break-after-page relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
            <h1 className="text-[16pt] font-bold uppercase tracking-[0.4em] mb-4 text-center">Dossier Astral Profissional</h1>
            <p className="text-slate-400 uppercase tracking-widest text-[10pt] mb-12">Processamento de Alta Precisão • Lunara</p>
            
            <div className="w-56 h-56 rounded-full overflow-hidden border-8 border-slate-50 shadow-xl mb-12">
                <img src="Logo.jpeg" className="w-full h-full object-cover" alt="Logo" />
            </div>
            
            <div className="text-center mb-12">
              <h2 className="text-[16pt] font-bold text-primary uppercase mb-8">{userData.name}</h2>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 w-full max-w-md mx-auto text-left space-y-3">
                 <div className="grid grid-cols-3 gap-2 border-b border-slate-200 pb-2">
                    <span className="text-[10pt] font-bold text-slate-400 uppercase">Nascimento</span>
                    <span className="text-[12pt] text-slate-700 col-span-2">{userData.birthDate}</span>
                 </div>
                 <div className="grid grid-cols-3 gap-2">
                    <span className="text-[10pt] font-bold text-slate-400 uppercase">Local</span>
                    <span className="text-[12pt] text-slate-700 col-span-2">{userData.birthPlace || "Não informado"}</span>
                 </div>
              </div>
            </div>
            <div className="mt-auto text-slate-400 text-[10pt] italic">Gerado por Lunara AI em {new Date().toLocaleDateString('pt-BR')}</div>
        </div>

        {/* PÁGINA 2: PARTE DA FORTUNA (KPI CÓSMICO) */}
        {chartData.partOfFortune && (
          <div className="px-[2.5cm] py-[2.5cm] flex flex-col h-[29.7cm] border-b-2 border-slate-100 break-after-page">
              <h3 className="text-[14pt] font-bold uppercase tracking-widest mb-10 text-slate-800 border-l-4 border-amber-500 pl-4">A Parte da Fortuna: KPI Cósmico</h3>
              <div className="bg-amber-50 p-8 rounded-3xl border border-amber-200 mb-8">
                  <div className="flex items-center justify-between mb-6">
                      <div>
                          <span className="text-[10pt] font-bold text-amber-700 uppercase tracking-widest">Signo de Fluxo</span>
                          <div className="text-[24pt] font-bold text-slate-800">{chartData.partOfFortune.sign}</div>
                      </div>
                      <div className="text-right">
                          <span className="text-[10pt] font-bold text-amber-700 uppercase tracking-widest">Casa Ativadora</span>
                          <div className="text-[24pt] font-bold text-slate-800">Casa {chartData.partOfFortune.house}</div>
                      </div>
                  </div>
                  <p className="text-[12pt] text-slate-700 leading-relaxed text-justify indent-8">
                      Diferente dos planetas, a Parte da Fortuna é um ponto de sinergia. Em {chartData.partOfFortune.sign}, a prosperidade flui através da {FORTUNE_SIGNS[chartData.partOfFortune.sign]}. Posicionada na Casa {chartData.partOfFortune.house}, esta energia se materializa quando você foca em {HOUSE_DESCRIPTIONS[chartData.partOfFortune.house].split(':')[1].trim()}.
                  </p>
                  <p className="mt-6 text-[11pt] font-bold text-amber-900 bg-amber-200/50 p-4 rounded-xl">
                      {FORTUNE_HOUSES[chartData.partOfFortune.house]}
                  </p>
              </div>
              <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h4 className="text-[11pt] font-bold uppercase mb-4">Sinergia Operacional</h4>
                  <p className="text-[11pt] text-slate-600 leading-relaxed">
                      Este ponto revela onde a vida coopera com você. Quando você para de forçar e alinha sua identidade (ASC) com seu propósito (Sol) e emoção (Lua), a sinergia na Casa {chartData.partOfFortune.house} acontece de forma natural. É o seu portal de menor resistência para a abundância.
                  </p>
              </div>
          </div>
        )}

        {/* PÁGINA 3: PLANETAS PESSOAIS */}
        <div className="px-[2.5cm] py-[2.5cm] flex flex-col h-[29.7cm] border-b-2 border-slate-100 break-after-page">
            <h3 className="text-[14pt] font-bold uppercase tracking-widest mb-10 text-slate-800 border-l-4 border-blue-500 pl-4">Dinâmicas da Psique (Planetas Pessoais)</h3>
            <div className="space-y-8">
                <section>
                    <h4 className="text-[12pt] font-bold text-blue-800 mb-2">Sol em {chartData.sun.sign} — Identidade</h4>
                    <p className="text-[11pt] text-slate-700 leading-relaxed">{SIGN_PROFILES[chartData.sun.sign]}</p>
                </section>
                <section>
                    <h4 className="text-[12pt] font-bold text-blue-800 mb-2">Lua em {chartData.moon.sign} — Emoção</h4>
                    <p className="text-[11pt] text-slate-700 leading-relaxed">{SIGN_PROFILES[chartData.moon.sign]}</p>
                </section>
                {chartData.planets.filter(p => p.category === 'Personal').map(p => (
                  <section key={p.name}>
                      <h4 className="text-[12pt] font-bold text-blue-800 mb-2">{p.name} em {p.sign} — Casa {p.house}</h4>
                      <p className="text-[11pt] text-slate-700 leading-relaxed">{PLANETS_IN_HOUSES[p.house]?.[p.name]}</p>
                  </section>
                ))}
            </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4; margin: 0; }
          .main-report-paper { width: 21cm !important; margin: 0 !important; box-shadow: none !important; }
          .break-after-page { page-break-after: always; }
          .print-hidden { display: none !important; }
        }
        .main-report-paper { line-height: 1.5; }
      `}</style>
    </div>
  );
}
