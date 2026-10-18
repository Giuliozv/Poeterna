export type CountryCode = 'PT' | 'BR' | 'AO' | 'CV' | 'MZ' | 'GW' | 'ST' | 'TL' | 'FR' | 'IT' | 'ES' | 'RU' | 'US' | 'GB' | 'DE' | 'IR' | 'CL' | 'GR' | 'Universal' | string;

export interface Poet {
  id: string;
  name: string;
  shortName: string;
  country: CountryCode;
  countryName: string;
  period: string;
  years: string;
  bio: string;
  avatarUrl?: string;
  famousQuote?: string;
  featured?: boolean;
  copyrightStatus?: 'Domínio Público' | 'Direitos Autorais Reservados';
}

export interface Poem {
  id: string;
  title: string;
  poetId: string;
  poetName: string;
  country: CountryCode;
  countryName: string;
  year?: string;
  location?: string;
  stanzas: string[];
  era: string;
  theme: string;
  analysis?: string;
  audioUrl?: string;
  copyrightStatus?: 'Domínio Público' | 'Direitos Autorais Reservados';
  moodAnalysis?: PoemMoodAnalysis;
  historicalContext?: PoemHistoricalContext;
}

export interface PoemMoodAnalysis {
  mood: string;
  colorCategory: string;
  badgeHex: string;
  icon: string;
  explanation: string;
  source?: 'gemini' | 'literary_acervo';
}

export interface PoemHistoricalContext {
  historicalEra: string;
  literaryInfluences: string;
  creativeContext: string;
  keyEvents?: string[];
  source?: 'gemini' | 'literary_acervo';
}

export interface Anthology {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  color: string;
  poemIds: string[];
  coverImage?: string;
}

export interface CountryInfo {
  code: CountryCode;
  name: string;
  flag: string;
  description: string;
  capital: string;
  poetsCount: number;
}

export type ActiveTab = 'inicio' | 'paises' | 'mundial' | 'poetas' | 'antologias' | 'roleta' | 'favoritos';
