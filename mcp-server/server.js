#!/usr/bin/env node
/**
 * Xposure 3.0 Model Context Protocol (MCP) Server
 * Stdio JSON-RPC 2.0 implementation adhering to MCP Specification.
 * Compatible with Claude Desktop, Cursor, Antigravity, and AI Agents.
 */

import readline from 'readline';

const SERVER_NAME = 'xposure-3.0-mcp';
const SERVER_VERSION = '3.0.0';

// ── In-Memory State for Demonstration & Realtime Agent Interaction ──
const STATE = {
  brand: {
    name: 'Xposure 3.0',
    tagline: 'Omnichannel Command Center & Brand Intelligence',
    archetype: 'Cyberpunk Maverick',
    toneKeywords: ['Bold', 'Punchy', 'Data-driven', 'Provocative', 'High-velocity'],
    forbiddenWords: [
      'game-changer', 'revolutionary', 'delve', 'supercharge', 'synergy',
      'paradigm shift', 'disruptive', 'seamlessly', 'unleash', 'leverage'
    ],
    hashtags: ['#Xposure', '#IndieHacker', '#BuildInPublic', '#DevTools', '#Omnichannel'],
    colors: {
      hotPink: '#FF1493',
      cyan: '#00E5FF',
      cosmicPurple: '#7928CA',
      deepBlack: '#06080F'
    }
  },
  platforms: [
    { id: 'reddit', name: 'Reddit', category: 'Community', connected: true, metricLabel: 'Karma', metricValue: '42.8K', engagement: '6.8%', defaultSub: 'r/startups' },
    { id: 'etsy', name: 'Etsy', category: 'Commerce', connected: true, metricLabel: 'Listings', metricValue: '48 items', engagement: '3.4% conv', shop: 'PlanetXStore' },
    { id: 'discord', name: 'Discord', category: 'Community', connected: true, metricLabel: 'Members', metricValue: '14.2K', engagement: '18.2% active', guild: 'Planet.X Hub' },
    { id: 'vercel', name: 'Vercel', category: 'Developer', connected: true, metricLabel: 'Deploys', metricValue: '124', engagement: '99.98% uptime', team: 'xposure-core' },
    { id: 'github', name: 'GitHub / BitHub', category: 'Developer', connected: true, metricLabel: 'Stars', metricValue: '3.9K', engagement: '412 forks', repo: 'xposure/command' },
    { id: 'substack', name: 'Substack', category: 'Newsletter', connected: true, metricLabel: 'Subscribers', metricValue: '18.5K', engagement: '46.2% open', pub: 'Xposure Insights' },
    { id: 'producthunt', name: 'Product Hunt', category: 'Launches', connected: true, metricLabel: 'Upvotes', metricValue: '2.1K', engagement: '#2 Product', rank: '#2' },
    { id: 'medium', name: 'Medium', category: 'Publication', connected: true, metricLabel: 'Claps', metricValue: '44K', engagement: '68% read ratio', handle: '@xposure' },
    { id: 'instagram', name: 'Instagram', category: 'Social', connected: true, metricLabel: 'Followers', metricValue: '38.1K', engagement: '4.7%', handle: '@xposure.social' },
    { id: 'tiktok', name: 'TikTok', category: 'Short Video', connected: true, metricLabel: 'Followers', metricValue: '52.8K', engagement: '8.9%', handle: '@xposure_hq' },
    { id: 'twitter', name: 'X / Twitter', category: 'Social', connected: true, metricLabel: 'Followers', metricValue: '12.3K', engagement: '2.1%', handle: '@xposure3' },
    { id: 'linkedin', name: 'LinkedIn', category: 'Professional', connected: true, metricLabel: 'Followers', metricValue: '8.7K', engagement: '5.4%', page: 'Xposure Technology' },
    { id: 'youtube', name: 'YouTube', category: 'Long Video', connected: true, metricLabel: 'Subscribers', metricValue: '15.2K', engagement: '6.1%', channel: 'Xposure TV' },
    { id: 'threads', name: 'Threads', category: 'Social', connected: false, metricLabel: 'Followers', metricValue: '11.4K', engagement: '4.1%' },
    { id: 'bluesky', name: 'Bluesky', category: 'Decentralized', connected: false, metricLabel: 'Followers', metricValue: '7.8K', engagement: '5.9%' },
    { id: 'pinterest', name: 'Pinterest', category: 'Visual', connected: false, metricLabel: 'Monthly Views', metricValue: '88K', engagement: '2.8%' },
    { id: 'twitch', name: 'Twitch', category: 'Streaming', connected: false, metricLabel: 'Followers', metricValue: '4.2K', engagement: '7.3%' },
    { id: 'google', name: 'Google Business', category: 'Local/SEO', connected: true, metricLabel: 'Reviews', metricValue: '184 (4.9★)', views: '45K' },
    { id: 'snapchat', name: 'Snapchat', category: 'Story', connected: false, metricLabel: 'Subscribers', metricValue: '12K', storyViews: '34K' },
    { id: 'facebook', name: 'Facebook', category: 'Social', connected: true, metricLabel: 'Followers', metricValue: '24.5K', engagement: '3.2%' }
  ],
  scheduledPosts: [
    { id: 'post_1', text: 'Xposure 3.0 is live: 20 platforms unified with zero-latency brand intelligence.', platforms: ['twitter', 'linkedin', 'discord', 'reddit'], scheduledAt: '2026-10-20T14:00:00Z', status: 'ready' },
    { id: 'post_2', text: 'How we engineered a deterministic brand cohesion engine without LLM latency: a deep teardown.', platforms: ['reddit', 'github', 'substack'], scheduledAt: '2026-10-21T16:30:00Z', status: 'ready' }
  ],
  ideas: [
    { id: 'idea_1', title: 'Reddit AMA on Building Cross-Platform DevTools in 2026', pillar: 'Community Teardown', status: 'scheduled', platforms: ['reddit', 'discord'] },
    { id: 'idea_2', title: 'Etsy + Discord automated drop announcement system', pillar: 'Case Study', status: 'asset_ready', platforms: ['etsy', 'discord', 'tiktok'] },
    { id: 'idea_3', title: 'Vercel Deployment webhook to Twitter & GitHub release notes', pillar: 'Behind the Scenes', status: 'draft', platforms: ['vercel', 'github', 'twitter'] },
    { id: 'idea_4', title: 'Why 90% of brands waste 4 hours daily copying captions across platforms', pillar: 'Contrarian Angle', status: 'spark', platforms: ['linkedin', 'twitter', 'substack'] }
  ]
};

