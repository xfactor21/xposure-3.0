#!/usr/bin/env bash
echo "========================================================"
echo "  Xposure 3.0 MCP Automatic Configurator (macOS / Linux)"
echo "========================================================"
echo ""

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

if ! command -v node &> /dev/null
then
    echo "[ERROR] Node.js is not found in your PATH."
    echo "Please install Node.js from https://nodejs.org and rerun this script."
    exit 1
fi

node install.js
