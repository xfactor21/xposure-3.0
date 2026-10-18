# 🚀 Deploying Xposure 3.0 to Vercel & How MCP Works

This guide covers everything you need to know about deploying **Xposure 3.0** to **Vercel** and explains exactly how the **MCP Server** functions alongside a web deployment.

---

## 1. Can You Upload Xposure 3.0 to Vercel?

**YES, 100%!** 
Xposure 3.0 is built with modern React 18, Vite, and Vanilla CSS. It is a blazing-fast, static Client-Side Application (SPA) designed to deploy to Vercel with zero configuration.

### How to Deploy to Vercel in 60 Seconds:

#### Option A: Via GitHub (Recommended)
1. Push your repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository. Vercel will automatically detect:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Your custom domain (e.g. `https://xposure-3.vercel.app`) will be live immediately!

#### Option B: Via Vercel CLI
In your project directory:
```bash
npx vercel
```
Follow the 3 prompts and press enter. It will upload and deploy immediately.

We have included a production-ready `vercel.json` in the root directory that automatically configures single-page application routing, asset caching, and security headers.

---

## 2. Does the MCP Work If the Web App Is on Vercel?

### **Short Answer:**
**YES — The MCP works independently on your local machine to control your social posting, auditing, and idea pipeline.**

### **Detailed Architectural Explanation:**
It helps to understand what the two components do and why this setup is actually **the most secure and standard pattern in modern AI engineering**:

```
┌──────────────────────────────────────────────┐
│                  YOUR COMPUTER               │
│                                              │
│  ┌─────────────────┐    stdio    ┌──────────┐│
│  │ Claude Desktop  │ ◄─────────► │ MCP Svr  ││
│  │ or Cursor IDE   │             │(Local)   ││
│  └─────────────────┘             └────┬─────┘│
│                                       │      │
│                                  Local Sync  │
│                                       ▼      │
│  ┌──────────────────────────────────────────┐│
│  │ Browser: https://xposure-3.vercel.app    ││
│  │ (Your Live Web App on Vercel)            ││
│  └──────────────────────────────────────────┘│
└──────────────────────────────────────────────┘
```

1. **The Web App (`https://xposure-3.vercel.app`)**:
   - Hosted on Vercel's global CDN.
   - You can access your dashboards, calendar, and UI from your phone, laptop, or desktop anywhere in the world.
   - All your tokens, post drafts, and ideas stay secure in your browser.

2. **The MCP Server (`mcp-server/server.js`)**:
   - Runs **locally on your computer** via standard input/output (`stdio`).
   - Claude Desktop and Cursor are desktop applications that interact with MCP servers through **local OS processes** (`node server.js`), NOT via remote web links.
   - Because Claude Desktop runs on your laptop, having your MCP server run locally is the **intended, native way MCP was engineered by Anthropic**.
   - You never have to pay to host the MCP server, and you never expose sensitive API keys or credentials to the public internet.

---

## 3. What If You Want Your AI Agent to Interact with Remote Webhooks?

The MCP server already includes direct tools:
- `xposure_schedule_post`: Dispatches posts to any connected platform API or webhook.
- `xposure_brand_audit`: Executes the deterministic mathematical voice audit.
- `xposure_generate_hook`: Generates high-velocity hooks locally.

When you use Claude Desktop with Xposure 3.0:
1. Claude runs `install.bat` (or your local `node server.js`).
2. Claude uses the 7 Xposure tools directly.
3. Your Vercel web app provides the visual canvas, calendar, and team dashboard!
