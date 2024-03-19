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

  const glowElementForever = (x, y) => {
    const element = ref.current.children[x * columns + y] || null;
    if (!element) return;
    element.classList.add("bg-cyan-300");
    element.classList.remove("bg-neutral-800");
  };
  const unGlowAll = () => {
    // unglow only elements in liveCells
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const element = ref.current.children[i * columns + j] || null;
        if (!element) return;
        element.classList.add("bg-neutral-800");
        element.classList.remove("bg-cyan-300");
        element.classList.remove("bg-cyan-500");
      }
    }
  };
  const matrixRain = () => {
    let density = 500;
    let tanTheta = 1;
    let rainSpeed = 100;
    let maxDropLength = 1500;
    const fall = setInterval(() => {
      let newRandomElementInRow1 = Math.floor(Math.random() * columns);
      let time1 = rainSpeed;
      let time2 = Math.floor(rainSpeed + Math.random() * maxDropLength);
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
    window.addEventListener("resize", () => {
      clearInterval(fall);
    });
  };

  setTimeout(() => {
    // matrixRain();
  }, 1000);
  //FORLOOP
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
  const showLiveCells = (liveCells) => {
    unGlowAll();
    liveCells.forEach((cell) => {
      const x = parseInt(cell.split(" ")[0]);
      const y = parseInt(cell.split(" ")[1]);
      glowElementForever(x, y);
    });
  };
  const killCells = (arr) => {
    arr.forEach((cell) => {
      const x = parseInt(cell.split(" ")[0]);
      const y = parseInt(cell.split(" ")[1]);
      liveCells = liveCells.filter((c) => c !== `${x} ${y}`);
      showLiveCells(liveCells);
    });
  };
  const reviveCells = (arr) => {
    arr.forEach((cell) => {
      const x = parseInt(cell.split(" ")[0]);
      const y = parseInt(cell.split(" ")[1]);
      liveCells = liveCells.concat(`${x} ${y}`);
      showLiveCells(liveCells);
    });
  };
  const gameOfLife = () => {
    let rate = 500;
    showLiveCells(liveCells);
    setInterval(() => {
      let toKill = [];
      let toRevive = [];
      liveCells.forEach((cell) => {
        const x = parseInt(cell.split(" ")[0]);
        const y = parseInt(cell.split(" ")[1]);
        let liveNeighbours = 0;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) continue;
            if (liveCells.includes(`${x + i} ${y + j}`)) {
              liveNeighbours++;
            }
          }
        }
        if (liveNeighbours < 2 || liveNeighbours > 3) {
          toKill.push(cell);
        }
      });
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          let liveNeighbours = 0;
          for (let k = -1; k < 2; k++) {
            for (let l = -1; l < 2; l++) {
              if (k === 0 && l === 0) continue;
              if (liveCells.includes(`${i + k} ${j + l}`)) {
                liveNeighbours++;
              }
            }
          }
          if (liveNeighbours === 3) {
            toRevive.push(`${i} ${j}`);
          }
        }
      }
      killCells(toKill);
      reviveCells(toRevive);
    }, rate);
  };
  setTimeout(() => {
    gameOfLife();
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
