"use client";

import { useRef, useState, type MouseEvent } from "react";
import Draggable, { type DraggableData, type DraggableEvent } from "react-draggable";
import { useToday } from "@/hooks/useToday";
import { getHanukkahStatus } from "@/lib/hanukkah";

// Full class names are listed literally so Tailwind can find them at build time.
// Colours are tokens from src/app/tokens.css.
const CANDLE_COLOURS = [
  { id: "blue", label: "Blue", className: "bg-candle-blue" },
  { id: "white", label: "White", className: "bg-candle-white" },
  { id: "red", label: "Red", className: "bg-candle-red" },
  { id: "green", label: "Green", className: "bg-candle-green" },
  { id: "yellow", label: "Yellow", className: "bg-candle-yellow" },
  { id: "purple", label: "Purple", className: "bg-candle-purple" },
  { id: "orange", label: "Orange", className: "bg-candle-orange" },
] as const;

type ColourId = (typeof CANDLE_COLOURS)[number]["id"];

const NIGHTS = [1, 2, 3, 4, 5, 6, 7, 8];
/** Holder positions left to right; the shamash sits in the middle. */
const LEFT_SLOTS = [0, 1, 2, 3];
const RIGHT_SLOTS = [4, 5, 6, 7];
/** Extra hit area (px) around a wick, so lighting is easy on touch screens. */
const WICK_PADDING = 14;

const metal = "bg-gradient-to-b from-brass to-brass-shade";
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

function Flame({ lit }: { lit: boolean }) {
  return (
    <span className="flex h-7 items-end justify-center sm:h-9" aria-hidden="true">
      {lit && (
        <span className="block h-5 w-3 origin-bottom rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-flame-edge via-flame to-flame-core shadow-flame motion-safe:animate-flicker sm:h-7 sm:w-4" />
      )}
    </span>
  );
}

function Cup() {
  return <span className={`block h-3 w-6 rounded-b-lg sm:h-4 sm:w-8 ${metal}`} aria-hidden="true" />;
}

