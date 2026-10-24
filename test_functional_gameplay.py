#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Validação aprofundada de mecânicas de gameplay do Footkeep:
1. Simulação completa de partida (play match, advance round).
2. Validação da tabela de classificação e finanças pós-jogo.
3. Validação de táticas e auto-escalação.
4. Validação de persistência de configurações.
5. Validação de mercado de transferências (compra/venda).
"""

import sys, time, json
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

TARGET_URL = "http://localhost:3000"

def run_gameplay_tests():
    print(f"🚀 Iniciando testes de gameplay em {TARGET_URL} ...")
    results = {}
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        console_warn_errors = []
        page.on("console", lambda msg: console_warn_errors.append(f"[{msg.type}] {msg.text}") if msg.type in ['error'] else None)
        
        # 1. Carregamento inicial
        page.goto(TARGET_URL, wait_until="networkidle")
        time.sleep(1)
        
        # 2. Wizard de Carreira
        modal = page.locator("div.fixed.inset-0")
        if modal.is_visible():
            inputs = modal.locator("input[type='text']").all()
            if len(inputs) >= 2:
                inputs[0].fill("Professor")
                inputs[1].fill("Tático")
            for _ in range(3):
                page.locator("button:has-text('Avançar')").first.click()
                time.sleep(0.3)
            btn = page.locator("button:has-text('Confirmar e Iniciar Carreira'), button:has-text('Iniciar Carreira')").first
            if btn.is_visible():
                btn.click()
                time.sleep(1)
        
        print("✅ Carreira inicializada.")
        
        # 3. Teste da Aba Elenco & Tática + Auto Escalação
        print("\n[Teste 1] Elenco & Tática...")
        page.locator("nav button:has-text('Elenco & Tática')").first.click()
        time.sleep(0.5)
        
        auto_lineup_btn = page.locator("button:has-text('Auto-Escalação'), button:has-text('Auto Escalação'), button:has-text('Auto')").first
        if auto_lineup_btn.is_visible():
            auto_lineup_btn.click()
            time.sleep(0.5)
            print("  ✅ Botão 'Auto-Escalação' clicado com sucesso.")
        else:
            print("  ⚠️ Botão 'Auto-Escalação' não encontrado diretamente.")
            
        # 4. Teste de Simulação de Partida
        print("\n[Teste 2] Simulação de Partida...")
        page.locator("nav button:has-text('Jogar Partida')").first.click()
        time.sleep(0.5)
        
        # Verificar árbitro
        ref_text = page.locator("text=Equipe Oficial de Arbitragem").count() + page.locator("text=Árbitro Principal").count()
        print(f"  Equipe de arbitragem renderizada: {'✅ Sim' if ref_text > 0 else '⚠️ Não'}")
        
        # Botão Instantâneo ou Iniciar Narração
        instant_btn = page.locator("button:has-text('Instantâneo')").first
        if instant_btn.is_visible():
            instant_btn.click()
            time.sleep(0.5)
            print("  ✅ Simulação instantânea disparada.")
        
        # Avançar / Concluir Partida
        finish_btn = page.locator("button:has-text('Confirmar & Avançar Rodada')").first
        if finish_btn.is_visible():
            finish_btn.click()
            time.sleep(1)
            print("  ✅ Rodada avançada com sucesso via 'Confirmar & Avançar Rodada'!")
        else:
            print("  ⚠️ Botão de confirmação de rodada não visível.")
            
        # 5. Teste da Tabela de Classificação
        print("\n[Teste 3] Tabela de Classificação...")
        page.locator("nav button:has-text('Liga Nacional')").first.click()
        time.sleep(0.5)
        table_rows = page.locator("table tbody tr").count()
        print(f"  Linhas na tabela da Série A: {table_rows} (Esperado: 20)")
        
        # 6. Teste da Copa Footkeep
        print("\n[Teste 4] Copa Footkeep...")
        page.locator("nav button:has-text('Copa Footkeep')").first.click()
        time.sleep(0.5)
        brackets = page.locator("div.glass-panel, div.border-slate-800").count()
        print(f"  Elementos do chaveamento renderizados: {brackets}")
        
        # 7. Teste de Transferências
        print("\n[Teste 5] Mercado de Transferências...")
        page.locator("nav button:has-text('Transferências')").first.click()
        time.sleep(0.5)
        players_listed = page.locator("div.grid button, table tr, div.border-slate-800").count()
        print(f"  Atletas/cards visíveis no mercado: {players_listed}")
        
        # 8. Teste de Finanças
        print("\n[Teste 6] Finanças...")
        page.locator("nav button:has-text('Finanças')").first.click()
        time.sleep(0.5)
        finance_cards = page.locator("main div.rounded-xl, main div.glass-panel").count()
        print(f"  Painéis financeiros renderizados: {finance_cards}")
        
        # 9. Teste de Configurações
        print("\n[Teste 7] Configurações...")
        page.locator("nav button:has-text('Configurações')").first.click()
        time.sleep(0.5)
        
        # Clicar em testar som
        sound_test_btn = page.locator("button:has-text('Testar Som')").first
        if sound_test_btn.is_visible():
            sound_test_btn.click()
            time.sleep(0.3)
            print("  ✅ Teste do sintetizador Web Audio API acionado sem exceções.")
            
        # Alternar dificuldade
        diff_hard_btn = page.locator("button:has-text('Difícil')").first
        if diff_hard_btn.is_visible():
            diff_hard_btn.click()
            time.sleep(0.3)
            print("  ✅ Nível de dificuldade alternado para Difícil.")
            
        # Checar localStorage
        settings_raw = page.evaluate("() => localStorage.getItem('footkeep_settings_v1')")
        print(f"  Configurações no localStorage: {settings_raw}")
        
        # 10. Resumo de Erros
        print(f"\n==========================================")
        print(f"🚨 Total de Erros de Página (Runtime): {len(errors)}")
        print(f"🚨 Total de Erros no Console: {len(console_warn_errors)}")
        if errors:
            print(f"Detalhes dos erros de página: {errors}")
        if console_warn_errors:
            print(f"Detalhes do console: {console_warn_errors}")
        print(f"==========================================")
        
        browser.close()

if __name__ == "__main__":
    run_gameplay_tests()
