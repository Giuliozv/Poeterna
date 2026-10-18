import React from 'react';
import { Poem } from '../types';
import { POEMS } from '../data/lusophoneData';
import { CrayonPoetIcon } from '../components/CrayonPoetIcon';

interface FavoritesViewProps {
  favoriteIds: string[];
  customPoems: Poem[];
  onSelectPoem: (poem: Poem) => void;
  onToggleFavorite: (poemId: string) => void;
  onOpenCreateModal: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteIds,
  customPoems,
  onSelectPoem,
  onToggleFavorite,
  onOpenCreateModal
}) => {
  const savedPoems = POEMS.filter((p) => favoriteIds.includes(p.id));
  const allUserSaved = [...customPoems, ...savedPoems];

  return (
    <div className="p-6 sm:p-12 max-w-6xl mx-auto text-[#1f1a14] animate-fade-in">
      {/* Title Header */}
      <div className="border-b border-[#523816]/15 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="label">Caderno Pessoal de Poesia</span>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-[#1f1a14]">
            Favoritos & Criações ({allUserSaved.length})
          </h2>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="btn flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm">edit_note</span>
          <span>Escrever Verso</span>
        </button>
      </div>

      {/* List of Favorites */}
      {allUserSaved.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allUserSaved.map((poem) => {
            const isCustom = poem.id.startsWith('custom-');
            return (
              <div
                key={poem.id}
                onClick={() => onSelectPoem(poem)}
                className="bg-[#faf2db] border border-[#523816]/15 hover:border-[#1e3a8a] p-6 cursor-pointer transition-all flex flex-col justify-between group rounded-sm shadow-2xs hover:shadow-xs"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-cormorant font-semibold text-2xl text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors">
                      {poem.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {isCustom && (
                        <span className="label bg-[#1e3a8a] text-white border-0 px-2 py-0.5 rounded-xs">
                          Autoria Pessoal
                        </span>
                      )}
                      {!isCustom && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(poem.id);
                          }}
                          className="text-[#1e3a8a] p-1 hover:scale-110 transition-transform cursor-pointer"
                          title="Remover dos favoritos"
                        >
                          <span className="material-symbols-outlined text-lg">
                            favorite
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <CrayonPoetIcon poetId={poem.poetId} poetName={poem.poetName} size="xs" />
                    <p className="font-mono text-xs text-[#1e3a8a] font-medium">
                      {poem.poetName} {poem.year ? `• ${poem.year}` : ''}
                    </p>
                  </div>

                  <p className="font-serif italic text-sm text-[#1f1a14]/85 line-clamp-3">
                    "{poem.stanzas[0]}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#523816]/15 flex justify-between items-center font-mono text-xs">
                  <span className="text-[#1f1a14]/50 text-[10px] uppercase">
                    {poem.countryName || 'CADERNO'}
                  </span>
                  <span className="text-[#1e3a8a] font-medium group-hover:underline">
                    Abrir Poema →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#faf2db] border border-[#523816]/15 p-8 rounded-sm shadow-2xs">
          <span className="material-symbols-outlined text-4xl text-[#1e3a8a] mb-3">
            auto_stories
          </span>
          <h3 className="font-cormorant text-3xl font-light text-[#1f1a14] mb-2">
            O seu caderno está vazio
          </h3>
          <p className="font-serif text-sm text-[#1f1a14]/60 max-w-md mx-auto mb-6">
            Explore as antologias e territórios para guardar poemas de que goste, ou escreva os seus próprios versos no caderno.
          </p>
          <button
            onClick={onOpenCreateModal}
            className="btn"
          >
            Escrever o Seu Primeiro Poema
          </button>
        </div>
      )}
    </div>
  );
};


