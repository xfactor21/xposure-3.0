# 🪐 Xposure 3.0 Model Context Protocol (MCP) Server

A high-performance, deterministic MCP server giving any AI Agent (Claude Desktop, Cursor, Antigravity, Open-source LLM agents) native access to **Xposure 3.0 Omnichannel Command Center**.

## ✨ Capabilities

- **Zero-AI Hallucination Engine**: All brand auditing, copywriting frameworks (PAS, AIDA, BAB), and cohesion scores are computed algorithmically and deterministically without external API latency or fees.
- **20 Integrated Platforms**: Reddit, Etsy, Discord, Vercel, GitHub / BitHub, Substack, Product Hunt, Medium, Instagram, TikTok, X, LinkedIn, YouTube, and more.
- **Full MCP Protocol Support**: Tools, Resources (`xposure://*`), and Prompts (`brand_voice_review`, `cross_platform_repurpose`).

---

## 🚀 Quick Setup for AI Agents

### 1. Claude Desktop Setup
Open your Claude Desktop configuration file:
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

Add this entry:
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
In `.cursor/mcp.json` or Global MCP Settings:
```json
{
  "mcpServers": {
    "xposure-3.0": {
      "command": "node",
      "args": ["C:/Users/17143/.gemini/antigravity-ide/scratch/planet-x-social/mcp-server/server.js"]
    }
  }
}
```

---

## 🛠️ MCP Tools Reference

| Tool Name | Description | Key Parameters |
|-----------|-------------|----------------|
| `xposure_list_platforms` | List 20 platforms, auth status, follower stats, and metric categories | `category` (optional) |
| `xposure_schedule_post` | Omnichannel scheduling across target channels with compliance audit | `text`, `platforms`, `scheduledAt` |
| `xposure_brand_audit` | Deterministic readability, hook velocity, forbidden buzzwords & constraints | `text` |
| `xposure_generate_hook` | Algorithmic copywriting blueprints (PAS, AIDA, Contrarian, Teardown) | `topic`, `framework` |
| `xposure_get_analytics` | 30-day cross-platform impressions, reach, engagement & growth | `timeframe` |
| `xposure_get_idea_board` | Active content Kanban board, runway days remaining & starving channels | (none) |
| `xposure_add_idea` | Push a new content spark or idea to the strategic Kanban pipeline | `title`, `pillar`, `platforms` |

---

## 📚 MCP Resources

- `xposure://brand-guidelines`: Active brand voice rules, forbidden vocabulary blacklist, and hex tokens.
- `xposure://connected-platforms`: Real-time status for all 20 platforms.
- `xposure://analytics-summary`: 30-day cross-channel performance report.
