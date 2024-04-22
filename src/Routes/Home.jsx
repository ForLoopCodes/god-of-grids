import React, { useState } from "react";
import Grid from "../components/Grid";
import SkillsGrid from "../components/SkillsGrid";
import ProjectsGrid from "../components/ProjectsGrid";
import ContactsGrid from "../components/ContactsGrid";

export default function Home() {
  const [viewDetails, setViewDetails] = useState(
    window.innerWidth >= 1200 ? false : true
  );
  const [terminalWidth, setTerminalWidth] = useState(
    window.innerWidth >= 1200 ? "80vw" : "100vw"
  );
  window.addEventListener("resize", () => {
    setViewDetails(window.innerWidth >= 1200 ? false : true);
    setTerminalWidth(window.innerWidth >= 1200 ? "80vw" : "100vw");
  });
  return (
    <div>
      <div
        className="grain"
        style={{
          position: "fixed",
          zIndex: 200,
          opacity: 0.3,
          filter: "brightness(0.6) contrast(2)",
          backdropFilter: "blur(70px) saturate(4000%)",
          pointerEvents: "none",
        }}
        width="100vw"
        height="100vh"
      >
        <svg width="100vw" height="100vh" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={viewDetails ? "0.6" : "0.4"}
              stitchTiles="stitch"
            />
          </filter>

          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
      <div
        className={
          "flex items-center justify-center w-full h-screen slide" +
          (terminalWidth === "80vw" ? " fixed" : " relative")
        }
        style={{
          transform: "scale(0.9)",
          overflow: "hidden",
          zIndex: 5,
          borderRadius: "5vw",
        }}
      >
        <Grid
          showDetails={() => {
            viewDetails ? setViewDetails(false) : setViewDetails(true);
          }}
          viewDetails={viewDetails}
        />
      </div>
      {viewDetails && (
        <div
          className={
            "slide" + (terminalWidth === "80vw" ? " absolute" : " relative")
          }
          style={{
            color: "white",
            top: terminalWidth === "80vw" ? "10vh" : "-20vh",
            width: terminalWidth,
            overflowY: "auto",
            padding: "20vh 8vw",
            paddingBottom: terminalWidth === "80vw" ? "10vh" : "0",
            zIndex: 10,
            animation: "fadeIn 5s ease-in-out",
          }}
        >
          <h1
            className="gradient-text1 w-48"
            style={{
              opacity: 1,
            }}
          >
            FOR
            <br />
            LOOP
          </h1>
          <h1
            style={{
              opacity: 0.5,
            }}
          >
            CODES.
          </h1>
          <p className="gradient-text0 mt-6 ml-1">
            PRODUCT-FOCUSSED MERN FULL STACK DEVELOPER AND PYTHON ENTHUSIAST.
          </p>
          <SkillsGrid />
          <ProjectsGrid />
          <ContactsGrid />
        </div>
      )}
    </div>
  );
}
