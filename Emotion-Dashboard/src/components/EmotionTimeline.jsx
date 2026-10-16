// components/EmotionTimeline.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: "10px 14px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
          fontSize: 13,
          fontFamily: "inherit",
        }}
      >
        <div style={{ color: "#9ca3af", marginBottom: 4, fontSize: 11, fontWeight: 600 }}>
          {label}
        </div>
        <div style={{ color: "#111827", fontWeight: 700, fontSize: 16 }}>
          {payload[0].value}%
        </div>
        <div style={{ color: "#9ca3af", fontSize: 11, marginTop: 1, textTransform: "capitalize" }}>
          {payload[0].payload.emotion}
        </div>
      </div>
    );
  }
  return null;
};

export default function EmotionTimeline({ emotions }) {
  // Take the last 30 entries, reversed (oldest to newest)
  
  const data = [...emotions]
    .reverse()
    .slice(-30)
    .map((e, i) => ({
      time: e.time
        ? new Date(e.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        : `${i}`,
      confidence: Math.round(e.confidence * 100),
      emotion: e.emotion,
    }));



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
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>
          Confidence Timeline
        </div>
        <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
          Last 30 detections
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
        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 4, right: 12, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="0"
                stroke="#f3f4f6"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10, fill: "#d1d5db", fontFamily: "inherit" }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "#d1d5db", fontFamily: "inherit" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="confidence"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#6366f1",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                animationDuration={600}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
