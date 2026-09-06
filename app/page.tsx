"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    title: "Build your own Timer counter",
    description:
      "Choose your desired time goal to chase and achieve it",
    type: "timer",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "days running",
    description:
      "Hit your daily minimum and keep the chain alive.",
    type: "streak",
    span: "",
  },
  {
    title: "Your best hours",
    description:
      "See exactly when your focus peaks across the week.",
    type: "insights",
    span: "",
  },
  {
    title: "Leaderboard",
    description: "",
    type: "leaderboard",
    span: "col-span-2 md:row-span-2",
  },
  {
    title: "Heatmaps to visualize your progress",
    description:
      "Every square is a day of tracked work.",
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

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Page() {
  // Timer starts at 02:47:18
  const [seconds, setSeconds] = useState(10038);

  // ---------------------------------------------
  // TIMER
  // ---------------------------------------------

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#FDF2DE]">

      {/* --------------------------------------------- */}
      {/* NAVBAR */}
      {/* --------------------------------------------- */}

      <motion.header
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="sticky top-0 z-50 border-b backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-[18px] md:px-8">

          {/* Logo */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="flex cursor-pointer items-center gap-2 font-sans font-black tracking-wide text-black"
          >
            <span className="h-2 w-2 rounded-full bg-black" />

            flowstate
          </motion.div>

          {/* Navigation */}

          <nav className="hidden gap-8 text-sm text-[#232323] md:flex">

            {[
              ["#features", "features"],
              ["/leaderboard", "leaderboard"],
              ["#how", "how it works"],
            ].map(([href, label]) => (
              <motion.a
                key={href}
                href={href}
                whileHover={{
                  y: -2,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="font-medium transition hover:text-neutral-700"
              >
                {label}
              </motion.a>
            ))}

          </nav>

          {/* Sign in */}

          <motion.a
            href="/dashboard"
            whileHover={{
              scale: 1.04,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="rounded bg-[#232323] px-4 py-2 font-sans text-[13px] font-semibold text-white"
          >
            Sign in
          </motion.a>

        </div>
      </motion.header>

      <div className="mx-auto max-w-[1180px] px-6 md:px-8">

        {/* --------------------------------------------- */}
        {/* HERO */}
        {/* --------------------------------------------- */}

        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex min-h-[600px] flex-col items-center justify-center rounded-md border bg-[#3B60C5] py-10 text-center md:py-[88px]"
        >
          <motion.div
            variants={containerVariants}
            className="flex flex-col items-center"
          >

            {/* Badge */}

            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.04,
              }}
              className="mb-5 w-fit rounded-md bg-[#FDF2DE] px-7 py-1.5 font-sans text-[13px] font-medium text-black"
            >
              The All in one productivity web application
            </motion.div>

            {/* Heading */}

            <motion.h1
              variants={itemVariants}
              className="max-w-3xl font-sans text-4xl font-semibold leading-[1.15] tracking-tight text-white md:text-[52px]"
            >
              The Web productivity Tracker you are searching for
            </motion.h1>

            {/* Description */}

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-[600px] text-[17px] leading-relaxed text-neutral-300"
            >
              flowstate provides timers, leaderboard, activity tracking,
              streaks to level your productivity experience. Install the
              extension and start tracking.
            </motion.p>

            {/* Buttons */}

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >

              <motion.a
                href="/dashboard"
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="flex items-center justify-center rounded bg-[#232323] px-6 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
              >
                Get started
              </motion.a>

              <motion.a
                href="https://marketplace.visualstudio.com/items?itemName=flow-state.Flowstate-dev"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="rounded border border-[#232323] bg-white px-[22px] py-[13px] text-sm font-medium text-black transition hover:bg-neutral-300"
              >
                Install Extension
              </motion.a>

            </motion.div>

          </motion.div>
        </motion.section>

      
        <section
          id="features"
          className="py-18"
        >

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={containerVariants}
            className="mb-10 max-w-[56ch]"
          >

            <motion.h2
            
              className="font-sans text-[28px] font-semibold tracking-tight text-[#232323]"
            >
              The Whole productivity package is here
            </motion.h2>

            <motion.p
             
              className="mt-3 text-[15.5px] text-[#555]"
            >
              Timer, Leaderboard, Streaks, personal dashboards and many more
              to track your progress
            </motion.p>

          </motion.div>

          {/* BENTO GRID */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={containerVariants}
            className="grid auto-rows-[minmax(150px,auto)] gap-4 text-[#232323] md:grid-cols-4"
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

     
        <section
          id="how"
          className="py-[72px] text-[#232323]"
        >

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={containerVariants}
            className="mb-10 max-w-[56ch]"
          >

            <motion.h2
              variants={itemVariants}
              className="font-sans text-[28px] font-semibold tracking-tight"
            >
              We Track your activity in where you already work
            </motion.h2>

          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={containerVariants}
            className="grid gap-6 md:grid-cols-3"
          >

            <Step
              number="01"
              title="Install from the marketplace"
              description='Search "Flowstate tracker" in the VS Code extensions panel and install the extension and sign in to get your api key'
            />

            <Step
              number="02"
              title="Get the Api key from the dashboard"
              description="After copying the Api key press Ctrl + Shift + P in your VS Code and search for Flowstate: Set API Token and paste your API key"
            />

            <Step
              number="03"
              title="Track your progress"
              description="You can track your progress from the dashboard and top the leaderboard"
            />

          </motion.div>

        </section>

      </div>

      {/* --------------------------------------------- */}
      {/* FOOTER */}
      {/* --------------------------------------------- */}

      <motion.footer
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.6,
        }}
        className="mt-20 border-t border-[#2D2C3A] bg-[#3B60C5] px-8 py-8"
      >

        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 font-sans text-xs">

          <span className="text-6xl font-black text-white">
            flowstate
          </span>

          <div className="flex flex-col gap-1 font-medium text-neutral-100">

            <Link
              href="https://github.com/AswinM1/productive0"
              target="_blank"
            >
              <motion.span
                whileHover={{
                  x: 3,
                }}
              >
                Github
              </motion.span>
            </Link>

            <Link
              href="https://x.com/whitespaceeee"
              target="_blank"
            >
              <motion.span
                whileHover={{
                  x: 3,
                }}
              >
                X
              </motion.span>
            </Link>

            <Link
              href="https://marketplace.visualstudio.com/items?itemName=flow-state.Flowstate-dev"
              target="_blank"
            >
              <motion.span
                whileHover={{
                  x: 3,
                }}
              >
                Install extension
              </motion.span>
            </Link>

            <span>
              built by Aswin
            </span>

          </div>

        </div>

      </motion.footer>

    </main>
  );
}

/* ================================================= */
/* FEATURE CARD */
/* ================================================= */

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

  return (
    <motion.div
      id={
        feature.type === "leaderboard"
          ? "leaderboard"
          : undefined
      }
      variants={cardVariants}
      whileHover={{
        y: -6,
        scale: 1.015,
      }}
      className={`relative flex min-h-[150px] flex-col justify-center rounded-lg border border-[#f6f2f3] bg-[#3B60C5] p-[26px] text-white ${feature.span}`}
    >

      {/* Card label */}

      <span className="absolute left-[26px] top-5 font-sans text-[11.5px] text-white">
        {feature.type.replace("-", " ")}
      </span>

      {/* ================================================= */}
      {/* TIMER */}
      {/* ================================================= */}

      {feature.type === "timer" && (
        <div className="flex flex-col items-center justify-center">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-4 font-sans text-[52px] font-bold leading-none text-white"
          >

           

            <motion.span
              key={seconds}
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              {formatFeatureTime(seconds)}
            </motion.span>

          </motion.div>

          <h3 className="mb-2 font-sans text-[17px] font-semibold text-neutral-100">
            {feature.title}
          </h3>

          <p className="text-sm text-neutral-400">
            {feature.description}
          </p>

        </div>
      )}

      {/* ================================================= */}
      {/* STREAK */}
      {/* ================================================= */}

      {feature.type === "streak" && (
        <>

          <motion.div
            initial={{
              opacity: 0,
              x: -15,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.2,
            }}
            className="mt-4 flex items-center text-xl mb-3 font-semibold"
          >

            10

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Flame className="h-8 w-8 fill-orange-500 text-orange-500" />
            </motion.div>

            days running

          </motion.div>

          <p className="text-sm text-neutral-200">
            {feature.description}
          </p>

        </>
      )}

    
      {feature.type === "insights" && (
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
        >

          <h3 className="mb-2 font-sans text-[17px] font-semibold">
            {feature.title}
          </h3>

          <p className="text-sm text-[#9C99AC]">
            {feature.description}
          </p>

        </motion.div>
      )}

      {/* ================================================= */}
      {/* LEADERBOARD */}
      {/* ================================================= */}

      {feature.type === "leaderboard" && (
        <div className="mt-7 flex flex-col gap-1.5 relative  w-full ">
          <div className="absolute bg-linear-to-t from-neutral-500 to-transparent flex w-full bottom-0 left-0"></div>

          {[
            ["01", "priya.dev", "38.2h"],
            ["02", "marcus_j", "34.9h"],
            ["03", "you", "31.4h"],
            ["04", "kenji.t", "28.7h"],
            ["05", "ana_ruiz", "25.1h"],
          ].map(([rank, name, hours], index) => (

            <motion.div
              key={rank}
              initial={{
                opacity: 0,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.08,
                duration: 0.4,
              }}
              className="flex items-center shadow-2xl rounded-md hover:scale-105 transition-all duration-150 bg-white shadow-2xl  px-4  border-[#2D2C3A] py-2 font-sans text-[13.5px] last:border-0"
            >

              <span className="w-5 text-black">
                {rank}
              </span>

              <span
                className={`ml-2 flex-1 ${
                  name === "you"
                    ? "font-bold text-black"
                    : "text-black"
                }`}
              >
                {name}
              </span>

              <span className="font-bold text-blue-500 ">
                {hours}
              </span>

            </motion.div>

          ))}

        </div>
      )}

      {/* ================================================= */}
      {/* HEATMAP */}
      {/* ================================================= */}

      {feature.type === "heatmap" && (
        <>

          <h3 className="mt-4 mb-2 font-sans text-[17px] font-semibold">
            {feature.title}
          </h3>

          <p className="text-sm text-neutral-200">
            {feature.description}
          </p>

          <Heatmap />

        </>
      )}

    </motion.div>
  );
}

/* ================================================= */
/* TIMER FORMAT */
/* ================================================= */

function formatFeatureTime(value: number) {

  const h = String(
    Math.floor(value / 3600)
  ).padStart(2, "0");

  const m = String(
    Math.floor((value % 3600) / 60)
  ).padStart(2, "0");

  const s = String(
    value % 60
  ).padStart(2, "0");

  return `${h}:${m}:${s}`;
}

/* ================================================= */
/* HEATMAP */
/* ================================================= */

function Heatmap() {

  const cells = Array.from(
    { length: 48 },
    (_, i) => {

      const values = [
        0,
        1,
        2,
        3,
        1,
        0,
        2,
        3,
        1,
        0,
      ];

      return values[i % values.length];
    }
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      className="mt-4 grid max-w-[420px] grid-cols-12 gap-[3px] md:grid-cols-24"
    >

      {cells.map((level, index) => (

        <motion.div
          key={index}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: index * 0.015,
            duration: 0.25,
          }}
          className={`aspect-square rounded-[2px] hover:bg-white ${
            level === 0
              ? "bg-[#dfea09]"
              : level === 1
                ? "bg-[#020202]"
                : level === 2
                  ? "bg-[#1a3ff7]"
                  : "bg-[#faf9f8]"
          }`}
        />

      ))}

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
    <motion.div
      variants={itemVariants}
      
      className="rounded-md border-t border-[#2D2C3A] bg-[#3B60C5] px-4 py-6"
    >

      <div className="mb-2.5 font-sans text-[13px] font-semibold text-white">
        {number}
      </div>

      <h4 className="mb-2 font-sans text-base font-semibold text-neutral-900">
        {title}
      </h4>

      <p className="text-[14.5px] text-neutral-200">
        {description}
      </p>

    </motion.div>
  );
}