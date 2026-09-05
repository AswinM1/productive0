"use client";

import { useEffect, useState } from "react";

const features = [
  {
    title: "Starts the moment you start typing",
    description:
      "Flowline detects active coding automatically and pauses itself when you stop — no start button, no forgetting to stop.",
    type: "timer",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "days running",
    description: "Hit your daily minimum and keep the chain alive.",
    type: "streak",
    span: "",
  },
  {
    title: "Your best hours",
    description: "See exactly when your focus peaks across the week.",
    type: "insights",
    span: "",
  },
  {
    title: "Leaderboard",
    description: "",
    type: "leaderboard",
    span: "md:row-span-2",
  },
  {
    title: "A year of commits, visualized daily",
    description:
      "Every square is a day of tracked work. No manual logging, ever.",
    type: "heatmap",
    span: "md:col-span-2",
  },
];

export default function Page() {
  const [seconds, setSeconds] = useState(10038);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value: number) => {
    const h = String(Math.floor(value / 3600)).padStart(2, "0");
    const m = String(Math.floor((value % 3600) / 60)).padStart(2, "0");
    const s = String(value % 60).padStart(2, "0");

    return `${h}:${m}:${s}`;
  };

  return (
    <main className="min-h-screen bg-[#13121A] text-[#EDEAE2]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#2D2C3A] bg-[#13121A]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-[18px] md:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2 font-mono text-base font-semibold">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#F2A65A]" />
            flowline
          </div>

          {/* Links */}
          <nav className="hidden gap-8 text-sm text-[#9C99AC] md:flex">
            <a
              href="#features"
              className="transition hover:text-[#EDEAE2]"
            >
              features
            </a>

            <a
              href="#leaderboard"
              className="transition hover:text-[#EDEAE2]"
            >
              leaderboard
            </a>

            <a
              href="#how"
              className="transition hover:text-[#EDEAE2]"
            >
              how it works
            </a>
          </nav>

          <a
            href="#install"
            className="rounded bg-[#F2A65A] px-4 py-2 font-mono text-[13px] font-semibold text-[#1A1409]"
          >
            Install
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-6 md:px-8">
        {/* HERO */}
        <section className="grid items-center gap-14 py-16 md:py-[88px] lg:grid-cols-2">
          {/* Hero text */}
          <div>
            <div className="mb-5 font-mono text-[13px] text-[#F2A65A]">
              for developers who forget to stop coding
            </div>

            <h1 className="max-w-[11ch] font-mono text-4xl font-semibold leading-[1.15] tracking-tight md:text-[44px]">
              Time your work without leaving the editor
            </h1>

            <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-[#9C99AC]">
              Flowline sits in the VS Code status bar, times every session
              automatically, and turns your hours into streaks you don't want
              to break — and a leaderboard your team can't stop checking.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#install"
                className="rounded bg-[#F2A65A] px-[22px] py-[13px] text-sm font-semibold text-[#1A1409] transition hover:opacity-90"
              >
                Install the extension
              </a>

              <a
                href="#how"
                className="rounded border border-[#2D2C3A] px-[22px] py-[13px] font-mono text-sm transition hover:border-[#F2A65A]"
              >
                See how it works
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-6 font-mono text-xs text-[#9C99AC]">
              <span>free for individuals</span>
              <span>works offline</span>
              <span>zero config</span>
            </div>
          </div>

          {/* EDITOR MOCKUP */}
          <EditorMockup time={formatTime(seconds)} />
        </section>

        {/* FEATURES */}
        <section id="features" className="py-[72px]">
          <div className="mb-10 max-w-[56ch]">
            <h2 className="font-mono text-[28px] font-semibold">
              Everything runs where you already work
            </h2>

            <p className="mt-3 text-[15.5px] text-[#9C99AC]">
              No dashboards to remember, no manual clock-in. Flowline watches
              editor activity and stays out of your way until you want to look.
            </p>
          </div>

          <div className="grid auto-rows-[minmax(150px,auto)] gap-4 md:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.type}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="py-[72px]">
          <div className="mb-10 max-w-[56ch]">
            <h2 className="font-mono text-[28px] font-semibold">
              Set up once, forget it exists
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Step
              number="01"
              title="Install from the marketplace"
              description='Search "Flowline" in the VS Code extensions panel, or run the install command below.'
            />

            <Step
              number="02"
              title="Keep coding as normal"
              description="Flowline reads editor activity in the background. There's nothing to click to begin a session."
            />

            <Step
              number="03"
              title="Check your streak and rank"
              description="Open the dashboard anytime to see your hours, streak, and where you sit on the team leaderboard."
            />
          </div>
        </section>

        {/* CTA */}
        <section id="install" className="py-[72px]">
          <div className="rounded-xl border border-[#2D2C3A] bg-[#1C1B26] p-8 text-center md:p-14">
            <h2 className="font-mono text-2xl font-semibold md:text-[26px]">
              Your editor already knows how long you've been at this
            </h2>

            <p className="mb-7 mt-3 text-[#9C99AC]">
              Flowline just makes it visible.
            </p>

            <div className="inline-flex items-center gap-3 rounded-md border border-[#2D2C3A] bg-[#13121A] px-[18px] py-3 font-mono text-sm text-[#7FD99A]">
              <span className="text-[#9C99AC]">ext install</span>
              flowline.tracker
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-[#2D2C3A] px-8 py-8">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#9C99AC]">
          <span>flowline</span>
          <span>built for VS Code</span>
          <span>© 2026</span>
        </div>
      </footer>
    </main>
  );
}

/* ---------------- EDITOR ---------------- */

function EditorMockup({ time }: { time: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#2D2C3A] bg-[#1C1B26] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
      {/* title bar */}
      <div className="flex gap-[7px] border-b border-[#2D2C3A] bg-[#201F2C] px-3.5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3A3948]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3A3948]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3A3948]" />
      </div>

      {/* tabs */}
      <div className="flex border-b border-[#2D2C3A] font-mono text-xs text-[#9C99AC]">
        <div className="border-r border-[#2D2C3A] border-b-2 border-b-[#F2A65A] bg-[#1C1B26] px-4 py-2.5 text-[#EDEAE2]">
          session.ts
        </div>

        <div className="border-r border-[#2D2C3A] px-4 py-2.5">
          streak.ts
        </div>
      </div>

      {/* code */}
      <div className="grid grid-cols-[34px_1fr] px-0 py-[18px] font-mono text-[13px]">
        <div className="select-none pr-3 text-right text-[#4A4959]">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <div key={n} className="py-[2px]">
              {n}
            </div>
          ))}
        </div>

        <div className="overflow-hidden">
          <CodeLine>
            <span className="text-[#F2A65A]">import</span>{" "}
            {"{ track }"}{" "}
            <span className="text-[#F2A65A]">from</span>{" "}
            <span className="text-[#E3B8E8]">'flowline'</span>
          </CodeLine>

          <CodeLine />

          <CodeLine>
            <span className="text-[#F2A65A]">export function</span>{" "}
            <span className="text-[#7FD99A]">startFocus</span>()
          </CodeLine>

          <CodeLine>
            &nbsp;&nbsp;track.begin(
            <span className="text-[#E3B8E8]">'deep-work'</span>)
          </CodeLine>

          <CodeLine>
            &nbsp;&nbsp;
            <span className="text-[#F2A65A]">return</span> track.session
            <span className="ml-0.5 inline-block h-3.5 w-[7px] animate-pulse bg-[#F2A65A] align-middle" />
          </CodeLine>

          <CodeLine>{"}"}</CodeLine>

          <CodeLine />
        </div>
      </div>

      {/* status */}
      <div className="flex items-center justify-between bg-[#F2A65A] px-3.5 py-2 font-mono text-xs font-semibold text-[#1A1409]">
        <div className="flex gap-4">
          <span>⏱ {time}</span>
          <span>🔥 12 day streak</span>
        </div>

        <span>#3 on team</span>
      </div>
    </div>
  );
}

