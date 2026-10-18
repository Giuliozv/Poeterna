import { Poet, Poem, Anthology, CountryInfo } from '../types';
import { WORLD_POETS_PART_1, WORLD_POEMS_PART_1 } from './worldPoetsPart1';
import { WORLD_POETS_PART_2, WORLD_POEMS_PART_2 } from './worldPoetsPart2';
import { WORLD_POETS_PART_3, WORLD_POEMS_PART_3 } from './worldPoetsPart3';
import { LUSOPHONE_EXT_POETS, LUSOPHONE_EXT_POEMS } from './lusophonePoetsExt';
import { AFRICAN_AND_TIMORESE_POETS, AFRICAN_AND_TIMORESE_POEMS } from './africanAndTimoresePoets';

export const ASSET_IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzVbs4KntRte3PK6vduuYO15YhO8ybIWxmd1aQRiJWAzm1JrUPiYjs77ODLFitVg07BOnJ3yQRGMHPHMPCcJgs2ldfwY2DqBpFEEoS0DvLL0MyT_h07BPmFzr3xz3Ty9_FXZswJF7tlFAHee-70cu-ZGoVgq3kOGw4ISS1BsuXlFN4JKzBaSJP92AcDD7AbENEF10uqmgjZwFEsKyxR73Wuvv1ORE70YQU0V9HavW25OUb2z-EK4Mj4P2q6LJJUem2XijHfsf2I9s',
  illustrationHeader: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHpCDai7uoSSyTt2WloNP5jr8vLPa1IJHn4bWjghNWjMsjXkrjqBFhcTx28IwZbJ1AIjBohjl13M3-Pt7G0qyPql8te3M-iPHUvpQQ0uR_uLbEk1CTZOQPP-40tKbqJPW1EP56o0b5zMu2KhEzXMorXWb6tp-1HDWniGWKBekTFmmJNk-XBdcgZ8JIHLAj3QDDCqpc7sE9Ft33NC6aUAzsMmShsBYngSEKNsfnkf0DAPnHzCGzsZeVa91c3PUMGI-VeACfJnH1sx4',
  blackboardPoetry: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs-rea-3jd-LKmteuSgZUn2hGMWqeSylgzT-U6lyei6asTGtfzkI4a3SYZg4pPq3WBd1DYUENkYnIYeARkECcQIha6B8VzDCMMRsmKG76NV0pLOgX9GWB5Vm3462PkB4NP0JXOiTlH1s16JAI46-GoZvVQY2whvcLvqCZ81xuK2L0YHA9F3g5wbkefRcRphCzrkQpHqPCpNnOYWttHbNF4a6VQ-hzMsVcm3Xhl0V0wwF1eDiouPiQYRdjIpkIWQqPgZ58Z2PD7YzU',
  quoteBackground: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMk63PK2pHzHNpLskkwJNpGAflxMHnXUk2QbiU5SC3CIm5YJS4kMh00hiOOESe89q54Os0wjDBqmHdYyfwDK40u6BKHlCDet9N7aZt7YBnyB9Ur4SMqSPuYpw4scSWEvIp4jG2DASGSlNhxAHzxdiHmVtLyo5_ObJmy3QkVFaN0ZXRj_vhvJchAD8q3T-C_bmh9o-Zb7bSItFmQcdS4hYmaGM6oiWNGCDRW6LhkD1q2XlKn4L8sAuZzxdSw3F_FTJbP_EiMP7qf80',
};

export const LUSOPHONE_COUNTRIES: CountryInfo[] = [
  {
    code: 'PT',
    name: 'Portugal',
    flag: '🇵🇹',
    capital: 'Lisboa',
    description: 'Berço do fado, do Trovadorismo e das epopeias de Camões. Uma tradição poética marcada pela nostalgia, pelo oceano e pelo fado.',
    poetsCount: 142
  },
  {
    code: 'BR',
    name: 'Brasil',
    flag: '🇧🇷',
    capital: 'Brasília',
    description: 'Do esplendor do Romantismo com Gonçalves Dias, Casimiro de Abreu e Castro Alves ao lirismo marcante de Cecília Meireles, Helena Kolody, Cora Coralina e Drummond.',
    poetsCount: 188
  },
  {
    code: 'AO',
    name: 'Angola',
    flag: '🇦🇴',
    capital: 'Luanda',
    description: 'Vozes marcadas pela libertação, pelas terras rubras angolanas e pelos ritmos ancestrais de Agostinho Neto, Alda Lara, Viriato da Cruz, Mário António, Paula Tavares, Lopito Feijóo e Pepetela.',
    poetsCount: 75
  },
  {
    code: 'MZ',
    name: 'Moçambique',
    flag: '🇲🇿',
    capital: 'Maputo',
    description: 'Lirismo fervoroso de afirmação cultural, do oceano Índico e libertação com José Craveirinha, Noémia de Sousa, Rui de Noronha, Mia Couto, Eduardo White, Kalungano e Paulina Chiziane.',
    poetsCount: 65
  },
  {
    code: 'CV',
    name: 'Cabo Verde',
    flag: '🇨🇻',
    capital: 'Praia',
    description: 'A poesia da morna, do mar imenso, do isolamento e do regresso. Eternizada por Eugénio Tavares, Jorge Barbosa, Baltasar Lopes, Corsino Fortes, Vera Duarte, Yolanda Morazzo e Arménio Vieira.',
    poetsCount: 58
  },
  {
    code: 'GW',
    name: 'Guiné-Bissau',
    flag: '🇬🇼',
    capital: 'Bissau',
    description: 'Tradições orais e bolanhas entrelaçadas à língua portuguesa e ao crioulo em cantares de memória de Amílcar Cabral, Vasco Cabral, Odete Semedo, Abdulai Sila, Tony Tcheca e Conduto de Pina.',
    poetsCount: 38
  },
  {
    code: 'ST',
    name: 'São Tomé e Príncipe',
    flag: '🇸🇹',
    capital: 'São Tomé',
    description: 'Cânticos das roças, das praias tropicais e da dignidade insular com Francisco José Tenreiro, Alda do Espírito Santo, Conceição Lima (1961–2026), Olinda Beja, Marcelo da Veiga e Albertino Bragança.',
    poetsCount: 40
  },
  {
    code: 'TL',
    name: 'Timor-Leste',
    flag: '🇹🇱',
    capital: 'Díli',
    description: 'A voz insubmissa das montanhas sagradas do Ramelau e do mar de Timor com Francisco Borja da Costa, Xanana Gusmão, Fernando Sylvan, Afonso Busa Metan, Luís Cardoso e Crisódio de Araújo.',
    poetsCount: 32
  },
  {
    code: 'MO',
    name: 'Macau, Goa & Galiza',
    flag: '🇲🇴',
    capital: 'Macau / Pangim / Santiago',
    description: 'Territórios de histórica herança lusófona e raiz galaico-portuguesa, eternizados por Camilo Pessanha, Adeodato Barreto e Rosalía de Castro.',
    poetsCount: 18
  }
];

