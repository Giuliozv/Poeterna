import React, { useState, useMemo } from 'react';
import { Poem, Poet } from '../types';
import { POEMS, POETS, POETRY_QUOTES } from '../data/lusophoneData';
import { CrayonPoetIcon } from './CrayonPoetIcon';

interface DailyLiterarySpotlightProps {
  onSelectPoem: (poem: Poem) => void;
  onSelectPoet: (poet: Poet) => void;
  favorites: string[];
  onToggleFavorite: (poemId: string) => void;
}

// Deterministic daily index calculator
function getDailyIndex(length: number, salt = 0): number {
  if (length <= 0) return 0;
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const seed = (now.getFullYear() * 366 + dayOfYear + salt) * 17;
  return Math.abs(seed) % length;
}

// Format Portuguese date e.g. "15 de agosto de 2026"
function getFormattedDate(): string {
  const now = new Date();
  return now.toLocaleDateString('pt-PT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export const DailyLiterarySpotlight: React.FC<DailyLiterarySpotlightProps> = ({
  onSelectPoem,
  onSelectPoet,
  favorites,
  onToggleFavorite,
}) => {
  const [activeMode, setActiveMode] = useState<'poema' | 'citacao'>('poema');
  const [copied, setCopied] = useState(false);

  // Daily deterministic indices
  const dailyPoemIndex = useMemo(() => getDailyIndex(POEMS.length, 42), []);
  const dailyQuoteIndex = useMemo(() => getDailyIndex(POETRY_QUOTES.length, 99), []);

  // State to allow user to randomize or return to today's pick
  const [currentPoemIndex, setCurrentPoemIndex] = useState<number>(dailyPoemIndex);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(dailyQuoteIndex);

  const isTodayPoem = currentPoemIndex === dailyPoemIndex;
  const isTodayQuote = currentQuoteIndex === dailyQuoteIndex;

  const currentPoem = POEMS[currentPoemIndex % POEMS.length];
  const currentQuote = POETRY_QUOTES[currentQuoteIndex % POETRY_QUOTES.length];
  const poetOfPoem = POETS.find((p) => p.id === currentPoem.poetId);

  const isFav = favorites.includes(currentPoem.id);
  const formattedToday = useMemo(() => getFormattedDate(), []);

  // Handlers
  const handleRandomPoem = () => {
    let nextIdx = Math.floor(Math.random() * POEMS.length);
    if (nextIdx === currentPoemIndex && POEMS.length > 1) {
      nextIdx = (nextIdx + 1) % POEMS.length;
    }
    setCurrentPoemIndex(nextIdx);
  };

  const handleResetDailyPoem = () => {
    setCurrentPoemIndex(dailyPoemIndex);
  };

  const handleRandomQuote = () => {
    let nextIdx = Math.floor(Math.random() * POETRY_QUOTES.length);
    if (nextIdx === currentQuoteIndex && POETRY_QUOTES.length > 1) {
      nextIdx = (nextIdx + 1) % POETRY_QUOTES.length;
    }
    setCurrentQuoteIndex(nextIdx);
  };

  const handleResetDailyQuote = () => {
    setCurrentQuoteIndex(dailyQuoteIndex);
  };

  const handleCopyQuote = () => {
    const textToCopy = `"${currentQuote.quote}"\n— ${currentQuote.author}\n(Via Lira Lusófona)`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="mb-16 border border-[#523816]/15 bg-[#faf2db] p-6 sm:p-10 rounded-sm shadow-xs relative overflow-hidden transition-all">
      {/* Top Banner / Tab Navigation & Date Badge */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#523816]/15 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">
              {activeMode === 'poema' ? 'calendar_today' : 'format_quote'}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-[#1e3a8a] bg-[#1e3a8a]/8 px-2 py-0.5 rounded-full">
                {isTodayPoem && activeMode === 'poema' ? 'Edição Diária' : isTodayQuote && activeMode === 'citacao' ? 'Citação Diária' : 'Sorteio Aleatório'}
              </span>
              <span className="font-mono text-xs text-[#1f1a14]/65 capitalize">
                {formattedToday}
              </span>
            </div>
            <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#1f1a14] tracking-tight">
              {activeMode === 'poema' ? 'Poema do Dia' : 'Citação Literária'}
            </h2>
          </div>
        </div>

        {/* Mode Switcher Pills */}
        <div className="flex items-center gap-1 bg-[#1f1a14]/5 p-1 rounded-xs border border-[#523816]/15 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveMode('poema')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 font-mono text-xs rounded-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
              activeMode === 'poema'
                ? 'bg-[#1f1a14] text-[#faf2db] font-semibold shadow-2xs'
                : 'text-[#1f1a14]/70 hover:text-[#1f1a14]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">auto_stories</span>
            <span>Poema do Dia</span>
          </button>
          <button
            onClick={() => setActiveMode('citacao')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 font-mono text-xs rounded-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
              activeMode === 'citacao'
                ? 'bg-[#1f1a14] text-[#faf2db] font-semibold shadow-2xs'
                : 'text-[#1f1a14]/70 hover:text-[#1f1a14]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">format_quote</span>
            <span>Citação Aleatória</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Poema do Dia */}
      {activeMode === 'poema' && (
        <div className="animate-fade-in flex flex-col justify-between">
          <div>
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="label mb-0">{currentPoem.countryName}</span>
                <span className="text-[#2b2b2b]/30">•</span>
                <span className="font-mono text-xs text-[#2b2b2b]/70">{currentPoem.era}</span>
                {currentPoem.copyrightStatus && (
                  <>
                    <span className="text-[#2b2b2b]/30">•</span>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        currentPoem.copyrightStatus === 'Domínio Público'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}
                    >
                      {currentPoem.copyrightStatus}
                    </span>
                  </>
                )}
              </div>

              {/* Rotate/Randomize Controls */}
              <div className="flex items-center gap-2 font-mono text-xs">
                {!isTodayPoem && (
                  <button
                    onClick={handleResetDailyPoem}
                    className="text-[#1e3a8a] hover:underline flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 border border-[#1e3a8a]/20 rounded-xs"
                    title="Voltar ao poema de hoje"
                  >
                    <span className="material-symbols-outlined text-sm">today</span>
                    <span>Hoje</span>
                  </button>
                )}
                <button
                  onClick={handleRandomPoem}
                  className="text-[#2b2b2b]/80 hover:text-[#1e3a8a] flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1 border border-[#2b2b2b]/20 hover:border-[#1e3a8a] rounded-xs transition-colors"
                  title="Sortear outro poema do acervo"
                >
                  <span className="material-symbols-outlined text-sm">shuffle</span>
                  <span>Sortear Outro</span>
                </button>
              </div>
            </div>

            {/* Poem Title */}
            <h3
              onClick={() => onSelectPoem(currentPoem)}
              className="font-cormorant text-3xl sm:text-5xl font-normal leading-tight tracking-tight text-[#1f1a14] hover:text-[#1e3a8a] cursor-pointer transition-colors mb-4"
            >
              {currentPoem.title}
            </h3>

            {/* Poem Snippet / Stanzas */}
            <div
              onClick={() => onSelectPoem(currentPoem)}
              className="font-serif text-lg sm:text-2xl italic text-[#1e3a8a] my-6 p-6 sm:p-8 bg-[#f6ebd1] border-l-4 border-[#1e3a8a] border border-[#523816]/15 rounded-r-xs shadow-2xs cursor-pointer hover:bg-[#faeed7] transition-colors leading-relaxed"
            >
              "{currentPoem.stanzas[0]}"
              {currentPoem.stanzas[1] && (
                <p className="mt-4 text-base sm:text-lg text-[#1f1a14]/85 not-italic font-normal">
                  {currentPoem.stanzas[1]}
                </p>
              )}
            </div>
          </div>

          {/* Footer Info: Poet details & Actions */}
          <div className="pt-6 border-t border-[#523816]/15 flex flex-wrap justify-between items-center gap-4">
            <div
              onClick={() => poetOfPoem && onSelectPoet(poetOfPoem)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <CrayonPoetIcon poetId={currentPoem.poetId} poetName={currentPoem.poetName} size="md" />
              <div>
                <strong className="font-cormorant text-2xl font-semibold text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors block">
                  {currentPoem.poetName}
                </strong>
                <span className="font-mono text-xs text-[#1f1a14]/65">
                  {currentPoem.location ? `${currentPoem.location}, ` : ''}{currentPoem.year || 'Acervo'}
                  {poetOfPoem ? ` • ${poetOfPoem.years}` : ''}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleFavorite(currentPoem.id)}
                className={`px-3.5 py-2 font-mono text-xs rounded-xs border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isFav
                    ? 'border-[#1e3a8a] text-[#1e3a8a] bg-[#1e3a8a]/5 font-semibold'
                    : 'border-[#523816]/25 bg-[#faf2db] text-[#1f1a14] hover:border-[#1e3a8a]'
                }`}
                title={isFav ? 'Remover dos favoritos' : 'Guardar nos favoritos'}
              >
                <span className="material-symbols-outlined text-base">
                  {isFav ? 'favorite' : 'favorite_border'}
                </span>
                <span className="hidden sm:inline">{isFav ? 'Guardado' : 'Guardar'}</span>
              </button>

              <button
                onClick={() => onSelectPoem(currentPoem)}
                className="btn py-2 px-5 text-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">auto_stories</span>
                <span>Ler Poema Integral</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Citação Literária */}
      {activeMode === 'citacao' && (
        <div className="animate-fade-in py-2">
          {/* Controls */}
          <div className="flex justify-between items-center mb-6">
            <span className="label mb-0">Sabedoria & Sentimento</span>
            <div className="flex items-center gap-2 font-mono text-xs">
              {!isTodayQuote && (
                <button
                  onClick={handleResetDailyQuote}
                  className="text-[#1e3a8a] hover:underline flex items-center gap-1 cursor-pointer bg-[#faf2db] px-2.5 py-1 border border-[#1e3a8a]/20 rounded-xs"
                  title="Voltar à citação de hoje"
                >
                  <span className="material-symbols-outlined text-sm">today</span>
                  <span>Citação de Hoje</span>
                </button>
              )}
              <button
                onClick={handleRandomQuote}
                className="text-[#1f1a14]/85 hover:text-[#1e3a8a] flex items-center gap-1.5 cursor-pointer bg-[#faf2db] px-3 py-1 border border-[#523816]/20 hover:border-[#1e3a8a] rounded-xs transition-colors"
                title="Sortear nova citação literária"
              >
                <span className="material-symbols-outlined text-sm">casino</span>
                <span>Sortear Nova Citação</span>
              </button>
            </div>
          </div>

          {/* Quote Display Box */}
          <div className="bg-[#f6ebd1] p-8 sm:p-12 border border-[#523816]/20 rounded-sm shadow-2xs relative">
            <span className="material-symbols-outlined text-5xl text-[#1e3a8a]/20 absolute top-4 left-4 select-none">
              format_quote
            </span>
            <div className="relative z-10">
              <p className="font-serif text-2xl sm:text-4xl italic text-[#1f1a14] leading-snug mb-6">
                "{currentQuote.quote}"
              </p>
              <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-[#523816]/15">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#1e3a8a] font-semibold">
                    — {currentQuote.author}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyQuote}
                    className="px-3.5 py-1.5 bg-[#faf2db] hover:bg-white text-xs font-mono rounded-xs border border-[#523816]/25 flex items-center gap-1.5 cursor-pointer transition-colors text-[#1f1a14]"
                    title="Copiar citação para a área de transferência"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    <span>{copied ? 'Copiado!' : 'Copiar Citação'}</span>
                  </button>

                  <button
                    onClick={handleRandomQuote}
                    className="btn py-1.5 px-3.5 text-xs flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">autorenew</span>
                    <span>Outra Citação</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
