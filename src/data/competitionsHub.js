/**
 * Footkeep Competitions & Squads Unified Hub (Temporada 2025/26)
 * Módulo Central de Federações, Competições Nacionais e Internacionais
 * 
 * Competições Suportadas:
 * 1. Campeonato Brasileiro — Série A (20 clubes reais, 420 atletas auditados no BID da CBF)
 * 2. Campeonato Brasileiro — Série B (20 clubes reais, 420 atletas auditados no BID da CBF)
 * 3. Premier League — Inglaterra (20 clubes reais, astros e atletas confirmados pela FA/PL)
 * 4. LaLiga EA Sports — Espanha (20 clubes reais, astros e atletas confirmados pela RFEF/LaLiga)
 * 
 * Regra de Ouro da Governança Footkeep:
 * - Separação estrita e hermética entre dados históricos/scouting real e o estado de simulação de nova carreira.
 * - Todos os elencos para simulação passam por sanitizeSquadForNewCareer, garantindo:
 *   goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, cleanSheets: 0, isSuspended: false.
 */

import { SERIE_A_CLUBS_2026, SERIE_B_CLUBS_2026, getClubById as getBrazilianClubById } from './clubs2026.js';
import { 
  PREMIER_LEAGUE_CLUBS_2025_26, 
  LALIGA_CLUBS_2025_26, 
  buildInternationalPlayers,
  getInternationalCompetition 
} from './internationalLeagues2025_26.js';
import { 
  buildSeason2026Players, 
  sanitizeSquadForNewCareer,
  RAW_PLAYERS_2026_SERIE_A,
  RAW_PLAYERS_2026_SERIE_B 
} from './players2026.js';
import { 
  PLAYER_STATS_2025_26, 
  getPlayersByCompetition as getScoutingPlayersByComp 
} from './playerStats2025_26.js';
import { 
  EUROPEAN_COMPETITIONS_2025_26,
  getAllEuropeanCompetitions,
  getEuropeanCompetitionById 
} from './europeanCompetitions2025_26.js';
import {
  GLOBAL_COMPETITIONS_METADATA,
  GLOBAL_REGIONS_CLUBS,
  buildGlobalRegionsPlayers
} from './globalRegionsCompetitions2025_26.js';

export { 
  EUROPEAN_COMPETITIONS_2025_26,
  getAllEuropeanCompetitions,
  getEuropeanCompetitionById,
  GLOBAL_COMPETITIONS_METADATA,
  GLOBAL_REGIONS_CLUBS,
  buildGlobalRegionsPlayers
};

export { sanitizeSquadForNewCareer } from './players2026.js';

/**
 * Metadados e catálogo estruturado de todas as ligas suportadas (Brasil, Europa, Américas, Ásia, Oceania, África)
 */
export const SUPPORTED_COMPETITIONS = {
  brasileirao_serie_a: {
    id: 'brasileirao_serie_a',
    name: 'Campeonato Brasileiro — Série A',
    shortName: 'Brasileirão Série A',
    country: 'Brasil',
    flagEmoji: '🇧🇷',
    type: 'league',
    season: '2025/26',
    teamsCount: 20,
    roundsCount: 38,
    aliases: ['serie_a', 'brasileirao', 'brasil_a', 'br_a'],
    tier: 1,
    source: 'Boletim Informativo Diário (BID) da CBF e Regulamento Específico da Competição (REC)'
  },
  brasileirao_serie_b: {
    id: 'brasileirao_serie_b',
    name: 'Campeonato Brasileiro — Série B',
    shortName: 'Brasileirão Série B',
    country: 'Brasil',
    flagEmoji: '🇧🇷',
    type: 'league',
    season: '2025/26',
    teamsCount: 20,
    roundsCount: 38,
    aliases: ['serie_b', 'brasil_b', 'br_b'],
    tier: 2,
    source: 'Boletim Informativo Diário (BID) da CBF e Regulamento Específico da Série B'
  },
  premier_league: {
    id: 'premier_league',
    name: 'Premier League',
    shortName: 'Premier League',
    country: 'Inglaterra',
    flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    type: 'league',
    season: '2025/26',
    teamsCount: 20,
    roundsCount: 38,
    aliases: ['premier_league_2025_26', 'pl', 'england_pl', 'epl'],
    tier: 1,
    source: 'Premier League Official Club & Squad Registry / The FA'
  },
  laliga: {
    id: 'laliga',
    name: 'LaLiga EA Sports',
    shortName: 'LaLiga',
    country: 'Espanha',
    flagEmoji: '🇪🇸',
    type: 'league',
    season: '2025/26',
    teamsCount: 20,
    roundsCount: 38,
    aliases: ['laliga_2025_26', 'la_liga', 'laliga_ea_sports', 'spain_laliga'],
    tier: 1,
    source: 'LaLiga EA Sports Official Registrations / RFEF'
  },
  ...GLOBAL_COMPETITIONS_METADATA
};