export const WORLD_COUNTRIES: CountryInfo[] = [
  {
    code: 'IR',
    name: 'Pérsia (Irã)',
    flag: '🇮🇷',
    capital: 'Teerão',
    description: 'A esplêndida lírica mística e épica da Pérsia com Farid al-Din Attar, Jalal ad-Din Rumi, Hafez, Khayyam e Ferdusi.',
    poetsCount: 65
  },
  {
    code: 'FR',
    name: 'França',
    flag: '🇫🇷',
    capital: 'Paris',
    description: 'Berço do Simbolismo, do Romantismo e do Surrealismo. De François Villon e Baudelaire a Rimbaud, Verlaine e Victor Hugo.',
    poetsCount: 120
  },
  {
    code: 'ES',
    name: 'Espanha',
    flag: '🇪🇸',
    capital: 'Madrid',
    description: 'A riqueza da Geração de 98 e de 27 com Federico García Lorca, Antonio Machado, Góngora e San Juan de la Cruz.',
    poetsCount: 95
  },
  {
    code: 'IT',
    name: 'Itália',
    flag: '🇮🇹',
    capital: 'Roma',
    description: 'Berço do Humanismo e do Renascimento com A Divina Comédia de Dante Alighieri, Petrarca e Giuseppe Ungaretti.',
    poetsCount: 85
  },
  {
    code: 'GB',
    name: 'Reino Unido',
    flag: '🇬🇧',
    capital: 'Londres',
    description: 'Dos sonetos de Shakespeare e da epopeia de Milton aos Românticos (Byron, Keats, Blake) e ao Modernismo de T. S. Eliot.',
    poetsCount: 130
  },
  {
    code: 'US',
    name: 'Estados Unidos',
    flag: '🇺🇸',
    capital: 'Washington, D.C.',
    description: 'Do lirismo livre e transcendental de Walt Whitman e Emily Dickinson à Geração Beat e Poesia Confessional.',
    poetsCount: 110
  },
  {
    code: 'DE',
    name: 'Alemanha',
    flag: '🇩🇪',
    capital: 'Berlim',
    description: 'O lirismo de Johann Wolfgang von Goethe, Friedrich Hölderlin, Rainer Maria Rilke e Paul Celan.',
    poetsCount: 90
  },
  {
    code: 'RU',
    name: 'Rússia',
    flag: '🇷🇺',
    capital: 'Moscovo',
    description: 'A Idade de Ouro e de Prata da lírica russa: Alexander Pushkin, Anna Akhmátova, Vladimir Maiakovski e Boris Pasternak.',
    poetsCount: 78
  },
  {
    code: 'CL',
    name: 'Chile',
    flag: '🇨🇱',
    capital: 'Santiago',
    description: 'Terra dos Prémios Nobel da Poesia: o lirismo apaixonado de Pablo Neruda e Gabriela Mistral e a antipoesia de Nicanor Parra.',
    poetsCount: 50
  },
  {
    code: 'GR',
    name: 'Grécia',
    flag: '🇬🇷',
    capital: 'Atenas',
    description: 'A nascente clássica e moderna do Mediterrâneo com Homero, Safo, Konstantínos Kaváfis e Odysséas Elýtis.',
    poetsCount: 45
  },
  {
    code: 'JP',
    name: 'Japão',
    flag: '🇯🇵',
    capital: 'Tóquio',
    description: 'A delicada contemplação zen e síntese poética nos Haikus imperceteis de Matsuo Bashō, Yosa Buson e Kobayashi Issa.',
    poetsCount: 40
  }
];

export const ALL_COUNTRIES: CountryInfo[] = [...LUSOPHONE_COUNTRIES, ...WORLD_COUNTRIES];
export const COUNTRIES: CountryInfo[] = ALL_COUNTRIES;

