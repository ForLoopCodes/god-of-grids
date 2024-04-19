import React from "react";
import Grid from "../components/Grid";

export default function Home() {
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
              baseFrequency="0.6"
              stitchTiles="stitch"
            />
          </filter>

          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
      <div
        className="bg-black flex items-center z-0 justify-center w-full h-screen slide"
        style={{
          transform: "scale(0.9)",
          borderRadius: "5vw",
        }}
      >
        <Grid />
      </div>
      <div
        className={
          "bg-black w-screen fixed h-screen z-1 flex items-center justify-center slide"
        }
        style={{
          color: "white",
          transform: "scale(1)",
          borderRadius: "5vw",
        }}
      >
        aos
        <h1>Hello</h1>
      </div>
    </div>
  );
}
