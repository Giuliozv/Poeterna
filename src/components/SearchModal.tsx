import React, { useState } from 'react';
import { Poem, Poet } from '../types';
import { POEMS, POETS } from '../data/lusophoneData';
import { CrayonPoetIcon } from './CrayonPoetIcon';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPoem: (poem: Poem) => void;
  onSelectPoet: (poet: Poet) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPoem,
  onSelectPoet
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredPoems = POEMS.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.poetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.stanzas.some((line) => line.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredPoets = POETS.filter(
    (poet) =>
      poet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poet.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poet.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#faf2db] text-[#1f1a14] border border-[#523816]/30 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col rounded-sm">
        {/* Search Input Bar */}
        <div className="p-4 bg-[#f6ebd1] border-b border-[#523816]/15 flex items-center gap-3">
          <span className="material-symbols-outlined text-[#1e3a8a]">search</span>
          <input
            type="text"
            placeholder="Pesquisar por poema, autor (ex: Pessoa), país ou verso..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none text-[#1f1a14] placeholder-[#1f1a14]/40 focus:outline-none font-mono text-sm"
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#1f1a14]/60 hover:text-[#1e3a8a] p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="btn-outline"
          >
            Fechar
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        {!searchTerm && (
          <div className="p-5 border-b border-[#523816]/15 bg-[#faf2db]">
            <span className="label mb-3 block">
              Pesquisas Recomendadas
            </span>
            <div className="flex flex-wrap gap-2">
              {['Fernando Pessoa', 'Vladimir Maiakovski', 'Baudelaire', 'García Lorca', 'Pablo Neruda', 'Rumi', 'Kaváfis', 'Drummond', 'Camões', 'Walt Whitman'].map(
                (chip) => (
                  <button
                    key={chip}
                    onClick={() => setSearchTerm(chip)}
                    className="font-mono text-xs px-3 py-1 bg-[#f4e9cd] border border-[#523816]/20 text-[#1f1a14] hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-colors cursor-pointer rounded-xs"
                  >
                    {chip}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#faf2db]">
          {/* Poets */}
          {filteredPoets.length > 0 && (
            <div>
              <span className="label mb-3 block">
                Poetas Encontrados ({filteredPoets.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredPoets.map((poet) => (
                  <div
                    key={poet.id}
                    onClick={() => {
                      onSelectPoet(poet);
                      onClose();
                    }}
                    className="p-3 bg-[#f4e9cd] border border-[#523816]/15 hover:border-[#1e3a8a] cursor-pointer transition-colors flex items-center justify-between group rounded-xs gap-3 shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <CrayonPoetIcon poetId={poet.id} poetName={poet.name} size="sm" />
                      <div>
                        <h4 className="font-cormorant font-semibold text-xl text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors">
                          {poet.name}
                        </h4>
                        <p className="font-mono text-[10px] text-[#1e3a8a]">
                          {poet.countryName} • {poet.period}
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-sm text-[#1f1a14]/60 group-hover:text-[#1e3a8a]">
                      arrow_forward
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Poems */}
          {filteredPoems.length > 0 && (
            <div>
              <span className="label mb-3 block">
                Poemas Encontrados ({filteredPoems.length})
              </span>
              <div className="space-y-3">
                {filteredPoems.map((poem) => (
                  <div
                    key={poem.id}
                    onClick={() => {
                      onSelectPoem(poem);
                      onClose();
                    }}
                    className="p-4 bg-[#f4e9cd] border border-[#523816]/15 hover:border-[#1e3a8a] cursor-pointer transition-colors flex flex-col justify-between group rounded-xs shadow-2xs"
                  >
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h4 className="font-cormorant font-semibold text-2xl text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors">
                        {poem.title}
                      </h4>
                      <span className="label mb-0 shrink-0">
                        {poem.countryName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <CrayonPoetIcon poetId={poem.poetId} poetName={poem.poetName} size="xs" />
                      <p className="font-mono text-xs text-[#1e3a8a] font-medium">{poem.poetName}</p>
                    </div>
                    <p className="font-serif italic text-sm text-[#1f1a14]/80 line-clamp-2">
                      "{poem.stanzas[0]}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredPoems.length === 0 && filteredPoets.length === 0 && (
            <div className="text-center py-10 text-[#1f1a14]/60">
              <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
                search_off
              </span>
              <p className="font-mono text-xs uppercase tracking-wider">
                Nenhum resultado encontrado para "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

};

