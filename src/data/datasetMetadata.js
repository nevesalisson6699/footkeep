// Metadata, data sources, season reference, and competition registry for Footkeep (Temporada 2025/26)

export const DATASET_METADATA = {
  project: 'Footkeep Football Manager',
  version: '2025.26.1',
  country: 'Brasil',
  season: '2025/26',
  competitions: [
    {
      id: 'brasileirao_serie_a',
      name: 'Campeonato Brasileiro — Série A',
      shortName: 'Brasileirão Série A',
      type: 'league',
      rounds: 38,
      teamsCount: 20,
      formatNotes: 'Formato oficial de 20 clubes em turno e returno (38 rodadas com mando de campo alternado). Critérios de desempate CBF: Pontos > Vitórias > Saldo de Gols > Gols Pró.'
    },
    {
      id: 'brasileirao_serie_b',
      name: 'Campeonato Brasileiro — Série B',
      shortName: 'Brasileirão Série B',
      type: 'league',
      rounds: 38,
      teamsCount: 20,
      formatNotes: 'Formato oficial de 20 clubes em turno e returno (38 rodadas). G-4 com acesso à Série A e Z-4 com descenso à Série C.'
    },
    {
      id: 'copa_do_brasil',
      name: 'Copa do Brasil',
      shortName: 'Copa do Brasil',
      type: 'cup',
      phases: ['oitavas', 'quartas', 'semi', 'final'],
      teamsCount: 16,
      formatNotes: 'Mata-mata eliminatório nacional com decisões em jogos de ida e volta (ou jogo único com pênaltis diretos em caso de empate agregado).'
    },
    {
      id: 'premier_league',
      name: 'Premier League',
      shortName: 'Premier League',
      country: 'Inglaterra',
      type: 'league',
      rounds: 38,
      teamsCount: 20,
      formatNotes: 'Liga de elite inglesa da temporada oficial 2025/26 com dados de monitoramento e estatísticas consolidadas Opta / Premier League Match Centre.'
    },
    {
      id: 'laliga',
      name: 'LaLiga',
      shortName: 'LaLiga',
      country: 'Espanha',
      type: 'league',
      rounds: 38,
      teamsCount: 20,
      formatNotes: 'Campeonato espanhol oficial da temporada 2025/26 com registros de pontuação, artilharia e métricas de desempenho catalogadas.'
    }
  ],
  sources: {
    clubsAndCompetitions: {
      origin: 'Confederação Brasileira de Futebol (CBF) - Registros Públicos Oficiais',
      season: '2025/26',
      url: 'https://www.cbf.com.br/futebol-brasileiro/competicoes/campeonato-brasileiro-serie-a',
      description: 'Nomes oficiais, cidades, estádios, capacidades e cores institucionais consolidadas dos clubes.'
    },
    squadsAndPlayers: {
      origin: 'Boletim Informativo Diário (BID / CBF) e Portais Oficiais dos Clubes (Temporada 2025/26)',
      season: '2025/26 (Auditado e consolidado com data de corte em Outubro de 2026)',
      reference: 'Súmulas oficiais da CBF, registros do BID e contratos federativos homologados.',
      notes: 'Escalações, idades, posições e valores de mercado compatíveis com o desempenho real dos atletas no ciclo 2025/26.'
    },
    badgesAndLogos: {
      policy: 'Escudos Originais Vetoriais Heráldicos (SVG)',
      license: 'Original Footkeep Creative Assets / MIT',
      terms: 'O jogo utiliza escudos vetoriais originais baseados na heráldica, nas cores e nos monogramas clássicos de cada agremiação, mantendo badgeUrl configurável.',
      author: 'Footkeep Studio'
    },
    refereeingAndOfficiating: {
      origin: 'Comissão de Arbitragem da Confederação Brasileira de Futebol (CBF) & Quadro FIFA',
      consultationDate: 'Outubro de 2026',
      description: 'Designações de arbitragem com nomes reais de árbitros principais, assistentes 1 e 2, quartos árbitros e equipe de VAR/AVAR.'
    }
  }
};
