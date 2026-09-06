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
    <div className="flex min-h-[500px] items-center justify-center  p-6">
    
      <div
        className="
          w-full max-w-[520px]
          rounded-[32px]
          border border-[#b8b5ad]
          bg-[#d9d7d0]
          p-7
          shadow-[
            10px_10px_20px_rgba(0,0,0,0.22),
            -8px_-8px_18px_rgba(255,255,255,0.8),
            inset_1px_1px_2px_rgba(255,255,255,0.8),
            inset_-1px_-1px_2px_rgba(0,0,0,0.12)
          ]
        "
      >
        {/* Top label */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#77746c]">
              FLOWSTATE
            </p>

            <p className="mt-1 text-[11px] font-medium text-[#99968e]">
              FOCUS TIMER
            </p>
          </div>

          {/* Small indicator */}
          <div
            className={`
              h-3 w-3 rounded-full
              border border-[#aaa79f]
              ${
                running
                  ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.7)]"
                  : "bg-[#aaa79f]"
              }
            `}
          />
        </div>

        {/* Inset display */}
        <div
          className="
            rounded-[22px]
            border border-[#8e8c86]
            bg-[#252525]
            p-4
            shadow-[
              inset_5px_5px_10px_rgba(0,0,0,0.8),
              inset_-2px_-2px_5px_rgba(255,255,255,0.08),
              2px_2px_4px_rgba(255,255,255,0.5)
            ]
          "
        >
          <div
            className="
              flex h-[150px]
              items-center justify-center
              rounded-[14px]
              border border-[#161616]
              bg-[#111]
              shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)]
            "
          >
            <div
              className="
                select-none
                font-mono
                text-[52px]
                font-bold
                tracking-[0.08em]
                text-[#d8e7d0]
                drop-shadow-[0_0_5px_rgba(216,231,208,0.35)]
                sm:text-[64px]
              "
            >
              {format(displayHours)}:
              {format(displayMinutes)}:
              {format(displaySeconds)}
            </div>
          </div>
        </div>

        {/* Physical knobs / inputs */}
        <div className="mt-7">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#77746c]">
            Set duration
          </div>

          <div className="flex items-center gap-3">
            {/* Hours */}
            <div className="flex-1">
              <label className="mb-1 block text-[10px] font-bold uppercase text-[#8c8981]">
                Hours
              </label>

              <input
                type="number"
                min="0"
                value={hours}
                onChange={(e) =>
                  setHours(Number(e.target.value))
                }
                className="
                  w-full
                  rounded-xl
                  border border-[#aaa79f]
                  bg-[#d1cfc8]
                  px-3 py-3
                  text-center
                  font-mono
                  font-bold
                  text-[#3c3a35]
                  outline-none
                  shadow-[
                    inset_3px_3px_6px_rgba(0,0,0,0.16),
                    inset_-3px_-3px_6px_rgba(255,255,255,0.7)
                  ]
                  focus:ring-2
                  focus:ring-[#3B60C5]/40
                "
              />
            </div>

            <span className="mt-5 font-bold text-[#85827a]">
              :
            </span>

            {/* Minutes */}
            <div className="flex-1">
              <label className="mb-1 block text-[10px] font-bold uppercase text-[#8c8981]">
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
                className="
                  w-full
                  rounded-xl
                  border border-[#aaa79f]
                  bg-[#d1cfc8]
                  px-3 py-3
                  text-center
                  font-mono
                  font-bold
                  text-[#3c3a35]
                  outline-none
                  shadow-[inset_3px_3px_6px_rgba(0,0,0,0.16),inset_-3px_-3px_6px_rgba(255,255,255,0.7)]
                  focus:ring-2
                  focus:ring-[#3B60C5]/40
                "
              />
            </div>

            <span className="mt-5 font-bold text-[#85827a]">
              :
            </span>

            {/* Seconds */}
            <div className="flex-1">
              <label className="mb-1 block text-[10px] font-bold uppercase text-[#8c8981]">
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
                className="
                  w-full
                  rounded-xl
                  border border-[#aaa79f]
                  bg-[#d1cfc8]
                  px-3 py-3
                  text-center
                  font-mono
                  font-bold
                  text-[#3c3a35]
                  outline-none
                  shadow-[inset_3px_3px_6px_rgba(0,0,0,0.16),inset_-3px_-3px_6px_rgba(255,255,255,0.7)]
                  focus:ring-2
                  focus:ring-[#3B60C5]/40
                "
              />
            </div>

            {/* Set button */}
            <button
              onClick={setTimer}
              className="
                mt-5
                rounded-xl
                border border-[#77746e]
                bg-[#c5c2ba]
                px-4 py-3
                text-sm
                font-bold
                text-[#383631]
                shadow-[
                  3px_3px_6px_rgba(0,0,0,0.2),
                  -2px_-2px_5px_rgba(255,255,255,0.7),
                  inset_1px_1px_1px_rgba(255,255,255,0.7)
                ]
                transition-all
                hover:bg-[#cecbc3]
                active:translate-y-[2px]
                active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.25)]
              "
            >
              Set
            </button>
          </div>
        </div>

        {/* Main controls */}
        <div className="mt-8 flex items-center justify-center gap-5">
          {/* Start / Pause */}
          <button
            onClick={() =>
              setRunning((prev) => !prev)
            }
            disabled={timeLeft === 0}
            className="
              min-w-[150px]
              rounded-2xl
              border border-[#28458e]
              bg-black
              px-7 py-4
              font-bold
              text-white
              shadow-[
                5px_5px_9px_rgba(0,0,0,0.25),
                -3px_-3px_7px_rgba(255,255,255,0.55),
                inset_1px_1px_1px_rgba(255,255,255,0.25)
              ]
              transition-all
              hover:bg-neutral-900
              active:translate-y-[3px]
              active:shadow-[
                inset_3px_3px_7px_rgba(0,0,0,0.3),
                1px_1px_2px_rgba(255,255,255,0.4)
              ]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {running ? "Pause" : "Start"}
          </button>

          {/* Reset */}
          <button
            onClick={reset}
            className="
              rounded-2xl
              border border-[#99968e]
              bg-[#c8c5bd]
              px-7 py-4
              font-bold
              text-[#45423c]
              shadow-[
                5px_5px_9px_rgba(0,0,0,0.2),
                -3px_-3px_7px_rgba(255,255,255,0.7),
                inset_1px_1px_1px_rgba(255,255,255,0.8)
              ]
              transition-all
              hover:bg-[#d0cdc5]
              active:translate-y-[3px]
              active:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.25)]
            "
          >
            Reset
          </button>
        </div>

        {/* Bottom screws */}
        <div className="mt-7 flex justify-between px-2">
          <div className="h-2 w-2 rounded-full bg-[#aaa79f] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.4)]" />
          <div className="h-2 w-2 rounded-full bg-[#aaa79f] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.4)]" />
        </div>
      </div>
    </div>
  );
}