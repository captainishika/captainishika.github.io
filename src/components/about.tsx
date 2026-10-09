"use client";

import { useSyncExternalStore } from "react";
import { education, experience, profile } from "@/data/profile";
import { Briefcase, Bug, GraduationCap, MapPin, ShieldCheck } from "./icons";
import { Reveal, SectionHeading, Serif, SpotlightCard, StatusDot } from "./ui";

const subscribeClock = (tick: () => void) => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
};

function LocalTime() {
  // Whole seconds keep the snapshot stable between ticks; null on the server avoids hydration drift.
  const seconds = useSyncExternalStore(subscribeClock, () => Math.floor(Date.now() / 1000), () => null);
  const now = seconds === null ? null : new Date(seconds * 1000);

  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    now ? new Intl.DateTimeFormat("en-IN", { timeZone: profile.timezone, ...opts }).format(now) : "--:--";
  const hour = now ? Number(fmt({ hour: "numeric", hourCycle: "h23" })) : 12;
  const awake = hour >= 8 && hour < 24;

  return (
    <div>
      <p className="font-mono text-4xl font-medium tracking-tight tabular-nums">
        {fmt({ hour: "2-digit", minute: "2-digit", hourCycle: "h23" })}
        <span className="ml-1 animate-blink text-accent">:</span>
        <span className="text-2xl text-subtle">{now ? fmt({ second: "2-digit" }).padStart(2, "0") : "--"}</span>
      </p>
      <p className="mt-1 flex items-center gap-2 text-sm text-subtle">
        <StatusDot tone={awake ? "success" : "muted"} />
        IST (UTC+5:30) · {awake ? "probably online" : "probably asleep"}
      </p>
    </div>
  );
}

function OrbitGlobe() {
  return (
    <div aria-hidden className="pointer-events-none absolute -right-10 -bottom-16 size-56 opacity-70">
      <div className="absolute inset-0 rounded-full border border-line" />
      <div className="absolute inset-6 rounded-full border border-line" />
      <div className="absolute inset-12 rounded-full border border-dashed border-line-strong" />
      <div className="absolute inset-0 animate-[spin_24s_linear_infinite]">
        <span className="absolute top-1/2 -left-1 size-2 rounded-full bg-accent shadow-[0_0_20px_4px_var(--accent)]" />
      </div>
      <div className="absolute inset-6 animate-[spin_16s_linear_infinite_reverse]">
        <span className="absolute -top-1 left-1/2 size-1.5 rounded-full bg-accent-2 shadow-[0_0_16px_3px_var(--accent-2)]" />
      </div>
    </div>
  );
}

export function About() {
  const current = experience.find((e) => e.current);

  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        index="01"
        eyebrow="About"
        title={
          <>
            Quality is a <Serif gradient>habit</Serif>, not a phase.
          </>
        }
      />

      <div className="grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-6">
        <Reveal className="md:col-span-4 md:row-span-2">
          <SpotlightCard className="h-full p-7 md:p-9">
            <div className="space-y-5 text-lg leading-relaxed text-pretty text-muted">
              {profile.about.map((p, i) => (
                <p key={i} className={i === 0 ? "text-xl text-fg md:text-2xl md:leading-snug" : ""}>
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Automation-first", "BDD / TDD", "Data integrity", "Continuous testing", "Agile"].map((t) => (
                <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-subtle">
                  {t}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        {current && (
          <Reveal delay={0.08} className="md:col-span-2">
            <SpotlightCard className="flex h-full flex-col justify-between p-6">
              <div className="flex items-center justify-between text-subtle">
                <span className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
                  <Briefcase size={14} /> Currently
                </span>
                <StatusDot />
              </div>
              <div className="mt-6">
                <p className="text-xl font-semibold tracking-tight">{current.role}</p>
                <p className="mt-1 text-muted">{current.company}</p>
                <p className="mt-3 font-mono text-xs text-subtle">
                  {current.start} — {current.end}
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        )}

        <Reveal delay={0.14} className="md:col-span-2">
          <SpotlightCard className="relative flex h-full flex-col justify-between overflow-hidden p-6">
            <OrbitGlobe />
            <span className="flex items-center gap-2 font-mono text-xs tracking-widest text-subtle uppercase">
              <MapPin size={14} /> {profile.location}
            </span>
            <div className="relative mt-6">
              <LocalTime />
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-2">
          <SpotlightCard className="flex h-full flex-col justify-between p-6">
            <span className="flex items-center gap-2 font-mono text-xs tracking-widest text-subtle uppercase">
              <ShieldCheck size={14} /> Release quality
            </span>
            <div className="mt-6">
              <p className="text-5xl font-semibold tracking-tight">
                0<span className="ml-2 text-base font-normal text-muted">critical bugs</span>
              </p>
              <p className="mt-2 text-sm text-subtle">
                Across 15 sprint releases at XORLABS, with end-to-end automation in the loop.
              </p>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-2">
          <SpotlightCard className="flex h-full flex-col justify-between p-6">
            <span className="flex items-center gap-2 font-mono text-xs tracking-widest text-subtle uppercase">
              <Bug size={14} /> Defect leakage
            </span>
            <div className="mt-6">
              <p className="text-5xl font-semibold tracking-tight">
                &lt;5%<span className="ml-2 text-base font-normal text-muted">leaked</span>
              </p>
              <p className="mt-2 text-sm text-subtle">
                Across 10+ releases of enterprise apps serving 10,000+ users.
              </p>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-2">
          <SpotlightCard className="flex h-full flex-col p-6">
            <span className="flex items-center gap-2 font-mono text-xs tracking-widest text-subtle uppercase">
              <GraduationCap size={14} /> Education
            </span>
            <ul className="mt-5 space-y-4">
              {education
                .filter((e) => e.school !== "CBSE")
                .map((e) => (
                  <li key={e.degree}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-semibold tracking-tight">{e.degree}</p>
                      <span className="font-mono text-xs text-subtle">{e.year}</span>
                    </div>
                    <p className="text-sm text-muted">{e.school}</p>
                  </li>
                ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
