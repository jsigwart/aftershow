# AfterShow

**The show doesn't end when you leave.**

AfterShow is a fan experience layer for live music. It turns a concert ticket into an ongoing connection to the show, the artist, and the community around that night.

Built for the **Solana Graveyard Hack** (Feb 12–27, 2026).

## What is AfterShow?

One of the weirdest things about live music is how quickly it disappears.

You wait for the show, you get there, you sing your heart out, maybe grab a few videos, and then suddenly it is over. The energy is gone, your clips are scattered in your camera roll, and even the setlist starts to blur.

We wanted to build something that lets the experience keep going.

**AfterShow** uses a concert ticket as the key to everything that happens after the concert:
- **Setlist Vault** – Unlock the exact setlist from your show and listen back through Audius
- **Fan Cam Gallery** – View and share fan-uploaded clips from people who were actually there
- **Tip Artist** – Send SOL directly to the artist in a simple, direct way
- **Bonus Tracks** – Unlock extra songs, demos, or acoustic content for deeper fans
- **Superfan Badge** – Show visible support and collect status over time
- **Shareable Profile** – Build a public fan identity at `/profile/[wallet]`

The goal is simple: make a concert feel less like a one-night event and more like a lasting digital memory.

## Why we built it

We liked the idea that a ticket should not just get you into a venue. It should unlock a fan relationship.

A concert ticket already represents proof that you were part of something real. On Solana, that same ticket can become a digital key for music, content, community, identity, and support for the artist.

AfterShow is our take on what happens when ticketing, music streaming, fan content, and wallet-based identity all come together in one place.

## Core experience

With AfterShow, a fan can:
- connect their wallet
- access a show they attended
- revisit the setlist from that specific night
- watch fan-submitted videos from the crowd
- tip the artist directly
- unlock extra content based on ownership or fan status
- share a profile that reflects the shows they have been part of

Instead of the concert ending at the exit, it becomes the start of a longer experience.

## Tech Stack

- **Next.js 16** – App framework
- **Solana Wallet Adapter** – Phantom and Solflare wallet support
- **Audius API** – Music streaming and artist content
- **Solana Pay** – Direct artist tipping
- **Supabase** – Show data and fan cam records
- **AWS S3** – Fan cam video storage
- **Tailwind CSS** – Clean, minimal UI styling

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
````

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

```bash
# Audius (optional - app works without it in demo mode)
AUDIUS_API_KEY=your_key
AUDIUS_API_BEARER_TOKEN=your_token

# Supabase (optional - mock data used without it)
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

The app runs in **mock mode** by default, which makes it easy to test and present:

* Connect any wallet to receive a mock Charli XCX ticket
* Demo users automatically get 1,500 Artist Coins
* Fan cams use placeholder content
* Tipping works on Solana devnet

That means you can explore the full product flow without setting up every external service first.

## How we used the sponsor tech

### Audius

Audius powers the music side of AfterShow. We use it to connect fans back to the songs and setlists tied to a show, and it also gives us a natural path for bonus content and gated listening experiences.

### KYD Labs

KYD inspired the ticketing side of the project. We built around the idea that a ticket can be more than admission. In AfterShow, the ticket becomes the unlock for post-show experiences, fan identity, and artist engagement.

### Solana

Solana makes the whole idea practical. Wallet access, low-cost transactions, token-gated moments, and direct artist support all fit naturally here. Solana Pay also lets tipping feel immediate and native to the experience.

## Project Structure

```text
app/
├── api/                    # API routes
│   ├── fan-cams/           # Fan cam CRUD
│   ├── shows/              # Shows list
│   └── upload/             # S3 presigned URLs
├── components/             # React components
│   ├── WalletProvider.tsx
│   ├── WalletButton.tsx
│   ├── Header.tsx
│   ├── TicketCard.tsx
│   ├── SetlistPlayer.tsx
│   ├── BonusTracks.tsx
│   ├── FanCamGallery.tsx
│   ├── FanCamUpload.tsx
│   └── TipButton.tsx
├── lib/                    # Utilities
│   ├── audius.ts
│   ├── supabase.ts
│   ├── s3.ts
│   ├── store.ts
│   └── mock-data.ts
├── profile/[wallet]/       # User profile page
├── show/[id]/              # Dynamic show page
├── types/                  # TypeScript types
├── layout.tsx
├── page.tsx
└── globals.css
```

## What is next

We see a lot of room to grow this idea:

* real event and ticket integrations
* artist dashboards
* richer fan profiles and history
* stronger content moderation for fan uploads
* support for more artists, venues, and post-show perks
* collectible or loyalty-based rewards for repeat attendance

## Team

* Mandy Pham
* Julie Sigwart
* Jarren San Jose

## License

MIT