/**
 * Normaliza o identificador da competição resolvendo variações de digitação e aliases
 * @param {string} competitionId 
 * @returns {string} ID canônico ('brasileirao_serie_a' | 'brasileirao_serie_b' | 'premier_league' | 'laliga')
 */
export function normalizeCompetitionId(competitionId) {
  if (!competitionId || typeof competitionId !== 'string') return 'brasileirao_serie_a';
  const clean = competitionId.toLowerCase().trim().replace(/[\s-]+/g, '_');

  for (const [canonicalId, meta] of Object.entries(SUPPORTED_COMPETITIONS)) {
    if (canonicalId === clean) return canonicalId;
    if (meta.aliases && meta.aliases.includes(clean)) return canonicalId;
  }
  return clean;
}

/**
 * Retorna os metadados oficiais de uma competição suportada
 * @param {string} competitionId 
 * @returns {Object|null}
 */
export function getCompetitionMetadata(competitionId) {
  const canonical = normalizeCompetitionId(competitionId);
  return SUPPORTED_COMPETITIONS[canonical] || null;
}

/**
 * Retorna a lista completa de competições suportadas
 * @returns {Array<Object>}
 */
export function getSupportedCompetitions() {
  return Object.values(SUPPORTED_COMPETITIONS);
}

/**
 * Retorna os 20 clubes reais e oficiais da competição solicitada
 * 
 * @param {'brasileirao_serie_a'|'brasileirao_serie_b'|'premier_league'|'laliga'|string} competitionId 
 * @returns {Array<Object>} Lista com os 20 clubes oficiais (cópia imutável)
 */
export function getClubsByCompetition(competitionId) {
  const canonical = normalizeCompetitionId(competitionId);

  switch (canonical) {
    case 'brasileirao_serie_a':
      return SERIE_A_CLUBS_2026.map(c => ({ ...c }));

    case 'brasileirao_serie_b':
      return SERIE_B_CLUBS_2026.map(c => ({ ...c }));

    case 'premier_league':
      return PREMIER_LEAGUE_CLUBS_2025_26.map(c => ({ ...c }));

    case 'laliga':
      return LALIGA_CLUBS_2025_26.map(c => ({ ...c }));

    default:
      console.warn(`[competitionsHub] Competição não reconhecida: "${competitionId}". Retornando clubes do Brasileirão Série A por padrão.`);
      return SERIE_A_CLUBS_2026.map(c => ({ ...c }));
  }
}

/**
 * Retorna os elencos completos de atletas devidamente higienizados para o modo carreira simulada.
 * Garante que NENHUM jogador carregue gols, assistências, cartões ou jogos do futebol real para a simulação.
 * Todos os acumuladores de temporada são zerados (goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, cleanSheets: 0, isSuspended: false),
 * preservando com exatidão os atributos reais autênticos (overall, fin, pas, def, fis, posições, idades, vínculos e valores de mercado).
 * 
 * @param {'brasileirao_serie_a'|'brasileirao_serie_b'|'premier_league'|'laliga'|string} competitionId 
 * @param {Object} [options]
 * @param {boolean} [options.includeFreeAgents=false] Se true, inclui agentes livres no pool de contratação
 * @returns {Array<Object>} Elencos completos 100% higienizados prontos para simulação
 */
export function getInitialPlayersForCompetition(competitionId, options = {}) {
  const canonical = normalizeCompetitionId(competitionId);
  const includeFreeAgents = options.includeFreeAgents ?? false;

  let rawSquads = [];

  switch (canonical) {
    case 'brasileirao_serie_a': {
      const allSerieAPlayers = buildSeason2026Players('serie_a');
      rawSquads = includeFreeAgents 
        ? allSerieAPlayers 
        : allSerieAPlayers.filter(p => p.clubId !== null && p.contractStatus !== 'livre_mercado');
      break;
    }

    case 'brasileirao_serie_b': {
      const allSerieBPlayers = buildSeason2026Players('serie_b');
      rawSquads = includeFreeAgents 
        ? allSerieBPlayers 
        : allSerieBPlayers.filter(p => p.clubId !== null && p.contractStatus !== 'livre_mercado');
      break;
    }

    case 'premier_league': {
      const intlPlayers = buildInternationalPlayers('premier_league_2025_26');
      rawSquads = intlPlayers;
      break;
    }

    case 'laliga': {
      const intlPlayers = buildInternationalPlayers('laliga_2025_26');
      rawSquads = intlPlayers;
      break;
    }

    default: {
      console.warn(`[competitionsHub] Competição não reconhecida: "${competitionId}". Retornando atletas da Série A por padrão.`);
      rawSquads = buildSeason2026Players('serie_a').filter(p => p.clubId !== null);
      break;
    }
  }

  // Higienização estrita obrigatória: nenhum resquício real entra na simulação
  return sanitizeSquadForNewCareer(rawSquads);
}

