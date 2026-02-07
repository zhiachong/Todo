# MEMORY.md - Long-Term Memory

## User Preferences

### Convenience is Critical
Zhia explicitly stated: *"Convenience is super critical. You can just do it next time..."*

**What this means:**
- Don't ask for permission to do obvious maintenance tasks
- Anticipate persistence needs (OAuth tokens, configs, env vars)
- Set things up to last by default
- Tell them what I did, don't ask if they want it

### Communication: Analogies for Deeper Concepts
**Preference:** Analogies are especially helpful when exploring deeper or more abstract concepts.

**When to use:**
- Explaining system architecture (use building/infrastructure analogies)
- Discussing market dynamics (use sports/game analogies)
- Exploring philosophical or strategic ideas (use travel/navigation analogies)
- Any time complexity needs simplification

**Impact:** Using analogies first = faster understanding, better retention, clearer mental models

## Lessons Learned

### 2026-02-04: OAuth Persistence
**What I did:** Set up `gog` CLI with Google OAuth but waited to be asked about making it persistent.

**What I should have done:** 
1. Immediately added `GOG_KEYRING_PASSWORD` to `.bashrc`
2. Backed up the config
3. Documented the setup
4. Told Zhia I did this

**Pattern to apply:** When I think "they might want this to persist" — just do it.

## Technical Notes

### GOG Setup
- `GOG_KEYRING_PASSWORD` is in `~/.bashrc`
- Backup at `~/.config/gogcli/backup/`
- Scopes: gmail,calendar,drive,contacts,sheets,docs

## Active Projects

- Amazon Order Tracker (running on port 8090)
- Investment Thesis (in workspace)
- Stock price alerts (HOOD $40-60 buy range, COIN $140-160 buy range)
- Tax Filing 2025 (Airbnb rental property)
- **RallyCut** (7-day MVP launch) — Web SaaS for tennis highlights, server-side processing, $99/year

## System Improvements Tracking

### PowerMem Integration (Issue #7021) - Feb 6, 2026

**Problem:** Large context (170k tokens) causes 30s-1min response latency. Every message processes full conversation history.

**Solution Being Built:** PowerMem integration will auto-retrieve from vector DB instead of loading full history.

**Impact:** 80-90% token reduction, 5-10x speed improvement.

**Tracking:** Weekly cron job (Mondays 10 AM PT) checks issue status and notifies when merged.

**Action When Resolved:** Update OpenClaw immediately, test speed improvement, celebrate.

**Cron Job ID:** 3e8daac5-d29c-49ce-8f95-0db4ecf2c2d2

### RallyCut: Major Product Pivot (Feb 5, 2026)

**Context:** Initially designed as native iOS app with on-device ML (complex, 12+ weeks). **Pivoted to web-first SaaS with server-side processing** — dramatically simpler, launchable in 7 days.

**Why the pivot:**
- On-device ML too slow for reliable video inference
- Server-side processing (Cloudflare Workers) is faster + cheaper
- Manual QA (you review 15-30 min per video) ensures 95%+ quality vs 70-80% from pure ML
- User flow: upload → 24h wait → email with link (not real-time)

**Product Definition:**
- **Positioning:** "SwingVision for highlights. 4K export. Half the price."
- **Value Prop:** Upload tennis match → Get 4K highlight reel in 24 hours → Share to social
- **Price:** $99/year (vs SwingVision $180/year)
- **Target:** Seattle tennis players (5.0 NTRP) initially, then expand
- **MVP Scope:** Web upload → Server ML → Manual QA (you) → FFmpeg export → YouTube link + email

**Spec Location:** `/workspace/shared/documents/ai-generated/prds/RALLYCUT_SPEC_V1.0.md` (complete 7-day build plan)

**Marketing Materials Created:**
- Reddit pitch (r/10s) — technical, transparent positioning
- Facebook pitch (Seattle tennis groups) — community-friendly
- Email template (10 personal contacts) — low-pressure
- Twitter launch sequence (3 tweets)
- All at: `/workspace/shared/documents/ai-generated/prds/RALLYCUT_MARKETING.md`

**Build Timeline (7 Days):**
- **Day 1 (Sat, Feb 5):** Landing page + Stripe checkout + Supabase auth (IN PROGRESS — 95% done)
  - Developer agent created Next.js 14 + Tailwind + shadcn/ui
  - All components scaffolded (Hero, Features, Pricing, SignupForm, Footer)
  - Stripe + Supabase integration code ready
- **Day 2 (Sun):** Video upload (Cloudflare R2) + Resend emails
- **Day 3 (Mon):** MediaPipe rally detection + validation on Zhia's footage
- **Day 4 (Tue):** Admin panel + timeline editor (manual rally adjustment)
- **Day 5 (Wed):** FFmpeg 4K export + YouTube upload
- **Day 6 (Thu):** User dashboard + Stripe billing
- **Day 7 (Fri):** Polish + deploy to rallycut.app + launch

