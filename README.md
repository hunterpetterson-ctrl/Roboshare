# 🛰️ BOTdar: Autonomous Machine Census

**BOTdar** is a premium, real-time tracking and classification system for the autonomous machine era. Built with a high-fidelity "Void Black" aesthetic, it utilizes AI to identify, classify, and census the growing population of sidewalk couriers, aerial drones, and autonomous vehicles in our urban environments.

![BOTdar Census](public/sample_bot.png) *Note: Simulation mode active for prototype.*

## ✨ Core Features

- **🌐 Global Mesh Radar**: A high-density Mapbox interface tracking verified signals across the grid.
- **🤖 AI Machine Deconstruction**: Powered by **Google Gemini**, providing surgical identification of hardware models and "Dystopian Vibe" analysis.
- **🍱 Bento Dashboard**: A data-dense, modular HUD for system monitoring, mesh health, and local bot index (AQM).
- **👁️ Tactical Viewfinder**: Interactive camera scanning interface with cinematic AI overlays.
- **🛰️ Satellite-Linked Database**: Real-time pinning of sightings to a global census via Supabase.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15+](https://nextjs.org) (App Router)
- **Intelligence**: [Google Gemini Pro Vision](https://ai.google.dev/)
- **Mapping**: [Mapbox GL JS](https://www.mapbox.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL + PostGIS)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### 1. Clone the Uplink
```bash
git clone https://github.com/YOUR_USERNAME/BOTdar.git
cd BOTdar
```

### 2. Configure Environmental Interlocks
Create a `.env.local` file with the following keys:
```env
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
GEMINI_API_KEY=your_gemini_token
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### 3. Initialize Sensor Array
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the census.

---

*“If you see a bot, you scan a bot. The census must match the reality.”*