/**
 * Busca um clube por ID em qualquer uma das 4 competições suportadas
 * @param {string} clubId 
 * @returns {Object|null}
 */
export function getClubByIdAcrossCompetitions(clubId) {
  if (!clubId) return null;
  const lowerId = clubId.toLowerCase();

  // Verifica Série A e Série B
  const brazilian = getBrazilianClubById(lowerId);
  if (brazilian) return { ...brazilian };

  // Verifica Premier League
  const plClub = PREMIER_LEAGUE_CLUBS_2025_26.find(c => c.id === lowerId);
  if (plClub) return { ...plClub };

  // Verifica LaLiga
  const laLigaClub = LALIGA_CLUBS_2025_26.find(c => c.id === lowerId);
  if (laLigaClub) return { ...laLigaClub };

  return null;
}

/**
 * MÓDULO DE SCOUTING & HISTÓRICO REAL (ISOLADO DA SIMULAÇÃO)
 * 
 * Retorna as estatísticas consolidadas reais de atletas (Opta / CBF / Premier League / LaLiga)
 * para consultas de mercado, inteligência tática e scouting de novos reforços.
 * Os registros retornados são expressamente marcados como dados de consulta externa
 * (isHistoricalRealData: true) e NÃO devem ser injetados diretamente na máquina de estados de carreira.
 * 
 * @param {string} [competitionId] Opcional: filtra por competição
 * @returns {Array<Object>} Registros de scouting e estatísticas do mundo real
 */
export function getHistoricalScoutingStats(competitionId = null) {
  let statsPool = [...PLAYER_STATS_2025_26];

  if (competitionId) {
    const canonical = normalizeCompetitionId(competitionId);
    statsPool = statsPool.filter(st => {
      const compNorm = normalizeCompetitionId(st.competitionId);
      return compNorm === canonical;
    });
  }

  return statsPool.map(entry => ({
    ...entry,
    isHistoricalRealData: true,
    scoutingOnly: true,
    simulationReady: false,
    auditReference: 'Footkeep Scouting Network - Dados Consolidados 2025/26'
  }));
}

/**
 * Obtém o perfil de scouting real de um atleta específico por ID ou Nome
 * @param {string} query - ID do registro de scouting (ex: 'ST-001') ou Nome do atleta (ex: 'Memphis Depay')
 * @returns {Object|null}
 */
export function getScoutingProfile(query) {
  if (!query) return null;
  const qLower = query.toLowerCase().trim();

  const found = PLAYER_STATS_2025_26.find(st => 
    st.id.toLowerCase() === qLower || 
    st.name.toLowerCase() === qLower ||
    st.name.toLowerCase().includes(qLower)
  );

  if (!found) return null;

  return {
    ...found,
    isHistoricalRealData: true,
    scoutingOnly: true,
    simulationReady: false
  };
}

/**
 * Retorna todos os clubes registrados em todas as ligas suportadas pelo Footkeep
 * (Série A, Série B, Premier League e LaLiga) com país e liga normalizados.
 * 
 * @returns {Array<Object>} Catálogo unificado de 80 clubes oficiais
 */
export function getAllGlobalMarketClubs() {
  const serieA = SERIE_A_CLUBS_2026.map(c => ({
    ...c,
    country: 'Brasil',
    leagueId: 'brasileirao_serie_a',
    leagueName: 'Brasileirão Série A',
    countryFlag: '🇧🇷'
  }));

  const serieB = SERIE_B_CLUBS_2026.map(c => ({
    ...c,
    country: 'Brasil',
    leagueId: 'brasileirao_serie_b',
    leagueName: 'Brasileirão Série B',
    countryFlag: '🇧🇷'
  }));

  const premierLeague = PREMIER_LEAGUE_CLUBS_2025_26.map(c => ({
    ...c,
    country: 'Inglaterra',
    leagueId: 'premier_league',
    leagueName: 'Premier League',
    countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿'
  }));

  const laLiga = LALIGA_CLUBS_2025_26.map(c => ({
    ...c,
    country: 'Espanha',
    leagueId: 'laliga',
    leagueName: 'LaLiga EA Sports',
    countryFlag: '🇪🇸'
  }));

  const regionalClubs = GLOBAL_REGIONS_CLUBS.map(c => ({ ...c }));

  return [...serieA, ...serieB, ...premierLeague, ...laLiga, ...regionalClubs];
}

/**
 * Atletas Livres Internacionais / Mundiais adicionais para o mercado global
 */
