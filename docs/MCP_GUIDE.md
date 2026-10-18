# 🤖 Xposure 3.0 — Model Context Protocol (MCP) Guide

This guide describes how to connect any AI agent (Claude Desktop, Cursor IDE, Antigravity, or custom agent frameworks) to the **Xposure 3.0 MCP Server**.

---

## 🚀 Quick Start in 60 Seconds

The Xposure 3.0 MCP Server is located at:
`C:\Users\17143\.gemini\antigravity-ide\scratch\planet-x-social\mcp-server\server.js`

### 1. Claude Desktop Setup
Open your configuration file:
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

Add the server definition:
```json
{
  "mcpServers": {
    "xposure-3.0": {
      "command": "node",
      "args": [
        "C:\\Users\\17143\\.gemini\\antigravity-ide\\scratch\\planet-x-social\\mcp-server\\server.js"
      ]
    }
  }
}
```

### 2. Cursor IDE Setup
Add to `.cursor/mcp.json` or your Global Cursor MCP settings:
```json
{
  "mcpServers": {
    "xposure-3.0": {
      "command": "node",
      "args": [
        "C:/Users/17143/.gemini/antigravity-ide/scratch/planet-x-social/mcp-server/server.js"
      ]
    }
  }
}
```

---

## 🛠️ MCP Tools Reference

### 1. `xposure_list_platforms`
- **Description**: Returns all 20 integrated platforms, categories, authentication status, and follower/engagement metrics.
- **Parameters**:
  - `category` *(optional, string)*: Filter by `Community`, `Developer`, `Commerce`, `Social`, `Newsletter`, `Launches`, or `All`.

### 2. `xposure_schedule_post`
- **Description**: Schedules an omnichannel broadcast across selected platforms with compliance validation.
- **Parameters**:
  - `text` *(required, string)*: The text content to broadcast.
  - `platforms` *(required, array of strings)*: Target platform IDs (e.g. `["reddit", "discord", "vercel", "twitter"]`).
  - `scheduledAt` *(optional, string)*: ISO-8601 timestamp or `"now"`.

### 3. `xposure_brand_audit`
- **Description**: Performs deterministic brand voice audit (readability score, hook velocity, forbidden words, and platform character constraints).
- **Parameters**:
  - `text` *(required, string)*: Draft text to analyze.

### 4. `xposure_generate_hook`
- **Description**: Generates deterministic copywriting blueprints without AI latency.
- **Parameters**:
  - `topic` *(required, string)*: The core topic or announcement.
  - `framework` *(optional, string)*: `all`, `pas`, `aida`, `contrarian`, or `teardown`.

### 5. `xposure_get_analytics`
- **Description**: Retrieves omnichannel 30-day metrics, reach, engagement rates, and follower growth.
- **Parameters**:
  - `timeframe` *(optional, string)*: `7d`, `30d`, or `90d`.

### 6. `xposure_get_idea_board`
- **Description**: Retrieves active Kanban content cards, runway days remaining, and channel starvation health alerts.

### 7. `xposure_add_idea`
- **Description**: Adds a new strategic content idea to the Xposure pipeline.
- **Parameters**:
  - `title` *(required, string)*: Title or premise.
  - `pillar` *(required, string)*: Content pillar category.
  - `platforms` *(required, array of strings)*: Target channels.

---

## 📚 MCP Resources
- `xposure://brand-guidelines`: Active brand voice rules, forbidden vocabulary blacklist, and hex tokens.
- `xposure://connected-platforms`: Real-time status for all 20 platforms.
- `xposure://analytics-summary`: 30-day cross-channel performance report.

---

## 💬 MCP Prompts
- `brand_voice_review`: Pre-configured prompt to review candidate copy against brand guidelines.
- `cross_platform_repurpose`: Pre-configured prompt to repurpose 1 core idea into 5 native channel formats.
