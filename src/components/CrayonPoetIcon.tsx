import React from 'react';
import { POETS, ALL_COUNTRIES } from '../data/lusophoneData';

export interface CrayonPoetIconProps {
  poetId?: string;
  poetName?: string;
  country?: string;
  countryName?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadgeBorder?: boolean;
}

export const CrayonPoetIcon: React.FC<CrayonPoetIconProps> = ({
  poetId = '',
  poetName = '',
  country: explicitCountry,
  countryName: explicitCountryName,
  size = 'md',
  className = '',
  showBadgeBorder = true,
}) => {
  // 1. Resolve country code from props, or POETS lookup
  let resolvedCountry = (explicitCountry || '').toUpperCase();
  let resolvedCountryName = explicitCountryName || '';

  if (!resolvedCountry) {
    const foundPoet = POETS.find(
      (p) =>
        (poetId && p.id === poetId) ||
        (poetName && p.name.toLowerCase() === poetName.toLowerCase()) ||
        (poetName && p.shortName.toLowerCase() === poetName.toLowerCase())
    );

    if (foundPoet) {
      resolvedCountry = (foundPoet.country || '').toUpperCase();
      resolvedCountryName = foundPoet.countryName;
    }
  }

  // Fallback heuristics for well-known poets if not found
  if (!resolvedCountry) {
    const norm = (poetId || poetName).toLowerCase();
    if (norm.includes('pessoa') || norm.includes('camoes') || norm.includes('dinis') || norm.includes('bocage') || norm.includes('florbela') || norm.includes('taveiros') || norm.includes('codax') || norm.includes('guilhade')) {
      resolvedCountry = 'PT';
      resolvedCountryName = 'Portugal';
    } else if (norm.includes('drummond') || norm.includes('machado') || norm.includes('cecilia') || norm.includes('vinicius') || norm.includes('bandeira') || norm.includes('quintana') || norm.includes('coralina') || norm.includes('kolody') || norm.includes('casimiro') || norm.includes('castro alves') || norm.includes('goncalves dias')) {
      resolvedCountry = 'BR';
      resolvedCountryName = 'Brasil';
    } else if (norm.includes('neto') || norm.includes('ana paula tavares') || norm.includes('pepetela') || norm.includes('bessa victor') || norm.includes('viriatoda cruz') || norm.includes('arlete') || norm.includes('luandino') || norm.includes('alda lara') || norm.includes('mario antonio') || norm.includes('feijoo') || norm.includes('langidila') || norm.includes('deolinda')) {
      resolvedCountry = 'AO';
      resolvedCountryName = 'Angola';
    } else if (norm.includes('craveirinha') || norm.includes('noemia') || norm.includes('mia couto') || norm.includes('rui de noronha') || norm.includes('kalungano') || norm.includes('white') || norm.includes('chiziane') || norm.includes('gloria de santana') || norm.includes('armando artur')) {
      resolvedCountry = 'MZ';
      resolvedCountryName = 'Moçambique';
    } else if (norm.includes('barbosa') || norm.includes('eugenio tavares') || norm.includes('claridade') || norm.includes('manuel lopes') || norm.includes('baltazar lopes') || norm.includes('osvaldo alcantara') || norm.includes('vera duarte') || norm.includes('morazzo') || norm.includes('gabriel mariano') || norm.includes('gabriel-mariano') || norm.includes('filinto')) {
      resolvedCountry = 'CV';
      resolvedCountryName = 'Cabo Verde';
    } else if (norm.includes('cabral') || norm.includes('semedo') || norm.includes('helbi') || norm.includes('proenca') || norm.includes('sila') || norm.includes('pina') || norm.includes('regalla') || norm.includes('samy')) {
      resolvedCountry = 'GW';
      resolvedCountryName = 'Guiné-Bissau';
    } else if (norm.includes('tenreiro') || norm.includes('espirito santo') || norm.includes('mantero') || norm.includes('alde') || norm.includes('conceicao lima') || norm.includes('beja') || norm.includes('veiga') || norm.includes('braganca') || norm.includes('anjos')) {
      resolvedCountry = 'ST';
      resolvedCountryName = 'São Tomé e Príncipe';
    } else if (norm.includes('gusmao') || norm.includes('sylvan') || norm.includes('borja da costa') || norm.includes('inacio de moura') || norm.includes('busa metan') || norm.includes('cardoso') || norm.includes('crisodio') || norm.includes('araujo')) {
      resolvedCountry = 'TL';
      resolvedCountryName = 'Timor-Leste';
    } else if (norm.includes('pessanha') || norm.includes('barreto') || norm.includes('rosalia')) {
      resolvedCountry = 'MO';
      resolvedCountryName = 'Macau, Goa & Galiza';
    } else if (norm.includes('rumi') || norm.includes('hafez') || norm.includes('khayyam') || norm.includes('attar') || norm.includes('ferdusi')) {
      resolvedCountry = 'IR';
      resolvedCountryName = 'Pérsia';
    } else if (norm.includes('baudelaire') || norm.includes('rimbaud') || norm.includes('verlaine') || norm.includes('mallarme') || norm.includes('valery')) {
      resolvedCountry = 'FR';
      resolvedCountryName = 'França';
    } else if (norm.includes('dante') || norm.includes('petrarca') || norm.includes('leopardi') || norm.includes('ungaretti') || norm.includes('montale')) {
      resolvedCountry = 'IT';
      resolvedCountryName = 'Itália';
    } else if (norm.includes('lorca') || norm.includes('quevedo') || norm.includes('gongora') || norm.includes('machado')) {
      resolvedCountry = 'ES';
      resolvedCountryName = 'Espanha';
    } else if (norm.includes('goethe') || norm.includes('rilke') || norm.includes('holderlin') || norm.includes('heine')) {
      resolvedCountry = 'DE';
      resolvedCountryName = 'Alemanha';
    } else if (norm.includes('safo') || norm.includes('homero') || norm.includes('kavafis') || norm.includes('elytis')) {
      resolvedCountry = 'GR';
      resolvedCountryName = 'Grécia';
    } else if (norm.includes('shakespeare') || norm.includes('keats') || norm.includes('byron') || norm.includes('blake') || norm.includes('milton') || norm.includes('shelley')) {
      resolvedCountry = 'GB';
      resolvedCountryName = 'Reino Unido';
    } else if (norm.includes('dickinson') || norm.includes('whitman') || norm.includes('poe') || norm.includes('frost')) {
      resolvedCountry = 'US';
      resolvedCountryName = 'Estados Unidos';
    } else if (norm.includes('neruda') || norm.includes('mistral')) {
      resolvedCountry = 'CL';
      resolvedCountryName = 'Chile';
    } else {
      resolvedCountry = 'UNIVERSAL';
      resolvedCountryName = 'Universal';
    }
  }

  if (!resolvedCountryName) {
    const cMatch = ALL_COUNTRIES.find((c) => c.code === resolvedCountry);
    resolvedCountryName = cMatch ? cMatch.name : resolvedCountry;
  }

  // Size mapping with aspect ratio fitting heraldic pennant (approx 3:4)
  const sizeMap = {
    xs: 'w-5 h-7',
    sm: 'w-7 h-9',
    md: 'w-9 h-12',
    lg: 'w-12 h-16',
    xl: 'w-16 h-22',
  };

  const dim = sizeMap[size] || sizeMap.md;
  const clipId = `pennant-clip-${resolvedCountry}-${(poetId || poetName || 'icon').replace(/[^a-zA-Z0-9]/g, '')}`;

  // Unique SVG flag contents tailored for each nation within the flâmula
  const renderFlagPattern = (code: string) => {
    switch (code) {
      // 1. PORTUGAL (Verde & Rubro com Esfera Armilar e Escudo)
      case 'PT':
        return (
          <g>
            <rect x="6" y="10" width="18" height="58" fill="#006600" />
            <rect x="24" y="10" width="30" height="58" fill="#CC0000" />
            {/* Esfera Armilar Dourada */}
            <circle cx="24" cy="34" r="7.5" fill="#FFD700" stroke="#B45309" strokeWidth="0.8" />
            <circle cx="24" cy="34" r="5" fill="none" stroke="#FFFFFF" strokeWidth="0.7" />
            <line x1="16.5" y1="34" x2="31.5" y2="34" stroke="#B45309" strokeWidth="0.8" />
            <line x1="24" y1="26.5" x2="24" y2="41.5" stroke="#B45309" strokeWidth="0.8" />
            {/* Escudo Português */}
            <path d="M 21.5 30 L 26.5 30 L 26.5 35 Q 26.5 38 24 39 Q 21.5 38 21.5 35 Z" fill="#FFFFFF" stroke="#003399" strokeWidth="0.6" />
            <circle cx="24" cy="34" r="0.8" fill="#003399" />
          </g>
        );

      // 2. BRASIL (Verde com Losango Amarelo Ouro e Esfera Azul Celeste)
      case 'BR':
        return (
          <g>
            <rect x="6" y="10" width="48" height="58" fill="#009C3B" />
            {/* Losango Ouro */}
            <polygon points="30,17 50,34 30,51 10,34" fill="#FFDF00" stroke="#D97706" strokeWidth="0.7" />
            {/* Esfera Azul Celeste com Faixa Branca */}
            <circle cx="30" cy="34" r="8.5" fill="#002776" stroke="#001844" strokeWidth="0.5" />
            <path d="M 22 35 Q 30 31 38 34" fill="none" stroke="#FFFFFF" strokeWidth="1.4" />
            {/* Constelação do Cruzeiro do Sul */}
            <circle cx="30" cy="37" r="0.7" fill="#FFFFFF" />
            <circle cx="28" cy="35" r="0.5" fill="#FFFFFF" />
            <circle cx="32" cy="35" r="0.5" fill="#FFFFFF" />
          </g>
        );

      // 3. ANGOLA (Rubro e Negro com Catana, Meia-Engrenagem e Estrela Ouro)
      case 'AO':
        return (
          <g>
            <rect x="6" y="10" width="48" height="29" fill="#CC092F" />
            <rect x="6" y="39" width="48" height="29" fill="#111111" />
            {/* Meia Engrenagem e Catana em Ouro */}
            <circle cx="30" cy="39" r="7.5" fill="none" stroke="#FFD100" strokeWidth="1.8" strokeDasharray="2 1.5" />
            <line x1="24" y1="44" x2="36" y2="34" stroke="#FFD100" strokeWidth="1.8" strokeLinecap="round" />
            <polygon points="30,34 31,37 34,37 31.5,39 32.5,42 30,40 27.5,42 28.5,39 26,37 29,37" fill="#FFD100" />
          </g>
        );

      // 4. MOÇAMBIQUE (Verde, Preto e Amarelo com Triângulo Vermelho, Livro e Estrela)
      case 'MZ':
        return (
          <g>
            <rect x="6" y="10" width="48" height="17" fill="#006600" />
            <rect x="6" y="27" width="48" height="2" fill="#FFFFFF" />
            <rect x="6" y="29" width="48" height="18" fill="#111111" />
            <rect x="6" y="47" width="48" height="2" fill="#FFFFFF" />
            <rect x="6" y="49" width="48" height="19" fill="#FFD100" />
            {/* Triângulo Rubro */}
            <polygon points="6,10 26,38 6,66" fill="#D21034" />
            {/* Estrela Dourada & Livro da Poesia */}
            <polygon points="13,33 14,35 16,35 14.5,36.5 15,38.5 13,37 11,38.5 11.5,36.5 10,35 12,35" fill="#FFD100" />
            <rect x="11" y="38" width="4" height="2.5" fill="#FFFFFF" rx="0.5" />
          </g>
        );

      // 5. CABO VERDE (Azul Oceano com Faixas e Anel de Estrelas Douradas)
      case 'CV':
        return (
          <g>
            <rect x="6" y="10" width="48" height="58" fill="#003893" />
            <rect x="6" y="36" width="48" height="3" fill="#FFFFFF" />
            <rect x="6" y="39" width="48" height="3" fill="#CF142B" />
            <rect x="6" y="42" width="48" height="3" fill="#FFFFFF" />
            {/* Círculo das 10 Ilhas em Estrelas Douradas */}
            <circle cx="22" cy="40.5" r="7.5" fill="none" stroke="#FFD100" strokeWidth="1" strokeDasharray="1.2 2" />
          </g>
        );

      // 6. GUINÉ-BISSAU (Barra Rubra com Estrela Negra e Faixas Amarela e Verde)
      case 'GW':
        return (
          <g>
            <rect x="6" y="10" width="16" height="58" fill="#CE1126" />
            <rect x="22" y="10" width="32" height="29" fill="#FCD116" />
            <rect x="22" y="39" width="32" height="29" fill="#007A3D" />
            {/* Estrela Negra Africana */}
            <polygon points="14,34 15,37 18,37 15.5,39 16.5,42 14,40 11.5,42 12.5,39 10,37 13,37" fill="#111111" />
          </g>
        );

      // 7. SÃO TOMÉ E PRÍNCIPE (Verde e Amarelo com Triângulo Rubro e 2 Estrelas Negras)
      case 'ST':
        return (
          <g>
            <rect x="6" y="10" width="48" height="16" fill="#12AD2B" />
            <rect x="6" y="26" width="48" height="24" fill="#FFCE00" />
            <rect x="6" y="50" width="48" height="18" fill="#12AD2B" />
            <polygon points="6,10 20,38 6,66" fill="#D21034" />
            {/* Duas estrelas negras irmãs */}
            <polygon points="28,34 29,36 31,36 29.5,37.5 30,39.5 28,38 26,39.5 26.5,37.5 25,36 27,36" fill="#111111" />
            <polygon points="38,34 39,36 41,36 39.5,37.5 40,39.5 38,38 36,39.5 36.5,37.5 35,36 37,36" fill="#111111" />
          </g>
        );

      // 8. TIMOR-LESTE (Vermelho com Triângulo Amarelo, Negro e Estrela da Guia)
      case 'TL':
        return (
          <g>
            <rect x="6" y="10" width="48" height="58" fill="#DC241F" />
            <polygon points="6,10 32,38 6,66" fill="#FFC72C" />
            <polygon points="6,14 24,38 6,62" fill="#111111" />
            {/* Estrela Branca de 5 Pontas */}
            <polygon points="14,33 15,36 18,36 15.5,38 16.5,41 14,39 11.5,41 12.5,38 10,36 13,36" fill="#FFFFFF" />
          </g>
        );

      // 9. MACAU / GALIZA / GOA (MO)
      case 'MO':
        return (
          <g>
            <rect x="6" y="10" width="48" height="58" fill="#007A5E" />
            {/* Flor de Lótus Alva e Arco de Estrelas */}
            <path d="M 30 28 C 26 34 24 38 24 42 Q 30 40 36 42 C 36 38 34 34 30 28 Z" fill="#FFFFFF" />
            <path d="M 22 36 Q 26 39 30 42" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
            <path d="M 38 36 Q 34 39 30 42" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
            <circle cx="30" cy="24" r="1.5" fill="#FFDF00" />
          </g>
        );

      // 10. PÉRSIA / IRÃ (IR) (Verde, Branco e Rubro com Emblema Central)
      case 'IR':
        return (
          <g>
            <rect x="6" y="10" width="48" height="19" fill="#239F40" />
            <rect x="6" y="29" width="48" height="19" fill="#FFFFFF" />
            <rect x="6" y="48" width="48" height="20" fill="#DA0000" />
            {/* Tulipa Heráldica da Pérsia */}
            <circle cx="30" cy="38" r="5" fill="none" stroke="#DA0000" strokeWidth="1.2" />
            <line x1="30" y1="32" x2="30" y2="44" stroke="#DA0000" strokeWidth="1.4" />
          </g>
        );

      // 11. FRANÇA (FR) (Tricolore Azul, Branco e Vermelho)
      case 'FR':
        return (
          <g>
            <rect x="6" y="10" width="16" height="58" fill="#002395" />
            <rect x="22" y="10" width="16" height="58" fill="#FFFFFF" />
            <rect x="38" y="10" width="16" height="58" fill="#ED2939" />
            {/* Flor-de-lis sutil */}
            <path d="M 30 33 C 28 35 27 38 27 41 Q 30 39 33 41 C 33 38 32 35 30 33 Z" fill="#FFD700" opacity="0.9" />
          </g>
        );

      // 12. ITÁLIA (IT) (Tricolore Verde, Branco e Vermelho)
      case 'IT':
        return (
          <g>
            <rect x="6" y="10" width="16" height="58" fill="#009246" />
            <rect x="22" y="10" width="16" height="58" fill="#FFFFFF" />
            <rect x="38" y="10" width="16" height="58" fill="#CE2B37" />
            {/* Coroa de Louros Clássica da Poesia Latina */}
            <circle cx="30" cy="37" r="4.5" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="1.5 1" />
          </g>
        );

      // 13. ESPANHA (ES) (Vermelho e Ouro com Brasão)
      case 'ES':
        return (
          <g>
            <rect x="6" y="10" width="48" height="14" fill="#AA151B" />
            <rect x="6" y="24" width="48" height="28" fill="#F1BF00" />
            <rect x="6" y="52" width="48" height="16" fill="#AA151B" />
            {/* Brasão Espanhol */}
            <rect x="20" y="32" width="8" height="10" rx="1" fill="#AA151B" stroke="#991B1B" strokeWidth="0.6" />
            <circle cx="24" cy="30" r="1.5" fill="#AA151B" />
          </g>
        );

      // 14. ALEMANHA (DE) (Preto, Vermelho e Ouro)
      case 'DE':
        return (
          <g>
            <rect x="6" y="10" width="48" height="19" fill="#111111" />
            <rect x="6" y="29" width="48" height="19" fill="#DD0000" />
            <rect x="6" y="48" width="48" height="20" fill="#FFCC00" />
          </g>
        );

      // 15. GRÉCIA (GR) (Listras Azuis e Brancas com Cruz de São Jorge)
      case 'GR':
        return (
          <g>
            {/* 9 Listras azuis e brancas */}
            <rect x="6" y="10" width="48" height="58" fill="#0D5EAF" />
            <line x1="6" y1="16" x2="54" y2="16" stroke="#FFFFFF" strokeWidth="3" />
            <line x1="6" y1="23" x2="54" y2="23" stroke="#FFFFFF" strokeWidth="3" />
            <line x1="6" y1="30" x2="54" y2="30" stroke="#FFFFFF" strokeWidth="3" />
            <line x1="6" y1="37" x2="54" y2="37" stroke="#FFFFFF" strokeWidth="3" />
            <line x1="6" y1="44" x2="54" y2="44" stroke="#FFFFFF" strokeWidth="3" />
            <line x1="6" y1="51" x2="54" y2="51" stroke="#FFFFFF" strokeWidth="3" />
            {/* Cantão com Cruz */}
            <rect x="6" y="10" width="22" height="22" fill="#0D5EAF" />
            <rect x="15" y="10" width="4" height="22" fill="#FFFFFF" />
            <rect x="6" y="19" width="22" height="4" fill="#FFFFFF" />
          </g>
        );

      // 16. REINO UNIDO (GB) (Union Flag / Cruz de São Jorge e Santo André)
      case 'GB':
        return (
          <g>
            <rect x="6" y="10" width="48" height="58" fill="#012169" />
            {/* Diagonais */}
            <line x1="6" y1="10" x2="54" y2="68" stroke="#FFFFFF" strokeWidth="6" />
            <line x1="54" y1="10" x2="6" y2="68" stroke="#FFFFFF" strokeWidth="6" />
            <line x1="6" y1="10" x2="54" y2="68" stroke="#C8102E" strokeWidth="2.5" />
            <line x1="54" y1="10" x2="6" y2="68" stroke="#C8102E" strokeWidth="2.5" />
            {/* Cruz Central */}
            <rect x="25" y="10" width="10" height="58" fill="#FFFFFF" />
            <rect x="6" y="33" width="48" height="10" fill="#FFFFFF" />
            <rect x="27" y="10" width="6" height="58" fill="#C8102E" />
            <rect x="6" y="35" width="48" height="6" fill="#C8102E" />
          </g>
        );

      // 17. ESTADOS UNIDOS (US) (Listras Rubras e Alvas com Cantão Estrelado)
      case 'US':
        return (
          <g>
            <rect x="6" y="10" width="48" height="58" fill="#B22234" />
            <line x1="6" y1="15" x2="54" y2="15" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="6" y1="21" x2="54" y2="21" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="6" y1="27" x2="54" y2="27" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="6" y1="33" x2="54" y2="33" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="6" y1="39" x2="54" y2="39" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="6" y1="45" x2="54" y2="45" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="6" y1="51" x2="54" y2="51" stroke="#FFFFFF" strokeWidth="2.5" />
            {/* Cantão Azul */}
            <rect x="6" y="10" width="22" height="24" fill="#3C3B6E" />
            <circle cx="11" cy="15" r="0.8" fill="#FFFFFF" />
            <circle cx="17" cy="15" r="0.8" fill="#FFFFFF" />
            <circle cx="14" cy="19" r="0.8" fill="#FFFFFF" />
            <circle cx="11" cy="23" r="0.8" fill="#FFFFFF" />
            <circle cx="17" cy="23" r="0.8" fill="#FFFFFF" />
          </g>
        );

      // 18. CHILE (CL) (Azul com Estrela Solitária, Branco e Vermelho)
      case 'CL':
        return (
          <g>
            <rect x="6" y="10" width="48" height="28" fill="#FFFFFF" />
            <rect x="6" y="38" width="48" height="30" fill="#D52B1E" />
            <rect x="6" y="10" width="20" height="28" fill="#0039A6" />
            <polygon points="16,19 17,22 20,22 17.5,24 18.5,27 16,25 13.5,27 14.5,24 12,22 15,22" fill="#FFFFFF" />
          </g>
        );

      // PADRÃO / UNIVERSAL (Azul Celeste com Rosa dos Ventos e Coroa de Ouro da Lírica Eterna)
      default:
        return (
          <g>
            <rect x="6" y="10" width="48" height="58" fill="#1E3A8A" />
            {/* Círculo de Ouro e Louros */}
            <circle cx="30" cy="38" r="9" fill="none" stroke="#F59E0B" strokeWidth="1.2" />
            <polygon points="30,28 32,35 39,38 32,41 30,48 28,41 21,38 28,35" fill="#F59E0B" />
            <circle cx="30" cy="38" r="2" fill="#FFFFFF" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none group transition-transform duration-200 hover:scale-110 ${dim} ${className}`}
      title={`${poetName || poetId || 'Poeta'} — ${resolvedCountryName} (${resolvedCountry})`}
    >
      <svg
        viewBox="0 0 60 76"
        className="w-full h-full drop-shadow-sm overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Definição do formato da Flâmula Heráldica Medieval com cauda entalhada swallowtail */}
          <clipPath id={clipId}>
            <path d="M 6 10 L 54 10 L 54 66 L 30 55 L 6 66 Z" />
          </clipPath>

          {/* Gradiente de iluminação sobre o tecido da flâmula */}
          <linearGradient id={`sheen-${clipId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="55%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
          </linearGradient>

          {/* Sombra de dobra central vertical da flâmula */}
          <linearGradient id={`fold-${clipId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.16" />
          </linearGradient>
        </defs>

        {/* 1. Mastro / Travessão Heráldico Superior em Bronze e Ouro Antigo */}
        <g className="flag-finial-bar">
          {/* Barra de suspensão */}
          <rect x="3" y="6" width="54" height="4" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="0.8" />
          {/* Ponteira esquerda dourada */}
          <circle cx="3" cy="8" r="2.8" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
          {/* Ponteira direita dourada */}
          <circle cx="57" cy="8" r="2.8" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
          {/* Anel de fixação central */}
          <circle cx="30" cy="5" r="2" fill="none" stroke="#D97706" strokeWidth="1" />
        </g>

        {/* 2. Bandeira Nacional recortada no formato da Flâmula Heráldica */}
        <g clipPath={`url(#${clipId})`}>
          {renderFlagPattern(resolvedCountry)}

          {/* Camada de brilho e textura de iluminura */}
          <rect x="6" y="10" width="48" height="58" fill={`url(#sheen-${clipId})`} />
          <rect x="6" y="10" width="48" height="58" fill={`url(#fold-${clipId})`} />

          {/* Linha de vinco vertical sutil */}
          <line x1="30" y1="10" x2="30" y2="55" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" />
        </g>

        {/* 3. Borda e Contorno Dourado da Flâmula */}
        <path
          d="M 6 10 L 54 10 L 54 66 L 30 55 L 6 66 Z"
          fill="none"
          stroke={showBadgeBorder ? "#B45309" : "rgba(180, 83, 9, 0.4)"}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Filete interno de ouro de iluminura */}
        <path
          d="M 8 12 L 52 12 L 52 63 L 30 53 L 8 63 Z"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="0.6"
          strokeOpacity="0.75"
        />

        {/* Franjas douradas na ponta entalhada inferior */}
        <line x1="6" y1="67" x2="6" y2="69" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="54" y1="67" x2="54" y2="69" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="30" y1="56" x2="30" y2="58" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export const HeraldicFlagIcon = CrayonPoetIcon;
