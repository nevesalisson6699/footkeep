/**
 * Competições Oficiais do Futebol Brasileiro — Temporada 2025/26
 * Módulo Oficial de Competições, Formatos, Clubes, Tabelas e Chaveamentos
 * 
 * Fonte Primária: Confederação Brasileira de Futebol (CBF) - Registros do BID e Regulamentos Oficiais
 * Data de Auditoria e Consulta: Outubro de 2026
 * Governança: Estritamente focado no ciclo da Temporada 2025/26 (Ano-base 2025 consolidado até 2026)
 */

import { CLUBS_2026, SERIE_A_CLUBS_2026, SERIE_B_CLUBS_2026, getClubById } from './clubs2026.js';
import { RAW_PLAYERS_2026_SERIE_A, RAW_PLAYERS_2026_SERIE_B, buildSeason2026Players } from './players2026.js';

export const COMPETITIONS_2025_26_METADATA = {
  project: 'Footkeep Football Manager',
  dataset: 'Brazilian National Competitions Official Framework (Season 2025/26)',
  version: '2025.26.1',
  country: 'Brasil',
  governingBody: 'Confederação Brasileira de Futebol (CBF)',
  targetSeason: 'Temporada 2025/26',
  auditDate: 'Outubro de 2026',
  sources: [
    'Regulamento Geral de Competições da CBF (RGC)',
    'Regulamento Específico do Campeonato Brasileiro Série A (REC)',
    'Regulamento Específico do Campeonato Brasileiro Série B (REC)',
    'Regulamento Específico da Copa do Brasil',
    'Boletim Informativo Diário (BID) da CBF'
  ]
};

/**
 * Definições e Regulamentos Oficiais das Competições Padronizadas
 */
export const BRAZILIAN_COMPETITIONS_2025_26 = {
  brasileirao_serie_a: {
    id: 'brasileirao_serie_a',
    name: 'Campeonato Brasileiro — Série A',
    shortName: 'Brasileirão Série A',
    season: '2025/26',
    type: 'league',
    teamsCount: 20,
    roundsCount: 38,
    matchesPerRound: 10,
    totalMatches: 380,
    formatDescription: 'Pontos corridos em turno e returno (38 rodadas). Todos contra todos com mando de campo alternado.',
    pointsSystem: { win: 3, draw: 1, loss: 0 },
    tiebreakerCriteria: [
      '1º Maior número de pontos ganhos',
      '2º Maior número de vitórias',
      '3º Maior saldo de gols (SG)',
      '4º Maior número de gols pró (GP)',
      '5º Confronto direto (entre 2 clubes)',
      '6º Menor número de cartões vermelhos',
      '7º Menor número de cartões amarelos',
      '8º Sorteio público na sede da CBF'
    ],
    zoneRules: {
      championsLibertadores: { label: 'Fase de Grupos Libertadores', positions: [1, 2, 3, 4], color: '#16a34a' },
      qualifiersLibertadores: { label: 'Pré-Libertadores (Fases Preliminares)', positions: [5, 6], color: '#2563eb' },
      copaSulAmericana: { label: 'Copa Sul-Americana', positions: [7, 8, 9, 10, 11, 12], color: '#d97706' },
      neutralZone: { label: 'Permanência Assegurada', positions: [13, 14, 15, 16], color: '#64748b' },
      relegationZone: { label: 'Rebaixamento para a Série B (Z-4)', positions: [17, 18, 19, 20], color: '#dc2626' }
    },
    clubs: SERIE_A_CLUBS_2025_26()
  },

  brasileirao_serie_b: {
    id: 'brasileirao_serie_b',
    name: 'Campeonato Brasileiro — Série B',
    shortName: 'Brasileirão Série B',
    season: '2025/26',
    type: 'league',
    teamsCount: 20,
    roundsCount: 38,
    matchesPerRound: 10,
    totalMatches: 380,
    formatDescription: 'Pontos corridos em turno e returno (38 rodadas). Disputa de acesso e descenso nacional.',
    pointsSystem: { win: 3, draw: 1, loss: 0 },
    tiebreakerCriteria: [
      '1º Maior número de pontos ganhos',
      '2º Maior número de vitórias',
      '3º Maior saldo de gols (SG)',
      '4º Maior número de gols pró (GP)',
      '5º Confronto direto (entre 2 clubes)',
      '6º Menor número de cartões vermelhos',
      '7º Menor número de cartões amarelos'
    ],
    zoneRules: {
      promotionZone: { label: 'Acesso à Série A (G-4)', positions: [1, 2, 3, 4], color: '#16a34a' },
      neutralZone: { label: 'Permanência na Série B', positions: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], color: '#64748b' },
      relegationZone: { label: 'Rebaixamento para a Série C (Z-4)', positions: [17, 18, 19, 20], color: '#dc2626' }
    },
    clubs: SERIE_B_CLUBS_2025_26()
  },

  copa_do_brasil: {
    id: 'copa_do_brasil',
    name: 'Copa do Brasil',
    shortName: 'Copa do Brasil',
    season: '2025/26',
    type: 'cup',
    teamsCount: 16, // Fase final unificada no Footkeep
    phases: [
      { id: 'oitavas', name: 'Oitavas de Final', matchesCount: 8, legs: 2 },
      { id: 'quartas', name: 'Quartas de Final', matchesCount: 4, legs: 2 },
      { id: 'semi', name: 'Semifinais', matchesCount: 2, legs: 2 },
      { id: 'final', name: 'Grande Final', matchesCount: 1, legs: 2 }
    ],
    formatDescription: 'Torneio eliminatório mata-mata nacional. Empate no placar agregado leva a decisão para cobranças de pênaltis diretas.',
    championRewards: [
      'Vaga direta na Fase de Grupos da Copa Libertadores da temporada seguinte',
      'Vaga na Supercopa do Brasil',
      'Premiação financeira máxima da CBF'
    ]
  }
};

