"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    title: "Build your own timer",
    description: "Choose a time goal and stay focused until you reach it.",
    type: "timer",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    title: "days running",
    description: "Hit your daily minimum and keep the chain alive.",
    type: "streak",
    span: "",
  },
  {
    title: "Your progress tracked",
    description: "The extension tracks your progress and use the dashboard to gather your insights ",
    type: "Extension based Tracking",
    span: "",
  },
  {
    title: "Leaderboard",
    description: "",
    type: "leaderboard",
    span: "col-span-2",
  },
  {
    title: "Heatmaps to visualize your progress",
    description: "Every square is a day of tracked work.",
    type: "heatmap",
    span: "md:col-span-2",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function Page() {
  const [seconds, setSeconds] = useState(10038);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <span className="h-2 w-2 rounded-full bg-neutral-900" />
            flowstate
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-neutral-600 md:flex">
            <a
              href="#features"
              className="transition-colors hover:text-neutral-900"
            >
              Features
            </a>

            <a
              href="#leaderboard"
              className="transition-colors hover:text-neutral-900"
            >
              Leaderboard
            </a>

            <a
              href="#how"
              className="transition-colors hover:text-neutral-900"
            >
              How it works
            </a>
          </nav>

          <Link
            href="/dashboard"
            className="rounded-md bg-neutral-900 px-5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-neutral-700"
          >
            Sign in
          </Link>
        </div>
      </motion.header>

      {/* Main */}
      <div className="mx-auto max-w-[1180px] px-6 md:px-8">
        {/* Hero */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex min-h-[580px] bg-linear-to-t from-blue-300/20 flex-col items-center justify-center border-b border-neutral-200 py-20 text-center md:py-28"
        >
          <motion.div
            variants={containerVariants}
            className="flex max-w-3xl flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="mb-6 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-700"
            >
              The all-in-one productivity tracker
            </motion.div>

            <motion.h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-neutral-950 md:text-6xl">
              Track your work.
              <br />
              Build your flow.
            </motion.h1>

            <motion.p className="mt-6 max-w-xl text-[16px] leading-7 text-neutral-500">
              Flowstate combines timers, activity tracking, streaks,
              analytics, and leaderboards to help you stay productive.
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap justify-center gap-3">
              <motion.a
                href="/dashboard"
                whileTap={{ scale: 0.96 }}
                className="rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                Get started
              </motion.a>

              <motion.a
                href="https://marketplace.visualstudio.com/items?itemName=flow-state.Flowstate-dev"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.96 }}
                className="rounded-md border hover:bg-neutral-100 border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-900 transition-colors"
              >
                Install extension
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Features */}
        <section id="features" className="py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="mb-10 max-w-xl"
          >
            <motion.h2 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
              Everything you need to stay productive
            </motion.h2>

            <motion.p className="mt-3 text-[15px] leading-6 text-neutral-500">
              Timers, activity tracking, streaks, analytics, and leaderboards
              in one simple workspace.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            className="grid auto-rows-[minmax(150px,auto)] gap-3 md:grid-cols-4"
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.type}
                feature={feature}
                index={index}
                seconds={seconds}
              />
            ))}
          </motion.div>
        </section>

        {/* How it works */}
        <section id="how" className="border-t border-neutral-200 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="mb-10 max-w-xl"
          >
            <motion.h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Track your activity where you already work
            </motion.h2>

            <motion.p className="mt-3 text-[15px] leading-6 text-neutral-500">
              Connect Flowstate to VS Code and start tracking automatically.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid gap-3 md:grid-cols-3"
          >
            <Step
              number="01"
              title="Install the extension"
              description='Search "Flowstate tracker" in the VS Code extensions panel and install it.'
            />

            <Step
              number="02"
              title="Connect your account"
              description="Get your API key from the dashboard and set it using the Flowstate command."
            />

            <Step
              number="03"
              title="Start tracking"
              description="Your activity is tracked automatically and becomes available in your dashboard."
            />
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="border-t border-neutral-200"
      >
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-8">
          <span className="text-xl font-semibold tracking-tight">
            flowstate
          </span>

          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-neutral-500">
            <Link
              href="https://github.com/AswinM1/productive0"
              target="_blank"
              className="transition-colors hover:text-neutral-900"
            >
              Github
            </Link>

            <Link
              href="https://x.com/whitespaceeee"
              target="_blank"
              className="transition-colors hover:text-neutral-900"
            >
              X
            </Link>

            <Link
              href="https://marketplace.visualstudio.com/items?itemName=flow-state.Flowstate-dev"
              target="_blank"
              className="transition-colors hover:text-neutral-900"
            >
              Extension
            </Link>

            <span className="text-neutral-400">Built by Aswin</span>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}

