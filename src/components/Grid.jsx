import React, { useState, useRef } from "react";

export default function Grid() {
  // ----- VARIABLES -----

  // ref to the grid
  const ref = useRef(null);
  // state variables for cell size, gap, rows, and columns of the grid
  const [cellSize, setCellSize] = useState(30);
  const [gap, setGap] = useState(2);
  const [rows, setRows] = useState(
    Math.floor((window.innerHeight * 0.98) / (cellSize + gap))
  );
  const [columns, setColumns] = useState(
    Math.floor((window.innerWidth * 0.98) / (cellSize + gap))
  );
  const [borderRadius, setBorderRadius] = useState(20);
  const [primaryColor, setPrimaryColor] = useState("bg-cyan-300");
  const [secondaryColor, setSecondaryColor] = useState("bg-cyan-500");
  const [backgroundColor, setBackgroundColor] = useState("bg-neutral-800");
  const [transperantColor, setTransperantColor] = useState("bg-transparent");

  // for game of life, the initial live cells
  let liveCells = [
    "0 0",
    "0 1",
    "0 2",
    "0 4",
    "0 5",
    "0 6",
    "0 8",
    "0 9",
    "0 10",
    "0 12",
    "0 16",
    "0 17",
    "0 18",
    "0 20",
    "0 21",
    "0 22",
    "0 24",
    "0 25",
    "0 26",
    "1 0",
    "1 4",
    "1 6",
    "1 8",
    "1 10",
    "1 12",
    "1 16",
    "1 18",
    "1 20",
    "1 22",
    "1 24",
    "1 26",
    "2 0",
    "2 1",
    "2 2",
    "2 4",
    "2 6",
    "2 8",
    "2 9",
    "2 10",
    "2 12",
    "2 16",
    "2 18",
    "2 20",
    "2 22",
    "2 24",
    "2 25",
    "2 26",
    "3 0",
    "3 4",
    "3 6",
    "3 8",
    "3 9",
    "3 12",
    "3 16",
    "3 18",
    "3 20",
    "3 22",
    "3 24",
    "4 0",
    "4 4",
    "4 5",
    "4 6",
    "4 8",
    "4 10",
    "4 12",
    "4 13",
    "4 14",
    "4 16",
    "4 17",
    "4 18",
    "4 20",
    "4 21",
    "4 22",
    "4 24",
  ];

  // ----- FUNCTIONS -----

  // set the number of rows and columns based on window size every time the window is resized
  window.addEventListener("resize", () => {
    setRows(Math.floor((window.innerHeight * 0.98) / (cellSize + gap)));
    setColumns(Math.floor((window.innerWidth * 0.98) / (cellSize + gap)));
  });
  // glow an element (for hover effect)
  const glow = (e) => {
    e.target.classList.add(primaryColor);
    e.target.classList.remove(backgroundColor);
  };
  // dim an element (for hover effect)
  const glowDim = (e) => {
    e.target.classList.add(secondaryColor);
    e.target.classList.remove(primaryColor);
  };
  // turn off the glow effect (for hover effect)
  const glowOff = (e) => {
    e.target.classList.add(backgroundColor);
    e.target.classList.remove(secondaryColor);
  };
  // glow a specific element for time t1 and then dim it for time t2 (for matrix rain)
  const glowElement = (x, y, t1, t2) => {
    const element = ref.current.children[x * columns + y] || null;
    if (!element) return;
    element.classList.add(primaryColor);
    element.classList.remove(backgroundColor);

    setTimeout(() => {
      element.classList.add(secondaryColor);
      element.classList.remove(primaryColor);
    }, t1);

    setTimeout(() => {
      element.classList.add(backgroundColor);
      element.classList.remove(secondaryColor);
    }, t2);
  };
  // glow a specific element for time t1 and then hide it after time t2 (for first order nuclear fission)
  const glowElementAndHide = (x, y, t1, t2) => {
    const element = ref.current.children[x * columns + y] || null;
    if (!element) return;
    element.classList.add(primaryColor);
    element.classList.remove(backgroundColor);

    setTimeout(() => {
      element.classList.add(secondaryColor);
      element.classList.remove(primaryColor);
    }, t1);

    setTimeout(() => {
      element.classList.add(transperantColor);
      element.classList.remove(secondaryColor);
    }, t2);
  };
  // glow a specific element forever (for game of life)
  const glowElementForever = (x, y) => {
    const element = ref.current.children[x * columns + y] || null;
    if (!element) return;
    element.classList.add(primaryColor);
    element.classList.remove(backgroundColor);
  };
  // unglow all elements (for game of life)
  const unGlowAll = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const element = ref.current.children[i * columns + j] || null;
        if (!element) return;
        element.classList.add("bg-neutral-800");
        element.classList.remove(primaryColor);
        element.classList.remove(secondaryColor);
      }
    }
  };

  // ----- EFFECTS -----

  // matrix rain effect
  const matrixRain = (density, tanTheta, rainSpeed, maxDropLength) => {
    // ----- DOCUMENTATION -----

    // The Matrix digital rain, also known as the Matrix code, is the computer code featured in the Matrix series.
    // The falling green code is a way of representing the activity of the virtual reality environment of the Matrix on screen.

    // To run this effect, call the function matrixRain with a density (the speed at which the rain falls),
    // tanTheta (the angle at which the rain falls), rainSpeed (the speed at which the rain glows and dims),
    // and maxDropLength (the maximum length of the rain drops).

    // example: matrixRain(500, 1, 100, 1500);

    // ----- VARIABLES -----

    // density, angle, speed, and length of the rain drops (all provided when the effect is called)

    // ----- FUNCTIONS -----

    // the main function to make the rain fall, with a given density, angle, speed, and length
    // setTimeout is used to delay the start of the rain to let the grid load first
    setTimeout(() => {
      const fall = setInterval(() => {
        // ----- VARIABLES -----

        // randomize the starting point of the rain, time1 is the time for the rain to fall, and time2 is the time for the rain to disappear
        let newRandomElementInRow1 = Math.floor(Math.random() * columns);
        let time1 = rainSpeed;
        let time2 = Math.floor(rainSpeed + Math.random() * maxDropLength);

        // ----- FUNCTIONS -----

        // glow the first element in the row, and then the rest of the elements in the row with a delay
        glowElement(0, newRandomElementInRow1, time1, time2);
        for (let i = 1; i < rows; i++) {
          setTimeout(() => {
            glowElement(
              i,
              newRandomElementInRow1 + Math.floor(i * tanTheta),
              time1,
              time2
            );
          }, i * time1);
        }
      }, density);
      // stop the rain when the window is resized (to prevent memory leak), and then restart it
      window.addEventListener("resize", () => {
        clearInterval(fall);
      });
    }, 1000);
  };
  // game of life effect
  const gameOfLife = (rate) => {
    // ----- DOCUMENTATION -----

    // The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
    // It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.
    // One interacts with the Game of Life by creating an initial configuration and observing how it evolves.

    // To run this effect, call the function gameOfLife with a rate (the speed at which the game runs),
    // and then the effect will run on the grid with the initial live cells provided in the liveCells array.
    // If you want to change the initial live cells, you can do so by changing the liveCells array.

    // example: gameOfLife(300);

    // ----- VARIABLES -----

    // the rate at which the game of life runs (provided when the effect is called)

    // ----- FUNCTIONS -----

    // show the live cells of variable liveCells
    // setTimeout is used to delay the start of the game to let the grid load first
    setTimeout(() => {
      const showLiveCells = (liveCells) => {
        unGlowAll();
        liveCells.forEach((cell) => {
          const x = parseInt(cell.split(" ")[0]);
          const y = parseInt(cell.split(" ")[1]);
          glowElementForever(x, y);
        });
      };
      showLiveCells(liveCells);
      // kill the cells with the given coordinates in the array
      const killCells = (arr) => {
        arr.forEach((cell) => {
          const x = parseInt(cell.split(" ")[0]);
          const y = parseInt(cell.split(" ")[1]);
          liveCells = liveCells.filter((c) => c !== `${x} ${y}`);
          showLiveCells(liveCells);
        });
      };
      // revive the cells with the given coordinates in the array
      const reviveCells = (arr) => {
        arr.forEach((cell) => {
          const x = parseInt(cell.split(" ")[0]);
          const y = parseInt(cell.split(" ")[1]);
          liveCells = liveCells.concat(`${x} ${y}`);
          showLiveCells(liveCells);
        });
      };
      // the main function to run the game of life, with a given rate
      setInterval(() => {
        // ----- VARIABLES -----

        // arrays to store the cells to kill and the cells to revive
        let toKill = [];
        let toRevive = [];

        // ----- FUNCTIONS -----

        // for each live cell, check the number of live neighbours, and then decide whether to kill it or not
        liveCells.forEach((cell) => {
          // ----- VARIABLES -----

          // the coordinates of the cell, and the number of live neighbours
          const x = parseInt(cell.split(" ")[0]);
          const y = parseInt(cell.split(" ")[1]);
          let liveNeighbours = 0;

          // ----- FUNCTIONS -----

          // count the number of live neighbours
          for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
              if (i === 0 && j === 0) continue;
              if (liveCells.includes(`${x + i} ${y + j}`)) {
                liveNeighbours++;
              }
            }
          }
          // decide whether to kill the cell or not, if it has less than 2 or more than 3 live neighbours, it dies
          if (liveNeighbours < 2 || liveNeighbours > 3) {
            toKill.push(cell);
          }
        });
        // for each dead cell, check the number of live neighbours, and then decide whether to revive it or not
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            // ----- VARIABLES -----

            // the number of live neighbours
            let liveNeighbours = 0;

            // ----- FUNCTIONS -----

            // count the number of live neighbours
            for (let k = -1; k < 2; k++) {
              for (let l = -1; l < 2; l++) {
                if (k === 0 && l === 0) continue;
                if (liveCells.includes(`${i + k} ${j + l}`)) {
                  liveNeighbours++;
                }
              }
            }
            // decide whether to revive the cell or not, if it has exactly 3 live neighbours, it revives
            if (liveNeighbours === 3) {
              toRevive.push(`${i} ${j}`);
            }
          }
        }
        // kill and revive the cells
        killCells(toKill);
        reviveCells(toRevive);
      }, rate);
    }, 1000);
  };
  // first order nuclear fission effect
  const firstOrderNuclearFission = (rate, density) => {
    // ----- DOCUMENTATION -----

    // Nuclear fission is a nuclear reaction in which the nucleus of an atom splits into two or more smaller nuclei as fission products,
    // and usually some by-product particles. The fission process often produces free neutrons and gamma photons, and releases a very large amount of energy.

    // To run this effect, call the function firstOrderNuclearFission with a rate (the speed at which the fission occurs),
    // and a density (the number of cells to glow at the start of the fission).
    // The effect will then run on the grid with the given rate and density.

    // example: firstOrderNuclearFission(200, 50);

    // ----- FUNCTIONS -----

    // the main function to run the first order nuclear fission, with a given rate and density
    // setTimeout is used to delay the start of the fission to let the grid load first
    setTimeout(() => {
      // choose a random cell to start the fission, number of cells to glow at the start, and then start the fission
      for (let i = 0; i < density; i++) {
        const x = Math.floor(Math.random() * rows);
        const y = Math.floor(Math.random() * columns);
        glowElementAndHide(x, y, rate * 0.5, rate * 0.8);
      }
      setInterval(() => {
        for (let i = 0; i < density; i++) {
          const x = Math.floor(Math.random() * rows);
          const y = Math.floor(Math.random() * columns);
          glowElementAndHide(x, y, rate * 0.5, rate * 0.8);
        }
      }, rate);
    }, 1000);
  };

  // ----- BLOAT CODE FOR TESTING -----

  window.addEventListener("keydown", (e) => {
    if (e.key === "1") {
      matrixRain(500, 1, 100, 1500);
    }
    if (e.key === "2") {
      gameOfLife(300);
    }
    if (e.key === "3") {
      firstOrderNuclearFission(200, 50);
    }
  });

  // ----- RETURN -----

  return (
    <div>
      <div
        className="w-full h-full grid"
        ref={ref}
        style={{
          gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
          gridGap: `${gap}px`,
        }}
      >
        {
          // fill the grid with divs
          Array.from({ length: rows * columns }).map((_, i) => (
            <div
              key={i}
              className={
                "flex items-center justify-center" + " " + backgroundColor
              }
              onMouseOver={(e) => {
                // glow the div when hovered over
                glow(e);
              }}
              onClick={(e) => {
                // add the cell to the live cells array when clicked
                localStorage.setItem(
                  "liveCells",
                  JSON.stringify(
                    liveCells.concat({
                      x: Math.floor(i / columns),
                      y: i % columns,
                    })
                  )
                );
              }}
              onMouseOut={(e) => {
                // when the mouse leaves the div, glow it, dim it, and then turn off the glow effect
                setTimeout(() => {
                  glowDim(e);
                }, 500);
                setTimeout(() => {
                  glowOff(e);
                }, 1000);
              }}
              style={{
                // make each div a cell with a specific size and shape
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                borderRadius: `${borderRadius}%`,
                fontSize: "0.5rem",
              }}
            ></div>
          ))
        }
      </div>
    </div>
  );
}
