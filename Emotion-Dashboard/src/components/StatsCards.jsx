// components/StatsCards.jsx
import { useState, useEffect } from "react";

const EMOTION_COLORS = {
  happy: "#f59e0b",
  sad: "#3b82f6",
  angry: "#ef4444",
  neutral: "#6b7280",
  surprise: "#8b5cf6",
  fear: "#ec4899",
  disgust: "#10b981",
};

function StatCard({ icon, label, value, sub, accentColor, index }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: 20,
        padding: "24px 28px",
        border: "1px solid #e5e7eb",
        boxShadow: hovered
          ? "0 12px 32px rgba(0,0,0,0.10)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered
          ? "translateY(-3px)"
          : visible
          ? "translateY(0)"
          : "translateY(16px)",
        opacity: visible ? 1 : 0,
        cursor: "default",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
            {label}
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#111827", letterSpacing: "-0.04em", lineHeight: 1 }}>
            {value}
          </div>
          {sub && (
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6, fontWeight: 500 }}>
              {sub}
            </div>
          )}
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: `${accentColor}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon(accentColor)}
        </div>
      </div>
    </div>
  );
}

export default function StatsCards({ emotions }) {
  const total = emotions.length;

  const emotionCounts = emotions.reduce((acc, e) => {
    acc[e.emotion] = (acc[e.emotion] || 0) + 1;
    return acc;
  }, {});

  const mostCommon = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0];
  const mostCommonEmotion = mostCommon ? mostCommon[0] : "—";

  const peakConfidence = emotions.length
    ? Math.max(...emotions.map((e) => e.confidence))
    : 0;

  const currentEmotion = emotions.length ? emotions[0].emotion : "—";
  const currentConf = emotions.length
    ? Math.round(emotions[0].confidence * 100)
    : 0;

  const cards = [
    {
      label: "Total Detections",
      value: total.toLocaleString(),
      sub: "all time",
      accentColor: "#6366f1",
      icon: (c) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      ),
    },
    {
      label: "Most Common",
      value: mostCommonEmotion.charAt(0).toUpperCase() + mostCommonEmotion.slice(1),
      sub: mostCommon ? `${mostCommon[1]} times detected` : "no data",
      accentColor: EMOTION_COLORS[mostCommonEmotion] || "#6366f1",
      icon: (c) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ),
    },
    {
      label: "Peak Confidence",
      value: `${Math.round(peakConfidence * 100)}%`,
      sub: "highest recorded",
      accentColor: "#10b981",
      icon: (c) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      label: "Current Emotion",
      value: currentEmotion.charAt(0).toUpperCase() + currentEmotion.slice(1),
      sub: total > 0 ? `${currentConf}% confidence` : "no data yet",
      accentColor: EMOTION_COLORS[currentEmotion] || "#6366f1",
      icon: (c) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round" />
          <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", gap: 20 }}>
      {cards.map((card, i) => (
        <StatCard key={card.label} {...card} index={i} />
      ))}
    </div>
  );
}
