"use client";

import { useRef, useState, type MouseEvent } from "react";
import Draggable, { type DraggableData, type DraggableEvent } from "react-draggable";
import { useToday } from "@/hooks/useToday";
import { getHanukkahStatus, ordinal } from "@/lib/hanukkah";

// Full class names are listed literally so Tailwind can find them at build time.
const CANDLE_COLOURS = [
  { id: "red", label: "Red", className: "bg-red-500" },
  { id: "blue", label: "Blue", className: "bg-blue-500" },
  { id: "white", label: "White", className: "bg-slate-50 ring-1 ring-inset ring-slate-300" },
  { id: "green", label: "Green", className: "bg-green-500" },
  { id: "yellow", label: "Yellow", className: "bg-yellow-400" },
  { id: "purple", label: "Purple", className: "bg-purple-500" },
  { id: "orange", label: "Orange", className: "bg-orange-500" },
] as const;

type ColourId = (typeof CANDLE_COLOURS)[number]["id"];

const NIGHTS = [1, 2, 3, 4, 5, 6, 7, 8];
/** Holder positions left to right; the shamash sits in the middle. */
const LEFT_SLOTS = [0, 1, 2, 3];
const RIGHT_SLOTS = [4, 5, 6, 7];
/** Extra hit area (px) around a wick, so lighting is easy on touch screens. */
const WICK_PADDING = 14;

function Flame({ lit }: { lit: boolean }) {
  return (
    <span className="flex h-7 items-end justify-center sm:h-9" aria-hidden="true">
      {lit && (
        <span className="block h-5 w-3 origin-bottom rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-50 shadow-[0_0_18px_6px_rgba(251,191,36,0.5)] motion-safe:animate-flicker sm:h-7 sm:w-4" />
      )}
    </span>
  );
}

function Cup() {
  return (
    <span
      className="block h-3 w-6 rounded-b-lg bg-gradient-to-b from-amber-300 to-amber-600 shadow-sm sm:h-4 sm:w-8"
      aria-hidden="true"
    />
  );
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
    message = `All ${night} ${night === 1 ? "candle is" : "candles are"} lit. Chag sameach – happy Hanukkah!`;
  else if (!shamashLit) message = "Tap the shamash (the raised middle candle) to light it.";
  else
    message =
      "Now drag the shamash's flame over each wick, or tap the candles. Start with the newest candle on the left.";

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
            className="group flex flex-col items-center rounded-md px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Flame lit={isLit} />
            <span data-wick={slot} className="block h-2 w-0.5 bg-slate-300" aria-hidden="true" />
            <span
              className={`block h-12 w-3 rounded-t-sm sm:h-20 sm:w-4 ${candleClass}`}
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

      <div
        id="menorah-stage"
        ref={stageRef}
        className="relative mx-auto w-full max-w-xl select-none overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 px-2 pb-6 pt-8 shadow-xl sm:px-6"
      >
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
                  dragging ? "cursor-grabbing" : "cursor-grab transition-transform duration-300"
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
                  className="flex flex-col items-center rounded-md px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  <span ref={shamashFlameRef}>
                    <Flame lit={shamashLit} />
                  </span>
                  <span className="block h-2 w-0.5 bg-slate-300" aria-hidden="true" />
                  <span
                    className="block h-14 w-3.5 rounded-t-sm bg-gradient-to-b from-amber-100 to-amber-200 sm:h-24 sm:w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </Draggable>
            <Cup />
            {/* Riser that lifts the shamash above the other candles. */}
            <span
              className="block h-6 w-2 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 sm:h-8 sm:w-3"
              aria-hidden="true"
            />
          </div>

          {RIGHT_SLOTS.map(renderCandleSlot)}
        </div>

        {/* Branch bar, stem and base */}
        <div className="h-2.5 rounded-full bg-gradient-to-b from-amber-300 to-amber-600 shadow" aria-hidden="true" />
        <div className="mx-auto h-14 w-3 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 sm:h-20 sm:w-4" aria-hidden="true" />
        <div className="mx-auto h-4 w-36 rounded-b-md rounded-t-2xl bg-gradient-to-b from-amber-300 to-amber-700 shadow-md sm:w-52" aria-hidden="true" />
      </div>

      <p className="mx-auto mt-4 min-h-12 max-w-xl text-center text-base text-slate-700" aria-live="polite">
        {message}
      </p>

      <div className="mx-auto mt-2 flex max-w-xl flex-col gap-5">
        <fieldset>
          <legend className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-slate-600 w-full">
            Night
          </legend>
          <div className="flex flex-wrap justify-center gap-2">
            {NIGHTS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => chooseNight(n)}
                aria-pressed={n === night}
                className={`relative h-10 w-10 rounded-full text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  n === night
                    ? "bg-blue-700 text-white"
                    : "bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50"
                }`}
              >
                {n}
                {n === tonight && (
                  <>
                    <span className="absolute -top-1 right-0 h-2.5 w-2.5 rounded-full bg-amber-400 ring-2 ring-white" aria-hidden="true" />
                    <span className="sr-only"> (tonight)</span>
                  </>
                )}
              </button>
            ))}
          </div>
          <p className="mt-2 text-center text-sm text-slate-500">
            Showing the {ordinal(night)} night{tonight === night ? " (tonight)" : ""}.
          </p>
        </fieldset>

        <fieldset>
          <legend className="mb-2 w-full text-center text-sm font-semibold uppercase tracking-wide text-slate-600">
            Candle colour
          </legend>
          <div className="flex flex-wrap justify-center gap-3">
            {CANDLE_COLOURS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColour(c.id)}
                aria-pressed={colour === c.id}
                aria-label={c.label}
                title={c.label}
                className={`h-9 w-9 rounded-full ${c.className} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  colour === c.id ? "ring-4 ring-blue-700 ring-offset-2" : ""
                }`}
              />
            ))}
          </div>
        </fieldset>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={resetCandles}
            className="rounded-full px-5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Blow out the candles
          </button>
        </div>
      </div>
    </section>
  );
}
