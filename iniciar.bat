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

echo Abrindo Footkeep no navegador...
start http://localhost:3000
call npm run dev
