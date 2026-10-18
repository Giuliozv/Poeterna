import React, { useState, useEffect } from 'react';
import { ActiveTab, Poem, Poet } from './types';
import { POEMS, POETS } from './data/lusophoneData';

// Components
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SearchModal } from './components/SearchModal';
import { PoemDetailModal } from './components/PoemDetailModal';
import { CreatePoemModal } from './components/CreatePoemModal';

// Views
import { HomeView } from './views/HomeView';
import { CountriesView } from './views/CountriesView';
import { PoetsView } from './views/PoetsView';
import { AnthologiesView } from './views/AnthologiesView';
import { FavoritesView } from './views/FavoritesView';
import { RouletteView } from './views/RouletteView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lira_favorites');
      return saved ? JSON.parse(saved) : ['mar-portugues'];
    } catch {
      return ['mar-portugues'];
    }
  });

  // Custom user poems state
  const [customPoems, setCustomPoems] = useState<Poem[]>(() => {
    try {
      const saved = localStorage.getItem('lira_custom_poems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('lira_favorites', JSON.stringify(favorites));
    } catch {
      // Ignore quota errors
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('lira_custom_poems', JSON.stringify(customPoems));
    } catch {
      // Ignore quota errors
    }
  }, [customPoems]);

  const handleToggleFavorite = (poemId: string) => {
    setFavorites((prev) =>
      prev.includes(poemId) ? prev.filter((id) => id !== poemId) : [...prev, poemId]
    );
  };

  const handleSaveCustomPoem = (newPoem: Poem) => {
    setCustomPoems((prev) => [newPoem, ...prev]);
    setSelectedPoem(newPoem);
  };

  const handleSelectPoet = (poet: Poet) => {
    // Find first poem of poet or switch to poet tab
    const poetPoem = POEMS.find((p) => p.poetId === poet.id);
    if (poetPoem) {
      setSelectedPoem(poetPoem);
    } else {
      setActiveTab('poetas');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4e9cd] text-[#1f1a14] relative font-serif selection:bg-[#1e3a8a] selection:text-white grid grid-cols-1 lg:grid-cols-[320px_1fr]">
      {/* Navigation Header / Editorial Sidebar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCreateModal={() => setCreateModalOpen(true)}
        favoritesCount={favorites.length + customPoems.length}
      />

      {/* Main Content Area */}
      <div className="flex flex-col min-h-screen overflow-y-auto">
        <main className="relative z-10 flex-1 pt-16 lg:pt-0 pb-20 lg:pb-8">
          {activeTab === 'inicio' && (
            <HomeView
              onSelectPoem={(poem) => setSelectedPoem(poem)}
              onSelectPoet={handleSelectPoet}
              setActiveTab={setActiveTab}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activeTab === 'paises' && (
            <CountriesView
              initialCategory="lusofona"
              onSelectPoem={(poem) => setSelectedPoem(poem)}
              onSelectPoet={handleSelectPoet}
            />
          )}

          {activeTab === 'mundial' && (
            <CountriesView
              initialCategory="mundial"
              onSelectPoem={(poem) => setSelectedPoem(poem)}
              onSelectPoet={handleSelectPoet}
            />
          )}

          {activeTab === 'poetas' && (
            <PoetsView
              onSelectPoet={handleSelectPoet}
              onSelectPoem={(poem) => setSelectedPoem(poem)}
            />
          )}

          {activeTab === 'antologias' && (
            <AnthologiesView onSelectPoem={(poem) => setSelectedPoem(poem)} />
          )}

          {activeTab === 'roleta' && (
            <RouletteView
              onSelectPoem={(poem) => setSelectedPoem(poem)}
              onSelectPoet={handleSelectPoet}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activeTab === 'favoritos' && (
            <FavoritesView
              favoriteIds={favorites}
              customPoems={customPoems}
              onSelectPoem={(poem) => setSelectedPoem(poem)}
              onToggleFavorite={handleToggleFavorite}
              onOpenCreateModal={() => setCreateModalOpen(true)}
            />
          )}
        </main>

        {/* Global Footer */}
        <footer className="px-6 py-6 border-t border-[#2b2b2b]/10 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#fdfaf6] text-xs">
          <div className="font-serif italic text-[#2b2b2b]/70 text-center md:text-left">
            "A poesia é a distância mais curta entre dois seres humanos." — Mário Quintana
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="btn-outline py-2 px-4"
              id="header-search-btn"
            >
              Pesquisar
            </button>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="btn py-2 px-4"
              id="header-create-btn"
            >
              Lira Criativa
            </button>
          </div>
        </footer>
      </div>

      {/* Mobile Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length + customPoems.length}
      />

      {/* Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectPoem={(poem) => setSelectedPoem(poem)}
        onSelectPoet={handleSelectPoet}
      />

      <PoemDetailModal
        poem={selectedPoem}
        onClose={() => setSelectedPoem(null)}
        isFavorite={selectedPoem ? favorites.includes(selectedPoem.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <CreatePoemModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSaveCustomPoem={handleSaveCustomPoem}
      />
    </div>
  );
}

