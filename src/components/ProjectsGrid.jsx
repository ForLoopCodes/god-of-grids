import React, { useState } from "react";

export default function ProjectsGrid() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });
  const returnGitStars = (link) => {
    fetch(`https://api.github.com/repos/${link}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.stargazers_count);
        return data.stargazers_count;
      });
  };
  const [projects, setProjects] = React.useState([
    {
      title: "STUDIUM",
      description: `Revolutionizing learning strategies for competitive exams by 2025.`,
      link: "",
      tags: ["WIP", "COMING SOON"],
      year: "2024-2025",
    },
    {
      title: "CH$RRY WEBSITE",
      description: `Crafted a website for Ch$rry Network, a Discord bot company.`,
      link: "forloopcodes/cherry",
      tags: ["SVELTE", "TAILWIND", "JS", "AOS"],
      year: "2023-2024",
    },
    {
      title: "WATER",
      description: `Water is a note-making application, minimal, simple and fast.`,
      link: "forloopcodes/water",
      tags: [
        "REACT-JSX",
        "JS",
        "NODEJS",
        "EXPRESSJS",
        "MONGODB",
        "REACTMARKDOWN",
        "GPT",
      ],
      year: "2023-2024",
    },
    {
      title: "CHESSGPT",
      description: `ChessGPT is an AI-based chess API, Terminal, Discord or Application, it works!`,
      link: "forloopcodes/chessgpt-api",
      tags: ["PYTHON", "JS", "DISCORD.JS", "NODEJS", "EXPRESSJS", "STOCKFISH"],
      year: "2023-2024",
    },
  ]);
  return (
    <div
      className={
        "mt-4 rounded-lg w-full grid gap-4" +
        (screenWidth < 800
          ? " grid-cols-1"
          : screenWidth < 1200
          ? " grid-cols-2"
          : " grid-cols-4")
      }
    >
      {projects.map((project, index) => (
        <div
          key={index}
          className="p-4 rounded-lg cursor-pointer transition-transform duration-300 flex flex-col justify-between card"
          style={{
            background: "#161616",
          }}
          onClick={() =>
            (window.location.href = project.link
              ? "https://github.com/" + project.link
              : "mailto:meetnp1706@gmail.com")
          }
        >
          <div className="flex justify-between w-full">
            <p className="text-sm text-white p-2 pb-2 opacity-60">
              {project.year}
            </p>
            <p className="text-sm text-white p-2 pb-2 opacity-60">↗</p>
          </div>

          <h2
            className="text-lg gradient-text1 text-white p-2 pb-2"
            style={{ userSelect: "none" }}
          >
            {project.title}
          </h2>
          <h2 className="text-sm text-white p-2 pb-3 opacity-60">
            {project.description}
          </h2>
          <h2 className="text-xs text-white pb-1 w-full flex flex-wrap gradient-text0">
            {project.tags.map((tag, index) => (
              <font key={index} className="px-2 rounded-lg">
                {tag}
              </font>
            ))}
          </h2>
        </div>
      ))}
    </div>
  );
}
