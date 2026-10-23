# ⚽ Footkeep - Jogo de Gestão de Futebol

**Footkeep** é um jogo original de gerenciamento e simulação futebolística inspirado nos clássicos jogos de gestão de clubes (como Brasfoot), desenvolvido com identidade própria, dados e mecânicas 100% originais e arquitetura moderna para a web.

---

## 🌟 Principais Recursos

1. **Gestão do Clube**:
   - 16 clubes originais com cores personalizadas, estádio próprio, capacidade de público, orçamento e reputação.
   - Plantel completo com mais de 300 atletas com atributos específicos (Finalização, Passe, Desarme, Físico, Idade, Salário, Valor de Mercado e Moral).
2. **Escalação e Prancheta Tática**:
   - Campo 2D interativo com troca rápida de titulares e reservas.
   - Formações táticas consagradas: `4-4-2`, `4-3-3`, `3-5-2` e `4-2-3-1`.
   - Postura tática influenciadora: *Defensiva*, *Equilibrada* e *Ofensiva*.
3. **Duas Competições Simultâneas**:
   - **Liga Nacional Série A**: 16 clubes em 30 rodadas (Turno e Returno) com pontos corridos, critério de desempate, artilharia, G4 e zona de rebaixamento.
   - **Copa Footkeep (Mata-Mata)**: Torneio eliminatório com chaveamento visual (Oitavas, Quartas, Semifinal e Final) com decisão por pênaltis em caso de empate.
4. **Motor de Partida Dinâmico**:
   - Narração de lances lance a lance em tempo real em português (chutes a gol, defesas difíceis, faltas, cartões amarelos e vermelhos, pênaltis e gols com nomes de marcadores e assistências).
   - Velocidade regulável (1x, 2x ou Instantâneo).
   - Estatísticas em tempo real (Posse de bola, finalizações e faltas).
5. **Mercado de Transferências & Finanças**:
   - Compra e venda de atletas entre clubes e contratação de Agentes Livres.
   - Filtros por posição, faixa de preço e busca por nome.
   - Controle financeiro de bilheteria nos jogos em casa, receitas de patrocínio semanal, premiações e desconto da folha salarial.
6. **Salvamento e Portabilidade**:
   - Salvamento automático no navegador via `localStorage`.
   - Opção de **Exportar Save (.json)** e **Importar Save (.json)** para portabilidade total entre computadores.

---

## 🚀 Como Executar Localmente

### Opção 1: 1 Clique no Windows
Basta dar um duplo clique no arquivo:
```cmd
iniciar.bat
```

### Opção 2: Via Terminal
```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Compilar versão final de produção
npm run build
```
O jogo abrirá automaticamente em `http://localhost:3000`.

---

## ☁️ Publicação no Cloudflare Pages

O projeto foi construído como uma Single Page Application (SPA) estática otimizada para o **Cloudflare Pages**:
* **Comando de Build:** `npm run build`
* **Diretório de Saída (Output):** `dist`
* **Node.js Version:** `20.x` ou superior

Consulte o guia passo a passo em [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md).

---

## 📜 Licença
Projeto original sob licença MIT. Todos os clubes, escudos e nomes de atletas são fictícios.
