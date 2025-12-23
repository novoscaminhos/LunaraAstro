

export enum View {
  SPLASH = 'SPLASH',
  HOME = 'HOME',
  INPUT_ASTRAL = 'INPUT_ASTRAL',
  INPUT_NUMEROLOGY = 'INPUT_NUMEROLOGY',
  INPUT_SYNASTRY = 'INPUT_SYNASTRY',
  SELECTION = 'SELECTION',
  RESULT_ASTRAL = 'RESULT_ASTRAL',
  RESULT_NUMEROLOGY = 'RESULT_NUMEROLOGY',
  RESULT_SYNASTRY = 'RESULT_SYNASTRY',
  LEARN = 'LEARN',
  FULL_REPORT = 'FULL_REPORT',
  SAVED_MAPS = 'SAVED_MAPS',
  PROFILE = 'PROFILE',
  ORACLE = 'ORACLE',
  BIORHYTHM = 'BIORHYTHM'
}

export interface UserData {
  name: string;
  birthDate: string;
  birthTime?: string;
  birthPlace?: string;
}

export interface Consultant extends UserData {
  id: string;
  notes?: string;
  lastCalculatedSign?: string;
  lastCalculatedAscendant?: string;
}

export interface PlanetPosition {
  name: string;
  sign: string;
  house: number;
  degree?: number;
  technicalContext?: string;
  category?: 'Personal' | 'Social' | 'Transpersonal' | 'Point';
  dignity?: 'Domicílio' | 'Exaltação' | 'Detrimento' | 'Queda' | 'Peregrino' | 'Exílio';
  isRetrograde?: boolean;
}

export interface HouseCusp {
  house: number;
  sign: string;
  ruler: string;
}

export interface EmptyHouseAnalysis {
  house: number;
  analysis: string;
}

export interface AstralAspect {
  planet1: string;
  planet2: string;
  type: string;
  interpretation: string;
}

export interface AstralChartData {
  sun: PlanetPosition;
  moon: PlanetPosition;
  ascendant: PlanetPosition;
  midheaven: { sign: string; degree?: number; careerInterpretation: string };
  partOfFortune?: PlanetPosition;
  northNode: { sign: string; degree?: number; technicalContext: string };
  houseCusps: HouseCusp[];
  progressedMoon?: { sign: string; monthsRemaining: number };
  emptyHouses?: EmptyHouseAnalysis[];
  aspects?: AstralAspect[];
  planets: PlanetPosition[];
  currentAstralMonth: string;
  potentials: {
    harmonic: string[];
    disharmonic: string[];
  };
  chartImage?: string;
  panoramaImage?: string;
  sphericalMapImage?: string;
  elementalBalance: { 
    fire: number; earth: number; air: number; water: number;
    yang: number; yin: number;
  };
  deepAnalysis?: string;
}

export interface NumerologyPyramidRow {
  values: number[];
}

export interface NumerologyData {
  pyramid: NumerologyPyramidRow[];
  expressionNumber: number; // Nome Completo
  motivationNumber: number; // Vogais
  impressionNumber: number; // Consoantes
  destinyNumber: number; // Data de Nascimento
  missionNumber: number; // Expressão + Destino
  birthDayNumber: number; // Dia do Nascimento
  karmicDebts: number[]; // 13, 14, 16, 19
  karmicLessons: number[]; // Números ausentes no nome
  hiddenTendencies: number[]; // Números que se repetem 3+ vezes
  personalYear: number; // Ano pessoal atual
  
  // Novos Campos
  personalMonth: number; // Ano Pessoal + Mês Atual
  psychicNumber: number; // Dia de Nascimento Reduzido
  subconsciousResponse: number; // 9 - (números faltantes no nome)
  arcaneNumber: number; // Arcano Pessoal (Soma do nome até 100)
  
  // Ciclos de Vida
  lifeCycle1: number; // Mês reduzido
  lifeCycle2: number; // Dia reduzido
  lifeCycle3: number; // Ano reduzido
  
  // Momentos Decisivos (Pinnacles)
  decisiveMoment1: number; // Dia + Mês
  decisiveMoment2: number; // Dia + Ano
  decisiveMoment3: number; // M1 + M2
  decisiveMoment4: number; // Mês + Ano

  // Desafios (Challenges)
  challenge1: number; // |Mês - Dia|
  challenge2: number; // |Dia - Ano|
  challenge3: number; // |C1 - C2| (Principal)

  // Relação Inter-valor & Ascensão
  interValueNumber: number; // Moda do nome
  ascensionType: 'Elevado' | 'Rebaixado' | 'Ascensao';

  // Idades de Transição
  ageRef1: number; // 36 - Destino (Fim Ciclo 1 / Fim Momento 1)
  ageRef2: number; // Age1 + 9 (Fim Momento 2)
  ageRef3: number; // Age2 + 9 (Fim Momento 3)
  ageRefCycle2: number; // Age1 + 27 (Fim Ciclo 2)
}

export interface SavedMap {
  id: string;
  userData: UserData;
  chartData: AstralChartData;
  timestamp: number;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface DailyHoroscope {
  skyNow: { planet: string; sign: string }[];
  advice: {
    love: string;
    finance: string;
    health: string;
  };
  mantra: string;
}

export interface OracleState {
  response: string | DailyHoroscope; // Pode ser texto simples (erro) ou objeto estruturado
  loading: boolean;
  sources?: GroundingSource[];
  mode: 'thinking' | 'fast' | 'search';
}
