@echo off
title Footkeep - Jogo de Gestao de Futebol
cd /d "%~dp0"

echo =========================================================
echo ⚽ Iniciando Footkeep Football Manager...
echo =========================================================
echo.

if not exist "node_modules" (
    echo Instalando dependencias necessarias...
    call npm install
)

echo Iniciando servidor Vite na porta 3000...
echo O jogo abrira automaticamente no seu navegador.
echo (Para parar o servidor, feche esta janela)
echo.

call npx vite --host 0.0.0.0 --port 3000 --open
pause
