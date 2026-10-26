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

export { sanitizeSquadForNewCareer } from './players2026.js';

/**
 * Metadados e catálogo estruturado das 4 grandes ligas suportadas
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
  }
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
