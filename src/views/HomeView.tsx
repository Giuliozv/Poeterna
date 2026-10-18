import React, { useState } from 'react';
import { Poem, Poet, ActiveTab } from '../types';
import { ASSET_IMAGES, POEMS, POETS, POETRY_QUOTES } from '../data/lusophoneData';
import { CrayonPoetIcon } from '../components/CrayonPoetIcon';
import { DailyLiterarySpotlight } from '../components/DailyLiterarySpotlight';
import { PoetWordCloud } from '../components/PoetWordCloud';

interface HomeViewProps {
  onSelectPoem: (poem: Poem) => void;
  onSelectPoet: (poet: Poet) => void;
  setActiveTab: (tab: ActiveTab) => void;
  favorites: string[];
  onToggleFavorite: (poemId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectPoem,
  onSelectPoet,
  setActiveTab,
  favorites,
  onToggleFavorite
}) => {
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [selectedEra, setSelectedEra] = useState<string>('Clássicos');
  const [quoteIndex, setQuoteIndex] = useState(0);

  const poemDoMomento = POEMS[currentPoemIndex % POEMS.length];
  const isMomentPoemFav = favorites.includes(poemDoMomento.id);

  const filteredPoems = POEMS.filter((p) => p.era === selectedEra || selectedEra === 'Todos');

  const handleNextMomentPoem = () => {
    setCurrentPoemIndex((prev) => (prev + 1) % POEMS.length);
  };

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % POETRY_QUOTES.length);
  };

  return (
    <div className="p-6 sm:p-12 max-w-6xl mx-auto text-[#1f1a14] animate-fade-in">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 mb-16 items-start">
        {/* Main Poem Card */}
        <div className="bg-[#faf2db] p-8 sm:p-12 border border-[#523816]/15 rounded-sm shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="label">
                Volume 01 • {poemDoMomento.countryName} • {poemDoMomento.era}
              </span>
              <button
                onClick={handleNextMomentPoem}
                className="font-mono text-xs text-[#1e3a8a] hover:underline flex items-center gap-1 cursor-pointer"
                title="Sugerir outro poema"
              >
                <span className="material-symbols-outlined text-sm">autorenew</span>
                <span>outro poema</span>
              </button>
            </div>

            <h2
              onClick={() => onSelectPoem(poemDoMomento)}
              className="font-cormorant text-4xl sm:text-6xl font-light leading-tight tracking-tight text-[#1f1a14] hover:text-[#1e3a8a] cursor-pointer transition-colors"
            >
              {poemDoMomento.title}
            </h2>

            <div
              onClick={() => onSelectPoem(poemDoMomento)}
              className="font-serif text-xl sm:text-3xl italic text-[#1e3a8a] my-8 leading-snug cursor-pointer hover:opacity-90 transition-opacity"
            >
              "{poemDoMomento.stanzas[0]}"
              {poemDoMomento.stanzas[1] && (
                <p className="mt-2 text-lg sm:text-xl text-[#1f1a14]/80 not-italic font-normal">
                  {poemDoMomento.stanzas[1]}
                </p>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-[#523816]/15 flex flex-wrap justify-between items-end gap-4">
            <div className="font-mono text-xs flex items-center gap-3">
              <CrayonPoetIcon poetId={poemDoMomento.poetId} poetName={poemDoMomento.poetName} size="md" />
              <div>
                <strong className="font-cormorant text-2xl font-semibold text-[#1f1a14] block">
                  {poemDoMomento.poetName}
                </strong>
                <span className="opacity-60">
                  {poemDoMomento.location ? `${poemDoMomento.location}, ` : ''}{poemDoMomento.year || '1934'}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onSelectPoem(poemDoMomento)}
                className="btn"
              >
                Ler Integral
              </button>
              <button
                onClick={() => onToggleFavorite(poemDoMomento.id)}
                className={`btn-outline ${isMomentPoemFav ? 'border-[#1e3a8a] text-[#1e3a8a] bg-[#1e3a8a]/5' : ''}`}
                id="header-fav-btn"
              >
                {isMomentPoemFav ? '✓ Guardado' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>

        {/* Hero Vintage Illustration / Quote Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#faf2db] border border-[#523816]/15 p-2 rounded-sm overflow-hidden shadow-2xs">
            <img
              src={ASSET_IMAGES.illustrationHeader}
              alt="Ilustração Literária"
              className="w-full h-64 object-cover grayscale rounded-xs hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div
            onClick={handleNextQuote}
            className="bg-[#faf2db] p-6 border border-[#523816]/15 hover:border-[#1e3a8a] transition-colors cursor-pointer group rounded-sm shadow-2xs"
            title="Clique para alternar citação"
          >
            <span className="label">Citação Poética</span>
            <p className="font-serif text-lg italic text-[#1f1a14] leading-relaxed mb-4">
              "{POETRY_QUOTES[quoteIndex].quote}"
            </p>
            <div className="font-mono text-xs text-[#1e3a8a] flex justify-between items-center border-t border-[#523816]/15 pt-3">
              <span>— {POETRY_QUOTES[quoteIndex].author}</span>
              <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform duration-300">
                autorenew
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Poets Strip: Coleção de Vozes */}
      <section className="mb-16">
        <span className="label">Coleção de Vozes • Flâmulas Heráldicas</span>
        <div className="poets-strip flex gap-2.5 flex-wrap mt-4">
          {POETS.map((poet) => (
            <div
              key={poet.id}
              onClick={() => onSelectPoet(poet)}
              className="bg-[#faf2db] pl-2 pr-3.5 py-1 border border-[#523816]/20 rounded-full flex items-center gap-2 hover:border-[#1e3a8a] hover:bg-[#1e3a8a]/5 transition-all cursor-pointer group shadow-2xs hover:shadow-xs"
            >
              <CrayonPoetIcon poetId={poet.id} poetName={poet.name} size="sm" />
              <span className="font-mono text-xs text-[#1f1a14] group-hover:text-[#1e3a8a] font-medium">
                {poet.shortName}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Literary Spotlight (Poema do Dia & Citação Literária Rotativa / Aleatória) */}
      <DailyLiterarySpotlight
        onSelectPoem={onSelectPoem}
        onSelectPoet={onSelectPoet}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      {/* Featured Magic Mood Roulette Banner */}
      <section className="mb-16">
        <div
          onClick={() => setActiveTab('roleta')}
          className="bg-gradient-to-r from-[#1e3a8a] to-[#2b2b2b] text-white p-8 sm:p-10 rounded-sm shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs text-white px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest font-semibold mb-3">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>Lira Mágica Interativa</span>
            </div>
            <h2 className="font-cormorant text-3xl sm:text-5xl font-light leading-tight tracking-tight text-white group-hover:text-amber-200 transition-colors mb-2">
              Roleta Mágica dos Humores
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-white/80 leading-relaxed">
              Como está o seu sentimento hoje? Gire a roleta e deixe que o destino lírico revele o seu humor atual e recomende um poema e poeta perfeitos para você.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 bg-white text-[#2b2b2b] px-6 py-3.5 rounded-xs font-mono text-xs font-semibold group-hover:bg-amber-100 transition-colors shadow-xs">
            <span className="material-symbols-outlined text-lg text-[#1e3a8a]">casino</span>
            <span>Girar a Roleta</span>
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>

          {/* Decorative background accent */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors pointer-events-none" />
        </div>
      </section>

      {/* Quick Navigation Sections */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div
          onClick={() => setActiveTab('paises')}
          className="bg-[#faf2db] p-6 border border-[#523816]/15 hover:border-[#1e3a8a] transition-all cursor-pointer group rounded-sm flex flex-col justify-between shadow-2xs hover:shadow-xs"
        >
          <div>
            <span className="label">Territórios</span>
            <h3 className="font-cormorant text-2xl font-semibold mb-2 text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors">
              Mundo Lusófono
            </h3>
            <p className="font-serif text-sm opacity-80 leading-relaxed text-[#1f1a14]/80">
              CPLP: Portugal, Brasil, Angola, Cabo Verde, Moçambique, Guiné, São Tomé, Timor e Macau/Goa/Galiza.
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform text-[#1e3a8a]">
              arrow_forward
            </span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('mundial')}
          className="bg-[#faf2db] p-6 border border-[#523816]/15 hover:border-[#1e3a8a] transition-all cursor-pointer group rounded-sm flex flex-col justify-between shadow-2xs hover:shadow-xs"
        >
          <div>
            <span className="label">Lírica Global</span>
            <h3 className="font-cormorant text-2xl font-semibold mb-2 text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors">
              Literatura Mundial
            </h3>
            <p className="font-serif text-sm opacity-80 leading-relaxed text-[#1f1a14]/80">
              Pérsia/Irã, França, Espanha, Itália, Reino Unido, EUA, Alemanha, Rússia, Chile, Grécia e Japão.
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform text-[#1e3a8a]">
              arrow_forward
            </span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('poetas')}
          className="bg-[#faf2db] p-6 border border-[#523816]/15 hover:border-[#1e3a8a] transition-all cursor-pointer group rounded-sm flex flex-col justify-between shadow-2xs hover:shadow-xs"
        >
          <div>
            <span className="label">Vozes</span>
            <h3 className="font-cormorant text-2xl font-semibold mb-2 text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors">
              Poetas & Mestres
            </h3>
            <p className="font-serif text-sm opacity-80 leading-relaxed text-[#1f1a14]/80">
              Consulte a vida, o contexto e o legado dos maiores poetas e autoras da lírica universal.
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform text-[#1e3a8a]">
              arrow_forward
            </span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('antologias')}
          className="bg-[#faf2db] p-6 border border-[#523816]/15 hover:border-[#1e3a8a] transition-all cursor-pointer group rounded-sm flex flex-col justify-between shadow-2xs hover:shadow-xs"
        >
          <div>
            <span className="label">Coleções</span>
            <h3 className="font-cormorant text-2xl font-semibold mb-2 text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors">
              Antologias Temáticas
            </h3>
            <p className="font-serif text-sm opacity-80 leading-relaxed text-[#1f1a14]/80">
              Seleções organizadas por Amor, Mar & Saudade, Liberdade, Identidade e Natureza.
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform text-[#1e3a8a]">
              arrow_forward
            </span>
          </div>
        </div>
      </section>

      {/* Constelação Dinâmica de Autores & Mestres (Word Cloud) */}
      <section className="mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 pb-2 border-b border-[#523816]/15 gap-2">
          <div>
            <span className="label mb-0">Navegação Dinâmica</span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-semibold text-[#1f1a14]">
              Constelação de Autores & Mestres
            </h2>
            <p className="font-serif text-sm opacity-80 mt-1 text-[#1f1a14]">
              Nuvem literária interativa com flâmulas heráldicas: clique em qualquer autor para escolher e explorar suas obras e biografia.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('poetas')}
            className="font-mono text-xs text-[#1e3a8a] hover:underline flex items-center gap-1 cursor-pointer font-medium shrink-0"
          >
            <span>Ver Modo Imersivo & Linha do Tempo</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <PoetWordCloud
          onSelectPoet={onSelectPoet}
          onSelectPoem={onSelectPoem}
          showControls={true}
        />
      </section>

      {/* Era / Filter Controls */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#523816]/15">
          <span className="label mb-0">Catálogo por Época</span>
          <span className="font-mono text-xs opacity-60 text-[#1f1a14]">{filteredPoems.length} poemas</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['Trovadorismo', 'Clássicos', 'Modernismo', 'Simbolismo', 'Contemporâneos', 'Todos'].map((era) => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={`px-3 py-1.5 font-mono text-xs cursor-pointer rounded-xs transition-colors ${
                selectedEra === era
                  ? 'bg-[#1f1a14] text-[#faf2db] shadow-2xs font-semibold'
                  : 'bg-[#faf2db] text-[#1f1a14] border border-[#523816]/20 hover:border-[#1e3a8a]'
              }`}
            >
              {era}
            </button>
          ))}
        </div>
      </section>

      {/* Poem Cards Grid Container */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPoems.map((poem) => {
          const isFav = favorites.includes(poem.id);
          return (
            <div
              key={poem.id}
              onClick={() => onSelectPoem(poem)}
              className="bg-[#faf2db] p-6 border border-[#523816]/15 hover:border-[#1e3a8a] transition-all cursor-pointer group rounded-sm flex flex-col justify-between shadow-2xs hover:shadow-xs"
            >
              <div>
                <span className="label">{poem.year || 'Época'} • {poem.countryName}</span>
                <h3 className="font-cormorant text-2xl font-normal mb-2 text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors">
                  {poem.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <CrayonPoetIcon poetId={poem.poetId} poetName={poem.poetName} size="xs" />
                  <p className="font-mono text-xs text-[#1e3a8a] font-medium">
                    {poem.poetName}
                  </p>
                </div>
                <p className="font-serif italic text-sm text-[#1f1a14]/85 line-clamp-3">
                  "{poem.stanzas[0]}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#523816]/15 flex justify-between items-center">
                <span className="font-mono text-[10px] uppercase opacity-60 text-[#1f1a14]">{poem.theme}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(poem.id);
                  }}
                  className={`p-1 ${isFav ? 'text-[#1e3a8a]' : 'text-[#1f1a14]/40 hover:text-[#1e3a8a]'}`}
                  title={isFav ? 'Remover dos guardados' : 'Guardar poema'}
                >
                  <span className="material-symbols-outlined text-lg">
                    {isFav ? 'favorite' : 'favorite_border'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};


