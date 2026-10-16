// components/EmotionTable.jsx
import { useState } from "react";

const EMOTION_COLORS = {
  happy: "#f59e0b",
  sad: "#3b82f6",
  angry: "#ef4444",
  neutral: "#9ca3af",
  surprise: "#8b5cf6",
  fear: "#ec4899",
  disgust: "#10b981",
};

const ALL_EMOTIONS = ["happy", "sad", "angry", "neutral", "surprise", "fear", "disgust"];

function TableRow({ emotion, count, total }) {
  const [hovered, setHovered] = useState(false);
  const pct = total > 0 ? ((count / total) * 100).toFixed(1) : "0.0";
  const color = EMOTION_COLORS[emotion] || "#6366f1";

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#fafafa" : "transparent",
        transition: "background 0.15s",
      }}
    >
      <td style={{ padding: "11px 16px", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: color,
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#374151",
              textTransform: "capitalize",
            }}
          >
            {emotion}
          </span>
        </div>
      </td>
      <td style={{ padding: "11px 12px", borderBottom: "1px solid #f3f4f6", textAlign: "right" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>
          {count}
        </span>
      </td>
      <td style={{ padding: "11px 16px", borderBottom: "1px solid #f3f4f6", width: "45%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              flex: 1,
              height: 5,
              borderRadius: 99,
              background: "#f3f4f6",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                borderRadius: 99,
                background: color,
                transition: "width 0.5s ease",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#9ca3af",
              minWidth: 36,
              textAlign: "right",
            }}
          >
            {pct}%
          </span>
        </div>
      </td>
    </tr>
  );
}

export default function EmotionTable({ emotions }) {
  const total = emotions.length;
  const counts = emotions.reduce((acc, e) => {
    acc[e.emotion] = (acc[e.emotion] || 0) + 1;
    return acc;
  }, {});

  const rows = ALL_EMOTIONS.map((e) => ({
    emotion: e,
    count: counts[e] || 0,
  })).sort((a, b) => b.count - a.count);

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 20,
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        overflow: "hidden",
        height: 500,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 24px 14px",
          borderBottom: "1px solid #f3f4f6",
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>
          Emotion Breakdown
        </div>
        <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
          Counts and percentages
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  padding: "10px 16px",
                  textAlign: "left",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  borderBottom: "1px solid #f3f4f6",
                  background: "#fafafa",
                }}
              >
                Emotion
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "right",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  borderBottom: "1px solid #f3f4f6",
                  background: "#fafafa",
                }}
              >
                Count
              </th>
              <th
                style={{
                  padding: "10px 16px",
                  textAlign: "left",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  borderBottom: "1px solid #f3f4f6",
                  background: "#fafafa",
                }}
              >
                Share
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <TableRow
                key={row.emotion}
                emotion={row.emotion}
                count={row.count}
                total={total}
              />
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div
          style={{
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #f3f4f6",
            background: "#fafafa",
          }}
        >
          <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
            7 emotion categories
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
            {total} total
          </span>
        </div>
      </div>
    </div>
  );
}