const BASE_POETS: Poet[] = [
  {
    id: 'fernando-pessoa',
    name: 'Fernando Pessoa',
    shortName: 'F. Pessoa',
    country: 'PT',
    countryName: 'Portugal',
    period: 'Modernismo',
    years: '1888 — 1935',
    bio: 'Um dos maiores poetas da língua portuguesa. Desdobrou-se em heterónimos geniais como Alberto Caeiro, Álvaro de Campos e Ricardo Reis.',
    famousQuote: 'Navegar é preciso; viver não é preciso.',
    featured: true,
    copyrightStatus: 'Domínio Público'
  },
  {
    id: 'luis-vaz-camoes',
    name: 'Luís Vaz de Camões',
    shortName: 'L. Camões',
    country: 'PT',
    countryName: 'Portugal',
    period: 'Renascimento',
    years: '1524 — 1580',
    bio: 'Autor da grande epopeia Os Lusíadas e de lírica amorosa inigualável em sonetos perpétuos.',
    famousQuote: 'Amor é um fogo que arde sem se ver;',
    featured: true,
    copyrightStatus: 'Domínio Público'
  },
  {
    id: 'carlos-drummond',
    name: 'Carlos Drummond de Andrade',
    shortName: 'C. Drummond',
    country: 'BR',
    countryName: 'Brasil',
    period: 'Modernismo',
    years: '1902 — 1987',
    bio: 'Expoente da poesia brasileira do século XX. Retratou a dor do mundo e a delicadeza cotidiana de Itabira.',
    famousQuote: 'E agora, José? A festa acabou, a luz apagou...',
    featured: true,
    copyrightStatus: 'Direitos Autorais Reservados'
  },
  {
    id: 'cecilia-meireles',
    name: 'Cecília Meireles',
    shortName: 'C. Meireles',
    country: 'BR',
    countryName: 'Brasil',
    period: 'Neosimbolismo',
    years: '1901 — 1964',
    bio: 'Poetisa e educadora brasileira, mestre da musicalidade, da impermanência e do lirismo introspectivo.',
    famousQuote: 'Eu não tinha este rosto de hoje, assim calmo, assim triste, assim magro...',
    featured: true,
    copyrightStatus: 'Direitos Autorais Reservados'
  },
  {
    id: 'jose-craveirinha',
    name: 'José Craveirinha',
    shortName: 'J. Craveirinha',
    country: 'MZ',
    countryName: 'Moçambique',
    period: 'Contemporâneo',
    years: '1922 — 2003',
    bio: 'Primeiro autor africano galardoado com o Prémio Camões. Voz maior da afirmação e dignidade moçambicana.',
    famousQuote: 'Quero ser tambor. Nem teclar de máquina de escrever...',
    featured: true,
    copyrightStatus: 'Direitos Autorais Reservados'
  },
  {
    id: 'florbela-espanca',
    name: 'Florbela Espanca',
    shortName: 'F. Espanca',
    country: 'PT',
    countryName: 'Portugal',
    period: 'Simbolismo / Neorromantismo',
    years: '1894 — 1930',
    bio: 'Pioneira do feminismo literário em Portugal, célebre pela paixão arrebatadora e melancólica dos seus sonetos.',
    famousQuote: 'Eu quero amar, amar perdidamente! Amar só por amar...',
    featured: true,
    copyrightStatus: 'Domínio Público'
  },
  {
    id: 'agostinho-neto',
    name: 'Agostinho Neto',
    shortName: 'A. Neto',
    country: 'AO',
    countryName: 'Angola',
    period: 'Contemporâneo',
    years: '1922 — 1979',
    bio: 'Poeta, médico e líder de Angola. A sua poesia é um manifesto de esperança e reconstrução africana.',
    famousQuote: 'Não basta que a nossa causa seja justa e pura...',
    featured: true,
    copyrightStatus: 'Direitos Autorais Reservados'
  },
  {
    id: 'jorge-barbosa',
    name: 'Jorge Barbosa',
    shortName: 'J. Barbosa',
    country: 'CV',
    countryName: 'Cabo Verde',
    period: 'Claridade',
    years: '1902 — 1971',
    bio: 'Fundador da revista Claridade e pioneiro da moderna literatura cabo-verdiana.',
    famousQuote: 'Esta tristeza sem razão de ser que vem de longe, de muito longe...',
    featured: true,
    copyrightStatus: 'Direitos Autorais Reservados'
  },
  {
    id: 'rilke',
    name: 'Rainer Maria Rilke',
    shortName: 'R. M. Rilke',
    country: 'DE',
    countryName: 'Alemanha',
    period: 'Lirismo Alemão',
    years: '1875 — 1926',
    bio: 'Grande mestre da poesia expressionista e lírica de língua alemã, autor de "Elegias de Duino" e "Sonetos a Orfeu".',
    famousQuote: 'A beleza é apenas o começo do terror que ainda somos capazes de suportar.',
    featured: false,
    copyrightStatus: 'Domínio Público'
  },
  {
    id: 'attar',
    name: 'Farid al-Din Attar',
    shortName: 'F. Attar',
    country: 'IR',
    countryName: 'Pérsia (Irã)',
    period: 'Mística Sufi / Poesia Persa',
    years: '1145 — 1221',
    bio: 'Farid al-Din Attar (Nishapur, Pérsia, atual Irã) foi um dos maiores poetas e mestres místicos do Sufismo. Boticário e médico de profissão (daí a alcunha Attar, "o perfumista"), atendia e escutava os doentes na sua loja enquanto desenvolvia a sua busca espiritual. Após uma profunda revelação interior, renunciou aos bens materiais e dedicou-se à poesia mística. Autor da célebre obra "A Linguagem dos Pássaros" (Mantiq al-Tayr) e das "Biografias dos Santos Sufis" (Tadhkirat al-Auliya), influenciou mestres como Rumi e toda a lírica universal.',
    famousQuote: 'A alma é como um espelho limpo que reflete o invisível.',
    featured: false,
    copyrightStatus: 'Domínio Público'
  }
];

