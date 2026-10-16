// components/EmotionFeed.jsx
import { useState } from "react";

const EMOTION_COLORS = {
  happy: { bg: "#fffbeb", border: "#fde68a", dot: "#f59e0b", text: "#92400e" },
  sad: { bg: "#eff6ff", border: "#bfdbfe", dot: "#3b82f6", text: "#1e40af" },
  angry: { bg: "#fef2f2", border: "#fecaca", dot: "#ef4444", text: "#991b1b" },
  neutral: { bg: "#f9fafb", border: "#e5e7eb", dot: "#6b7280", text: "#374151" },
  surprise: { bg: "#f5f3ff", border: "#ddd6fe", dot: "#8b5cf6", text: "#5b21b6" },
  fear: { bg: "#fdf2f8", border: "#fbcfe8", dot: "#ec4899", text: "#9d174d" },
  disgust: { bg: "#f0fdf4", border: "#bbf7d0", dot: "#10b981", text: "#065f46" },
};

function FeedCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const colors = EMOTION_COLORS[item.emotion] || EMOTION_COLORS.neutral;
  const confPercent = Math.round(item.confidence * 100);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "14px 16px",
        borderRadius: 14,
        border: `1px solid ${hovered ? colors.dot + "60" : "#e5e7eb"}`,
        background: hovered ? colors.bg : "#fafafa",
        transition: "all 0.18s ease",
        cursor: "default",
        animation: index === 0 ? "slideIn 0.35s ease" : "none",
      }}
    >
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: colors.dot,
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: colors.text,
              textTransform: "capitalize",
            }}
          >
            {item.emotion}
          </span>
        </div>
        <span
          style={{
            fontSize: 11,
            color: "#9ca3af",
            fontWeight: 500,
          }}
        >
          {item.time?.slice(11, 19) || "—"}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            flex: 1,
            height: 5,
            borderRadius: 99,
            background: "#e5e7eb",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${confPercent}%`,
              borderRadius: 99,
              background: colors.dot,
              transition: "width 0.6s ease",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: colors.dot,
            minWidth: 36,
            textAlign: "right",
          }}
        >
          {confPercent}%
        </span>
      </div>
    </div>
  );
}

export default function EmotionFeed({ emotions, searchQuery, setSearchQuery }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 20,
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: 500,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 24px 16px",
          borderBottom: "1px solid #f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>
            Live Feed
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
            Real-time detections
          </div>
        </div>

        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#f9fafb",
            borderRadius: 10,
            padding: "7px 12px",
            border: "1px solid #e5e7eb",
            flex: 1,
            maxWidth: 200,
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter emotion..."
            style={{
              border: "none",
              background: "transparent",
              fontSize: 12,
              color: "#374151",
              outline: "none",
              fontFamily: "inherit",
              width: "100%",
            }}
          />
        </div>
      </div>

      {/* Feed list */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {emotions.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              color: "#9ca3af",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 15s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round" />
              <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div style={{ fontSize: 13, fontWeight: 500 }}>
              {searchQuery ? "No matching emotions" : "No detections yet"}
            </div>
            <div style={{ fontSize: 12 }}>
              {searchQuery
                ? "Try a different filter"
                : "Waiting for Firebase data..."}
            </div>
          </div>
        ) : (
          emotions.slice(0, 50).map((item, i) => (
            <FeedCard key={item.id} item={item} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