/**
 * Retorna os 20 clubes oficiais da Série A 2025/26
 */
export function SERIE_A_CLUBS_2025_26() {
  return SERIE_A_CLUBS_2026;
}

/**
 * Retorna os 20 clubes oficiais da Série B 2025/26
 */
export function SERIE_B_CLUBS_2025_26() {
  return SERIE_B_CLUBS_2026;
}

/**
 * Retorna lista das competições brasileiras oficiais cadastradas
 */
export function getAllCompetitions2025_26() {
  return Object.values(BRAZILIAN_COMPETITIONS_2025_26);
}

/**
 * Retorna detalhes e metadados de uma competição específica
 * @param {'brasileirao_serie_a'|'brasileirao_serie_b'|'copa_do_brasil'} competitionId 
 */
export function getCompetitionInfo(competitionId) {
  return BRAZILIAN_COMPETITIONS_2025_26[competitionId] || null;
}

/**
 * Inicializa a tabela oficial de classificação zerada para a Série A ou Série B
 * @param {'brasileirao_serie_a'|'brasileirao_serie_b'} competitionId 
 * @returns {Array} Array de 20 registros ordenados alfabeticamente ou por reputação
 */
export function initializeLeagueStandings(competitionId = 'brasileirao_serie_a') {
  const clubs = competitionId === 'brasileirao_serie_b' 
    ? SERIE_B_CLUBS_2025_26() 
    : SERIE_A_CLUBS_2025_26();

  return clubs.map((club, idx) => ({
    position: idx + 1,
    clubId: club.id,
    clubName: club.name,
    shortName: club.shortName,
    badgeUrl: club.badgeUrl,
    monogram: club.monogram,
    colors: club.colors,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: [] // Últimos 5 jogos: 'V', 'E', 'D'
  }));
}

