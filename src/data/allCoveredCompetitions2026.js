/**
 * Catálogo Completo de Competições Cobertas pelo Footkeep (Temporada 2025/2026)
 * Mapeamento integral e taxonomia das 45 competições da lista de "Ligas Populares"
 * solicitadas pelo usuário, devidamente organizadas por continente e país.
 * 
 * Regra de Ouro da Governança Footkeep:
 * - Separação estrita entre cadastro real de 2026 e simulação interna iniciada do zero.
 * - Pontuações, partidas disputadas, gols e assistências começam zerados para qualquer nova carreira.
 * - Valores de mercado e salários representam estimativas algorítmicas (isEstimate: true).
 * 
 * Fontes Oficiais: CBF (BID), UEFA, CONMEBOL, The FA, Premier League, LaLiga, DFL, Lega Serie A, LFP, MLS, AFC, FIFA.
 * Data de Consulta e Auditoria: Outubro de 2026.
 */

export const POPULAR_COMPETITIONS_METADATA_2026 = {
  version: '2026.3.0',
  auditDate: 'Outubro de 2026',
  legalDisclaimer: 'O Footkeep Football Manager é um simulador independente. Todos os nomes, marcas, escudos e campeonatos pertencem aos seus respectivos titulares e federações esportivas.',
  totalCompetitionsCovered: 45
};

