// News Engine: Contextual simulation news generator for Footkeep
// Strict Governance: All news describe simulated in-game career events only; never external real-world facts.
// Deterministic ID generation guarantees zero duplication across reloads or save restores.

/**
 * Known classical football derbies for contextual simulation headlines
 */
const CLASSIC_DERBIES = [
  { pair: ['flamengo', 'vasco'], derbyName: 'Clássico dos Milhões' },
  { pair: ['flamengo', 'fluminense'], derbyName: 'Fla-Flu' },
  { pair: ['flamengo', 'botafogo'], derbyName: 'Clássico da Rivalidade' },
  { pair: ['botafogo', 'fluminense'], derbyName: 'Clássico Vovô' },
  { pair: ['palmeiras', 'corinthians'], derbyName: 'Derby Paulista' },
  { pair: ['sao_paulo', 'corinthians'], derbyName: 'Majestoso' },
  { pair: ['palmeiras', 'sao_paulo'], derbyName: 'Choque-Rei' },
  { pair: ['santos', 'palmeiras'], derbyName: 'Clássico da Saudade' },
  { pair: ['santos', 'corinthians'], derbyName: 'Clássico Alvinegro' },
  { pair: ['santos', 'sao_paulo'], derbyName: 'San-São' },
  { pair: ['gremio', 'internacional'], derbyName: 'Gre-Nal' },
  { pair: ['atletico_mg', 'cruzeiro'], derbyName: 'Clássico Mineiro' },
  { pair: ['bahia', 'vitoria'], derbyName: 'Ba-Vi' },
  { pair: ['athletico_pr', 'coritiba'], derbyName: 'Athletiba' },
  { pair: ['fortaleza', 'ceara'], derbyName: 'Clássico-Rei' },
  { pair: ['arsenal', 'tottenham'], derbyName: 'North London Derby' },
  { pair: ['liverpool', 'manchester_united'], derbyName: 'North West Derby' },
  { pair: ['manchester_city', 'manchester_united'], derbyName: 'Manchester Derby' },
  { pair: ['real_madrid', 'barcelona'], derbyName: 'El Clásico' },
  { pair: ['real_madrid', 'atletico_madrid'], derbyName: 'Derbi Madrileño' }
];

/**
 * Checks if two club IDs form a known derby
 */
function findDerbyInfo(homeId = '', awayId = '') {
  const normHome = String(homeId).toLowerCase();
  const normAway = String(awayId).toLowerCase();

  return CLASSIC_DERBIES.find(d => 
    (normHome.includes(d.pair[0]) && normAway.includes(d.pair[1])) ||
    (normHome.includes(d.pair[1]) && normAway.includes(d.pair[0]))
  );
}

/**
 * Helper to deduplicate news arrays by deterministic id
 * @param {Array} existingNews 
 * @param {Array} newNews 
 * @returns {Array} Deduplicated unified news list
 */
export function deduplicateNews(existingNews = [], newNews = []) {
  const seenIds = new Set();
  const combined = [];

  [...newNews, ...existingNews].forEach(item => {
    if (!item || !item.id) return;
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      combined.push(item);
    }
  });

  return combined;
}

/**
 * Generates contextual, realistic in-game news headlines and narrative reports
 * based strictly on career events that transpired during the simulation.
 * 
 * @param {Object} context
 * @param {number} context.currentRound - Current competition round
 * @param {Array} context.roundMatches - Matches just finished in this round
 * @param {Array} context.standings - Updated standings table
 * @param {Array} [context.prevStandings] - Standings before the round (optional)
 * @param {Array} [context.clubs] - Clubs list
 * @param {Array} [context.players] - Players list
 * @param {string} [context.userClubId] - User-managed club ID
 * @param {Array} [context.transferEvents] - Recent transfer signings/bids
 * @param {Array} [context.youthEvents] - Promoted youth academy players
 * @param {string} [context.currentDate] - Game date in 'YYYY-MM-DD'
 * @param {Array} [context.existingNews] - Previously persisted news for anti-duplication
 * @returns {Array} Array of new, non-duplicated simulation news objects
 */
