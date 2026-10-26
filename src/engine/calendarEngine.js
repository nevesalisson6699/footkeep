// Calendar Engine: Game Clock, Real Football Dates, Pre-Season & Transfer Windows
// Supports Brazilian Calendar (CBF / CONMEBOL) and European Calendar (Premier League / LaLiga / UEFA)
// Official Dates & Windows for Season 2025/2026

import { generateLeagueFixtures } from './competitionEngine.js';

/**
 * METADATA & COMPETITION CALENDAR CONFIGURATIONS
 */
export const CALENDAR_CONFIG = {
  brazil: {
    competitionIds: ['brasileirao_serie_a', 'brasileirao_serie_b', 'copa_do_brasil', 'serie_a', 'serie_b'],
    seasonYear: 2026,
    seasonStart: '2026-01-15',
    preSeasonEnd: '2026-03-31',
    officialStart: '2026-04-12', // 1ª Rodada do Campeonato Brasileiro (CBF)
    seasonEnd: '2026-12-07',
    transferWindows: [
      {
        id: 'br_w1',
        name: 'Janela 1 de Início de Temporada (CBF)',
        opensAt: '2026-01-11',
        closesAt: '2026-03-07'
      },
      {
        id: 'br_w2',
        name: 'Janela 2 de Meio de Temporada (CBF)',
        opensAt: '2026-07-10',
        closesAt: '2026-09-02'
      }
    ]
  },
  europe: {
    competitionIds: ['premier_league', 'laliga', 'premier_league_2025_26', 'laliga_2025_26'],
    seasonYear: 2025,
    seasonStart: '2025-07-01',
    preSeasonEnd: '2025-08-14',
    officialStart: '2025-08-15', // 1ª Rodada Premier League & LaLiga
    seasonEnd: '2026-05-24',
    transferWindows: [
      {
        id: 'eu_summer',
        name: 'Janela de Verão Europeia',
        opensAt: '2025-07-01',
        closesAt: '2025-09-01'
      },
      {
        id: 'eu_winter',
        name: 'Janela de Inverno Europeia',
        opensAt: '2026-01-01',
        closesAt: '2026-01-31'
      }
    ]
  }
};

/**
 * Normaliza o identificador da competição para 'brazil' ou 'europe'
 * @param {string} competitionId
 * @returns {'brazil'|'europe'}
 */
export function getCalendarRegion(competitionId = '') {
  const norm = String(competitionId).toLowerCase();
  if (
    norm.includes('premier') ||
    norm.includes('laliga') ||
    norm.includes('la_liga') ||
    norm.includes('champions') ||
    norm.includes('europa') ||
    norm === 'europe'
  ) {
    return 'europe';
  }
  return 'brazil';
}

/**
 * Utilitários de data UTC puros (imunes a fuso horário)
 */
