import React, { useState, useEffect } from 'react';
import { Poem, PoemMoodAnalysis, PoemHistoricalContext } from '../types';
import { POETS } from '../data/lusophoneData';
import { CrayonPoetIcon } from './CrayonPoetIcon';

interface PoemDetailModalProps {
  poem: Poem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (poemId: string) => void;
}

export const PoemDetailModal: React.FC<PoemDetailModalProps> = ({
  poem,
  onClose,
  isFavorite,
  onToggleFavorite
}) => {
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [copied, setCopied] = useState(false);

  const [loadingMood, setLoadingMood] = useState(false);
  const [moodAnalysis, setMoodAnalysis] = useState<PoemMoodAnalysis | null>(null);

  const [loadingContext, setLoadingContext] = useState(false);
  const [historicalContext, setHistoricalContext] = useState<PoemHistoricalContext | null>(null);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'contexto' | 'bio' | 'analise'>('contexto');

  const poet = poem
    ? POETS.find(
        (p) => p.id === poem.poetId || p.name.toLowerCase() === poem.poetName.toLowerCase()
      )
    : undefined;

  const getClientFallbackMood = (targetPoem: Poem): PoemMoodAnalysis => {
    const text = `${targetPoem.title || ''} ${targetPoem.poetName || ''} ${(targetPoem.stanzas || []).join(' ')}`.toLowerCase();
    if (text.includes('mar') || text.includes('navegar') || text.includes('oceano') || text.includes('nau') || text.includes('salgado') || text.includes('porto') || text.includes('ilha')) {
      return {
        mood: 'Banhado de Saudade e Imensidão Oceânica',
        colorCategory: 'blue',
        badgeHex: '#1e3a8a',
        icon: 'water_drop',
        explanation: 'A presença do oceano e da travessia evoca o destino heroico e a doce melancolia do marfim e das águas.',
        source: 'literary_acervo',
      };
    }
    if (text.includes('amor') || text.includes('coração') || text.includes('paixão') || text.includes('fogo') || text.includes('beijo') || text.includes('amada')) {
      return {
        mood: 'Apaixonado e Ardente',
        colorCategory: 'rose',
        badgeHex: '#be185d',
        icon: 'favorite',
        explanation: 'Lirismo amoroso vibrante e intenso, celebrando as chamas, os contrastes e as contradições do afeto.',
        source: 'literary_acervo',
      };
    }
    if (text.includes('morte') || text.includes('dor') || text.includes('lágrima') || text.includes('triste') || text.includes('sombra') || text.includes('luto') || text.includes('adeus')) {
      return {
        mood: 'Melancólico e Elegíaco',
        colorCategory: 'slate',
        badgeHex: '#475569',
        icon: 'sentiment_dissatisfied',
        explanation: 'Tonalidade nostálgica e sombria, debruçando-se sobre a finitude, a perda e o eco silenciado da dor.',
        source: 'literary_acervo',
      };
    }
    if (text.includes('luta') || text.includes('liberdade') || text.includes('povo') || text.includes('terra') || text.includes('sangue') || text.includes('grito')) {
      return {
        mood: 'Combate e Resistência Libertária',
        colorCategory: 'amber',
        badgeHex: '#b45309',
        icon: 'local_fire_department',
        explanation: 'Voz lírica de protesto, resiliência e afirmação da dignidade humana perante a opressão.',
        source: 'literary_acervo',
      };
    }
    if (text.includes('alma') || text.includes('deus') || text.includes('místico') || text.includes('sagrado') || text.includes('infinito') || text.includes('luz')) {
      return {
        mood: 'Místico e Contemplativo',
        colorCategory: 'purple',
        badgeHex: '#7e22ce',
        icon: 'psychology',
        explanation: 'Busca espiritual profunda e transcendente, voltada para os mistérios do invisível e da essência da alma.',
        source: 'literary_acervo',
      };
    }
    if (text.includes('noite') || text.includes('lua') || text.includes('sonho') || text.includes('brisa') || text.includes('paz')) {
      return {
        mood: 'Sereno e Noturno',
        colorCategory: 'indigo',
        badgeHex: '#4338ca',
        icon: 'dark_mode',
        explanation: 'Atmosfera de introspecção e serenidade poética sob o veludo da noite e o brilho dos astros.',
        source: 'literary_acervo',
      };
    }
    return {
      mood: 'Reflexivo e Filosófico',
      colorCategory: 'emerald',
      badgeHex: '#047857',
      icon: 'auto_awesome',
      explanation: 'Meditação profunda sobre a existência, o tempo e os mistérios da condição humana.',
      source: 'literary_acervo',
    };
  };

  const fetchMoodAnalysis = async (targetPoem: Poem) => {
    setLoadingMood(true);
    try {
      const res = await fetch('/api/analyze-poem-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: targetPoem.title,
          poetName: targetPoem.poetName,
          stanzas: targetPoem.stanzas,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.mood) {
          setMoodAnalysis(data);
          targetPoem.moodAnalysis = data;
          return;
        }
      }
      const fallback = getClientFallbackMood(targetPoem);
      setMoodAnalysis(fallback);
      targetPoem.moodAnalysis = fallback;
    } catch {
      const fallback = getClientFallbackMood(targetPoem);
      setMoodAnalysis(fallback);
      targetPoem.moodAnalysis = fallback;
    } finally {
      setLoadingMood(false);
    }
  };

  const fetchHistoricalContext = async (targetPoem: Poem, force = false) => {
    if (!targetPoem) return;
    if (targetPoem.historicalContext && !force) {
      setHistoricalContext(targetPoem.historicalContext);
      return;
    }
    setLoadingContext(true);
    try {
      const poetObj = POETS.find(
        (p) => p.id === targetPoem.poetId || p.name.toLowerCase() === targetPoem.poetName.toLowerCase()
      );
      const res = await fetch('/api/poem-historical-context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: targetPoem.title,
          poetName: targetPoem.poetName,
          year: targetPoem.year || poetObj?.years,
          countryName: poetObj?.countryName || targetPoem.countryName,
          period: poetObj?.period || targetPoem.era,
          stanzas: targetPoem.stanzas,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.historicalEra) {
          setHistoricalContext(data);
          targetPoem.historicalContext = data;
          return;
        }
      }
    } catch (err) {
      console.warn('Conexão Gemini com latência para contexto histórico:', err);
    } finally {
      setLoadingContext(false);
    }
  };

  useEffect(() => {
    if (poem) {
      // Initialize immediately with cached or fallback mood to avoid any visual flicker or error
      const initialMood = poem.moodAnalysis || getClientFallbackMood(poem);
      setMoodAnalysis(initialMood);
      if (!poem.moodAnalysis) {
        fetchMoodAnalysis(poem);
      }

      setHistoricalContext(poem.historicalContext || null);
      if (!poem.historicalContext) {
        fetchHistoricalContext(poem);
      }
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [poem]);

  const handleDeclamar = () => {
    if (!poem) return;
    if (!('speechSynthesis' in window)) {
      alert('A síntese de voz não é suportada neste navegador.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const fullText = `${poem.title}. Por ${poem.poetName}. ${poem.stanzas.join(' ')}`;
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'pt-PT'; // Portuguese declamation
    utterance.rate = 0.88; // Poetic slow cadence

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handleCopyText = () => {
    if (!poem) return;
    const textToCopy = `${poem.title}\n\n${poem.stanzas.join('\n')}\n\n— ${poem.poetName}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!poem) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${poem.title} — ${poem.poetName}`,
          text: `"${poem.stanzas[0]}" — Poema de ${poem.poetName} na Lira Lusófona`,
          url: window.location.href
        });
      } catch {
        handleCopyText();
      }
    } else {
      handleCopyText();
    }
  };

  const fontSizeClasses = {
    sm: 'text-base md:text-lg leading-relaxed',
    md: 'text-lg md:text-xl leading-relaxed',
    lg: 'text-xl md:text-2xl leading-loose'
  };

  if (!poem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#faf2db] text-[#1f1a14] border border-[#523816]/30 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col rounded-sm">
        {/* Header toolbar */}
        <div className="p-4 bg-[#f6ebd1] border-b border-[#523816]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{poem.country === 'PT' ? '🇵🇹' : poem.country === 'BR' ? '🇧🇷' : '🇦🇴'}</span>
            <span className="label mb-0">
              {poem.countryName} • {poem.era}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size adjustment */}
            <div className="flex bg-white border border-[#2b2b2b]/20 px-1 py-0.5 font-mono text-xs text-[#2b2b2b] rounded-xs">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-0.5 cursor-pointer ${fontSize === 'sm' ? 'bg-[#2b2b2b] text-white' : ''}`}
                title="Tamanho pequeno"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('md')}
                className={`px-1.5 py-0.5 cursor-pointer ${fontSize === 'md' ? 'bg-[#2b2b2b] text-white' : ''}`}
                title="Tamanho médio"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 cursor-pointer ${fontSize === 'lg' ? 'bg-[#2b2b2b] text-white' : ''}`}
                title="Tamanho grande"
              >
                A+
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1 text-[#2b2b2b] border border-[#2b2b2b]/20 hover:bg-[#2b2b2b] hover:text-white transition-colors cursor-pointer rounded-xs"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Poem Content */}
        <div className="p-6 md:p-10 overflow-y-auto flex-1 bg-[#faf2db] text-center relative">
          <article className="relative z-10 max-w-lg mx-auto">
            <span className="label">Poesia Universal</span>
            <h2 className="font-cormorant text-3xl md:text-5xl font-light text-[#1f1a14] mb-2">
              {poem.title}
            </h2>
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <CrayonPoetIcon poetId={poem.poetId} poetName={poem.poetName} country={poem.country} size="md" />
              <p className="font-cormorant text-xl text-[#1e3a8a] font-semibold">
                {poem.poetName}
              </p>
            </div>

            {poem.year && (
              <p className="font-mono text-xs uppercase opacity-60 mb-4">
                {poem.location ? `${poem.location}, ` : ''}{poem.year}
              </p>
            )}

            {/* Gemini AI Emotional Mood Badge */}
            <div className="mb-8 flex flex-col items-center justify-center">
              {loadingMood && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-[#1e3a8a]/10 text-[#1e3a8a] border border-[#1e3a8a]/20 animate-pulse">
                  <span className="material-symbols-outlined text-sm animate-spin">auto_awesome</span>
                  <span>A analisar carga emocional e lírica...</span>
                </div>
              )}

              {!loadingMood && moodAnalysis && (
                <div className="flex flex-col items-center gap-2 max-w-md animate-fade-in">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-2xs transition-all hover:scale-105"
                    style={{
                      backgroundColor: `${moodAnalysis.badgeHex || '#1e3a8a'}15`,
                      borderColor: moodAnalysis.badgeHex || '#1e3a8a',
                      color: moodAnalysis.badgeHex || '#1e3a8a',
                    }}
                  >
                    <span className="material-symbols-outlined text-base">
                      {moodAnalysis.icon || 'auto_awesome'}
                    </span>
                    <span className="font-mono text-xs font-bold tracking-wider uppercase">
                      Humor: {moodAnalysis.mood}
                    </span>
                    <button
                      onClick={() => fetchMoodAnalysis(poem)}
                      title="Atualizar análise lírica com IA Gemini"
                      className="ml-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer flex items-center"
                    >
                      <span className="material-symbols-outlined text-xs">refresh</span>
                    </button>
                  </div>
                  {moodAnalysis.explanation && (
                    <p className="text-xs font-serif italic text-[#1f1a14]/80 max-w-sm text-center leading-relaxed bg-[#faf2db] p-2.5 rounded-xs border border-[#523816]/15 shadow-2xs">
                      "{moodAnalysis.explanation}"
                    </p>
                  )}
                </div>
              )}

              {!loadingMood && !moodAnalysis && (
                <button
                  onClick={() => fetchMoodAnalysis(poem)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[#1e3a8a] bg-[#1e3a8a]/10 border border-[#1e3a8a]/20 hover:bg-[#1e3a8a]/20 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  <span>Analisar Carga Emocional (IA Gemini)</span>
                </button>
              )}
            </div>

            <div className={`font-serif text-[#1f1a14] italic space-y-3 mb-10 text-left max-w-md mx-auto border-l-2 border-[#1e3a8a] pl-6 py-2 ${fontSizeClasses[fontSize]}`}>
              {poem.stanzas.map((line, idx) => (
                <p key={idx} className={line === '' ? 'h-3' : ''}>
                  {line}
                </p>
              ))}
            </div>

            {/* Quick Context Action Button */}
            <div className="mb-8 flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setShowAnalysis(true);
                  setActiveAnalysisTab('contexto');
                  setTimeout(() => {
                    document.getElementById('analysis-section-anchor')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#1e3a8a] bg-[#1e3a8a]/10 hover:bg-[#1e3a8a]/20 border border-[#1e3a8a]/25 transition-all cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-sm">history_edu</span>
                <span>Contexto Histórico & Influências</span>
                {historicalContext && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                )}
              </button>
            </div>

            {/* Analysis, Historical Context & Biography Section */}
            <div id="analysis-section-anchor" className="mt-8 border-t border-[#523816]/15 pt-6 text-left max-w-lg mx-auto">
              <button
                onClick={() => setShowAnalysis(!showAnalysis)}
                className="w-full flex justify-between items-center font-mono text-xs uppercase tracking-wider text-[#1f1a14] p-3 border border-[#523816]/20 bg-[#faf2db] hover:border-[#1e3a8a] transition-colors cursor-pointer rounded-xs shadow-2xs"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#1e3a8a]">history_edu</span>
                  <span>Contexto Histórico, Análise & Biografia</span>
                </span>
                <span className="material-symbols-outlined text-sm">
                  {showAnalysis ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {showAnalysis && (
                <div className="mt-3 space-y-4 animate-fade-in">
                  {/* Tab Navigation */}
                  <div className="flex bg-[#f4e9cd] p-1 border border-[#523816]/20 rounded-xs gap-1 font-mono text-[11px]">
                    <button
                      onClick={() => setActiveAnalysisTab('contexto')}
                      className={`flex-1 py-1.5 px-2 text-center rounded-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        activeAnalysisTab === 'contexto'
                          ? 'bg-[#1e3a8a] text-white font-bold shadow-2xs'
                          : 'text-[#1f1a14]/80 hover:text-[#1e3a8a]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs">account_balance</span>
                      <span>Contexto Histórico</span>
                    </button>
                    <button
                      onClick={() => setActiveAnalysisTab('bio')}
                      className={`flex-1 py-1.5 px-2 text-center rounded-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        activeAnalysisTab === 'bio'
                          ? 'bg-[#1e3a8a] text-white font-bold shadow-2xs'
                          : 'text-[#1f1a14]/80 hover:text-[#1e3a8a]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs">person</span>
                      <span>Biografia</span>
                    </button>
                    <button
                      onClick={() => setActiveAnalysisTab('analise')}
                      className={`flex-1 py-1.5 px-2 text-center rounded-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        activeAnalysisTab === 'analise'
                          ? 'bg-[#1e3a8a] text-white font-bold shadow-2xs'
                          : 'text-[#1f1a14]/80 hover:text-[#1e3a8a]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs">psychology</span>
                      <span>Análise Poética</span>
                    </button>
                  </div>

                  {/* TAB 1: Contexto Histórico & Influências Literárias */}
                  {activeAnalysisTab === 'contexto' && (
                    <div className="p-4 bg-[#faf2db] border border-[#523816]/15 rounded-xs space-y-4 shadow-2xs animate-fade-in">
                      <div className="flex items-start justify-between gap-3 border-b border-[#523816]/15 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-2xl text-[#1e3a8a]">history_edu</span>
                          <div>
                            <span className="label !mb-0">Contexto da Época da Criação</span>
                            <h4 className="font-cormorant text-xl font-bold text-[#1f1a14]">
                              Influências & Espírito do Tempo
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {historicalContext?.source === 'gemini' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#1e3a8a]/10 text-[#1e3a8a] border border-[#1e3a8a]/20">
                              <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                              IA Gemini
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#523816]/10 text-[#523816] border border-[#523816]/15">
                              <span className="material-symbols-outlined text-[10px]">menu_book</span>
                              Acervo Histórico
                            </span>
                          )}
                          <button
                            onClick={() => fetchHistoricalContext(poem, true)}
                            disabled={loadingContext}
                            title="Regenerar contexto histórico com IA Gemini"
                            className="p-1 border border-[#523816]/20 rounded-xs hover:bg-[#1e3a8a]/10 hover:text-[#1e3a8a] transition-colors cursor-pointer text-[#1f1a14]/70"
                          >
                            <span className={`material-symbols-outlined text-xs ${loadingContext ? 'animate-spin' : ''}`}>
                              refresh
                            </span>
                          </button>
                        </div>
                      </div>

                      {loadingContext && !historicalContext && (
                        <div className="py-6 flex flex-col items-center justify-center text-center space-y-2 animate-pulse">
                          <span className="material-symbols-outlined text-2xl text-[#1e3a8a] animate-spin">auto_awesome</span>
                          <p className="font-mono text-xs text-[#1e3a8a]">
                            A reconstituir a conjuntura histórica e influências literárias...
                          </p>
                        </div>
                      )}

                      {historicalContext && (
                        <div className="space-y-3.5">
                          {/* Bloco 1: Época Histórica & Conjuntura */}
                          <div className="bg-[#f4e9cd]/90 p-3.5 rounded-xs border border-[#523816]/15 space-y-1.5 shadow-2xs">
                            <span className="font-mono text-[10px] font-bold text-[#1e3a8a] uppercase flex items-center gap-1.5 tracking-wider">
                              <span className="material-symbols-outlined text-xs">account_balance</span>
                              Época Histórica & Conjuntura Sociocultural
                            </span>
                            <p className="font-serif text-xs text-[#1f1a14]/90 leading-relaxed">
                              {historicalContext.historicalEra}
                            </p>
                          </div>

                          {/* Bloco 2: Influências Literárias & Estéticas */}
                          <div className="bg-[#f4e9cd]/90 p-3.5 rounded-xs border border-[#523816]/15 space-y-1.5 shadow-2xs">
                            <span className="font-mono text-[10px] font-bold text-[#1e3a8a] uppercase flex items-center gap-1.5 tracking-wider">
                              <span className="material-symbols-outlined text-xs">palette</span>
                              Influências Literárias & Correntes Estéticas
                            </span>
                            <p className="font-serif text-xs text-[#1f1a14]/90 leading-relaxed">
                              {historicalContext.literaryInfluences}
                            </p>
                          </div>

                          {/* Bloco 3: Ressonância com o Poema */}
                          <div className="bg-[#1e3a8a]/5 p-3.5 rounded-xs border border-[#1e3a8a]/20 space-y-1.5 shadow-2xs">
                            <span className="font-mono text-[10px] font-bold text-[#1e3a8a] uppercase flex items-center gap-1.5 tracking-wider">
                              <span className="material-symbols-outlined text-xs">flare</span>
                              Ressonância com a Obra
                            </span>
                            <p className="font-serif italic text-xs text-[#1f1a14]/90 leading-relaxed">
                              "{historicalContext.creativeContext}"
                            </p>
                          </div>

                          {/* Marcos Históricos Contemporâneos */}
                          {historicalContext.keyEvents && historicalContext.keyEvents.length > 0 && (
                            <div className="pt-1">
                              <span className="font-mono text-[10px] uppercase text-[#1f1a14]/70 block mb-1.5 font-semibold">
                                Marcos Históricos Contemporâneos:
                              </span>
                              <div className="space-y-1.5">
                                {historicalContext.keyEvents.map((event, idx) => (
                                  <div
                                    key={idx}
                                    className="font-mono text-[11px] text-[#1f1a14]/90 bg-[#f4e9cd]/70 p-2 rounded-xs border border-[#523816]/15 flex items-start gap-2"
                                  >
                                    <span className="text-[#1e3a8a] font-bold shrink-0">✦</span>
                                    <span>{event}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {!loadingContext && !historicalContext && (
                        <div className="text-center py-4">
                          <button
                            onClick={() => fetchHistoricalContext(poem, true)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1e3a8a] text-white font-mono text-xs font-semibold rounded-xs hover:bg-[#1e3a8a]/90 transition-all cursor-pointer shadow-2xs"
                          >
                            <span className="material-symbols-outlined text-sm">auto_awesome</span>
                            <span>Gerar Contexto Histórico da Obra (IA Gemini)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: Biografia do Poeta Card */}
                  {activeAnalysisTab === 'bio' && (
                    <div className="p-4 bg-[#faf2db] border border-[#523816]/15 rounded-xs space-y-3 shadow-2xs animate-fade-in">
                      <div className="flex items-start justify-between gap-3 border-b border-[#523816]/15 pb-3">
                        <div className="flex items-center gap-3">
                          <CrayonPoetIcon poetId={poem.poetId} poetName={poem.poetName} size="lg" />
                          <div>
                            <span className="label mb-0">Biografia do Poeta</span>
                            <h4 className="font-cormorant text-2xl font-bold text-[#1f1a14]">
                              {poet?.name || poem.poetName}
                            </h4>
                            <p className="font-mono text-xs text-[#1e3a8a] font-medium">
                              {poet?.years ? `Datas: ${poet.years}` : (poem.year ? `Ano de Registro: ${poem.year}` : 'Autor Registrado')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Metadata Grid: Localidade & Movimento */}
                      <div className="grid grid-cols-2 gap-2 font-mono text-xs bg-[#f4e9cd] p-3 rounded-xs border border-[#523816]/15">
                        <div>
                          <span className="opacity-60 block text-[10px] uppercase">Localidade / Origem</span>
                          <span className="font-medium text-[#1f1a14]">
                            📍 {poem.location ? `${poem.location}, ` : ''}{poet?.countryName || poem.countryName}
                          </span>
                        </div>
                        <div>
                          <span className="opacity-60 block text-[10px] uppercase">Movimento / Estilo</span>
                          <span className="font-medium text-[#1e3a8a]">
                            🏛️ {poet?.period || poem.era}
                          </span>
                        </div>
                      </div>

                      {/* Bio Trajectory */}
                      {poet?.bio && (
                        <div>
                          <span className="label mb-1">Trajetória Biográfica</span>
                          <p className="font-serif text-xs text-[#1f1a14]/90 leading-relaxed bg-[#f4e9cd]/80 p-3 rounded-xs border border-[#523816]/15">
                            {poet.bio}
                          </p>
                        </div>
                      )}

                      {/* Curiosidades e Citação Célebre */}
                      {poet?.famousQuote && (
                        <div className="bg-[#1e3a8a]/5 p-3 rounded-xs border border-[#1e3a8a]/20">
                          <span className="label mb-1 text-[#1e3a8a]">Curiosidade & Citação Célebre</span>
                          <p className="font-serif italic text-xs text-[#1e3a8a] font-semibold">
                            "{poet.famousQuote}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: Análise Literária do Poema Card */}
                  {activeAnalysisTab === 'analise' && (
                    <div className="p-4 bg-[#faf2db] border border-[#523816]/15 rounded-xs space-y-2 shadow-2xs animate-fade-in">
                      <span className="label mb-0">Análise Literária do Poema</span>
                      <h5 className="font-cormorant text-xl font-semibold text-[#1f1a14]">
                        «{poem.title}»
                      </h5>

                      {poem.theme && (
                        <p className="font-mono text-xs text-[#1e3a8a] bg-[#1e3a8a]/10 p-2 rounded-xs border border-[#1e3a8a]/20">
                          <strong>Tema Central:</strong> {poem.theme} • <strong>Contexto:</strong> {poem.era}
                        </p>
                      )}

                      {poem.analysis ? (
                        <p className="font-serif text-xs text-[#1f1a14]/90 leading-relaxed pt-1">
                          {poem.analysis}
                        </p>
                      ) : (
                        <p className="font-serif text-xs text-[#1f1a14]/80 italic pt-1">
                          Obra lírica de imenso valor estético, explorando as nuances da experiência humana e a sensibilidade poética de {poem.poetName}.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </article>
        </div>

        {/* Action Controls Footer */}
        <div className="p-4 bg-[#f6ebd1] border-t border-[#523816]/15 flex flex-wrap justify-between items-center gap-2">
          <button
            onClick={handleDeclamar}
            className={`btn-outline ${isPlaying ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]' : ''}`}
          >
            <span className="material-symbols-outlined text-sm">
              {isPlaying ? 'pause_circle' : 'record_voice_over'}
            </span>
            <span>{isPlaying ? 'Pausar Voz' : 'Declamar Poema'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(poem.id)}
              className={`btn-outline ${isFavorite ? 'border-[#1e3a8a] text-[#1e3a8a] bg-[#1e3a8a]/5' : ''}`}
            >
              <span className="material-symbols-outlined text-sm">
                {isFavorite ? 'favorite' : 'favorite_border'}
              </span>
              <span>{isFavorite ? 'Guardado' : 'Guardar'}</span>
            </button>

            <button
              onClick={handleCopyText}
              className="p-2 border border-[#2b2b2b]/20 text-[#2b2b2b] hover:border-[#1e3a8a] transition-colors cursor-pointer rounded-xs"
              title="Copiar versos"
            >
              <span className="material-symbols-outlined text-sm">
                {copied ? 'check' : 'content_copy'}
              </span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 border border-[#2b2b2b]/20 text-[#2b2b2b] hover:border-[#1e3a8a] transition-colors cursor-pointer rounded-xs"
              title="Partilhar"
            >
              <span className="material-symbols-outlined text-sm">share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

