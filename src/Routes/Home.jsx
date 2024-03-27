import React, { useState } from "react";
import Grid from "../components/Grid";

export default function Home() {
  // on scroll, change slide, scroll to view
  // each silde is absolute on its real position, so we can scroll to it
  let scrollable = true;
  window.addEventListener("wheel", (e) => {
    let slides = document.querySelectorAll(".slide");
    let currentSlide = document.querySelector(".current-slide");
    let currentSlideIndex = Array.from(slides).indexOf(currentSlide);
    if (e.deltaY > 0) {
      if (currentSlideIndex < slides.length - 1 && scrollable) {
        scrollable = false;
        slides[currentSlideIndex].classList.remove("current-slide");
        slides[currentSlideIndex + 1].classList.add("current-slide");
        slides[currentSlideIndex + 1].scrollIntoView();
        setTimeout(() => {
          scrollable = true;
        }, 500);
      }
    }
    if (e.deltaY < 0) {
      if (currentSlideIndex > 0 && scrollable) {
        scrollable = false;
        slides[currentSlideIndex].classList.remove("current-slide");
        slides[currentSlideIndex - 1].classList.add("current-slide");
        slides[currentSlideIndex - 1].scrollIntoView();
        setTimeout(() => {
          scrollable = true;
        }, 500);
      }
    }
    if (!scrollable) {
      // prevent scrolling
      document.querySelector(".grain").style.pointerEvents = "all";
    }
  });

  return (
    <div>
      <div
        className="grain"
        style={{
          position: "absolute",
          zIndex: 2,
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
      <div className="flex items-center justify-center w-full h-screen slide current-slide">
        <Grid />
      </div>
      <div className="w-screen h-screen flex items-center justify-center slide">
        <h1>hello</h1>
      </div>
      <div className="w-screen h-screen flex items-center justify-center slide">
        <h1>hellow 1</h1>
      </div>
    </div>
  );
}