function parseDateParts(dateStr) {
  const [y, m, d] = dateStr.split('T')[0].split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function formatDateISO(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Avança a data do jogo em N dias
 * @param {string} dateStr - Data atual em formato ISO 'YYYY-MM-DD'
 * @param {number} days - Quantidade de dias a avançar (positivo ou negativo)
 * @returns {string} Nova data em formato ISO 'YYYY-MM-DD'
 */
export function advanceGameDate(dateStr, days = 1) {
  if (!dateStr) return CALENDAR_CONFIG.brazil.seasonStart;
  const date = parseDateParts(dateStr);
  date.setUTCDate(date.getUTCDate() + Number(days));
  return formatDateISO(date);
}

/**
 * Formata a data do jogo por extenso em português
 * Exemplo: '15 de Janeiro de 2025'
 * @param {string} dateStr - Data em formato ISO 'YYYY-MM-DD'
 * @returns {string}
 */
export function formatGameDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('T')[0].split('-').map(Number);
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const monthName = monthNames[month - 1] || '';
  return `${day} de ${monthName} de ${year}`;
}

/**
 * Retorna a data inicial oficial recomendada para a competição
 * @param {string} competitionId
 * @returns {string} '2026-01-15' (Brasil) ou '2025-07-01' (Europa)
 */
export function getInitialDateForCompetition(competitionId) {
  const region = getCalendarRegion(competitionId);
  return CALENDAR_CONFIG[region].seasonStart;
}

/**
 * Calcula a diferença em dias entre duas datas (dateB - dateA)
 * @param {string} dateStrA
 * @param {string} dateStrB
 * @returns {number}
 */
export function getDiffDays(dateStrA, dateStrB) {
  const a = parseDateParts(dateStrA);
  const b = parseDateParts(dateStrB);
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

/**
 * Verifica se a data informada está no período de Pré-Temporada
 * @param {string} dateStr - Data atual em ISO 'YYYY-MM-DD'
 * @param {string} competitionId
 * @returns {Object} { isPreSeason, daysRemaining, seasonStart, preSeasonEnd, officialStart, statusText }
 */
export function isPreSeason(dateStr, competitionId) {
  const region = getCalendarRegion(competitionId);
  const cfg = CALENDAR_CONFIG[region];
  const currentDate = dateStr ? dateStr.split('T')[0] : cfg.seasonStart;

  const inPreSeason = currentDate >= cfg.seasonStart && currentDate < cfg.officialStart;
  const daysRemaining = Math.max(0, getDiffDays(currentDate, cfg.officialStart));

  let statusText = '';
  if (inPreSeason) {
    statusText = `Pré-Temporada em andamento (${daysRemaining} dias até a abertura oficial)`;
  } else if (currentDate < cfg.seasonStart) {
    statusText = 'Férias de fim de temporada';
  } else {
    statusText = 'Temporada regular em andamento';
  }

  // Objeto rico que responde como boolean quando avaliado primitivamente
  return {
    isPreSeason: inPreSeason,
    daysRemaining,
    seasonStart: cfg.seasonStart,
    preSeasonEnd: cfg.preSeasonEnd,
    officialStart: cfg.officialStart,
    statusText,
    valueOf: () => inPreSeason,
    [Symbol.toPrimitive]: () => inPreSeason
  };
}

/**
 * Verifica se a janela de transferências está aberta na data informada
 * @param {string} dateStr - Data em ISO 'YYYY-MM-DD'
 * @param {string} competitionId
 * @returns {boolean}
 */
export function isTransferWindowOpen(dateStr, competitionId) {
  const status = getTransferWindowStatus(dateStr, competitionId);
  return status.isOpen;
}

/**
 * Retorna o status detalhado da janela de transferências
 * @param {string} dateStr - Data em ISO 'YYYY-MM-DD'
 * @param {string} competitionId
 * @returns {Object} { isOpen, name, closesAt, nextWindowOpens, currentWindow }
 */
export function getTransferWindowStatus(dateStr, competitionId) {
  const region = getCalendarRegion(competitionId);
  const cfg = CALENDAR_CONFIG[region];
  const currentDate = dateStr ? dateStr.split('T')[0] : cfg.seasonStart;

  const activeWindow = cfg.transferWindows.find(
    w => currentDate >= w.opensAt && currentDate <= w.closesAt
  );

  if (activeWindow) {
    return {
      isOpen: true,
      name: activeWindow.name,
      closesAt: activeWindow.closesAt,
      nextWindowOpens: null,
      currentWindow: activeWindow,
      statusLabel: `Janela Aberta (Fecha em ${formatGameDate(activeWindow.closesAt)})`
    };
  }

  // Janela Fechada: encontra a próxima que abrirá
  const nextWindow = cfg.transferWindows.find(w => currentDate < w.opensAt);
  const nextOpenDate = nextWindow ? nextWindow.opensAt : (region === 'brazil' ? '2027-01-11' : '2026-07-01');

  return {
    isOpen: false,
    name: 'Janela de Transferências Fechada',
    closesAt: null,
    nextWindowOpens: nextOpenDate,
    currentWindow: null,
    statusLabel: `Janela Fechada (Reabre em ${formatGameDate(nextOpenDate)})`
  };
}

/**
 * Gera as rodadas da liga com suas respectivas datas oficiais de calendário esportivo.
 * Respeita a cadência oficial de fins de semana (sáb/dom) e meios de semana (quartas-feiras),
 * sem conflitos e alinhada ao calendário oficial da CBF (Brasil) ou UEFA/Premier League (Europa).
 * 
 * @param {string} competitionId - Identificador da competição
 * @param {Array} clubs - Lista de clubes
 * @returns {Array} Rodadas estruturadas contendo data e partidas com horário
 */
export function generateDatedLeagueFixtures(competitionId, clubs) {
  const rawRounds = generateLeagueFixtures(clubs);
  if (!rawRounds || rawRounds.length === 0) return [];

  const region = getCalendarRegion(competitionId);
  const cfg = CALENDAR_CONFIG[region];

  // Gera datas oficiais espaçadas realisticamente para o número de rodadas
  const totalRounds = rawRounds.length;
  const scheduledDates = [];

  let currentDate = cfg.officialStart; // 2025-04-12 (Brasil) ou 2025-08-15 (Europa)

  for (let r = 0; r < totalRounds; r++) {
    scheduledDates.push(currentDate);

    // No futebol brasileiro com 38 rodadas (abril a dezembro), alternam-se meios de semana e fins de semana:
    // A cada ~4 rodadas há 1 rodada de meio de semana (+4 dias), e as demais no fim de semana (+7 dias).
    if (region === 'brazil') {
      const isMidweek = r % 3 === 1;
      const stepDays = isMidweek ? 4 : (r % 3 === 2 ? 3 : 7);
      currentDate = advanceGameDate(currentDate, stepDays);
    } else {
      // Calendário Europeu (agosto a maio): majoritariamente aos sábados com rodadas pontuais de meio de semana
      const isMidweek = r === 14 || r === 20 || r === 31;
      currentDate = advanceGameDate(currentDate, isMidweek ? 3 : 7);
    }
  }

  // Mapeia cada rodada e suas partidas atribuindo a data oficial
  return rawRounds.map((round, idx) => {
    const roundDate = scheduledDates[idx] || advanceGameDate(cfg.officialStart, idx * 7);
    const dateObj = parseDateParts(roundDate);
    const dayOfWeek = dateObj.getUTCDay(); // 0: Dom, 3: Qua, 6: Sáb
    const defaultTime = dayOfWeek === 3 ? '21:30' : (dayOfWeek === 0 ? '16:00' : '18:30');

    const datedMatches = round.matches.map((m, matchIdx) => ({
      ...m,
      matchId: `${competitionId}_r${round.roundNumber}_m${matchIdx + 1}`,
      date: roundDate,
      time: defaultTime,
      competitionId
    }));

    return {
      ...round,
      competitionId,
      date: roundDate,
      formattedDate: formatGameDate(roundDate),
      matches: datedMatches
    };
  });
}
