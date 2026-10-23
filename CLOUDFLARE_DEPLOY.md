# ☁️ Automação de Publicação no Cloudflare Pages

O **Footkeep** está totalmente preparado para CI/CD automático (Integração e Entrega Contínua) entre o **GitHub** e o **Cloudflare Pages**.

---

## 📌 Repositório Oficial do Jogo
* **GitHub:** [https://github.com/nevesalisson6699/footkeep](https://github.com/nevesalisson6699/footkeep)
* **Branch de Produção:** `main`
* **Diretório de Build:** `dist`
* **Comando de Compilação:** `npm run build`

---

## 🚀 Método 1: Integração Nativa Cloudflare Pages (100% Automática e Recomendada)

Este é o método oficial da Cloudflare que **não exige salvar nenhum token nem segredo no computador**:

1. Acesse o painel Cloudflare: [dash.cloudflare.com](https://dash.cloudflare.com)
2. No menu lateral, clique em **Workers & Pages** (ou **Compute (Workers) > Workers & Pages**).
3. Clique em **Create application** > aba **Pages** > **Connect to Git**.
4. Selecione sua conta GitHub (`nevesalisson6699`) e o repositório **`footkeep`**.
5. Em **Build Settings**, as configurações já são pré-detectadas:
   * **Framework preset:** `Vite`
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
6. Clique em **Save and Deploy**.

**Resultado Imediato:**
* O Cloudflare provisionará o domínio oficial: `https://footkeep.pages.dev`
* **Automação Contínua:** Sempre que um novo `git push` for feito para a branch `main`, o Cloudflare detectará a alteração, executará o build e atualizará o site em produção automaticamente.

---

## ⚡ Método 2: Via GitHub Actions (CI/CD Automatizado via Workflow)

O arquivo [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) já está criado no repositório.

Para ativá-lo:
1. No painel da Cloudflare ([dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)), crie um token com o template **Cloudflare Pages** (permissão *Account.Cloudflare Pages: Edit*).
2. Copie seu **Account ID** (disponível no menu da Cloudflare).
3. No repositório GitHub ([github.com/nevesalisson6699/footkeep/settings/secrets/actions](https://github.com/nevesalisson6699/footkeep/settings/secrets/actions)):
   * Adicione o secret: `CLOUDFLARE_API_TOKEN`
   * Adicione o secret: `CLOUDFLARE_ACCOUNT_ID`
4. A cada commit na branch `main`, o GitHub Actions compilará e publicará automaticamente.

---

## 💻 Método 3: Publicação Direta via Terminal / Script Local

Para publicar ou testar diretamente do seu computador:
Dê um duplo clique no arquivo:
👉 `deploy-cloudflare.bat`

Ele compilará a pasta `dist` e executará o `npx wrangler pages deploy dist --project-name footkeep`.
Se for a primeira execução, uma aba de confirmação do Cloudflare abrirá no navegador para autorizar com 1 clique.
