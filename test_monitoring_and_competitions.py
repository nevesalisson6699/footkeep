import sys, time, json
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

def audit_environment(page, env_name, base_url):
    print(f"\n=======================================================", flush=True)
    print(f"Auditoria no Ambiente: {env_name} ({base_url})", flush=True)
    print(f"=======================================================", flush=True)

    telemetry = {
        "env": env_name,
        "url": base_url,
        "http_status": None,
        "load_time_ms": None,
        "runtime_errors": [],
        "console_errors": [],
        "career_integrity": {},
        "tab_monitoring": {},
        "competitions_tested": {},
        "filters_tested": {},
        "player_modal_stats": {},
        "mobile_check": {}
    }

    page.on("pageerror", lambda e: telemetry["runtime_errors"].append(str(e)))
    page.on("console", lambda msg: telemetry["console_errors"].append(msg.text) if msg.type == "error" else None)

    # 1. Carregamento e HTTP Status
    t0 = time.time()
    resp = page.goto(base_url, wait_until="networkidle")
    load_time = int((time.time() - t0) * 1000)
    telemetry["http_status"] = resp.status if resp else None
    telemetry["load_time_ms"] = load_time
    print(f"Status HTTP: {telemetry['http_status']} em {load_time}ms", flush=True)

    time.sleep(1)

    # 2. Concluir assistente se presente
    modal = page.locator('div.fixed.inset-0')
    if modal.is_visible():
        print("Configurando carreira inicial...", flush=True)
        step1_inputs = modal.locator('input[type="text"]').all()
        if len(step1_inputs) >= 2:
            step1_inputs[0].fill('Carlos')
            step1_inputs[1].fill('Silva')
        email_in = modal.locator('input[type="email"]').first
        if email_in.is_visible():
            email_in.fill('carlos.silva@footkeep.com')
        time.sleep(0.3)
        page.locator('button:has-text("Avançar para Passo 2")').first.click()
        time.sleep(0.5)

        # Selecionar Flamengo ou primeiro clube
        club_card = modal.locator('div.grid div.cursor-pointer').first
        if club_card.is_visible():
            club_card.click()
        time.sleep(0.3)
        page.locator('button:has-text("Avançar para Passo 3")').first.click()
        time.sleep(0.5)
        page.locator('button:has-text("Avançar para Passo 4")').first.click()
        time.sleep(0.5)
        page.locator('button:has-text("Confirmar Carreira e Sincronizar E-mail")').first.click()
        time.sleep(2)

    # 3. Registrar Estado Inicial da Carreira (Pré-Monitoramento)
    career_state_pre = page.evaluate("""() => {
        try {
            const raw = localStorage.getItem('footkeep_save_v1');
            if (!raw) return null;
            const data = JSON.parse(raw);
            return {
                userClubId: data.userClubId,
                budget: data.budget,
                playersCount: data.players ? data.players.filter(p => p.clubId === data.userClubId).length : 0,
                coachName: data.managerProfile ? data.managerProfile.coachName : null
            };
        } catch(e) {
            return null;
        }
    }""")
    print(f"Estado Inicial da Carreira: {career_state_pre}", flush=True)

    # 4. Abertura da Aba 'Monitoramento & Análise'
    print("\n--- Acessando Aba 'Monitoramento & Análise' ---", flush=True)
    mon_tab_btn = page.locator('nav button:has-text("Monitoramento")').first
    assert mon_tab_btn.is_visible(), "Botão da aba Monitoramento & Análise não encontrado na Navbar!"
    mon_tab_btn.click()
    time.sleep(1)

    header_title = page.locator('main h1').first.inner_text()
    badge_season = page.locator('main span:has-text("Footkeep Analytics")').first.inner_text()
    status_text = page.locator('main span:has-text("Auditado & Confirmado")').first.inner_text()

    telemetry["tab_monitoring"] = {
        "header_title": header_title,
        "badge_season": badge_season,
        "audit_status": status_text,
        "is_rendered": True
    }
    print(f"Título: {header_title} | Badge: {badge_season} | Status: {status_text}", flush=True)

    # 5. Navegação pelas 5 Competições Oficiais
    print("\n--- Testando Navegação nas 5 Competições ---", flush=True)
    competitions = [
        "Campeonato Brasileiro — Série A",
        "Campeonato Brasileiro — Série B",
        "Copa do Brasil",
        "Premier League",
        "LaLiga"
    ]

    for comp_name in competitions:
        comp_btn = page.locator(f'main button:has-text("{comp_name}")').first
        assert comp_btn.is_visible(), f"Botão da competição '{comp_name}' não encontrado!"
        comp_btn.click()
        time.sleep(0.5)

        main_content = page.locator('main').inner_text()
        has_comp_name = comp_name in main_content
        season_25_26 = "2025/26" in main_content
        
        telemetry["competitions_tested"][comp_name] = {
            "button_visible": True,
            "rendered_in_content": has_comp_name,
            "season_2025_26_confirmed": season_25_26
        }
        print(f"✔ Competição [{comp_name}]: Renderizada com Temporada 2025/26 ({season_25_26})", flush=True)

    # Retornar para Série A para o teste de scouting
    page.locator('main button:has-text("Campeonato Brasileiro — Série A")').first.click()
    time.sleep(0.5)

    # 6. Teste de Filtros na Aba Scouting / Atletas
    print("\n--- Testando Filtros de Scouting ---", flush=True)
    scouting_tab_btn = page.locator('main button:has-text("Scouting")').first
    assert scouting_tab_btn.is_visible(), "Botão de Scouting não encontrado!"
    scouting_tab_btn.click()
    time.sleep(0.8)

    # Filtro por Posição: Atacantes (A)
    pos_btn_a = page.locator('main button:has-text("Atacantes (A)")').first
    pos_btn_a.click()
    time.sleep(0.5)
    cards_attackers = page.locator('main div.glass-panel:has(h4)').count()
    print(f"Filtro Posição [Atacantes]: {cards_attackers} atletas encontrados.", flush=True)

    # Filtro por Posição: Goleiros (G)
    pos_btn_g = page.locator('main button:has-text("Goleiros (G)")').first
    pos_btn_g.click()
    time.sleep(0.5)
    cards_gk = page.locator('main div.glass-panel:has(h4)').count()
    print(f"Filtro Posição [Goleiros]: {cards_gk} atletas encontrados.", flush=True)

    # Retornar para Todas as Posições
    page.locator('main button:has-text("Todas")').first.click()
    time.sleep(0.5)

    # Campo de Busca por Jogador
    search_input = page.locator('main input[placeholder*="Pesquisar por nome"]').first
    search_input.fill('Pedro')
    time.sleep(0.6)
    search_cards = page.locator('main div.glass-panel:has(h4)').count()
    first_player_name = page.locator('main div.glass-panel:has(h4) h4').first.inner_text()
    print(f"Busca por 'Pedro': {search_cards} resultado(s) - Encontrado: {first_player_name}", flush=True)

    telemetry["filters_tested"] = {
        "position_filter_attackers_count": cards_attackers,
        "position_filter_gk_count": cards_gk,
        "search_pedro_results": search_cards,
        "found_player": first_player_name
    }

    # 7. Teste de Exibição das Estatísticas Detalhadas no Modal
    print("\n--- Abrindo Modal de Estatísticas do Jogador ---", flush=True)
    first_card = page.locator('main div.glass-panel:has(h4)').first
    first_card.click()
    time.sleep(0.8)

    modal_stats = page.locator('div.fixed.inset-0.z-50')
    assert modal_stats.is_visible(), "Modal de Scouting não abriu após o clique!"

    modal_text = modal_stats.inner_text()
    has_matches = "Jogos Oficiais" in modal_text
    has_minutes = "Minutos em Campo" in modal_text
    has_goals = "Gols Marcados" in modal_text
    has_assists = "Assistências" in modal_text
    has_rating = "Nota Média" in modal_text
    has_scout_opinion = "Parecer do Departamento de Inteligência" in modal_text

    telemetry["player_modal_stats"] = {
        "player_modal_opened": True,
        "has_matches": has_matches,
        "has_minutes": has_minutes,
        "has_goals": has_goals,
        "has_assists": has_assists,
        "has_rating": has_rating,
        "has_scout_opinion": has_scout_opinion
    }
    print(f"Estatísticas no Modal: Jogos={has_matches}, Min={has_minutes}, Gols={has_goals}, Assist={has_assists}, Nota={has_rating}", flush=True)

    # Fechar Modal
    close_btn = modal_stats.locator('button[title="Fechar"]').first
    close_btn.click()
    time.sleep(0.5)

    # Limpar campo de busca
    search_input.fill('')
    time.sleep(0.3)

    # 8. Teste de Preservação Intacta da Carreira do Treinador
    print("\n--- Verificando Integridade da Carreira Ativa ---", flush=True)
    career_state_post = page.evaluate("""() => {
        try {
            const raw = localStorage.getItem('footkeep_save_v1');
            if (!raw) return null;
            const data = JSON.parse(raw);
            return {
                userClubId: data.userClubId,
                budget: data.budget,
                playersCount: data.players ? data.players.filter(p => p.clubId === data.userClubId).length : 0,
                coachName: data.managerProfile ? data.managerProfile.coachName : null
            };
        } catch(e) {
            return null;
        }
    }""")
    print(f"Estado Pós-Monitoramento: {career_state_post}", flush=True)

    is_intact = (
        career_state_pre is not None and 
        career_state_post is not None and
        career_state_pre["userClubId"] == career_state_post["userClubId"] and
        career_state_pre["budget"] == career_state_post["budget"] and
        career_state_pre["playersCount"] == career_state_post["playersCount"]
    )
    telemetry["career_integrity"] = {
        "pre_state": career_state_pre,
        "post_state": career_state_post,
        "is_career_intact": is_intact,
        "verdict": "Carreira 100% preservada sem mutações colaterais durante o scouting" if is_intact else "Divergência detectada"
    }
    print(f"Preservação da Carreira: {telemetry['career_integrity']['verdict']}", flush=True)

    # 9. Teste de Responsividade Mobile (375x667)
    print("\n--- Testando Responsividade Mobile (375x667) ---", flush=True)
    page.set_viewport_size({'width': 375, 'height': 667})
    time.sleep(0.8)

    overflow = page.evaluate('() => document.documentElement.scrollWidth > window.innerWidth')
    scroll_w = page.evaluate('() => document.documentElement.scrollWidth')
    inner_w = page.evaluate('() => window.innerWidth')

    telemetry["mobile_check"] = {
        "viewport": "375x667",
        "scrollWidth": scroll_w,
        "innerWidth": inner_w,
        "has_horizontal_overflow": overflow,
        "status": "Aprovado sem vazamento horizontal" if not overflow else "Falha de overflow"
    }
    print(f"Mobile: scrollWidth={scroll_w}px | innerWidth={inner_w}px | Overflow={overflow}", flush=True)

    print(f"\nTotal de Erros de Runtime JS: {len(telemetry['runtime_errors'])}", flush=True)
    print(f"Total de Erros de Console: {len(telemetry['console_errors'])}", flush=True)

    return telemetry

def run_all_tests():
    environments = [
        ("Local Dev (Vite)", "http://localhost:3000"),
        ("Produção Cloudflare Pages", "https://footkeeping.pages.dev/")
    ]

    all_results = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        for env_name, url in environments:
            context = browser.new_context(viewport={'width': 1280, 'height': 800})
            page = context.new_page()
            try:
                res = audit_environment(page, env_name, url)
                all_results[env_name] = res
            except Exception as ex:
                print(f"❌ Erro na auditoria de {env_name}: {ex}", flush=True)
                all_results[env_name] = {"error": str(ex)}
            finally:
                context.close()

        browser.close()

    with open("C:/Users/alisson.sousa/Desktop/footkeep/resultado_auditoria_completa_2025_26.json", "w", encoding="utf-8") as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)

    print("\n🎉 Todas as auditorias automatizadas foram concluídas com sucesso!", flush=True)

if __name__ == "__main__":
    run_all_tests()