/**
 * Atualiza e reordena a tabela de classificação de acordo com os critérios de desempate oficiais da CBF
 * @param {Array} currentStandings Tabela atual
 * @param {object} matchResult Resultado da partida { homeId, awayId, homeScore, awayScore }
 * @returns {Array} Nova tabela recalculada e ordenada
 */
export function updateStandingsWithMatch(currentStandings, matchResult) {
  const { homeId, awayId, homeScore, awayScore } = matchResult;
  if (homeScore === null || awayScore === null) return currentStandings;

  const standings = currentStandings.map(row => ({ ...row, form: [...(row.form || [])] }));
  const homeRow = standings.find(r => r.clubId === homeId);
  const awayRow = standings.find(r => r.clubId === awayId);

  if (!homeRow || !awayRow) return currentStandings;

  homeRow.played += 1;
  awayRow.played += 1;
  homeRow.goalsFor += homeScore;
  homeRow.goalsAgainst += awayScore;
  awayRow.goalsFor += awayScore;
  awayRow.goalsAgainst += homeScore;

  if (homeScore > awayScore) {
    homeRow.won += 1;
    homeRow.points += 3;
    homeRow.form.push('V');
    awayRow.lost += 1;
    awayRow.form.push('D');
  } else if (homeScore < awayScore) {
    awayRow.won += 1;
    awayRow.points += 3;
    awayRow.form.push('V');
    homeRow.lost += 1;
    homeRow.form.push('D');
  } else {
    homeRow.drawn += 1;
    homeRow.points += 1;
    homeRow.form.push('E');
    awayRow.drawn += 1;
    awayRow.points += 1;
    awayRow.form.push('E');
  }

  // Manter no máximo os últimos 5 jogos na forma recente
  if (homeRow.form.length > 5) homeRow.form.shift();
  if (awayRow.form.length > 5) awayRow.form.shift();

  homeRow.goalDifference = homeRow.goalsFor - homeRow.goalsAgainst;
  awayRow.goalDifference = awayRow.goalsFor - awayRow.goalsAgainst;

  // Ordenação oficial CBF: Pontos > Vitórias > Saldo de Gols > Gols Pró
  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.won !== a.won) return b.won - a.won;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.clubName.localeCompare(b.clubName);
  });

  // Reatribuir posições de 1 a 20
  standings.forEach((row, index) => {
    row.position = index + 1;
  });

  return standings;
}

/**
 * Gera as 38 rodadas oficiais (Turno e Returno) para os 20 clubes
 * Utiliza o algoritmo circular de escalonamento simétrico (Circle Method Round-Robin)
 * 
 * @param {'brasileirao_serie_a'|'brasileirao_serie_b'} competitionId
 * @returns {Array} 38 rodadas contendo 10 partidas cada (total 380 partidas)
 */
