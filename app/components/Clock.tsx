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

  // Detect when timer reaches 0
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

  const format = (value: number) => {
    return value.toString().padStart(2, "0");
  };


  function setTimer() {
    const totalSeconds =
      hours * 3600 +
      minutes * 60 +
      seconds;

    if (totalSeconds <= 0) {
      return;
    }

    setInitialTime(totalSeconds);
    setTimeLeft(totalSeconds);
    setRunning(false);
  }

  // Reset timer
  function reset() {
    setRunning(false);
    setTimeLeft(initialTime);
  }

  // Save completed Pomodoro
  async function savePomodoro() {
    try {
      // Store duration in minutes
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

    
      const data = text
        ? JSON.parse(text)
        : null;

      console.log(
        "Pomodoro saved successfully:",
        data
      );
    } catch (error) {
      console.error(
        
        error
      );
    }
  }

  return (
    <div className="flex flex-col  h-[400px]   items-center mx-auto justify-center gap-8">
      

      <div className="font-mono text-7xl font-semibold">
        {format(displayHours)}:
        {format(displayMinutes)}:
        {format(displaySeconds)}
      </div>

      {/* User settings */}

      <div className="flex items-center gap-3">
        <input
          type="number"
          min="0"
          value={hours}
          onChange={(e) =>
            setHours(Number(e.target.value))
          }
          className="w-20 rounded-md border p-2 text-center"
        />

        <span>:</span>

        <input
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={(e) =>
            setMinutes(Number(e.target.value))
          }
          className="w-20 rounded-md border p-2 text-center"
        />

        <span>:</span>

        <input
          type="number"
          min="0"
          max="59"
          value={seconds}
          onChange={(e) =>
            setSeconds(Number(e.target.value))
          }
          className="w-20 rounded-md border p-2 text-center"
        />

        <button
          onClick={setTimer}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Set
        </button>
      </div>

      {/* Controls */}

      <div className="flex gap-3">
        <button
          onClick={() =>
            setRunning((prev) => !prev)
          }
          disabled={timeLeft === 0}
          className="rounded-md bg-black px-5 py-2 text-white disabled:opacity-50"
        >
          {running ? "Pause" : "Start"}
        </button>

        <button
          onClick={reset}
          className="rounded-md border px-5 py-2"
        >
          Reset
        </button>
      </div>
    </div>
  );
}