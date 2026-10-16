import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import StatsCards from "./components/StatsCards";
import EmotionFeed from "./components/EmotionFeed";
import EmotionChart from "./components/EmotionChart";
import EmotionTimeline from "./components/EmotionTimeline";
import EmotionTable from "./components/EmotionTable";
import LoadingState from "./components/LoadingState";

// Firebase imports - configure with your own credentials
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";

export default function App() {
  const [emotions, setEmotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const emotionsRef = ref(db, "emotions");

    const unsubscribe = onValue(
      emotionsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const list = Object.entries(data).map(([id, val]) => ({
            id,
            ...val,
          }));
          list.sort((a, b) => new Date(b.time) - new Date(a.time));
          setEmotions(list);
        } else {
          setEmotions([]);
        }
        setLoading(false);
        setIsLive(true);
      },
      (error) => {
        console.error("Firebase error:", error);
        setLoading(false);
        setIsLive(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredEmotions = searchQuery
    ? emotions.filter((e) =>
        e.emotion.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : emotions;

  if (loading) return <LoadingState />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Navbar isLive={isLive} detectionCount={emotions.length} />

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 24px" }}>
        <StatsCards emotions={emotions} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginTop: 24,
          }}
        >
          <EmotionChart emotions={emotions} />
          <EmotionTimeline emotions={emotions} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginTop: 24,
          }}
        >
          <EmotionFeed
            emotions={filteredEmotions}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <EmotionTable emotions={emotions} />
        </div>
      </main>
    </div>
  );
}