export function generateSimulationNews(context = {}) {
  const {
    currentRound = 1,
    roundMatches = [],
    standings = [],
    prevStandings = [],
    clubs = [],
    players = [],
    userClubId = null,
    transferEvents = [],
    youthEvents = [],
    currentDate = '2025-04-12',
    existingNews = []
  } = context;

  const clubMap = new Map();
  clubs.forEach(c => clubMap.set(c.id, c));

  const playerMap = new Map();
  players.forEach(p => playerMap.set(p.id, p));

  const existingIds = new Set((existingNews || []).map(n => n.id));
  const generatedNews = [];

  const addNewsIfNew = (item) => {
    if (!item || !item.id) return;
    if (!existingIds.has(item.id)) {
      existingIds.add(item.id);
      generatedNews.push({
        ...item,
        isCareerSimulation: true,
        source: 'Footkeep Press Agency (Simulação da Carreira)'
      });
    }
  };

  // 1. MATCH RESULTS & HEADLINES
  roundMatches.forEach(m => {
    if (!m.played || m.homeScore === null || m.awayScore === null) return;

    const homeClub = clubMap.get(m.homeId) || { id: m.homeId, name: m.homeId };
    const awayClub = clubMap.get(m.awayId) || { id: m.awayId, name: m.awayId };
    const derby = findDerbyInfo(m.homeId, m.awayId);
    const scoreDiff = Math.abs(m.homeScore - m.awayScore);
    const isUserMatch = (m.homeId === userClubId || m.awayId === userClubId);

    // a) Classic Derby
    if (derby) {
      const derbyId = `news_r${currentRound}_derby_${m.homeId}_${m.awayId}`;
      let title = ``, body = ``;
      if (m.homeScore > m.awayScore) {
        title = `Na simulação do Footkeep, ${homeClub.name} leva a melhor no ${derby.derbyName} contra o ${awayClub.name}!`;
        body = `Em duelo eletrizante válido pela Rodada ${currentRound} no Footkeep, o ${homeClub.name} venceu o clássico por ${m.homeScore} a ${m.awayScore}. O resultado agita a torcida e impulsiona a moral do elenco na tabela da carreira.`;
      } else if (m.awayScore > m.homeScore) {
        title = `Em pleno clássico no Footkeep: ${awayClub.name} cala a torcida do ${homeClub.name} no ${derby.derbyName}!`;
        body = `Atuação histórica fora de casa! O ${awayClub.name} derrotou o rival ${homeClub.name} por ${m.awayScore} a ${m.homeScore} na Rodada ${currentRound} da temporada simulada do Footkeep.`;
      } else {
        title = `Tudo igual no ${derby.derbyName}! ${homeClub.name} e ${awayClub.name} empatam pela Rodada ${currentRound} no Footkeep`;
        body = `Muita intensidade e equilíbrio na simulação do Footkeep: clássico estadual terminou em ${m.homeScore} a ${m.awayScore}, com os dois rivais somando um ponto na corrida do campeonato.`;
      }

      addNewsIfNew({
        id: derbyId,
        category: 'match_result',
        type: 'derby',
        title,
        body,
        date: currentDate,
        round: currentRound,
        importance: isUserMatch ? 'high' : 'medium',
        clubId: m.homeScore >= m.awayScore ? m.homeId : m.awayId
      });
    }

    // b) Blowout / Goleada (scoreDiff >= 3)
    if (scoreDiff >= 3) {
      const winner = m.homeScore > m.awayScore ? homeClub : awayClub;
      const loser = m.homeScore > m.awayScore ? awayClub : homeClub;
      const winnerScore = Math.max(m.homeScore, m.awayScore);
      const loserScore = Math.min(m.homeScore, m.awayScore);
      const blowoutId = `news_r${currentRound}_blowout_${winner.id || 'w'}_${loser.id || 'l'}`;

      addNewsIfNew({
        id: blowoutId,
        category: 'match_result',
        type: 'blowout',
        title: `Goleada no Footkeep! ${winner.name} atropela o ${loser.name} por ${winnerScore} a ${loserScore}!`,
        body: `Exibição de gala na Rodada ${currentRound} da carreira: o ataque do ${winner.name} foi impiedoso e construiu uma vitória maiúscula diante do ${loser.name}. Estatísticas mostram domínio completo do jogo dentro da simulação.`,
        date: currentDate,
        round: currentRound,
        importance: isUserMatch ? 'high' : 'medium',
        clubId: winner.id
      });
    }

    // c) Dramatic High-Scoring Draw (>= 6 total goals)
    if (m.homeScore === m.awayScore && (m.homeScore + m.awayScore >= 6)) {
      const drawId = `news_r${currentRound}_draw_${m.homeId}_${m.awayId}`;
      addNewsIfNew({
        id: drawId,
        category: 'match_result',
        type: 'dramatic_draw',
        title: `Chuva de gols no Footkeep: ${homeClub.name} e ${awayClub.name} empatam em ${m.homeScore} a ${m.awayScore}!`,
        body: `Uma das partidas mais eletrizantes da simulação até aqui! Pela Rodada ${currentRound}, ${homeClub.name} e ${awayClub.name} protagonizaram um duelo épico com ${m.homeScore + m.awayScore} bolas na rede.`,
        date: currentDate,
        round: currentRound,
        importance: isUserMatch ? 'high' : 'low',
        clubId: m.homeId
      });
    }

    // d) Individual Match Performances (Gols múltiplos, hat-tricks)
    if (Array.isArray(m.events)) {
      const goalsByPlayer = {};
      m.events.forEach(ev => {
        if (ev.type === 'goal' && (ev.playerId || ev.playerName)) {
          const key = ev.playerId || ev.playerName;
          goalsByPlayer[key] = (goalsByPlayer[key] || 0) + 1;
        }
      });

      Object.entries(goalsByPlayer).forEach(([pKey, count]) => {
        if (count >= 2) {
          const isHatTrick = count >= 3;
          const sampleGoal = m.events.find(ev => (ev.playerId === pKey || ev.playerName === pKey) && ev.type === 'goal');
          const pName = sampleGoal?.playerName || pKey;
          const clubName = sampleGoal?.clubName || 'seu clube';
          const perfId = `news_r${currentRound}_perf_${pKey}_${count}g`;

          addNewsIfNew({
            id: perfId,
            category: 'individual',
            type: isHatTrick ? 'hat_trick' : 'brace',
            title: isHatTrick
              ? `No Footkeep: Hat-trick espetacular de ${pName} pelo ${clubName} na Rodada ${currentRound}!`
              : `Faro de gol no Footkeep: ${pName} marca duas vezes e comanda o ${clubName}!`,
            body: isHatTrick
              ? `Atuação de cinema na simulação do Footkeep! ${pName} anotou 3 gols em uma partida impecável pelo ${clubName}, sendo o grande nome da rodada e subindo na artilharia da temporada.`
              : `Decisivo! ${pName} balançou as redes duas vezes para o ${clubName} na Rodada ${currentRound} da carreira simulada.`,
            date: currentDate,
            round: currentRound,
            importance: isUserMatch ? 'high' : 'medium',
            relatedPlayerId: sampleGoal?.playerId || null,
            clubId: sampleGoal?.clubId || null
          });
        }
      });

      // Cartões vermelhos diretos com suspensão
      const directRed = m.events.find(ev => ev.type === 'card_red' && ev.isDirectRed);
      if (directRed) {
        const redId = `news_r${currentRound}_red_${directRed.playerId || directRed.playerName}`;
        addNewsIfNew({
          id: redId,
          category: 'individual',
          type: 'suspension',
          title: `Punição severa no Footkeep: ${directRed.playerName} recebe cartão vermelho direto e desfalcará o ${directRed.clubName}`,
          body: `Após lance imprudente na Rodada ${currentRound} da simulação, a arbitragem aplicou vermelho direto para ${directRed.playerName}. O atleta cumprirá suspensão automática na próxima rodada da carreira.`,
          date: currentDate,
          round: currentRound,
          importance: isUserMatch ? 'high' : 'low',
          relatedPlayerId: directRed.playerId || null,
          clubId: directRed.clubId || null
        });
      }
    }
  });

  // 2. STANDINGS SHIFTS & TITLE / G4 / Z4 RACES
  if (Array.isArray(standings) && standings.length >= 4) {
    const leader = standings[0];
    const prevLeader = Array.isArray(prevStandings) && prevStandings.length > 0 ? prevStandings[0] : null;

    // Mudança de liderança
    if (prevLeader && prevLeader.clubId !== leader.clubId) {
      const leadChangeId = `news_r${currentRound}_leader_change_${leader.clubId}`;
      addNewsIfNew({
        id: leadChangeId,
        category: 'standings',
        type: 'leader_change',
        title: `Novo líder no Footkeep! ${leader.name} assume a ponta da tabela na Rodada ${currentRound}!`,
        body: `Reviravolta na liderança da carreira simulada! O ${leader.name} ultrapassou o ${prevLeader.name} e agora ocupa o topo da classificação com ${leader.points} pontos em ${leader.played} partidas.`,
        date: currentDate,
        round: currentRound,
        importance: leader.clubId === userClubId || prevLeader.clubId === userClubId ? 'high' : 'medium',
        clubId: leader.clubId
      });
    } else if (currentRound % 5 === 0 && leader) {
      // Notícia de consolidação a cada 5 rodadas
      const leadConsolidateId = `news_r${currentRound}_leader_steady_${leader.clubId}`;
      addNewsIfNew({
        id: leadConsolidateId,
        category: 'standings',
        type: 'leader_steady',
        title: `Domínio na ponta: ${leader.name} sustenta liderança isolada na Rodada ${currentRound} do Footkeep`,
        body: `Com campanha sólida na simulação, o ${leader.name} chega a ${leader.points} pontos e segue firme como o time a ser batido na temporada regular da carreira.`,
        date: currentDate,
        round: currentRound,
        importance: leader.clubId === userClubId ? 'high' : 'low',
        clubId: leader.clubId
      });
    }

    // Luta contra o rebaixamento (Z4) em rodadas avançadas (após rodada 10)
    if (currentRound >= 10 && standings.length >= 16) {
      const bottomClub = standings[standings.length - 1];
      const z4Id = `news_r${currentRound}_z4_${bottomClub.clubId}`;
      if (currentRound % 6 === 0) {
        addNewsIfNew({
          id: z4Id,
          category: 'standings',
          type: 'relegation_alarm',
          title: `Alerta ligado no Footkeep: ${bottomClub.name} amarga a lanterna e luta para reagir`,
          body: `Situação delicada na simulação: o ${bottomClub.name} soma apenas ${bottomClub.points} pontos na Rodada ${currentRound} e precisa urgentemente de uma sequência de vitórias para deixar a zona de degola.`,
          date: currentDate,
          round: currentRound,
          importance: bottomClub.clubId === userClubId ? 'high' : 'low',
          clubId: bottomClub.clubId
        });
      }
    }
  }

  // 3. TRANSFER MARKET & WINDOWS
  if (Array.isArray(transferEvents)) {
    transferEvents.forEach(evt => {
      const evtId = `news_r${currentRound}_transfer_${evt.id || evt.playerId || evt.timestamp}`;
      addNewsIfNew({
        id: evtId,
        category: 'market',
        type: 'signing',
        title: `Mercado no Footkeep: ${evt.playerName} é oficialmente anunciado pelo ${evt.toClubName || 'novo clube'}!`,
        body: `Negócio fechado na janela de transferências do Footkeep: o atleta ${evt.playerName} (${evt.position || 'jogador'}) assinou contrato com o ${evt.toClubName}. A transação foi estimada em R$ ${(evt.fee || 0).toLocaleString('pt-BR')} dentro da simulação.`,
        date: currentDate,
        round: currentRound,
        importance: evt.toClubId === userClubId ? 'high' : 'medium',
        relatedPlayerId: evt.playerId || null,
        clubId: evt.toClubId || null
      });
    });
  }

  // 4. YOUTH ACADEMY & RISING STARS
  if (Array.isArray(youthEvents)) {
    youthEvents.forEach(y => {
      const youthId = `news_r${currentRound}_youth_${y.id || y.name}`;
      addNewsIfNew({
        id: youthId,
        category: 'youth',
        type: 'intake_promoted',
        title: `Joia da base no Footkeep: ${y.name} (${y.age} anos) é promovido ao elenco principal do ${y.clubName}!`,
        body: `A academia de jovens talentos do ${y.clubName} celebra a integração do promissor ${y.position} ${y.name} aos profissionais na carreira simulada. Com potencial avaliado em ${y.potential || 'alto'}, o jovem sonha em brilhar nos gramados do Footkeep.`,
        date: currentDate,
        round: currentRound,
        importance: y.clubId === userClubId ? 'high' : 'low',
        relatedPlayerId: y.id || null,
        clubId: y.clubId || null
      });
    });
  }

  return generatedNews;
}
