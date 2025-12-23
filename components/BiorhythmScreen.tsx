
import React, { useState, useEffect, useMemo } from 'react';
import { View, UserData } from '../types';

interface BiorhythmScreenProps {
  userData: UserData;
  onNavigate: (view: View) => void;
}

const CYCLES = {
  PHYSICAL: 23,
  EMOTIONAL: 28,
  INTELLECTUAL: 33
};

export default function BiorhythmScreen({ userData, onNavigate }: BiorhythmScreenProps) {
  const [targetDateStr, setTargetDateStr] = useState<string>(new Date().toISOString().split('T')[0]);

  // Parse birth date
  const birthDate = useMemo(() => {
    if (!userData.birthDate) return null;
    const parts = userData.birthDate.split('/');
    if (parts.length !== 3) return null;
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
  }, [userData.birthDate]);

  // Helper to calculate cycle value (-1 to 1)
  const calculateCycle = (daysLived: number, period: number) => {
    return Math.sin((2 * Math.PI * daysLived) / period);
  };

  // Generate chart data for a window (e.g., 30 days centered on target)
  const chartData = useMemo(() => {
    if (!birthDate) return null;
    const target = new Date(targetDateStr);
    
    // Window: 10 days before, 10 days after
    const daysWindow = 21;
    const halfWindow = Math.floor(daysWindow / 2);
    
    const points = [];
    
    for (let i = -halfWindow; i <= halfWindow; i++) {
        const currentDate = new Date(target);
        currentDate.setDate(target.getDate() + i);
        
        // Time difference in days
        const diffTime = currentDate.getTime() - birthDate.getTime();
        const daysLived = diffTime / (1000 * 60 * 60 * 24);
        
        points.push({
            date: currentDate,
            physical: calculateCycle(daysLived, CYCLES.PHYSICAL),
            emotional: calculateCycle(daysLived, CYCLES.EMOTIONAL),
            intellectual: calculateCycle(daysLived, CYCLES.INTELLECTUAL),
            isTarget: i === 0,
            label: currentDate.getDate().toString()
        });
    }
    return points;
  }, [birthDate, targetDateStr]);

  // Current day values
  const currentValues = useMemo(() => {
    if (!chartData) return null;
    return chartData.find(d => d.isTarget);
  }, [chartData]);

  // SVG Chart Dimensions
  const chartWidth = 350;
  const chartHeight = 200;
  const padding = 20;
  const graphWidth = chartWidth - (padding * 2);
  const graphHeight = chartHeight - (padding * 2);
  const midY = chartHeight / 2;

  const generatePath = (type: 'physical' | 'emotional' | 'intellectual') => {
    if (!chartData) return "";
    return chartData.map((d, i) => {
        const x = padding + (i / (chartData.length - 1)) * graphWidth;
        const val = d[type]; 
        const y = midY - (val * (graphHeight / 2));
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const getPercentage = (val: number) => Math.round(((val + 1) / 2) * 100);
  const getStatus = (val: number) => {
    if (Math.abs(val) < 0.2) return "Crítico (Transição)";
    if (val > 0) return "Alto (Recarga)";
    return "Baixo (Descarga)";
  };

  if (!birthDate) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 text-center">
         <p className="text-white/60">Data de nascimento inválida. Por favor, atualize seu perfil.</p>
         <button onClick={() => onNavigate(View.HOME)} className="mt-4 text-primary">Voltar</button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-background-dark max-w-md mx-auto overflow-y-auto no-scrollbar pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel p-4 flex items-center justify-between border-b border-white/5">
        <button onClick={() => onNavigate(View.SELECTION)} className="material-symbols-outlined text-white/70">arrow_back</button>
        <h2 className="text-sm font-bold uppercase tracking-widest text-white/80">Ciclos de Biorritmo</h2>
        <div className="w-6"></div>
      </header>

      <main className="p-6 space-y-8">
        {/* Date Selector */}
        <div className="bg-surface-dark border border-white/5 rounded-2xl p-4">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">Data de Consulta</label>
            <input 
                type="date" 
                value={targetDateStr}
                onChange={(e) => setTargetDateStr(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white font-bold outline-none focus:border-teal-500 transition-colors"
            />
        </div>

        {/* Chart */}
        <div className="bg-surface-dark border border-white/5 rounded-2xl p-4 relative overflow-hidden">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-400">monitoring</span>
                Fluxo de Energia (15 Dias)
            </h3>
            
            <div className="flex justify-center">
                <svg width={chartWidth} height={chartHeight} className="overflow-visible">
                    {/* Grid Lines */}
                    <line x1={padding} y1={midY} x2={chartWidth - padding} y2={midY} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                    <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                    
                    {/* Target Date Line */}
                    <line x1={chartWidth/2} y1={padding} x2={chartWidth/2} y2={chartHeight-padding} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                    {/* Curves */}
                    <path d={generatePath('physical')} fill="none" stroke="#F87171" strokeWidth="2" />
                    <path d={generatePath('emotional')} fill="none" stroke="#60A5FA" strokeWidth="2" />
                    <path d={generatePath('intellectual')} fill="none" stroke="#34D399" strokeWidth="2" />

                    {/* Points for Target Date */}
                    {currentValues && (
                        <>
                            <circle cx={chartWidth/2} cy={midY - (currentValues.physical * (graphHeight/2))} r="4" fill="#F87171" stroke="white" strokeWidth="1" />
                            <circle cx={chartWidth/2} cy={midY - (currentValues.emotional * (graphHeight/2))} r="4" fill="#60A5FA" stroke="white" strokeWidth="1" />
                            <circle cx={chartWidth/2} cy={midY - (currentValues.intellectual * (graphHeight/2))} r="4" fill="#34D399" stroke="white" strokeWidth="1" />
                        </>
                    )}
                </svg>
            </div>
            
            <div className="flex justify-between px-2 mt-2 text-[9px] text-white/30 font-mono">
               <span>Passado</span>
               <span>Hoje</span>
               <span>Futuro</span>
            </div>
            
            <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-1 text-[9px] uppercase font-bold text-red-400">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span> Físico
                </div>
                <div className="flex items-center gap-1 text-[9px] uppercase font-bold text-blue-400">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span> Emocional
                </div>
                <div className="flex items-center gap-1 text-[9px] uppercase font-bold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Intelectual
                </div>
            </div>
        </div>

        {/* Current Values Cards */}
        {currentValues && (
            <div className="grid gap-4">
                {/* Physical */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                            <span className="material-symbols-outlined">fitness_center</span>
                        </div>
                        <div>
                            <h4 className="text-red-400 font-bold text-sm uppercase">Ciclo Físico</h4>
                            <p className="text-[10px] text-white/50">{getStatus(currentValues.physical)}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-white">{getPercentage(currentValues.physical)}%</span>
                    </div>
                </div>

                {/* Emotional */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <span className="material-symbols-outlined">favorite</span>
                        </div>
                        <div>
                            <h4 className="text-blue-400 font-bold text-sm uppercase">Ciclo Emocional</h4>
                            <p className="text-[10px] text-white/50">{getStatus(currentValues.emotional)}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-white">{getPercentage(currentValues.emotional)}%</span>
                    </div>
                </div>

                {/* Intellectual */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <span className="material-symbols-outlined">psychology</span>
                        </div>
                        <div>
                            <h4 className="text-emerald-400 font-bold text-sm uppercase">Ciclo Intelectual</h4>
                            <p className="text-[10px] text-white/50">{getStatus(currentValues.intellectual)}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-white">{getPercentage(currentValues.intellectual)}%</span>
                    </div>
                </div>
            </div>
        )}

        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Nota sobre Dias Críticos</h4>
            <p className="text-sm text-gray-400 leading-relaxed text-justify">
                Dias críticos ocorrem quando as curvas cruzam a linha central (0%). Nesses dias, a energia transita de positiva para negativa (ou vice-versa), podendo causar instabilidade temporária. Recomenda-se cautela extra.
            </p>
        </div>

      </main>
    </div>
  );
}
