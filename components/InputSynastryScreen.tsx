
import React from 'react';
import { View, UserData } from '../types';

interface InputSynastryScreenProps {
  partnerData: UserData;
  onUpdatePartner: (data: Partial<UserData>) => void;
  onNavigate: (view: View) => void;
}

export default function InputSynastryScreen({ partnerData, onUpdatePartner, onNavigate }: InputSynastryScreenProps) {
  
  const maskDate = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d+?$)/, "$1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate(View.RESULT_SYNASTRY);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'birthDate') {
      onUpdatePartner({ [name]: maskDate(value) });
    } else {
      onUpdatePartner({ [name]: value });
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto">
      {/* Background with Pinker hue for Love Theme */}
      <div className="absolute inset-0 z-0">
        <img 
            alt="Deep space starry background" 
            className="h-full w-full object-cover opacity-40" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGO1z8Atchfdbt9e628gmu2c8jhfczcXuW19HYJuNUljyaVQRk8DbPjy4QcSsU36BPU6q5J889-Op2USCpFxSKyAdE9gtgjtEE51NPsT6qBswm4GiWVB6KFTKnLFQbEwH6wVpHyvDxEWP-SDYLkNuSC8tqoCPs9ag98heas4_e29YNkp4QFsMqg8nS9VR4ZvxEoL8A5Nzeazv2gTwgkFjA3n-rQYWsfLP3VQJiQnqhOxZ13dQffTNCH7gQTlFif8sYrGkX73kzdvU"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#191022]/80 via-[#2d1b3e]/80 to-[#191022] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 flex h-full flex-col">
        {/* Top App Bar */}
        <div className="flex items-center p-4 pb-2 justify-between backdrop-blur-sm bg-background-dark/30 sticky top-0 z-20">
          <button 
            onClick={() => onNavigate(View.HOME)}
            className="text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h2 className="text-white text-lg font-bold leading-tight tracking-wide flex-1 text-center pr-12 uppercase text-sm">Sinastria Amorosa</h2>
        </div>

        {/* Header Section */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-pink-400">favorite</span>
            <span className="text-pink-400 font-bold tracking-widest text-xs uppercase">Compatibilidade</span>
          </div>
          <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight text-left mb-2">
            Conexão <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Celestial</span>
          </h1>
          <p className="text-gray-300 font-body text-sm font-normal leading-relaxed max-w-sm">
            Adicione os dados do seu parceiro(a) para descobrir como os astros influenciam a harmonia do relacionamento.
          </p>
        </div>

        {/* Form Section */}
        <div className="flex-1 px-6 py-2 overflow-y-auto pb-32 no-scrollbar">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-200 text-sm font-medium ml-1">Nome da Pessoa</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-pink-300">person_add</span>
                </div>
                <input 
                    name="name"
                    value={partnerData.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-surface-dark/80 border border-border-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-sm" 
                    placeholder="Ex: João Souza" 
                    type="text" 
                />
              </div>
            </div>

            {/* Date & Time Row */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-gray-200 text-sm font-medium ml-1">Data</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-pink-300">calendar_month</span>
                  </div>
                  <input 
                    name="birthDate"
                    value={partnerData.birthDate}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-surface-dark/80 border border-border-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-sm" 
                    placeholder="DD/MM/AAAA" 
                    type="text" 
                    maxLength={10}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-[40%]">
                <label className="text-gray-200 text-sm font-medium ml-1">Horário</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-pink-300">schedule</span>
                  </div>
                  <input 
                    name="birthTime"
                    value={partnerData.birthTime}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-surface-dark/80 border border-border-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-sm" 
                    placeholder="00:00" 
                    type="text" 
                  />
                </div>
              </div>
            </div>

            {/* Location Input */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-200 text-sm font-medium ml-1">Local de Nascimento</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-pink-300">pin_drop</span>
                </div>
                <input 
                    name="birthPlace"
                    value={partnerData.birthPlace}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-surface-dark/80 border border-border-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-sm" 
                    placeholder="Cidade, Estado" 
                    type="text" 
                />
              </div>
            </div>
          </form>
        </div>

        {/* Bottom Action Area */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-30 max-w-md mx-auto">
          <button 
            onClick={handleSubmit}
            className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-lg font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="material-symbols-outlined animate-pulse">favorite</span>
            Calcular Sinastria
          </button>
        </div>
      </div>
    </div>
  );
}
