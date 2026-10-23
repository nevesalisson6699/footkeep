# ☁️ Guia de Publicação no Cloudflare Pages

O **Footkeep** foi desenvolvido como uma SPA (Single Page Application) estática e ultrarrápida, perfeita para hospedagem global de custo zero no **Cloudflare Pages**.

---

## Método Recomendado: Conexão Contínua com GitHub

Como o repositório oficial já está criado e sincronizado no GitHub:
👉 `https://github.com/nevesalisson6699/footkeep`

### Passo a Passo no Cloudflare Dashboard:

1. Acesse o painel da Cloudflare: [dash.cloudflare.com](https://dash.cloudflare.com)
2. No menu lateral esquerdo, clique em **Workers & Pages** (ou **Compute (Workers) > Workers & Pages**).
3. Clique no botão **Create application** (Criar aplicativo) e selecione a aba **Pages**.
4. Selecione a opção **Connect to Git** (Conectar ao Git).
5. Escolha a sua conta GitHub (`nevesalisson6699`) e selecione o repositório **`footkeep`**.
6. Configure os parâmetros de build:
   - **Project name:** `footkeep`
   - **Production branch:** `main`
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
7. Clique em **Save and Deploy** (Salvar e Implantar).

Em cerca de 1 minuto, seu jogo estará online com HTTPS gratuito e CDN global no endereço:
👉 `https://footkeep.pages.dev` (ou seu domínio personalizado configurado).

Qualquer novo `git push` feito na branch `main` atualizará automaticamente a versão online!

---

## Roteamento SPA
O arquivo `public/_redirects` já está configurado no repositório (`/* /index.html 200`) para garantir que qualquer recarga ou navegação interna direta na URL funcione perfeitamente sem erros 404.
