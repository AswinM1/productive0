"use client";

import { useEffect, useState } from "react";

export default function Pomodoro() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  // Timer
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  // Detect timer completion
  useEffect(() => {
    if (running && timeLeft === 0) {
      setRunning(false);
      savePomodoro();
    }
  }, [timeLeft, running]);

  const displayHours = Math.floor(timeLeft / 3600);

  const displayMinutes = Math.floor(
    (timeLeft % 3600) / 60
  );

  const displaySeconds = timeLeft % 60;

  const format = (value: number) =>
    value.toString().padStart(2, "0");

  function setTimer() {
    const totalSeconds =
      hours * 3600 +
      minutes * 60 +
      seconds;

    if (totalSeconds <= 0) return;

    setInitialTime(totalSeconds);
    setTimeLeft(totalSeconds);
    setRunning(false);
  }

  function reset() {
    setRunning(false);
    setTimeLeft(initialTime);
  }

  async function savePomodoro() {
    try {
      const duration = Math.ceil(initialTime / 60);

      console.log("Saving Pomodoro...");
      console.log("Duration:", duration);

      const response = await fetch("/api/pomodoro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          duration,
        }),
      });

      const text = await response.text();

      console.log("STATUS:", response.status);
      console.log("RESPONSE:", text);

      const data = text ? JSON.parse(text) : null;

      console.log(
        "Pomodoro saved successfully:",
        data
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-[500px] items-center justify-center p-6">
      <div className="w-full max-w-[520px] rounded-xl  bg-white p-6 md:p-7">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
           

            <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-neutral-400">
              Focus timer
            </p>
          </div>

          <div
            className={`h-2.5 w-2.5 rounded-full ${
              running ? "bg-green-500" : "bg-neutral-300"
            }`}
          />
        </div>

<div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5">
  <div className="flex h-[150px] items-center justify-center rounded-md border border-neutral-200 bg-white">
    <div className="select-none font-mono text-[52px] font-medium tracking-tight tabular-nums text-neutral-900 sm:text-[64px]">
      {format(displayHours)}:
      {format(displayMinutes)}:
      {format(displaySeconds)}
    </div>
  </div>

  {/* Progress */}
  <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
    <div
      className="h-full rounded-full bg-neutral-900 transition-[width] duration-1000 ease-linear"
      style={{
        width: `${(timeLeft / initialTime) * 100}%`,
      }}
    />
  </div>
</div>

        {/* Duration */}
        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-900">
              Set duration
            </span>

            <span className="text-[11px] text-neutral-400">
              HH : MM : SS
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto] items-end gap-2">
            {/* Hours */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                Hours
              </label>

              <input
                type="number"
                min="0"
                value={hours}
                onChange={(e) =>
                  setHours(Number(e.target.value))
                }
                className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-center font-mono text-sm font-medium text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            <span className="pb-2.5 text-neutral-300">:</span>

            {/* Minutes */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                Minutes
              </label>

              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) =>
                  setMinutes(Number(e.target.value))
                }
                className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-center font-mono text-sm font-medium text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            <span className="pb-2.5 text-neutral-300">:</span>

            {/* Seconds */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                Seconds
              </label>

              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) =>
                  setSeconds(Number(e.target.value))
                }
                className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-center font-mono text-sm font-medium text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Set */}
            <button
              onClick={setTimer}
              className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100 active:translate-y-px"
            >
              Set
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-7 flex gap-3">
          <button
            onClick={() =>
              setRunning((prev) => !prev)
            }
            disabled={timeLeft === 0}
            className="flex-1 rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {running ? "Pause" : "Start"}
          </button>

          <button
            onClick={reset}
            className="rounded-md border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Reset
          </button>
        </div>

        {/* Status */}
        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="text-[11px] text-neutral-400">
            {running ? "Timer is running" : "Ready to focus"}
          </span>

          <span className="text-[11px] font-medium text-neutral-400">
            {Math.ceil(timeLeft / 60)} min
          </span>
        </div>
      </div>
    </div>
  );
}