// ── Deterministic Algorithmic Brand Intelligence Engine ──
function performBrandAudit(text) {
  const words = text.toLowerCase().match(/\b[a-z0-9_-]+\b/g) || [];
  const charCount = text.length;
  const wordCount = words.length;

  // 1. Detect forbidden words
  const violations = [];
  STATE.brand.forbiddenWords.forEach(fw => {
    if (text.toLowerCase().includes(fw.toLowerCase())) {
      violations.push(fw);
    }
  });

  // 2. Compute Flesch Reading Ease estimate
  // 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
  const sentences = Math.max(1, (text.match(/[.!?]+/g) || []).length);
  const avgSentenceLength = wordCount / sentences;
  const readingScore = Math.max(0, Math.min(100, Math.round(100 - (avgSentenceLength * 2.2))));

  // 3. Hook Velocity Score (checks for curiosity gap, numerical proof, time-bound or question pattern)
  let hookPoints = 40;
  if (/\d+/.test(text)) hookPoints += 20; // contains specific data / numbers
  if (/\?|why|how|stop|secret|truth|framework/i.test(text)) hookPoints += 20; // pattern interrupt
  if (text.length >= 40 && text.length <= 280) hookPoints += 20; // optimal punchiness
  const hookVelocity = Math.min(100, hookPoints);

  // 4. Overall Cohesion Score
  let score = 92;
  score -= (violations.length * 15);
  if (readingScore < 45) score -= 12;
  if (hookVelocity < 60) score -= 10;
  score = Math.max(10, Math.min(100, score));

  return {
    score,
    grade: score >= 90 ? 'A+ (Optimal)' : score >= 80 ? 'B+ (Solid)' : score >= 65 ? 'C (Needs Polish)' : 'F (High Violations)',
    readingEase: `${readingScore}/100`,
    hookVelocity: `${hookVelocity}/100`,
    characterCount: charCount,
    wordCount: wordCount,
    forbiddenViolations: violations,
    suggestedReplacements: violations.map(v => ({
      forbidden: v,
      recommended: v === 'game-changer' ? 'inflection point' : v === 'delve' ? 'dissect' : v === 'supercharge' ? 'accelerate' : 'refactor'
    })),
    platformCompliance: {
      twitter: charCount <= 280 ? 'Pass' : `Exceeds by ${charCount - 280} chars`,
      reddit: charCount <= 40000 ? 'Pass' : 'Exceeds',
      discord: charCount <= 2000 ? 'Pass' : 'Exceeds',
      linkedin: charCount <= 3000 ? 'Pass' : 'Exceeds',
      etsyTagLength: 'Pass'
    }
  };
}

