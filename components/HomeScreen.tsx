
import React from 'react';
import { View, UserData } from '../types';

interface HomeScreenProps {
  userData: UserData;
  onUpdateUser: (data: Partial<UserData>) => void;
  onNavigate: (view: View) => void;
  onQuickInsight: () => void;
  isLoading?: boolean;
}

export default function HomeScreen({ userData, onUpdateUser, onNavigate, onQuickInsight, isLoading = false }: HomeScreenProps) {
  
  const isFormValid = userData.name.trim().length > 2 && userData.birthDate.length === 10;

  const maskDate = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d+?$)/, "$1");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'birthDate') {
      onUpdateUser({ [name]: maskDate(value) });
    } else {
      onUpdateUser({ [name]: value });
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-celestial-gradient max-w-md mx-auto shadow-2xl">
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 pb-2 glass-panel border-b-0 border-white/5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-primary shadow-[0_0_15px_rgba(115,17,212,0.3)]">
          <span className="material-symbols-outlined text-2xl">auto_awesome</span>
        </div>
        <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-widest uppercase text-white/90">
          {userData.name ? userData.name.split(' ')[0] : "Viajante"}
        </h2>
        <div className="flex size-10 items-center justify-end">
          <button 
            className={`transition-all ${isFormValid ? 'text-primary-light scale-110' : 'text-white/10'}`} 
            onClick={isFormValid ? onQuickInsight : undefined}
          >
            <span className="material-symbols-outlined">bolt</span>
          </button>
        </div>
      </header>

      <main className="flex-1 pb-24">
        <div className="px-6 pt-8 pb-4 text-center">
          <p className="text-primary font-medium tracking-widest text-sm uppercase mb-2">Conecte-se com o Cosmo</p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white text-glow mb-4">
            Seu Futuro<br />Nos Astros
          </h1>
          
          <div className="relative inline-block">
            <button 
              onClick={onQuickInsight}
              disabled={!isFormValid}
              className={`mb-2 px-8 py-3 border rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-3 mx-auto
                ${isFormValid 
                  ? 'bg-primary/20 border-primary/50 text-primary-light hover:bg-primary/30 shadow-[0_0_20px_rgba(115,17,212,0.2)] animate-pulse' 
                  : 'bg-white/5 border-white/10 text-white/20 cursor-not-allowed'}`}
            >
              <span className="material-symbols-outlined text-sm">psychology</span>
              Pedir Insight ao Oráculo
            </button>
            {!isFormValid && (
              <p className="text-[9px] text-white/30 uppercase tracking-widest mb-6 opacity-60">
                Preencha seus dados para habilitar
              </p>
            )}
          </div>
        </div>

        <div className="w-full px-4 py-2">
          <div className="glass-panel rounded-2xl p-6 border border-primary/20 bg-white/[0.02]">
            <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); onNavigate(View.SELECTION); }}>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Seu Nome</label>
                <div className="flex items-center rounded-xl bg-background-dark/50 border border-white/10 p-1 focus-within:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined text-white/20 pl-2">person</span>
                  <input name="name" value={userData.name} onChange={handleInputChange} className="h-10 w-full bg-transparent px-3 text-white placeholder:text-white/10 border-none outline-none text-sm" placeholder="Nome completo" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Nascimento</label>
                  <input name="birthDate" value={userData.birthDate} onChange={handleInputChange} className="h-12 w-full bg-background-dark/50 border border-white/10 rounded-xl px-4 text-white text-sm outline-none focus:border-primary/50" placeholder="DD/MM/AAAA" maxLength={10} required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Hora</label>
                  <input name="birthTime" value={userData.birthTime} onChange={handleInputChange} className="h-12 w-full bg-background-dark/50 border border-white/10 rounded-xl px-4 text-white text-sm outline-none focus:border-primary/50" type="time" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-primary-light uppercase tracking-widest ml-1">Cidade de Nascimento</label>
                <div className="flex items-center rounded-xl bg-background-dark/50 border border-white/10 p-1 focus-within:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined text-primary-light/40 pl-2">location_on</span>
                  <input 
                    name="birthPlace" 
                    value={userData.birthPlace || ''} 
                    onChange={handleInputChange} 
                    className="h-12 w-full bg-transparent px-3 text-white placeholder:text-white/10 border-none outline-none text-sm font-medium" 
                    placeholder="Cidade e Estado" 
                  />
                </div>
              </div>

              <button type="submit" className="mt-4 w-full h-14 bg-button-gradient rounded-xl text-white font-bold uppercase tracking-[0.2em] text-xs shadow-xl active:scale-[0.98] transition-all border border-white/10">
                Iniciar Mapeamento
              </button>
            </form>
          </div>
        </div>

        <div className="px-4 mt-8 grid grid-cols-2 gap-4">
          <button onClick={() => onNavigate(View.INPUT_NUMEROLOGY)} className="relative aspect-video rounded-2xl bg-surface-dark border border-white/5 overflow-hidden group active:scale-95 transition-all">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="material-symbols-outlined text-primary text-3xl">123</span>
              <h4 className="font-bold text-white text-[10px] uppercase tracking-widest">Numerologia</h4>
            </div>
          </button>
          <button onClick={() => onNavigate(View.INPUT_ASTRAL)} className="relative aspect-video rounded-2xl bg-surface-dark border border-white/5 overflow-hidden group active:scale-95 transition-all">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="material-symbols-outlined text-indigo-400 text-3xl">public</span>
              <h4 className="font-bold text-white text-[10px] uppercase tracking-widest">Mapa Astral</h4>
            </div>
          </button>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 pb-[env(safe-area-inset-bottom)] max-w-md mx-auto">
        <div className="flex h-16 items-center justify-around px-2">
          <button className="flex flex-col items-center gap-1 text-primary">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[9px] font-bold uppercase">Início</span>
          </button>
          <button className="flex flex-col items-center gap-1 opacity-30 hover:opacity-100 transition-opacity" onClick={() => onNavigate(View.SAVED_MAPS)}>
            <span className="material-symbols-outlined">history_edu</span>
            <span className="text-[9px] font-bold uppercase">Salvos</span>
          </button>
          <button className="flex flex-col items-center gap-1 opacity-30 hover:opacity-100 transition-opacity" onClick={() => onNavigate(View.LEARN)}>
            <span className="material-symbols-outlined">menu_book</span>
            <span className="text-[9px] font-bold uppercase">Aprender</span>
          </button>
          <button className="flex flex-col items-center gap-1 opacity-30 hover:opacity-100 transition-opacity" onClick={() => onNavigate(View.PROFILE)}>
            <span className="material-symbols-outlined">person</span>
            <span className="text-[9px] font-bold uppercase">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
