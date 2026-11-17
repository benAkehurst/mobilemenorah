/**
 * The Mobile Menorah mark: a nine-branch hanukkiah (eight candles plus a raised
 * shamash), all lit. Plain SVG shapes only, so it also renders inside
 * next/og ImageResponse for icons and social cards.
 *
 * Colours are passed in rather than read from CSS variables so the same
 * component works in the browser and in generated PNGs. They are the hex
 * equivalents of the design tokens (Satori and favicon renderers don't
 * support oklch):
 *   night = --color-night, brass = --color-brass, flame = --color-flame
 */
export const MARK_COLOURS = {
  night: "#080f1c",
  brass: "#d9a850",
  flame: "#ffc249",
};

const CANDLE_X = [7, 11, 15, 19, 29, 33, 37, 41];

export default function MenorahMark({
  size = 32,
  tile = false,
  brass = MARK_COLOURS.brass,
  flame = MARK_COLOURS.flame,
  night = MARK_COLOURS.night,
  title,
}: {
  size?: number;
  /** Draw the night-sky rounded tile behind the menorah (app icons). */
  tile?: boolean;
  brass?: string;
  flame?: string;
  night?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      {tile && <rect width="48" height="48" rx="11" fill={night} />}
      {/* Base, stem and branch bar */}
      <rect x="16" y="39" width="16" height="3" rx="1.5" fill={brass} />
      <rect x="22.75" y="27" width="2.5" height="13" fill={brass} />
      <rect x="5" y="26" width="38" height="2.5" rx="1.25" fill={brass} />
      {/* Eight candles */}
      {CANDLE_X.map((x) => (
        <g key={x}>
          <rect x={x - 1.1} y="18.5" width="2.2" height="7.5" fill={brass} />
          <ellipse cx={x} cy="15.6" rx="1.25" ry="2" fill={flame} />
        </g>
      ))}
      {/* Raised shamash */}
      <rect x="22.8" y="11" width="2.4" height="15" fill={brass} />
      <ellipse cx="24" cy="7.6" rx="1.5" ry="2.4" fill={flame} />
    </svg>
  );
}