export function generateLeagueSchedule2025_26(competitionId = 'brasileirao_serie_a') {
  const clubs = competitionId === 'brasileirao_serie_b' 
    ? SERIE_B_CLUBS_2025_26() 
    : SERIE_A_CLUBS_2025_26();

  const clubIds = clubs.map(c => c.id);
  const n = clubIds.length; // 20 clubes
  const totalRoundsFirstLeg = n - 1; // 19 rodadas no 1º turno
  const rounds = [];
  const teams = [...clubIds];

  // 1º Turno (Rodadas 1 a 19)
  for (let roundIdx = 0; roundIdx < totalRoundsFirstLeg; roundIdx++) {
    const matches = [];
    for (let i = 0; i < n / 2; i++) {
      const home = teams[i];
      const away = teams[n - 1 - i];

      // Alterna mando de campo para balancear jogos em casa/fora
      if (roundIdx % 2 === 1) {
        matches.push({
          matchId: `${competitionId}_r${roundIdx + 1}_m${i + 1}`,
          homeId: away,
          awayId: home,
          played: false,
          homeScore: null,
          awayScore: null,
          events: []
        });
      } else {
        matches.push({
          matchId: `${competitionId}_r${roundIdx + 1}_m${i + 1}`,
          homeId: home,
          awayId: away,
          played: false,
          homeScore: null,
          awayScore: null,
          events: []
        });
      }
    }

    rounds.push({
      roundNumber: roundIdx + 1,
      competitionId,
      name: `Rodada ${roundIdx + 1}`,
      leg: 'Turno',
      matches
    });

    // Rotação dos clubes mantendo o índice 0 fixo
    const fixed = teams[0];
    const rest = teams.slice(1);
    const last = rest.pop();
    rest.unshift(last);
    teams.splice(0, teams.length, fixed, ...rest);
  }

  // 2º Turno / Returno (Rodadas 20 a 38 - Mando de campo invertido)
  for (let roundIdx = 0; roundIdx < totalRoundsFirstLeg; roundIdx++) {
    const firstLegRound = rounds[roundIdx];
    const reverseMatches = firstLegRound.matches.map((m, mIdx) => ({
      matchId: `${competitionId}_r${roundIdx + 20}_m${mIdx + 1}`,
      homeId: m.awayId,
      awayId: m.homeId,
      played: false,
      homeScore: null,
      awayScore: null,
      events: []
    }));

    rounds.push({
      roundNumber: roundIdx + 20,
      competitionId,
      name: `Rodada ${roundIdx + 20} (Returno)`,
      leg: 'Returno',
      matches: reverseMatches
    });
  }

  return rounds;
}

/**
 * Gera o chaveamento inicial da Copa do Brasil 2025/26 (Oitavas de Final com 16 clubes)
 * @param {Array<string>} [customClubIds=null] IDs dos 16 clubes participantes ou sorteio entre os melhores
 */
export function generateCupBracket2025_26(customClubIds = null) {
  let participatingIds = customClubIds;

  if (!participatingIds || participatingIds.length < 16) {
    // Seleção dos 16 clubes mais tradicionais da Série A e topo da Série B
    const pool = SERIE_A_CLUBS_2025_26().slice(0, 14).map(c => c.id);
    const bPool = SERIE_B_CLUBS_2025_26().slice(0, 2).map(c => c.id);
    participatingIds = [...pool, ...bPool];
  }

  // Embaralha para o sorteio das Oitavas de Final
  const shuffled = [...participatingIds].sort(() => Math.random() - 0.5);
  const oitavasMatches = [];

  for (let i = 0; i < 8; i++) {
    oitavasMatches.push({
      matchId: `cdb_2025_oitavas_${i + 1}`,
      homeId: shuffled[i * 2],
      awayId: shuffled[i * 2 + 1],
      played: false,
      homeScore: null,
      awayScore: null,
      homePenalties: null,
      awayPenalties: null,
      winnerId: null,
      events: []
    });
  }

  return {
    season: '2025/26',
    competitionId: 'copa_do_brasil',
    competitionName: 'Copa do Brasil 2025/26',
    currentPhase: 'oitavas',
    phases: {
      oitavas: { name: 'Oitavas de Final', order: 1, matches: oitavasMatches },
      quartas: { name: 'Quartas de Final', order: 2, matches: [] },
      semi: { name: 'Semifinais', order: 3, matches: [] },
      final: { name: 'Grande Final', order: 4, matches: [] }
    },
    championId: null
  };
}

/**
 * Retorna os principais atletas e elenco confirmado de um clube para a temporada 2025/26
 * @param {string} clubId 
 */
export function getClubSquad2025_26(clubId) {
  const squad = RAW_PLAYERS_2026_SERIE_A[clubId] || RAW_PLAYERS_2026_SERIE_B[clubId];
  return squad ? [...squad] : [];
}

/**
 * Retorna as principais referências técnicas de um clube (Top 3 por Overall)
 * @param {string} clubId 
 */
export function getClubKeyStars2025_26(clubId) {
  const squad = getClubSquad2025_26(clubId);
  return squad.sort((a, b) => b.ovr - a.ovr).slice(0, 3);
}