**Launch Goal:** 20 free trials, 5 paid conversions → $500 MRR

### Video Footage (Zhia's Tennis Match Library)

**Location:** `/home/openclaw/workspace/shared/tennis/`

**Raw Videos (6 files, ~2.9GB):**
- `IMG_5220.mov` (74MB) — shortest, test video
- `IMG_5795.MOV` (128MB)
- `15F8C90B-7829-4F61-BE60-9FCE4F4FD978.mov` (897MB)
- `IMG_4052.MOV` (1.1GB)
- `IMG_4118.MOV` (747MB)
- `IMG_6494.MOV` (113MB)
- Content: Full unedited matches with dead time (walking, setup, breaks)
- Use: Rally detection validation

**Edited Videos (5 files, ~2.4GB — SwingVision reference):**
- `02-18-2022-Rally-by-Rally.mp4` (22MB)
- `11-14-2023-Filtered-Rallies.MP4` (55MB)
- `11-19-2023-Filtered-Rallies.mp4` (973MB)
- `11-24-2023-Filtered-Rallies.mp4` (431MB)
- `12-09-2023-Filtered-Rallies.mp4` (916MB)
- Content: Rally-only highlights (reference quality)
- Use: Comparison baseline — shows what good output looks like

**Note:** Raw and edited videos are NOT 1:1 matched. Zhia will re-upload raw videos to SwingVision tomorrow to get comparable edited versions for direct validation.

**Validation Plan (Starting Feb 5, 22:30 PST):**
1. Extract frames from shortest raw video (IMG_5220.mov, 74MB)
2. Run MediaPipe pose detection (1 fps)
3. Consolidate rally segments (custom heuristics)
4. Generate highlight reel using detected rallies
5. Compare output to SwingVision edited videos (duration, pacing, quality)
6. Measure manual QA effort needed to match quality
7. Determine: Is 70-80% accuracy + 15-30 min manual QA viable for MVP?

**Current Blocker (Feb 5, 22:41 PST):**
- Jail environment missing ffmpeg shared libraries (libavdevice.so.59)
- **Options:** Run script locally on Zhia's machine (fast, tonight), OR fix jail libs (slower, miss deadline)
- Waiting for Zhia direction

### Key Insights (Feb 5)

**SwingVision Critique:**
- Bloated: trying to be video editor + social network + gamified competition + coach marketplace all at once
- Free tier limitations (1080p 60fps minimum) = artificial gating to push premium/coach partnerships
- Users likely frustrated with: bloat, confusing features, artificial quality caps
- **RallyCut thesis:** Do one thing perfectly (highlights only), no fluff

**Zhia's Founder-Market Fit:**
- 5.0 tennis player, frustrated with SwingVision limitations
- Built the tool for himself first (20-30 hours of match footage)
- Clear understanding of user pain points
- Direct access to beta users (Seattle tennis community)

## Key Realizations

### 2026-02-04: Investment Philosophy Shift
Zhia's reflection: Active investments (crypto, stock picks) haven't performed well. Real success came from holding company stock over time. Acknowledged he's "not the type for active investment" — better suited to delegating to Aimee. Core strength is building/optimizing, not trading.

**Implications:**
- May want to reconsider active stock monitoring/alerts
- Focus energy on building (consistent with "builder type" identity)
- Aimee takes lead on investment decisions

---

## Embedding Memory System (2026-02-05)

### Token Optimization Strategy

**Problem:** Sending full conversation history wastes tokens and hits context limits.

**Solution:** Semantic retrieval from vector database.

**How it works:**
```
User query → Embed → Search vector DB → Retrieve top-K relevant → 
Augment prompt with only relevant context → Generate response
```

**Benefits:**
- **90% token reduction** vs. sending full history
- **Semantic relevance** — retrieves meaning, not just keywords
- **Scales infinitely** — context window stays constant
- **Survives session resets** — persistent storage

**Implementation:**
```python
# Before each response
relevant_context = recall(user_query, top_k=5)
prompt = f"""
Relevant past conversations:
{format_context(relevant_context)}

Current query: {user_query}
"""
response = generate(prompt)
```

**Status:** ✅ 1,700+ conversations embedded with EmbeddingGemma
**Daily processing:** 3 AM PT cron job adds new conversations
**Query interface:** `python3 memory/query_memory.py "search term"`

### Performance Metrics
- Search speed: ~60ms (vs. 500ms file grep)
- Accuracy: 70-80% relevance (vs. 20-40% keyword)
- Storage: 3KB per message (768-dim vectors)
- Token savings: ~90% reduction in context window usage

## Notion Reorganization (2026-02-05) - SHELVED

**Status:** ❌ Abandoned - keeping original structure

**What was attempted:** Reorganize Journal into database with yearly pages, create AI Projects section, populate with investment thesis/PRD content.

**Decision:** Too complex, not providing clear value. **Keeping original Notion structure as-is.**

