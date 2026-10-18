import React, { useState, useEffect, useRef } from 'react';
import { Poem, Poet } from '../types';
import { POEMS, POETS } from '../data/lusophoneData';
import { CrayonPoetIcon } from '../components/CrayonPoetIcon';

interface MoodConfig {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  poeticTitle: string;
  description: string;
  aura: string;
  themeFilterKeywords: string[];
}

export const MOODS: MoodConfig[] = [
  {
    id: 'alegria',
    name: 'Alegria',
    icon: 'wb_sunny',
    emoji: '☀️',
    bgColor: '#fef08a',
    textColor: '#854d0e',
    borderColor: '#eab308',
    badgeBg: '#fef3c7',
    badgeText: '#92400e',
    poeticTitle: 'Humor Solar & Festivo',
    description: 'Sua alma transborda luz, vibração e festividade. Você precisa de versos solares que celebrem o ato de existir.',
    aura: 'Luminosa, Risonha & Energética',
    themeFilterKeywords: ['alegria', 'festa', 'vida', 'cantar', 'sol', 'amor', 'cantiga', 'música', 'esperança']
  },
  {
    id: 'saudade',
    name: 'Saudade',
    icon: 'water_drop',
    emoji: '🌊',
    bgColor: '#dbeafe',
    textColor: '#1e3a8a',
    borderColor: '#3b82f6',
    badgeBg: '#eff6ff',
    badgeText: '#1e40af',
    poeticTitle: 'Nostalgia & Mar Interior',
    description: 'Sua alma navega pelas memórias e lembranças de afetos distantes. A poesia do mar e das lembranças te acolhe.',
    aura: 'Contemplativa, Doce & saudosista',
    themeFilterKeywords: ['saudade', 'mar', 'infância', 'memória', 'tempo', 'ausência', 'fado', 'regresso']
  },
  {
    id: 'paixao',
    name: 'Paixão',
    icon: 'favorite',
    emoji: '💖',
    bgColor: '#ffe4e6',
    textColor: '#9f1239',
    borderColor: '#f43f5e',
    badgeBg: '#fff1f2',
    badgeText: '#be123c',
    poeticTitle: 'Lirismo & Fogo do Amor',
    description: 'Seu coração pulsa na chama do afeto e da entrega amorosa. Um poema devotado ao sentimento sublime e ardoroso.',
    aura: 'Ardorosa, Sensível & Apaixonada',
    themeFilterKeywords: ['amor', 'paixão', 'desejo', 'fogo', 'amar', 'coração', 'soneto', 'flor']
  },
  {
    id: 'calma',
    name: 'Serenidade',
    icon: 'nature',
    emoji: '🌿',
    bgColor: '#dcfce7',
    textColor: '#166534',
    borderColor: '#22c55e',
    badgeBg: '#f0fdf4',
    badgeText: '#15803d',
    poeticTitle: 'Brisa Tranquila & Natureza',
    description: 'Você busca silêncio, paz e a voz suave das arvores e dos campos. Versos tranquilos para pausar e respirar.',
    aura: 'Serena, Silenciosa & Harmoniosa',
    themeFilterKeywords: ['natureza', 'paz', 'silêncio', 'brisa', 'verde', 'campo', 'rio', 'tempo', 'florestas']
  },
  {
    id: 'liberdade',
    name: 'Coragem',
    icon: 'local_fire_department',
    emoji: '🔥',
    bgColor: '#ffedd5',
    textColor: '#9a3412',
    borderColor: '#f97316',
    badgeBg: '#fff7ed',
    badgeText: '#c2410c',
    poeticTitle: 'Fogo Criador & Libertação',
    description: 'Uma força interior clama por asas, autonomia e transformação. Poemas de resistência, garra e energia viva.',
    aura: 'Vigorosa, Insubmissa & Audaz',
    themeFilterKeywords: ['liberdade', 'força', 'revolução', 'luta', 'tambor', 'fogo', 'vento', 'futuro']
  },
  {
    id: 'misterio',
    name: 'Mistério',
    icon: 'nights_stay',
    emoji: '🌌',
    bgColor: '#f3e8ff',
    textColor: '#6b21a8',
    borderColor: '#a855f7',
    badgeBg: '#faf5ff',
    badgeText: '#7e22ce',
    poeticTitle: 'Enigma & Filosofia do Ser',
    description: 'Sua mente indaga o cosmos, o tempo, a alma e o invisível. Versos profundos e enigmáticos para meditar.',
    aura: 'Mística, Profunda & Enigmática',
    themeFilterKeywords: ['existência', 'morte', 'noite', 'sonho', 'alma', 'infinito', 'filosofia', 'tempo', 'deus']
  },
  {
    id: 'melancolia',
    name: 'Melancolia',
    icon: 'cloud',
    emoji: '🌧️',
    bgColor: '#e2e8f0',
    textColor: '#334155',
    borderColor: '#64748b',
    badgeBg: '#f8fafc',
    badgeText: '#1e293b',
    poeticTitle: 'Introspecção & Chuva Suave',
    description: 'Um momento de recolhimento poético. O conforto e a beleza oculta nos dias mais cinzentos e reflexivos.',
    aura: 'Íntima, Reflexiva & Delicada',
    themeFilterKeywords: ['chuva', 'solitude', 'dor', 'noite', 'lágrima', 'sombra', 'silêncio', 'tristeza', 'música']
  },
  {
    id: 'esperanca',
    name: 'Esperança',
    icon: 'auto_awesome',
    emoji: '✨',
    bgColor: '#ccfbf1',
    textColor: '#115e59',
    borderColor: '#14b8a6',
    badgeBg: '#f0fdfa',
    badgeText: '#0f766e',
    poeticTitle: 'Alvorecer & Renascimento',
    description: 'Seus olhos se voltam para o horizonte de novas manhãs. Poesia de renovação, asas abertas e fé na vida.',
    aura: 'Inspirada, Promissora & Iluminada',
    themeFilterKeywords: ['esperança', 'amanhã', 'alvorecer', 'luz', 'futuro', 'caminho', 'novo', 'asas', 'flor']
  }
];

