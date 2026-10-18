import React, { useState } from 'react';
import { Poet, Poem } from '../types';
import { POETS, POEMS, ALL_COUNTRIES } from '../data/lusophoneData';
import { CrayonPoetIcon } from '../components/CrayonPoetIcon';
import { PoetWordCloud } from '../components/PoetWordCloud';

interface PoetsViewProps {
  onSelectPoet: (poet: Poet) => void;
  onSelectPoem: (poem: Poem) => void;
}

interface LiteraryPeriodInfo {
  id: string;
  name: string;
  century: string;
  years: string;
  description: string;
  keyFeatures: string[];
  color: string;
}

const LITERARY_PERIODS_TIMELINE: LiteraryPeriodInfo[] = [
  {
    id: 'Todos',
    name: 'Todos os Períodos',
    century: 'Antiguidade ao Séc. XXI',
    years: 'Séc. VI a.C. — Presente',
    description: 'Panorama cronológico abrangente de todos os grandes poetas lusófonos e da literatura universal ao longo dos séculos.',
    keyFeatures: ['Tradição Oral', 'Lírica Amorosa', 'Renascimento', 'Barroco', 'Romantismo', 'Modernismo'],
    color: '#1e3a8a'
  },
  {
    id: 'Clássicos',
    name: 'Antiguidade & Clássicos',
    century: 'Séc. VI a.C. — Séc. V',
    years: 'Grécia e Roma Antiga',
    description: 'A matriz da poesia lírica ocidental. Lirismo amoroso, harmonia métrica, mitos e busca da perfeição das musas.',
    keyFeatures: ['Lira Amorosa', 'Métrica Rigorosa', 'Invocação das Musas', 'Harmonia e Proporção'],
    color: '#b45309'
  },
  {
    id: 'Trovadorismo',
    name: 'Trovadorismo & Galego-Português',
    century: 'Séc. XII — Séc. XIV',
    years: '1189 — 1418',
    description: 'A alvorada da literatura lusófona em língua galego-portuguesa. O lirismo amoroso das Cantigas de Amigo e Cantigas de Amor, o Rei Poeta El-Rei D. Dinis, Martin Codax e a sátira das Cantigas de Escárnio e Maldizer.',
    keyFeatures: ['Cantigas de Amigo', 'Cantigas de Amor', 'Escárnio e Maldizer', 'El-Rei D. Dinis', 'Jograis & Trovadores'],
    color: '#065f46'
  },
  {
    id: 'Renascimento',
    name: 'Renascimento & Humanismo',
    century: 'Séc. XIV — Séc. XVI',
    years: '1500 — 1600',
    description: 'O antropocentrismo, a redescoberta da Antiguidade Clássica, os descobrimentos marítimos e os sonetos amorosos ideais.',
    keyFeatures: ['Soneto de Medida Nova', 'Epopeias Marítimas', 'Antropocentrismo', 'Neoplatonismo Amoroso'],
    color: '#d97706'
  },
  {
    id: 'Barroco',
    name: 'Barroco & Seiscentismo',
    century: 'Séc. XVII',
    years: '1601 — 1700',
    description: 'A dualidade dramática entre fé e razão, a exaltação dos opostos, o cultismo (jogo de palavras) e o conceptismo (argumentação racional).',
    keyFeatures: ['Cultismo & Conceptismo', 'Jogo de Antíteses', 'Dicotomia Corpo e Alma', 'Boca do Inferno & Sermões'],
    color: '#78350f'
  },
  {
    id: 'Arcadismo',
    name: 'Arcadismo & Neoclassicismo',
    century: 'Séc. XVIII',
    years: '1768 — 1836',
    description: 'Simplicidade pastoril, exaltação da natureza tranquila, ideal de tranquilidade (Inutilia Truncat) e vozes da Inconfidência Mineira.',
    keyFeatures: ['Carpe Diem & Bucolismo', 'Inutilia Truncat', 'Fugere Urbem', 'Pastoralismo Amoroso'],
    color: '#15803d'
  },
  {
    id: 'Romantismo',
    name: 'Romantismo',
    century: 'Séc. XIX',
    years: '1836 — 1880',
    description: 'Triunfo da subjetividade, paixão ardente, exaltação da liberdade, mal do século e o lirismo social libertário.',
    keyFeatures: ['Subjetivismo & Paixão', 'Nacionalismo & Indianismo', 'Mal do Século', 'Poesia Condoreira'],
    color: '#be185d'
  },
  {
    id: 'Simbolismo',
    name: 'Simbolismo & Parnasianismo',
    century: 'Finais do Séc. XIX',
    years: '1880 — 1920',
    description: 'O mistério, a musicalidade verbal, a sinestesia, o misticismo e o rigor formal da arte por excelência.',
    keyFeatures: ['Musicalidade & Aliterações', 'Misticismo & Sinestesia', 'A Arte pela Arte', 'Rigor do Soneto'],
    color: '#6b21a8'
  },
  {
    id: 'Modernismo',
    name: 'Modernismo & Vanguardas',
    century: 'Século XX',
    years: '1915 — 1960',
    description: 'A revolução estética das revistas Orpheu e da Semana de 1922. Heteronímia, ruptura métrica, verso livre e o cotidiano.',
    keyFeatures: ['Heterónimos & Desdobramento', 'Verso Livre & Humor', 'Linguagem Cotidiana', 'Crítica Existencial'],
    color: '#1e3a8a'
  },
  {
    id: 'Surrealismo',
    name: 'Surrealismo & Vanguardas',
    century: 'Meados do Séc. XX',
    years: '1940 — 1970',
    description: 'Liberdade do inconsciente, escrita automática, associação livre de imagens líricas e recusa do racionalismo rígido.',
    keyFeatures: ['Imagens Inconscientes', 'Associação Livre', 'Vanguarda Experimental', 'Poesia de Intervenção'],
    color: '#0369a1'
  },
  {
    id: 'Contemporâneo',
    name: 'Poesia Contemporânea',
    century: 'Segunda Metade Séc. XX — XXI',
    years: '1970 — Presente',
    description: 'Vozes da afirmação pós-colonial africana, feminismo lírico, resistência e a vasta diversidade temática da era global.',
    keyFeatures: ['Vozes de Libertação', 'Lirismo Africano e Lusófono', 'Diversidade Contemporânea', 'Intertextualidade'],
    color: '#0f766e'
  }
];

