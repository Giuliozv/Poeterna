import React, { useState } from 'react';
import { Anthology, Poem } from '../types';
import { ANTHOLOGIES, POEMS } from '../data/lusophoneData';
import { CrayonPoetIcon } from '../components/CrayonPoetIcon';

interface AnthologiesViewProps {
  onSelectPoem: (poem: Poem) => void;
}

export const AnthologiesView: React.FC<AnthologiesViewProps> = ({ onSelectPoem }) => {
  const [activeAnthology, setActiveAnthology] = useState<Anthology>(ANTHOLOGIES[0]);

  const anthologyPoems = POEMS.filter((p) => activeAnthology.poemIds.includes(p.id));

  return (
    <div className="p-6 sm:p-12 max-w-6xl mx-auto text-[#1f1a14] animate-fade-in">
      {/* Title */}
      <div className="border-b border-[#523816]/15 pb-6 mb-8">
        <span className="label">Antologia & Coleções Temáticas</span>
        <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-[#1f1a14]">
          Coleções Temáticas
        </h2>
      </div>

      {/* Anthology Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {ANTHOLOGIES.map((ant) => {
          const isActive = activeAnthology.id === ant.id;
          return (
            <div
              key={ant.id}
              onClick={() => setActiveAnthology(ant)}
              className={`p-5 border cursor-pointer transition-all flex flex-col justify-between rounded-sm ${
                isActive
                  ? 'bg-[#1f1a14] text-[#faf2db] border-[#1f1a14] shadow-xs'
                  : 'bg-[#faf2db] text-[#1f1a14] border-[#523816]/15 hover:border-[#1e3a8a] shadow-2xs'
              }`}
            >
              <div>
                <span
                  className="material-symbols-outlined text-2xl mb-3 block"
                  style={{ color: isActive ? '#faf2db' : '#1e3a8a' }}
                >
                  {ant.iconName}
                </span>
                <h3 className="font-cormorant font-semibold text-2xl mb-1">{ant.title}</h3>
                <p className={`font-mono text-xs ${isActive ? 'text-[#faf2db]/80' : 'text-[#1f1a14]/65'}`}>
                  {ant.subtitle}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-current/10 font-mono text-[10px] uppercase tracking-wider flex justify-between items-center">
                <span>{ant.poemIds.length} POEMAS</span>
                <span>{isActive ? '✓ ATIVA' : 'VER →'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Anthology Content Display */}
      <div className="bg-[#faf2db] border border-[#523816]/15 p-6 sm:p-10 rounded-sm shadow-xs">
        <div className="border-b border-[#523816]/15 pb-6 mb-8">
          <span className="label mb-2 block">
            Exposição Temática Ativa
          </span>

          <h3 className="font-cormorant text-3xl sm:text-4xl font-light text-[#1f1a14] mb-3">
            {activeAnthology.title}
          </h3>

          <p className="font-serif text-sm text-[#1f1a14]/80 leading-relaxed italic max-w-3xl">
            "{activeAnthology.description}"
          </p>
        </div>

        <span className="label mb-4 block">
          Poemas Catalogados na Antologia ({anthologyPoems.length})
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {anthologyPoems.map((poem) => (
            <div
              key={poem.id}
              onClick={() => onSelectPoem(poem)}
              className="bg-[#f4e9cd] border border-[#523816]/15 hover:border-[#1e3a8a] p-5 cursor-pointer transition-all flex flex-col justify-between group rounded-xs shadow-2xs hover:shadow-xs"
            >
              <div>
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h5 className="font-cormorant text-2xl font-semibold text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors">
                    {poem.title}
                  </h5>
                  <span className="label mb-0 shrink-0">
                    {poem.countryName}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <CrayonPoetIcon poetId={poem.poetId} poetName={poem.poetName} size="xs" />
                  <p className="font-mono text-xs text-[#1e3a8a] font-medium">{poem.poetName}</p>
                </div>
                <p className="font-serif italic text-sm text-[#1f1a14]/85 line-clamp-3">
                  "{poem.stanzas[0]}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#523816]/15 flex justify-between items-center font-mono text-xs">
                <span className="text-[#1f1a14]/50 text-[10px] uppercase">{poem.year || 'S/D'}</span>
                <span className="text-[#1e3a8a] font-medium group-hover:underline">
                  LER COMPLETO →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

