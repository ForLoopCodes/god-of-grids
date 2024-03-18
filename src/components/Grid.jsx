import React, { useState, useRef } from "react";

export default function Grid() {
  const ref = useRef(null);
  const [cellSize, setCellSize] = useState(30);
  const [gap, setGap] = useState(2);

  const [rows, setRows] = useState(
    Math.floor((window.innerHeight * 0.98) / (cellSize + gap))
  );
  const [columns, setColumns] = useState(
    Math.floor((window.innerWidth * 0.98) / (cellSize + gap))
  );

  window.addEventListener("resize", () => {
    setRows(Math.floor((window.innerHeight * 0.98) / (cellSize + gap)));
    setColumns(Math.floor((window.innerWidth * 0.98) / (cellSize + gap)));
  });

  const glow = (e) => {
    e.target.classList.add("bg-cyan-300");
    e.target.classList.remove("bg-neutral-800");
  };

  const glowDim = (e) => {
    e.target.classList.add("bg-cyan-500");
    e.target.classList.remove("bg-cyan-300");
  };

  const glowOff = (e) => {
    e.target.classList.add("bg-neutral-800");
    e.target.classList.remove("bg-cyan-500");
  };
  const glowElement = (x, y, t1, t2) => {
    const element = ref.current.children[x * columns + y] || null;
    if (!element) return;
    element.classList.add("bg-cyan-300");
    element.classList.remove("bg-neutral-800");

    setTimeout(() => {
      element.classList.add("bg-cyan-500");
      element.classList.remove("bg-cyan-300");
    }, t1);

    setTimeout(() => {
      element.classList.add("bg-neutral-800");
      element.classList.remove("bg-cyan-500");
    }, t2);
  };

  const glowElementInstant = (x, y, t) => {
    const element = ref.current.children[x * columns + y] || null;
    if (!element) return;
    element.classList.add("bg-cyan-300");
    element.classList.remove("bg-neutral-800");

    setTimeout(() => {
      element.classList.remove("bg-cyan-300");
      element.classList.add("bg-neutral-800");
    }, t);
  };

  const matrixRain = () => {
    let density = 200;
    let theta = 1;
    const fall = setInterval(() => {
      let newRandomElementInRow1 = Math.floor(Math.random() * columns);
      let time1 = 100;
      let time2 = Math.floor(100 + Math.random() * 1500);
      glowElement(0, newRandomElementInRow1, time1, time2);
      for (let i = 1; i < rows; i++) {
        setTimeout(() => {
          glowElement(
            i,
            newRandomElementInRow1 + Math.floor(i * theta),
            time1,
            time2
          );
        }, i * time1);
      }
    }, density);
    window.addEventListener("resize", () => {
      clearInterval(fall);
    });
  };

  setTimeout(() => {
    matrixRain();
  }, 1000);
  const [liveCells, setLiveCells] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ]);
  localStorage.setItem("liveCells", JSON.stringify(liveCells));
  const gameOfLife = () => {
    let rate = 500;
    const generation = setInterval(() => {
      const liveCellsFromStorage = JSON.parse(
        localStorage.getItem("liveCells")
      );
      // render live cells for 1s and update the live cells every 1s
      for (let i = 0; i < liveCellsFromStorage.length; i++) {
        glowElement(
          liveCellsFromStorage[i].x,
          liveCellsFromStorage[i].y,
          rate - 50,
          rate - 51
        );
      }
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          let neighbors = [
            { x: i + 1, y: j },
            { x: i - 1, y: j },
            { x: i, y: j + 1 },
            { x: i, y: j - 1 },
            { x: i + 1, y: j + 1 },
            { x: i - 1, y: j - 1 },
            { x: i + 1, y: j - 1 },
            { x: i - 1, y: j + 1 },
          ];
          let liveNeighbors = 0;
          for (let k = 0; k < neighbors.length; k++) {
            for (let l = 0; l < liveCellsFromStorage.length; l++) {
              if (
                liveCellsFromStorage[l].x === neighbors[k].x &&
                liveCellsFromStorage[l].y === neighbors[k].y
              ) {
                liveNeighbors++;
              }
            }
          }
          //show live neighbors of each cell in the grid
          const element = ref.current.children[i * columns + j] || null;
          if (!element) return;
          element.textContent = liveNeighbors;

          const isCellLive = (x, y) => {
            for (let w = 0; w < liveCellsFromStorage.length; w++) {
              let cell = liveCellsFromStorage[w];
              if (cell.x === x && cell.y === y) {
                return true;
              }
            }
            return false;
          };

          if (
            isCellLive(i, j) &&
            (liveNeighbors < 2 || liveNeighbors > 3) &&
            liveCellsFromStorage.length > 0
          ) {
            //console.log("removing cell", i, j);
            //console.log("liveCells", liveCellsFromStorage);
            localStorage.setItem(
              "liveCells",
              JSON.stringify(
                liveCellsFromStorage.filter(
                  (cell) => !(cell.x == i && cell.y == j)
                )
              )
            );
          } else {
            if (liveNeighbors === 3 && isCellLive(i, j) === false) {
              // prevent duplicates
              //console.log("adding cell", i, j);
              localStorage.setItem(
                "liveCells",
                JSON.stringify(liveCellsFromStorage.concat({ x: i, y: j }))
              );
              //console.log("liveCells", liveCellsFromStorage);
            }
          }
        }
      }
    }, rate);
    window.addEventListener("resize", () => {
      clearInterval(generation);
    });
  };
  setTimeout(() => {
    // gameOfLife();
  }, 1000);

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
              className="bg-neutral-800 flex items-center justify-center"
              onMouseOver={(e) => {
                glow(e);
              }}
              onClick={(e) => {
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
                setTimeout(() => {
                  glowDim(e);
                }, 1000);
                setTimeout(() => {
                  glowOff(e);
                }, 2000);
              }}
              style={{
                // make each div 5x5
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                borderRadius: "20%",
                fontSize: "0.5rem",
              }}
            ></div>
          ))
        }
      </div>
    </div>
  );
}