// ── Deterministic Copywriting Blueprint Generator ──
function generateHooks(topic, framework = 'all') {
  const cleanTopic = topic || 'Omnichannel Growth';
  const blueprints = {
    pas: {
      framework: 'Problem-Agitate-Solution (PAS)',
      hook: `Most founders waste 3 hours every day manually formatting posts for 10 different platforms.`,
      body: `You spend 90% of your energy fighting platform constraints instead of building your product, causing your audience reach to stall.`,
      solution: `With ${STATE.brand.name}, write once and publish natively across 20 channels in under 30 seconds.`
    },
    aida: {
      framework: 'Attention-Interest-Desire-Action (AIDA)',
      hook: `⚡ 20 platforms. Zero manual re-formatting. 1 unified command center.`,
      body: `From Reddit AMAs to Discord rich embeds and Vercel changelogs, we benchmarked real multi-channel workflows.`,
      desire: `Imagine never copying and pasting credentials or adjusting image ratios manually again.`,
      action: `Try the live command center at http://localhost:3000/`
    },
    contrarian: {
      framework: 'Contrarian Hot Take',
      hook: `Unpopular opinion on ${cleanTopic}: Having 100k followers on 1 platform is a liability, not an asset.`,
      body: `If your audience is trapped on one algorithm, you don't own your business — the platform does. Diversify into Discord, Substack, Reddit, and GitHub or prepare for sudden obscurity.`,
      action: `Which platform is driving your actual revenue today?`
    },
    teardown: {
      framework: 'Technical Teardown / Blueprint',
      hook: `Here is our exact architecture for automating multi-channel syndication without AI hallucinations:`,
      body: `1. OAuth token vault with scoped permissions\n2. Deterministic cohesion scoring engine\n3. Channel-specific transformation matrices (Discord embeds vs Reddit Markdown)\n4. Stdio Model Context Protocol for any agent.`,
      action: `Full open-source repo breakdown below 👇`
    }
  };

  if (framework !== 'all' && blueprints[framework.toLowerCase()]) {
    return [blueprints[framework.toLowerCase()]];
  }
  return Object.values(blueprints);
}

// ── MCP JSON-RPC Server Implementation ──
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function sendResponse(response) {
  process.stdout.write(JSON.stringify(response) + '\n');
}

