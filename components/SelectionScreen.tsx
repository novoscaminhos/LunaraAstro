
import React from 'react';
import { View, UserData } from '../types';

interface SelectionScreenProps {
  userData: UserData;
  onNavigate: (view: View) => void;
}

export default function SelectionScreen({ userData, onNavigate }: SelectionScreenProps) {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-celestial-gradient max-w-md mx-auto">
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 pb-2 glass-panel border-b-0 border-white/5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-primary">
          <span className="material-symbols-outlined text-2xl">auto_awesome</span>
        </div>
        <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-widest uppercase text-white/90">Viajante</h2>
        <div className="flex size-10 items-center justify-end">
          <button className="text-white/70 hover:text-white transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-6 pb-24">
        <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 backdrop-blur-md">
            <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Dados Básicos Recebidos</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white text-glow mb-3">
            Escolha sua<br />Jornada
          </h1>
          <p className="text-white/60 text-sm font-light leading-relaxed max-w-xs mx-auto">
            Para prosseguir, selecione o tipo de análise. Você poderá inserir os detalhes técnicos na próxima etapa.
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-5 w-full max-w-sm mx-auto">
          {/* Main options */}
          <button 
            onClick={() => onNavigate(View.INPUT_NUMEROLOGY)}
            className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all active:scale-[0.98] shadow-lg shadow-primary/5 hover:border-primary/40 hover:shadow-primary/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#140c1c] via-[#140c1c]/90 to-transparent"></div>
            <div className="relative p-6 flex items-center justify-between z-10 w-full">
              <div className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary backdrop-blur-sm border border-white/5">
                  <span className="material-symbols-outlined text-3xl">123</span>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-white leading-tight mb-1">Mapa Numerológico</h3>
                  <p className="text-xs text-white/50 font-light">Calcular Pirâmide Invertida e Destino.</p>
                </div>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/30 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </button>

          <button 
            onClick={() => onNavigate(View.INPUT_ASTRAL)}
            className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/5 hover:border-indigo-400/40 hover:shadow-indigo-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#140c1c] via-[#140c1c]/90 to-transparent"></div>
            <div className="relative p-6 flex items-center justify-between z-10 w-full">
              <div className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 backdrop-blur-sm border border-white/5">
                  <span className="material-symbols-outlined text-3xl">public</span>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-white leading-tight mb-1">Mapa Astral</h3>
                  <p className="text-xs text-white/50 font-light">Inserir dados dos planetas e casas.</p>
                </div>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/30 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </button>

          {/* Biorhythm Option */}
          <button 
            onClick={() => onNavigate(View.BIORHYTHM)}
            className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all active:scale-[0.98] shadow-lg shadow-teal-500/5 hover:border-teal-400/40 hover:shadow-teal-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#140c1c] via-[#140c1c]/90 to-transparent"></div>
            <div className="relative p-6 flex items-center justify-between z-10 w-full">
              <div className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 backdrop-blur-sm border border-white/5">
                  <span className="material-symbols-outlined text-3xl">waves</span>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-white leading-tight mb-1">Biorritmo</h3>
                  <p className="text-xs text-white/50 font-light">Ciclos Físico, Emocional e Intelectual.</p>
                </div>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/30 group-hover:bg-teal-500 group-hover:text-white transition-all">
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </button>

          {/* New Full Report Option matching PDF Request */}
          <div className="h-px w-full bg-white/10 my-2"></div>
          
          <button 
            onClick={() => onNavigate(View.FULL_REPORT)}
            className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-gold/30 bg-gold/10 transition-all active:scale-[0.98] shadow-lg shadow-gold/5 hover:border-gold hover:shadow-gold/20"
          >
            <div className="relative p-6 flex items-center justify-between z-10 w-full">
              <div className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold backdrop-blur-sm border border-gold/20">
                  <span className="material-symbols-outlined text-3xl">description</span>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-white leading-tight mb-1">Relatório Completo</h3>
                  <p className="text-xs text-gold/70 font-bold uppercase tracking-widest">Estilo PDF Profissional</p>
                </div>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold group-hover:bg-gold group-hover:text-black transition-all">
                <span className="material-symbols-outlined">auto_stories</span>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-auto pt-8 pb-4 text-center">
          <button 
            onClick={() => onNavigate(View.HOME)}
            className="text-xs font-medium text-white/30 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto py-2 px-4 rounded-lg hover:bg-white/5"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Alterar dados de entrada
          </button>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 pb-[env(safe-area-inset-bottom)] max-w-md mx-auto">
        <div className="flex h-16 items-center justify-around px-2">
          <a className="group flex flex-1 flex-col items-center justify-center gap-1 p-2 cursor-pointer" onClick={(e) => {e.preventDefault(); onNavigate(View.HOME);}}>
            <span className="material-symbols-outlined text-2xl text-primary transition-colors">home</span>
            <span className="text-[10px] font-medium text-white transition-colors">Início</span>
          </a>
          <a className="group flex flex-1 flex-col items-center justify-center gap-1 p-2 cursor-pointer" onClick={(e) => {e.preventDefault(); onNavigate(View.SAVED_MAPS);}}>
            <span className="material-symbols-outlined text-2xl text-white/40 group-hover:text-white transition-colors">history_edu</span>
            <span className="text-[10px] font-medium text-white/40 group-hover:text-white transition-colors">Salvos</span>
          </a>
          <a className="group flex flex-1 flex-col items-center justify-center gap-1 p-2 cursor-pointer" onClick={(e) => {e.preventDefault(); onNavigate(View.LEARN);}}>
            <span className="material-symbols-outlined text-2xl text-white/40 group-hover:text-white transition-colors">menu_book</span>
            <span className="text-[10px] font-medium text-white/40 group-hover:text-white transition-colors">Aprender</span>
          </a>
          <a className="group flex flex-1 flex-col items-center justify-center gap-1 p-2 cursor-pointer" onClick={(e) => {e.preventDefault(); onNavigate(View.PROFILE);}}>
            <span className="material-symbols-outlined text-2xl text-white/40 group-hover:text-white transition-colors">person</span>
            <span className="text-[10px] font-medium text-white/40 group-hover:text-white transition-colors">Perfil</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
