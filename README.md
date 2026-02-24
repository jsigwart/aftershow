# AfterShow

**The show doesn't end when you leave.**

AfterShow turns your concert ticket into a permanent connection to the night. Built for the Solana Graveyard Hack (Feb 12-27, 2026).

## What is AfterShow?

You just left an incredible concert. The energy was amazing. And then... it's over. Maybe you post a blurry video. Maybe you try to remember the setlist. But the experience just ends.

**AfterShow changes that.** Your NFT concert ticket unlocks:

- **Setlist Vault** - The exact setlist from YOUR show, streamed via Audius
- **Fan Cam Gallery** - Video clips from fans who were there (gated community archive)
- **Tip Artist** - Send SOL directly to the artist via Solana Pay
- **Bonus Tracks** - Unreleased demos and acoustic versions (Artist Coin holders only)
- **Superfan Badge** - Visual status for true supporters
- **Shareable Profile** - Flex your shows at `/profile/[wallet]`

## Tech Stack

- **Next.js 16** - App framework
- **Solana Wallet Adapter** - Phantom, Solflare wallet support
- **Audius API** - Music streaming (1M+ tracks, no rate limits)
- **Solana Pay** - Direct artist tipping
- **Supabase** - Database for shows and fan cams
- **AWS S3** - Fan cam video storage
- **Tailwind CSS** - Japanese-inspired minimal design

## Getting Started

### Prerequisites

- Node.js 18+
- Phantom or Solflare wallet
- (Optional) Supabase account
- (Optional) AWS account for S3

### Installation

```bash
# Clone the repo
git clone https://github.com/jarrensj/music-trenches.git
cd music-trenches

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

```bash
# Audius (optional - works without for demo)
AUDIUS_API_KEY=your_key
AUDIUS_API_BEARER_TOKEN=your_token

# Supabase (optional - uses mock data without)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key

# Solana
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_SOLANA_NETWORK=devnet

# AWS S3 (optional - for fan cam uploads)
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=aftershow-fan-cams
```

## Demo Mode

The app runs in **mock mode** by default, perfect for demos:

- Connect any wallet to get a mock ticket for Charli XCX
- You automatically have 1,500 Artist Coins (enough for bonus tracks + superfan badge)
- Fan cams show placeholder data
- Tipping works on devnet (get devnet SOL from https://faucet.solana.com)

No external services required for a full demo.

## Sponsor Tracks

### Audius ($3,000)
- Audius API integration for music streaming
- Artist Coins for bonus content gating

### KYD Labs (Ticketing)
- NFT ticket concept using cNFTs on Solana
- Ticket-gated content unlocks

## Design

Japanese-inspired minimal aesthetic:
- Warm cream background (#FAF8F5)
- Charcoal text (#4A4A4A)
- Sage green accents (#A8B5A0)
- Clean, spacious layout

## Project Structure

```
app/
├── api/                    # API routes
│   ├── fan-cams/          # Fan cam CRUD
│   ├── shows/             # Shows list
│   └── upload/            # S3 presigned URLs
├── components/            # React components
│   ├── WalletProvider.tsx
│   ├── WalletButton.tsx
│   ├── Header.tsx
│   ├── TicketCard.tsx
│   ├── SetlistPlayer.tsx
│   ├── BonusTracks.tsx
│   ├── FanCamGallery.tsx
│   ├── FanCamUpload.tsx
│   └── TipButton.tsx
├── lib/                   # Utilities
│   ├── audius.ts
│   ├── supabase.ts
│   ├── s3.ts
│   ├── store.ts
│   └── mock-data.ts
├── profile/[wallet]/     # User profile page
├── show/[id]/            # Dynamic show page
├── types/                # TypeScript types
├── layout.tsx
├── page.tsx
└── globals.css
```

## License

MIT

---

Built with caffeine and vibes for the Solana Graveyard Hack.