rl.on('line', (line) => {
  if (!line.trim()) return;
  let msg;
  try {
    msg = JSON.parse(line);
  } catch (err) {
    sendResponse({
      jsonrpc: '2.0',
      id: null,
      error: { code: -32700, message: 'Parse error: Invalid JSON' }
    });
    return;
  }

  const { id, method, params } = msg;

  // Handle standard MCP methods
  switch (method) {
    case 'initialize': {
      sendResponse({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
            resources: {},
            prompts: {}
          },
          serverInfo: {
            name: SERVER_NAME,
            version: SERVER_VERSION
          }
        }
      });
      break;
    }

    case 'notifications/initialized': {
      // Notification received from client, no response required
      break;
    }

    case 'tools/list': {
      sendResponse({
        jsonrpc: '2.0',
        id,
        result: {
          tools: [
            {
              name: 'xposure_list_platforms',
              description: 'List all 20 integrated platforms (Reddit, Etsy, Discord, Vercel, GitHub, Substack, ProductHunt, etc.) with authentication status and metrics.',
              inputSchema: {
                type: 'object',
                properties: {
                  category: {
                    type: 'string',
                    description: 'Optional filter by category: Community, Developer, Commerce, Social, Newsletter, Launches',
                    enum: ['Community', 'Developer', 'Commerce', 'Social', 'Newsletter', 'Launches', 'All']
                  }
                }
              }
            },
            {
              name: 'xposure_schedule_post',
              description: 'Schedule an omnichannel broadcast across selected platforms with platform compliance validation.',
              inputSchema: {
                type: 'object',
                properties: {
                  text: { type: 'string', description: 'The text content to broadcast' },
                  platforms: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Target platform IDs (e.g. ["reddit", "discord", "vercel", "twitter", "linkedin"])'
                  },
                  scheduledAt: { type: 'string', description: 'ISO-8601 UTC timestamp or "now"' }
                },
                required: ['text', 'platforms']
              }
            },
            {
              name: 'xposure_brand_audit',
              description: 'Perform a deterministic, rule-based brand voice audit on copy (evaluates readability, hook velocity, forbidden words, and platform character constraints).',
              inputSchema: {
                type: 'object',
                properties: {
                  text: { type: 'string', description: 'The candidate copy or draft to audit' }
                },
                required: ['text']
              }
            },
            {
              name: 'xposure_generate_hook',
              description: 'Generate deterministic copywriting blueprints (PAS, AIDA, Contrarian, Technical Teardown) for any topic without AI latency.',
              inputSchema: {
                type: 'object',
                properties: {
                  topic: { type: 'string', description: 'The subject, product, or feature to generate hooks for' },
                  framework: {
                    type: 'string',
                    description: 'Copywriting framework to use',
                    enum: ['all', 'pas', 'aida', 'contrarian', 'teardown']
                  }
                },
                required: ['topic']
              }
            },
            {
              name: 'xposure_get_analytics',
              description: 'Retrieve omnichannel analytics summary, cross-platform engagement rates, and follower growth.',
              inputSchema: {
                type: 'object',
                properties: {
                  timeframe: { type: 'string', enum: ['7d', '30d', '90d'], default: '30d' }
                }
              }
            },
            {
              name: 'xposure_get_idea_board',
              description: 'Retrieve the active content idea Kanban board, runway days remaining, and channel health indicators.',
              inputSchema: {
                type: 'object',
                properties: {}
              }
            },
            {
              name: 'xposure_add_idea',
              description: 'Add a new strategic content idea to the Xposure 3.0 Kanban pipeline.',
              inputSchema: {
                type: 'object',
                properties: {
                  title: { type: 'string', description: 'Idea title or working angle' },
                  pillar: { type: 'string', enum: ['Community Teardown', 'Behind the Scenes', 'Case Study', 'Contrarian Angle', 'Culture Hook'] },
                  platforms: { type: 'array', items: { type: 'string' } }
                },
                required: ['title', 'pillar', 'platforms']
              }
            }
          ]
        }
      });
      break;
    }

    case 'tools/call': {
      const { name, arguments: args = {} } = params || {};
      try {
        let resultData;
        if (name === 'xposure_list_platforms') {
          const list = args.category && args.category !== 'All'
            ? STATE.platforms.filter(p => p.category.toLowerCase() === args.category.toLowerCase())
            : STATE.platforms;
          resultData = { count: list.length, platforms: list };
        } else if (name === 'xposure_schedule_post') {
          const audit = performBrandAudit(args.text);
          const newPost = {
            id: `post_${Date.now()}`,
            text: args.text,
            platforms: args.platforms,
            scheduledAt: args.scheduledAt || 'now',
            status: 'scheduled',
            brandScore: audit.score
          };
          STATE.scheduledPosts.push(newPost);
          resultData = { success: true, post: newPost, auditSummary: audit };
        } else if (name === 'xposure_brand_audit') {
          resultData = performBrandAudit(args.text);
        } else if (name === 'xposure_generate_hook') {
          resultData = generateHooks(args.topic, args.framework);
        } else if (name === 'xposure_get_analytics') {
          resultData = {
            totalPlatforms: STATE.platforms.length,
            connectedCount: STATE.platforms.filter(p => p.connected).length,
            aggregatedAudience: '228.4K',
            monthlyImpressions: '2.84M',
            avgEngagementRate: '6.4%',
            topPerformingChannel: 'Discord & Reddit',
            runwayDays: '16 Days'
          };
        } else if (name === 'xposure_get_idea_board') {
          resultData = {
            runwayForecastDays: 16,
            ideas: STATE.ideas,
            channelHealth: {
              reddit: 'Starving (0 scheduled in next 48h)',
              discord: 'Healthy (3 active sequences)',
              twitter: 'Optimal (8 queued)',
              vercel: 'Synced with main branch'
            }
          };
        } else if (name === 'xposure_add_idea') {
          const newIdea = {
            id: `idea_${Date.now()}`,
            title: args.title,
            pillar: args.pillar,
            platforms: args.platforms,
            status: 'spark',
            createdAt: new Date().toISOString()
          };
          STATE.ideas.unshift(newIdea);
          resultData = { success: true, idea: newIdea };
        } else {
          sendResponse({
            jsonrpc: '2.0',
            id,
            error: { code: -32601, message: `Unknown tool: ${name}` }
          });
          return;
        }

        sendResponse({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(resultData, null, 2)
              }
            ]
          }
        });
      } catch (err) {
        sendResponse({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: `Tool error: ${err.message}` }],
            isError: true
          }
        });
      }
      break;
    }

    case 'resources/list': {
      sendResponse({
        jsonrpc: '2.0',
        id,
        result: {
          resources: [
            {
              uri: 'xposure://brand-guidelines',
              name: 'Brand Guidelines & Tone Rules',
              description: 'Active Xposure 3.0 brand voice, forbidden vocabulary, and color palette tokens.',
              mimeType: 'application/json'
            },
            {
              uri: 'xposure://connected-platforms',
              name: 'Connected Platform Status',
              description: 'Live status and credential health for all 20 supported platforms.',
              mimeType: 'application/json'
            },
            {
              uri: 'xposure://analytics-summary',
              name: 'Omnichannel 30-Day Metrics',
              description: 'Aggregated cross-platform reach, click rates, and growth trajectory.',
              mimeType: 'application/json'
            }
          ]
        }
      });
      break;
    }

    case 'resources/read': {
      const { uri } = params || {};
      let content;
      if (uri === 'xposure://brand-guidelines') {
        content = JSON.stringify(STATE.brand, null, 2);
      } else if (uri === 'xposure://connected-platforms') {
        content = JSON.stringify(STATE.platforms, null, 2);
      } else if (uri === 'xposure://analytics-summary') {
        content = JSON.stringify({
          period: 'Last 30 Days',
          totalReach: '2.84M',
          aggregateFollowers: '228.4K',
          avgEngagement: '6.4%',
          topGrowth: ['TikTok (+14%)', 'Discord (+22%)', 'Reddit (+18%)']
        }, null, 2);
      } else {
        sendResponse({
          jsonrpc: '2.0',
          id,
          error: { code: -32602, message: `Unknown resource uri: ${uri}` }
        });
        return;
      }

      sendResponse({
        jsonrpc: '2.0',
        id,
        result: {
          contents: [{ uri, mimeType: 'application/json', text: content }]
        }
      });
      break;
    }

    case 'prompts/list': {
      sendResponse({
        jsonrpc: '2.0',
        id,
        result: {
          prompts: [
            {
              name: 'brand_voice_review',
              description: 'Reviews and refactors candidate draft to adhere to Xposure 3.0 Cyberpunk Maverick brand standards.',
              arguments: [
                { name: 'draft_text', description: 'Raw post text to optimize', required: true }
              ]
            },
            {
              name: 'cross_platform_repurpose',
              description: 'Transforms a single core idea into tailored formats for Reddit, Discord, Vercel/GitHub, X, and LinkedIn.',
              arguments: [
                { name: 'core_idea', description: 'The central insight or announcement', required: true }
              ]
            }
          ]
        }
      });
      break;
    }

    case 'prompts/get': {
      const { name, arguments: pArgs = {} } = params || {};
      if (name === 'brand_voice_review') {
        sendResponse({
          jsonrpc: '2.0',
          id,
          result: {
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: `Please optimize the following post for the Xposure 3.0 brand voice (Cyberpunk Maverick: bold, punchy, high-velocity, data-driven). Eliminate all forbidden words: ${STATE.brand.forbiddenWords.join(', ')}.\n\nDraft:\n"""\n${pArgs.draft_text || ''}\n"""`
                }
              }
            ]
          }
        });
      } else if (name === 'cross_platform_repurpose') {
        sendResponse({
          jsonrpc: '2.0',
          id,
          result: {
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: `Repurpose this core idea for 5 platforms with distinct formats:\n1. Reddit (Community discussion & honest numbers)\n2. Discord (Rich announcement with emoji accents)\n3. Vercel/GitHub (Changelog & developer highlights)\n4. X / Twitter (High-velocity 4-tweet thread)\n5. LinkedIn (Strategic insight & takeaways)\n\nCore Idea:\n"""\n${pArgs.core_idea || ''}\n"""`
                }
              }
            ]
          }
        });
      } else {
        sendResponse({
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: `Unknown prompt: ${name}` }
        });
      }
      break;
    }

    default: {
      sendResponse({
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Method not found: ${method}` }
      });
    }
  }
});