// Helper para garantir unicidade estrita de itens por identificador (ID)
function deduplicateById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export const POETS: Poet[] = deduplicateById([
  ...BASE_POETS,
  ...LUSOPHONE_EXT_POETS,
  ...AFRICAN_AND_TIMORESE_POETS,
  ...WORLD_POETS_PART_1,
  ...WORLD_POETS_PART_2,
  ...WORLD_POETS_PART_3
]);

export const FEATURED_POEM: Poem = {
  id: 'mar-portugues',
  title: 'Mar Português',
  poetId: 'fernando-pessoa',
  poetName: 'Fernando Pessoa',
  country: 'PT',
  countryName: 'Portugal',
  year: '1934',
  location: 'Lisboa',
  era: 'Modernismo',
  theme: 'Nostalgia, Destino e Oceano',
  stanzas: [
    'Ó mar salgado, quanto do teu sal',
    'São lágrimas de Portugal!',
    'Por te cruzarmos, quantas mães choraram,',
    'Quantos filhos em vão rezaram!',
    'Quantas noivas ficaram por casar',
    'Para que fosses nosso, ó mar!',
    '',
    'Valeu a pena? Tudo vale a pena',
    'Se a alma não é pequena.',
    'Quem quer passar além do Bojador',
    'Tem que passar além da dor.',
    'Deus ao mar o perigo e o abismo deu,',
    'Mas nele é que espelhou o céu.'
  ],
  analysis: 'Publicado na obra Mensagem (1934), este poema condensa o sacrifício coletivo dos descobrimentos portugueses. A frase "Tudo vale a pena se a alma não é pequena" tornou-se um dos aforismos mais universais da lusofonia.',
  copyrightStatus: 'Domínio Público',
};