export const ALL_COVERED_COMPETITIONS_2026 = [
  // ==========================================
  // EUROPA (UEFA) — CONTINENTAL & SELEÇÕES
  // ==========================================
  {
    id: 'uefa_champions_league',
    name: 'UEFA Champions League',
    shortName: 'Champions League',
    continent: 'Europa',
    country: 'Europa (Continental)',
    countryFlag: '🇪🇺',
    type: 'continental_cup',
    format: 'Fase de Liga Unificada (36 clubes) + Playoffs + Mata-Mata',
    teamsCount: 36,
    prominentClubs: ['Real Madrid', 'Manchester City', 'Bayern de Munique', 'Paris Saint-Germain', 'Barcelona', 'Inter de Milão', 'Arsenal', 'Liverpool'],
    source: 'UEFA Official (uefa.com)',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'uefa_europa_league',
    name: 'UEFA Europa League',
    shortName: 'Europa League',
    continent: 'Europa',
    country: 'Europa (Continental)',
    countryFlag: '🇪🇺',
    type: 'continental_cup',
    format: 'Fase de Liga Unificada (36 clubes) + Playoffs + Mata-Mata',
    teamsCount: 36,
    prominentClubs: ['Tottenham Hotspur', 'Manchester United', 'Roma', 'Porto', 'Athletic Bilbao', 'Lazio', 'Ajax', 'Galatasaray'],
    source: 'UEFA Official (uefa.com)',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'uefa_nations_league',
    name: 'UEFA Nations League',
    shortName: 'Nations League',
    continent: 'Europa',
    country: 'Europa (Seleções)',
    countryFlag: '🇪🇺',
    type: 'international',
    format: 'Ligas A, B, C, D com promoção, rebaixamento e Final Four',
    teamsCount: 54,
    prominentClubs: ['Espanha', 'França', 'Alemanha', 'Inglaterra', 'Portugal', 'Itália', 'Países Baixos', 'Bélgica'],
    source: 'UEFA Official (uefa.com)',
    auditDate: 'Outubro de 2026'
  },

  // ==========================================
  // EUROPA — LIGAS DE PRIMEIRA DIVISÃO
  // ==========================================
  {
    id: 'premier_league',
    name: 'Premier League da Inglaterra',
    shortName: 'Premier League',
    continent: 'Europa',
    country: 'Inglaterra',
    countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    type: 'league',
    format: 'Pontos Corridos (Turno e Returno)',
    teamsCount: 20,
    roundsCount: 38,
    prominentClubs: ['Manchester City', 'Arsenal', 'Liverpool', 'Aston Villa', 'Chelsea', 'Newcastle', 'Manchester United', 'Tottenham'],
    source: 'premierleague.com / The FA',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'laliga',
    name: 'LaLiga da Espanha',
    shortName: 'LaLiga EA Sports',
    continent: 'Europa',
    country: 'Espanha',
    countryFlag: '🇪🇸',
    type: 'league',
    format: 'Pontos Corridos (Turno e Returno)',
    teamsCount: 20,
    roundsCount: 38,
    prominentClubs: ['Real Madrid', 'Barcelona', 'Atlético de Madrid', 'Athletic Bilbao', 'Real Sociedad', 'Villarreal', 'Real Betis', 'Sevilla'],
    source: 'laliga.com / RFEF',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga da Alemanha',
    shortName: 'Bundesliga',
    continent: 'Europa',
    country: 'Alemanha',
    countryFlag: '🇩🇪',
    type: 'league',
    format: 'Pontos Corridos (18 clubes)',
    teamsCount: 18,
    roundsCount: 34,
    prominentClubs: ['Bayer Leverkusen', 'Bayern de Munique', 'Borussia Dortmund', 'RB Leipzig', 'Eintracht Frankfurt', 'Stuttgart'],
    source: 'bundesliga.com / DFL',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'serie_a_italy',
    name: 'Serie A da Itália',
    shortName: 'Serie A (Itália)',
    continent: 'Europa',
    country: 'Itália',
    countryFlag: '🇮🇹',
    type: 'league',
    format: 'Pontos Corridos (20 clubes)',
    teamsCount: 20,
    roundsCount: 38,
    prominentClubs: ['Inter de Milão', 'Milan', 'Juventus', 'Atalanta', 'Napoli', 'Roma', 'Lazio', 'Fiorentina'],
    source: 'legaseriea.it / FIGC',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'ligue_1',
    name: 'Ligue 1 da França',
    shortName: 'Ligue 1',
    continent: 'Europa',
    country: 'França',
    countryFlag: '🇫🇷',
    type: 'league',
    format: 'Pontos Corridos (18 clubes)',
    teamsCount: 18,
    roundsCount: 34,
    prominentClubs: ['Paris Saint-Germain', 'Monaco', 'Marseille', 'Lille', 'Lyon', 'Lens', 'Rennes', 'Nice'],
    source: 'ligue1.com / LFP',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'eredivisie',
    name: 'Eredivisie dos Países Baixos',
    shortName: 'Eredivisie',
    continent: 'Europa',
    country: 'Países Baixos',
    countryFlag: '🇳🇱',
    type: 'league',
    format: 'Pontos Corridos (18 clubes)',
    teamsCount: 18,
    roundsCount: 34,
    prominentClubs: ['PSV Eindhoven', 'Feyenoord', 'Ajax', 'AZ Alkmaar', 'FC Twente', 'FC Utrecht'],
    source: 'eredivisie.nl / KNVB',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'primeira_liga',
    name: 'Primeira Liga de Portugal',
    shortName: 'Liga Portugal',
    continent: 'Europa',
    country: 'Portugal',
    countryFlag: '🇵🇹',
    type: 'league',
    format: 'Pontos Corridos (18 clubes)',
    teamsCount: 18,
    roundsCount: 34,
    prominentClubs: ['Sporting CP', 'Benfica', 'Porto', 'Sporting Braga', 'Vitória de Guimarães', 'Famalicão'],
    source: 'ligaportugal.pt / FPF',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'super_lig_turkey',
    name: 'Süper Lig da Turquia',
    shortName: 'Süper Lig',
    continent: 'Europa',
    country: 'Turquia',
    countryFlag: '🇹🇷',
    type: 'league',
    format: 'Pontos Corridos (19 clubes)',
    teamsCount: 19,
    roundsCount: 36,
    prominentClubs: ['Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Trabzonspor', 'İstanbul Başakşehir'],
    source: 'tff.org',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'russian_premier_league',
    name: 'Premier League da Rússia',
    shortName: 'Russian Premier League',
    continent: 'Europa',
    country: 'Rússia',
    countryFlag: '🇷🇺',
    type: 'league',
    format: 'Pontos Corridos (16 clubes)',
    teamsCount: 16,
    roundsCount: 30,
    prominentClubs: ['Zenit São Petersburgo', 'Krasnodar', 'Dynamo Moscou', 'Spartak Moscou', 'CSKA Moscou', 'Lokomotiv'],
    source: 'premierliga.ru / RFS',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'scottish_premiership',
    name: 'Premiership da Escócia',
    shortName: 'Scottish Premiership',
    continent: 'Europa',
    country: 'Escócia',
    countryFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    type: 'league',
    format: 'Primeira Fase (33 rodadas) + Play-off de Título / Rebaixamento (5 rodadas)',
    teamsCount: 12,
    roundsCount: 38,
    prominentClubs: ['Celtic', 'Rangers', 'Aberdeen', 'Heart of Midlothian', 'Hibernian', 'Kilmarnock'],
    source: 'spfl.co.uk / Scottish FA',
    auditDate: 'Outubro de 2026'
  },

  // ==========================================
  // EUROPA — DIVISÕES DE ACESSO
  // ==========================================
  {
    id: 'efl_championship',
    name: 'Championship da Inglaterra',
    shortName: 'EFL Championship',
    continent: 'Europa',
    country: 'Inglaterra',
    countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    type: 'league',
    format: 'Pontos Corridos (24 clubes) + Play-offs de Acesso',
    teamsCount: 24,
    roundsCount: 46,
    prominentClubs: ['Leeds United', 'Burnley', 'Sheffield United', 'West Bromwich', 'Sunderland', 'Norwich City'],
    source: 'efl.com',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'efl_league_one',
    name: 'League One da Inglaterra',
    shortName: 'EFL League One',
    continent: 'Europa',
    country: 'Inglaterra',
    countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    type: 'league',
    format: 'Pontos Corridos (24 clubes) + Play-offs',
    teamsCount: 24,
    roundsCount: 46,
    prominentClubs: ['Birmingham City', 'Huddersfield Town', 'Bolton Wanderers', 'Wrexham AFC', 'Charlton Athletic'],
    source: 'efl.com',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'efl_league_two',
    name: 'League Two da Inglaterra',
    shortName: 'EFL League Two',
    continent: 'Europa',
    country: 'Inglaterra',
    countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    type: 'league',
    format: 'Pontos Corridos (24 clubes) + Play-offs',
    teamsCount: 24,
    roundsCount: 46,
    prominentClubs: ['Doncaster Rovers', 'Chesterfield', 'Notts County', 'Milton Keynes Dons', 'Bradford City'],
    source: 'efl.com',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'laliga_2',
    name: 'LaLiga 2 da Espanha',
    shortName: 'LaLiga Hypermotion',
    continent: 'Europa',
    country: 'Espanha',
    countryFlag: '🇪🇸',
    type: 'league',
    format: 'Pontos Corridos (22 clubes) + Play-offs',
    teamsCount: 22,
    roundsCount: 42,
    prominentClubs: ['Racing Santander', 'Real Zaragoza', 'Levante UD', 'Cádiz CF', 'Granada CF', 'Deportivo La Coruña'],
    source: 'laliga.com / RFEF',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'bundesliga_2',
    name: '2. Bundesliga da Alemanha',
    shortName: '2. Bundesliga',
    continent: 'Europa',
    country: 'Alemanha',
    countryFlag: '🇩🇪',
    type: 'league',
    format: 'Pontos Corridos (18 clubes) + Relegação Play-off',
    teamsCount: 18,
    roundsCount: 34,
    prominentClubs: ['FC Köln', 'Hamburger SV', 'Hertha Berlim', 'Schalke 04', 'Hannover 96', 'Fortuna Düsseldorf'],
    source: 'bundesliga.com / DFL',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'serie_b_italy',
    name: 'Serie B da Itália',
    shortName: 'Serie B (Itália)',
    continent: 'Europa',
    country: 'Itália',
    countryFlag: '🇮🇹',
    type: 'league',
    format: 'Pontos Corridos (20 clubes) + Play-offs e Playouts',
    teamsCount: 20,
    roundsCount: 38,
    prominentClubs: ['Sassuolo', 'Salernitana', 'Frosinone', 'Pisa', 'Spezia', 'Palermo', 'Sampdoria', 'Brescia'],
    source: 'legab.it / FIGC',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'ligue_2',
    name: 'Ligue 2 da França',
    shortName: 'Ligue 2',
    continent: 'Europa',
    country: 'França',
    countryFlag: '🇫🇷',
    type: 'league',
    format: 'Pontos Corridos (18 clubes) + Play-offs de Promoção',
    teamsCount: 18,
    roundsCount: 34,
    prominentClubs: ['Metz', 'Lorient', 'Clermont Foot', 'Paris FC', 'Guingamp', 'Caen', 'Grenoble'],
    source: 'ligue2.fr / LFP',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'eerste_divisie',
    name: 'Eerste Divisie dos Países Baixos',
    shortName: 'Keuken Kampioen Divisie',
    continent: 'Europa',
    country: 'Países Baixos',
    countryFlag: '🇳🇱',
    type: 'league',
    format: 'Pontos Corridos (20 clubes) + Períodos e Nacompetitie',
    teamsCount: 20,
    roundsCount: 38,
    prominentClubs: ['Vitesse', 'Excelsior Rotterdam', 'Volendam', 'De Graafschap', 'Cambuur', 'Roda JC'],
    source: 'keukenkampioendivisie.nl / KNVB',
    auditDate: 'Outubro de 2026'
  },

  // ==========================================
  // EUROPA — LIGAS NACIONAIS ADICIONAIS
  // ==========================================
  {
    id: 'belgian_pro_league',
    name: 'Pro League da Bélgica',
    shortName: 'Jupiler Pro League',
    continent: 'Europa',
    country: 'Bélgica',
    countryFlag: '🇧🇪',
    type: 'league',
    format: 'Temporada Regular (30 rodadas) + Play-offs dos Campeões e Europeus',
    teamsCount: 16,
    roundsCount: 40,
    prominentClubs: ['Club Brugge', 'Anderlecht', 'Union Saint-Gilloise', 'Gent', 'Genk', 'Antwerp'],
    source: 'proleague.be / RBFA',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'swiss_super_league',
    name: 'Super League da Suíça',
    shortName: 'Swiss Super League',
    continent: 'Europa',
    country: 'Suíça',
    countryFlag: '🇨🇭',
    type: 'league',
    format: 'Primeira Fase (33 rodadas) + Play-offs de Campeão e Rebaixamento',
    teamsCount: 12,
    roundsCount: 38,
    prominentClubs: ['Young Boys', 'Basel', 'FC Zürich', 'Servette', 'Lugano', 'St. Gallen'],
    source: 'sfl.ch / SFV',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'austrian_bundesliga',
    name: 'Tipico Bundesliga da Áustria',
    shortName: 'Austrian Bundesliga',
    continent: 'Europa',
    country: 'Áustria',
    countryFlag: '🇦🇹',
    type: 'league',
    format: 'Temporada Regular (22 rodadas) + Grupo do Campeonato e Qualificação',
    teamsCount: 12,
    roundsCount: 32,
    prominentClubs: ['Red Bull Salzburg', 'Sturm Graz', 'Rapid Viena', 'LASK Linz', 'Austria Viena', 'Wolfsberger AC'],
    source: 'bundesliga.at / ÖFB',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'danish_superliga',
    name: 'Superliga da Dinamarca',
    shortName: '3F Superliga',
    continent: 'Europa',
    country: 'Dinamarca',
    countryFlag: '🇩🇰',
    type: 'league',
    format: 'Fase Regular (22 rodadas) + Grupo de Campeonato e Playoff',
    teamsCount: 12,
    roundsCount: 32,
    prominentClubs: ['FC Copenhague', 'FC Midtjylland', 'Brøndby IF', 'AGF Aarhus', 'FC Nordsjælland', 'Silkeborg'],
    source: 'superliga.dk / DBU',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'norwegian_eliteserien',
    name: 'Eliteserien da Noruega',
    shortName: 'Eliteserien',
    continent: 'Europa',
    country: 'Noruega',
    countryFlag: '🇳🇴',
    type: 'league',
    format: 'Pontos Corridos (16 clubes)',
    teamsCount: 16,
    roundsCount: 30,
    prominentClubs: ['Bodø/Glimt', 'Brann', 'Molde FK', 'Rosenborg', 'Viking FK', 'Tromsø'],
    source: 'eliteserien.no / NFF',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'swedish_allsvenskan',
    name: 'Allsvenskan da Suécia',
    shortName: 'Allsvenskan',
    continent: 'Europa',
    country: 'Suécia',
    countryFlag: '🇸🇪',
    type: 'league',
    format: 'Pontos Corridos (16 clubes)',
    teamsCount: 16,
    roundsCount: 30,
    prominentClubs: ['Malmö FF', 'Djurgårdens IF', 'Hammarby IF', 'AIK', 'IF Elfsborg', 'BK Häcken'],
    source: 'allsvenskan.se / SvFF',
    auditDate: 'Outubro de 2026'
  },

  // ==========================================
  // EUROPA — COPAS NACIONAIS
  // ==========================================
  {
    id: 'fa_cup',
    name: 'FA Cup da Inglaterra',
    shortName: 'The Emirates FA Cup',
    continent: 'Europa',
    country: 'Inglaterra',
    countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    type: 'cup',
    format: 'Mata-Mata Eliminatório Direto com Final em Wembley',
    teamsCount: 124,
    prominentClubs: ['Manchester City', 'Arsenal', 'Manchester United', 'Chelsea', 'Liverpool', 'Aston Villa'],
    source: 'thefa.com/competitions/thefacup',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'carabao_cup',
    name: 'Carabao Cup da Inglaterra',
    shortName: 'EFL Cup',
    continent: 'Europa',
    country: 'Inglaterra',
    countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    type: 'cup',
    format: 'Mata-Mata Eliminatório Direto (Semifinais em ida e volta)',
    teamsCount: 92,
    prominentClubs: ['Liverpool', 'Manchester City', 'Chelsea', 'Newcastle United', 'Arsenal', 'Tottenham'],
    source: 'efl.com/carabao-cup',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'copa_del_rey',
    name: 'Copa del Rey da Espanha',
    shortName: 'Copa del Rey',
    continent: 'Europa',
    country: 'Espanha',
    countryFlag: '🇪🇸',
    type: 'cup',
    format: 'Mata-Mata Eliminatório (Semifinais em ida e volta, Final em La Cartuja)',
    teamsCount: 110,
    prominentClubs: ['Athletic Bilbao', 'Real Madrid', 'Barcelona', 'Atlético de Madrid', 'Mallorca', 'Real Sociedad'],
    source: 'rfef.es/es/copa-del-rey',
    auditDate: 'Outubro de 2026'
  },

  // ==========================================
  // AMÉRICAS — BRASIL & CONTINENTAL
  // ==========================================
  {
    id: 'brasileirao_serie_a',
    name: 'Campeonato Brasileiro — Série A',
    shortName: 'Brasileirão Série A',
    continent: 'Américas',
    country: 'Brasil',
    countryFlag: '🇧🇷',
    type: 'league',
    format: 'Pontos Corridos (Turno e Returno)',
    teamsCount: 20,
    roundsCount: 38,
    prominentClubs: ['Botafogo', 'Palmeiras', 'Flamengo', 'Fortaleza', 'Internacional', 'São Paulo', 'Bahia', 'Cruzeiro', 'Santos', 'Corinthians', 'Vasco da Gama', 'Atlético Mineiro', 'Grêmio', 'Fluminense'],
    source: 'Boletim Informativo Diário (BID) / CBF (cbf.com.br)',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'brasileirao_serie_b',
    name: 'Campeonato Brasileiro — Série B',
    shortName: 'Brasileirão Série B',
    continent: 'Américas',
    country: 'Brasil',
    countryFlag: '🇧🇷',
    type: 'league',
    format: 'Pontos Corridos (Turno e Returno)',
    teamsCount: 20,
    roundsCount: 38,
    prominentClubs: ['Novorizontino', 'Sport Recife', 'Mirassol', 'Vila Nova', 'Ceará', 'Coritiba', 'América Mineiro', 'Goiás', 'Avaí', 'Operário-PR'],
    source: 'Boletim Informativo Diário (BID) / CBF (cbf.com.br)',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'copa_do_brasil',
    name: 'Copa do Brasil',
    shortName: 'Copa do Brasil',
    continent: 'Américas',
    country: 'Brasil',
    countryFlag: '🇧🇷',
    type: 'cup',
    format: 'Mata-Mata Eliminatório Nacional em 7 fases',
    teamsCount: 92,
    prominentClubs: ['Flamengo', 'São Paulo', 'Palmeiras', 'Atlético Mineiro', 'Corinthians', 'Grêmio', 'Fluminense', 'Santos'],
    source: 'CBF (cbf.com.br)',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'copa_libertadores',
    name: 'Copa Libertadores da América',
    shortName: 'CONMEBOL Libertadores',
    continent: 'Américas',
    country: 'América do Sul (CONMEBOL)',
    countryFlag: '🏆',
    type: 'continental_cup',
    format: 'Fase Preliminar + Fase de Grupos (32 clubes) + Oitavas até Final Única',
    teamsCount: 32,
    prominentClubs: ['Botafogo', 'Atlético Mineiro', 'River Plate', 'Flamengo', 'Palmeiras', 'Fluminense', 'São Paulo', 'Peñarol'],
    source: 'conmebol.com/libertadores',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'wc_qual_south_america',
    name: 'Eliminatórias da Copa do Mundo — América do Sul',
    shortName: 'Eliminatórias CONMEBOL',
    continent: 'Américas',
    country: 'América do Sul (Seleções)',
    countryFlag: '🌎',
    type: 'international',
    format: 'Pontos Corridos Grupo Único (18 rodadas ida e volta)',
    teamsCount: 10,
    roundsCount: 18,
    prominentClubs: ['Brasil', 'Argentina', 'Uruguai', 'Colômbia', 'Equador', 'Paraguai', 'Venezuela', 'Bolívia', 'Peru', 'Chile'],
    source: 'conmebol.com / FIFA',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'mls',
    name: 'Major League Soccer',
    shortName: 'MLS',
    continent: 'Américas',
    country: 'Estados Unidos / Canadá',
    countryFlag: '🇺🇸',
    type: 'league',
    format: 'Conferências Leste e Oeste + Supporters Shield + MLS Cup Playoffs',
    teamsCount: 29,
    prominentClubs: ['Inter Miami CF', 'Los Angeles FC', 'LA Galaxy', 'Columbus Crew', 'FC Cincinnati', 'Seattle Sounders'],
    source: 'mlssoccer.com',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'liga_mx',
    name: 'Liga MX do México',
    shortName: 'Liga MX',
    continent: 'Américas',
    country: 'México',
    countryFlag: '🇲🇽',
    type: 'league',
    format: 'Torneios Apertura e Clausura + Liguilla Final',
    teamsCount: 18,
    prominentClubs: ['América', 'Cruz Azul', 'Tigres UANL', 'Monterrey', 'Toluca', 'Guadalajara (Chivas)', 'Pumas UNAM'],
    source: 'ligamx.net / FMF',
    auditDate: 'Outubro de 2026'
  },

  // ==========================================
  // ÁSIA E OCEANIA (AFC & OFC)
  // ==========================================
  {
    id: 'afc_champions_league',
    name: 'AFC Champions League Elite',
    shortName: 'AFC Champions League',
    continent: 'Ásia & Oceania',
    country: 'Ásia (Continental)',
    countryFlag: '🌏',
    type: 'continental_cup',
    format: 'Fase de Liga Leste e Oeste (24 clubes) + Finais Centralizadas na Arábia Saudita',
    teamsCount: 24,
    prominentClubs: ['Al-Hilal', 'Al-Nassr', 'Al-Ittihad', 'Al-Ain', 'Vissel Kobe', 'Yokohama F. Marinos', 'Ulsan HD'],
    source: 'the-afc.com',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'wc_qual_asia',
    name: 'Eliminatórias da Copa do Mundo — Ásia',
    shortName: 'Eliminatórias AFC',
    continent: 'Ásia & Oceania',
    country: 'Ásia (Seleções)',
    countryFlag: '🌏',
    type: 'international',
    format: 'Fases Preliminares + 3ª Fase em 3 Grupos de 6 + Repescagem AFC',
    teamsCount: 18,
    prominentClubs: ['Japão', 'Coreia do Sul', 'Austrália', 'Irã', 'Arábia Saudita', 'Uzbequistão', 'Catar', 'Iraque'],
    source: 'the-afc.com / FIFA',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'j_league',
    name: 'J-League do Japão',
    shortName: 'Meiji Yasuda J1 League',
    continent: 'Ásia & Oceania',
    country: 'Japão',
    countryFlag: '🇯🇵',
    type: 'league',
    format: 'Pontos Corridos (20 clubes)',
    teamsCount: 20,
    roundsCount: 38,
    prominentClubs: ['Vissel Kobe', 'Sanfrecce Hiroshima', 'Machida Zelvia', 'Yokohama F. Marinos', 'Kawasaki Frontale', 'Urawa Red Diamonds'],
    source: 'jleague.co / JFA',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'chinese_super_league',
    name: 'Chinese Super League',
    shortName: 'CSL',
    continent: 'Ásia & Oceania',
    country: 'China',
    countryFlag: '🇨🇳',
    type: 'league',
    format: 'Pontos Corridos (16 clubes)',
    teamsCount: 16,
    roundsCount: 30,
    prominentClubs: ['Shanghai Port', 'Shanghai Shenhua', 'Chengdu Rongcheng', 'Beijing Guoan', 'Shandong Taishan'],
    source: 'csl-china.com / CFA',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'k_league_2',
    name: 'K League 2 da Coreia do Sul',
    shortName: 'Hana 1Q K League 2',
    continent: 'Ásia & Oceania',
    country: 'Coreia do Sul',
    countryFlag: '🇰🇷',
    type: 'league',
    format: 'Pontos Corridos (13 clubes, 36 rodadas) + Play-offs de Promoção K League 1',
    teamsCount: 13,
    roundsCount: 36,
    prominentClubs: ['FC Anyang', 'Chungnam Asan', 'Seoul E-Land', 'Jeonnam Dragons', 'Busan IPark', 'Suwon Samsung Bluewings'],
    source: 'kleague.com / KFA',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'indian_super_league',
    name: 'Indian Super League',
    shortName: 'ISL',
    continent: 'Ásia & Oceania',
    country: 'Índia',
    countryFlag: '🇮🇳',
    type: 'league',
    format: 'Temporada Regular + ISL Cup Playoffs',
    teamsCount: 13,
    roundsCount: 24,
    prominentClubs: ['Mohun Bagan SG', 'Mumbai City FC', 'FC Goa', 'Kerala Blasters', 'Bengaluru FC', 'East Bengal'],
    source: 'indiansuperleague.com / AIFF',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'a_league',
    name: 'A-League da Austrália',
    shortName: 'Isuzu UTE A-League',
    continent: 'Ásia & Oceania',
    country: 'Austrália / Nova Zelândia',
    countryFlag: '🇦🇺',
    type: 'league',
    format: 'Temporada Regular (26 rodadas) + Finals Series',
    teamsCount: 13,
    roundsCount: 26,
    prominentClubs: ['Central Coast Mariners', 'Melbourne Victory', 'Sydney FC', 'Wellington Phoenix', 'Melbourne City', 'Auckland FC'],
    source: 'aleagues.com.au / Football Australia',
    auditDate: 'Outubro de 2026'
  },

  // ==========================================
  // ÁFRICA E INTERNACIONAIS (CAF & FIFA)
  // ==========================================
  {
    id: 'south_african_premier_league',
    name: 'Premier League da África do Sul',
    shortName: 'Betway Premiership',
    continent: 'África',
    country: 'África do Sul',
    countryFlag: '🇿🇦',
    type: 'league',
    format: 'Pontos Corridos (16 clubes)',
    teamsCount: 16,
    roundsCount: 30,
    prominentClubs: ['Mamelodi Sundowns', 'Orlando Pirates', 'Stellenbosch FC', 'Kaizer Chiefs', 'Sekhukhune United', 'Cape Town City'],
    source: 'psl.co.za / SAFA',
    auditDate: 'Outubro de 2026'
  },
  {
    id: 'friendly_internationals',
    name: 'Amistosos Internacionais',
    shortName: 'Friendly International',
    continent: 'Global',
    country: 'Global (FIFA)',
    countryFlag: '🌐',
    type: 'international',
    format: 'Datas FIFA Oficiais com Partidas Preparatórias entre Seleções',
    teamsCount: 211,
    prominentClubs: ['Brasil', 'Argentina', 'França', 'Inglaterra', 'Espanha', 'Alemanha', 'Portugal', 'Japão', 'Estados Unidos', 'Marrocos'],
    source: 'fifa.com / International Match Calendar',
    auditDate: 'Outubro de 2026'
  }
];

/**
 * Dicionário chaveado por ID para acesso O(1)
 */
export const COVERED_COMPETITIONS_DICT_2026 = ALL_COVERED_COMPETITIONS_2026.reduce((acc, comp) => {
  acc[comp.id] = comp;
  return acc;
}, {});

/**
 * Retorna todas as competições cobertas
 */
export function getAllCoveredCompetitions() {
  return ALL_COVERED_COMPETITIONS_2026;
}

/**
 * Retorna as competições filtradas por continente
 * @param {'Europa'|'Américas'|'Ásia & Oceania'|'África'|'Global'} continent
 */
export function getCoveredCompetitionsByContinent(continent) {
  if (!continent || continent === 'Todos') return ALL_COVERED_COMPETITIONS_2026;
  return ALL_COVERED_COMPETITIONS_2026.filter(c => c.continent === continent);
}

/**
 * Busca uma competição por ID ou alias
 */
export function getCoveredCompetitionById(id) {
  if (!id) return null;
  return COVERED_COMPETITIONS_DICT_2026[id] || null;
}
