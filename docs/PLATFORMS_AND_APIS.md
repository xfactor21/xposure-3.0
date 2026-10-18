# 🌐 Xposure 3.0 — Platform Matrix & API Specification

Xposure 3.0 supports 20 premier platforms across Community, Developer, Commerce, and Social domains.

---

## Complete Platform Directory

| Platform ID | Category | Accent Color | Default Metric | Supported Scopes |
|-------------|----------|--------------|----------------|------------------|
| `reddit` | Community | `#FF4500` | Karma (42.8K) | `read, submit, identity, flair` |
| `etsy` | Commerce | `#F16521` | Listings (48 items) | `listings_r, listings_w, shops_r` |
| `discord` | Community | `#5865F2` | Members (14.2K) | `bot, webhook.incoming, messages.read` |
| `vercel` | Developer | `#00F0FF` | Deploys (124) | `deployments:read, deployments:write` |
| `github` | Developer | `#9E54E6` | Stars (3.9K) | `repo, read:org, workflow` |
| `substack` | Newsletter | `#FF6719` | Subscribers (18.5K) | `publication:read, email:send` |
| `producthunt` | Launches | `#DA552F` | Upvotes (2.1K) | `public, post:read, vote` |
| `medium` | Publication | `#00AB6C` | Claps (44K) | `basicProfile, listPublications, publishPost` |
| `twitter` | Social | `#1DA1F2` | Followers (12.3K) | `tweet.read, tweet.write, users.read` |
| `instagram` | Visual | `#E4405F` | Followers (38.1K) | `instagram_basic, instagram_content_publish` |
| `tiktok` | Short Video | `#FF0050` | Followers (52.8K) | `video.list, video.upload` |
| `linkedin` | Professional | `#0A66C2` | Followers (8.7K) | `w_member_social, r_organization_social` |
| `youtube` | Video | `#FF0000` | Subscribers (15.2K) | `youtube.upload, youtube.readonly` |
| `facebook` | Social | `#1877F2` | Followers (24.5K) | `pages_manage_posts, pages_read_engagement` |
| `pinterest` | Visual | `#BD081C` | Monthly Views (88K) | `pins:read, pins:write, boards:read` |
| `threads` | Social | `#FFFFFF` | Followers (11.4K) | `threads_basic, threads_content_publish` |
| `bluesky` | Decentralized | `#0085FF` | Followers (7.8K) | `com.atproto.repo.createRecord` |
| `twitch` | Live Stream | `#9146FF` | Followers (4.2K) | `channel:read:subscriptions, chat:read` |
| `google` | Local/SEO | `#4285F4` | Reviews (184 / 4.9★) | `business.manage, local_posts` |
| `snapchat` | Story | `#FFFC00` | Subscribers (12K) | `snapchat_marketing_api` |

---

## Two-Phase OAuth Implementation Pattern

Discovered during our reverse-engineering of Metricool, Xposure 3.0 executes platform connection in two isolated phases:

### Phase 1: Identity Token Authorization
User initiates OAuth 2.0 handshake with the target platform provider. The provider issues an access token and refresh token scoped to the user's account.

### Phase 2: Entity Introspection & Target Binding
The client performs an entity query to enumerate manageable resources:
- Reddit: enumerates subscribed and moderated subreddits.
- Discord: enumerates accessible server guild channels and webhook endpoints.
- Etsy: fetches the merchant's authenticated shop identifiers.
- Vercel: enumerates team workspaces and production project slugs.
- GitHub: enumerates personal and organization repositories.

This ensures credentials remain securely isolated while granting precise publishing control.
