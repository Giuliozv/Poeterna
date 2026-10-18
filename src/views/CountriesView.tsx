import React, { useState, useEffect } from 'react';
import { CountryCode, Poem, Poet } from '../types';
import { LUSOPHONE_COUNTRIES, WORLD_COUNTRIES, POEMS, POETS } from '../data/lusophoneData';
import { CrayonPoetIcon } from '../components/CrayonPoetIcon';

interface CountriesViewProps {
  onSelectPoem: (poem: Poem) => void;
  onSelectPoet: (poet: Poet) => void;
  initialCategory?: 'lusofona' | 'mundial';
}

export const CountriesView: React.FC<CountriesViewProps> = ({
  onSelectPoem,
  onSelectPoet,
  initialCategory = 'lusofona'
}) => {
  const [category, setCategory] = useState<'lusofona' | 'mundial'>(initialCategory);
  
  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const currentCountryList = category === 'lusofona' ? LUSOPHONE_COUNTRIES : WORLD_COUNTRIES;

  const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode>(() => {
    return initialCategory === 'mundial' ? 'IR' : 'PT';
  });

  // Keep selected country in sync when category changes
  const handleCategoryChange = (newCategory: 'lusofona' | 'mundial') => {
    setCategory(newCategory);
    if (newCategory === 'lusofona') {
      setSelectedCountryCode('PT');
    } else {
      setSelectedCountryCode('IR');
    }
  };

  const selectedCountry =
    currentCountryList.find((c) => c.code === selectedCountryCode) || currentCountryList[0];

  const countryPoets = POETS.filter((p) => p.country === selectedCountry.code);
  const countryPoems = POEMS.filter((p) => p.country === selectedCountry.code);

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-6xl mx-auto text-[#1f1a14] animate-fade-in">
      {/* Category Toggle Banner */}
      <div className="mb-8 bg-[#faf2db] border border-[#523816]/15 p-3 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#1e3a8a] text-xl">public</span>
          <div>
            <h3 className="font-cormorant text-xl font-semibold leading-tight text-[#1f1a14]">
              Classificação Geográfica e Tradições
            </h3>
            <p className="font-mono text-[10px] text-[#1f1a14]/65 uppercase tracking-wider">
              Selecione entre o espaço CPLP/Lusófono e as Grandes Líricas Mundiais
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-[#f4e9cd] p-1 border border-[#523816]/15 rounded-xs w-full sm:w-auto">
          <button
            onClick={() => handleCategoryChange('lusofona')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 font-mono text-xs cursor-pointer transition-all rounded-xs ${
              category === 'lusofona'
                ? 'bg-[#1e3a8a] text-white font-medium shadow-xs'
                : 'text-[#1f1a14]/75 hover:text-[#1f1a14] hover:bg-black/5'
            }`}
          >
            <span className="text-sm">🇦🇴 🇵🇹 🇧🇷</span>
            <span>Territórios Lusófonos</span>
            <span className="text-[10px] opacity-75 font-mono">({LUSOPHONE_COUNTRIES.length})</span>
          </button>

          <button
            onClick={() => handleCategoryChange('mundial')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 font-mono text-xs cursor-pointer transition-all rounded-xs ${
              category === 'mundial'
                ? 'bg-[#1e3a8a] text-white font-medium shadow-xs'
                : 'text-[#1f1a14]/75 hover:text-[#1f1a14] hover:bg-black/5'
            }`}
          >
            <span className="text-sm">🌍 🇮🇷 🇫🇷</span>
            <span>Literatura Mundial</span>
            <span className="text-[10px] opacity-75 font-mono">({WORLD_COUNTRIES.length})</span>
          </button>
        </div>
      </div>

      {/* Editorial Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Territory Sidebar */}
        <aside className="lg:col-span-4 bg-[#faf2db] border border-[#523816]/15 p-5 sticky top-24 rounded-sm shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#523816]/15 mb-3">
            <span className="label !mb-0">
              {category === 'lusofona' ? 'Territórios Lusófonos' : 'Literatura Mundial'}
            </span>
            <span className="font-mono text-[10px] text-[#1e3a8a] font-semibold uppercase">
              {currentCountryList.length} Regiões
            </span>
          </div>

          {/* Guia de Seleção Suspensa para Países */}
          <div className="mb-4">
            <label htmlFor="country-select" className="font-mono text-[10px] text-[#1e3a8a] uppercase block mb-1.5 font-semibold">
              Guia de Seleção Suspensa:
            </label>
            <select
              id="country-select"
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value as any)}
              className="w-full bg-[#f4e9cd] border border-[#523816]/25 text-[#1f1a14] font-mono text-xs rounded-xs px-3 py-2.5 focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] shadow-2xs cursor-pointer"
            >
              {currentCountryList.map((c) => {
                const poetsInCountry = POETS.filter((p) => p.country === c.code).length;
                return (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} ({poetsInCountry} poetas)
                  </option>
                );
              })}
            </select>
          </div>

          {/* Territory Buttons */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar max-h-[70vh] lg:overflow-y-auto">
            {currentCountryList.map((c) => {
              const isActive = selectedCountry.code === c.code;
              const poetsInCountry = POETS.filter((p) => p.country === c.code).length;
              const poemsInCountry = POEMS.filter((p) => p.country === c.code).length;

              return (
                <button
                  key={c.code}
                  onClick={() => setSelectedCountryCode(c.code)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 border text-left font-mono text-xs transition-all cursor-pointer rounded-xs group ${
                    isActive
                      ? 'bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-xs'
                      : 'bg-[#faf2db] text-[#1f1a14] border-[#523816]/15 hover:border-[#1e3a8a] hover:bg-[#1e3a8a]/5'
                  }`}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{c.flag}</span>
                  <div className="flex-1 min-w-0">
                    <span className="block font-medium truncate tracking-wide">{c.name}</span>
                    <span
                      className={`text-[10px] block truncate ${
                        isActive ? 'text-white/70' : 'text-[#1f1a14]/60'
                      }`}
                    >
                      {c.capital}
                    </span>
                  </div>
                  <div className="text-right font-mono text-[10px]">
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#1e3a8a]/10 text-[#1e3a8a] group-hover:bg-[#1e3a8a] group-hover:text-white'
                      }`}
                    >
                      {poetsInCountry}P • {poemsInCountry}V
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Main Scroll Content Area */}
        <main className="lg:col-span-8 bg-[#faf2db] border border-[#523816]/15 p-6 sm:p-10 rounded-sm shadow-xs">
          {/* Hero Section */}
          <div className="border-b border-[#523816]/15 pb-8 mb-8">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-5xl">{selectedCountry.flag}</span>
              <div>
                <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-[#1f1a14] leading-none">
                  {selectedCountry.name}
                </h2>
                <span className="font-mono text-xs text-[#1e3a8a] uppercase tracking-widest block mt-2 font-medium">
                  {category === 'lusofona' ? 'Espaço de Língua Portuguesa' : 'Património Lírico Mundial'} • Capital: {selectedCountry.capital}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 border-t border-[#523816]/15 mt-4">
              <div className="md:col-span-8">
                <span className="label">Contexto e Tradição Literária</span>
                <p className="font-serif text-base text-[#1f1a14]/90 leading-relaxed italic bg-[#f4e9cd] p-4 border-l-2 border-[#1e3a8a] rounded-r-xs">
                  "{selectedCountry.description}"
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col justify-center bg-[#1e3a8a]/5 p-4 border border-[#1e3a8a]/15 rounded-xs">
                <span className="label !text-[#1e3a8a]">Catálogo da Região</span>
                <p className="font-cormorant text-3xl text-[#1f1a14] font-semibold">
                  {countryPoets.length} <span className="text-base font-normal text-[#1f1a14]/70">Poetas</span>
                </p>
                <p className="font-cormorant text-2xl text-[#1e3a8a] font-semibold mt-1">
                  {countryPoems.length} <span className="text-sm font-normal text-[#1f1a14]/70">Obras/Poemas</span>
                </p>
              </div>
            </div>
          </div>

          {/* Poets Grid */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="label !mb-0">Poetas Catalogados ({countryPoets.length})</span>
              <span className="font-mono text-[11px] text-[#1e3a8a]">Clique para explorar</span>
            </div>

            {countryPoets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {countryPoets.map((poet) => (
                  <div
                    key={poet.id}
                    onClick={() => onSelectPoet(poet)}
                    className="bg-[#f4e9cd] border border-[#523816]/15 hover:border-[#1e3a8a] p-4 cursor-pointer transition-all flex justify-between items-center group rounded-xs shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <CrayonPoetIcon poetId={poet.id} poetName={poet.name} country={poet.country} size="md" />
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] text-[#1e3a8a] block uppercase truncate font-medium">
                          {poet.period} • {poet.years}
                        </span>
                        <h4 className="font-cormorant text-xl font-semibold text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors truncate">
                          {poet.name}
                        </h4>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-base text-[#1f1a14]/40 group-hover:text-[#1e3a8a] group-hover:translate-x-1 transition-all shrink-0">
                      arrow_forward
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-mono text-xs text-[#1f1a14]/65 italic py-6 text-center bg-[#f4e9cd] border border-dashed border-[#523816]/20 rounded-xs">
                Novos poetas de {selectedCountry.name} estão em processo de catalogação.
              </p>
            )}
          </div>

          {/* Featured Poems */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="label !mb-0">Obras e Poemas em Destaque ({countryPoems.length})</span>
              <span className="font-mono text-[11px] text-[#1e3a8a]">Clique para leitura completa</span>
            </div>

            {countryPoems.length > 0 ? (
              <div className="space-y-4 mt-3">
                {countryPoems.map((poem) => (
                  <div
                    key={poem.id}
                    onClick={() => onSelectPoem(poem)}
                    className="bg-[#f4e9cd] border border-[#523816]/15 hover:border-[#1e3a8a] p-5 sm:p-6 cursor-pointer transition-all grid grid-cols-1 md:grid-cols-12 gap-4 items-start group rounded-xs shadow-2xs hover:shadow-xs"
                  >
                    <div className="md:col-span-5 font-mono text-xs">
                      <p className="font-cormorant text-2xl font-semibold text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors">
                        {poem.title}
                      </p>
                      <p className="text-[#1e3a8a] font-mono text-xs mt-1.5 font-medium flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">edit</span>
                        {poem.poetName}
                      </p>
                      {poem.year && (
                        <p className="text-[#1f1a14]/60 text-[11px] mt-0.5">Ano / Época: {poem.year}</p>
                      )}
                    </div>

                    <div className="md:col-span-7 border-t md:border-t-0 md:border-l border-[#523816]/15 pt-3 md:pt-0 md:pl-5">
                      <p className="font-serif italic text-base text-[#1f1a14]/90 leading-relaxed line-clamp-3">
                        "{poem.stanzas[0]}"
                      </p>
                      {poem.analysis && (
                        <p className="font-mono text-[11px] text-[#1e3a8a] mt-2 block line-clamp-1">
                          ❖ {poem.analysis}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-mono text-xs text-[#1f1a14]/65 italic py-6 text-center bg-[#f4e9cd] border border-dashed border-[#523816]/20 rounded-xs">
                Em breve novos poemas desta tradição serão integrados ao acervo.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};