function CodeLine({ children }: { children?: React.ReactNode }) {
  return <div className="whitespace-pre py-[2px]">{children}</div>;
}

/* ---------------- FEATURE CARD ---------------- */

function FeatureCard({
  feature,
  index,
}: {
  feature: {
    title: string;
    description: string;
    type: string;
    span: string;
  };
  index: number;
}) {
  return (
    <div
      id={feature.type === "leaderboard" ? "leaderboard" : undefined}
      className={`relative flex min-h-[150px] flex-col justify-end rounded-lg border border-[#2D2C3A] bg-[#1C1B26] p-[26px] transition hover:border-[#3E3D50] ${feature.span}`}
    >
      <span className="absolute left-[26px] top-5 font-mono text-[11.5px] text-[#9C99AC]">
        {feature.type.replace("-", " ")}
      </span>

      {feature.type === "timer" && (
        <>
          <div className="mb-4 font-mono text-[52px] font-bold leading-none text-[#F2A65A]">
            2:47:18
          </div>

          <h3 className="mb-2 font-mono text-[17px] font-semibold">
            {feature.title}
          </h3>

          <p className="text-sm text-[#9C99AC]">
            {feature.description}
          </p>
        </>
      )}

      {feature.type === "streak" && (
        <>
          <div className="absolute left-[26px] top-6 flex gap-[5px]">
            {[1, 1, 1, 1, 1, 0, 0].map((filled, i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rounded-sm ${
                  filled ? "bg-[#7FD99A]" : "bg-[#2D2C3A]"
                }`}
              />
            ))}
          </div>

          <div className="mb-2 font-mono text-[40px] font-bold text-[#7FD99A]">
            12
          </div>

          <h3 className="mb-2 font-mono text-[17px] font-semibold">
            days running
          </h3>

          <p className="text-sm text-[#9C99AC]">
            {feature.description}
          </p>
        </>
      )}

      {feature.type === "insights" && (
        <>
          <h3 className="mb-2 font-mono text-[17px] font-semibold">
            {feature.title}
          </h3>

          <p className="text-sm text-[#9C99AC]">
            {feature.description}
          </p>
        </>
      )}

      {feature.type === "leaderboard" && (
        <div className="mt-7">
          {[
            ["01", "priya.dev", "38.2h"],
            ["02", "marcus_j", "34.9h"],
            ["03", "you", "31.4h"],
            ["04", "kenji.t", "28.7h"],
            ["05", "ana_ruiz", "25.1h"],
          ].map(([rank, name, hours]) => (
            <div
              key={rank}
              className="flex items-center border-b border-[#2D2C3A] py-2 font-mono text-[13.5px] last:border-0"
            >
              <span className="w-5 text-[#9C99AC]">{rank}</span>

              <span
                className={`flex-1 ml-2 ${
                  name === "you" ? "text-[#7FD99A]" : ""
                }`}
              >
                {name}
              </span>

              <span className="text-[#F2A65A]">{hours}</span>
            </div>
          ))}
        </div>
      )}

      {feature.type === "heatmap" && (
        <>
          <h3 className="mb-2 font-mono text-[17px] font-semibold">
            {feature.title}
          </h3>

          <p className="text-sm text-[#9C99AC]">
            {feature.description}
          </p>

          <Heatmap />
        </>
      )}
    </div>
  );
}

/* ---------------- HEATMAP ---------------- */

function Heatmap() {
  const cells = Array.from({ length: 48 }, (_, i) => {
    const values = [0, 1, 2, 3, 1, 0, 2, 3, 1, 0];
    return values[i % values.length];
  });

  return (
    <div className="mt-4 grid max-w-[420px] grid-cols-12 gap-[3px] md:grid-cols-24">
      {cells.map((level, index) => (
        <div
          key={index}
          className={`aspect-square rounded-[2px] ${
            level === 0
              ? "bg-[#2D2C3A]"
              : level === 1
                ? "bg-[#6B5A45]"
                : level === 2
                  ? "bg-[#B98247]"
                  : "bg-[#F2A65A]"
          }`}
        />
      ))}
    </div>
  );
}

/* ---------------- STEPS ---------------- */

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-t border-[#2D2C3A] pt-[18px]">
      <div className="mb-2.5 font-mono text-[13px] text-[#F2A65A]">
        {number}
      </div>

      <h4 className="mb-2 font-mono text-base font-semibold">
        {title}
      </h4>

      <p className="text-[14.5px] text-[#9C99AC]">
        {description}
      </p>
    </div>
  );
}