export default function MenorahExperience() {
  const today = useToday();
  const status = today ? getHanukkahStatus(today) : null;
  const tonight = status?.kind === "night" ? status.night : null;

  const [selectedNight, setSelectedNight] = useState<number | null>(null);
  const night = selectedNight ?? tonight ?? 1;

  const [colour, setColour] = useState<ColourId>("blue");
  const [lit, setLit] = useState<ReadonlySet<number>>(() => new Set());
  const [shamashLit, setShamashLit] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const shamashRef = useRef<HTMLDivElement>(null);
  const shamashFlameRef = useRef<HTMLSpanElement>(null);
  const movedRef = useRef(false);

  const candleClass = CANDLE_COLOURS.find((c) => c.id === colour)!.className;
  // Candles fill the holders from right to left: night 3 uses slots 5, 6 and 7.
  const hasCandle = (slot: number) => slot >= 8 - night;
  const litCount = [...lit].filter(hasCandle).length;
  const allLit = shamashLit && litCount === night;

  function resetCandles() {
    setLit(new Set());
    setShamashLit(false);
    setHint(null);
    setDragPosition({ x: 0, y: 0 });
  }

  function chooseNight(n: number) {
    setSelectedNight(n);
    resetCandles();
  }

  function lightShamash() {
    setShamashLit(true);
    setHint(null);
  }

  function lightCandle(slot: number) {
    if (!hasCandle(slot) || lit.has(slot)) return;
    if (!shamashLit) {
      setHint("Light the shamash first, then use it to light the candles.");
      return;
    }
    setLit((prev) => new Set(prev).add(slot));
  }

  function lightCandlesUnderShamash() {
    const flame = shamashFlameRef.current;
    const stage = stageRef.current;
    if (!flame || !stage || !shamashLit) return;
    const tip = flame.getBoundingClientRect();
    stage.querySelectorAll<HTMLElement>("[data-wick]").forEach((wick) => {
      const r = wick.getBoundingClientRect();
      if (
        tip.left < r.right + WICK_PADDING &&
        tip.right > r.left - WICK_PADDING &&
        tip.top < r.bottom + WICK_PADDING &&
        tip.bottom > r.top - WICK_PADDING
      ) {
        lightCandle(Number(wick.dataset.wick));
      }
    });
  }

  function handleDragStart() {
    movedRef.current = false;
    setDragging(true);
  }

  function handleDrag(_e: DraggableEvent, data: DraggableData) {
    if (Math.abs(data.x) + Math.abs(data.y) > 4) movedRef.current = true;
    setDragPosition({ x: data.x, y: data.y });
    lightCandlesUnderShamash();
  }

  function handleDragStop() {
    setDragging(false);
    if (!movedRef.current) {
      // A tap or click without movement lights the shamash.
      lightShamash();
    } else {
      lightCandlesUnderShamash();
    }
    // The shamash always returns to its own holder.
    setDragPosition({ x: 0, y: 0 });
  }

  function handleShamashClick(e: MouseEvent<HTMLButtonElement>) {
    // Pointer taps are handled in handleDragStop. `detail === 0` means the
    // click came from the keyboard (Enter or Space).
    if (e.detail === 0) lightShamash();
  }

  let message: string;
  if (hint) message = hint;
  else if (allLit)
    message = `All ${night} ${night === 1 ? "candle is" : "candles are"} lit. Chag sameach!`;
  else if (!shamashLit) message = "Tap the shamash, the raised middle candle, to light it.";
  else message = "Now drag its flame over each wick, or tap the candles – newest (left) first.";

  function renderCandleSlot(slot: number) {
    const present = hasCandle(slot);
    const isLit = lit.has(slot);
    const candleNumber = 8 - slot; // Counted from the right, the order candles are added.
    return (
      <div key={slot} className="flex flex-col items-center justify-end">
        {present && (
          <button
            type="button"
            onClick={() => lightCandle(slot)}
            aria-pressed={isLit}
            aria-label={`Candle ${candleNumber}${isLit ? ", lit" : ""}`}
            className={`flex flex-col items-center rounded-md px-1 ${focusRing}`}
          >
            <Flame lit={isLit} />
            <span data-wick={slot} className="block h-2 w-0.5 bg-wick" aria-hidden="true" />
            <span
              className={`block h-12 w-3 rounded-t-sm transition-colors duration-150 ease-out sm:h-20 sm:w-4 ${candleClass}`}
              aria-hidden="true"
            />
          </button>
        )}
        <Cup />
      </div>
    );
  }

  return (
    <section aria-labelledby="menorah-heading" className="w-full">
      <h2 id="menorah-heading" className="sr-only">
        Interactive menorah
      </h2>

      <div id="menorah-stage" ref={stageRef} className="relative mx-auto w-full max-w-xl select-none pt-6">
        <div className="grid grid-cols-9 items-end gap-0.5 sm:gap-2">
          {LEFT_SLOTS.map(renderCandleSlot)}

          <div className="flex flex-col items-center justify-end">
            <Draggable
              nodeRef={shamashRef}
              bounds="#menorah-stage"
              position={dragPosition}
              onStart={handleDragStart}
              onDrag={handleDrag}
              onStop={handleDragStop}
            >
              <div
                ref={shamashRef}
                className={`relative z-20 touch-none ${
                  dragging ? "cursor-grabbing" : "cursor-grab transition-transform duration-[320ms] ease-out"
                }`}
              >
                <button
                  type="button"
                  onClick={handleShamashClick}
                  aria-pressed={shamashLit}
                  aria-label={
                    shamashLit
                      ? "Shamash, lit. Drag it over the candles to light them."
                      : "Shamash. Press to light it."
                  }
                  className={`flex flex-col items-center rounded-md px-1 ${focusRing}`}
                >
                  <span ref={shamashFlameRef}>
                    <Flame lit={shamashLit} />
                  </span>
                  <span className="block h-2 w-0.5 bg-wick" aria-hidden="true" />
                  <span className="block h-14 w-3.5 rounded-t-sm bg-shamash sm:h-24 sm:w-5" aria-hidden="true" />
                </button>
              </div>
            </Draggable>
            <Cup />
            {/* Riser that lifts the shamash above the other candles. */}
            <span className={`block h-6 w-2 sm:h-8 sm:w-3 ${metal}`} aria-hidden="true" />
          </div>

          {RIGHT_SLOTS.map(renderCandleSlot)}
        </div>

        {/* Branch bar, stem and base */}
        <div className={`h-2.5 rounded-full ${metal}`} aria-hidden="true" />
        <div className={`mx-auto h-14 w-3 sm:h-20 sm:w-4 ${metal}`} aria-hidden="true" />
        <div className={`mx-auto h-4 w-36 rounded-b-md rounded-t-2xl sm:w-52 ${metal}`} aria-hidden="true" />
      </div>

      <p className="mt-5 min-h-12 text-center text-sm text-night-muted sm:text-base" aria-live="polite">
        {message}
      </p>

      <div className="mt-4 flex flex-col gap-5 border-t border-night-rule pt-5">
        <fieldset className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <legend className="sr-only">Night of Hanukkah</legend>
          <span className="text-sm text-night-muted sm:w-16" aria-hidden="true">
            Night
          </span>
          <div className="flex flex-wrap gap-1.5">
            {NIGHTS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => chooseNight(n)}
                aria-pressed={n === night}
                className={`relative h-9 w-9 rounded-full text-sm font-semibold tabular-nums transition-colors duration-150 ease-out ${focusRing} ${
                  n === night
                    ? "bg-brass text-night"
                    : "text-night-ink ring-1 ring-inset ring-night-rule hover:bg-night-2"
                }`}
              >
                {n}
                {n === tonight && (
                  <>
                    <span
                      className="absolute -top-0.5 right-0 h-2.5 w-2.5 rounded-full bg-flame ring-2 ring-night"
                      aria-hidden="true"
                    />
                    <span className="sr-only"> (tonight)</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <fieldset className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <legend className="sr-only">Candle colour</legend>
            <span className="text-sm text-night-muted sm:w-16" aria-hidden="true">
              Colour
            </span>
            <div className="flex flex-wrap gap-2.5">
              {CANDLE_COLOURS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColour(c.id)}
                  aria-pressed={colour === c.id}
                  aria-label={c.label}
                  title={c.label}
                  className={`h-7 w-7 rounded-full ${c.className} ${focusRing} ${
                    colour === c.id ? "ring-2 ring-brass ring-offset-2 ring-offset-night" : ""
                  }`}
                />
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={resetCandles}
            className={`self-start whitespace-nowrap rounded-full px-4 py-1.5 text-sm text-night-ink ring-1 ring-inset ring-night-rule transition-colors duration-150 ease-out hover:bg-night-2 sm:self-auto ${focusRing}`}
          >
            Blow out the candles
          </button>
        </div>
      </div>
    </section>
  );
}
