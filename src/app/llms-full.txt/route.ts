import { buildLlmsFullTxt } from "@/lib/llms";

// Regenerate a few times a day so the dates stay current.
export const revalidate = 21600;

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
