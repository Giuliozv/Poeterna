import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { ASSET_IMAGES } from '../data/lusophoneData';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  onOpenCreateModal: () => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenCreateModal,
  favoritesCount
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'inicio', label: 'início', icon: 'home' },
    { id: 'paises', label: 'territórios lusófonos', icon: 'flag' },
    { id: 'mundial', label: 'literatura mundial', icon: 'public' },
    { id: 'poetas', label: 'poetas', icon: 'person' },
    { id: 'antologias', label: 'antologias', icon: 'auto_stories' },
    { id: 'roleta', label: 'roleta dos humores', icon: 'auto_awesome' },
    { id: 'favoritos', label: `favoritos [${favoritesCount}]`, icon: 'favorite' }
  ];

  return (
    <>
      {/* Mobile Top Header (Visible only on < lg) */}
      <header className="lg:hidden fixed top-0 left-0 w-full z-40 bg-[#faf2db]/95 backdrop-blur-md border-b border-[#523816]/15 px-4 py-3 flex justify-between items-center text-[#1f1a14]">
        <div
          onClick={() => setActiveTab('inicio')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <img
            src={ASSET_IMAGES.logo}
            alt="Lira Lusófona"
            className="w-8 h-8 rounded-full border border-[#2b2b2b]/10 object-cover"
          />
          <div>
            <h1 className="font-cormorant text-2xl font-semibold leading-none text-[#2b2b2b]">
              Lira Lusófona
            </h1>
            <span className="font-mono text-[9px] lowercase tracking-wider text-[#1e3a8a] block">
              poesia e alma
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="p-1.5 text-[#2b2b2b] hover:text-[#1e3a8a] transition-colors cursor-pointer"
            title="Pesquisar"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="p-1.5 text-[#2b2b2b] hover:text-[#1e3a8a] transition-colors cursor-pointer"
            title="Lira Criativa"
          >
            <span className="material-symbols-outlined text-xl">edit_note</span>
          </button>

          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-1.5 border border-[#2b2b2b]/20 text-[#2b2b2b] hover:bg-[#2b2b2b] hover:text-white transition-colors cursor-pointer rounded-xs"
            title="Menu"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Visible only on < lg when open) */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-[#faf2db] h-full shadow-2xl p-6 flex flex-col justify-between z-10 text-[#1f1a14] border-r border-[#523816]/15">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-[#523816]/15 mb-6">
                <div className="flex items-center gap-2">
                  <img src={ASSET_IMAGES.logo} alt="Logo" className="w-7 h-7 rounded-full border border-[#523816]/20" />
                  <span className="font-cormorant font-semibold text-2xl text-[#1f1a14]">Lira Lusófona</span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 text-[#1f1a14] hover:text-[#1e3a8a] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <span className="label">Navegação</span>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setDrawerOpen(false);
                      }}
                      className={`flex items-center gap-3 py-3 font-mono text-xs lowercase cursor-pointer transition-colors border-b border-transparent ${
                        isActive
                          ? 'text-[#1e3a8a] font-medium border-[#1f1a14]'
                          : 'text-[#1f1a14]/70 hover:text-[#1f1a14]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#523816]/15">
              <button
                onClick={() => {
                  onOpenCreateModal();
                  setDrawerOpen(false);
                }}
                className="btn w-full text-center"
              >
                Lira Criativa
              </button>
              <div className="font-mono text-[10px] text-[#1f1a14]/50 text-center uppercase">
                &copy; 2026 POESIA E ALMA
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Editorial Sidebar (Visible on lg+) */}
      <header className="hidden lg:flex flex-col justify-between w-80 h-screen sticky top-0 bg-[#faf2db] border-r border-[#523816]/15 p-8 z-30 select-none shadow-xs">
        <div>
          {/* Logo Area */}
          <div className="logo-area mb-8">
            <img
              src={ASSET_IMAGES.logo}
              alt="Lira Lusófona Logo"
              className="w-12 h-12 mb-6 rounded-full border border-[#523816]/20 object-cover cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setActiveTab('inicio')}
            />
            <h1
              onClick={() => setActiveTab('inicio')}
              className="font-cormorant text-4xl sm:text-5xl font-light leading-none tracking-tight text-[#1f1a14] cursor-pointer hover:text-[#1e3a8a] transition-colors"
            >
              Lira<br />Lusófona
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#1e3a8a] mt-2 font-medium">
              Poesia e Alma
            </p>
          </div>

          {/* Navigation Links */}
          <span className="label">Menu</span>
          <nav className="nav-links mb-8 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 py-2.5 font-mono text-xs lowercase cursor-pointer transition-all border-b ${
                    isActive
                      ? 'text-[#1e3a8a] border-[#2b2b2b] font-medium opacity-100'
                      : 'text-[#2b2b2b] border-transparent opacity-60 hover:opacity-100 hover:text-[#1e3a8a]'
                  }`}
                  id={`nav-${item.id}`}
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Actions & Footer */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <button
              onClick={onOpenSearch}
              className="btn-outline w-full"
              id="header-search-btn"
            >
              <span className="material-symbols-outlined text-sm">search</span>
              <span>Pesquisar</span>
            </button>

            <button
              onClick={onOpenCreateModal}
              className="btn w-full"
              id="header-create-btn"
            >
              <span className="material-symbols-outlined text-sm">edit_note</span>
              <span>Lira Criativa</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#2b2b2b]/10 font-mono text-[10px] text-[#2b2b2b]/40">
            &copy; 2026 POESIA E ALMA
          </div>
        </div>
      </header>
    </>
  );
};


