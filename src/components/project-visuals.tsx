"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Check, Loader, Terminal } from "./icons";

function useTicker(length: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % length), ms);
    return () => clearInterval(id);
  }, [inView, reduce, length, ms]);
  // Reduced motion shows the finished run instead of a frozen first frame.
  return { ref, i: reduce ? length - 1 : i };
}

// ---- GoodieBag: a BDD run across the three core flows ------------------------

const FEATURES = [
  {
    name: "User registration",
    steps: [
      "Given a new visitor on the sign-up page",
      "When they register with valid details",
      "Then their account is created",
    ],
  },
  {
    name: "Offer management",
    steps: ["Given an admin creates a new offer", "When the offer is published", "Then members can see it"],
  },
  {
    name: "Reward redemption",
    steps: ["Given a member with enough points", "When they redeem a reward", "Then their points are deducted"],
  },
];
const STEP_COUNT = FEATURES.reduce((n, f) => n + f.steps.length, 0);
const BROWSERS = ["chromium", "firefox", "webkit"];

export function TestRunVisual() {
  // One extra tick holds the all-green state before the run restarts.
  const { ref, i } = useTicker(STEP_COUNT + 2, 900);
  const done = Math.min(i, STEP_COUNT);
  const finished = done === STEP_COUNT;
  // The feature holding the next step to run (the last one once everything has passed).
  let fi = 0;
  let offset = 0;
  while (fi < FEATURES.length - 1 && done >= offset + FEATURES[fi].steps.length) {
    offset += FEATURES[fi].steps.length;
    fi += 1;
  }
  const feature = FEATURES[fi];
  const passedFeatures = finished ? FEATURES.length : fi;

  return (
    <div ref={ref} className="relative flex h-full min-h-[340px] items-center justify-center p-6 sm:p-8">
      <div className="w-full max-w-sm overflow-hidden rounded-xl border border-line bg-bg shadow-card">
        <div className="flex items-center justify-between border-b border-line px-3.5 py-2.5 font-mono text-[11px] text-subtle">
          <span className="flex items-center gap-1.5">
            <Terminal size={13} /> npx cucumber-js
          </span>
          <span className="flex gap-1">
            {BROWSERS.map((b) => (
              <span key={b} className="rounded bg-surface-2 px-1.5 py-0.5">
                {b}
              </span>
            ))}
          </span>
        </div>

        <div className="p-4 font-mono text-[12px] leading-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <p>
                <span className="text-accent-3">Feature:</span> <span className="text-fg">{feature.name}</span>
              </p>
              <ul className="mt-1">
                {feature.steps.map((step, k) => {
                  const n = offset + k;
                  const state = n < done ? "pass" : n === done && !finished ? "run" : "todo";
                  const [keyword, ...rest] = step.split(" ");
                  return (
                    <li key={step} className="flex items-center gap-2">
                      <span className="grid size-4 shrink-0 place-items-center">
                        {state === "pass" ? (
                          <Check size={13} className="text-success" />
                        ) : state === "run" ? (
                          <Loader size={12} className="animate-spin text-accent" />
                        ) : (
                          <span className="size-1 rounded-full bg-line-strong" />
                        )}
                      </span>
                      <span className={`truncate ${state === "todo" ? "text-subtle" : "text-muted"}`}>
                        <span className="text-accent-2">{keyword}</span> {rest.join(" ")}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="border-t border-line px-4 py-3">
          <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-subtle">
            <span>
              {finished ? (
                <span className="text-success">All scenarios passed</span>
              ) : (
                <>
                  Running → <span className="text-fg">{feature.name}</span>
                </>
              )}
            </span>
            <span className="tabular-nums">
              {passedFeatures}/{FEATURES.length} passed
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
            <motion.div
              className={`h-full rounded-full ${finished ? "bg-success" : "bg-gradient-to-r from-accent via-accent-2 to-accent-3"}`}
              animate={{ width: `${(done / STEP_COUNT) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- AxaPDF: Playwright as a gate in the Jenkins pipeline ---------------------

const STAGES = [
  { name: "Checkout", log: ["$ git checkout main"] },
  { name: "Install", log: ["$ npm ci"] },
  { name: "E2E tests", log: ["$ npx playwright test", "✓ upload a PDF", "✓ translate the document", "✓ download the result"] },
  { name: "Report", log: ["$ publish playwright-report"] },
  { name: "Deploy", log: ["✓ quality gate passed", "→ deploying"] },
];

export function PipelineVisual() {
  const { ref, i } = useTicker(STAGES.length + 1, 1600);
  const active = Math.min(i, STAGES.length);
  const finished = active === STAGES.length;
  const stage = STAGES[Math.min(active, STAGES.length - 1)];

  return (
    <div ref={ref} className="relative flex h-full min-h-[340px] flex-col justify-center gap-5 p-6 sm:p-8">
      {/* Stage view */}
      <div className="mx-auto w-full max-w-md rounded-xl border border-line bg-bg/80 p-4 shadow-card backdrop-blur">
        <div className="mb-4 flex items-center justify-between font-mono text-[11px] text-subtle">
          <span>Jenkins · axapdf-e2e</span>
          <span className={finished ? "text-success" : "text-accent"}>{finished ? "SUCCESS" : "RUNNING"}</span>
        </div>
        <ol className="flex items-center">
          {STAGES.map((s, k) => {
            const state = k < active ? "done" : k === active ? "run" : "todo";
            return (
              <li key={s.name} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={`grid size-7 place-items-center rounded-full border transition-colors duration-300 ${
                      state === "done"
                        ? "border-success/50 bg-success/15 text-success"
                        : state === "run"
                          ? "border-accent/60 bg-accent/15 text-accent shadow-[0_0_20px_-4px_var(--accent)]"
                          : "border-line-strong text-subtle"
                    }`}
                  >
                    {state === "done" ? (
                      <Check size={13} />
                    ) : state === "run" ? (
                      <Loader size={12} className="animate-spin" />
                    ) : (
                      <span className="size-1 rounded-full bg-current" />
                    )}
                  </span>
                  <span className={`text-[10px] whitespace-nowrap ${state === "todo" ? "text-subtle" : "text-muted"}`}>
                    {s.name}
                  </span>
                </div>
                {k < STAGES.length - 1 && (
                  <div className="mx-1 mb-5 h-px flex-1 overflow-hidden bg-line-strong">
                    <motion.div
                      className="h-full bg-success"
                      animate={{ width: k < active ? "100%" : "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Console */}
      <div className="mx-auto w-full max-w-md rounded-xl border border-line bg-bg p-4 font-mono text-[12px] leading-6 shadow-card">
        <p className="mb-1 text-[10px] tracking-widest text-subtle uppercase">Console · {stage.name}</p>
        <AnimatePresence mode="wait">
          <motion.ul
            key={stage.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="min-h-[96px]"
          >
            {stage.log.map((line, k) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: k * 0.18 }}
                className={line.startsWith("✓") ? "text-success" : line.startsWith("→") ? "text-accent" : "text-muted"}
              >
                {line}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
