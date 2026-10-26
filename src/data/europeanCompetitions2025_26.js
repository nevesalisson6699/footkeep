/**
 * European Competitions Catalog 2025/2026 for Footkeep
 * Módulo Oficial de Competições Europeias: Torneios Continentais, Ligas de Topo, Divisões de Acesso e Copas Nacionais
 * 
 * Fontes Oficiais: UEFA (uefa.com), Premier League (premierleague.com), LaLiga (laliga.com),
 * Bundesliga (bundesliga.com), Lega Serie A (legaseriea.it), LFP Ligue 1 (lfp.fr), The FA (thefa.com),
 * EFL (efl.com), RFEF (rfef.es) e Transfermarkt (transfermarkt.com).
 * Data de Auditoria e Consulta: Outubro de 2026
 * Governança: Estatísticas acumuladas de carreira iniciam estritamente zeradas (0 jogos, 0 gols).
 */

export const EUROPEAN_DATASET_METADATA = {
  project: 'Footkeep Football Manager',
  module: 'European Competitions Catalog (Season 2025/2026)',
  version: '2026.1.0',
  continent: 'Europa (UEFA)',
  targetSeason: '2025 / 2026 (Consolidado e Projeção 2026)',
  consultationDate: 'Outubro de 2026',
  sources: [
    'UEFA Official Club & National Team Competitions (uefa.com)',
    'The Football Association & Premier League (premierleague.com / thefa.com)',
    'English Football League (efl.com)',
    'LaLiga EA Sports & Real Federación Española de Fútbol (laliga.com / rfef.es)',
    'DFL Deutsche Fußball Liga (bundesliga.com)',
    'Lega Serie A (legaseriea.it)',
    'Ligue de Football Professionnel (lfp.fr / ligue1.com)',
    'Transfermarkt International Competitions & Squad Registry (transfermarkt.com)'
  ],
  governancePolicy: 'Separação estrita entre catálogo institucional e simulação. Todos os atletas e clubes ingressam com estatísticas zeradas no save de carreira (matches: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0).'
};

/**
 * Catálogo Canônico de Competições Europeias (30 Competições Estruturadas)
 */