// Helper to extract numeric birth year for timeline ordering
const extractBirthYear = (yearsStr: string): number => {
  if (!yearsStr) return 2000;
  if (yearsStr.includes('a.C.')) {
    const match = yearsStr.match(/(\d+)/);
    return match ? -parseInt(match[1], 10) * 100 : -600;
  }
  const match = yearsStr.match(/(\d{3,4})/);
  if (match) return parseInt(match[1], 10);
  return 1900;
};

export const PoetsView: React.FC<PoetsViewProps> = ({ onSelectPoet, onSelectPoem }) => {
  const [viewMode, setViewMode] = useState<'nuvem' | 'timeline' | 'grid'>('nuvem');
  const [filterPeriod, setFilterPeriod] = useState<string>('Todos');
  const [filterCountry, setFilterCountry] = useState<string>('TODOS');
  const [filterLetter, setFilterLetter] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPoetModal, setSelectedPoetModal] = useState<Poet | null>(null);

  const periods = ['Todos', 'Modernismo', 'Renascimento', 'Simbolismo', 'Contemporâneo', 'Romantismo', 'Surrealismo', 'Clássicos'];

  // Sort poets alphabetically A-Z by default for practical navigation
  const sortedPoets = [...POETS].sort((a, b) =>
    a.name.localeCompare(b.name, 'pt', { sensitivity: 'base' })
  );

  const availableLetters = Array.from(
    new Set(
      sortedPoets.map((p) =>
        p.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .charAt(0)
          .toUpperCase()
      )
    )
  ).sort();

  const alphabetLetters = ['TODOS', ...availableLetters];

  const filteredPoets = sortedPoets.filter((p) => {
    const matchesPeriod =
      filterPeriod === 'Todos' ||
      p.period.toLowerCase().includes(filterPeriod.toLowerCase()) ||
      (filterPeriod === 'Trovadorismo' && (p.period.toLowerCase().includes('trovador') || p.period.toLowerCase().includes('galego') || p.period.toLowerCase().includes('cantiga'))) ||
      (filterPeriod === 'Modernismo' && (p.period.toLowerCase().includes('claridade') || p.period.toLowerCase().includes('neosimbolismo'))) ||
      (filterPeriod === 'Romantismo' && p.period.toLowerCase().includes('neorromantismo'));
    const matchesCountry =
      filterCountry === 'TODOS' || p.country === filterCountry;
    const initialChar = p.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .charAt(0)
      .toUpperCase();
    const matchesLetter = filterLetter === 'TODOS' || initialChar === filterLetter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPeriod && matchesCountry && matchesLetter && matchesSearch;
  });

  // Sort poets chronologically for timeline view
  const chronologicalPoets = [...filteredPoets].sort(
    (a, b) => extractBirthYear(a.years) - extractBirthYear(b.years)
  );

  const activePeriodInfo =
    LITERARY_PERIODS_TIMELINE.find((p) => p.id === filterPeriod) ||
    LITERARY_PERIODS_TIMELINE[0];

  const hasActiveFilters =
    filterPeriod !== 'Todos' ||
    filterCountry !== 'TODOS' ||
    filterLetter !== 'TODOS' ||
    searchQuery.trim() !== '';

  const resetAllFilters = () => {
    setFilterPeriod('Todos');
    setFilterCountry('TODOS');
    setFilterLetter('TODOS');
    setSearchQuery('');
  };

  const poetPoems = selectedPoetModal
    ? POEMS.filter((poem) => poem.poetId === selectedPoetModal.id)
    : [];

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-6xl mx-auto text-[#1f1a14] animate-fade-in">
      {/* Title Header & Mode Switcher */}
      <div className="border-b border-[#523816]/15 pb-6 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="label">Vozes & Mestres da Poesia Universal</span>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-[#1f1a14]">
            {viewMode === 'nuvem'
              ? 'Nuvem Dinâmica de Autores'
              : viewMode === 'timeline'
              ? 'Linha do Tempo Literária'
              : 'Catálogo de Poetas'}{' '}
            <span className="text-2xl sm:text-3xl text-[#1e3a8a]/70 font-mono font-normal">
              ({POETS.length})
            </span>
          </h2>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Mode Switcher Buttons */}
          <div className="flex bg-[#faf2db] p-1 border border-[#523816]/20 rounded-xs shadow-2xs shrink-0">
            <button
              onClick={() => setViewMode('nuvem')}
              className={`px-3 py-1.5 font-mono text-xs cursor-pointer rounded-xs transition-all flex items-center gap-1.5 ${
                viewMode === 'nuvem'
                  ? 'bg-[#1e3a8a] text-white font-bold shadow-xs'
                  : 'text-[#1f1a14] hover:text-[#1e3a8a]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              Nuvem de Autores
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 font-mono text-xs cursor-pointer rounded-xs transition-all flex items-center gap-1.5 ${
                viewMode === 'timeline'
                  ? 'bg-[#1e3a8a] text-white font-bold shadow-xs'
                  : 'text-[#2b2b2b] hover:text-[#1e3a8a]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">timeline</span>
              Linha do Tempo
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 font-mono text-xs cursor-pointer rounded-xs transition-all flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-[#1e3a8a] text-white font-bold shadow-xs'
                  : 'text-[#2b2b2b] hover:text-[#1e3a8a]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">grid_view</span>
              Catálogo A-Z
            </button>
          </div>

          {/* Search Input Bar (Shown in timeline and grid modes) */}
          {viewMode !== 'nuvem' && (
            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#2b2b2b]/50">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por poeta, época, país..."
                className="w-full pl-9 pr-8 py-2 bg-white border border-[#2b2b2b]/20 font-mono text-xs text-[#2b2b2b] placeholder-[#2b2b2b]/40 focus:outline-none focus:border-[#1e3a8a] rounded-xs shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#2b2b2b]/60 hover:text-[#1e3a8a]"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: DYNAMIC WORD CLOUD (NUVEM DE PALAVRAS / AUTORES) */}
      {viewMode === 'nuvem' && (
        <PoetWordCloud
          onSelectPoet={(poet) => setSelectedPoetModal(poet)}
          onSelectPoem={onSelectPoem}
          showControls={true}
        />
      )}

      {/* TIMELINE & CATALOG FILTERS (Only shown when not in nuvem mode) */}
      {viewMode !== 'nuvem' && (
        <>
          {/* Interactive Timeline Axis / Period Selector Bar */}
          <div className="mb-8 bg-white border border-[#2b2b2b]/15 p-4 rounded-sm shadow-2xs">
        <div className="flex items-center justify-between mb-3 border-b border-[#2b2b2b]/10 pb-2">
          <span className="font-mono text-xs text-[#1e3a8a] uppercase font-bold tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">history_edu</span>
            Linha do Tempo Literária — Filtro por Período & Época:
          </span>
          {filterPeriod !== 'Todos' && (
            <button
              onClick={() => setFilterPeriod('Todos')}
              className="font-mono text-xs text-[#1e3a8a] hover:underline cursor-pointer flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-xs">clear_all</span>
              Ver Todos os Períodos
            </button>
          )}
        </div>

        {/* Horizontal Timeline Track */}
        <div className="flex gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
          {LITERARY_PERIODS_TIMELINE.map((item) => {
            const count =
              item.id === 'Todos'
                ? sortedPoets.length
                : sortedPoets.filter((p) =>
                    p.period.toLowerCase().includes(item.id.toLowerCase()) ||
                    (item.id === 'Trovadorismo' && (p.period.toLowerCase().includes('trovador') || p.period.toLowerCase().includes('galego') || p.period.toLowerCase().includes('cantiga'))) ||
                    (item.id === 'Modernismo' && (p.period.toLowerCase().includes('claridade') || p.period.toLowerCase().includes('neosimbolismo'))) ||
                    (item.id === 'Romantismo' && p.period.toLowerCase().includes('neorromantismo'))
                  ).length;

            const isSelected = filterPeriod === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setFilterPeriod(item.id)}
                className={`flex flex-col text-left p-3 min-w-[170px] cursor-pointer rounded-xs transition-all border ${
                  isSelected
                    ? 'bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-sm ring-2 ring-[#1e3a8a]/30 scale-[1.02]'
                    : 'bg-[#fdfaf6] text-[#2b2b2b] border-[#2b2b2b]/15 hover:border-[#1e3a8a] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={`font-mono text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-xs ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#1e3a8a]/10 text-[#1e3a8a]'
                    }`}
                  >
                    {item.century}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-amber-400 text-slate-900' : 'bg-[#2b2b2b]/10 text-[#2b2b2b]'
                    }`}
                  >
                    {count}
                  </span>
                </div>
                <strong className="font-cormorant text-lg leading-tight font-bold mb-0.5">
                  {item.name}
                </strong>
                <span className={`font-mono text-[10px] opacity-75 ${isSelected ? 'text-blue-100' : 'text-[#2b2b2b]/70'}`}>
                  {item.years}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Period Context Banner (Análise Literária do Período) */}
      {filterPeriod !== 'Todos' && activePeriodInfo && (
        <div className="mb-8 p-6 bg-[#faf2db] border-l-4 border-l-[#1e3a8a] border border-[#523816]/15 rounded-sm shadow-2xs animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="label mb-0">Contexto Histórico & Estético</span>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-[#1e3a8a]/10 text-[#1e3a8a] rounded-xs">
                  {activePeriodInfo.century} • {activePeriodInfo.years}
                </span>
              </div>
              <h3 className="font-cormorant text-3xl font-bold text-[#1f1a14]">
                {activePeriodInfo.name}
              </h3>
              <p className="font-serif text-sm text-[#1f1a14]/90 leading-relaxed">
                {activePeriodInfo.description}
              </p>

              {/* Key Features Pill Badges */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {activePeriodInfo.keyFeatures.map((feat, i) => (
                  <span
                    key={i}
                    className="font-mono text-[11px] bg-[#f4e9cd] text-[#1e3a8a] px-2.5 py-1 border border-[#1e3a8a]/20 rounded-xs font-medium flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a]"></span>
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Crayon/Flag Icons Preview for matching poets in period */}
            <div className="bg-[#f4e9cd] p-4 border border-[#523816]/15 rounded-xs shrink-0 flex flex-col items-center justify-center min-w-[180px]">
              <span className="font-mono text-[10px] text-[#1f1a14]/65 uppercase tracking-wider mb-2 font-semibold text-center">
                Flâmulas do {activePeriodInfo.name} ({filteredPoets.length})
              </span>
              <div className="flex -space-x-1.5 overflow-hidden p-1 justify-center">
                {filteredPoets.slice(0, 5).map((poet) => (
                  <CrayonPoetIcon
                    key={poet.id}
                    poetId={poet.id}
                    poetName={poet.name}
                    country={poet.country}
                    size="md"
                    className="border border-[#523816]/20 shadow-xs"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Quick Controls: Country & Alphabet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-[#faf2db] p-4 border border-[#523816]/15 rounded-sm shadow-2xs">
        <div>
          <label htmlFor="poet-quick-select" className="font-mono text-[10px] text-[#1e3a8a] uppercase block mb-1 font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">person_search</span>
            Seleção Direta por Autor (Ordem Alfabética):
          </label>
          <select
            id="poet-quick-select"
            value=""
            onChange={(e) => {
              const poet = POETS.find((p) => p.id === e.target.value);
              if (poet) setSelectedPoetModal(poet);
            }}
            className="w-full bg-white border border-[#1e3a8a]/30 text-[#2b2b2b] font-mono text-xs rounded-xs px-3 py-2 focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] shadow-2xs cursor-pointer"
          >
            <option value="">Selecione um Autor da Lista ({POETS.length} autores)...</option>
            {sortedPoets.map((poet) => (
              <option key={poet.id} value={poet.id}>
                {poet.name} ({poet.countryName} • {poet.period})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="country-filter-select" className="font-mono text-[10px] text-[#1e3a8a] uppercase block mb-1 font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">public</span>
            Filtrar por País / Origem:
          </label>
          <select
            id="country-filter-select"
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="w-full bg-white border border-[#1e3a8a]/30 text-[#2b2b2b] font-mono text-xs rounded-xs px-3 py-2 focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] shadow-2xs cursor-pointer"
          >
            <option value="TODOS">🌐 Todos os Países ({POETS.length} poetas)</option>
            {ALL_COUNTRIES.map((c) => {
              const count = POETS.filter((p) => p.country === c.code).length;
              return (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name} ({count} poetas)
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Alphabetical Index Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] text-[#2b2b2b]/60 uppercase tracking-wider font-semibold">
            Filtro de Letra Inicial (Nome do Autor):
          </span>
          {filterLetter !== 'TODOS' && (
            <button
              onClick={() => setFilterLetter('TODOS')}
              className="font-mono text-[10px] text-[#1e3a8a] hover:underline cursor-pointer"
            >
              Mostrar todas as iniciais ({sortedPoets.length})
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 p-2 bg-white border border-[#2b2b2b]/10 rounded-sm">
          {alphabetLetters.map((letter) => {
            const count =
              letter === 'TODOS'
                ? sortedPoets.length
                : sortedPoets.filter(
                    (p) =>
                      p.name
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .charAt(0)
                        .toUpperCase() === letter
                  ).length;

            return (
              <button
                key={letter}
                onClick={() => setFilterLetter(letter)}
                className={`px-2.5 py-1 font-mono text-xs cursor-pointer rounded-xs transition-all ${
                  filterLetter === letter
                    ? 'bg-[#1e3a8a] text-white font-bold shadow-xs scale-105'
                    : 'bg-[#fdfaf6] text-[#2b2b2b] border border-[#2b2b2b]/15 hover:border-[#1e3a8a] hover:text-[#1e3a8a]'
                }`}
              >
                {letter === 'TODOS' ? 'TODOS' : letter}{' '}
                <span className="text-[9px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filters Clear Banner */}
      {hasActiveFilters && (
        <div className="mb-6 flex items-center justify-between bg-amber-50 border border-amber-200 p-3 rounded-xs font-mono text-xs text-amber-900">
          <span>
            Exibindo <strong>{filteredPoets.length}</strong> de {POETS.length} autores filtrados por{' '}
            {filterPeriod !== 'Todos' && `Período: "${filterPeriod}" `}
            {filterCountry !== 'TODOS' && `País: "${filterCountry}" `}
            {filterLetter !== 'TODOS' && `Inicial: "${filterLetter}" `}
            {searchQuery && `Busca: "${searchQuery}"`}
          </span>
          <button
            onClick={resetAllFilters}
            className="px-3 py-1 bg-amber-800 text-white font-bold hover:bg-amber-900 rounded-xs transition-colors cursor-pointer flex items-center gap-1 shrink-0"
          >
            <span className="material-symbols-outlined text-xs">refresh</span>
            Limpar Filtros
          </button>
        </div>
      )}

      {/* VIEW MODE 1: CHRONOLOGICAL TIMELINE VIEW */}
      {viewMode === 'timeline' && (
        <div className="relative pl-4 sm:pl-8 border-l-2 border-[#1e3a8a]/30 space-y-8 my-6">
          {chronologicalPoets.length > 0 ? (
            chronologicalPoets.map((poet) => {
              const count = POEMS.filter((p) => p.poetId === poet.id).length;
              return (
                <div key={poet.id} className="relative group animate-fade-in">
                  {/* Timeline Axis Bullet Node */}
                  <div className="absolute -left-[27px] sm:-left-[43px] top-4 bg-[#faf2db] p-0.5 rounded-full border-2 border-[#1e3a8a] group-hover:scale-110 transition-transform shadow-sm">
                    <CrayonPoetIcon poetId={poet.id} poetName={poet.name} country={poet.country} size="md" />
                  </div>

                  {/* Poet Card Container */}
                  <div
                    onClick={() => setSelectedPoetModal(poet)}
                    className="bg-[#faf2db] border border-[#523816]/15 hover:border-[#1e3a8a] p-5 sm:p-6 cursor-pointer transition-all rounded-sm shadow-2xs hover:shadow-md group-hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[#1e3a8a] bg-blue-50 px-2.5 py-0.5 rounded-xs border border-blue-200">
                            🗓️ {poet.years}
                          </span>
                          <span className="font-mono text-xs text-[#1f1a14]/70 font-semibold bg-[#f4e9cd] px-2 py-0.5 rounded-xs border border-[#523816]/10">
                            📍 {poet.countryName}
                          </span>
                          <span className="font-mono text-xs font-semibold text-[#b45309] bg-amber-50 px-2 py-0.5 rounded-xs border border-amber-200">
                            🏛️ {poet.period}
                          </span>
                        </div>
                        <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors mt-1">
                          {poet.name}
                        </h3>
                      </div>

                      {/* Number of Poems Pill */}
                      <span className="font-mono text-xs text-[#1e3a8a] font-medium bg-[#1e3a8a]/5 border border-[#1e3a8a]/20 px-3 py-1 rounded-full shrink-0 self-start">
                        {count} {count === 1 ? 'poema' : 'poemas'}
                      </span>
                    </div>

                    <p className="font-serif text-sm text-[#1f1a14]/85 leading-relaxed mb-4">
                      {poet.bio}
                    </p>

                    {poet.famousQuote && (
                      <p className="font-serif italic text-sm text-[#1e3a8a] border-l-2 border-[#1e3a8a] pl-3 py-1 bg-[#1e3a8a]/5 mb-4 font-medium">
                        "{poet.famousQuote}"
                      </p>
                    )}

                    <div className="pt-3 border-t border-[#523816]/15 flex justify-between items-center font-mono text-xs">
                      <span className="text-[#1f1a14]/60 text-[11px] uppercase">
                        Ordem Cronológica • Nasc. ~{extractBirthYear(poet.years)}
                      </span>
                      <span className="text-[#1e3a8a] font-bold group-hover:underline flex items-center gap-1">
                        EXPLORAR OBRAS E BIOGRAFIA →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-[#faf2db] border border-[#523816]/15 rounded-sm">
              <p className="font-serif text-lg text-[#1f1a14]/70 italic mb-3">
                Nenhum poeta encontrado para os filtros selecionados.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 font-mono text-xs bg-[#1e3a8a] text-white font-bold rounded-xs hover:bg-[#1e3a8a]/90 transition-colors cursor-pointer"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: GRID OF CARDS VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoets.map((poet) => {
            const count = POEMS.filter((p) => p.poetId === poet.id).length;
            return (
              <div
                key={poet.id}
                onClick={() => setSelectedPoetModal(poet)}
                className="bg-[#faf2db] border border-[#523816]/15 hover:border-[#1e3a8a] p-6 cursor-pointer transition-all flex flex-col justify-between group rounded-sm shadow-2xs hover:shadow-sm"
              >
              <div>
                <div className="flex justify-between items-start gap-2 mb-4">
                  <span className="label mb-0">{poet.countryName}</span>
                  <CrayonPoetIcon poetId={poet.id} poetName={poet.name} country={poet.country} size="lg" />
                </div>

                <h3 className="font-cormorant text-2xl font-semibold text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors mb-1">
                  {poet.name}
                </h3>

                <p className="font-mono text-xs text-[#1e3a8a] mb-3 font-medium">
                  {poet.period} • {poet.years}
                </p>

                <p className="font-serif text-xs text-[#1f1a14]/80 line-clamp-3 leading-relaxed mb-4">
                  {poet.bio}
                </p>

                {poet.famousQuote && (
                  <p className="font-serif italic text-sm text-[#1f1a14]/90 border-l-2 border-[#1e3a8a] pl-3 py-1 bg-[#1e3a8a]/5 mb-4">
                    "{poet.famousQuote}"
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-[#523816]/15 flex justify-between items-center font-mono text-xs">
                <span className="text-[#1f1a14]/60 text-[11px] uppercase">
                  {count} poemas
                </span>
                <span className="text-[#1e3a8a] font-medium group-hover:underline flex items-center gap-1">
                  VER OBRAS →
                </span>
              </div>
            </div>
          );
        })}
      </div>
      )}
    </>
  )}

  {/* Poet Bio & Works Modal */}
      {selectedPoetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#faf2db] text-[#1f1a14] border border-[#523816]/30 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col rounded-sm">
            <div className="p-6 border-b border-[#523816]/15 flex items-center justify-between bg-[#f6ebd1]">
              <div className="flex items-center gap-4">
                <CrayonPoetIcon poetId={selectedPoetModal.id} poetName={selectedPoetModal.name} country={selectedPoetModal.country} size="xl" />
                <div>
                  <span className="label mb-0">Perfil Autoral • Flâmula Heráldica</span>
                  <h3 className="font-cormorant text-3xl font-semibold text-[#1f1a14]">
                    {selectedPoetModal.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedPoetModal(null)}
                className="p-2 border border-[#523816]/20 text-[#1f1a14] hover:bg-[#1f1a14] hover:text-white transition-colors cursor-pointer rounded-xs"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="p-5 bg-[#f4e9cd] border border-[#523816]/15 rounded-xs space-y-3 shadow-2xs">
                <span className="label">Análise Literária & Contexto Biográfico</span>
                
                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-3 font-mono text-xs bg-[#faf2db] p-3 rounded-xs border border-[#523816]/15">
                  <div>
                    <span className="opacity-60 block text-[10px] uppercase">Ano de Nascimento — Morte</span>
                    <span className="font-semibold text-[#1e3a8a]">
                      🗓️ {selectedPoetModal.years}
                    </span>
                  </div>
                  <div>
                    <span className="opacity-60 block text-[10px] uppercase">Localidade / Origem</span>
                    <span className="font-semibold text-[#1f1a14]">
                      📍 {selectedPoetModal.countryName}
                    </span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-[#523816]/15">
                    <span className="opacity-60 block text-[10px] uppercase">Movimento / Período Literário</span>
                    <span className="font-semibold text-[#1e3a8a]">
                      🏛️ {selectedPoetModal.period}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="label mb-1">Biografia & Trajetória</span>
                  <p className="font-serif text-sm text-[#1f1a14]/90 leading-relaxed bg-[#faf2db]/70 p-3.5 rounded-xs border border-[#523816]/15">
                    {selectedPoetModal.bio}
                  </p>
                </div>
              </div>

              {selectedPoetModal.famousQuote && (
                <div className="p-5 bg-[#1e3a8a]/5 text-[#2b2b2b] border border-[#1e3a8a]/20 rounded-xs shadow-2xs">
                  <span className="label text-[#1e3a8a]">Curiosidade & Citação Célebre</span>
                  <p className="font-serif italic text-xl text-[#1e3a8a] font-medium">
                    "{selectedPoetModal.famousQuote}"
                  </p>
                </div>
              )}

              <div>
                <span className="label">Poemas Registrados ({poetPoems.length})</span>

                {poetPoems.length > 0 ? (
                  <div className="space-y-3 mt-3">
                    {poetPoems.map((poem) => (
                      <div
                        key={poem.id}
                        onClick={() => {
                          onSelectPoem(poem);
                          setSelectedPoetModal(null);
                        }}
                        className="p-4 bg-white border border-[#2b2b2b]/10 hover:border-[#1e3a8a] cursor-pointer transition-colors flex justify-between items-center group rounded-xs"
                      >
                        <div>
                          <h5 className="font-cormorant text-xl font-semibold text-[#2b2b2b] group-hover:text-[#1e3a8a] transition-colors">
                            {poem.title}
                          </h5>
                          <p className="font-serif italic text-xs text-[#2b2b2b]/80 mt-1 line-clamp-1">
                            "{poem.stanzas[0]}"
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-sm text-[#2b2b2b]/60 group-hover:text-[#1e3a8a]">
                          arrow_forward
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-mono text-xs text-[#2b2b2b]/60 italic py-2">
                    Novos poemas deste autor serão catalogados em breve.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


