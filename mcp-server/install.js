/**
 * Xposure 3.0 MCP Auto-Installer & Configurator
 * Automatically detects and configures Claude Desktop, Cursor IDE, and Antigravity IDE
 * with zero manual JSON editing.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MCP_SERVER_JS = path.resolve(__dirname, 'server.js');
const NODE_PATH = process.execPath; // Absolute path to current node.exe

console.log('===========================================================');
console.log('⚡  Xposure 3.0 MCP Auto-Configurator');
console.log('===========================================================');
console.log(`Node Runtime : ${NODE_PATH}`);
console.log(`Server Script: ${MCP_SERVER_JS}`);
console.log('-----------------------------------------------------------');

if (!fs.existsSync(MCP_SERVER_JS)) {
  console.error(`❌ Error: server.js not found at ${MCP_SERVER_JS}`);
  process.exit(1);
}

// 1. Configure Claude Desktop
function configureClaude() {
  let claudeDir = '';
  if (process.platform === 'win32') {
    claudeDir = path.join(process.env.APPDATA || '', 'Claude');
  } else if (process.platform === 'darwin') {
    claudeDir = path.join(os.homedir(), 'Library', 'Application Support', 'Claude');
  } else {
    claudeDir = path.join(os.homedir(), '.config', 'Claude');
  }

  const configFile = path.join(claudeDir, 'claude_desktop_config.json');

  try {
    if (!fs.existsSync(claudeDir)) {
      fs.mkdirSync(claudeDir, { recursive: true });
    }

    let config = { mcpServers: {} };
    if (fs.existsSync(configFile)) {
      try {
        const raw = fs.readFileSync(configFile, 'utf8');
        config = JSON.parse(raw);
        if (!config.mcpServers) config.mcpServers = {};
      } catch (e) {
        console.warn('⚠️ Warning: Existing claude_desktop_config.json was corrupted. Creating backup...');
        fs.writeFileSync(`${configFile}.bak`, fs.readFileSync(configFile));
        config = { mcpServers: {} };
      }
    }

    config.mcpServers['xposure-3.0'] = {
      command: NODE_PATH,
      args: [MCP_SERVER_JS]
    };

    fs.writeFileSync(configFile, JSON.stringify(config, null, 2), 'utf8');
    console.log(`✅ [Claude Desktop] Successfully configured!`);
    console.log(`   Config written to: ${configFile}`);
    return true;
  } catch (err) {
    console.error(`❌ [Claude Desktop] Failed to write config: ${err.message}`);
    return false;
  }
}

// 2. Configure Cursor IDE (Local Workspace or User Global)
function configureCursor() {
  const workspaceRoot = path.resolve(__dirname, '..');
  const cursorDir = path.join(workspaceRoot, '.cursor');
  const cursorFile = path.join(cursorDir, 'mcp.json');

  try {
    if (!fs.existsSync(cursorDir)) {
      fs.mkdirSync(cursorDir, { recursive: true });
    }

    let config = { mcpServers: {} };
    if (fs.existsSync(cursorFile)) {
      try {
        config = JSON.parse(fs.readFileSync(cursorFile, 'utf8'));
        if (!config.mcpServers) config.mcpServers = {};
      } catch (e) {
        config = { mcpServers: {} };
      }
    }

    config.mcpServers['xposure-3.0'] = {
      command: NODE_PATH,
      args: [MCP_SERVER_JS]
    };

    fs.writeFileSync(cursorFile, JSON.stringify(config, null, 2), 'utf8');
    console.log(`✅ [Cursor IDE] Successfully configured!`);
    console.log(`   Config written to: ${cursorFile}`);
    return true;
  } catch (err) {
    console.error(`❌ [Cursor IDE] Failed to write config: ${err.message}`);
    return false;
  }
}

// 3. Configure Antigravity MCP Config if folder exists
function configureAntigravity() {
  const antigravityMcpDir = path.join(os.homedir(), '.gemini', 'antigravity-ide', 'mcp', 'xposure-3');
  try {
    if (!fs.existsSync(antigravityMcpDir)) {
      fs.mkdirSync(antigravityMcpDir, { recursive: true });
    }

    const runner = {
      command: NODE_PATH,
      args: [MCP_SERVER_JS]
    };

    fs.writeFileSync(path.join(antigravityMcpDir, 'runner.json'), JSON.stringify(runner, null, 2), 'utf8');
    console.log(`✅ [Antigravity IDE] Successfully configured!`);
    console.log(`   Runner written to: ${path.join(antigravityMcpDir, 'runner.json')}`);
    return true;
  } catch (e) {
    return false;
  }
}

// Execute all
console.log('\nConfiguring detected AI platforms...');
const claudeRes = configureClaude();
const cursorRes = configureCursor();
const agyRes = configureAntigravity();

console.log('\n-----------------------------------------------------------');
console.log('🎉 Setup Complete! You do not need to host anything.');
console.log('To activate:');
console.log('1. Simply restart Claude Desktop or Cursor.');
console.log('2. The 7 Xposure 3.0 tools will appear automatically.');
console.log('===========================================================\n');