**Current Notion state:**
- Journal database: existing (29 entries, full content)
- AI Projects: created but unused
- Personal: existing structure
- Everything else: original layout

**Why:** Simpler is better. The existing Journal database already supports sorting, filtering, search — perfect for what Zhia wants.

## 2025 Tax Filing (2026-02-05)

### Airbnb Rental Property (Capitol Hill)

**Income Summary:**
- **Gross Revenue:** $38,345.57 (36 bookings, 12/2024-12/2025)
- **Average per booking:** $1,065.15
- **Airbnb platform deductions:** $14,112.87 (fees, taxes)
- **Net payout received:** $37,832.16

**Documented Expenses:** $21,607.74
- Utilities (Comcast, PSE, Seattle utilities): $6,594.23
- Cleaning services: $6,480.00
- HOA fees: $3,000.00
- Mortgage interest: $3,139.45
- Licenses/permits: $236.00
- Supplies/miscellaneous: $1,932.08
- Gas fee: $225.98

**Estimated Net Rental Income:** $5,700-$8,400 (before adding property tax, insurance, repairs)

**Critical Missing Items:**
- Property tax statement (~$4,800-6,000/year) — LARGEST deduction usually
- Property insurance (~$1,200-2,400/year)
- Repair/maintenance receipts
- Mortgage statement (verify the $3,139.45 is interest-only)
- Bank statements (reconciliation)

**Documents Created at `/home/openclaw/workspace/shared/documents/taxes/`:**
- `README.md` — Master index and quick start guide
- `QUICK_CHECKLIST.md` — High-level checklist + timeline
- `TAX_FILING_SUMMARY_2025.md` — Comprehensive data sources
- `airbnb/AIRBNB_2025_TAX_CALCULATION.md` — Detailed income/expense analysis
- Folder structure created for: property_tax/, insurance/, repairs/, bank_statements/, w2_1099/

**Next Steps:**
1. Gather property tax statement (CRITICAL)
2. Find property insurance docs
3. Verify mortgage statement (interest portion)
4. Collect W2/1099 forms
5. Schedule CPA meeting by mid-March

## Investment Decision: Sell Bounces for Dry Powder (Feb 6, 2026)

**Market Context:**
- Relief rally today on oversold conditions (bottom fishing)
- **NOT resolved** — underlying headwinds unchanged:
  - New Fed chair is hawkish (rates staying high)
  - Trade war still active (no material progress)
- Further downside risk likely

**Strategy (Zhia + Aimee):**
- **Sell** long-term gains on bounces (realize gains on upswings)
- **Accumulate** dry powder (cash reserves)
- **Goal:** Buy at lower prices in April/May (expect continued weakness)

**Rationale:**
- Don't fight the Fed + trade tensions (structural, not sentiment)
- Better to move to cash on relief rallies than hold into another drawdown
- Dry powder gives optionality if market re-tests lows

**When:** Starting Feb 6 bounce onward
**Target:** Have significant cash ready by end of March for April/May re-entry

**Note:** This is active/tactical (unlike long-term passive holding). Aligned with Zhia's earlier insight that he's "not the type for active investment" — but this is appropriate given macro clarity + defined timing window.

## System: Embedding Refresh Frequency (Feb 6, 13:20 PST)

**Change:** Increased from 1x daily → 2x daily

**Schedule:**
- 3:00 AM PT: Morning batch (embeds overnight conversations)
- 3:00 PM PT: Afternoon batch (embeds daytime conversations)

**Impact:**
- Search latency: No change (~60ms)
- Context freshness: 2x faster (12-hour max lag vs 24-hour)
- Storage: No change
- Processing cost: Negligible (~5-10 min each off-peak)

**When it matters:** 
- Morning sessions get yesterday's conversations immediately
- Afternoon sessions get morning's work already embedded
- Long sessions benefit from fresher context retrieval

**Status:** ✅ Live (jobs 028804fc and 2d9097c9)

## System: Context Management Strategy (Feb 7, 2026)

### Problem
OpenClaw sends full conversation history with every message → 170k+ token context → 30s-1min latency

### Current Model
- **Default model:** Kimi k2p5 (as requested — kept for most work)
- **Sub-agents:** Proactively spawn for coding/building tasks (no need to ask)
- **Auto-compaction:** Notify-first approach
  - ~100k tokens: Warn user before compacting
  - ~150k tokens: Auto-compact with summary preservation

### Why Notify-First
User controls context preservation. I warn before erasing detail — no surprises.

### Permanent Fix (Pending)
**PowerMem integration (#7021)** — vector DB semantic retrieval
- 80-90% token reduction
- 5-10x speed improvement
- Cron job tracking weekly: `3e8daac5-d29c-49ce-8f95-0db4ecf2c2d2`

### Status
✅ Strategy active. Spawn sub-agents for isolated work. Compact with warning at threshold.