interface RouletteViewProps {
  onSelectPoem: (poem: Poem) => void;
  onSelectPoet: (poet: Poet) => void;
  favorites: string[];
  onToggleFavorite: (poemId: string) => void;
}

export const RouletteView: React.FC<RouletteViewProps> = ({
  onSelectPoem,
  onSelectPoet,
  favorites,
  onToggleFavorite,
}) => {
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodConfig | null>(null);
  const [matchedPoem, setMatchedPoem] = useState<Poem | null>(null);
  const [alternativePoems, setAlternativePoems] = useState<Poem[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copied, setCopied] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  // Sound Synthesizers via Web Audio API
  const playTick = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400 + Math.random() * 200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio context blocked
    }
  };

  const playWinChime = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.09);
        osc.stop(ctx.currentTime + idx * 0.09 + 0.55);
      });
    } catch {
      // Audio context blocked
    }
  };

  const handleSelectMoodResult = (mood: MoodConfig) => {
    setSelectedMood(mood);

    // Find matching poems
    const matches = POEMS.filter((p) => {
      const textToSearch = `${p.title} ${p.theme} ${p.stanzas.join(' ')} ${p.era}`.toLowerCase();
      return mood.themeFilterKeywords.some((kw) => textToSearch.includes(kw.toLowerCase()));
    });

    const pool = matches.length > 0 ? matches : POEMS;
    
    // Pick a random primary poem
    const primaryIndex = Math.floor(Math.random() * pool.length);
    const primary = pool[primaryIndex];
    setMatchedPoem(primary);

    // Pick 3 alternative poems
    const alts = pool.filter((p) => p.id !== primary.id).slice(0, 3);
    if (alts.length < 3) {
      const remainingNeeded = 3 - alts.length;
      const extra = POEMS.filter((p) => p.id !== primary.id && !alts.some((a) => a.id === p.id)).slice(0, remainingNeeded);
      setAlternativePoems([...alts, ...extra]);
    } else {
      setAlternativePoems(alts);
    }
  };

  const spinWheel = (forcedMoodIndex?: number) => {
    if (isSpinning) return;
    setIsSpinning(true);

    const targetIndex =
      forcedMoodIndex !== undefined
        ? forcedMoodIndex
        : Math.floor(Math.random() * MOODS.length);

    // Math for wheel rotation:
    // 8 slices = 45 deg per slice.
    // Slice 0 center is at 22.5 deg (from 0 to 45 deg)
    // Pointer is at the top (270 degrees / -90 degrees).
    // Angle needed so slice `targetIndex` lands at top (270 deg):
    const sliceAngle = 360 / MOODS.length; // 45
    const sliceCenter = targetIndex * sliceAngle + sliceAngle / 2;
    const targetDegInCircle = (360 - sliceCenter + 270) % 360;

    // Full extra revolutions (6 to 9 full turns)
    const extraRounds = 360 * (6 + Math.floor(Math.random() * 3));
    const currentModulo = rotationDeg % 360;
    const distanceToTarget = (targetDegInCircle - currentModulo + 360) % 360;
    
    const finalRotation = rotationDeg + extraRounds + distanceToTarget;

    setRotationDeg(finalRotation);

    // Play ticking sounds during animation
    const durationMs = 4000;
    const startTime = Date.now();
    let tickCount = 0;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= durationMs) {
        clearInterval(interval);
      } else {
        // Ticking probability decreases near the end
        if (Math.random() > elapsed / durationMs) {
          playTick();
          tickCount++;
        }
      }
    }, 90);

    setTimeout(() => {
      setIsSpinning(false);
      handleSelectMoodResult(MOODS[targetIndex]);
      playWinChime();

      // Scroll smoothly to results card
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }, durationMs);
  };

  const handleManualMoodClick = (mood: MoodConfig, index: number) => {
    if (isSpinning) return;
    spinWheel(index);
  };

  const handleShareSentiment = () => {
    if (!selectedMood || !matchedPoem) return;
    const textToShare = `🎰 Roleta Mágica dos Humores — Lira Lusófona\n\nMeu humor hoje: ${selectedMood.emoji} ${selectedMood.name} (${selectedMood.poeticTitle})\n\nPoema recomendado:\n"${matchedPoem.title}" de ${matchedPoem.poetName}\n\n"${matchedPoem.stanzas[0]}"`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // SVG wheel math helper
  const numSlices = MOODS.length;
  const sliceAngle = 360 / numSlices;

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto text-[#1f1a14] animate-fade-in">
      {/* Editorial Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#1e3a8a]/10 text-[#1e3a8a] px-3.5 py-1 rounded-full font-mono text-xs uppercase tracking-widest font-semibold mb-3">
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
          <span>Oráculo Poético</span>
        </div>
        <h1 className="font-cormorant text-4xl sm:text-6xl font-normal leading-tight tracking-tight text-[#1f1a14] mb-3">
          Roleta Mágica dos Humores
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[#1f1a14]/75 max-w-2xl mx-auto leading-relaxed">
          Gire a roleta dos sentimentos para revelar como está o seu coração hoje e descubra a poesia e o poeta que acalentam a sua alma.
        </p>
      </div>

      {/* Main Interactive Wheel Area */}
      <div className="bg-[#faf2db] p-6 sm:p-10 border border-[#523816]/15 rounded-sm shadow-xs mb-12 flex flex-col items-center relative overflow-hidden">
        {/* Top Controls: Sound Toggle */}
        <div className="w-full flex justify-between items-center mb-6">
          <span className="label mb-0">Roda dos 8 Sentimentos</span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 font-mono text-xs text-[#1f1a14]/60 hover:text-[#1e3a8a] cursor-pointer transition-colors"
            title={soundEnabled ? 'Desativar som do giro' : 'Ativar som do giro'}
          >
            <span className="material-symbols-outlined text-base">
              {soundEnabled ? 'volume_up' : 'volume_off'}
            </span>
            <span className="hidden sm:inline">{soundEnabled ? 'Som Ativo' : 'Sem Som'}</span>
          </button>
        </div>

        {/* Wheel Container with Pointer */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 my-4 select-none flex items-center justify-center">
          {/* Wheel Pointer (Arrow Top) */}
          <div className="absolute -top-4 z-20 flex flex-col items-center drop-shadow-md">
            <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-[#2b2b2b]" />
            <div className="w-3 h-3 bg-[#1e3a8a] rounded-full -mt-2 border-2 border-white" />
          </div>

          {/* Rotating SVG Wheel */}
          <div
            className="w-full h-full rounded-full border-4 border-[#2b2b2b] shadow-xl overflow-hidden"
            style={{
              transform: `rotate(${rotationDeg}deg)`,
              transition: isSpinning
                ? 'transform 4s cubic-bezier(0.15, 0.99, 0.25, 1.0)'
                : 'none',
            }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {MOODS.map((mood, index) => {
                const startAngle = index * sliceAngle;
                const endAngle = (index + 1) * sliceAngle;

                // SVG Arc Path Calculations
                const startRad = ((startAngle - 90) * Math.PI) / 180;
                const endRad = ((endAngle - 90) * Math.PI) / 180;

                const x1 = 200 + 200 * Math.cos(startRad);
                const y1 = 200 + 200 * Math.sin(startRad);
                const x2 = 200 + 200 * Math.cos(endRad);
                const y2 = 200 + 200 * Math.sin(endRad);

                const pathData = `M 200 200 L ${x1} ${y1} A 200 200 0 0 1 ${x2} ${y2} Z`;

                // Label Angle
                const midAngle = startAngle + sliceAngle / 2;
                const midRad = ((midAngle - 90) * Math.PI) / 180;
                const textX = 200 + 130 * Math.cos(midRad);
                const textY = 200 + 130 * Math.sin(midRad);

                return (
                  <g key={mood.id}>
                    <path
                      d={pathData}
                      fill={mood.bgColor}
                      stroke="#2b2b2b"
                      strokeWidth="2"
                    />
                    {/* Text Label inside Slice */}
                    <g
                      transform={`translate(${textX}, ${textY}) rotate(${
                        midAngle + 90
                      })`}
                    >
                      <text
                        x="0"
                        y="0"
                        textAnchor="middle"
                        fill={mood.textColor}
                        className="font-mono text-[11px] font-bold uppercase tracking-wider"
                        style={{ userSelect: 'none' }}
                      >
                        {mood.emoji} {mood.name}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Decorative Outer Ring Dots */}
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i * 360) / 16;
                const rad = (angle * Math.PI) / 180;
                const rx = 200 + 192 * Math.cos(rad);
                const ry = 200 + 192 * Math.sin(rad);
                return (
                  <circle
                    key={i}
                    cx={rx}
                    cy={ry}
                    r="3"
                    fill="#2b2b2b"
                  />
                );
              })}
            </svg>
          </div>

          {/* Center Spin Hub Button */}
          <button
            onClick={() => spinWheel()}
            disabled={isSpinning}
            className={`absolute z-30 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-4 border-[#2b2b2b] shadow-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform ${
              isSpinning ? 'opacity-80 cursor-wait' : ''
            }`}
            title="Clique para girar a roleta"
          >
            <span className="material-symbols-outlined text-2xl text-[#1e3a8a] animate-pulse">
              {isSpinning ? 'hourglass_top' : 'auto_awesome'}
            </span>
            <span className="font-mono text-[10px] uppercase font-bold text-[#2b2b2b] tracking-wider mt-0.5">
              {isSpinning ? 'Girando...' : 'GIRAR'}
            </span>
          </button>
        </div>

        {/* Big Action Button */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={() => spinWheel()}
            disabled={isSpinning}
            className="btn py-3.5 px-8 text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            id="spin-roulette-btn"
          >
            <span className="material-symbols-outlined text-lg">
              {isSpinning ? 'autorenew' : 'casino'}
            </span>
            <span>{isSpinning ? 'Consultando os Astros Líricos...' : 'Girar Roleta dos Humores'}</span>
          </button>
        </div>

        {/* Quick Direct Mood Selectors */}
        <div className="mt-10 pt-6 border-t border-[#2b2b2b]/10 w-full text-center">
          <span className="label block mb-3">Ou selecione diretamente o que está sentindo hoje:</span>
          <div className="flex flex-wrap justify-center gap-2">
            {MOODS.map((mood, idx) => (
              <button
                key={mood.id}
                onClick={() => handleManualMoodClick(mood, idx)}
                disabled={isSpinning}
                className={`px-3 py-1.5 rounded-full border font-mono text-xs flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 ${
                  selectedMood?.id === mood.id
                    ? 'ring-2 ring-offset-1 ring-[#1e3a8a] font-bold shadow-xs'
                    : 'hover:border-[#1e3a8a]'
                }`}
                style={{
                  backgroundColor: mood.bgColor,
                  color: mood.textColor,
                  borderColor: mood.borderColor,
                }}
              >
                <span>{mood.emoji}</span>
                <span>{mood.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Section (Drawn Mood + Recommended Poem) */}
      <div ref={resultRef}>
        {selectedMood && matchedPoem && (
          <div className="space-y-8 animate-fade-in">
            {/* Humor Reveal Card */}
            <div
              className="p-6 sm:p-10 border-2 rounded-sm shadow-md transition-all relative overflow-hidden"
              style={{
                backgroundColor: selectedMood.bgColor,
                borderColor: selectedMood.borderColor,
                color: selectedMood.textColor,
              }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-black/10">
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl">{selectedMood.emoji}</span>
                  <div>
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider font-bold mb-1"
                      style={{
                        backgroundColor: selectedMood.badgeBg,
                        color: selectedMood.badgeText,
                      }}
                    >
                      Humor Sorteado
                    </span>
                    <h2 className="font-cormorant text-3xl sm:text-4xl font-bold leading-tight">
                      {selectedMood.name} — {selectedMood.poeticTitle}
                    </h2>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleShareSentiment}
                    className="px-3 py-1.5 bg-white/80 hover:bg-white text-xs font-mono rounded-xs border border-black/20 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copied ? 'check' : 'share'}
                    </span>
                    <span>{copied ? 'Copiado!' : 'Partilhar'}</span>
                  </button>

                  <button
                    onClick={() => spinWheel()}
                    className="px-3 py-1.5 bg-white hover:bg-white/90 text-xs font-mono font-medium rounded-xs border border-black/20 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">autorenew</span>
                    <span>Girar de Novo</span>
                  </button>
                </div>
              </div>

              <p className="font-serif italic text-lg sm:text-xl leading-relaxed mb-4">
                "{selectedMood.description}"
              </p>

              <div className="font-mono text-xs opacity-80 flex items-center gap-2">
                <span className="font-semibold">Aura do Dia:</span>
                <span>{selectedMood.aura}</span>
              </div>
            </div>

            {/* Recommended Poem Card */}
            <div className="bg-[#faf2db] p-6 sm:p-12 border border-[#523816]/15 rounded-sm shadow-xs">
              <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
                <span className="label mb-0">
                  Poesia Ideal para o seu Humor • {matchedPoem.countryName} • {matchedPoem.era}
                </span>

                <button
                  onClick={() => onToggleFavorite(matchedPoem.id)}
                  className={`px-3 py-1 font-mono text-xs rounded-xs border transition-colors flex items-center gap-1.5 cursor-pointer ${
                    favorites.includes(matchedPoem.id)
                      ? 'border-[#1e3a8a] text-[#1e3a8a] bg-[#1e3a8a]/5 font-semibold'
                      : 'border-[#523816]/20 hover:border-[#1e3a8a]'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {favorites.includes(matchedPoem.id) ? 'favorite' : 'favorite_border'}
                  </span>
                  <span>{favorites.includes(matchedPoem.id) ? 'Guardado' : 'Guardar Poema'}</span>
                </button>
              </div>

              <h3
                onClick={() => onSelectPoem(matchedPoem)}
                className="font-cormorant text-4xl sm:text-6xl font-light leading-tight tracking-tight text-[#1f1a14] hover:text-[#1e3a8a] cursor-pointer transition-colors mb-6"
              >
                {matchedPoem.title}
              </h3>

              {/* Stanzas snippet */}
              <div
                onClick={() => onSelectPoem(matchedPoem)}
                className="font-serif text-xl sm:text-3xl italic text-[#1e3a8a] my-8 leading-relaxed cursor-pointer hover:opacity-90 transition-opacity bg-[#f4e9cd] p-6 border-l-4 border-[#1e3a8a] rounded-r-xs"
              >
                "{matchedPoem.stanzas[0]}"
                {matchedPoem.stanzas[1] && (
                  <p className="mt-4 text-base sm:text-xl text-[#1f1a14]/85 not-italic font-normal">
                    {matchedPoem.stanzas[1]}
                  </p>
                )}
              </div>

              {/* Poet Details & Read Button */}
              <div className="pt-6 border-t border-[#523816]/15 flex flex-wrap justify-between items-center gap-6">
                <div
                  onClick={() => {
                    const poet = POETS.find((p) => p.id === matchedPoem.poetId);
                    if (poet) onSelectPoet(poet);
                  }}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <CrayonPoetIcon poetId={matchedPoem.poetId} poetName={matchedPoem.poetName} size="md" />
                  <div>
                    <strong className="font-cormorant text-2xl font-semibold text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors block">
                      {matchedPoem.poetName}
                    </strong>
                    <span className="font-mono text-xs text-[#1f1a14]/60">
                      {matchedPoem.location ? `${matchedPoem.location}, ` : ''}{matchedPoem.year || 'Época'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectPoem(matchedPoem)}
                  className="btn py-3 px-6 text-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">auto_stories</span>
                  <span>Ler Poema Integral</span>
                </button>
              </div>
            </div>

            {/* Alternative Poems Grid */}
            {alternativePoems.length > 0 && (
              <div className="mt-12">
                <span className="label block mb-4">Outras Leituras para {selectedMood.name}:</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {alternativePoems.map((alt) => {
                    const isFav = favorites.includes(alt.id);
                    return (
                      <div
                        key={alt.id}
                        onClick={() => onSelectPoem(alt)}
                        className="bg-[#faf2db] p-6 border border-[#523816]/15 hover:border-[#1e3a8a] transition-all cursor-pointer group rounded-sm flex flex-col justify-between shadow-2xs hover:shadow-xs"
                      >
                        <div>
                          <span className="label">{alt.countryName} • {alt.era}</span>
                          <h4 className="font-cormorant text-2xl font-normal text-[#1f1a14] group-hover:text-[#1e3a8a] transition-colors mb-2">
                            {alt.title}
                          </h4>
                          <div className="flex items-center gap-2 mb-3">
                            <CrayonPoetIcon poetId={alt.poetId} poetName={alt.poetName} size="xs" />
                            <span className="font-mono text-xs text-[#1e3a8a] font-medium">
                              {alt.poetName}
                            </span>
                          </div>
                          <p className="font-serif italic text-xs text-[#1f1a14]/75 line-clamp-2">
                            "{alt.stanzas[0]}"
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#523816]/15 flex justify-between items-center text-xs font-mono">
                          <span className="text-[#1e3a8a] font-medium flex items-center gap-1">
                            <span>Ler</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(alt.id);
                            }}
                            className={`p-1 ${isFav ? 'text-[#1e3a8a]' : 'text-[#1f1a14]/40 hover:text-[#1e3a8a]'}`}
                          >
                            <span className="material-symbols-outlined text-base">
                              {isFav ? 'favorite' : 'favorite_border'}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
