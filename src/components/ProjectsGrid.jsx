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
            <p className="text-sm text-white p-2 pb-2">
              <svg viewBox="0 0 14 14" className="w-4 h-4 inline-block">
                <path
                  d="M10.9639 8.92676L10.957 3.59473C10.957 3.42155 10.9023 3.28027 10.793 3.1709C10.6882 3.05697 10.5446 3 10.3623 3H5.03027C4.8571 3 4.7181 3.05697 4.61328 3.1709C4.50846 3.28027 4.45605 3.41016 4.45605 3.56055C4.45605 3.70638 4.51074 3.83398 4.62012 3.94336C4.73405 4.05273 4.86393 4.10742 5.00977 4.10742H6.58887L9.2959 4.01172L8.26367 4.89355L3.1709 10C3.05697 10.1094 3 10.237 3 10.3828C3 10.5332 3.05697 10.6676 3.1709 10.7861C3.28939 10.9046 3.42383 10.9639 3.57422 10.9639C3.72461 10.9639 3.85449 10.9092 3.96387 10.7998L9.06348 5.69336L9.95898 4.66113L9.84277 7.34766V8.9541C9.84277 9.09994 9.89746 9.22982 10.0068 9.34375C10.1208 9.45768 10.2529 9.51465 10.4033 9.51465C10.5492 9.51465 10.679 9.45996 10.793 9.35059C10.9069 9.23665 10.9639 9.09538 10.9639 8.92676Z"
                  fill="white"
                ></path>
              </svg>
            </p>
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
