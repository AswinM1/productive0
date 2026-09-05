"use client";

import { useEffect, useState } from "react";

const features = [
  {
    title: "Build your own Timer counter",
    description:
      "Choose your desired time goal to chase and achieve it",
    type: "timer",
    span: "md:col-span-2 md:row-span-2 ",
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
    span: " col-span-2 md:row-span-2",
  },
  {
    title:"Heatmaps to visualize your progress",
    description:
      "Every square is a day of tracked work. ",
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
    <main className="min-h-screen bg-[#f5f5f7]   text-[#EDEAE2]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b  backdrop-blur-md">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-[18px] md:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2 font-sans text-base text-[#41465d] cursor-pointer font-semibold">
            <span className="h-2 w-2 text-[#41465d] animate-pulse rounded-full " />
             flowstate
          </div>

          {/* Links */}
          <nav className="hidden gap-8 text-sm text-[#232323] md:flex">
            <a
              href="#features"
              className="transition hover:text-neutral-700 font-medium"
            >
              features
            </a>

            <a
              href="#leaderboard"
              className="transition hover:text-neutral-700 font-medium"
            >
              leaderboard
            </a>

            <a
              href="#how"
              className="transition hover:text-neutral-700 font-medium"
            >
              how it works
            </a>
          </nav>

          <a
            href="/dashboard"
            className="rounded  px-4 py-2 font-sans text-[13px]  bg-[#232323] font-semibold text-white"
          >
            Sign in
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-6 md:px-8">
        {/* HERO */}
      <section
  className="flex min-h-[600px] flex-col items-center justify-center border py-10 text-center md:py-[88px]"
>
  <div className="flex flex-col items-center">
    <div className="mb-5 w-fit rounded-md bg-neutral-400  px-3 py-1 font-sans text-[13px] text-[#222222]">
      The All in one productivity web
    </div>

    <h1 className="max-w-4xl font-sans text-4xl font-semibold leading-[1.15] text-balance tracking-tight text-[#222222] md:text-[52px]">
      The web productivity package you were searching for
    </h1>

    <p className="mt-6 max-w-[600px] text-[17px] leading-relaxed text-[#353535]">
      flowstate provides timers, leaderboard, activity tracking, streaks
      and many more for you.
    </p>

    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <a
        href="/dashboard"
        className="rounded bg-[#232323] px-6 py-2 justify-center flex items-center text-sm font-semibold text-white transition hover:opacity-90"
      >
        Get started
      </a>

      <a
        href="#how"
        className="rounded border border-[#232323] px-[22px] py-[13px] text-sm font-medium text-black transition hover:bg-[#232323] hover:text-white"
      >
        See how it works
      </a>
    </div>
  </div>
</section>

        {/* FEATURES */}
        <section id="features" className="py-[72px]">
          <div className="mb-10 max-w-[56ch]">
            <h2 className="font-sans  text-[28px] font-medium tracking-tight text-[#232323]">
              The Whole productivity package is here
            </h2>

            <p className="mt-3 text-[15.5px] text-[#9C99AC]">
             Timer,Leaderboard,Streaks,personal dashboards and many more to track your progress
            </p>
          </div>

          <div className="grid auto-rows-[minmax(150px,auto)] gap-4 md:grid-cols-4 text-[#232323]">
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
        <section id="how" className="py-[72px] text-[#232323]">
          <div className="mb-10 max-w-[56ch]">
            <h2 className="font-sans text-[28px] font-semibold tracking-tight text-balance">
              We Track your activity in where you already work
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Step
              number="01"
              title="Install from the marketplace"
              description='Search "Flowstate" in the VS Code extensions panel and install the extension'
            />

            <Step
              number="02"
              title="Keep coding as normal"
              description=" Paste your Api key and The extension reads editor activity in the background. "
            />

            <Step
              number="03"
              title="Gamifying the productivity process"
              description="Maintain streaks and compete with others to top the leaderboard"
            />
          </div>
        </section>

        
        <section id="install" className="py-[72px]">
          <div className="rounded-xl border border-[#2D2C3A] text-[#232323] font-sans bg-[#e1dadc] p-8 text-center md:p-14">
            <p className="font-semibold">Sign up to join others and boost your productivity 100%</p>

            <button className="bg-[#232323] rounded-md py-2 px-3 text-white mt-3 cursor-pointer">sign in now</button>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-[#2D2C3A] px-8 py-8">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 font-sans text-xs text-[#9C99AC]">
          <span>flowstate</span>
          <span>built for VS Code</span>
          <span>© 2026</span>
        </div>
      </footer>
    </main>
  );
}

/* ---------------- EDITOR ---------------- */


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
      className={`relative flex min-h-[150px] flex-col justify-center stretch rounded-lg border border-[#f6f2f3] bg-[#f6f2f3] p-[26px] transition hover:border-[#3E3D50] ${feature.span}`}
    >
      <span className="absolute left-[26px] top-5 font-sans text-[11.5px] text-[white]">
        {feature.type.replace("-", " ")}
      </span>

      {feature.type === "timer" && (
        <>
        <div className="flex justify-center flex-col items-center">
          <div className="mb-4 font-sans text-[52px] justify-center font-bold leading-none text-[#2323232]">
            2:47:18
          </div>

          <h3 className="mb-2 font-sans text-[17px] font-semibold">
            {feature.title}
          </h3>

          <p className="text-sm text-[#9C99AC]">
            {feature.description}
          </p>
          </div>
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

          <div className="mb-2 font-sans text-[40px] font-bold text-[#7FD99A]">
            12
          </div>

          <h3 className="mb-2 font-sans text-[17px] font-semibold">
            days running
          </h3>

          <p className="text-sm text-[#9C99AC]">
            {feature.description}
          </p>
        </>
      )}

      {feature.type === "insights" && (
        <>
          <h3 className="mb-2 font-sans text-[17px] font-semibold">
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
              className="flex items-center border-b border-[#2D2C3A] py-2 font-sans text-[13.5px] last:border-0"
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
          <h3 className="mb-2 font-sans text-[17px] font-semibold">
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
      <div className="mb-2.5 font-sans text-[13px] text-[#F2A65A]">
        {number}
      </div>

      <h4 className="mb-2 font-sans text-base font-semibold">
        {title}
      </h4>

      <p className="text-[14.5px] text-[#9C99AC]">
        {description}
      </p>
    </div>
  );
}