const BASE_POEMS: Poem[] = [
  FEATURED_POEM,
  {
    id: 'amor-e-fogo',
    title: 'Amor É um Fogo que Arde sem Se Ver',
    poetId: 'luis-vaz-camoes',
    poetName: 'Luís Vaz de Camões',
    country: 'PT',
    countryName: 'Portugal',
    year: '1595',
    location: 'Lisboa',
    era: 'Clássicos',
    theme: 'Amor e Contradição',
    stanzas: [
      'Amor é um fogo que arde sem se ver;',
      'É ferida que dói, e não se sente;',
      'É um contentamento descontentado;',
      'É dor que desatina sem doer.',
      '',
      'É um não querer mais que bem querer;',
      'É um andar solitário entre a gente;',
      'É nunca contentar-se de contente;',
      'É um cuidar que ganha em se perder.',
      '',
      'É querer estar preso por vontade;',
      'É servir a quem vence, o vencedor;',
      'É ter com quem nos mata, lealdade.',
      '',
      'Mas como causar pode seu favor',
      'Nos corações humanos amizade,',
      'Se tão contrário a si é o mesmo Amor?'
    ],
    analysis: 'Soneto monumental baseado em oxímoros (paradoxos). Camões explora a natureza dupla do amor humano, dividida entre dor, êxtase e devoção.',
    copyrightStatus: 'Domínio Público',
  },
  {
    id: 'no-meio-do-caminho',
    title: 'No Meio do Caminho',
    poetId: 'carlos-drummond',
    poetName: 'Carlos Drummond de Andrade',
    country: 'BR',
    countryName: 'Brasil',
    year: '1928',
    location: 'Rio de Janeiro',
    era: 'Modernismo',
    theme: 'Obstáculos e Existência',
    stanzas: [
      'No meio do caminho tinha uma pedra',
      'tinha uma pedra no meio do caminho',
      'tinha uma pedra',
      'no meio do caminho tinha uma pedra.',
      '',
      'Nunca me esquecerei desse acontecimento',
      'na vida de minhas retinas tão fatigadas.',
      'Nunca me esquecerei que no meio do caminho',
      'tinha uma pedra',
      'tinha uma pedra no meio do caminho',
      'no meio do caminho tinha uma pedra.'
    ],
    analysis: 'Um dos poemas mais célebres e debatidos do Modernismo brasileiro. A pedra simboliza os imprevistos e perplexidades inescapáveis da jornada humana.',
    copyrightStatus: 'Direitos Autorais Reservados',
  },
  {
    id: 'motivo',
    title: 'Motivo',
    poetId: 'cecilia-meireles',
    poetName: 'Cecília Meireles',
    country: 'BR',
    countryName: 'Brasil',
    year: '1939',
    location: 'Rio de Janeiro',
    era: 'Modernismo',
    theme: 'Vocação Poética e Transitoriedade',
    stanzas: [
      'Eu canto porque o instante existe',
      'e a minha vida está completa.',
      'Não sou alegre nem sou triste:',
      'sou poeta.',
      '',
      'Irmão das coisas fugidias,',
      'não sinto gozo nem tormento.',
      'Atravesso noites e dias',
      'no vento.',
      '',
      'Se desfaço ou se edifico,',
      'se permaneço ou me desfaço,',
      '— não sei, não sei. Não sei se fico',
      'ou passo.',
      '',
      'Sei que canto. E a canção é tudo.',
      'Tem sangue eterno a asa ritmada.',
      'E um dia sei que estarei mudo:',
      '— mais nada.'
    ],
    analysis: 'Uma serena declaração de amor à arte da poesia como ato de presença no instante efêmero da vida.',
    copyrightStatus: 'Direitos Autorais Reservados',
  },
  {
    id: 'quero-ser-tambor',
    title: 'Quero Ser Tambor',
    poetId: 'jose-craveirinha',
    poetName: 'José Craveirinha',
    country: 'MZ',
    countryName: 'Moçambique',
    year: '1964',
    location: 'Maputo',
    era: 'Contemporâneos',
    theme: 'Identidade e Ancestralidade',
    stanzas: [
      'Tambor está velho de gritar',
      'ó velho Deus dos homens',
      'põe-me a cantar no tambor.',
      '',
      'Só tambor',
      'vibrando no batuque da minha terra',
      'só tambor ecoando',
      'a voz da noite e do vento!',
      '',
      'Quero ser tambor',
      'e não apenas homem que escuta a noite.',
      'Saber rir e chorar',
      'na linguagem pura da terra!'
    ],
    analysis: 'Craveirinha manifesta o desejo vital de fundir sua própria voz com o ritmo ancestral e coletivo do povo moçambicano.',
    copyrightStatus: 'Direitos Autorais Reservados',
  },
  {
    id: 'amar-perdidamente',
    title: 'Amar!',
    poetId: 'florbela-espanca',
    poetName: 'Florbela Espanca',
    country: 'PT',
    countryName: 'Portugal',
    year: '1923',
    location: 'Évora',
    era: 'Simbolismo',
    theme: 'Amor Absoluto',
    stanzas: [
      'Eu quero amar, amar perdidamente!',
      'Amar só por amar: Aqui... além...',
      'Mais este e aquele, outro e mais alguém!',
      'Amar! Amar! E não amar ninguém!',
      '',
      'Recordar? Esquecer? Indiferente!',
      'Prender ou libertar? É mal? É bem?',
      'Quem disser que se pode amar alguém',
      'Durante a vida inteira é porque mente!',
      '',
      'Há uma primavera em cada vida:',
      'Há que cantá-la florida, e se transborda',
      'Em rosas a vida inteira, assim florido',
      '',
      'O meu coração canta! Amar perdido',
      'Neste mistério doce de viver...'
    ],
    analysis: 'Soneto carregado de paixão, libertação e recusa dos condicionalismos morais do seu tempo.',
    copyrightStatus: 'Domínio Público',
  },
  {
    id: 'criacao',
    title: 'Criar',
    poetId: 'agostinho-neto',
    poetName: 'Agostinho Neto',
    country: 'AO',
    countryName: 'Angola',
    year: '1957',
    location: 'Luanda',
    era: 'Contemporâneos',
    theme: 'Esperança e Futuro',
    stanzas: [
      'Criar amor com olhos secos',
      'Criar esperança na dor',
      'Criar liberdade nas algemas',
      'Criar harmonia no caos.',
      '',
      'Criar a vida onde há morte',
      'Criar o sorriso na lágrima',
      'Criar a força na fraqueza',
      'Criar angolanos novos',
      'livres, fraternais e conscientes.'
    ],
    analysis: 'Poema síntese da resiliência e do poder transformador do afeto e da arte em momentos de opressão.',
    copyrightStatus: 'Direitos Autorais Reservados',
  },
  {
    id: 'poemazinho-do-mar',
    title: 'Poemazinho do Mar',
    poetId: 'jorge-barbosa',
    poetName: 'Jorge Barbosa',
    country: 'CV',
    countryName: 'Cabo Verde',
    year: '1935',
    location: 'Mindelo',
    era: 'Contemporâneos',
    theme: 'Isolamento e Saudade Insular',
    stanzas: [
      'O mar...',
      'este mar que nos cerca',
      'nos prende',
      'nos fascina.',
      '',
      'Caminho aberto para o mundo',
      'ou prisão de água salgada?',
      'O mar é a nossa esperança',
      'e a nossa saudade diária.'
    ],
    analysis: 'Barbosa sintetiza o sentimento de \'morabeza\' e a ambivalência do arquipélago frente ao mar infinito.',
    copyrightStatus: 'Direitos Autorais Reservados',
  },
  {
    id: 'attar-linguagem-dos-passaros',
    title: 'A Linguagem dos Pássaros (A Busca do Simorgh)',
    poetId: 'attar',
    poetName: 'Farid al-Din Attar',
    country: 'IR',
    countryName: 'Pérsia (Irã)',
    year: 'c. 1177',
    location: 'Nishapur',
    era: 'Clássicos',
    theme: 'Mística e Autoconhecimento',
    stanzas: [
      'Trinta pássaros viajaram por sete vales sagrados,',
      'Buscando o Simorgh, o Rei mítico das aves.',
      'Atravessaram o Vale da Busca, do Amor e do Conhecimento,',
      'Suportando a sede, o fogo, o vento e o esgotamento.',
      '',
      'Quando finalmente chegaram ao cume da montanha sagrada,',
      'Com as asas cansadas e a alma purificada,',
      'Olharam no espelho da verdade divina,',
      'E viram que o Simorgh que buscavam no mundo...',
      'Eram eles próprios, os trinta pássaros (\'Si-morgh\').',
      '',
      'Aquele que busca o Divino fora de si,',
      'Mergulha na ilusão e perde o caminho.',
      'Mergulha no teu próprio coração e encontrarás o Rei.'
    ],
    analysis: 'Excerto alegórico de "Mantiq al-Tayr" (A Conferência dos Pássaros), a obra-prima mística de Attar. A palavra "Simorgh" em persa é um trocadilho com "Si Morgh" (trinta pássaros), ensinando que a busca espiritual culmina na descoberta do Divino no fundo do próprio ser.',
    copyrightStatus: 'Domínio Público',
  }
];

