
import React, { useState, useEffect } from 'react';
import { View, UserData, NumerologyData, NumerologyPyramidRow } from '../types';

interface InputNumerologyScreenProps {
  userData: UserData;
  onUpdateUser: (data: Partial<UserData>) => void;
  onNavigate: (view: View) => void;
  onProcess?: (data: NumerologyData) => void;
}

// Tabela Pitagórica
const PYTHAGOREAN_TABLE: Record<string, number> = {
  'A': 1, 'J': 1, 'S': 1, 'Á': 1, 'Ã': 1, 'Â': 1,
  'B': 2, 'K': 2, 'T': 2,
  'C': 3, 'L': 3, 'U': 3, 'Ç': 3, 'Ú': 3,
  'D': 4, 'M': 4, 'V': 4,
  'E': 5, 'N': 5, 'W': 5, 'É': 5, 'Ê': 5,
  'F': 6, 'O': 6, 'X': 6, 'Ó': 6, 'Õ': 6, 'Ô': 6,
  'G': 7, 'P': 7, 'Y': 7,
  'H': 8, 'Q': 8, 'Z': 8,
  'I': 9, 'R': 9, 'Í': 9
};

const VOWELS = ['A', 'E', 'I', 'O', 'U', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ã', 'Õ', 'Â', 'Ê', 'Ô'];

const normalizeText = (text: string) => {
  return text.toUpperCase().trim();
};

// Função auxiliar para redução (ex: 25 -> 7, 11 -> 11, 22 -> 22)
const reduceNumber = (num: number, preserveMasters: boolean = true): number => {
  if (num === 0) return 0;
  if (preserveMasters && (num === 11 || num === 22)) return num;
  if (num < 10) return num;
  
  let sum = 0;
  const digits = num.toString().split('');
  for (const digit of digits) {
    sum += parseInt(digit);
  }
  
  return reduceNumber(sum, preserveMasters);
};

export default function InputNumerologyScreen({ userData, onUpdateUser, onNavigate, onProcess }: InputNumerologyScreenProps) {
  const [localName, setLocalName] = useState(userData.name);
  const [localDate, setLocalDate] = useState(userData.birthDate);
  const [pyramid, setPyramid] = useState<NumerologyPyramidRow[]>([]);

  useEffect(() => {
    calculatePyramid(localName);
  }, [localName]);

  const calculatePyramid = (name: string) => {
    const cleanName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z]/g, "");
    if (!cleanName) {
      setPyramid([]);
      return;
    }

    const firstRow: number[] = cleanName.split('').map(char => PYTHAGOREAN_TABLE[char] || 0);
    const rows: NumerologyPyramidRow[] = [{ values: firstRow }];
    
    let currentRow = firstRow;
    while (currentRow.length > 1) {
      const nextRow: number[] = [];
      for (let i = 0; i < currentRow.length - 1; i++) {
        let sum = currentRow[i] + currentRow[i + 1];
        while (sum > 9) {
          sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
        }
        nextRow.push(sum);
      }
      rows.push({ values: nextRow });
      currentRow = nextRow;
    }
    setPyramid(rows);
  };

  const handleProcess = () => {
    const cleanName = normalizeText(localName);
    const dateParts = localDate.split('/');
    
    if (cleanName.length < 2 || dateParts.length !== 3) {
      alert("Por favor, preencha nome completo e data de nascimento válida.");
      return;
    }

    // --- 1. Cálculos de Nome ---
    let expressionSum = 0;
    let motivationSum = 0;
    let impressionSum = 0;
    
    const numberCounts: Record<number, number> = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};

    for (let char of cleanName) {
      if (!/[A-ZÁÉÍÓÚÃÕÂÊÔÇ]/.test(char)) continue; 
      const val = PYTHAGOREAN_TABLE[char] || 0;
      if (val > 0) {
        expressionSum += val;
        numberCounts[val] = (numberCounts[val] || 0) + 1;
        
        if (VOWELS.includes(char)) {
          motivationSum += val;
        } else {
          impressionSum += val;
        }
      }
    }

    const expression = reduceNumber(expressionSum);
    const motivation = reduceNumber(motivationSum);
    const impression = reduceNumber(impressionSum);

    // Lições Cármicas: Números ausentes
    const karmicLessons = Object.keys(numberCounts)
      .map(Number)
      .filter(n => numberCounts[n] === 0);

    // Tendências Ocultas: Números que aparecem 3 ou mais vezes
    const hiddenTendencies = Object.keys(numberCounts)
      .map(Number)
      .filter(n => numberCounts[n] >= 3);

    // Resposta Subconsciente: Quantidade de números distintos presentes (1-9)
    // Se a pessoa tem todos os números, é 9. Se falta 1, é 8.
    const distinctNumbersPresent = 9 - karmicLessons.length;
    const subconsciousResponse = distinctNumbersPresent;

    // Relação Inter-valor: Número que mais aparece (Moda)
    let maxCount = 0;
    let interValueNumber = 0;
    Object.entries(numberCounts).forEach(([num, count]) => {
        if (count > maxCount) {
            maxCount = count;
            interValueNumber = Number(num);
        }
    });

    // Grau de Ascensão
    let ascensionType: 'Elevado' | 'Rebaixado' | 'Ascensao' = 'Ascensao';
    if (motivation === impression) {
        ascensionType = 'Elevado';
    } else if (motivation > impression) {
        ascensionType = 'Rebaixado';
    } else {
        ascensionType = 'Ascensao';
    }

    // --- 2. Cálculos de Data (Destino) ---
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);

    const destiny = reduceNumber(reduceNumber(day, false) + reduceNumber(month, false) + reduceNumber(year, false));

    // Número Psíquico: Dia reduzido
    const psychicNumber = reduceNumber(day, false); // Normalmente 1-9

    // --- 3. Missão ---
    const mission = reduceNumber(destiny + expression);

    // --- 4. Dívidas Cármicas ---
    const debts: number[] = [];
    if ([13, 14, 16, 19].includes(day)) debts.push(day);

    // --- 5. Ano e Mês Pessoal ---
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    let personalYearBase = currentYear;
    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
        personalYearBase = currentYear - 1; 
    } else {
        personalYearBase = currentYear;
    }
    const personalYear = reduceNumber(reduceNumber(day, false) + reduceNumber(month, false) + reduceNumber(personalYearBase, false));
    
    // Mês Pessoal = Ano Pessoal + Mês Civil Atual (Reduzido)
    const personalMonth = reduceNumber(personalYear + currentMonth, true); // Mantém mestres no mês se houver

    // --- 6. Ciclos de Vida (Life Cycles) ---
    const lifeCycle1 = reduceNumber(month);
    const lifeCycle2 = reduceNumber(day);
    const lifeCycle3 = reduceNumber(year);

    // --- 7. Momentos Decisivos (Pinnacles) ---
    const rDayForMoments = reduceNumber(day, false);
    const rMonthForMoments = reduceNumber(month, false);
    const rYearForMoments = reduceNumber(year, false);

    const decisiveMoment1 = reduceNumber(rDayForMoments + rMonthForMoments);
    const decisiveMoment2 = reduceNumber(rDayForMoments + rYearForMoments);
    const decisiveMoment3 = reduceNumber(decisiveMoment1 + decisiveMoment2);
    const decisiveMoment4 = reduceNumber(rMonthForMoments + rYearForMoments);

    // --- 8. Desafios (Challenges) ---
    const challenge1 = Math.abs(reduceNumber(month, false) - reduceNumber(day, false));
    const challenge2 = Math.abs(reduceNumber(day, false) - reduceNumber(year, false));
    const challenge3 = Math.abs(challenge1 - challenge2);

    // --- 9. Idades de Transição (Timelines) ---
    const destinySingleDigit = reduceNumber(destiny, false); 
    
    const ageRef1 = 36 - destinySingleDigit;
    const ageRef2 = ageRef1 + 9;
    const ageRef3 = ageRef2 + 9;
    const ageRefCycle2 = ageRef1 + 27;

    const numerologyData: NumerologyData = {
      pyramid: pyramid,
      expressionNumber: expression,
      motivationNumber: motivation,
      impressionNumber: impression,
      destinyNumber: destiny,
      missionNumber: mission,
      birthDayNumber: day,
      karmicDebts: debts,
      karmicLessons: karmicLessons,
      hiddenTendencies: hiddenTendencies,
      personalYear: personalYear,
      personalMonth: personalMonth,
      psychicNumber: psychicNumber,
      subconsciousResponse: subconsciousResponse,
      
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
      
      ageRef1,
      ageRef2,
      ageRef3,
      ageRefCycle2
    };

    onUpdateUser({ name: localName, birthDate: localDate });

    if (onProcess) {
      onProcess(numerologyData);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);
    if (v.length > 4) v = v.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    setLocalDate(v);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-background-dark max-w-md mx-auto no-scrollbar overflow-y-auto">
      <header className="sticky top-0 z-50 glass-panel p-4 flex items-center justify-between border-b border-white/5">
        <button onClick={() => onNavigate(View.SELECTION)} className="material-symbols-outlined text-white">arrow_back</button>
        <h2 className="text-sm font-bold uppercase tracking-widest text-white/80">Dados da Pirâmide</h2>
        <div className="w-6"></div>
      </header>

      <main className="flex-1 p-6 pb-32">
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-primary-light uppercase tracking-widest mb-2 block">Nome Completo</label>
            <input 
              type="text" 
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold text-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Nome de nascimento"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-primary-light uppercase tracking-widest mb-2 block">Data de Nascimento</label>
            <input 
              type="text" 
              value={localDate}
              onChange={handleDateChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold text-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="DD/MM/AAAA"
            />
          </div>
        </div>

        {/* Visualization of Pyramid */}
        {pyramid.length > 0 && (
          <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-white/5 overflow-x-auto">
             <h3 className="text-center text-xs font-bold text-white/60 uppercase mb-4">Estrutura da Pirâmide</h3>
             <div className="flex flex-col items-center gap-2 min-w-max">
               {pyramid.slice(0, 8).map((row, rowIndex) => (
                 <div key={rowIndex} className="flex gap-1 justify-center">
                   {row.values.map((val, valIndex) => (
                     <div 
                        key={`${rowIndex}-${valIndex}`}
                        className={`
                          flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                          ${rowIndex === 0 ? 'bg-primary/20 text-primary-light border border-primary/30' : 
                            'bg-white/5 text-white/60'}
                        `}
                     >
                       {val}
                     </div>
                   ))}
                 </div>
               ))}
             </div>
          </div>
        )}

        <button 
          onClick={handleProcess}
          className="w-full mt-8 py-4 bg-button-gradient rounded-2xl font-bold uppercase tracking-widest text-white shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">auto_awesome</span> Gerar Análise Numérica
        </button>
      </main>
    </div>
  );
}
