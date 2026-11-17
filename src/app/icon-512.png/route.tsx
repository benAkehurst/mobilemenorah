import { ImageResponse } from "next/og";
import MenorahMark from "@/components/MenorahMark";

// 512px maskable icon for the web app manifest. The mark sits inside the
// central safe zone (80%) so Android's mask shapes don't clip it.

// Route Handlers run on every request by default; this one never changes,
// so render it once at build time.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#080f1c",
        }}
      >
        <MenorahMark size={400} />
      </div>
    ),
    { width: 512, height: 512 }
  );
}