export const POEMS: Poem[] = deduplicateById([
  ...BASE_POEMS,
  ...LUSOPHONE_EXT_POEMS,
  ...AFRICAN_AND_TIMORESE_POEMS,
  ...WORLD_POEMS_PART_1,
  ...WORLD_POEMS_PART_2,
  ...WORLD_POEMS_PART_3
]);

export const ANTHOLOGIES: Anthology[] = [
  {
    id: 'acervo-poesia-eterna-marco-dias',
    title: 'acervo A Poesia Eterna (Curadoria Marco Dias)',
    subtitle: 'A herança lírica lusófona reunida em geocities.ws/poesiaeterna',
    description: 'A preciosa coleção organizada por Marco Dias que reúne as vozes líricas de Portugal, Brasil, Angola, Moçambique, Cabo Verde, Galiza e Goa numa só catedral das palavras.',
    iconName: 'menu_book',
    color: '#1e3a8a',
    poemIds: [
      'cecilia-meireles-retrato',
      'cora-coralina-aninha',
      'helena-kolody-pintar',
      'casimiro-oito-anos',
      'goncalves-dias-cancao-do-exilio',
      'castro-alves-navio-negreiro',
      'vinicius-soneto-fidelidade',
      'joao-cabral-tecendo-a-manha',
      'gregorio-de-matos-a-cidade-da-bahia',
      'vicente-de-carvalho-o-pequeno-sonho',
      'affonso-romano-de-santanna-leitura-natural',
      'anibal-beca-suite-amazonica',
      'antonio-cicero-guardar',
      'augusto-de-campos-tudo-esta-dito',
      'augusto-frederico-schmidt-canto-da-noite',
      'auta-de-souza-o-horto',
      'catulo-da-paixao-cearense-luar-do-sertao',
      'cruz-e-sousa-sideracoes',
      'darcy-damasceno-fabula-serena',
      'decio-pignatari-um-movimento',
      'emiliano-perneta-ilusao',
      'emilio-de-menezes-mortalha',
      'fagundes-varela-cantico-do-calvario',
      'fernando-sabino-o-menino-e-a-poesia',
      'goncalves-de-magalhaes-suspiros-poeticos',
      'guilherme-de-almeida-oracao-a-minha-mao',
      'haroldo-de-campos-o-poeta-infinitesimal',
      'helio-pellegrino-a-pedra-e-o-vento',
      'hilda-hilst-jubilo-memoria',
      'guimaraes-rosa-sertao-em-flor',
      'jorge-de-lima-essa-nega-fulo',
      'jorge-tufic-varanda-de-passaros',
      'jose-basilio-da-gama-lindo-ester',
      'jose-paulo-paes-convite',
      'junqueira-freire-hora-do-delirio',
      'ledo-ivo-as-palavras',
      'mario-de-andrade-o-poeta-come-amendoim',
      'mauro-mota-elegia-de-outono',
      'adelia-prado-com-licenca-poetica',
      'claudio-manuel-da-costa-soneto-vii',
      'tomas-antonio-gonzaga-marilia-de-dirceu-lira-i',
      'ferreira-gullar-traduzir-se',
      'torquato-neto-cogito',
      'ana-cristina-cesar-musica-pouco-certa',
      'conceicao-evaristo-recordar-e-preciso',
      'marco-dias-a-poesia-eterna',
      'agostinho-neto-noite',
      'agostinho-neto-civilizacao-ocidental',
      'agostinho-neto-antigamente-era',
      'agostinho-neto-o-choro-de-africa',
      'agostinho-neto-quintandeira',
      'antonio-jacinto-monangamba',
      'antonio-jacinto-carta-de-um-contratado',
      'antonio-jacinto-vadiagem',
      'alexandre-daskalos-carta',
      'antonio-cardoso-arvore-de-frutos',
      'arlindo-barbeitos-em-mao-fragil',
      'arlindo-barbeitos-saudade',
      'costa-andrade-autobiografia',
      'costa-andrade-ja-nao-e',
      'costa-andrade-dadiva',
      'david-mestre-o-sol-nasce-a-oriente',
      'henrique-abranches-ao-bater-da-chuva',
      'joao-maimona-arte-poetica',
      'joao-maimona-as-muralhas-da-noite',
      'joao-maimona-memoria',
      'jofre-rocha-paisagem-do-nordeste',
      'jofre-rocha-quando-a-manha-vier',
      'jose-eduardo-agualusa-uma-voz-que-canta',
      'luandino-vieira-sons',
      'luandino-vieira-cancao-para-luanda',
      'manuel-rui-nao-vale-a-pena-pisar',
      'neves-e-sousa-angolano',
      'neves-e-sousa-lembranca',
      'antonio-pedro-se-houve-engano',
      'antonio-pedro-ode-ao-almada-negreiros',
      'armenio-vieira-isto-e-que-fazem-de-nos',
      'armenio-vieira-mar',
      'armenio-vieira-ser-tigre',
      'corsino-fortes-de-boca-a-barlavento',
      'corsino-fortes-de-boca-concentrica',
      'daniel-filipe-romance-de-tomasinho',
      'daniel-filipe-patria-lugar-de-exilio',
      'daniel-filipe-morna',
      'gabriel-mariano-caminho-longe',
      'gabriel-mariano-unica-dadiva',
      'gabriel-mariano-capitao-ambrosio',
      'luis-romano-simbolo',
      'luis-romano-vida',
      'manuel-lopes-cais',
      'mario-fonseca-viagem-na-noite-longa',
      'onesimo-silveira-as-aguas',
      'onesimo-silveira-quadro',
      'oswaldo-alcantara-filho',
      'oswaldo-osorio-manha-inflor',
      'teobaldo-virginio-rota-longa',
      'terencio-anahory-nha-code',
      'juliao-soares-sousa-cantos-do-meu-pais',
      'tony-tcheca-a-prometida',
      'amilcar-cabral-regresso',
      'vasco-cabral-a-luta-e-a-nossa-vida',
      'almada-negreiros-mae-vem-ouvir',
      'almada-negreiros-a-flor',
      'almada-negreiros-a-noite-rimada',
      'almada-negreiros-rondel-do-alentejo',
      'caetano-costa-alegre-visao',
      'francisco-jose-tenreiro-canto-do-oba',
      'francisco-jose-tenreiro-o-mar',
      'francisco-jose-tenreiro-ciclo-do-alcool',
      'francisco-jose-tenreiro-coracao-em-africa',
      'francisco-jose-tenreiro-ritmo-para-a-joia',
      'alda-espirito-santo-la-no-agua-grande',
      'conceicao-lima-a-dolorosa-raiz',
      'xanana-gusmao-oh-liberdade',
      'xanana-gusmao-geracoes',
      'helder-muteia-nhambaro',
      'sebastiao-alba-a-noite-e-o-desenho',
      'tasso-da-silveira-a-grande-viagem',
      'duarte-de-viveiros-o-cantar-do-arquipelago',
      'antonio-feliciano-castilho-a-primavera',
      'manuel-laranjeira-compreensao',
      'joao-apolinario-a-cidade-de-pedra',
      'millor-fernandes-poesia-matematica',
      'mario-quintana-poeminha-do-contra',
      'manuel-bandeira-auto-retrato',
      'machado-de-assis-soneto-de-natal',
      'chico-buarque-construcao',
      'drummond-mundo-grande',
      'augusto-dos-anjos-psicologia-vencido',
      'alvares-de-azevedo-se-eu-morresse-amanha',
      'alphonsus-guimaraens-ismalia',
      'thiago-de-mello-estatutos-do-homem',
      'rubem-braga-poeta-cristao',
      'raimundo-correia-as-pombas',
      'paulo-leminski-bem-no-fundo',
      'paulo-leminski-amor-bastante',
      'oswald-de-andrade-canto-regresso-patria',
      'oswald-de-andrade-vicio-na-fala',
      'oswald-de-andrade-erro-de-portugues',
      'olavo-bilac-lingua-portuguesa',
      'murilo-mendes-cancao-exilio',
      'murilo-mendes-mulher-piramide',
      'murilo-mendes-reflexao-1'
    ]
  },
  {
    id: 'trovadorismo-galego-portugues',
    title: 'Trovadorismo & Cantigas Medievais',
    subtitle: 'As origens da lírica em língua galego-portuguesa',
    description: 'Do lirismo das Cantigas de Amigo e de Amor de El-Rei D. Dinis e Martin Codax à sátira mordaz das Cantigas de Escárnio e Maldizer.',
    iconName: 'history_edu',
    color: '#065f46',
    poemIds: [
      'd-dinis-flores-do-verde-pino',
      'martin-codax-ondas-do-mar-de-vigo',
      'd-dinis-quer-eu-em-maneira-de-proencal',
      'paio-soares-cantiga-da-ribeirinha',
      'guilhade-ai-dona-feia'
    ]
  },
  {
    id: 'amor-saudade',
    title: 'Amor & Saudade',
    subtitle: 'Os afetos que atravessam os oceanos',
    description: 'Sonetos clássicos, cantigas de amigo e elegias contemporâneas sobre o sentimento mais profundo da língua portuguesa.',
    iconName: 'favorite',
    color: '#8b4513',
    poemIds: ['d-dinis-flores-do-verde-pino', 'bocage-ja-bocage-nao-sou', 'amor-e-fogo', 'amar-perdidamente', 'mar-portugues']
  },
  {
    id: 'mar-viagem',
    title: 'Mar & Navegação',
    subtitle: 'A insularidade e o horizonte além do Bojador',
    description: 'Poemas de travessia, sal, despedidas e o fascínio das marés que unem os continentes lusófonos.',
    iconName: 'sailing',
    color: '#2e5b88',
    poemIds: ['mar-portugues', 'poemazinho-do-mar']
  },
  {
    id: 'resistencia-identidade',
    title: 'Vozes de Resistência',
    subtitle: 'A poesia da libertação e da dignidade',
    description: 'Antologia dos versos de libertação de Angola, Moçambique, Cabo Verde e Brasil que transformaram a palavra em instrumento de luz.',
    iconName: 'campaign',
    color: '#705c30',
    poemIds: ['quero-ser-tambor', 'criacao', 'no-meio-do-caminho']
  },
  {
    id: 'modernismo-lusofono',
    title: 'Modernismo & Vanguardas',
    subtitle: 'As revoluções estéticas de Orpheu, da Semana de 22 e das Vanguardas Universais',
    description: 'Fernando Pessoa, Drummond, Maiakovski, Cecília Meireles e a inovação radical dos ritmos, do verso livre e das reflexões existenciais.',
    iconName: 'auto_stories',
    color: '#5d4e37',
    poemIds: ['mar-portugues', 'maiakovski-a-nuvem-de-calcas', 'maiakovski-escutem-ouvir-estrelas', 'no-meio-do-caminho', 'motivo']
  }
];