export const EUROPEAN_COMPETITIONS_2025_26 = {
  // ==========================================
  // 1. TORNEIOS CONTINENTAIS E SELEÇÕES
  // ==========================================
  uefa_champions_league: {
    id: 'uefa_champions_league',
    name: 'UEFA Champions League',
    shortName: 'Champions League',
    region: 'Europa (Continental)',
    type: 'continental_cup',
    tier: 'Continental 1',
    teamsCount: 36,
    formatDescription: 'Novo formato com fase de liga unificada de 36 clubes (8 jogos contra 8 adversários diferentes), seguido de play-offs e mata-mata tradicional até a final em jogo único.',
    prominentClubs: [
      { name: 'Real Madrid', country: 'Espanha', flag: '🇪🇸' },
      { name: 'Manchester City', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { name: 'Bayern de Munique', country: 'Alemanha', flag: '🇩🇪' },
      { name: 'Barcelona', country: 'Espanha', flag: '🇪🇸' },
      { name: 'Paris Saint-Germain', country: 'França', flag: '🇫🇷' },
      { name: 'Liverpool', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { name: 'Inter de Milão', country: 'Itália', flag: '🇮🇹' },
      { name: 'Arsenal', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { name: 'Bayer Leverkusen', country: 'Alemanha', flag: '🇩🇪' },
      { name: 'Atlético de Madrid', country: 'Espanha', flag: '🇪🇸' }
    ],
    sources: ['uefa.com', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  uefa_europa_league: {
    id: 'uefa_europa_league',
    name: 'UEFA Europa League',
    shortName: 'Europa League',
    region: 'Europa (Continental)',
    type: 'continental_cup',
    tier: 'Continental 2',
    teamsCount: 36,
    formatDescription: 'Fase de liga única com 36 clubes (8 partidas na primeira fase), avançando os 8 melhores direto às oitavas e 9º ao 24º aos play-offs.',
    prominentClubs: [
      { name: 'Manchester United', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { name: 'Tottenham Hotspur', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { name: 'Roma', country: 'Itália', flag: '🇮🇹' },
      { name: 'Lazio', country: 'Itália', flag: '🇮🇹' },
      { name: 'Porto', country: 'Portugal', flag: '🇵🇹' },
      { name: 'Athletic Club Bilbao', country: 'Espanha', flag: '🇪🇸' },
      { name: 'Real Sociedad', country: 'Espanha', flag: '🇪🇸' },
      { name: 'Eintracht Frankfurt', country: 'Alemanha', flag: '🇩🇪' },
      { name: 'Ajax', country: 'Países Baixos', flag: '🇳🇱' },
      { name: 'Galatasaray', country: 'Turquia', flag: '🇹🇷' }
    ],
    sources: ['uefa.com', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  uefa_nations_league: {
    id: 'uefa_nations_league',
    name: 'UEFA Nations League',
    shortName: 'Nations League',
    region: 'Europa (Seleções Nacionais)',
    type: 'international_teams',
    tier: 'Seleções UEFA',
    teamsCount: 54,
    formatDescription: 'Divisão em 4 Ligas (A, B, C, D) com sistema de acesso/descenso, quartas de final e Final Four com disputa de título entre os líderes da Liga A.',
    prominentClubs: [
      { name: 'Espanha', country: 'Espanha', flag: '🇪🇸' },
      { name: 'França', country: 'França', flag: '🇫🇷' },
      { name: 'Inglaterra', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { name: 'Alemanha', country: 'Alemanha', flag: '🇩🇪' },
      { name: 'Portugal', country: 'Portugal', flag: '🇵🇹' },
      { name: 'Itália', country: 'Itália', flag: '🇮🇹' },
      { name: 'Países Baixos', country: 'Países Baixos', flag: '🇳🇱' },
      { name: 'Croácia', country: 'Croácia', flag: '🇭🇷' }
    ],
    sources: ['uefa.com', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  // ==========================================
  // 2. LIGAS PRINCIPAIS (TIER 1 EUROPEU)
  // ==========================================
  premier_league: {
    id: 'premier_league',
    name: 'Premier League',
    shortName: 'Premier League',
    region: 'Inglaterra',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 20,
    formatDescription: 'Pontos corridos em 38 rodadas (turno e returno). 4 vagas diretas na UEFA Champions League e 3 rebaixamentos para a EFL Championship.',
    prominentClubs: [
      { name: 'Manchester City', shortName: 'MCI', stadium: 'Etihad Stadium' },
      { name: 'Arsenal', shortName: 'ARS', stadium: 'Emirates Stadium' },
      { name: 'Liverpool', shortName: 'LIV', stadium: 'Anfield' },
      { name: 'Aston Villa', shortName: 'AVL', stadium: 'Villa Park' },
      { name: 'Chelsea', shortName: 'CHE', stadium: 'Stamford Bridge' },
      { name: 'Tottenham Hotspur', shortName: 'TOT', stadium: 'Tottenham Hotspur Stadium' },
      { name: 'Newcastle United', shortName: 'NEW', stadium: "St James' Park" },
      { name: 'Manchester United', shortName: 'MUN', stadium: 'Old Trafford' }
    ],
    sources: ['premierleague.com', 'thefa.com', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  laliga: {
    id: 'laliga',
    name: 'LaLiga EA Sports',
    shortName: 'LaLiga',
    region: 'Espanha',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 20,
    formatDescription: 'Pontos corridos em 38 rodadas. 4 vagas diretas na Champions League e 3 rebaixamentos para a LaLiga Hypermotion.',
    prominentClubs: [
      { name: 'Real Madrid', shortName: 'RMA', stadium: 'Santiago Bernabéu' },
      { name: 'Barcelona', shortName: 'FCB', stadium: 'Spotify Camp Nou' },
      { name: 'Atlético de Madrid', shortName: 'ATM', stadium: 'Cívitas Metropolitano' },
      { name: 'Athletic Club Bilbao', shortName: 'ATH', stadium: 'San Mamés' },
      { name: 'Real Sociedad', shortName: 'RSO', stadium: 'Reale Arena' },
      { name: 'Villarreal CF', shortName: 'VIL', stadium: 'Estadio de la Cerámica' },
      { name: 'Real Betis', shortName: 'BET', stadium: 'Benito Villamarín' }
    ],
    sources: ['laliga.com', 'rfef.es', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  bundesliga: {
    id: 'bundesliga',
    name: 'Bundesliga',
    shortName: 'Bundesliga',
    region: 'Alemanha',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 18,
    formatDescription: 'Pontos corridos em 34 rodadas. 4 vagas na Champions League, 2 rebaixamentos diretos e 1 vaga no playoff de rebaixamento contra o 3º da 2. Bundesliga.',
    prominentClubs: [
      { name: 'Bayern de Munique', shortName: 'BAY', stadium: 'Allianz Arena' },
      { name: 'Bayer Leverkusen', shortName: 'B04', stadium: 'BayArena' },
      { name: 'Borussia Dortmund', shortName: 'BVB', stadium: 'Signal Iduna Park' },
      { name: 'RB Leipzig', shortName: 'RBL', stadium: 'Red Bull Arena' },
      { name: 'Eintracht Frankfurt', shortName: 'SGE', stadium: 'Deutsche Bank Park' },
      { name: 'VfB Stuttgart', shortName: 'VFB', stadium: 'MHPArena' }
    ],
    sources: ['bundesliga.com', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  serie_a_italy: {
    id: 'serie_a_italy',
    name: 'Serie A Enilive',
    shortName: 'Serie A (Itália)',
    region: 'Itália',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 20,
    formatDescription: 'Pontos corridos em 38 rodadas com calendário assimétrico. 4 vagas na Champions League e 3 rebaixamentos para a Serie BKT.',
    prominentClubs: [
      { name: 'Inter de Milão', shortName: 'INT', stadium: 'San Siro / Giuseppe Meazza' },
      { name: 'Juventus', shortName: 'JUV', stadium: 'Allianz Stadium' },
      { name: 'Milan', shortName: 'MIL', stadium: 'San Siro' },
      { name: 'Napoli', shortName: 'NAP', stadium: 'Stadio Diego Armando Maradona' },
      { name: 'Atalanta', shortName: 'ATA', stadium: 'Gewiss Stadium' },
      { name: 'Roma', shortName: 'ASR', stadium: 'Stadio Olimpico' },
      { name: 'Lazio', shortName: 'LAZ', stadium: 'Stadio Olimpico' }
    ],
    sources: ['legaseriea.it', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  ligue_1: {
    id: 'ligue_1',
    name: 'Ligue 1 McDonald’s',
    shortName: 'Ligue 1',
    region: 'França',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 18,
    formatDescription: 'Pontos corridos em 34 rodadas (reconfiguração para 18 clubes). 3 vagas diretas e 1 na fase preliminar da Champions League, 2 rebaixamentos diretos e 1 playoff.',
    prominentClubs: [
      { name: 'Paris Saint-Germain', shortName: 'PSG', stadium: 'Parc des Princes' },
      { name: 'Monaco', shortName: 'ASM', stadium: 'Stade Louis II' },
      { name: 'Marseille', shortName: 'OM', stadium: 'Orange Vélodrome' },
      { name: 'Lille', shortName: 'LOSC', stadium: 'Decathlon Arena - Stade Pierre-Mauroy' },
      { name: 'Lyon', shortName: 'OL', stadium: 'Groupama Stadium' },
      { name: 'Nice', shortName: 'OGCN', stadium: 'Allianz Riviera' }
    ],
    sources: ['lfp.fr', 'ligue1.com', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  eredivisie: {
    id: 'eredivisie',
    name: 'Eredivisie',
    shortName: 'Eredivisie',
    region: 'Países Baixos',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 18,
    formatDescription: 'Pontos corridos em 34 rodadas. Vagas europeias diretas e playoffs para a Conference League; 2 rebaixamentos diretos e 1 playoff com a Eerste Divisie.',
    prominentClubs: [
      { name: 'PSV Eindhoven', shortName: 'PSV', stadium: 'Philips Stadion' },
      { name: 'Feyenoord', shortName: 'FEY', stadium: 'De Kuip' },
      { name: 'Ajax', shortName: 'AJA', stadium: 'Johan Cruyff Arena' },
      { name: 'AZ Alkmaar', shortName: 'AZ', stadium: 'AFAS Stadion' },
      { name: 'FC Twente', shortName: 'TWE', stadium: 'De Grolsch Veste' }
    ],
    sources: ['eredivisie.eu', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  primeira_liga_portugal: {
    id: 'primeira_liga_portugal',
    name: 'Liga Portugal Betclic (Primeira Liga)',
    shortName: 'Primeira Liga',
    region: 'Portugal',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 18,
    formatDescription: 'Pontos corridos em 34 rodadas. Disputa intensa entre os Três Grandes (Sporting, Benfica e Porto); 2 rebaixamentos diretos e 1 vaga em playoff.',
    prominentClubs: [
      { name: 'Sporting CP', shortName: 'SCP', stadium: 'Estádio José Alvalade' },
      { name: 'Benfica', shortName: 'SLB', stadium: 'Estádio da Luz' },
      { name: 'Porto', shortName: 'FCP', stadium: 'Estádio do Dragão' },
      { name: 'Sporting de Braga', shortName: 'SCB', stadium: 'Estádio Municipal de Braga' },
      { name: 'Vitória de Guimarães', shortName: 'VSC', stadium: 'Estádio D. Afonso Henriques' }
    ],
    sources: ['ligaportugal.pt', 'fpf.pt', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  super_lig_turkey: {
    id: 'super_lig_turkey',
    name: 'Trendyol Süper Lig',
    shortName: 'Süper Lig (Turquia)',
    region: 'Turquia',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 19,
    formatDescription: 'Pontos corridos em 38 rodadas (com folga por rodada devido ao número ímpar). Clássicos de Istambul e 4 rebaixamentos diretos.',
    prominentClubs: [
      { name: 'Galatasaray', shortName: 'GAL', stadium: 'RAMS Park' },
      { name: 'Fenerbahçe', shortName: 'FEN', stadium: 'Ülker Stadyumu' },
      { name: 'Beşiktaş', shortName: 'BJK', stadium: 'Tüpraş Stadyumu' },
      { name: 'Trabzonspor', shortName: 'TRA', stadium: 'Papara Park' },
      { name: 'İstanbul Başakşehir', shortName: 'IBFK', stadium: 'Başakşehir Fatih Terim' }
    ],
    sources: ['tff.org', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  russian_premier_league: {
    id: 'russian_premier_league',
    name: 'Russian Premier League (RPL)',
    shortName: 'Premier League Russa',
    region: 'Rússia',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 16,
    formatDescription: 'Pontos corridos em 30 rodadas com pausa de inverno. 2 rebaixamentos diretos e 2 vagas em playoffs de rebaixamento contra a FNL.',
    prominentClubs: [
      { name: 'Zenit São Petersburgo', shortName: 'ZEN', stadium: 'Gazprom Arena' },
      { name: 'Krasnodar', shortName: 'KRA', stadium: 'Krasnodar Stadium' },
      { name: 'Dynamo Moscou', shortName: 'DYN', stadium: 'VTB Arena' },
      { name: 'Spartak Moscou', shortName: 'SPA', stadium: 'Lukoil Arena' },
      { name: 'CSKA Moscou', shortName: 'CSK', stadium: 'VEB Arena' },
      { name: 'Lokomotiv Moscou', shortName: 'LOK', stadium: 'RZD Arena' }
    ],
    sources: ['premierliga.ru', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  scottish_premiership: {
    id: 'scottish_premiership',
    name: 'William Hill Scottish Premiership',
    shortName: 'Premiership (Escócia)',
    region: 'Escócia',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 12,
    formatDescription: '33 rodadas regulares todos contra todos, seguidas de divisão (split) em top 6 (championship) e bottom 6 (relegation) para mais 5 rodadas decisivas (total 38 jogos).',
    prominentClubs: [
      { name: 'Celtic', shortName: 'CEL', stadium: 'Celtic Park' },
      { name: 'Rangers', shortName: 'RAN', stadium: 'Ibrox Stadium' },
      { name: 'Aberdeen', shortName: 'ABE', stadium: 'Pittodrie Stadium' },
      { name: 'Heart of Midlothian', shortName: 'HEA', stadium: 'Tynecastle Park' },
      { name: 'Hibernian', shortName: 'HIB', stadium: 'Easter Road' }
    ],
    sources: ['spfl.co.uk', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  // ==========================================
  // 3. DIVISÕES DE ACESSO (SEGUNDAS E TERCEIRAS DIVISÕES)
  // ==========================================
  championship_england: {
    id: 'championship_england',
    name: 'EFL Championship',
    shortName: 'Championship',
    region: 'Inglaterra',
    type: 'league',
    tier: 'Nacional 2',
    teamsCount: 24,
    formatDescription: '46 rodadas extenuantes. 2 primeiros sobem direto à Premier League; 3º ao 6º disputam os playoffs com a final milionária em Wembley; 3 rebaixamentos para a League One.',
    prominentClubs: [
      { name: 'Leeds United', shortName: 'LEE', stadium: 'Elland Road' },
      { name: 'Burnley', shortName: 'BUR', stadium: 'Turf Moor' },
      { name: 'Sheffield United', shortName: 'SHU', stadium: 'Bramall Lane' },
      { name: 'Sunderland', shortName: 'SUN', stadium: 'Stadium of Light' },
      { name: 'West Bromwich Albion', shortName: 'WBA', stadium: 'The Hawthorns' },
      { name: 'Middlesbrough', shortName: 'MID', stadium: 'Riverside Stadium' }
    ],
    sources: ['efl.com', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  league_one_england: {
    id: 'league_one_england',
    name: 'EFL League One',
    shortName: 'League One',
    region: 'Inglaterra',
    type: 'league',
    tier: 'Nacional 3',
    teamsCount: 24,
    formatDescription: '46 rodadas. 2 acessos diretos à Championship, 1 vaga via playoffs (3º ao 6º) e 4 rebaixamentos para a League Two.',
    prominentClubs: [
      { name: 'Birmingham City', shortName: 'BCFC', stadium: "St Andrew's" },
      { name: 'Wrexham AFC', shortName: 'WRE', stadium: 'Racecourse Ground' },
      { name: 'Huddersfield Town', shortName: 'HUD', stadium: 'John Smith’s Stadium' },
      { name: 'Charlton Athletic', shortName: 'CHA', stadium: 'The Valley' },
      { name: 'Bolton Wanderers', shortName: 'BOL', stadium: 'Toughsheet Community Stadium' },
      { name: 'Barnsley', shortName: 'BAR', stadium: 'Oakwell' }
    ],
    sources: ['efl.com', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  league_two_england: {
    id: 'league_two_england',
    name: 'EFL League Two',
    shortName: 'League Two',
    region: 'Inglaterra',
    type: 'league',
    tier: 'Nacional 4',
    teamsCount: 24,
    formatDescription: '46 rodadas. 3 acessos diretos à League One, 1 vaga por playoffs (4º ao 7º) e 2 rebaixamentos para a National League (Non-League).',
    prominentClubs: [
      { name: 'Port Vale', shortName: 'PVFC', stadium: 'Vale Park' },
      { name: 'Doncaster Rovers', shortName: 'DON', stadium: 'Eco-Power Stadium' },
      { name: 'Notts County', shortName: 'NTC', stadium: 'Meadow Lane' },
      { name: 'Bradford City', shortName: 'BRA', stadium: 'Valley Parade' },
      { name: 'Gillingham', shortName: 'GIL', stadium: 'Priestfield Stadium' },
      { name: 'Chesterfield', shortName: 'CHF', stadium: 'SMH Group Stadium' }
    ],
    sources: ['efl.com', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  laliga_2_spain: {
    id: 'laliga_2_spain',
    name: 'LaLiga Hypermotion (Segunda División)',
    shortName: 'LaLiga 2',
    region: 'Espanha',
    type: 'league',
    tier: 'Nacional 2',
    teamsCount: 22,
    formatDescription: '42 rodadas regulares. 2 primeiros colocados sobem direto para LaLiga; 3º ao 6º disputam playoff eliminatório; 4 rebaixamentos para a Primera Federación.',
    prominentClubs: [
      { name: 'Racing de Santander', shortName: 'RAC', stadium: 'El Sardinero' },
      { name: 'Levante UD', shortName: 'LEV', stadium: 'Ciutat de València' },
      { name: 'Real Zaragoza', shortName: 'ZAR', stadium: 'La Romareda' },
      { name: 'Sporting de Gijón', shortName: 'SPG', stadium: 'El Molinón' },
      { name: 'Elche CF', shortName: 'ELC', stadium: 'Manuel Martínez Valero' },
      { name: 'Cádiz CF', shortName: 'CAD', stadium: 'Nuevo Mirandilla' },
      { name: 'Granada CF', shortName: 'GRA', stadium: 'Los Cármenes' },
      { name: 'Almería', shortName: 'ALM', stadium: 'Power Horse Stadium' }
    ],
    sources: ['laliga.com', 'rfef.es', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  second_bundesliga_germany: {
    id: 'second_bundesliga_germany',
    name: '2. Bundesliga',
    shortName: '2. Bundesliga',
    region: 'Alemanha',
    type: 'league',
    tier: 'Nacional 2',
    teamsCount: 18,
    formatDescription: '34 rodadas. 2 acessos diretos, 1 vaga no playoff de acesso contra o 16º da Bundesliga; 2 rebaixamentos diretos e 1 playoff de descenso.',
    prominentClubs: [
      { name: 'Hamburger SV (Hamburgo)', shortName: 'HSV', stadium: 'Volksparkstadion' },
      { name: '1. FC Köln (Colônia)', shortName: 'KOE', stadium: 'RheinEnergieStadion' },
      { name: 'Schalke 04', shortName: 'S04', stadium: 'Veltins-Arena' },
      { name: 'Hertha Berlin', shortName: 'BSC', stadium: 'Olympiastadion Berlin' },
      { name: 'Fortuna Düsseldorf', shortName: 'F95', stadium: 'Merkur Spiel-Arena' },
      { name: 'Hannover 96', shortName: 'H96', stadium: 'Heinz von Heiden Arena' }
    ],
    sources: ['bundesliga.com', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  serie_b_italy: {
    id: 'serie_b_italy',
    name: 'Serie BKT',
    shortName: 'Serie B (Itália)',
    region: 'Itália',
    type: 'league',
    tier: 'Nacional 2',
    teamsCount: 20,
    formatDescription: '38 rodadas. 2 acessos diretos à Serie A, playoffs dinâmicos do 3º ao 8º lugar (se a diferença for menor que 15 pontos) e playouts de descenso.',
    prominentClubs: [
      { name: 'Pisa SC', shortName: 'PIS', stadium: 'Arena Garibaldi' },
      { name: 'Sassuolo', shortName: 'SAS', stadium: 'Mapei Stadium' },
      { name: 'Spezia', shortName: 'SPE', stadium: 'Stadio Alberto Picco' },
      { name: 'Palermo', shortName: 'PAL', stadium: 'Stadio Renzo Barbera' },
      { name: 'Sampdoria', shortName: 'SAM', stadium: 'Luigi Ferraris' },
      { name: 'Brescia', shortName: 'BRE', stadium: 'Mario Rigamonti' },
      { name: 'Frosinone', shortName: 'FRO', stadium: 'Benito Stirpe' }
    ],
    sources: ['legab.it', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  ligue_2_france: {
    id: 'ligue_2_france',
    name: 'Ligue 2 BKT',
    shortName: 'Ligue 2',
    region: 'França',
    type: 'league',
    tier: 'Nacional 2',
    teamsCount: 18,
    formatDescription: '34 rodadas. 2 acessos diretos à Ligue 1, 1 vaga disputada em playoffs escalonados entre 3º, 4º e 5º contra o antepenúltimo da Ligue 1; 2 descensos diretos.',
    prominentClubs: [
      { name: 'Paris FC', shortName: 'PFC', stadium: 'Stade Charléty' },
      { name: 'Lorient', shortName: 'FCL', stadium: 'Stade du Moustoir' },
      { name: 'Metz', shortName: 'FCM', stadium: 'Stade Saint-Symphorien' },
      { name: 'Guingamp', shortName: 'EAG', stadium: 'Stade de Roudourou' },
      { name: 'Bastia', shortName: 'SCB', stadium: 'Stade Armand-Cesari' },
      { name: 'Caen', shortName: 'SMC', stadium: 'Stade Michel d’Ornano' }
    ],
    sources: ['ligue2.fr', 'lfp.fr', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  eerste_divisie: {
    id: 'eerste_divisie',
    name: 'Keuken Kampioen Divisie (Eerste Divisie)',
    shortName: 'Eerste Divisie',
    region: 'Países Baixos',
    type: 'league',
    tier: 'Nacional 2',
    teamsCount: 20,
    formatDescription: '38 rodadas divididas em 4 períodos com premiação de vagas em playoffs. 2 acessos diretos à Eredivisie e playoffs de promoção Nacompetitie.',
    prominentClubs: [
      { name: 'Excelsior Rotterdam', shortName: 'EXC', stadium: 'Van Donge & De Roo Stadion' },
      { name: 'De Graafschap', shortName: 'GRA', stadium: 'De Vijverberg' },
      { name: 'FC Volendam', shortName: 'VOL', stadium: 'Kras Stadion' },
      { name: 'SC Cambuur', shortName: 'CAM', stadium: 'Kooi Stadion' },
      { name: 'Vitesse Arnhem', shortName: 'VIT', stadium: 'GelreDome' },
      { name: 'FC Den Bosch', shortName: 'DBO', stadium: 'Stadion De Vliert' }
    ],
    sources: ['keukenkampioendivisie.nl', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  // ==========================================
  // 4. LIGAS ADICIONAIS POPULARES
  // ==========================================
  pro_league_belgium: {
    id: 'pro_league_belgium',
    name: 'Jupiler Pro League',
    shortName: 'Pro League (Bélgica)',
    region: 'Bélgica',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 16,
    formatDescription: '30 rodadas regulares seguidas de Champions Playoffs (top 6 disputando o título com pontos divididos por 2) e Europe Playoffs.',
    prominentClubs: [
      { name: 'Club Brugge', shortName: 'CLU', stadium: 'Jan Breydel Stadium' },
      { name: 'Anderlecht', shortName: 'AND', stadium: 'Lotto Park' },
      { name: 'KRC Genk', shortName: 'GNK', stadium: 'Cegeka Arena' },
      { name: 'Royale Union Saint-Gilloise', shortName: 'USG', stadium: 'Stade Joseph Marien' },
      { name: 'Gent', shortName: 'GNT', stadium: 'Planet Group Arena' },
      { name: 'Royal Antwerp', shortName: 'ANT', stadium: 'Bosuilstadion' }
    ],
    sources: ['proleague.be', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  super_league_switzerland: {
    id: 'super_league_switzerland',
    name: 'Credit Suisse Super League',
    shortName: 'Super League (Suíça)',
    region: 'Suíça',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 12,
    formatDescription: '33 rodadas na primeira fase todos contra todos em turno triplo, seguidas de divisão em Championship Group (6 times) e Relegation Group (6 times) por mais 5 jogos (total 38).',
    prominentClubs: [
      { name: 'Young Boys', shortName: 'YB', stadium: 'Stadion Wankdorf' },
      { name: 'Basel', shortName: 'BAS', stadium: 'St. Jakob-Park' },
      { name: 'Servette FC', shortName: 'SFC', stadium: 'Stade de Genève' },
      { name: 'FC Zürich', shortName: 'FCZ', stadium: 'Letzigrund' },
      { name: 'FC Lugano', shortName: 'LUG', stadium: 'Stadio Cornaredo' },
      { name: 'St. Gallen', shortName: 'FCSG', stadium: 'Kybunpark' }
    ],
    sources: ['sfl.ch', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  tipico_bundesliga_austria: {
    id: 'tipico_bundesliga_austria',
    name: 'Admiral Bundesliga (Áustria)',
    shortName: 'Bundesliga Austríaca',
    region: 'Áustria',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 12,
    formatDescription: '22 rodadas regulares, dividindo-se em Grupo do Título (6 times) e Grupo do Rebaixamento (6 times) com pontuação dividida ao meio para mais 10 rodadas (total 32).',
    prominentClubs: [
      { name: 'Red Bull Salzburg', shortName: 'RBS', stadium: 'Red Bull Arena Salzburg' },
      { name: 'Sturm Graz', shortName: 'STU', stadium: 'Merkur Arena' },
      { name: 'Rapid Viena', shortName: 'RAP', stadium: 'Allianz Stadion' },
      { name: 'Austria Viena', shortName: 'FAK', stadium: 'Generali Arena' },
      { name: 'LASK Linz', shortName: 'LASK', stadium: 'Raiffeisen Arena' }
    ],
    sources: ['bundesliga.at', 'oefb.at', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  superliga_denmark: {
    id: 'superliga_denmark',
    name: '3F Superliga',
    shortName: 'Superliga (Dinamarca)',
    region: 'Dinamarca',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 12,
    formatDescription: '22 rodadas na fase preliminar, com divisão em Grupo do Campeonato (top 6) e Grupo de Qualificação/Rebaixamento (bottom 6) com mais 10 rodadas (total 32).',
    prominentClubs: [
      { name: 'FC Copenhague', shortName: 'FCK', stadium: 'Parken Stadium' },
      { name: 'FC Midtjylland', shortName: 'FCM', stadium: 'MCH Arena' },
      { name: 'Brøndby IF', shortName: 'BIF', stadium: 'Brøndby Stadion' },
      { name: 'AGF Aarhus', shortName: 'AGF', stadium: 'Ceres Park' },
      { name: 'FC Nordsjælland', shortName: 'FCN', stadium: 'Right to Dream Park' }
    ],
    sources: ['superliga.dk', 'dbu.dk', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  eliteserien_norway: {
    id: 'eliteserien_norway',
    name: 'Eliteserien',
    shortName: 'Eliteserien (Noruega)',
    region: 'Noruega',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 16,
    formatDescription: 'Calendário de verão (primavera a outono) em 30 rodadas. 2 rebaixamentos diretos e 1 playoff de descenso contra o vencedor dos playoffs da OBOS-ligaen.',
    prominentClubs: [
      { name: 'Bodø/Glimt', shortName: 'BOD', stadium: 'Aspmyra Stadion' },
      { name: 'Brann', shortName: 'BRA', stadium: 'Brann Stadion' },
      { name: 'Molde FK', shortName: 'MOL', stadium: 'Aker Stadion' },
      { name: 'Rosenborg', shortName: 'RBK', stadium: 'Lerkendal Stadion' },
      { name: 'Viking FK', shortName: 'VIK', stadium: 'SR-Bank Arena' }
    ],
    sources: ['eliteserien.no', 'fotball.no', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  allsvenskan_sweden: {
    id: 'allsvenskan_sweden',
    name: 'Allsvenskan',
    shortName: 'Allsvenskan (Suécia)',
    region: 'Suécia',
    type: 'league',
    tier: 'Nacional 1',
    teamsCount: 16,
    formatDescription: '30 rodadas em turno e returno disputadas no ano-calendário solar. 2 rebaixamentos diretos e 1 playoff contra o 3º colocado da Superettan.',
    prominentClubs: [
      { name: 'Malmö FF', shortName: 'MFF', stadium: 'Eleda Stadion' },
      { name: 'Hammarby IF', shortName: 'HAM', stadium: 'Tele2 Arena' },
      { name: 'Djurgårdens IF', shortName: 'DIF', stadium: 'Tele2 Arena' },
      { name: 'AIK', shortName: 'AIK', stadium: 'Friends Arena' },
      { name: 'IF Elfsborg', shortName: 'ELF', stadium: 'Borås Arena' },
      { name: 'IFK Göteborg', shortName: 'IFK', stadium: 'Gamla Ullevi' }
    ],
    sources: ['allsvenskan.se', 'svenskfotboll.se', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  // ==========================================
  // 5. COPAS NACIONAIS PRINCIPAIS
  // ==========================================
  fa_cup: {
    id: 'fa_cup',
    name: 'The Emirates FA Cup',
    shortName: 'FA Cup',
    region: 'Inglaterra',
    type: 'national_cup',
    tier: 'Copa Nacional 1',
    teamsCount: 124, // Fases principais oficiais (a partir da 1ª Rodada Própria)
    formatDescription: 'O mais antigo torneio de futebol do mundo. Sistema mata-mata puro (single elimination sem repetição de jogo a partir das fases iniciais no novo acordo da FA), com final tradicional no Estádio de Wembley.',
    prominentClubs: [
      { name: 'Manchester City', country: 'Inglaterra' },
      { name: 'Manchester United', country: 'Inglaterra' },
      { name: 'Arsenal', country: 'Inglaterra' },
      { name: 'Liverpool', country: 'Inglaterra' },
      { name: 'Chelsea', country: 'Inglaterra' },
      { name: 'Newcastle United', country: 'Inglaterra' }
    ],
    sources: ['thefa.com', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  carabao_cup: {
    id: 'carabao_cup',
    name: 'EFL Cup (Carabao Cup)',
    shortName: 'Carabao Cup',
    region: 'Inglaterra',
    type: 'national_cup',
    tier: 'Copa da Liga',
    teamsCount: 92, // Todos os 92 clubes da pirâmide da Premier League + EFL
    formatDescription: 'Copa da Liga Inglesa com participação dos 92 clubes das quatro primeiras divisões. Jogos eliminatórios únicos, semifinais em ida e volta e grande final em Wembley.',
    prominentClubs: [
      { name: 'Liverpool', country: 'Inglaterra' },
      { name: 'Manchester City', country: 'Inglaterra' },
      { name: 'Chelsea', country: 'Inglaterra' },
      { name: 'Arsenal', country: 'Inglaterra' },
      { name: 'Tottenham Hotspur', country: 'Inglaterra' },
      { name: 'Newcastle United', country: 'Inglaterra' }
    ],
    sources: ['efl.com', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  },

  copa_del_rey: {
    id: 'copa_del_rey',
    name: 'Copa de Su Majestad el Rey',
    shortName: 'Copa del Rey',
    region: 'Espanha',
    type: 'national_cup',
    tier: 'Copa Nacional 1',
    teamsCount: 125, // Fases preliminares e fase final nacional
    formatDescription: 'Eliminatória simples em campo do clube de menor divisão até as semifinais (que são disputadas em partidas de ida e volta). Grande final em campo neutro (Estadio de La Cartuja, Sevilha).',
    prominentClubs: [
      { name: 'Real Madrid', country: 'Espanha' },
      { name: 'Barcelona', country: 'Espanha' },
      { name: 'Athletic Club Bilbao', country: 'Espanha' },
      { name: 'Atlético de Madrid', country: 'Espanha' },
      { name: 'Real Sociedad', country: 'Espanha' },
      { name: 'Mallorca', country: 'Espanha' }
    ],
    sources: ['rfef.es', 'transfermarkt.com'],
    auditDate: 'Outubro de 2026',
    initialStats: { played: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
  }
};

/**
 * Retorna array consolidado de todas as competições europeias mapeadas
 * @returns {Array<Object>}
 */
export function getAllEuropeanCompetitions() {
  return Object.values(EUROPEAN_COMPETITIONS_2025_26);
}

/**
 * Filtra competições por tipo ('continental_cup', 'league', 'national_cup', 'international_teams')
 * @param {string} type
 * @returns {Array<Object>}
 */
export function getEuropeanCompetitionsByType(type) {
  return Object.values(EUROPEAN_COMPETITIONS_2025_26).filter(c => c.type === type);
}

/**
 * Busca uma competição europeia pelo ID canônico
 * @param {string} competitionId
 * @returns {Object|null}
 */
export function getEuropeanCompetitionById(competitionId) {
  return EUROPEAN_COMPETITIONS_2025_26[competitionId] || null;
}
