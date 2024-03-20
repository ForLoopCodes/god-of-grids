import React from "react";
import Grid from "../components/Grid";

export default function Home() {
  return (
    <div>
      <div
        className="grain"
        style={{
          position: "absolute",
          zIndex: 2,
          opacity: 0.3,
          filter: "brightness(0.6) contrast(2)",
          backdropFilter: "blur(30px) saturate(1700%)",
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

      <div className="flex items-center justify-center w-full h-screen">
        <Grid />
      </div>
    </div>
  );
}