export const POETRY_QUOTES = [
  {
    quote: "A Poesia Eterna vive no coração de cada palavra dita e cantada na nossa língua.",
    author: "Marco Dias (geocities.ws/poesiaeterna)"
  },
  {
    quote: "Tudo vale a pena se a alma não é pequena.",
    author: "Fernando Pessoa"
  },
  {
    quote: "Amor é um fogo que arde sem se ver; é ferida que dói, e não se sente.",
    author: "Luís Vaz de Camões"
  },
  {
    quote: "Eu canto porque o instante existe e a minha vida está completa.",
    author: "Cecília Meireles"
  },
  {
    quote: "A poesia é a distância mais curta entre dois seres humanos.",
    author: "Mário Quintana"
  },
  {
    quote: "E agora, José? A festa acabou, a luz apagou, o povo sumiu, a noite esfriou...",
    author: "Carlos Drummond de Andrade"
  },
  {
    quote: "Já Bocage não sou!... É meu cadáver, que consome o combate da virtude...",
    author: "Bocage (Elmano Sadino)"
  },
  {
    quote: "Eu quero amar, amar perdidamente! Amar só por amar: Aqui... além...",
    author: "Florbela Espanca"
  },
  {
    quote: "Ai flores, ai flores do verde pino, se sabedes novas do meu amigo?",
    author: "El-Rei D. Dinis"
  },
  {
    quote: "Ó Mar Salgado, quanto do teu sal são lágrimas de Portugal!",
    author: "Fernando Pessoa (Mensagem)"
  },
  {
    quote: "Que não seja imortal, posto que é chama, mas que seja infinito enquanto dure.",
    author: "Vinicius de Moraes"
  },
  {
    quote: "Vou-me embora pra Pasárgada, lá sou amigo do rei, lá tenho a mulher que eu quero...",
    author: "Manuel Bandeira"
  },
  {
    quote: "Não sou nada. Nunca serei nada. Não posso querer ser nada. À parte isso, tenho em mim todos os sonhos do mundo.",
    author: "Álvaro de Campos"
  },
  {
    quote: "Recria tua vida, sempre, sempre. Remove pedras e planta roseiras e faz doces. Recomeça.",
    author: "Cora Coralina"
  },
  {
    quote: "Senhor Deus dos desgraçados! Dizei-me vós, Senhor Deus! Se é loucura... se é verdade tanto horror perante os céus?!",
    author: "Castro Alves"
  },
  {
    quote: "Gritar é pouco, amar é pouco, ser é tudo.",
    author: "José Craveirinha"
  },
  {
    quote: "A minha terra tem palmeiras, onde canta o Sabiá; as aves, que aqui gorjeiam, não gorjeiam como lá.",
    author: "Gonçalves Dias"
  },
  {
    quote: "A ferida é o lugar por onde a luz entra em ti.",
    author: "Jalâl ad-Din Rûmî"
  },
  {
    quote: "A esperança é uma coisa com penas que pousa na alma e entoa a melodia sem palavras.",
    author: "Emily Dickinson"
  },
  {
    quote: "Dois caminhos divergiam numa floresta de outono, e eu escolhi o menos percorrido.",
    author: "Robert Frost"
  },
  {
    quote: "A beleza salvará o mundo pela força lírica da verdade.",
    author: "Sophia de Mello Breyner Andresen"
  },
  {
    quote: "Em cada canto da terra há uma semente de poesia à espera de germinar na memória.",
    author: "Agostinho Neto"
  },
  {
    quote: "Não nos esquecemos do mar, porque trazemos o mar gravado na própria respiração.",
    author: "Corsino Fortes"
  },
  {
    quote: "A poesia é uma viagem ao desconhecido: para uma única palavra gastam-se milhares de toneladas de matéria-prima verbal.",
    author: "Vladimir Maiakovski"
  },
  {
    quote: "Se as estrelas se acendem, quer dizer que alguém precisa delas — que ao menos uma estrela sobre todos os tetos se acenda!",
    author: "Vladimir Maiakovski"
  }
];
