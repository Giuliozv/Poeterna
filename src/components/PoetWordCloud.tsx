import React, { useState, useMemo } from 'react';
import { Poet, Poem } from '../types';
import { POETS, POEMS } from '../data/lusophoneData';
import { CrayonPoetIcon } from './CrayonPoetIcon';

interface PoetWordCloudProps {
  onSelectPoet: (poet: Poet) => void;
  onSelectPoem?: (poem: Poem) => void;
  initialRegion?: string;
  className?: string;
  showControls?: boolean;
}

// Region classifications
const REGIONS = [
  { id: 'TODAS', label: 'Todas as Vozes', icon: 'auto_awesome' },
  { id: 'PT', label: 'Portugal', flag: '🇵🇹' },
  { id: 'BR', label: 'Brasil', flag: '🇧🇷' },
  { id: 'AFRICA', label: 'África Lusófona', flag: '🌍' },
  { id: 'OUTROS_LUSO', label: 'Timor-Leste, Galiza & Goa', flag: '🇹🇱' },
  { id: 'MUNDIAL', label: 'Lírica Mundial', flag: '🌐' },
];

const PERIOD_FILTERS = [
  'Todos os Períodos',
  'Trovadorismo',
  'Renascimento',
  'Barroco',
  'Arcadismo',
  'Romantismo',
  'Simbolismo',
  'Modernismo',
  'Contemporâneo',
  'Clássicos'
];

