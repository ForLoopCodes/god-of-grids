import React, { useState } from "react";

export default function SkillsGrid() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "jQuery",
    "Node.js",
    "Svelte",
    "Tailwind",
    "React.js",
    "JSX",
    "Express.js",
    "MongoDB Atlas",
    "OpenAI GPT-JS",
    "Git",
    "Adobe XD",
    "Canva",
    "Figma",
    "Discord.js",
    "RMSkins",
    "Stockfish",
    "MySQL",
    "Python",
    "Pandas",
    "Matplotlib",
    "Kotlin Basics",
    "Java Basics",
  ];
  const [gridCols, setGridCols] = useState(
    window.innerWidth < 1500 && window.innerWidth >= 800
      ? "grid-cols-5"
      : window.innerWidth < 800 && window.innerWidth >= 600
      ? "grid-cols-4"
      : window.innerWidth < 600
      ? "grid-cols-3"
      : "grid-cols-7"
  );
  window.addEventListener("resize", () => {
    setGridCols(
      window.innerWidth < 1500 && window.innerWidth >= 800
        ? "grid-cols-5"
        : window.innerWidth < 800 && window.innerWidth >= 600
        ? "grid-cols-4"
        : window.innerWidth < 600
        ? "grid-cols-3"
        : "grid-cols-7"
    );
  });
  return (
    <div
      className="mt-12 p-4 pb-8 rounded-lg w-full"
      style={{
        backgroundColor: "#161616",
      }}
    >
      <h2
        className="text-sm text-white p-2 pb-6"
        style={{
          userSelect: "none",
        }}
      >
        <font className="text-red-400">● </font>
        <font className="text-yellow-400">● </font>
        <font className="text-green-400">● </font>
        <font className="text-white pl-4">Terminal</font>
      </h2>
      <h2 className="text-sm text-white p-2 pb-3">
        <font className="text-blue-400">Home/ForLoop{"> "}</font>
        <font className="text-pink-500">bash </font>
        Skills.sh
      </h2>
      <h2 className="text-sm text-white p-2 pb-3">{""}</h2>
      <div className={"grid " + gridCols + " gap-3"}>
        {skills.map((skill, index) => (
          <div key={index} className=" text-white">
            <div className="px-2 text-sm rounded-lg">{skill}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
