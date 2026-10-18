# 🚀 Xposure 3.0 MCP Server — Installation & Execution Instructions

This standalone bundle contains everything needed to operate the **Xposure 3.0 Model Context Protocol (MCP) Server** with Claude Desktop, Cursor, Antigravity, or custom agents.

---

## Prerequisites
- Node.js version 18.0.0 or higher.
- No external npm packages required (100% zero-dependency stdio implementation).

## ⚡ 1-Click Automated Setup (Recommended)

You don't need to manually edit any config files. Run the automated installer:

### On Windows:
Double-click `install.bat` (or run in PowerShell / Command Prompt):
```bash
node install.js
```

### On macOS / Linux:
Make executable and run:
```bash
chmod +x install.sh
./install.sh
```

The script will automatically:
1. Locate your Claude Desktop directory (`%APPDATA%\Claude` on Windows or `~/Library/Application Support/Claude` on Mac).
2. Detect Cursor IDE workspaces (`.cursor/mcp.json`).
3. Write the exact paths to your Node.js runtime and `server.js` automatically without any formatting mistakes.
4. Leave you ready to restart Claude Desktop or Cursor and start using the tools immediately!

---

## 🏃 Running the Server Manually (Testing)

To test the server in a terminal:
```bash
node server.js
```
The server will start listening for JSON-RPC 2.0 messages over standard input (`stdin`) and write responses to standard output (`stdout`).

### Test with a JSON-RPC Message:
```bash
node -e "const { execSync } = require('child_process'); console.log(execSync('node server.js', { input: JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/list'}) + '\n' }).toString());"
```

---

## 💻 Claude Desktop Configuration

1. Locate your Claude configuration file:
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
2. Add the following entry:
```json
{
  "mcpServers": {
    "xposure-3.0": {
      "command": "node",
      "args": [
        "ABSOLUTE_PATH_TO_THIS_FOLDER\\server.js"
      ]
    }
  }
}
```
*(Replace `ABSOLUTE_PATH_TO_THIS_FOLDER` with the full folder path on your computer).*

3. Restart Claude Desktop. The hammer/tools icon will now display the 7 Xposure 3.0 tools!

---

## 💻 Cursor IDE Configuration

1. In Cursor, open **Settings** → **Features** → **MCP Servers** (or edit `.cursor/mcp.json`).
2. Add:
```json
{
  "mcpServers": {
    "xposure-3.0": {
      "command": "node",
      "args": ["ABSOLUTE_PATH_TO_THIS_FOLDER/server.js"]
    }
  }
}
```
3. Restart Cursor or reload the MCP servers panel.

---

## 📋 Available Tools

1. `xposure_list_platforms`: Lists all 20 platforms, auth status, followers, and engagement rates.
2. `xposure_schedule_post`: Schedules cross-channel broadcasts with platform validation.
3. `xposure_brand_audit`: Deterministic brand voice analysis (cohesion score, forbidden words, readability).
4. `xposure_generate_hook`: Algorithmic copywriting blueprints (PAS, AIDA, Contrarian, Teardown).
5. `xposure_get_analytics`: Aggregated 30-day cross-platform metrics.
6. `xposure_get_idea_board`: Content idea Kanban pipeline and runway forecast.
7. `xposure_add_idea`: Adds a new idea card to the pipeline.
