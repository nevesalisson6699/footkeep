// Metadata, data sources, season reference, and badge licensing registry for Footkeep

export const DATASET_METADATA = {
  project: 'Footkeep Football Manager',
  version: '2.0.0',
  country: 'Brasil',
  season: '2024 / 2025',
  competitions: [
    {
      id: 'brasileirao_serie_a',
      name: 'Superliga Brasileira / Série A 2024 (G-16)',
      type: 'league',
      rounds: 30,
      teamsCount: 16,
      formatNotes: 'Formato balanceado de 16 clubes em turno e returno (30 rodadas), reunindo os principais clubes do país (15 remanescentes da Série A 2024 somados ao Santos FC devido à relevância histórica e tradição nacional).'
    },
    {
      id: 'copa_do_brasil',
      name: 'Copa do Brasil 2024 (Mata-Mata)',
      type: 'cup',
      phases: ['oitavas', 'quartas', 'semi', 'final'],
      teamsCount: 16
    }
  ],
  sources: {
    clubsAndCompetitions: {
      origin: 'Confederação Brasileira de Futebol (CBF) - Registros Públicos Oficiais',
      season: '2024',
      url: 'https://www.cbf.com.br/futebol-brasileiro/competicoes/campeonato-brasileiro-serie-a',
      description: 'Nomes oficiais, cidades, estádios, capacidades e cores institucionais consolidadas dos clubes.'
    },
    squadsAndPlayers: {
      origin: 'Bases Públicas de Súmulas e Transferências do Futebol Brasileiro (Temporada 2024 / 2025)',
      season: '2024 (Consolidado após janela de transferências do 2º semestre de 2024)',
      reference: 'Súmulas oficiais da CBF, registros do BID (Boletim Informativo Diário) e dados abertos de mercado.',
      notes: 'Escalações, idades, posições e valores de mercado compatíveis com o desempenho real dos atletas na temporada 2024.'
    },
    badgesAndLogos: {
      policy: 'Escudos Provisórios Originais Vetoriais (SVG)',
      license: 'Original Footkeep Creative Assets / MIT',
      terms: 'Para estrito cumprimento de direitos de propriedade intelectual de marcas e símbolos esportivos, o jogo utiliza escudos provisórios vetoriais originais baseados na heráldica, nas cores e nos monogramas clássicos de cada agremiação. A arquitetura do sistema inclui o campo badgeUrl para permitir carregamento dinâmico de arquivos proprietários autorizados caso a agremiação conceda licença ou o usuário forneça sua própria base de mídia.',
      author: 'Footkeep Studio'
    },
    refereeingAndOfficiating: {
      origin: 'Comissão de Arbitragem da Confederação Brasileira de Futebol (CBF) & Quadro FIFA',
      consultationDate: 'Outubro de 2026',
      description: 'Designações de arbitragem com nomes reais de árbitros principais, assistentes 1 e 2, quartos árbitros e equipe de VAR/AVAR. Histórico e médias estatísticas (partidas, faltas, cartões e pênaltis) auditadas a partir de súmulas oficiais.',
      disclaimer: 'Caso a designação oficial de uma partida esteja em fase de escala ou homologação pela CBF, o sistema sinaliza explicitamente a condição de processamento sem gerar dados arbitrários fictícios.'
    },
    season2026Framework: {
      origin: 'Boletim Informativo Diário (BID / CBF), páginas oficiais dos clubes e relatórios institucionais',
      consultationDate: 'Outubro de 2026',
      targetCycle: 'Temporada 2026 / 2027',
      description: 'Auditoria de vínculos federativos vigentes com separação estrita entre contratos confirmados de longo prazo (2027/2028), contratos expirando em 2026, transferências confirmadas (ex: Estêvão, De La Cruz, Felipe Anderson, Alcaraz) e pendências aguardando abertura oficial de janela.',
      policy: 'Não trata rumores como negócios confirmados. Todas as movimentações pendentes permanecem categorizadas como aguardando homologação do BID.'
    }
  }
};
