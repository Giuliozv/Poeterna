import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  favoritesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, favoritesCount }) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-[#faf2db]/95 backdrop-blur-md border-t border-[#523816]/15 px-4 py-2 font-mono text-xs">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('inicio')}
          className={`py-1.5 px-3 flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'inicio' ? 'text-[#1e3a8a] font-medium' : 'text-[#2b2b2b]/60 hover:text-[#2b2b2b]'
          }`}
          id="nav-inicio"
        >
          <span className="material-symbols-outlined text-xl">home</span>
          <span className="text-[10px] lowercase">início</span>
        </button>

        <button
          onClick={() => setActiveTab('paises')}
          className={`py-1.5 px-2 flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'paises' ? 'text-[#1e3a8a] font-medium' : 'text-[#2b2b2b]/60 hover:text-[#2b2b2b]'
          }`}
          id="nav-paises"
        >
          <span className="material-symbols-outlined text-xl">flag</span>
          <span className="text-[10px] lowercase">lusofonia</span>
        </button>

        <button
          onClick={() => setActiveTab('mundial')}
          className={`py-1.5 px-2 flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'mundial' ? 'text-[#1e3a8a] font-medium' : 'text-[#2b2b2b]/60 hover:text-[#2b2b2b]'
          }`}
          id="nav-mundial"
        >
          <span className="material-symbols-outlined text-xl">public</span>
          <span className="text-[10px] lowercase">mundial</span>
        </button>

        <button
          onClick={() => setActiveTab('poetas')}
          className={`py-1.5 px-3 flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'poetas' ? 'text-[#1e3a8a] font-medium' : 'text-[#2b2b2b]/60 hover:text-[#2b2b2b]'
          }`}
          id="nav-poetas"
        >
          <span className="material-symbols-outlined text-xl">person</span>
          <span className="text-[10px] lowercase">poetas</span>
        </button>

        <button
          onClick={() => setActiveTab('roleta')}
          className={`py-1.5 px-2 flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'roleta' ? 'text-[#1e3a8a] font-medium' : 'text-[#2b2b2b]/60 hover:text-[#2b2b2b]'
          }`}
          id="nav-roleta"
        >
          <span className="material-symbols-outlined text-xl">auto_awesome</span>
          <span className="text-[10px] lowercase">roleta</span>
        </button>

        <button
          onClick={() => setActiveTab('favoritos')}
          className={`py-1.5 px-3 flex flex-col items-center gap-0.5 transition-colors cursor-pointer relative ${
            activeTab === 'favoritos' ? 'text-[#1e3a8a] font-medium' : 'text-[#2b2b2b]/60 hover:text-[#2b2b2b]'
          }`}
          id="nav-favoritos"
        >
          <span className="material-symbols-outlined text-xl">favorite</span>
          <span className="text-[10px] lowercase">favoritos [{favoritesCount}]</span>
        </button>
      </div>
    </nav>
  );
};


