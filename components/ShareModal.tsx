import React, { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  shareUrl?: string;
  shareText?: string;
}

export default function ShareModal({ 
  isOpen, 
  onClose, 
  title = "Compartilhar Destino", 
  shareUrl = typeof window !== 'undefined' ? window.location.href : '',
  shareText = "Confira meu mapa astral no Lunara Astrologia! ✨"
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-[#1e122a] border border-white/10 shadow-2xl animate-fade-in-up">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleWhatsApp}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
            >
               <span className="material-symbols-outlined text-3xl">chat</span>
               <span className="text-sm font-bold">WhatsApp</span>
            </button>
            <button 
              onClick={handleTwitter}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors"
            >
               <span className="material-symbols-outlined text-3xl">flutter</span>
               <span className="text-sm font-bold">Twitter</span>
            </button>
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Link direto</label>
            <div className="flex items-center gap-2 rounded-xl bg-background-dark border border-white/10 p-2">
              <span className="material-symbols-outlined text-white/30 pl-2">link</span>
              <input 
                type="text" 
                readOnly 
                value={shareUrl} 
                className="flex-1 bg-transparent border-none text-sm text-white/70 focus:ring-0 truncate"
              />
              <button 
                onClick={handleCopy}
                className={`flex h-9 items-center justify-center rounded-lg px-3 text-sm font-bold transition-all ${
                  copied 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-primary text-white hover:bg-primary-light"
                }`}
              >
                {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}