export default function Navbar({ detectionCount }) {
  return (
    <nav
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 32px",
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left Side */}
      <div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#111827",
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          EmotiSense AI
        </h1>

        <p
          style={{
            fontSize: 13,
            color: "#6b7280",
            marginTop: 2,
          }}
        >
          Real-Time Emotion Analytics Dashboard
        </p>
      </div>

      {/* Right Side */}
      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#6366f1",
          }}
        >
          {detectionCount}
        </div>

        <div
          style={{
            fontSize: 12,
            color: "#9ca3af",
            fontWeight: 500,
          }}
        >
          Total Detections
        </div>
      </div>
    </nav>
  );
}

