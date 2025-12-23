
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { View, UserData, AstralChartData, SavedMap, NumerologyData, Consultant, OracleState, PlanetPosition, HouseCusp, DailyHoroscope } from './types';
import { 
  SIGN_RULERS, 
  SIGN_ORDER, 
  SIGN_PROFILES,
  PLANET_CATEGORIES
} from './data/astralData';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import InputAstralScreen from './components/InputAstralScreen';
import InputNumerologyScreen from './components/InputNumerologyScreen';
import InputSynastryScreen from './components/InputSynastryScreen';
import SelectionScreen from './components/SelectionScreen';
import ResultAstralScreen from './components/ResultAstralScreen';
import ResultNumerologyScreen from './components/ResultNumerologyScreen';
import ResultSynastryScreen from './components/ResultSynastryScreen';
import LearnScreen from './components/LearnScreen';
import FullReportScreen from './components/FullReportScreen';
import SavedMapsScreen from './components/SavedMapsScreen';
import ProfileScreen from './components/ProfileScreen';
import OracleScreen from './components/OracleScreen';
import BiorhythmScreen from './components/BiorhythmScreen';

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.SPLASH);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMaps, setSavedMaps] = useState<SavedMap[]>([]);
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [oracleState, setOracleState] = useState<OracleState>({ response: '', loading: false, mode: 'fast' });
  
  const [userData, setUserData] = useState<UserData>({
    name: "",
    birthDate: "", 
    birthTime: "",
    birthPlace: ""
  });

  const [astralChart, setAstralChart] = useState<AstralChartData | null>(null);
  const [numerologyChart, setNumerologyChart] = useState<NumerologyData | null>(null);

  useEffect(() => {
    const storedMaps = localStorage.getItem('lunara_saved_maps');
    if (storedMaps) {
      try { setSavedMaps(JSON.parse(storedMaps)); } catch (e) { console.error(e); }
    }
    const storedConsultants = localStorage.getItem('lunara_consultants');
    if (storedConsultants) {
      try { setConsultants(JSON.parse(storedConsultants)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    if (currentView === View.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentView(View.HOME);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const navigateTo = (view: View) => {
    window.scrollTo(0, 0);
    setCurrentView(view);
  };

  const getRealTimeTransits = async () => {
    if (!userData.name) return;

    setOracleState({ response: '', loading: true, mode: 'fast' });
    navigateTo(View.ORACLE);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const now = new Date();
      const dateTimeString = now.toLocaleString('pt-BR');

      const prompt = `
        Aja como um Astrólogo Sênior e Engine de Efemérides.
        Data e Hora Atual: ${dateTimeString}.
        Consulente: ${userData.name}, Nascimento: ${userData.birthDate}.

        1. Calcule (estime com alta precisão baseada em seus dados de treinamento) a posição atual (Transits) dos planetas: Sol, Lua, Mercúrio, Vênus, Marte, Júpiter, Saturno.
        2. Analise como esse "Céu do Momento" impacta o consulente HOJE.
        3. Gere um JSON estrito com a seguinte estrutura:

        {
          "skyNow": [
            { "planet": "Sol", "sign": "SignoAtual" },
            { "planet": "Lua", "sign": "SignoAtual" },
            ... outros planetas
          ],
          "advice": {
            "love": "Conselho curto e direto sobre relacionamentos para hoje (max 20 palavras)",
            "finance": "Conselho curto e direto sobre dinheiro/trabalho para hoje (max 20 palavras)",
            "health": "Conselho curto e direto sobre vitalidade para hoje (max 20 palavras)"
          },
          "mantra": "Uma frase de poder para o dia."
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp', // Usando um modelo rápido e capaz de JSON
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const responseText = response.text;
      if (responseText) {
        const parsedData: DailyHoroscope = JSON.parse(responseText);
        setOracleState({ 
          response: parsedData, 
          loading: false, 
          mode: 'fast' 
        });
      } else {
         throw new Error("No data");
      }
    } catch (error) {
      console.error(error);
      setOracleState({ 
        response: "As estrelas estão nebulosas. Tente novamente mais tarde.", 
        loading: false, 
        mode: 'fast' 
      });
    }
  };

  const calculatePartOfFortune = (sun: any, moon: any, asc: any): PlanetPosition => {
    // 30 degrees per sign
    const sunAbs = (SIGN_ORDER.indexOf(sun.sign) * 30) + sun.degree;
    const moonAbs = (SIGN_ORDER.indexOf(moon.sign) * 30) + moon.degree;
    const ascAbs = (SIGN_ORDER.indexOf(asc.sign) * 30) + asc.degree;
    
    // Is Day? (Sun in Houses 7 to 12)
    const isDay = sun.house >= 7 && sun.house <= 12;
    
    let fortuneAbs;
    if (isDay) {
        fortuneAbs = (ascAbs + moonAbs - sunAbs);
    } else {
        fortuneAbs = (ascAbs + sunAbs - moonAbs);
    }
    
    // Normalize to [0, 360)
    fortuneAbs = (fortuneAbs % 360 + 360) % 360;
    
    const signIndex = Math.floor(fortuneAbs / 30);
    const degree = Math.floor(fortuneAbs % 30);
    
    // Simplistic House assignment based on distance from ASC for demo
    // In real app, would compare with full house cusps list
    let house = Math.floor(((fortuneAbs - ascAbs + 360) % 360) / 30) + 1;

    return {
        name: "Parte da Fortuna",
        sign: SIGN_ORDER[signIndex],
        degree: degree,
        house: house,
        category: 'Point'
    };
  };

  const calculateEqualHouses = (ascSign: string, ascDegree: number): HouseCusp[] => {
    const ascIndex = SIGN_ORDER.indexOf(ascSign);
    const cusps: HouseCusp[] = [];
    
    for (let i = 0; i < 12; i++) {
        // Equal House System logic: House 2 is exactly 30 degrees from House 1
        const houseSignIndex = (ascIndex + i) % 12;
        const sign = SIGN_ORDER[houseSignIndex];
        cusps.push({
            house: i + 1,
            sign: sign,
            ruler: SIGN_RULERS[sign]
        });
    }
    return cusps;
  };

  const handleProcessAstralData = async (manualData: any) => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Calculate Part of Fortune or Use Provided One
      let pof = manualData.partOfFortune;
      
      // If manual entry is missing key data, recalculate it
      if (!pof || !pof.sign) {
         pof = calculatePartOfFortune(manualData.sun, manualData.moon, manualData.ascendant);
      } else {
         // Ensure it follows structure
         pof = {
             name: "Parte da Fortuna",
             sign: pof.sign,
             house: pof.house || 1,
             degree: pof.degree || 0,
             category: 'Point'
         };
      }

      // Categorize Planets
      const categorizedPlanets = manualData.planets.map((p: any) => ({
        ...p,
        category: PLANET_CATEGORIES[p.name] || 'Transpersonal'
      }));

      const detectedAspects = [
        { 
          planet1: "Sol", 
          planet2: "Lua", 
          type: "Sextil", 
          interpretation: `Harmonia entre sua essência solar em ${manualData.sun.sign} e suas emoções lunares em ${manualData.moon.sign}.` 
        },
        { 
          planet1: "Marte", 
          planet2: "Urano", 
          type: "Quincúncio", 
          interpretation: "Nervosismo intermitente. Você sente uma necessidade de agir de forma inovadora, mas muitas vezes o timing parece errado." 
        }
      ];

      // Use Equal House system starting from Ascendant to ensure SVG wheel looks correct
      // (This fixes the "all houses equal" visual bug if data is missing)
      const inferredCusps = calculateEqualHouses(manualData.ascendant.sign, manualData.ascendant.degree);

      const mockAnalysis: AstralChartData = {
        sun: { ...manualData.sun, category: 'Personal' },
        moon: { ...manualData.moon, category: 'Personal' },
        ascendant: { ...manualData.ascendant, category: 'Point' },
        partOfFortune: pof,
        midheaven: { 
          sign: manualData.midheavenSign || "Virgem", 
          degree: manualData.midheavenDegree || 0,
          careerInterpretation: "Sua vocação aponta para a maestria através do detalhe, serviço e organização impecável." 
        },
        northNode: { 
          sign: manualData.northNodeSign || "Leão", 
          degree: manualData.northNodeDegree || 0,
          technicalContext: "Seu caminho de evolução aponta para a liderança criativa." 
        },
        houseCusps: inferredCusps,
        progressedMoon: { sign: "Libra", monthsRemaining: 12 },
        planets: categorizedPlanets,
        currentAstralMonth: manualData.sun.sign,
        potentials: {
          harmonic: ["Persistência inabalável", "Diplomacia inata"],
          disharmonic: ["Resistência a mudanças"]
        },
        aspects: detectedAspects,
        elementalBalance: { fire: 25, earth: 25, air: 25, water: 25, yang: 50, yin: 50 },
        deepAnalysis: `Seu mapa revela uma alma em busca de equilíbrio. A Parte da Fortuna em ${pof.sign} indica que seu fluxo operacional se ativa através de ${pof.sign}.`,
        chartImage: manualData.chartImage,
        panoramaImage: manualData.panoramaImage,
        sphericalMapImage: manualData.sphericalMapImage
      };

      setAstralChart(mockAnalysis);
      setIsLoading(false);
      navigateTo(View.RESULT_ASTRAL);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-background-dark text-white font-display">
      {currentView === View.SPLASH && <SplashScreen />}
      {currentView === View.HOME && <HomeScreen userData={userData} onUpdateUser={d => setUserData(p => ({...p, ...d}))} onNavigate={navigateTo} onQuickInsight={getRealTimeTransits} />}
      {currentView === View.ORACLE && <OracleScreen state={oracleState} onBack={() => navigateTo(View.HOME)} />}
      {currentView === View.INPUT_ASTRAL && <InputAstralScreen onNavigate={navigateTo} onProcess={handleProcessAstralData} isLoading={isLoading} />}
      {currentView === View.RESULT_ASTRAL && <ResultAstralScreen userData={userData} chartData={astralChart} onNavigate={navigateTo} onSave={() => {}} onRealTimeTransits={getRealTimeTransits} />}
      {currentView === View.SELECTION && <SelectionScreen userData={userData} onNavigate={navigateTo} />}
      {currentView === View.INPUT_NUMEROLOGY && <InputNumerologyScreen userData={userData} onUpdateUser={d => setUserData(p => ({...p, ...d}))} onNavigate={navigateTo} />}
      {currentView === View.LEARN && <LearnScreen onNavigate={navigateTo} />}
      {currentView === View.FULL_REPORT && astralChart && (
        <FullReportScreen 
          userData={userData} 
          chartData={astralChart} 
          numerologyData={numerologyChart} 
          onNavigate={navigateTo} 
        />
      )}
      {currentView === View.SAVED_MAPS && <SavedMapsScreen savedMaps={savedMaps} onNavigate={navigateTo} onDelete={() => {}} onViewMap={() => {}} onCompare={() => {}} />}
      {currentView === View.BIORHYTHM && <BiorhythmScreen userData={userData} onNavigate={navigateTo} />}
      {currentView === View.PROFILE && (
        <ProfileScreen 
          userData={userData}
          onUpdateUser={d => setUserData(p => ({...p, ...d}))}
          consultants={consultants} 
          savedMaps={savedMaps} 
          onSaveConsultant={c => setConsultants([...consultants, c])} 
          onDeleteConsultant={id => setConsultants(consultants.filter(c => c.id !== id))} 
          onRestoreBackup={() => {}} 
          onSelectConsultant={() => {}} 
          onNavigate={navigateTo} 
          onOpenKeySelector={() => {}} 
        />
      )}
    </div>
  );
}
