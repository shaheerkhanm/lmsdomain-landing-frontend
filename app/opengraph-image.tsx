import { ImageResponse } from "next/og";

export const alt = "LMS Domain - Modern AI-Powered Learning Management Platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function Sparkle({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" />
    </svg>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0F172A",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "#7B5CF5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            <Sparkle size={22} color="white" />
          </div>
          <span style={{ color: "#E2E8F0", fontSize: "28px", fontWeight: 700, letterSpacing: "1px" }}>
            LMS DOMAIN
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              fontSize: "62px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.15,
              margin: 0,
              maxWidth: "960px",
            }}
          >
            The Modern AI-Powered Learning Platform
          </h1>
          <p
            style={{
              fontSize: "26px",
              color: "#94A3B8",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "880px",
            }}
          >
            Courses, assessments, live learning, payments, and Domie AI tutor in one unified system.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              backgroundColor: "rgba(123, 92, 245, 0.2)",
              border: "1px solid rgba(123, 92, 245, 0.45)",
              borderRadius: "9999px",
              padding: "10px 24px",
              color: "#C4B5FD",
              fontSize: "18px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Sparkle size={16} color="#C4B5FD" />
            Domie AI
          </div>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "9999px",
              padding: "10px 24px",
              color: "#E2E8F0",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            9 Core LMS Categories
          </div>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "9999px",
              padding: "10px 24px",
              color: "#E2E8F0",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            lmsdomain.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

