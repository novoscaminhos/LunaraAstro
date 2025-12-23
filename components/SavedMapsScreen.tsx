
import React, { useState } from 'react';
import { View, SavedMap } from '../types';
import { IconSun, IconMoon, IconAscendant } from './Icons';

interface SavedMapsScreenProps {
  savedMaps: SavedMap[];
  onNavigate: (view: View) => void;
  onDelete: (id: string) => void;
  onViewMap: (map: SavedMap) => void;
  onCompare: (map1: SavedMap, map2: SavedMap) => void;
}

export default function SavedMapsScreen({ savedMaps, onNavigate, onDelete, onViewMap, onCompare }: SavedMapsScreenProps) {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(i => i !== id));
    } else {
      if (selectedIds.length < 2) {
        setSelectedIds(prev => [...prev, id]);
      } else {
        // Replace second one or just ignore
        setSelectedIds([selectedIds[0], id]);
      }
    }
  };

  const handleCompare = () => {
    if (selectedIds.length === 2) {
      const map1 = savedMaps.find(m => m.id === selectedIds[0])!;
      const map2 = savedMaps.find(m => m.id === selectedIds[1])!;
      onCompare(map1, map2);
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-dark max-w-md mx-auto font-lato">
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 pb-2 glass-panel border-b border-white/5">
        <button onClick={() => onNavigate(View.HOME)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-widest uppercase text-white/90">
          Meus Mapas
        </h2>
        <div className="flex size-10 items-center justify-end">
          <button 
            onClick={() => {
              setSelectionMode(!selectionMode);
              setSelectedIds([]);
            }} 
            className={`transition-colors ${selectionMode ? 'text-primary' : 'text-white/70'}`}
          >
            <span className="material-symbols-outlined">{selectionMode ? 'close' : 'compare_arrows'}</span>
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 pb-24">
        {selectionMode && (
          <div className="mb-6 bg-primary/10 border border-primary/20 p-4 rounded-xl animate-fade-in">
            <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2">Modo Comparação</p>
            <p className="text-sm text-white/70 mb-4">Selecione 2 mapas para ver a compatibilidade astral (Sinastria) entre eles.</p>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white/40">{selectedIds.length} / 2 selecionados</span>
              <button 
                disabled={selectedIds.length !== 2}
                onClick={handleCompare}
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-30 disabled:grayscale transition-all"
              >
                Comparar Agora
              </button>
            </div>
          </div>
        )}

        {savedMaps.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
            <span className="material-symbols-outlined text-6xl mb-4">folder_open</span>
            <p className="text-lg font-bold">Nenhum mapa salvo</p>
            <p className="text-xs max-w-[200px] mt-2">Calcule seu mapa astral e salve-o para gerenciar seu histórico aqui.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedMaps.map((map) => (
              <div 
                key={map.id} 
                onClick={() => selectionMode ? handleToggleSelection(map.id) : null}
                className={`group relative flex flex-col p-4 bg-surface-dark/40 rounded-2xl border transition-all duration-300 ${
                  selectionMode && selectedIds.includes(map.id) ? 'border-primary ring-2 ring-primary/20' : 'border-white/5'
                } ${selectionMode ? 'cursor-pointer' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-white/5 text-primary">
                       <IconSun size={28} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{map.userData.name}</h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">{map.chartData.sun.sign} • AC {map.chartData.ascendant.sign}</p>
                    </div>
                  </div>
                  
                  {!selectionMode ? (
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onViewMap(map); }}
                        className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">visibility</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(map.id); }}
                        className="p-2 text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                  ) : (
                    <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedIds.includes(map.id) ? 'bg-primary border-primary' : 'border-white/20'
                    }`}>
                      {selectedIds.includes(map.id) && <span className="material-symbols-outlined text-white text-xs">check</span>}
                    </div>
                  )}
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                   <span className="text-[9px] text-white/20">{new Date(map.timestamp).toLocaleDateString()}</span>
                   {!selectionMode && (
                     <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">Ver Detalhes →</span>
                   )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 pb-[env(safe-area-inset-bottom)] max-w-md mx-auto bg-background-dark/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-around px-2">
          <a className="group flex flex-1 flex-col items-center justify-center gap-1 p-2 cursor-pointer" onClick={() => onNavigate(View.HOME)}>
            <span className="material-symbols-outlined text-2xl text-white/40 group-hover:text-white transition-colors">home</span>
            <span className="text-[10px] font-medium text-white/40 group-hover:text-white transition-colors">Início</span>
          </a>
          <a className="group flex flex-1 flex-col items-center justify-center gap-1 p-2 cursor-pointer" onClick={() => onNavigate(View.SAVED_MAPS)}>
            <span className="material-symbols-outlined text-2xl text-primary transition-colors">history_edu</span>
            <span className="text-[10px] font-medium text-white transition-colors">Salvos</span>
          </a>
          <a className="group flex flex-1 flex-col items-center justify-center gap-1 p-2 cursor-pointer" onClick={() => onNavigate(View.LEARN)}>
            <span className="material-symbols-outlined text-2xl text-white/40 group-hover:text-white transition-colors">menu_book</span>
            <span className="text-[10px] font-medium text-white/40 group-hover:text-white transition-colors">Aprender</span>
          </a>
          <a className="group flex flex-1 flex-col items-center justify-center gap-1 p-2 cursor-pointer">
            <span className="material-symbols-outlined text-2xl text-white/40 group-hover:text-white transition-colors">person</span>
            <span className="text-[10px] font-medium text-white/40 group-hover:text-white transition-colors">Perfil</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