function FeatureCard({
  feature,
  index,
  seconds,
}: {
  feature: {
    title: string;
    description: string;
    type: string;
    span: string;
  };
  index: number;
  seconds: number;
}) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const timeLabel = `${minutes}:${secs.toString().padStart(2, "0")}`;

  return (
    <motion.div
      id={feature.type === "leaderboard" ? "leaderboard" : undefined}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative flex min-h-[150px] flex-col justify-center rounded-lg border border-neutral-200 bg-white p-6 transition-colors hover:bg-neutral-50 ${feature.span}`}
    >
      <div className="justify-start text-[12px] mb-4 font-medium uppercase tracking-wide text-neutral-400">
        {feature.type}
      </div>

      {/* Timer */}
      {feature.type === "timer" && (
        <div className="flex flex-col h-full items-center justify-center">
          <span className="mb-4 text-4xl font-semibold leading-none tracking-tight tabular-nums">
            {timeLabel}
          </span>

          <div className="mb-5 h-1 w-24 overflow-hidden rounded-full bg-neutral-100">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "70%" }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full rounded-full bg-blue-600"
            />
          </div>

          <h3 className="mb-1 text-sm font-semibold">{feature.title}</h3>

          <p className="max-w-sm text-center text-xs leading-5 text-neutral-500">
            {feature.description}
          </p>
        </div>
      )}

      {/* Streak */}
      {feature.type === "streak" && (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-4xl font-semibold tracking-tight">
              10
            </span>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Flame className="h-5 w-5 fill-orange-500 text-orange-500" />
            </motion.div>

            <span className="text-sm text-neutral-500">
              days running
            </span>
          </div>

          <p className="text-xs leading-5 text-neutral-500">
            {feature.description}
          </p>
        </div>
      )}

      {/* Insights */}
      {feature.type === "Extension based Tracking" && (
        <div>
          <h3 className="justify-start flex-col text-sm font-semibold">
            {feature.title}
          </h3>

          <p className="text-xs leading-5 text-neutral-500">
            {feature.description}
          </p>
        </div>
      )}

      {/* Leaderboard */}
      {feature.type === "leaderboard" && (
        <div className="w-full">
          

          <div className="divide-y divide-neutral-100">
            {[
              ["01", "random.dev", "javascript", "1.2h"],
              ["02", "marcus_j", "javascript", "2.9h"],
              ["03", "you", "java", "1.4h"],
              ["04", "kenjii.t", "python", "1h"],
              ["05", "ana_ruiz", "python", "1h"],
            ].map(([rank, name, language, time], i) => {
              const isYou = name === "you";

              const langDot =
                language === "javascript"
                  ? "bg-yellow-400"
                  : language === "python"
                    ? "bg-blue-400"
                    : "bg-orange-400";

              return (
                <motion.div
                  key={rank}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`grid grid-cols-[28px_1fr_88px_52px] items-center gap-3 px-1 py-2.5 ${
                    isYou ? "bg-blue-50" : ""
                  }`}
                >
                  <span className="text-xs text-neutral-400">
                    {rank}
                  </span>

                  <span
                    className={`truncate text-[13px] ${
                      isYou
                        ? "font-semibold text-blue-700"
                        : "text-neutral-800"
                    }`}
                  >
                    {name}
                  </span>

                  <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <span className={`h-1.5 w-1.5 rounded-full ${langDot}`} />
                    {language}
                  </span>

                  <span className="text-right text-xs font-medium text-neutral-500">
                    {time}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Heatmap */}
      {feature.type === "heatmap" && (
        <div>
          <h3 className="mb-4 text-sm font-semibold">
            {feature.title}
          </h3>

          <div className="grid grid-cols-12 gap-[3px]">
            {Array.from({ length: 24}).map((_, i) => {
              const intensity = (i * 27 + 11) % 5;

              const shade =
                intensity === 0
                  ? "bg-neutral-100"
                  : intensity === 1
                    ? "bg-blue-100"
                    : intensity === 2
                      ? "bg-blue-300"
                      : intensity === 3
                        ? "bg-blue-500"
                        : "bg-blue-600";

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.006,
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`aspect-square  rounded-[2px] ${shade}`}
                />
              );
            })}
          </div>

          <p className="mt-4 text-xs leading-5 text-neutral-500">
            {feature.description}
          </p>
        </div>
      )}
    </motion.div>
  );
}

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
    <motion.div className="border-t border-neutral-300 pt-5">
      <div className="mb-5 text-xs font-medium text-blue-600">
        {number}
      </div>

      <h4 className="mb-2 text-sm font-semibold text-neutral-900">
        {title}
      </h4>

      <p className="text-sm leading-6 text-neutral-500">
        {description}
      </p>
    </motion.div>
  );
}