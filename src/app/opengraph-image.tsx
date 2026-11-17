import { ImageResponse } from "next/og";

export const alt = "Mobile Menorah – light a virtual Hanukkah menorah online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hex equivalents of the design tokens (Satori doesn't support oklch).
const C = {
  night: "#080f1c", // --color-night
  ink: "#efebe2", // --color-night-ink
  muted: "#b7b0a3", // --color-night-muted
  brass: "#d9a850", // --color-brass
  brassShade: "#a36d24", // --color-brass-shade
  flame: "#ffc249", // --color-flame
  flameEdge: "#f06b00", // --color-flame-edge
  candle: "#4885df", // --color-candle-blue
  shamash: "#f1e4bf", // --color-wax-shamash
};

const metal = `linear-gradient(180deg, ${C.brass}, ${C.brassShade})`;

function Candle({ tall = false }: { tall?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 56 }}>
      <div
        style={{
          width: 22,
          height: 36,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          background: `linear-gradient(0deg, ${C.flameEdge}, ${C.flame})`,
          boxShadow: "0 0 30px 12px rgba(255,194,73,0.4)",
        }}
      />
      <div style={{ width: 4, height: 10, background: C.muted }} />
      <div style={{ width: 20, height: tall ? 130 : 100, background: tall ? C.shamash : C.candle }} />
      <div style={{ width: 40, height: 16, background: metal, borderRadius: "0 0 12px 12px" }} />
      {tall && <div style={{ width: 12, height: 30, background: metal }} />}
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
          background: C.night,
          color: C.ink,
          borderBottom: `10px solid ${C.brassShade}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 520 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Mobile Menorah</div>
          <div style={{ fontSize: 36, marginTop: 24, color: C.muted, lineHeight: 1.3 }}>
            Light a virtual Hanukkah menorah on any device
          </div>
          <div style={{ fontSize: 28, marginTop: 32, color: C.brass }}>mobilemenorah.com</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            {[0, 1, 2, 3].map((i) => (
              <Candle key={`l${i}`} />
            ))}
            <Candle tall />
            {[0, 1, 2, 3].map((i) => (
              <Candle key={`r${i}`} />
            ))}
          </div>
          <div style={{ width: 500, height: 14, background: metal, borderRadius: 7 }} />
          <div style={{ width: 20, height: 90, background: metal }} />
          <div style={{ width: 240, height: 24, background: metal, borderRadius: "20px 20px 8px 8px" }} />
        </div>
      </div>
    ),
    size
  );
}
