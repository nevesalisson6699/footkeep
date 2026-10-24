import sys, time, json
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

def audit():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})
        
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        
        page.goto('https://footkeep.pages.dev')
        time.sleep(1)
        
        # Complete wizard
        modal = page.locator('div.fixed.inset-0')
        if modal.is_visible():
            inputs = modal.locator('input[type="text"]').all()
            if len(inputs) >= 2:
                inputs[0].fill('Alisson')
                inputs[1].fill('Sousa')
            for _ in range(3):
                page.locator('button:has-text("Avançar")').first.click()
                time.sleep(0.3)
            btn = page.locator('button:has-text("Confirmar e Iniciar Carreira"), button:has-text("Iniciar Carreira")').first
            if btn.is_visible():
                btn.click()
                time.sleep(1)
        
        tabs = [
            'Visão Geral',
            'Elenco & Tática',
            'Jogar Partida',
            'Liga Nacional',
            'Copa Footkeep',
            'Transferências',
            'Finanças',
            'Configurações'
        ]
        
        report = {}
        for tab in tabs:
            btn = page.locator(f'nav button:has-text("{tab}")').first
            btn.click()
            time.sleep(0.6)
            
            headings = [h.strip().replace('\n', ' ') for h in page.locator('main h1, main h2, main h3, main h4').all_inner_texts() if h.strip()]
            body_txt = page.locator('main').inner_text()
            svgs = page.locator('main svg').count()
            
            report[tab] = {
                'status': 'OK',
                'headings': headings[:3],
                'svg_count': svgs,
                'content_length': len(body_txt)
            }
            print(f'✅ Aba [{tab}]: {len(body_txt)} chars, {svgs} SVGs, Títulos: {headings[:2]}')

        # Teste Mobile
        page.set_viewport_size({'width': 375, 'height': 667})
        time.sleep(0.5)
        overflow_mobile = page.evaluate('() => document.documentElement.scrollWidth > window.innerWidth')
        print(f'📱 Mobile Overflow: {"⚠️ Presente" if overflow_mobile else "✅ Nenhum (Layout Perfeito)"}')
        print(f'🚨 Total de Erros JS de Runtime: {len(errors)}')
        
        browser.close()
        
        with open('relatorio_final_telas.json', 'w', encoding='utf-8') as f:
            json.dump({
                'report': report,
                'overflow_mobile': overflow_mobile,
                'errors': errors
            }, f, indent=2, ensure_ascii=False)

if __name__ == '__main__':
    audit()