const WORLD_FREE_AGENTS = [
  { name: 'Sergio Ramos', pos: 'Z', age: 39, ovr: 81, fin: 62, pas: 75, def: 83, fis: 78, country: 'Espanha' },
  { name: 'Keylor Navas', pos: 'G', age: 39, ovr: 80, fin: 25, pas: 72, def: 83, fis: 76, country: 'Costa Rica' },
  { name: 'Wissam Ben Yedder', pos: 'A', age: 35, ovr: 80, fin: 84, pas: 77, def: 40, fis: 72, country: 'França' },
  { name: 'Adrien Rabiot', pos: 'V', age: 30, ovr: 83, fin: 74, pas: 82, def: 81, fis: 82, country: 'França' },
  { name: 'Anthony Martial', pos: 'A', age: 29, ovr: 79, fin: 80, pas: 75, def: 42, fis: 75, country: 'França' },
  { name: 'Joel Matip', pos: 'Z', age: 34, ovr: 80, fin: 45, pas: 72, def: 82, fis: 76, country: 'Camarões' },
  { name: 'Miralem Pjanić', pos: 'M', age: 35, ovr: 78, fin: 72, pas: 84, def: 65, fis: 68, country: 'Bósnia e Herzegovina' },
  { name: 'Dele Alli', pos: 'M', age: 29, ovr: 77, fin: 76, pas: 77, def: 60, fis: 74, country: 'Inglaterra' },
  { name: 'Rafinha Alcântara', pos: 'M', age: 32, ovr: 78, fin: 74, pas: 81, def: 66, fis: 72, country: 'Brasil' },
  { name: 'Douglas Costa', pos: 'A', age: 35, ovr: 78, fin: 79, pas: 81, def: 43, fis: 73, country: 'Brasil' }
];

/**
 * Constrói o elenco global completo para o Mercado de Transferências Multiliga.
 * Reúne atletas da Série A, Série B, Premier League, LaLiga e Agentes Livres mundiais.
 * Todos os atletas passam por higienização estrita de estatísticas de simulação.
 * 
 * @returns {Array<Object>} Lista consolidada com todos os atletas do ecossistema global Footkeep
 */
export function getAllGlobalMarketPlayers() {
  // 1. Atletas brasileiros (Série A, Série B e Agentes Livres nacionais)
  const brazilianPlayers = buildSeason2026Players('all');
  const taggedBrazilian = brazilianPlayers.map(p => {
    let country = 'Brasil';
    let leagueId = 'brasileirao_serie_a';
    if (!p.clubId) {
      country = 'Global';
      leagueId = 'free_agent';
    } else if (SERIE_B_CLUBS_2026.some(c => c.id === p.clubId)) {
      leagueId = 'brasileirao_serie_b';
    }
    return {
      ...p,
      country,
      leagueId
    };
  });

  // 2. Atletas Premier League (Inglaterra)
  const plPlayers = buildInternationalPlayers('premier_league_2025_26').map(p => ({
    ...p,
    country: 'Inglaterra',
    leagueId: 'premier_league'
  }));

  // 3. Atletas LaLiga EA Sports (Espanha)
  const laLigaPlayers = buildInternationalPlayers('laliga_2025_26').map(p => ({
    ...p,
    country: 'Espanha',
    leagueId: 'laliga'
  }));

  // 4. Agentes Livres Mundiais / Internacionais adicionais
  const extraFreeAgents = WORLD_FREE_AGENTS.map((raw, idx) => {
    const ageFactor = raw.age > 30 ? 0.65 : 1.0;
    const baseValue = Math.pow(raw.ovr - 40, 2.75) * 1250 * ageFactor;
    const value = Math.round(baseValue / 10000) * 10000;
    const salary = Math.round((value * 0.006) / 1000) * 1000 + 5000;
    return {
      id: `ply_w_fa_${idx + 1}`,
      name: raw.name,
      clubId: null,
      country: raw.country,
      leagueId: 'free_agent',
      position: raw.pos,
      age: raw.age,
      overall: raw.ovr,
      fin: raw.fin,
      pas: raw.pas,
      def: raw.def,
      fis: raw.fis,
      value,
      salary,
      contractEnd: 'Sem vínculo ativo',
      contractStatus: 'livre_mercado',
      fitness: 100,
      morale: 'Normal',
      yellowCards: 0,
      redCards: 0,
      goals: 0,
      assists: 0,
      matchesPlayed: 0,
      cleanSheets: 0,
      isSuspended: false,
      isListed: true,
      season: '2025/26'
    };
  });

  // 4. Atletas das Ligas Regionais (Américas: MLS, Liga MX, Libertadores; Ásia: AFC Champions, J-League, CSL, ISL, K-League 2; Oceania: A-League; África: PSL)
  const regionalPlayers = buildGlobalRegionsPlayers();

  return sanitizeSquadForNewCareer([
    ...taggedBrazilian, 
    ...plPlayers, 
    ...laLigaPlayers, 
    ...regionalPlayers,
    ...extraFreeAgents
  ]);
}
