# HERoute — AI-Powered Safety-Aware Route Advisor
> **“Beyond the fastest route.”**  
> **Team TechSphere**: Vedika • Vaani Gupta • Tushti Arora • Vinya  
> *Submission for Round 2 Working Prototype*

---

## 🚀 About HERoute

HERoute is a navigation intelligence platform designed with women’s travel safety perceptions in mind. Rather than optimizing purely for distance and travel time, HERoute analyzes environmental infrastructure—including **lighting data, emergency services, public facilities, and pedestrian walkways**—to calculate a transparent **Safety-Awareness Score** for route alternatives.

---

## ✨ Features (Directly from Round 1 Presentation)

1. **Multi-Route Comparison (Slide 10)**: Real-time visual comparison of 2–3 alternative routes with safety scores, travel time, and distance.
2. **Safety-Awareness Score Formula (Slide 8)**:
   $$\text{Score} = \sum (\text{Factor Score} \times \text{Weight})$$
   - Public Facilities (25%)
   - Emergency Services (20%)
   - Pedestrian Infrastructure (20%)
   - Transport Accessibility (15%)
   - Lighting Data (10%)
   - Travel Time (10%)
3. **The 3 AI Roles (Slide 9)**:
   - **Role 1 — Understand Preferences**: Natural language travel intent parsing (*"I don't mind walking 5 mins longer for lit streets"*).
   - **Role 2 — Explain Results**: Non-black-box reasoning explaining why Route A scored higher than Route B.
   - **Role 3 — Personalized Recommendations**: Instant weight adjustments (Safety-Aware, Balanced, Fastest).
4. **Interactive Dark-Mode Map**: OpenStreetMap Leaflet map with colored route polylines and toggleable safety POIs (Police Pink Booths, Hospitals, Safe Havens, Illuminated Zones).
5. **Emergency SOS Quick-Action**: Fast access to 112, 1091 Women Helpline, and nearest verified safe spots.

---

## 💻 Running Locally in VS Code

### 1. Open the project in VS Code:
```bash
code C:\Users\Vinya\.gemini\antigravity\scratch\heroute
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Start development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel (1-Click Deployment)

### Option A: Using Vercel CLI (Fastest)
From the project folder in terminal:
```bash
npx vercel
```
- Select defaults (`y`). Vercel will automatically detect Vite and deploy your live URL in ~30 seconds!

### Option B: Push to GitHub & Connect Vercel
1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your repository.
4. Framework Preset will auto-detect as **Vite**.
5. Click **Deploy**.

---

## 🔒 Gemini API Key (Optional)
HERoute contains an explainability engine with built-in high-fidelity rationales so demos never fail. If you wish to enable live generative Gemini responses:
1. Click the **"Gemini AI Ready"** button in the top navbar.
2. Enter your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
