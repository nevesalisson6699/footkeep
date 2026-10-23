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
    }
  }
};
