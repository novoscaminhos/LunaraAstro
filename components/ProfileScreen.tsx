
import React, { useState, useRef } from 'react';
import { View, Consultant, SavedMap } from '../types';

interface ProfileScreenProps {
  consultants: Consultant[];
  savedMaps: SavedMap[];
  onSaveConsultant: (c: Consultant) => void;
  onDeleteConsultant: (id: string) => void;
  onRestoreBackup: (data: any) => void;
  onSelectConsultant: (c: Consultant) => void;
  onNavigate: (view: View) => void;
  onOpenKeySelector: () => void;
}

export default function ProfileScreen({ 
  consultants, 
  savedMaps, 
  onSaveConsultant, 
  onDeleteConsultant, 
  onRestoreBackup, 
  onSelectConsultant,
  onNavigate
}: ProfileScreenProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Consultant>>({
    name: '', birthDate: '', birthTime: '', birthPlace: '', notes: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const backup = {
      consultants,
      maps: savedMaps,
      timestamp: Date.now(),
      version: "1.0"
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lunara_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (confirm("Isso irá substituir seus dados atuais. Deseja continuar?")) {
            onRestoreBackup(data);
          }
        } catch (err) {
          alert("Arquivo inválido.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.birthDate) return;
    
    const newConsultant: Consultant = {
      id: editingId || crypto.randomUUID(),
      name: formData.name || '',
      birthDate: formData.birthDate || '',
      birthTime: formData.birthTime || '',
      birthPlace: formData.birthPlace || '',
      notes: formData.notes || '',
    };
    
    onSaveConsultant(newConsultant);
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', birthDate: '', birthTime: '', birthPlace: '', notes: '' });
  };

  const startEdit = (c: Consultant) => {
      setEditingId(c.id);
      setFormData(c);
      setIsAdding(true);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-celestial-gradient max-w-md mx-auto overflow-y-auto no-scrollbar pb-32">
      <header className="sticky top-0 z-50 glass-panel p-4 flex items-center justify-between border-b border-white/5">
        <button onClick={() => onNavigate(View.HOME)} className="material-symbols-outlined text-white/70">arrow_back</button>
        <h2 className="text-sm font-bold uppercase tracking-widest text-white/80">Gestão de Consulentes</h2>
        <button onClick={() => setIsAdding(true)} className="material-symbols-outlined text-primary-light">person_add</button>
      </header>

      <main className="p-6">
        {/* Status do Motor */}
        <section className="mb-10">
            <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Motor de Análise</h3>
            <div className="w-full py-4 bg-primary/10 border border-primary/20 rounded-2xl flex items-center gap-4 px-6">
                <span className="material-symbols-outlined text-primary-light animate-pulse">offline_pin</span>
                <div className="text-left">
                    <p className="text-[11px] font-bold text-white uppercase tracking-widest">Processamento Local</p>
                    <p className="text-[9px] text-primary-light/60">Privacidade total e acesso offline</p>
                </div>
            </div>
        </section>

        {/* Backup Actions */}
        <section className="mb-10 flex gap-3">
            <button 
                onClick={handleExport}
                className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10"
            >
                <span className="material-symbols-outlined text-lg">download</span> Exportar
            </button>
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10"
            >
                <span className="material-symbols-outlined text-lg">upload</span> Importar
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImport} className="hidden" accept=".json" />
        </section>

        {isAdding && (
          <div className="mb-10 bg-surface-dark/90 p-6 rounded-3xl border border-primary/30 animate-fade-in shadow-2xl">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-lg text-white">{editingId ? 'Editar Consulente' : 'Novo Consulente'}</h3>
                <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="material-symbols-outlined text-white/30">close</button>
             </div>
             <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    placeholder="Nome Completo" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-primary outline-none" 
                    required 
                />
                <div className="grid grid-cols-2 gap-3">
                    <input 
                        placeholder="DD/MM/AAAA" 
                        value={formData.birthDate}
                        onChange={e => setFormData({...formData, birthDate: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none" 
                        required 
                    />
                    <input 
                        placeholder="Hora" 
                        type="time"
                        value={formData.birthTime}
                        onChange={e => setFormData({...formData, birthTime: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none" 
                    />
                </div>
                <input 
                    placeholder="Cidade de Nascimento" 
                    value={formData.birthPlace}
                    onChange={e => setFormData({...formData, birthPlace: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none" 
                />
                <textarea 
                    placeholder="Notas ou Observações" 
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none h-20"
                />
                <button type="submit" className="w-full py-4 bg-primary rounded-xl font-bold uppercase text-[11px] tracking-widest shadow-lg shadow-primary/20">
                    {editingId ? 'Salvar Alterações' : 'Cadastrar Consulente'}
                </button>
             </form>
          </div>
        )}

        <section>
            <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6">Seus Registros</h3>
            {consultants.length === 0 ? (
                <div className="py-20 text-center opacity-30">
                    <span className="material-symbols-outlined text-5xl mb-4">person_search</span>
                    <p className="text-sm">Nenhum consulente cadastrado.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {consultants.map(c => (
                        <div key={c.id} className="group relative bg-white/[0.03] border border-white/5 rounded-3xl p-5 hover:bg-white/10 transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-light border border-primary/20 font-bold text-xl">
                                        {c.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-base">{c.name}</h4>
                                        <p className="text-[10px] text-white/40 uppercase tracking-widest">{c.birthDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => startEdit(c)} className="p-2 text-white/40 hover:text-white"><span className="material-symbols-outlined text-lg">edit</span></button>
                                    <button onClick={() => onDeleteConsultant(c.id)} className="p-2 text-red-500/40 hover:text-red-500"><span className="material-symbols-outlined text-lg">delete</span></button>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button 
                                    onClick={() => onSelectConsultant(c)}
                                    className="flex-1 py-3 bg-primary/10 border border-primary/20 rounded-xl text-[9px] font-bold uppercase tracking-widest text-primary-light hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">calendar_month</span> Mapa Mensal
                                </button>
                                <button 
                                    className="flex-1 py-3 bg-white/5 border border-white/5 rounded-xl text-[9px] font-bold uppercase tracking-widest text-white/60 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">history</span> Histórico
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 pb-[env(safe-area-inset-bottom)] max-w-md mx-auto">
        <div className="flex h-16 items-center justify-around px-2">
          <button className="flex flex-1 flex-col items-center justify-center gap-1 opacity-40 hover:opacity-100" onClick={() => onNavigate(View.HOME)}>
            <span className="material-symbols-outlined">home</span>
            <span className="text-[8px] font-bold uppercase tracking-tighter">Início</span>
          </button>
          <button className="flex flex-1 flex-col items-center justify-center gap-1 opacity-40 hover:opacity-100" onClick={() => onNavigate(View.LEARN)}>
            <span className="material-symbols-outlined">menu_book</span>
            <span className="text-[8px] font-bold uppercase tracking-tighter">Aprender</span>
          </button>
          <button className="flex flex-1 flex-col items-center justify-center gap-1 opacity-40 hover:opacity-100" onClick={() => onNavigate(View.SAVED_MAPS)}>
            <span className="material-symbols-outlined">history_edu</span>
            <span className="text-[8px] font-bold uppercase tracking-tighter">Salvos</span>
          </button>
          <button className="flex flex-1 flex-col items-center justify-center gap-1 text-primary-light">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[8px] font-bold uppercase tracking-tighter">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
