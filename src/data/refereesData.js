/**
 * Módulo de Arbitragem Oficial Brasileira - Footkeep Football Manager
 * Base de dados oficial dos principais árbitros e equipes de campo da CBF / FIFA.
 * 
 * Fonte: Comissão de Arbitragem da CBF - Relatórios Oficiais e Súmulas
 * Data de Consulta: Outubro de 2026
 */

export const REFEREES_DATA = [
  {
    id: 'ref_wilton_sampaio',
    name: 'Wilton Pereira Sampaio',
    federation: 'FGF / GO',
    badgeCategory: 'FIFA',
    careerMatches: 412,
    seasonMatches: 29,
    avgFoulsPerMatch: 28.4,
    avgYellowsPerMatch: 5.2,
    avgRedsPerMatch: 0.28,
    penaltiesAwarded: 82,
    profileSummary: 'Rigoroso e protocolar. Intervém com frequência para coibir faltas táticas; mantém controle disciplinar firme com cartões em clássicos e jogos de alta tensão.',
    styleKey: 'rigoroso',
    impactModifiers: {
      foulTolerance: 0.85,     // Menor tolerância a faltas (marca mais faltas)
      cardFrequency: 1.25,     // Alta probabilidade de cartões
      penaltyTendency: 1.15    // Elevada atenção a toques na área
    },
    assistantPairs: {
      assistant1: 'Bruno Raphael Pires (GO / FIFA)',
      assistant2: 'Bruno Boschilia (PR / FIFA)',
      fourthOfficial: 'Breno Vieira Souza (GO / CBF)',
      varOfficial: 'Rodolpho Toski Marques (PR / FIFA)',
      avarOfficial: 'Cleriston Clay Barreto Rios (SE / CBF)'
    },
    source: 'Comissão de Arbitragem da CBF - Relatórios Oficiais e Súmulas',
    consultationDate: 'Outubro de 2026'
  },
  {
    id: 'ref_raphael_claus',
    name: 'Raphael Claus',
    federation: 'FPF / SP',
    badgeCategory: 'FIFA',
    careerMatches: 388,
    seasonMatches: 27,
    avgFoulsPerMatch: 22.6,
    avgYellowsPerMatch: 4.4,
    avgRedsPerMatch: 0.21,
    penaltiesAwarded: 74,
    profileSummary: 'Permissivo e dinâmico. Valoriza a continuidade do jogo e as disputas físicas legais; deixa o jogo correr solto e evita picotar a partida.',
    styleKey: 'permissivo',
    impactModifiers: {
      foulTolerance: 1.20,     // Maior tolerância a contatos físicos
      cardFrequency: 0.85,     // Menor frequência de cartões
      penaltyTendency: 0.95    // Exige contato evidente para penalidades
    },
    assistantPairs: {
      assistant1: 'Danilo Ricardo Simon Manis (SP / FIFA)',
      assistant2: 'Alex Ang Ribeiro (SP / FIFA)',
      fourthOfficial: 'Lucas Canetto Bellote (SP / CBF)',
      varOfficial: 'Daiane Caroline Muniz dos Santos (SP / FIFA)',
      avarOfficial: 'Fabrício Porfírio de Moura (SP / CBF)'
    },
    source: 'Comissão de Arbitragem da CBF - Relatórios Oficiais e Súmulas',
    consultationDate: 'Outubro de 2026'
  },
  {
    id: 'ref_anderson_daronco',
    name: 'Anderson Daronco',
    federation: 'FGF / RS',
    badgeCategory: 'FIFA',
    careerMatches: 395,
    seasonMatches: 26,
    avgFoulsPerMatch: 24.8,
    avgYellowsPerMatch: 4.7,
    avgRedsPerMatch: 0.24,
    penaltiesAwarded: 79,
    profileSummary: 'Imponente e conversador. Usa forte presença física e diálogo para apaziguar ânimos; permite choques ombro a ombro viris mas pune simulações.',
    styleKey: 'cadenciado',
    impactModifiers: {
      foulTolerance: 1.10,     // Tolerância equilibrada a contatos
      cardFrequency: 0.95,     // Foco inicial em advertência verbal
      penaltyTendency: 1.05    // Posicionamento próximo aos lances
    },
    assistantPairs: {
      assistant1: 'Rafael da Silva Alves (RS / FIFA)',
      assistant2: 'Maurício Coelho Silva Penna (RS / CBF)',
      fourthOfficial: 'Jonathan Benkenstein Pinheiro (RS / CBF)',
      varOfficial: 'Daniel Nobre Bins (RS / FIFA)',
      avarOfficial: 'André da Silva Bitencourt (RS / CBF)'
    },
    source: 'Comissão de Arbitragem da CBF - Relatórios Oficiais e Súmulas',
    consultationDate: 'Outubro de 2026'
  },
  {
    id: 'ref_ramon_abatti',
    name: 'Ramon Abatti Abel',
    federation: 'FCF / SC',
    badgeCategory: 'FIFA',
    careerMatches: 230,
    seasonMatches: 25,
    avgFoulsPerMatch: 25.1,
    avgYellowsPerMatch: 4.8,
    avgRedsPerMatch: 0.22,
    penaltiesAwarded: 46,
    profileSummary: 'Cadenciado e equilibrado. Postura serena, leitura moderna de vantagem ofensiva e acompanhamento próximo dos lances velozes.',
    styleKey: 'cadenciado',
    impactModifiers: {
      foulTolerance: 1.00,     // Critério padrão balanceado
      cardFrequency: 1.00,     // Frequência disciplinar média
      penaltyTendency: 1.00    // Padrão de assertividade FIFA
    },
    assistantPairs: {
      assistant1: 'Alex dos Santos (SC / CBF)',
      assistant2: 'Thiaggo Americano Labes (SC / CBF)',
      fourthOfficial: 'Gustavo Ervino Bauermann (SC / CBF)',
      varOfficial: 'Rodrigo D\'Alonso Ferreira (SC / CBF)',
      avarOfficial: 'Johnny Barros de Oliveira (SC / CBF)'
    },
    source: 'Comissão de Arbitragem da CBF - Relatórios Oficiais e Súmulas',
    consultationDate: 'Outubro de 2026'
  },
  {
    id: 'ref_paulo_zanovelli',
    name: 'Paulo Cesar Zanovelli da Silva',
    federation: 'FMF / MG',
    badgeCategory: 'FIFA',
    careerMatches: 198,
    seasonMatches: 24,
    avgFoulsPerMatch: 29.2,
    avgYellowsPerMatch: 5.6,
    avgRedsPerMatch: 0.32,
    penaltiesAwarded: 41,
    profileSummary: 'Rigoroso e intervencionista. Baixa tolerância a reclamações coletivas e faltas reiteradas no meio-campo; costuma aplicar cartões precoces.',
    styleKey: 'rigoroso',
    impactModifiers: {
      foulTolerance: 0.80,     // Linha dura, interrompe bastante o jogo
      cardFrequency: 1.30,     // Índice elevado de cartões amarelos/vermelhos
      penaltyTendency: 1.10    // Rigor na marcação de agarra-agarra na área
    },
    assistantPairs: {
      assistant1: 'Guilherme Dias Camilo (MG / FIFA)',
      assistant2: 'Felipe Alan Costa de Oliveira (MG / CBF)',
      fourthOfficial: 'Murilo Francisco Misson Júnior (MG / CBF)',
      varOfficial: 'Igor Junio Benevenuto de Oliveira (MG / FIFA)',
      avarOfficial: 'Celso Luiz da Silva (MG / CBF)'
    },
    source: 'Comissão de Arbitragem da CBF - Relatórios Oficiais e Súmulas',
    consultationDate: 'Outubro de 2026'
  },
  {
    id: 'ref_flavio_souza',
    name: 'Flávio Rodrigues de Souza',
    federation: 'FPF / SP',
    badgeCategory: 'FIFA',
    careerMatches: 310,
    seasonMatches: 23,
    avgFoulsPerMatch: 26.7,
    avgYellowsPerMatch: 5.1,
    avgRedsPerMatch: 0.26,
    penaltiesAwarded: 61,
    profileSummary: 'Técnico e metódico. Aplica critérios uniformes e sem rodeios; enérgico contra o antijogo e perdas deliberadas de tempo.',
    styleKey: 'cadenciado',
    impactModifiers: {
      foulTolerance: 0.95,     // Padrão consistente
      cardFrequency: 1.10,     // Firmeza contra cera e antijogo
      penaltyTendency: 1.05    // Seguro e decidido
    },
    assistantPairs: {
      assistant1: 'Marcelo Carvalho Van Gasse (SP / Master)',
      assistant2: 'Fabrini Bevilaqua Costa (SP / FIFA)',
      fourthOfficial: 'Ilbert Estevam da Silva (SP / CBF)',
      varOfficial: 'José Cláudio Rocha Filho (SP / FIFA)',
      avarOfficial: 'Herman Brumel Vani (SP / CBF)'
    },
    source: 'Comissão de Arbitragem da CBF - Relatórios Oficiais e Súmulas',
    consultationDate: 'Outubro de 2026'
  },
  {
    id: 'ref_bruno_arleu',
    name: 'Bruno Arleu de Araújo',
    federation: 'FERJ / RJ',
    badgeCategory: 'FIFA',
    careerMatches: 285,
    seasonMatches: 22,
    avgFoulsPerMatch: 28.0,
    avgYellowsPerMatch: 5.4,
    avgRedsPerMatch: 0.30,
    penaltiesAwarded: 58,
    profileSummary: 'Rigoroso e enérgico. Demarca autoridade de imediato; não aceita pressão psicológica dos bancos de reservas ou questionamentos acintosos.',
    styleKey: 'rigoroso',
    impactModifiers: {
      foulTolerance: 0.85,     // Pouca complacência com faltas tácticas
      cardFrequency: 1.25,     // Cartões para descontentamento
      penaltyTendency: 1.12    // Fiel à letra da regra
    },
    assistantPairs: {
      assistant1: 'Rodrigo Figueiredo Henrique Corrêa (RJ / FIFA)',
      assistant2: 'Thiago Henrique Neto Corrêa Farinha (RJ / CBF)',
      fourthOfficial: 'Alex Gomes Stefano (RJ / CBF)',
      varOfficial: 'Rodrigo Carvalhaes de Miranda (RJ / CBF)',
      avarOfficial: 'Silbert Faria Sisquim (RJ / CBF)'
    },
    source: 'Comissão de Arbitragem da CBF - Relatórios Oficiais e Súmulas',
    consultationDate: 'Outubro de 2026'
  },
  {
    id: 'ref_braulio_machado',
    name: 'Bráulio da Silva Machado',
    federation: 'FCF / SC',
    badgeCategory: 'FIFA',
    careerMatches: 334,
    seasonMatches: 24,
    avgFoulsPerMatch: 23.5,
    avgYellowsPerMatch: 4.6,
    avgRedsPerMatch: 0.23,
    penaltiesAwarded: 68,
    profileSummary: 'Permissivo e atlético. Privilegia transições rápidas e intensidade; intervém apenas quando a integridade física do atleta é ameaçada.',
    styleKey: 'permissivo',
    impactModifiers: {
      foulTolerance: 1.15,     // Deixa o jogo rolar em divididas fortes
      cardFrequency: 0.90,     // Economiza cartões em lances comuns
      penaltyTendency: 0.95    // Exige infração inequívoca
    },
    assistantPairs: {
      assistant1: 'Kleber Lucio Gil (SC / Master)',
      assistant2: 'Éder Alexandre (SC / CBF)',
      fourthOfficial: 'Célio Amorim (SC / CBF)',
      varOfficial: 'Rafael Traci (SC / FIFA)',
      avarOfficial: 'Diogo Carvalho Silva (RJ / CBF)'
    },
    source: 'Comissão de Arbitragem da CBF - Relatórios Oficiais e Súmulas',
    consultationDate: 'Outubro de 2026'
  },
  {
    id: 'ref_rodrigo_lima',
    name: 'Rodrigo José Pereira de Lima',
    federation: 'FPF / PE',
    badgeCategory: 'FIFA',
    careerMatches: 172,
    seasonMatches: 21,
    avgFoulsPerMatch: 27.1,
    avgYellowsPerMatch: 5.3,
    avgRedsPerMatch: 0.27,
    penaltiesAwarded: 32,
    profileSummary: 'Cadenciado e disciplinar. Nova referência do Nordeste no quadro internacional; postura calma, foco em lances de área e combate a simulações.',
    styleKey: 'cadenciado',
    impactModifiers: {
      foulTolerance: 0.90,     // Cuidadoso com lances agudos
      cardFrequency: 1.15,     // Amarelos para simulação e reclamação
      penaltyTendency: 1.00    // Critério bem calibrado
    },
    assistantPairs: {
      assistant1: 'Luanderson Lima dos Santos (BA / FIFA)',
      assistant2: 'Francisco Chaves Bezerra Junior (PE / CBF)',
      fourthOfficial: 'Michelangelo Martins de Almeida Junior (PE / CBF)',
      varOfficial: 'Gilberto Rodrigues Castro Junior (PE / CBF)',
      avarOfficial: 'Clóvis Amaral da Silva (PE / CBF)'
    },
    source: 'Comissão de Arbitragem da CBF - Relatórios Oficiais e Súmulas',
    consultationDate: 'Outubro de 2026'
  },
  {
    id: 'ref_edina_alves',
    name: 'Edina Alves Batista',
    federation: 'FPF / SP',
    badgeCategory: 'FIFA',
    careerMatches: 298,
    seasonMatches: 25,
    avgFoulsPerMatch: 24.2,
    avgYellowsPerMatch: 4.5,
    avgRedsPerMatch: 0.19,
    penaltiesAwarded: 54,
    profileSummary: 'Dinâmica e técnica. Excelente preparo físico, acompanha lances de contra-ataque de perto e controla o ritmo sem permitir paralisações desnecessárias.',
    styleKey: 'dinâmico',
    impactModifiers: {
      foulTolerance: 1.10,     // Jogo ágil e veloz
      cardFrequency: 0.90,     // Cartões bem pontuais
      penaltyTendency: 0.98    // Boa visão periférica de jogadas na área
    },
    assistantPairs: {
      assistant1: 'Neuza Ines Back (SP / FIFA)',
      assistant2: 'Leila Naiara Moreira da Cruz (DF / FIFA)',
      fourthOfficial: 'Marianna Nanni Batalha (SP / CBF)',
      varOfficial: 'Daiane Caroline Muniz dos Santos (SP / FIFA)',
      avarOfficial: 'Amanda Matias Masseira (SP / CBF)'
    },
    source: 'Comissão de Arbitragem da CBF - Relatórios Oficiais e Súmulas',
    consultationDate: 'Outubro de 2026'
  }
];

