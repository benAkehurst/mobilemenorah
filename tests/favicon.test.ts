import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("src/app/favicon.ico", () => {
  const ico = readFileSync(join(process.cwd(), "src", "app", "favicon.ico"));

  it("is an ICO file with 16, 32 and 48px images", () => {
    // ICONDIR header: reserved 0, type 1 (icon), image count.
    expect(ico.readUInt16LE(0)).toBe(0);
    expect(ico.readUInt16LE(2)).toBe(1);
    const count = ico.readUInt16LE(4);
    const sizes = Array.from({ length: count }, (_, i) => ico.readUInt8(6 + i * 16) || 256).sort((a, b) => a - b);
    expect(sizes).toEqual([16, 32, 48]);
  });
});
