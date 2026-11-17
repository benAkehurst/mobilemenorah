import { ImageResponse } from "next/og";
import MenorahMark from "@/components/MenorahMark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS adds its own rounded corners, so the tile is square here.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#080f1c" }}>
        <MenorahMark size={180} />
      </div>
    ),
    size
  );
}
