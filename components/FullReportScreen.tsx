
import React from 'react';
import { View, UserData, AstralChartData, NumerologyData, PlanetPosition } from '../types';
import { 
  SIGN_PROFILES, 
  PLANETS_IN_HOUSES, 
  HOUSE_DESCRIPTIONS, 
  FORTUNE_SIGNS, 
  FORTUNE_HOUSES,
  MOTIVATION_DESCRIPTIONS,
  DESTINY_DESCRIPTIONS,
  MISSION_DESCRIPTIONS,
  PERSONAL_YEAR_DESCRIPTIONS,
  KARMIC_DEBT_DESCRIPTIONS,
  CHALLENGE_DESCRIPTIONS,
  DECISIVE_MOMENT_1_DESCRIPTIONS
} from '../data/astralData';
import { 
  IconSun, IconMoon, IconAscendant, IconMercury, IconVenus, IconMars, 
  IconJupiter, IconSaturn, IconUranus, IconNeptune, IconPluto 
} from './Icons';

interface FullReportScreenProps {
  userData: UserData;
  chartData: AstralChartData;
  numerologyData?: NumerologyData | null;
  onNavigate: (view: View) => void;
}

export default function FullReportScreen({ userData, chartData, numerologyData, onNavigate }: FullReportScreenProps) {
  
  const getPlanetIcon = (name: string) => {
    if (name.includes('Sol')) return <IconSun size={16} />;
    if (name.includes('Lua')) return <IconMoon size={16} />;
    if (name.includes('Mercúrio')) return <IconMercury size={16} />;
    if (name.includes('Vênus')) return <IconVenus size={16} />;
    if (name.includes('Marte')) return <IconMars size={16} />;
    if (name.includes('Júpiter')) return <IconJupiter size={16} />;
    if (name.includes('Saturno')) return <IconSaturn size={16} />;
    if (name.includes('Urano')) return <IconUranus size={16} />;
    if (name.includes('Netuno')) return <IconNeptune size={16} />;
    if (name.includes('Plutão')) return <IconPluto size={16} />;
    if (name.includes('Ascendente')) return <IconAscendant size={16} />;
    return <span className="material-symbols-outlined text-[16px]">public</span>;
  };

  const calculateElements = () => {
    // Fallback simples se elementalBalance não estiver preenchido
    const counts = { Fogo: 0, Terra: 0, Ar: 0, Água: 0 };
    const elementsMap: Record<string, string> = {
       "Áries": "Fogo", "Leão": "Fogo", "Sagitário": "Fogo",
       "Touro": "Terra", "Virgem": "Terra", "Capricórnio": "Terra",
       "Gêmeos": "Ar", "Libra": "Ar", "Aquário": "Ar",
       "Câncer": "Água", "Escorpião": "Água", "Peixes": "Água"
    };
    
    [chartData.sun, chartData.moon, chartData.ascendant, ...chartData.planets].forEach(p => {
        const el = elementsMap[p.sign];
        if (el) counts[el as keyof typeof counts]++;
    });
    
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    return { counts, total };
  };

  const { counts: elCounts, total: elTotal } = calculateElements();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-0 font-serif overflow-y-auto no-scrollbar print:bg-white report-container">
      {/* Menu Superior (Hidden on Print) */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md p-4 border-b flex justify-between items-center z-50 shadow-sm print:hidden">
         <button onClick={() => onNavigate(View.RESULT_ASTRAL)} className="text-primary flex items-center gap-2 font-bold hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors">
            <span className="material-symbols-outlined">arrow_back</span> Voltar
         </button>
         <button onClick={() => window.print()} className="bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined">print</span> Imprimir / Salvar PDF
         </button>
      </div>

      <div className="max-w-[21cm] mx-auto bg-white my-8 shadow-2xl print:my-0 print:shadow-none min-h-screen relative main-report-paper">
        
        {/* --- PÁGINA 1: CAPA --- */}
        <div className="page-break p-[2.5cm] flex flex-col items-center justify-center h-[29.7cm] relative overflow-hidden border-b">
            <div className="absolute top-0 left-0 w-full h-4 bg-primary"></div>
            <div className="absolute bottom-0 right-0 w-full h-4 bg-gold"></div>
            
            <div className="text-center space-y-2 mb-12">
                <h1 className="text-[24pt] font-bold uppercase tracking-[0.2em] text-primary">Dossier Astral</h1>
                <p className="text-slate-400 uppercase tracking-widest text-[10pt]">Mapeamento & Análise Numerológica</p>
            </div>
            
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-double border-primary/20 shadow-2xl mb-12 relative">
                <img src="Logo.jpeg" className="w-full h-full object-cover" alt="Logo" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
            
            <div className="text-center w-full">
              <h2 className="text-[28pt] font-bold text-slate-800 uppercase mb-2 tracking-tight">{userData.name}</h2>
              <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
              
              <div className="grid grid-cols-2 gap-8 text-left max-w-lg mx-auto bg-slate-50 p-8 rounded-2xl border border-slate-100">
                 <div>
                    <span className="text-[9pt] font-bold text-slate-400 uppercase tracking-widest block mb-1">Data</span>
                    <span className="text-[14pt] text-slate-700 font-display">{userData.birthDate}</span>
                 </div>
                 <div>
                    <span className="text-[9pt] font-bold text-slate-400 uppercase tracking-widest block mb-1">Hora</span>
                    <span className="text-[14pt] text-slate-700 font-display">{userData.birthTime || "Desconhecida"}</span>
                 </div>
                 <div className="col-span-2">
                    <span className="text-[9pt] font-bold text-slate-400 uppercase tracking-widest block mb-1">Local</span>
                    <span className="text-[14pt] text-slate-700 font-display">{userData.birthPlace || "Não informado"}</span>
                 </div>
              </div>
            </div>
            
            <div className="mt-auto text-slate-400 text-[9pt] flex items-center gap-2">
                <span className="material-symbols-outlined text-[12pt]">auto_awesome</span>
                Gerado via Lunara Intelligence System • {new Date().toLocaleDateString('pt-BR')}
            </div>
        </div>

        {/* --- PÁGINA 2: DADOS TÉCNICOS --- */}
        <div className="page-break p-[2cm]">
            <HeaderSection title="Ficha Técnica do Céu" icon="table_chart" />
            
            {/* Balanço de Elementos */}
            <div className="mb-10 bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h4 className="text-[10pt] font-bold uppercase tracking-widest mb-4 text-slate-500">Balanço Elemental</h4>
                <div className="space-y-3">
                    {Object.entries(elCounts).map(([elem, count]) => (
                        <div key={elem} className="flex items-center gap-4">
                            <span className="w-16 text-[9pt] font-bold uppercase text-slate-600">{elem}</span>
                            <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full ${
                                        elem === 'Fogo' ? 'bg-red-400' : 
                                        elem === 'Terra' ? 'bg-emerald-500' : 
                                        elem === 'Ar' ? 'bg-amber-400' : 'bg-blue-400'
                                    }`} 
                                    style={{ width: `${(count / elTotal) * 100}%` }}
                                ></div>
                            </div>
                            <span className="w-8 text-[9pt] text-right text-slate-500">{Math.round((count / elTotal) * 100)}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabela Planetária */}
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b-2 border-slate-800">
                        <th className="py-2 text-[10pt] uppercase tracking-wider text-slate-800">Planeta</th>
                        <th className="py-2 text-[10pt] uppercase tracking-wider text-slate-800">Signo</th>
                        <th className="py-2 text-[10pt] uppercase tracking-wider text-slate-800 text-center">Grau</th>
                        <th className="py-2 text-[10pt] uppercase tracking-wider text-slate-800 text-center">Casa</th>
                        <th className="py-2 text-[10pt] uppercase tracking-wider text-slate-800">Dignidade</th>
                    </tr>
                </thead>
                <tbody className="text-[10pt] text-slate-600">
                    {[chartData.sun, chartData.moon, chartData.ascendant, ...chartData.planets].map((p, idx) => (
                        <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="py-3 flex items-center gap-2 font-bold text-slate-700">
                                {getPlanetIcon(p.name)} {p.name} {p.isRetrograde && <span className="text-[8px] text-red-500 bg-red-100 px-1 rounded">Rx</span>}
                            </td>
                            <td className="py-3">{p.sign}</td>
                            <td className="py-3 text-center">{p.degree}°</td>
                            <td className="py-3 text-center">{p.house > 0 ? p.house : '-'}</td>
                            <td className="py-3">
                                {p.dignity && p.dignity !== "Peregrino" ? (
                                    <span className={`px-2 py-1 rounded text-[8px] font-bold uppercase tracking-wider ${
                                        p.dignity === 'Domicílio' || p.dignity === 'Exaltação' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {p.dignity}
                                    </span>
                                ) : <span className="text-slate-400 text-[9px] uppercase">Peregrino</span>}
                            </td>
                        </tr>
                    ))}
                     {chartData.northNode && (
                        <tr className="border-b border-slate-200">
                            <td className="py-3 flex items-center gap-2 font-bold text-slate-700"><span className="material-symbols-outlined text-[16px]">all_inclusive</span> Nodo Norte</td>
                            <td className="py-3">{chartData.northNode.sign}</td>
                            <td className="py-3 text-center">{chartData.northNode.degree}°</td>
                            <td className="py-3 text-center">-</td>
                            <td className="py-3 text-slate-400 text-[9px]">PONTO EVOLUTIVO</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* --- PÁGINA 3: A TRÍADE PRIMORDIAL --- */}
        <div className="page-break p-[2cm]">
            <HeaderSection title="A Tríade Primordial" icon="psychology" />
            
            <div className="space-y-8">
                {/* SOL */}
                <div className="border border-slate-200 rounded-xl p-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <IconSun size={100} />
                     </div>
                     <h3 className="text-[14pt] font-bold text-slate-800 flex items-center gap-2 mb-4">
                        <span className="text-amber-500"><IconSun size={24} /></span>
                        Sol em {chartData.sun.sign}
                     </h3>
                     <p className="text-[11pt] text-slate-600 leading-relaxed text-justify mb-4">
                        {SIGN_PROFILES[chartData.sun.sign]}
                     </p>
                     <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <h4 className="text-[10pt] font-bold text-amber-800 uppercase mb-1">Na Casa {chartData.sun.house}</h4>
                        <p className="text-[10pt] text-slate-600 italic">
                            {PLANETS_IN_HOUSES[chartData.sun.house]?.['Sol']}
                        </p>
                     </div>
                </div>

                {/* LUA */}
                <div className="border border-slate-200 rounded-xl p-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <IconMoon size={100} />
                     </div>
                     <h3 className="text-[14pt] font-bold text-slate-800 flex items-center gap-2 mb-4">
                        <span className="text-blue-400"><IconMoon size={24} /></span>
                        Lua em {chartData.moon.sign}
                     </h3>
                     <p className="text-[11pt] text-slate-600 leading-relaxed text-justify mb-4">
                        A Lua representa seu mundo emocional. Em {chartData.moon.sign}, a segurança é encontrada através das características deste signo.
                        {SIGN_PROFILES[chartData.moon.sign]}
                     </p>
                     <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 className="text-[10pt] font-bold text-blue-800 uppercase mb-1">Na Casa {chartData.moon.house}</h4>
                        <p className="text-[10pt] text-slate-600 italic">
                            {PLANETS_IN_HOUSES[chartData.moon.house]?.['Lua']}
                        </p>
                     </div>
                </div>

                {/* ASCENDENTE */}
                <div className="border border-slate-200 rounded-xl p-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <IconAscendant size={100} />
                     </div>
                     <h3 className="text-[14pt] font-bold text-slate-800 flex items-center gap-2 mb-4">
                        <span className="text-emerald-500"><IconAscendant size={24} /></span>
                        Ascendente em {chartData.ascendant.sign}
                     </h3>
                     <p className="text-[11pt] text-slate-600 leading-relaxed text-justify mb-4">
                        Sua máscara social e a maneira como inicia as coisas. {SIGN_PROFILES[chartData.ascendant.sign]}
                     </p>
                </div>
            </div>
        </div>

        {/* --- PÁGINA 4: ASPECTOS & KPI --- */}
        <div className="page-break p-[2cm]">
            <HeaderSection title="Geometria Sagrada" icon="polyline" />

            {/* Aspectos */}
            <div className="mb-10">
                <h4 className="text-[11pt] font-bold uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Aspectos Maiores</h4>
                <div className="grid grid-cols-1 gap-4">
                    {chartData.aspects && chartData.aspects.length > 0 ? chartData.aspects.map((aspect, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex gap-4">
                            <div className="flex flex-col items-center justify-center min-w-[60px] border-r border-slate-200 pr-4">
                                <span className="text-[18px] material-symbols-outlined text-slate-400">conversion_path</span>
                            </div>
                            <div>
                                <h5 className="font-bold text-slate-800 text-[10pt] uppercase mb-1">
                                    {aspect.planet1} {aspect.type} {aspect.planet2}
                                </h5>
                                <p className="text-[10pt] text-slate-600 leading-snug">
                                    {aspect.interpretation}
                                </p>
                            </div>
                        </div>
                    )) : (
                        <p className="text-slate-400 italic">Nenhum aspecto maior detectado ou dados insuficientes.</p>
                    )}
                </div>
            </div>

            {/* Parte da Fortuna */}
            {chartData.partOfFortune && (
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-amber-600 text-3xl">stars</span>
                        <div>
                            <h3 className="text-[12pt] font-bold text-slate-800 uppercase">Parte da Fortuna</h3>
                            <p className="text-[9pt] text-amber-700 font-bold uppercase tracking-widest">O Ponto de Ouro</p>
                        </div>
                    </div>
                    <p className="text-[11pt] text-slate-700 leading-relaxed text-justify mb-4">
                        Posicionada em <strong>{chartData.partOfFortune.sign}</strong> na <strong>Casa {chartData.partOfFortune.house}</strong>.
                    </p>
                    <p className="text-[10pt] text-slate-600 leading-relaxed bg-white/50 p-4 rounded-lg">
                        Sua prosperidade flui através de: <strong>{FORTUNE_SIGNS[chartData.partOfFortune.sign]}</strong>. <br/>
                        Área de ativação: <strong>{FORTUNE_HOUSES[chartData.partOfFortune.house]}</strong>.
                    </p>
                </div>
            )}
        </div>

        {/* --- NUMEROLOGIA (SE DISPONÍVEL) --- */}
        {numerologyData && (
            <>
                {/* PÁGINA 5: MAPA NUMEROLÓGICO - NÚCLEO */}
                <div className="page-break p-[2cm]">
                    <HeaderSection title="Mapa Numerológico Cabalístico" icon="tag" />
                    
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <NumerologyCard 
                            title="Destino (Caminho de Vida)" 
                            number={numerologyData.destinyNumber} 
                            description={DESTINY_DESCRIPTIONS[numerologyData.destinyNumber]}
                            color="bg-indigo-100 text-indigo-800"
                        />
                        <NumerologyCard 
                            title="Missão (Vocação)" 
                            number={numerologyData.missionNumber} 
                            description={MISSION_DESCRIPTIONS[numerologyData.missionNumber]}
                            color="bg-emerald-100 text-emerald-800"
                        />
                    </div>
                    
                    <div className="space-y-6">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                             <div className="flex justify-between items-center mb-2">
                                 <h4 className="font-bold text-slate-700 uppercase tracking-widest text-[10pt]">Motivação (Alma)</h4>
                                 <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded text-[10pt] font-bold">{numerologyData.motivationNumber}</span>
                             </div>
                             <p className="text-[10pt] text-slate-600 leading-relaxed">{MOTIVATION_DESCRIPTIONS[numerologyData.motivationNumber]}</p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                             <div className="flex justify-between items-center mb-2">
                                 <h4 className="font-bold text-slate-700 uppercase tracking-widest text-[10pt]">Ano Pessoal</h4>
                                 <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-[10pt] font-bold">{numerologyData.personalYear}</span>
                             </div>
                             <p className="text-[10pt] text-slate-600 leading-relaxed">{PERSONAL_YEAR_DESCRIPTIONS[numerologyData.personalYear]}</p>
                        </div>
                    </div>

                    {/* Dívidas Cármicas */}
                    {numerologyData.karmicDebts.length > 0 && (
                        <div className="mt-8 bg-red-50 p-6 rounded-xl border border-red-100">
                            <h4 className="text-[10pt] font-bold text-red-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined">warning</span> Alerta Cármico
                            </h4>
                            {numerologyData.karmicDebts.map(debt => (
                                <div key={debt} className="mb-3">
                                    <span className="font-bold text-red-700">Dívida {debt}: </span>
                                    <span className="text-slate-600 text-[10pt]">{KARMIC_DEBT_DESCRIPTIONS[debt]}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* PÁGINA 6: CICLOS E DESAFIOS */}
                <div className="page-break p-[2cm]">
                    <HeaderSection title="Ciclos Temporais & Desafios" icon="history" />
                    
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[11pt] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b pb-1">Desafios de Vida</h4>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <span className="block text-[9pt] uppercase text-slate-400 mb-1">1º Desafio</span>
                                    <span className="block text-[14pt] font-bold text-slate-800 mb-2">{numerologyData.challenge1}</span>
                                    <p className="text-[9pt] text-slate-600 leading-tight">{CHALLENGE_DESCRIPTIONS[numerologyData.challenge1]}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <span className="block text-[9pt] uppercase text-slate-400 mb-1">2º Desafio</span>
                                    <span className="block text-[14pt] font-bold text-slate-800 mb-2">{numerologyData.challenge2}</span>
                                    <p className="text-[9pt] text-slate-600 leading-tight">{CHALLENGE_DESCRIPTIONS[numerologyData.challenge2]}</p>
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                    <span className="block text-[9pt] uppercase text-red-400 mb-1">Desafio Maior</span>
                                    <span className="block text-[14pt] font-bold text-red-800 mb-2">{numerologyData.challenge3}</span>
                                    <p className="text-[9pt] text-slate-600 leading-tight">{CHALLENGE_DESCRIPTIONS[numerologyData.challenge3]}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[11pt] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b pb-1">Momentos Decisivos (Pinnacles)</h4>
                            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="p-3 text-[9pt] uppercase text-slate-500">Fase</th>
                                            <th className="p-3 text-[9pt] uppercase text-slate-500">Idade Aprox.</th>
                                            <th className="p-3 text-[9pt] uppercase text-slate-500 text-center">Vibração</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[10pt] text-slate-700 divide-y divide-slate-100">
                                        <tr>
                                            <td className="p-3 font-bold">1º Momento</td>
                                            <td className="p-3">0 a {numerologyData.ageRef1} anos</td>
                                            <td className="p-3 text-center font-bold bg-green-50 text-green-700">{numerologyData.decisiveMoment1}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold">2º Momento</td>
                                            <td className="p-3">{numerologyData.ageRef1} a {numerologyData.ageRef2} anos</td>
                                            <td className="p-3 text-center font-bold bg-green-50 text-green-700">{numerologyData.decisiveMoment2}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold">3º Momento</td>
                                            <td className="p-3">{numerologyData.ageRef2} a {numerologyData.ageRef3} anos</td>
                                            <td className="p-3 text-center font-bold bg-green-50 text-green-700">{numerologyData.decisiveMoment3}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold">4º Momento</td>
                                            <td className="p-3">{numerologyData.ageRef3}+ anos</td>
                                            <td className="p-3 text-center font-bold bg-green-50 text-green-700">{numerologyData.decisiveMoment4}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-4 text-[10pt] text-slate-600 bg-slate-50 p-4 rounded-lg italic">
                                <strong>Foco do 1º Momento:</strong> {DECISIVE_MOMENT_1_DESCRIPTIONS[numerologyData.decisiveMoment1]}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )}

      </div>
      
      {/* Estilos específicos para impressão */}
      <style>{`
        @media print {
            body { background: white; }
            .report-container { background: white; padding: 0; overflow: visible; }
            .main-report-paper { width: 100% !important; max-width: none !important; margin: 0 !important; box-shadow: none !important; }
            .page-break { page-break-after: always; height: 297mm; padding: 20mm; overflow: hidden; }
            .print\\:hidden { display: none !important; }
            button { display: none !important; }
            /* Reset colors for print consistency */
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        .page-break { min-height: 29.7cm; background: white; }
      `}</style>
    </div>
  );
}

const HeaderSection = ({ title, icon }: { title: string, icon: string }) => (
    <div className="flex items-center gap-4 mb-8 border-b-2 border-slate-100 pb-4">
        <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">{icon}</span>
        </div>
        <h2 className="text-[20pt] font-bold text-slate-800 uppercase tracking-tight">{title}</h2>
    </div>
);

const NumerologyCard = ({ title, number, description, color }: any) => (
    <div className={`p-6 rounded-2xl border border-slate-200 bg-white shadow-sm`}>
        <div className="flex justify-between items-start mb-4">
            <h4 className="text-[11pt] font-bold uppercase tracking-widest text-slate-500">{title}</h4>
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-[18pt] font-bold`}>
                {number}
            </div>
        </div>
        <p className="text-[10pt] text-slate-700 leading-relaxed text-justify">
            {description}
        </p>
    </div>
);