export const PoetWordCloud: React.FC<PoetWordCloudProps> = ({
  onSelectPoet,
  onSelectPoem,
  initialRegion = 'TODAS',
  className = '',
  showControls = true,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>(initialRegion);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Todos os Períodos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sizeMode, setSizeMode] = useState<'weighted' | 'uniform'>('weighted');
  const [shuffleSeed, setShuffleSeed] = useState<number>(0);
  const [activePoet, setActivePoet] = useState<Poet | null>(null);

  // Map of poetId -> count of poems
  const poemCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of POEMS) {
      map.set(p.poetId, (map.get(p.poetId) || 0) + 1);
    }
    return map;
  }, []);

  // Filtered poets based on selected region, period, and search query
  const filteredPoets = useMemo(() => {
    return POETS.filter((poet) => {
      // Region filter
      if (selectedRegion === 'PT' && poet.country !== 'PT') return false;
      if (selectedRegion === 'BR' && poet.country !== 'BR') return false;
      if (
        selectedRegion === 'AFRICA' &&
        !['AO', 'MZ', 'CV', 'GW', 'ST'].includes(poet.country)
      )
        return false;
      if (
        selectedRegion === 'OUTROS_LUSO' &&
        !['MO', 'TL'].includes(poet.country) &&
        !poet.countryName.toLowerCase().includes('galiza') &&
        !poet.countryName.toLowerCase().includes('goa')
      )
        return false;
      if (
        selectedRegion === 'MUNDIAL' &&
        ['PT', 'BR', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL', 'MO'].includes(poet.country)
      )
        return false;

      // Period filter
      if (selectedPeriod !== 'Todos os Períodos') {
        const pLower = poet.period.toLowerCase();
        const fLower = selectedPeriod.toLowerCase();
        const match =
          pLower.includes(fLower) ||
          (selectedPeriod === 'Trovadorismo' &&
            (pLower.includes('trovador') || pLower.includes('galego') || pLower.includes('cantiga'))) ||
          (selectedPeriod === 'Modernismo' &&
            (pLower.includes('claridade') || pLower.includes('neosimbolismo'))) ||
          (selectedPeriod === 'Romantismo' && pLower.includes('neorromantismo'));
        if (!match) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = poet.name.toLowerCase().includes(q);
        const matchesCountry = poet.countryName.toLowerCase().includes(q);
        const matchesPeriod = poet.period.toLowerCase().includes(q);
        if (!matchesName && !matchesCountry && !matchesPeriod) return false;
      }

      return true;
    });
  }, [selectedRegion, selectedPeriod, searchQuery]);

  // Pseudorandom organic shuffle order
  const displayPoets = useMemo(() => {
    const list = [...filteredPoets];
    if (shuffleSeed === 0) {
      // Deterministic pleasant scattering: alternate high weight and lower weight
      return list.sort((a, b) => {
        const countA = poemCounts.get(a.id) || 0;
        const countB = poemCounts.get(b.id) || 0;
        const scoreA = (a.featured ? 3 : 1) + countA * 2;
        const scoreB = (b.featured ? 3 : 1) + countB * 2;
        // Pseudo-hash distribution so giant names don't bunch up together
        const hashA = (a.name.charCodeAt(0) * 31 + a.name.length) % 17;
        const hashB = (b.name.charCodeAt(0) * 31 + b.name.length) % 17;
        return (scoreB * 3 + hashB) - (scoreA * 3 + hashA);
      });
    }
    // Shuffled based on seed
    return list.sort((a, b) => {
      const hA = (a.id.length * 37 + a.id.charCodeAt(0) * (shuffleSeed + 1)) % 100;
      const hB = (b.id.length * 37 + b.id.charCodeAt(0) * (shuffleSeed + 1)) % 100;
      return hA - hB;
    });
  }, [filteredPoets, poemCounts, shuffleSeed]);

  // Helper to determine font size & visual weight class
  const getPoetWeight = (poet: Poet) => {
    if (sizeMode === 'uniform') {
      return {
        fontSize: 'text-base sm:text-lg',
        weight: 'font-medium',
        score: 2,
      };
    }

    const count = poemCounts.get(poet.id) || 0;
    const isFeatured = poet.featured;

    if (count >= 3 || (isFeatured && count >= 2)) {
      return {
        fontSize: 'text-2xl sm:text-3xl md:text-4xl',
        weight: 'font-bold tracking-tight',
        score: 5,
      };
    }
    if (count >= 2 || isFeatured) {
      return {
        fontSize: 'text-xl sm:text-2xl',
        weight: 'font-semibold',
        score: 4,
      };
    }
    if (count === 1) {
      return {
        fontSize: 'text-base sm:text-lg',
        weight: 'font-medium',
        score: 3,
      };
    }
    return {
      fontSize: 'text-sm sm:text-base',
      weight: 'font-normal opacity-90',
      score: 2,
    };
  };

  // Helper for color palettes depending on country & era
  const getPoetColor = (poet: Poet, isSelected: boolean) => {
    if (isSelected) {
      return 'text-white bg-[#1e3a8a] border-[#1e3a8a] shadow-md scale-105 ring-2 ring-[#1e3a8a]/30';
    }

    // Lusophone vs World colors
    const country = poet.country;
    if (country === 'PT') {
      return 'text-[#1e3a8a] hover:text-[#0f172a] hover:bg-[#1e3a8a]/8 border-transparent hover:border-[#1e3a8a]/30';
    }
    if (country === 'BR') {
      return 'text-[#14532d] hover:text-[#052e16] hover:bg-[#14532d]/8 border-transparent hover:border-[#14532d]/30';
    }
    if (['AO', 'MZ', 'CV', 'GW', 'ST'].includes(country)) {
      return 'text-[#c2410c] hover:text-[#7c2d12] hover:bg-[#c2410c]/8 border-transparent hover:border-[#c2410c]/30';
    }
    if (country === 'MO' || poet.countryName.toLowerCase().includes('galiza')) {
      return 'text-[#0f766e] hover:text-[#134e4a] hover:bg-[#0f766e]/8 border-transparent hover:border-[#0f766e]/30';
    }
    // World / Universal
    return 'text-[#4c1d95] hover:text-[#2e1065] hover:bg-[#4c1d95]/8 border-transparent hover:border-[#4c1d95]/30';
  };

  const handlePoetClick = (poet: Poet) => {
    if (activePoet?.id === poet.id) {
      // Toggle or direct select
      onSelectPoet(poet);
    } else {
      setActivePoet(poet);
    }
  };

  const activePoetPoems = useMemo(() => {
    if (!activePoet) return [];
    return POEMS.filter((p) => p.poetId === activePoet.id);
  }, [activePoet]);

  return (
    <div className={`flex flex-col space-y-6 ${className}`}>
      {/* Dynamic Controls Bar */}
      {showControls && (
        <div className="bg-white p-4 sm:p-6 border border-[#2b2b2b]/15 rounded-sm shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2b2b2b]/10 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-[#1e3a8a] bg-[#1e3a8a]/10 px-2 py-0.5 rounded-full">
                  Nuvem Literária Dinâmica
                </span>
                <span className="font-mono text-xs text-[#1f1a14]/65">
                  {filteredPoets.length} {filteredPoets.length === 1 ? 'autor' : 'autores'}
                </span>
              </div>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#1f1a14]">
                Constelação de Autores
              </h3>
              <p className="font-serif text-xs text-[#1f1a14]/75">
                Clique em qualquer nome para abrir instantaneamente suas obras e biografia.
              </p>
            </div>

            {/* Quick Actions: Shuffle, Size mode, Search */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Real-time search */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#1f1a14]/50">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filtrar autor..."
                  className="pl-7 pr-6 py-1.5 bg-[#f4e9cd] border border-[#523816]/25 font-mono text-xs text-[#1f1a14] placeholder-[#1f1a14]/40 focus:outline-none focus:border-[#1e3a8a] rounded-xs w-36 sm:w-44"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#1f1a14]/40 hover:text-[#1f1a14]"
                  >
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                )}
              </div>

              {/* Shuffle Button */}
              <button
                onClick={() => setShuffleSeed((s) => s + 1)}
                className="px-2.5 py-1.5 bg-[#faf2db] hover:bg-[#f5eacf] text-[#1f1a14] border border-[#523816]/20 hover:border-[#1e3a8a] rounded-xs font-mono text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                title="Embaralhar posições na nuvem"
              >
                <span className="material-symbols-outlined text-sm">shuffle</span>
                <span className="hidden sm:inline">Embaralhar</span>
              </button>

              {/* Size Mode Toggle */}
              <button
                onClick={() => setSizeMode((m) => (m === 'weighted' ? 'uniform' : 'weighted'))}
                className={`px-2.5 py-1.5 rounded-xs font-mono text-xs border flex items-center gap-1 cursor-pointer transition-colors ${
                  sizeMode === 'weighted'
                    ? 'bg-[#1e3a8a]/10 text-[#1e3a8a] border-[#1e3a8a]/30 font-semibold'
                    : 'bg-[#faf2db] text-[#1f1a14]/70 border-[#523816]/20 hover:text-[#1f1a14]'
                }`}
                title={sizeMode === 'weighted' ? 'Tamanhos proporcionais às obras' : 'Tamanho uniforme'}
              >
                <span className="material-symbols-outlined text-sm">
                  {sizeMode === 'weighted' ? 'format_size' : 'density_medium'}
                </span>
                <span className="hidden sm:inline">
                  {sizeMode === 'weighted' ? 'Por Destaque' : 'Uniforme'}
                </span>
              </button>
            </div>
          </div>

          {/* Region Tabs (Compact & Responsive) */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase text-[#1f1a14]/60 font-semibold mr-1 shrink-0">
              Região:
            </span>
            {REGIONS.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-2.5 py-1 font-mono text-xs rounded-xs cursor-pointer transition-all flex items-center gap-1 border ${
                  selectedRegion === reg.id
                    ? 'bg-[#1e3a8a] text-white border-[#1e3a8a] font-semibold shadow-2xs'
                    : 'bg-[#faf2db] text-[#1f1a14]/80 border-[#523816]/15 hover:border-[#1e3a8a] hover:text-[#1e3a8a]'
                }`}
              >
                {reg.flag && <span>{reg.flag}</span>}
                {reg.icon && <span className="material-symbols-outlined text-xs">{reg.icon}</span>}
                <span>{reg.label}</span>
              </button>
            ))}
          </div>

          {/* Period Dropdown / Filter (Lightweight & Uncluttered) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="font-mono text-[10px] uppercase text-[#1f1a14]/60 font-semibold mr-1 shrink-0">
              Época / Movimento:
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar max-w-full">
              {PERIOD_FILTERS.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPeriod(p)}
                  className={`px-2 py-0.5 font-mono text-[11px] whitespace-nowrap rounded-xs cursor-pointer transition-all border ${
                    selectedPeriod === p
                      ? 'bg-[#1f1a14] text-[#faf2db] border-[#1f1a14] font-medium'
                      : 'bg-[#faf2db] text-[#1f1a14]/70 border-[#523816]/15 hover:border-[#1e3a8a]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Dynamic Word Cloud Canvas */}
      <div className="relative min-h-[380px] bg-[#f5eacf] p-6 sm:p-10 border border-[#523816]/20 rounded-sm shadow-inner dot-grid-pattern flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-4 overflow-hidden">
        {displayPoets.length > 0 ? (
          displayPoets.map((poet) => {
            const count = poemCounts.get(poet.id) || 0;
            const isSelected = activePoet?.id === poet.id;
            const { fontSize, weight } = getPoetWeight(poet);
            const colorClass = getPoetColor(poet, isSelected);

            return (
              <button
                key={poet.id}
                onClick={() => handlePoetClick(poet)}
                className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border transition-all duration-200 cursor-pointer select-none ${colorClass}`}
                title={`${poet.name} (${poet.countryName} • ${poet.period}) — ${count} obras`}
              >
                {/* Visual miniature Heraldic Flag Pennant for selected or giant voices */}
                {isSelected && (
                  <span className="shrink-0 scale-95">
                    <CrayonPoetIcon poetId={poet.id} poetName={poet.name} country={poet.country} size="xs" />
                  </span>
                )}

                <span className={`font-cormorant ${fontSize} ${weight} leading-none tracking-normal transition-transform group-hover:scale-105`}>
                  {poet.name}
                </span>

                {/* Poem count badge */}
                {count > 0 && (
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full leading-none transition-colors ${
                      isSelected
                        ? 'bg-[#1f1a14] text-[#faf2db] font-bold'
                        : 'bg-[#523816]/10 text-[#1f1a14]/70 group-hover:bg-[#1e3a8a]/10 group-hover:text-[#1e3a8a]'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })
        ) : (
          <div className="text-center py-16 space-y-3">
            <span className="material-symbols-outlined text-4xl text-[#1f1a14]/30">
              filter_vintage
            </span>
            <p className="font-serif italic text-base text-[#1f1a14]/75">
              Nenhum autor encontrado para os critérios selecionados.
            </p>
            <button
              onClick={() => {
                setSelectedRegion('TODAS');
                setSelectedPeriod('Todos os Períodos');
                setSearchQuery('');
              }}
              className="px-3 py-1 bg-[#1e3a8a] text-white font-mono text-xs rounded-xs cursor-pointer shadow-xs"
            >
              Restaurar Filtros
            </button>
          </div>
        )}
      </div>

      {/* Interactive Quick Author Spotlight Drawer (Under the cloud) */}
      {activePoet && (
        <div className="bg-[#faf2db] border-2 border-[#1e3a8a]/40 p-6 sm:p-8 rounded-sm shadow-md animate-fade-in relative">
          <button
            onClick={() => setActivePoet(null)}
            className="absolute top-4 right-4 text-[#1f1a14]/50 hover:text-[#1f1a14] p-1.5 rounded-xs hover:bg-[#523816]/10"
            title="Fechar destaque"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>

          <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-6 border-b border-[#523816]/15">
            <div className="flex items-start gap-4">
              <CrayonPoetIcon poetId={activePoet.id} poetName={activePoet.name} country={activePoet.country} size="xl" />
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="label mb-0">{activePoet.countryName}</span>
                  <span className="text-[#1f1a14]/30">•</span>
                  <span className="font-mono text-xs text-[#1e3a8a] font-semibold">
                    {activePoet.period}
                  </span>
                  <span className="text-[#1f1a14]/30">•</span>
                  <span className="font-mono text-xs text-[#1f1a14]/70">
                    {activePoet.years}
                  </span>
                  {activePoet.copyrightStatus && (
                    <>
                      <span className="text-[#2b2b2b]/30">•</span>
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          activePoet.copyrightStatus === 'Domínio Público'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-900 border border-amber-200'
                        }`}
                      >
                        {activePoet.copyrightStatus}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="font-cormorant text-3xl sm:text-4xl font-semibold text-[#1f1a14]">
                  {activePoet.name}
                </h3>
                <p className="font-serif text-sm text-[#1f1a14]/85 max-w-2xl mt-2 leading-relaxed">
                  {activePoet.bio}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 shrink-0 self-stretch md:self-auto">
              <button
                onClick={() => onSelectPoet(activePoet)}
                className="btn py-2 px-4 text-xs flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">menu_book</span>
                <span>Ver Biografia Completa</span>
              </button>
            </div>
          </div>

          {/* Famous Quote */}
          {activePoet.famousQuote && (
            <div className="my-4 p-4 bg-[#f4e9cd] border-l-4 border-[#1e3a8a] border border-[#523816]/15 rounded-r-xs">
              <p className="font-serif italic text-base sm:text-lg text-[#1e3a8a]">
                "{activePoet.famousQuote}"
              </p>
            </div>
          )}

          {/* Catalogued Poems by this Poet */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase font-bold text-[#1e3a8a] tracking-wider">
                Poemas no Acervo ({activePoetPoems.length}):
              </span>
              {activePoetPoems.length > 0 && onSelectPoem && (
                <span className="font-mono text-[11px] text-[#1f1a14]/65">
                  Clique no poema para ler a íntegra
                </span>
              )}
            </div>

            {activePoetPoems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePoetPoems.map((poem) => (
                  <div
                    key={poem.id}
                    onClick={() => onSelectPoem && onSelectPoem(poem)}
                    className="p-3.5 bg-[#f4e9cd] hover:bg-[#faeed7] border border-[#523816]/20 hover:border-[#1e3a8a] rounded-xs cursor-pointer transition-all flex justify-between items-center group shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-cormorant text-xl font-semibold text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors">
                          {poem.title}
                        </h4>
                        {poem.year && (
                          <span className="font-mono text-[10px] text-[#1f1a14]/50">
                            ({poem.year})
                          </span>
                        )}
                      </div>
                      <p className="font-serif italic text-xs text-[#1f1a14]/75 line-clamp-1 mt-0.5">
                        "{poem.stanzas[0]}"
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-sm text-[#1f1a14]/40 group-hover:text-[#1e3a8a] group-hover:translate-x-0.5 transition-all ml-2 shrink-0">
                      auto_stories
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-mono text-xs text-[#1f1a14]/65 italic py-2">
                Obras deste autor estão sendo digitalizadas e estarão disponíveis em breve.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
