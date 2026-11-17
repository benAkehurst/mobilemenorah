import { ImageResponse } from "next/og";

export const alt = "Mobile Menorah – light a virtual Hanukkah menorah online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const gold = "linear-gradient(180deg, #fcd34d, #d97706)";

function Candle({ lit, tall = false }: { lit: boolean; tall?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 56 }}>
      <div
        style={{
          width: 22,
          height: 36,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          background: lit ? "linear-gradient(0deg, #f97316, #fde68a)" : "transparent",
          boxShadow: lit ? "0 0 30px 12px rgba(251,191,36,0.45)" : "none",
        }}
      />
      <div style={{ width: 4, height: 10, background: "#334155" }} />
      <div style={{ width: 20, height: tall ? 130 : 100, background: tall ? "#fde68a" : "#3b82f6" }} />
      <div style={{ width: 40, height: 16, background: gold, borderRadius: "0 0 12px 12px" }} />
      {tall && <div style={{ width: 12, height: 30, background: gold }} />}
    </div>
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          background: "linear-gradient(180deg, #0f172a, #1e1b4b 60%, #0f172a)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 520 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Mobile Menorah</div>
          <div style={{ fontSize: 36, marginTop: 24, color: "#cbd5e1", lineHeight: 1.3 }}>
            Light a virtual Hanukkah menorah on any device
          </div>
          <div style={{ fontSize: 28, marginTop: 32, color: "#fcd34d" }}>mobilemenorah.com</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            {[0, 1, 2, 3].map((i) => (
              <Candle key={`l${i}`} lit />
            ))}
            <Candle lit tall />
            {[0, 1, 2, 3].map((i) => (
              <Candle key={`r${i}`} lit />
            ))}
          </div>
          <div style={{ width: 500, height: 14, background: gold, borderRadius: 7 }} />
          <div style={{ width: 20, height: 90, background: gold }} />
          <div style={{ width: 240, height: 24, background: gold, borderRadius: "20px 20px 8px 8px" }} />
        </div>
      </div>
    ),
    size
  );
}
