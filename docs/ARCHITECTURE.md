# 🏛️ Xposure 3.0 — Architecture & System Design

This document details the architectural layers, state flow, deterministic rule engine, and integration protocols powering **Xposure 3.0**.

---

## 1. High-Level Architectural Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                          XPOSURE 3.0 CLIENT                            │
│                                                                        │
│  ┌────────────────────┐  ┌───────────────────┐  ┌───────────────────┐  │
│  │   Floating Header  │  │   Floating Dock   │  │   Adaptive FAB    │  │
│  │ (Wordmark & Status)│  │ (macOS Magnified) │  │  (Top 5 Actions)  │  │
│  └────────────────────┘  └───────────────────┘  └───────────────────┘  │
│                                │                                       │
│       ┌────────────────────────┴────────────────────────┐              │
│       ▼                                                 ▼              │
│  ┌─────────────────────────┐               ┌────────────────────────┐  │
│  │ Brand Studio & Cohesion │               │  Idea Matrix & Kanban  │  │
│  │  (Zero-AI Deterministic)│               │  (Runway & Blueprints) │  │
│  └─────────────────────────┘               └────────────────────────┘  │
│       │                                                 │              │
│       └────────────────────────┬────────────────────────┘              │
│                                ▼                                       │
│                  ┌───────────────────────────┐                         │
│                  │  Omnichannel Composer     │                         │
│                  │   & 20 Platform Adapters  │                         │
│                  └───────────────────────────┘                         │
└────────────────────────────────┬───────────────────────────────────────┘
                                 │
                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                MODEL CONTEXT PROTOCOL (MCP) SERVER                     │
│                  (mcp-server/server.js - Stdio JSON-RPC 2.0)           │
│                                                                        │
│   Tools:                        Resources:              Prompts:       │
│   • xposure_list_platforms      • xposure://brand       • brand_voice  │
│   • xposure_schedule_post       • xposure://platforms   • repurpose    │
│   • xposure_brand_audit         • xposure://analytics                  │
│   • xposure_generate_hook                                              │
│   • xposure_get_analytics                                              │
│   • xposure_get_idea_board                                             │
│   • xposure_add_idea                                                   │
└────────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   AUTONOMOUS AGENTS & ECOSYSTEM                        │
│             Claude Desktop • Cursor • Antigravity • LLMs               │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Hierarchy & Module Breakdown

- **`src/main.jsx`**: Application entry point, styles mounting, and React 18 root mounting.
- **`src/App.jsx`**: Core orchestration component:
  - **`Topbar`**: Floating glass header with official horizontal wordmark (`/xposure-wordmark.jpg`), live telemetry pill, search bar, and user profile chip.
  - **`FloatingDock`**: Centered bottom macOS-style navigation dock with tooltip hotkeys (**1-8**), hover magnification, and active pill animations.
  - **`AdaptiveFab`**: Autonomous draggable action button with official emblem (`/xposure-emblem.jpg`), celestial orbit animation, 4-corner adaptive dock snapping, and expandable Top 5 Quick Actions popover.
  - **`DashboardPage`**: Aggregated reach, posting runway, active platform indicators, and cross-network health cards.
  - **`ConnectorPage`**: 20-platform grid categorized into Community, Developer, Commerce, Social, Visual, and Video, featuring simulated OAuth 2.0 modals.
  - **`BrandStudioPage`**: Voice archetype selector, live cohesion gauge (0-100%), forbidden buzzword highlighter, and reading ease calculation.
  - **`IdeasPage`**: Content runway forecaster, starvation alert banner, deterministic framework generator (PAS, AIDA, Contrarian, Teardown), and 5-stage interactive Kanban board.
  - **`ComposerPage`**: Multi-platform broadcast composer with live channel previews (Reddit, Discord, Vercel, Twitter).
  - **`AnalyticsPage`**: 30-day cross-platform conversion telemetry and engagement charts.
  - **`McpHubPage`**: Interactive in-browser MCP testing playground and configuration exporter.
  - **`DocsPage`**: Comprehensive in-app documentation portal with build logs, architecture specs, and direct download links.
  - **`SettingsPage`**: Local encryption vault settings and API tokens.

---

## 3. The Zero-AI Deterministic Rule Engine

Instead of utilizing expensive, slow, and unpredictable LLM calls, Xposure 3.0 uses deterministic algorithms:

### A. Flesch Reading Ease Formula
$$\text{Score} = 206.835 - 1.015 \left(\frac{\text{Total Words}}{\text{Total Sentences}}\right) - 84.6 \left(\frac{\text{Total Syllables}}{\text{Total Words}}\right)$$

### B. Hook Velocity Index
Calculated dynamically based on:
1. **Numerical Proof**: Presence of specific metrics, percentages, or data points (+25 pts).
2. **Pattern Interrupt**: Presence of question marks or trigger terms (`why`, `how`, `stop`, `secret`, `truth`) (+20 pts).
3. **Punchiness Budget**: Text length between 40 and 280 characters (+20 pts).

### C. Forbidden Lexicon Scanner
Scans text against an active blacklist of corporate clichés (`game-changer`, `delve`, `supercharge`, `synergy`, `paradigm shift`, `seamlessly`, `revolutionary`). Each violation penalizes the cohesion score by 15-18 points and presents structured replacement suggestions.

### D. Combinatorial Copywriting Blueprints
Generates multi-part structured copy using proven marketing formulas:
- **PAS**: Problem identification $\rightarrow$ Pain agitation $\rightarrow$ Product solution.
- **AIDA**: Attention grabber $\rightarrow$ Interest anchor $\rightarrow$ Desire catalyst $\rightarrow$ Direct action link.
- **Contrarian Hot Take**: Common premise $\rightarrow$ Flaw teardown $\rightarrow$ Alternative perspective.
- **Technical Teardown**: Metric hook $\rightarrow$ Architectural steps $\rightarrow$ Repository link.

---

## 4. Model Context Protocol (MCP) Architecture

The MCP server runs as a separate Node.js process interacting over standard I/O (stdin/stdout):
- **Stateless Tool Calls**: Each invocation is isolated and safe for concurrent execution.
- **Structured JSON Responses**: Returns well-defined payloads with `content: [{ type: "text", text: "..." }]`.
- **Zero Dependencies**: Implemented natively in pure Node.js without requiring external packages, ensuring instant execution on any system.
