import sys
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000', wait_until='networkidle')
    
    # Handle wizard
    modal = page.locator("div.fixed.inset-0")
    if modal.is_visible():
        for _ in range(4):
            btn = page.locator("button:has-text('Avançar')").first
            if btn.is_visible():
                btn.click()
                page.wait_for_timeout(300)
        start_btn = page.locator("button:has-text('Confirmar e Iniciar Carreira'), button:has-text('Iniciar Carreira')").first
        if start_btn.is_visible():
            start_btn.click()
            page.wait_for_timeout(1000)

    # Check badges on Home
    imgs = page.locator("img[src*='/badges/']").all()
    print(f"Total de escudos encontrados na Visão Geral: {len(imgs)}")
    broken = []
    for img in imgs:
        src = img.get_attribute('src')
        is_loaded = img.evaluate("(el) => el.complete && el.naturalWidth > 0")
        if not is_loaded:
            broken.append(src)
        else:
            print(f"  ✅ Escudo carregado: {src}")

    # Check badges on League Table
    page.locator("nav button:has-text('Liga Nacional')").first.click()
    page.wait_for_timeout(500)
    league_imgs = page.locator("table img[src*='/badges/']").all()
    print(f"\nTotal de escudos na Tabela da Série A: {len(league_imgs)}")
    for img in league_imgs:
        src = img.get_attribute('src')
        is_loaded = img.evaluate("(el) => el.complete && el.naturalWidth > 0")
        if not is_loaded:
            broken.append(src)
    
    if broken:
        print(f"\n🚨 Escudos quebrados ({len(broken)}): {broken}")
    else:
        print(f"\n🎉 100% dos escudos na tabela da Série A ({len(league_imgs)} clubes) carregados perfeitamente!")

    browser.close()
