# EmotionAI — Analytics Dashboard

A premium real-time emotion analytics dashboard built with **React + Vite + Firebase Realtime Database + Recharts**.

---

## Preview

- Live emotion feed with confidence bars
- Animated donut chart for emotion distribution
- Confidence timeline line chart
- Stats cards: Total, Most Common, Peak Confidence, Current Emotion
- Emotion breakdown table with percentage bars
- Real-time Firebase sync via `onValue()`
- Premium light SaaS UI (Apple / Linear / Stripe inspired)

---

## Tech Stack

| Layer      | Tech                              |
|------------|-----------------------------------|
| Framework  | React 18 + Vite 5                 |
| Database   | Firebase Realtime Database v10    |
| Charts     | Recharts 2                        |
| Styling    | Tailwind CSS 3 + Inline styles    |
| Motion     | Framer Motion 11                  |
| Icons      | Lucide React                      |
| Font       | Inter (Google Fonts)              |

---

## Firebase Database Structure

```
emotions/
  auto_id_1/
    emotion: "happy"
    confidence: 0.91
    time: "2026-05-22 11:08:40"
  auto_id_2/
    emotion: "neutral"
    confidence: 0.74
    time: "2026-05-22 11:08:42"
```

---

## Setup Instructions

### 1. Clone / Download

```bash
cd emotion-analytics-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a project → Enable **Realtime Database** (start in test mode)
3. Go to **Project Settings → Your Apps → Add Web App**
4. Copy your config and paste into `src/firebase.js`:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 5. Run Python Backend (to push test data)

```bash
pip install firebase-admin
# Download your Service Account Key from Firebase Console → Project Settings → Service Accounts
# Place it as YOUR_SERVICE_ACCOUNT_KEY.json
python emotion_backend.py
```

The backend pushes a random emotion every 2 seconds — replace with your real AI model.

---

## Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation bar
│   ├── StatsCards.jsx      # 4 analytics KPI cards
│   ├── EmotionFeed.jsx     # Live scrollable feed + search
│   ├── EmotionChart.jsx    # Animated donut pie chart
│   ├── EmotionTimeline.jsx # Confidence over time line chart
│   ├── EmotionTable.jsx    # Emotion breakdown table
│   └── LoadingState.jsx    # Skeleton loading UI
│
├── firebase.js             # Firebase initialization
├── App.jsx                 # Main layout + Firebase listener
├── main.jsx                # React entry point
└── index.css               # Global styles + Inter font
```

---

## Production Build

```bash
npm run build
npm run preview
```

---

## Firebase Security Rules (Recommended)

In Firebase Console → Realtime Database → Rules:

```json
{
  "rules": {
    "emotions": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

For development/testing only, you can use:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

---

## Customization

- **Colors**: Edit `EMOTION_COLORS` in each component
- **Chart style**: Modify Recharts props in `EmotionChart.jsx` / `EmotionTimeline.jsx`
- **Feed limit**: Change `emotions.slice(0, 50)` in `EmotionFeed.jsx`
- **Timeline points**: Change `slice(-30)` in `EmotionTimeline.jsx`
- **Theme**: Edit CSS variables in `index.css`
