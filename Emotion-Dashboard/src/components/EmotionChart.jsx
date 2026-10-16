// components/EmotionChart.jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const EMOTION_COLORS = {
  happy: "#f59e0b",
  sad: "#3b82f6",
  angry: "#ef4444",
  neutral: "#9ca3af",
  surprise: "#8b5cf6",
  fear: "#ec4899",
  disgust: "#10b981",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    const color = EMOTION_COLORS[name] || "#6366f1";
    return (
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: "10px 14px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
          fontSize: 13,
          color: "#111827",
          fontFamily: "inherit",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: color,
              display: "inline-block",
            }}
          />
          <span style={{ fontWeight: 700, textTransform: "capitalize" }}>
            {name}
          </span>
        </div>
        <div style={{ marginTop: 4, color: "#6b7280" }}>
          {value} detection{value !== 1 ? "s" : ""}
        </div>
      </div>
    );
  }
  return null;
};

const renderCustomLegend = (props) => {
  const { payload } = props;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px 16px",
        justifyContent: "center",
        marginTop: 8,
      }}
    >
      {payload.map((entry, i) => (
        <div
          key={i}
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: entry.color,
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: 12,
              color: "#6b7280",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function EmotionChart({ emotions }) {
  const counts = emotions.reduce((acc, e) => {
    acc[e.emotion] = (acc[e.emotion] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));

  const total = emotions.length;

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 20,
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        padding: "20px 24px",
        height: 340,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>
          Emotion Distribution
        </div>
        <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
          All-time breakdown
        </div>
      </div>

      {data.length === 0 ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#d1d5db",
            fontSize: 13,
          }}
        >
          No data available
        </div>
      ) : (
        <div style={{ flex: 1, position: "relative" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={EMOTION_COLORS[entry.name] || "#6366f1"}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderCustomLegend} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div
            style={{
              position: "absolute",
              top: "42%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.04em" }}
            >
              {total}
            </div>
            <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              total
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
