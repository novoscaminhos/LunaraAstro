
import React, { useState, memo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { View } from '../types';
import { 
  PLANET_DATA, 
  PLANET_SYMBOLOGY 
} from '../data/astralData';

interface InputAstralScreenProps {
  onNavigate: (view: View) => void;
  onProcess: (data: any) => void;
  isLoading: boolean;
}

const SIGNS = ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"];
const HOUSES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const DIGNITIES = ["Peregrino", "Domicílio", "Exaltação", "Detrimento", "Queda"];

const PLANET_MAP: Record<string, string> = {
  'sun': 'Sol',
  'moon': 'Lua',
  'mercury': 'Mercúrio',
  'venus': 'Vênus',
  'mars': 'Marte',
  'jupiter': 'Júpiter',
  'saturn': 'Saturno',
  'uranus': 'Urano',
  'neptune': 'Netuno',
  'pluto': 'Plutão',
  'lilith': 'Lilith',
  'chiron': 'Kiron',
  'ascendant': 'Ascendente',
  'midheaven': 'Meio do Céu',
  'northNode': 'Nodo Norte'
};

const ENG_TO_PT_SIGNS: Record<string, string> = {
  "Aries": "Áries", "Taurus": "Touro", "Gemini": "Gêmeos", "Cancer": "Câncer",
  "Leo": "Leão", "Virgo": "Virgem", "Libra": "Libra", "Scorpio": "Escorpião",
  "Sagittarius": "Sagitário", "Capricorn": "Capricórnio", "Aquarius": "Aquário", "Pisces": "Peixes"
};

// Componente extraído e memorizado para evitar re-renderizações que causam perda de foco/scroll
interface InputRowProps {
  label: string;
  planetId: string;
  signKey: string;
  houseKey?: string;
  degreeKey: string;
  retrogradeKey?: string;
  dignityKey?: string;
  formData: any;
  onChange: (key: string, value: any) => void;
}

const InputRow = memo(({ label, planetId, signKey, houseKey, degreeKey, retrogradeKey, dignityKey, formData, onChange }: InputRowProps) => {
  const currentSign = formData[signKey];
  const currentHouse = houseKey ? formData[houseKey] : null;
  const currentDegree = formData[degreeKey];
  const isRetrograde = retrogradeKey ? formData[retrogradeKey] : false;
  const currentDignity = dignityKey ? formData[dignityKey] : "Peregrino";
  
  const planetName = PLANET_MAP[planetId];
  const signInterp = PLANET_DATA[planetName]?.signs[currentSign] || "";

  return (
    <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-2xl border border-white/10 mb-6 transition-all hover:bg-white/[0.08]">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[11px] font-bold text-primary-light uppercase tracking-[0.2em]">{label}</h3>
        <span className="material-symbols-outlined text-xs text-white/20">explore</span>
      </div>
      
      {/* Linha 1: Signo, Grau, Casa */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-[9px] text-white/40 uppercase font-bold tracking-widest ml-1 mb-1 block">Signo</label>
          <select 
            value={currentSign} 
            onChange={(e) => onChange(signKey, e.target.value)}
            className="w-full bg-background-dark border border-white/10 rounded-xl text-xs p-3 text-white focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
          >
            {SIGNS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="w-20">
          <label className="text-[9px] text-white/40 uppercase font-bold tracking-widest ml-1 mb-1 block">Grau</label>
          <input 
            type="number"
            min="0"
            max="29"
            value={currentDegree}
            onChange={(e) => onChange(degreeKey, parseInt(e.target.value))}
            className="w-full bg-background-dark border border-white/10 rounded-xl text-xs p-3 text-white text-center focus:ring-1 focus:ring-primary"
          />
        </div>
        {houseKey && (
          <div className="w-16">
            <label className="text-[9px] text-white/40 uppercase font-bold tracking-widest ml-1 mb-1 block">Casa</label>
            <select 
              value={currentHouse} 
              onChange={(e) => onChange(houseKey, parseInt(e.target.value))}
              className="w-full bg-background-dark border border-white/10 rounded-xl text-xs p-3 text-white text-center cursor-pointer focus:ring-1 focus:ring-primary"
            >
              {HOUSES.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* Linha 2: Dignidade e Retrógrado (Se aplicável) */}
      {(dignityKey || retrogradeKey) && (
        <div className="flex gap-3 mt-2 pt-2 border-t border-white/5">
          {dignityKey && (
             <div className="flex-1">
                <label className="text-[9px] text-white/40 uppercase font-bold tracking-widest ml-1 mb-1 block">Dignidade</label>
                <select 
                  value={currentDignity} 
                  onChange={(e) => onChange(dignityKey, e.target.value)}
                  className="w-full bg-background-dark border border-white/10 rounded-xl text-xs p-2 text-white/80 focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                >
                  {DIGNITIES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
             </div>
          )}
          {retrogradeKey && (
             <div className="flex flex-col justify-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer bg-background-dark border border-white/10 rounded-xl p-2 px-3 hover:border-white/30 transition-colors">
                  <input 
                    type="checkbox"
                    checked={isRetrograde}
                    onChange={(e) => onChange(retrogradeKey, e.target.checked)}
                    className="w-4 h-4 rounded border-gray-500 text-primary focus:ring-primary bg-transparent"
                  />
                  <span className="text-[10px] font-bold text-white/70 uppercase">Retrógrado (Rx)</span>
                </label>
             </div>
          )}
        </div>
      )}

      <div className="mt-2 pt-2 animate-fade-in">
         {signInterp && (
           <div className="flex gap-2">
              <span className="material-symbols-outlined text-[10px] text-primary-light/60 mt-0.5">auto_awesome</span>
              <p className="text-[10px] text-gray-400 leading-relaxed font-serif italic line-clamp-2">
                 {signInterp}
              </p>
           </div>
         )}
      </div>
    </div>
  );
});

export default function InputAstralScreen({ onNavigate, onProcess, isLoading }: InputAstralScreenProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    // Sol, Lua, Asc não costumam ser retrógrados (Sol/Lua nunca, Asc é ponto)
    sunSign: "Áries", sunHouse: 1, sunDegree: 15, sunDignity: "Peregrino",
    moonSign: "Áries", moonHouse: 1, moonDegree: 15, moonDignity: "Peregrino",
    ascendantSign: "Áries", ascendantDegree: 15,
    midheavenSign: "Áries", midheavenDegree: 0,
    northNodeSign: "Áries", northNodeDegree: 0, northNodeRetrograde: true, // Nodos são geralmente retrógrados

    // Planetas
    mercurySign: "Áries", mercuryHouse: 1, mercuryDegree: 15, mercuryRetrograde: false, mercuryDignity: "Peregrino",
    venusSign: "Áries", venusHouse: 1, venusDegree: 15, venusRetrograde: false, venusDignity: "Peregrino",
    marsSign: "Áries", marsHouse: 1, marsDegree: 15, marsRetrograde: false, marsDignity: "Peregrino",
    jupiterSign: "Áries", jupiterHouse: 1, jupiterDegree: 15, jupiterRetrograde: false, jupiterDignity: "Peregrino",
    saturnSign: "Áries", saturnHouse: 1, saturnDegree: 15, saturnRetrograde: false, saturnDignity: "Peregrino",
    uranusSign: "Áries", uranusHouse: 1, uranusDegree: 15, uranusRetrograde: false, uranusDignity: "Peregrino",
    neptuneSign: "Áries", neptuneHouse: 1, neptuneDegree: 15, neptuneRetrograde: false, neptuneDignity: "Peregrino",
    plutoSign: "Áries", plutoHouse: 1, plutoDegree: 15, plutoRetrograde: false, plutoDignity: "Peregrino",
    lilithSign: "Áries", lilithHouse: 1, lilithDegree: 15, lilithDignity: "Peregrino",
    chironSign: "Áries", chironHouse: 1, chironDegree: 15, chironRetrograde: false, chironDignity: "Peregrino",
  });

  const [images, setImages] = useState<{ chart?: string, panorama?: string }>({});

  // Handler unificado para evitar recriação de funções
  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const processFile = (file: File, key: keyof typeof images) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages(prev => ({ ...prev, [key]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof images) => {
    const file = e.target.files?.[0];
    if (file) processFile(file, key);
  };

  const handlePaste = (e: React.ClipboardEvent, key: keyof typeof images) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) processFile(file, key);
      }
    }
  };

  const removeImage = (e: React.MouseEvent, key: keyof typeof images) => {
    e.stopPropagation();
    setImages(prev => {
      const newImages = { ...prev };
      delete newImages[key];
      return newImages;
    });
  };

  const analyzeImagesWithAI = async () => {
    if (!images.chart && !images.panorama) {
        alert("Por favor, adicione pelo menos uma imagem (Mapa Natal ou Panorama) para análise.");
        return;
    }

    setIsAnalyzing(true);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const promptText = `
            Atue como um astrólogo especialista analisando gráficos técnicos.
            Analise as imagens fornecidas (roda astrológica e/ou tabela de posições). 
            Extraia com precisão os dados técnicos para os seguintes pontos:
            Sol, Lua, Ascendente, Meio do Céu (MC), Nodo Norte, Mercúrio, Vênus, Marte, Júpiter, Saturno, Urano, Netuno, Plutão, Lilith, Kiron.
            
            Para cada planeta, identifique:
            1. Signo (Inglês)
            2. Grau (0-29)
            3. Casa (1-12)
            4. Se está retrógrado (isRetrograde: true/false). Geralmente indicado por um 'Rx' ou 'R' pequeno ao lado do glifo.

            Retorne APENAS um objeto JSON válido.
            Estrutura exigida:
            {
              "sun": { "sign": "Aries", "degree": 0, "house": 1 },
              "mercury": { "sign": "Taurus", "degree": 12, "house": 2, "isRetrograde": true },
              ...
            }
        `;

        const parts: any[] = [];
        parts.push({ text: promptText });

        if (images.chart) {
            parts.push({
                inlineData: {
                    data: images.chart.split(',')[1],
                    mimeType: "image/jpeg"
                }
            });
        }
        if (images.panorama) {
            parts.push({
                inlineData: {
                    data: images.panorama.split(',')[1],
                    mimeType: "image/jpeg"
                }
            });
        }

        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp",
            contents: { parts: parts },
            config: {
                responseMimeType: "application/json"
            }
        });
        
        const responseText = result.text;
        
        if (!responseText) throw new Error("Sem resposta da IA");

        const data = JSON.parse(responseText);

        // Mapear dados da IA para o estado do formulário
        const translateSign = (engSign: string) => ENG_TO_PT_SIGNS[engSign] || "Áries";
        
        setFormData(prev => ({
            ...prev,
            sunSign: translateSign(data.sun?.sign), sunHouse: data.sun?.house || 1, sunDegree: data.sun?.degree || 0,
            moonSign: translateSign(data.moon?.sign), moonHouse: data.moon?.house || 1, moonDegree: data.moon?.degree || 0,
            ascendantSign: translateSign(data.ascendant?.sign), ascendantDegree: data.ascendant?.degree || 0,
            midheavenSign: translateSign(data.midheaven?.sign), midheavenDegree: data.midheaven?.degree || 0,
            northNodeSign: translateSign(data.northNode?.sign), northNodeDegree: data.northNode?.degree || 0,
            
            mercurySign: translateSign(data.mercury?.sign), mercuryHouse: data.mercury?.house || 1, mercuryDegree: data.mercury?.degree || 0, mercuryRetrograde: !!data.mercury?.isRetrograde,
            venusSign: translateSign(data.venus?.sign), venusHouse: data.venus?.house || 1, venusDegree: data.venus?.degree || 0, venusRetrograde: !!data.venus?.isRetrograde,
            marsSign: translateSign(data.mars?.sign), marsHouse: data.mars?.house || 1, marsDegree: data.mars?.degree || 0, marsRetrograde: !!data.mars?.isRetrograde,
            jupiterSign: translateSign(data.jupiter?.sign), jupiterHouse: data.jupiter?.house || 1, jupiterDegree: data.jupiter?.degree || 0, jupiterRetrograde: !!data.jupiter?.isRetrograde,
            saturnSign: translateSign(data.saturn?.sign), saturnHouse: data.saturn?.house || 1, saturnDegree: data.saturn?.degree || 0, saturnRetrograde: !!data.saturn?.isRetrograde,
            uranusSign: translateSign(data.uranus?.sign), uranusHouse: data.uranus?.house || 1, uranusDegree: data.uranus?.degree || 0, uranusRetrograde: !!data.uranus?.isRetrograde,
            neptuneSign: translateSign(data.neptune?.sign), neptuneHouse: data.neptune?.house || 1, neptuneDegree: data.neptune?.degree || 0, neptuneRetrograde: !!data.neptune?.isRetrograde,
            plutoSign: translateSign(data.pluto?.sign), plutoHouse: data.pluto?.house || 1, plutoDegree: data.pluto?.degree || 0, plutoRetrograde: !!data.pluto?.isRetrograde,
            lilithSign: translateSign(data.lilith?.sign), lilithHouse: data.lilith?.house || 1, lilithDegree: data.lilith?.degree || 0,
            chironSign: translateSign(data.chiron?.sign), chironHouse: data.chiron?.house || 1, chironDegree: data.chiron?.degree || 0, chironRetrograde: !!data.chiron?.isRetrograde,
        }));

    } catch (error: any) {
        console.error("Erro na leitura da IA:", error);
        alert(`Erro na análise: ${error.message || "Verifique sua chave API ou tente outra imagem."}`);
    } finally {
        setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      sun: { name: 'Sol', sign: formData.sunSign, house: formData.sunHouse, degree: formData.sunDegree, dignity: formData.sunDignity },
      moon: { name: 'Lua', sign: formData.moonSign, house: formData.moonHouse, degree: formData.moonDegree, dignity: formData.moonDignity },
      ascendant: { name: 'Ascendente', sign: formData.ascendantSign, house: 1, degree: formData.ascendantDegree },
      midheavenSign: formData.midheavenSign,
      midheavenDegree: formData.midheavenDegree,
      northNodeSign: formData.northNodeSign,
      northNodeDegree: formData.northNodeDegree,
      planets: [
        { name: 'Mercúrio', sign: formData.mercurySign, house: formData.mercuryHouse, degree: formData.mercuryDegree, isRetrograde: formData.mercuryRetrograde, dignity: formData.mercuryDignity },
        { name: 'Vênus', sign: formData.venusSign, house: formData.venusHouse, degree: formData.venusDegree, isRetrograde: formData.venusRetrograde, dignity: formData.venusDignity },
        { name: 'Marte', sign: formData.marsSign, house: formData.marsHouse, degree: formData.marsDegree, isRetrograde: formData.marsRetrograde, dignity: formData.marsDignity },
        { name: 'Júpiter', sign: formData.jupiterSign, house: formData.jupiterHouse, degree: formData.jupiterDegree, isRetrograde: formData.jupiterRetrograde, dignity: formData.jupiterDignity },
        { name: 'Saturno', sign: formData.saturnSign, house: formData.saturnHouse, degree: formData.saturnDegree, isRetrograde: formData.saturnRetrograde, dignity: formData.saturnDignity },
        { name: 'Urano', sign: formData.uranusSign, house: formData.uranusHouse, degree: formData.uranusDegree, isRetrograde: formData.uranusRetrograde, dignity: formData.uranusDignity },
        { name: 'Netuno', sign: formData.neptuneSign, house: formData.neptuneHouse, degree: formData.neptuneDegree, isRetrograde: formData.neptuneRetrograde, dignity: formData.neptuneDignity },
        { name: 'Plutão', sign: formData.plutoSign, house: formData.plutoHouse, degree: formData.plutoDegree, isRetrograde: formData.plutoRetrograde, dignity: formData.plutoDignity },
        { name: 'Lilith', sign: formData.lilithSign, house: formData.lilithHouse, degree: formData.lilithDegree, dignity: formData.lilithDignity },
        { name: 'Kiron', sign: formData.chironSign, house: formData.chironHouse, degree: formData.chironDegree, isRetrograde: formData.chironRetrograde, dignity: formData.chironDignity },
      ],
      chartImage: images.chart,
      panoramaImage: images.panorama,
    };
    onProcess(data);
  };

  const ImageUploadBox = ({ id, label, icon, currentImg, fieldKey }: { id: string, label: string, icon: string, currentImg?: string, fieldKey: keyof typeof images }) => (
    <div 
        tabIndex={0}
        onPaste={(e) => handlePaste(e, fieldKey)}
        className={`bg-white/5 p-4 rounded-2xl border ${currentImg ? 'border-primary/40' : 'border-dashed border-white/10'} hover:border-primary/40 focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all group flex flex-col gap-3 outline-none relative`}
    >
        <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">{icon}</span>
                {label}
            </label>
            {currentImg && (
              <button 
                onClick={(e) => removeImage(e, fieldKey)}
                className="p-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors flex items-center justify-center"
                title="Remover imagem"
              >
                <span className="material-symbols-outlined text-xs">close</span>
              </button>
            )}
        </div>
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
                <input type="file" id={id} accept="image/*" onChange={(e) => handleImageUpload(e, fieldKey)} className="hidden" />
                <label htmlFor={id} className="bg-primary/20 hover:bg-primary/40 text-primary-light px-4 py-2 rounded-lg text-[9px] font-bold uppercase cursor-pointer transition-all border border-primary/20">
                    {currentImg ? 'Alterar Imagem' : 'Selecionar Arquivo'}
                </label>
                {currentImg && (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                        <img src={currentImg} alt="Thumbnail" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>
            <p className="text-[8px] text-white/20 uppercase tracking-tighter">
                Ou selecione este campo e pressione <span className="text-white/40 font-bold">Ctrl+V</span> para colar
            </p>
        </div>
    </div>
  );

  return (
    <div className="relative flex flex-col min-h-screen bg-background-dark max-w-md mx-auto no-scrollbar overflow-y-auto">
      <header className="sticky top-0 z-50 glass-panel p-4 flex items-center justify-between border-b border-white/5">
        <button onClick={() => onNavigate(View.HOME)} className="material-symbols-outlined text-white/70 hover:text-white transition-colors">arrow_back</button>
        <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">Entrada Técnica</h2>
        <div className="w-6"></div>
      </header>

      <main className="flex-1 p-6 pb-40">
        <div className="mb-10 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] uppercase tracking-widest text-primary-light mb-4 animate-pulse">
            Sincronização Cósmica Ativa
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mb-2 tracking-tight">Dados do Cosmograma</h1>
          <p className="text-xs text-white/40 mb-6 max-w-xs mx-auto">
             Carregue as imagens do mapa (AstroLink/Astro.com) e deixe a IA extrair os dados, ou preencha manualmente.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Documentação Visual no Topo */}
          <div className="mb-8 space-y-4">
             <h2 className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] mb-6 mt-4 flex items-center gap-2">
                <div className="h-px flex-1 bg-white/5"></div>
                Documentação Visual
                <div className="h-px flex-1 bg-white/5"></div>
             </h2>
             <ImageUploadBox 
                id="chartImg" 
                label="Mapa Natal (Roda)" 
                icon="radio_button_checked" 
                currentImg={images.chart} 
                fieldKey="chart"
            />
            <ImageUploadBox 
                id="panoramaImg" 
                label="Panorama Geral" 
                icon="panorama" 
                currentImg={images.panorama} 
                fieldKey="panorama"
            />

            {(images.chart || images.panorama) && (
                <button 
                    type="button"
                    onClick={analyzeImagesWithAI}
                    disabled={isAnalyzing}
                    className="w-full py-3 bg-gradient-to-r from-primary/30 to-purple-600/30 border border-primary/40 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white hover:bg-primary/40 transition-all flex items-center justify-center gap-2 animate-fade-in"
                >
                    {isAnalyzing ? (
                         <><span className="material-symbols-outlined text-sm animate-spin">sync</span> Lendo Estrelas...</>
                    ) : (
                         <><span className="material-symbols-outlined text-sm">auto_awesome</span> Preencher Automaticamente com IA</>
                    )}
                </button>
            )}
          </div>

          <div className="space-y-4">
             <h2 className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] mb-6 mt-12 flex items-center gap-2">
                <div className="h-px flex-1 bg-white/5"></div>
                Luminares e Eixos
                <div className="h-px flex-1 bg-white/5"></div>
             </h2>
             <InputRow label="Sol" planetId="sun" signKey="sunSign" houseKey="sunHouse" degreeKey="sunDegree" dignityKey="sunDignity" formData={formData} onChange={handleFieldChange} />
             <InputRow label="Lua" planetId="moon" signKey="moonSign" houseKey="moonHouse" degreeKey="moonDegree" dignityKey="moonDignity" formData={formData} onChange={handleFieldChange} />
             <InputRow label="Ascendente" planetId="ascendant" signKey="ascendantSign" degreeKey="ascendantDegree" formData={formData} onChange={handleFieldChange} />
             <InputRow label="Meio do Céu" planetId="midheaven" signKey="midheavenSign" degreeKey="midheavenDegree" formData={formData} onChange={handleFieldChange} />
             <InputRow label="Nodo Norte" planetId="northNode" signKey="northNodeSign" degreeKey="northNodeDegree" formData={formData} onChange={handleFieldChange} />

             <h2 className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] mb-6 mt-12 flex items-center gap-2">
                <div className="h-px flex-1 bg-white/5"></div>
                Dinamismo Pessoal
                <div className="h-px flex-1 bg-white/5"></div>
             </h2>
             <InputRow label="Mercúrio" planetId="mercury" signKey="mercurySign" houseKey="mercuryHouse" degreeKey="mercuryDegree" retrogradeKey="mercuryRetrograde" dignityKey="mercuryDignity" formData={formData} onChange={handleFieldChange} />
             <InputRow label="Vênus" planetId="venus" signKey="venusSign" houseKey="venusHouse" degreeKey="venusDegree" retrogradeKey="venusRetrograde" dignityKey="venusDignity" formData={formData} onChange={handleFieldChange} />
             <InputRow label="Marte" planetId="mars" signKey="marsSign" houseKey="marsHouse" degreeKey="marsDegree" retrogradeKey="marsRetrograde" dignityKey="marsDignity" formData={formData} onChange={handleFieldChange} />

             <h2 className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] mb-6 mt-12 flex items-center gap-2">
                <div className="h-px flex-1 bg-white/5"></div>
                Social e Geracional
                <div className="h-px flex-1 bg-white/5"></div>
             </h2>
             <InputRow label="Júpiter" planetId="jupiter" signKey="jupiterSign" houseKey="jupiterHouse" degreeKey="jupiterDegree" retrogradeKey="jupiterRetrograde" dignityKey="jupiterDignity" formData={formData} onChange={handleFieldChange} />
             <InputRow label="Saturno" planetId="saturn" signKey="saturnSign" houseKey="saturnHouse" degreeKey="saturnDegree" retrogradeKey="saturnRetrograde" dignityKey="saturnDignity" formData={formData} onChange={handleFieldChange} />
             <InputRow label="Urano" planetId="uranus" signKey="uranusSign" houseKey="uranusHouse" degreeKey="uranusDegree" retrogradeKey="uranusRetrograde" dignityKey="uranusDignity" formData={formData} onChange={handleFieldChange} />
             <InputRow label="Netuno" planetId="neptune" signKey="neptuneSign" houseKey="neptuneHouse" degreeKey="neptuneDegree" retrogradeKey="neptuneRetrograde" dignityKey="neptuneDignity" formData={formData} onChange={handleFieldChange} />
             <InputRow label="Plutão" planetId="pluto" signKey="plutoSign" houseKey="plutoHouse" degreeKey="plutoDegree" retrogradeKey="plutoRetrograde" dignityKey="plutoDignity" formData={formData} onChange={handleFieldChange} />

             <h2 className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] mb-6 mt-12 flex items-center gap-2">
                <div className="h-px flex-1 bg-white/5"></div>
                Pontos de Cura (Kármicos)
                <div className="h-px flex-1 bg-white/5"></div>
             </h2>
             <InputRow label="Lilith" planetId="lilith" signKey="lilithSign" houseKey="lilithHouse" degreeKey="lilithDegree" dignityKey="lilithDignity" formData={formData} onChange={handleFieldChange} />
             <InputRow label="Kiron" planetId="chiron" signKey="chironSign" houseKey="chironHouse" degreeKey="chironDegree" retrogradeKey="chironRetrograde" dignityKey="chironDignity" formData={formData} onChange={handleFieldChange} />
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent z-40 max-w-md mx-auto">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-5 bg-primary rounded-2xl font-bold uppercase tracking-[0.3em] text-[11px] text-white shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50 border border-white/10"
              >
                {isLoading ? (
                    <><span className="animate-spin material-symbols-outlined text-lg">progress_activity</span> Sincronizando com a IA...</>
                ) : (
                    <><span className="material-symbols-outlined text-lg">auto_awesome</span> Gerar Análise Profunda</>
                )}
              </button>
          </div>
        </form>
      </main>
    </div>
  );
}