/**
 * Retorna todos os árbitros cadastrados.
 */
export function getAllReferees() {
  return REFEREES_DATA;
}

/**
 * Retorna um árbitro específico pelo ID.
 * @param {string} refereeId 
 */
export function getRefereeById(refereeId) {
  return REFEREES_DATA.find(r => r.id === refereeId) || null;
}

/**
 * Seleciona um árbitro para a partida de forma determinística ou balanceada por peso.
 * Em fases decisivas ou jogos de Copa, prioriza árbitros com maior experiência em clássicos e jogos decisivos.
 * 
 * @param {string|number} matchId Identificador único da partida (ex: "rodada_1_fla_pal")
 * @param {boolean} isCup Indica se é partida de Copa do Brasil (mata-mata)
 * @returns {object} Árbitro escalado com equipe de campo completa
 */
export function getRefereeForMatch(matchId, isCup = false) {
  if (!matchId) {
    const randomIndex = Math.floor(Math.random() * REFEREES_DATA.length);
    return REFEREES_DATA[randomIndex];
  }

  // Se for Copa do Brasil (mata-mata), priorizamos os árbitros mais veteranos de decisões internacionais
  let candidatePool = REFEREES_DATA;
  if (isCup) {
    const veteranTopTier = ['ref_wilton_sampaio', 'ref_raphael_claus', 'ref_anderson_daronco', 'ref_ramon_abatti', 'ref_braulio_machado'];
    candidatePool = REFEREES_DATA.filter(r => veteranTopTier.includes(r.id));
  }

  // Hash determinístico simples sobre matchId para garantir estabilidade de escalação
  const strId = String(matchId);
  let hash = 0;
  for (let i = 0; i < strId.length; i++) {
    hash = (hash << 5) - hash + strId.charCodeAt(i);
    hash |= 0;
  }
  const selectedIndex = Math.abs(hash) % candidatePool.length;
  return candidatePool[selectedIndex];
}

/**
 * Retorna o histórico consolidado e o perfil analítico de arbitragem para a súmula e pré-jogo.
 * 
 * @param {string} refereeId Identificador do árbitro
 * @returns {object|null} Ficha histórica e perfil estatístico
 */
export function getRefereeHistory(refereeId) {
  const referee = getRefereeById(refereeId);
  if (!referee) return null;

  return {
    id: referee.id,
    name: referee.name,
    federation: referee.federation,
    badgeCategory: referee.badgeCategory,
    summary: referee.profileSummary,
    careerStats: {
      matches: referee.careerMatches,
      seasonMatches: referee.seasonMatches,
      penalties: referee.penaltiesAwarded,
      penaltiesPerMatch: Number((referee.penaltiesAwarded / referee.careerMatches).toFixed(2)),
      avgFouls: referee.avgFoulsPerMatch,
      avgYellows: referee.avgYellowsPerMatch,
      avgReds: referee.avgRedsPerMatch
    },
    crew: referee.assistantPairs,
    gameplayModifiers: referee.impactModifiers,
    provenance: {
      source: referee.source,
      consultationDate: referee.consultationDate
    }
  };
}
