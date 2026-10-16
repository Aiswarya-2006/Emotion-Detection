// components/LoadingState.jsx

function Skeleton({ width = "100%", height = 20, radius = 8, style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background: "linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s infinite",
        ...style,
      }}
    />
  );
}

export default function LoadingState() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* Navbar skeleton */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          height: 64,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Skeleton width={36} height={36} radius={10} />
          <div>
            <Skeleton width={100} height={14} radius={4} />
            <Skeleton width={70} height={10} radius={4} style={{ marginTop: 6 }} />
          </div>
        </div>
        <Skeleton width={200} height={32} radius={8} />
        <Skeleton width={80} height={32} radius={20} />
      </div>

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 24px" }}>
        {/* Stats cards */}
        <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: "#fff",
                borderRadius: 20,
                padding: "24px 28px",
                border: "1px solid #e5e7eb",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flex: 1 }}>
                  <Skeleton width={80} height={10} radius={4} />
                  <Skeleton width={60} height={30} radius={6} style={{ marginTop: 12 }} />
                  <Skeleton width={100} height={10} radius={4} style={{ marginTop: 10 }} />
                </div>
                <Skeleton width={44} height={44} radius={14} />
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 20,
                border: "1px solid #e5e7eb",
                padding: "20px 24px",
                height: 340,
              }}
            >
              <Skeleton width={140} height={14} radius={4} />
              <Skeleton width={90} height={10} radius={4} style={{ marginTop: 8 }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 240 }}>
                <Skeleton width={180} height={180} radius="50%" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 20,
                border: "1px solid #e5e7eb",
                padding: "20px 24px",
                height: 400,
              }}
            >
              <Skeleton width={140} height={14} radius={4} />
              <Skeleton width={90} height={10} radius={4} style={{ marginTop: 8, marginBottom: 20 }} />
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <div key={j} style={{ marginBottom: 12 }}>
                  <Skeleton width="100%" height={52} radius={12} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      {/* Loading indicator */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 20,
          padding: "10px 20px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 13,
          fontWeight: 600,
          color: "#6366f1",
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            border: "2px solid #e0e0fe",
            borderTop: "2px solid #6366f1",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        Connecting to Firebase...
      </div>
    </div>
  );
}
