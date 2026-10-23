@echo off
title Publicar Footkeep no Cloudflare Pages
cd /d "%~dp0"

echo =========================================================
echo ☁️ Publicando Footkeep no Cloudflare Pages...
echo =========================================================
echo.

echo 1. Gerando build de producao atualizado...
call npm run build

if %ERRORLEVEL% neq 0 (
    echo [ERRO] Falha na compilacao do projeto.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo 2. Enviando para o Cloudflare Pages...
echo (Se for a primeira vez, uma janela de login do Cloudflare sera aberta no navegador)
echo.

call npx wrangler pages deploy dist --project-name footkeep

echo.
echo =========================================================
echo Concluido!
echo =========================================================
pause
