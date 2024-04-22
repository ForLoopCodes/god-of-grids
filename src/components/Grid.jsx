import React, { useState, useRef } from "react";

export default function Grid(props) {
  // ----- VARIABLES -----

  // ref to the grid
  const ref = useRef(null);
  // state variables for cell size, gap, rows, and columns of the grid
  // show 30 cells in a row and 20 cells in a column
  const [cellSize] = useState(
    window.innerWidth >= 1200 ? window.innerWidth.toFixed(2) / 30 : 40
  );
  const [gap] = useState(cellSize / 12);
  const [rows, setRows] = useState(
    Math.floor((window.innerHeight * 0.98) / (cellSize + gap) - 1)
  );
  const [columns, setColumns] = useState(
    Math.floor((window.innerWidth * 0.98) / (cellSize + gap))
  );
  const [borderRadius] = useState(30);
  const [primaryColor, setPrimaryColor] = useState("bg-cyan-600"); // or bg-neutral-600
  const [secondaryColor, setSecondaryColor] = useState("bg-cyan-400"); // or bg-neutral-400
  const [backgroundColor] = useState("bg-neutral-800"); // or bg-neutral-200
  const [transperantColor] = useState("bg-transparent");
  const [hoverEffect, setHoverEffect] = useState(true);

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
    setRows(Math.floor((window.innerHeight * 0.98) / (cellSize + gap)) - 1);
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
    if (element.classList.contains(transperantColor)) return;
    if (element) {
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
    }
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
        element.classList.add(backgroundColor);
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
    const rain = setTimeout(() => {
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
      // if rainspeed is 0, stop the rain
      if (rainSpeed === 0) {
        clearInterval(fall);
        clearInterval(rain);
      }
    }, 1000);
    localStorage.setItem("mode", "matrixRain");
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
    localStorage.setItem("mode", "gameOfLife");
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
  // multi color effect
  const multiColor = () => {
    // ----- DOCUMENTATION -----

    // The multi color effect is an effect where the colors of the grid change every few seconds.
    // The colors change in a sequence of red, yellow, blue, and teal.

    // To run this effect, call the function multiColor, and then the effect will run on the grid.

    // example: multiColor();

    // ----- FUNCTIONS -----

    // the main function to run the multi color effect
    // setTimeout is used to delay the start of the effect to let the grid load first

    // set yellow as color
    setTimeout(() => {
      setPrimaryColor("bg-yellow-600");
      setSecondaryColor("bg-yellow-300");
    }, 1000);
    // set blue as color
    setTimeout(() => {
      setPrimaryColor("bg-blue-600");
      setSecondaryColor("bg-blue-300");
    }, 3000);
    // set teal as color
    setTimeout(() => {
      setPrimaryColor("bg-teal-600");
      setSecondaryColor("bg-teal-300");
    }, 4000);
  };
  const snakeGame = () => {
    // ----- DOCUMENTATION -----

    // The snake game is a game where the player controls a snake. The objective is to eat as many apples as possible.
    // The game is over when the snake runs into itself or the edges of the grid.

    // To run this effect, call the function snakeGame, and then the effect will run on the grid.

    // example: snakeGame();

    // ----- VARIABLES -----

    // the rate at which the game runs
    const rate = 100;

    // ----- FUNCTIONS -----

    // the main function to run the snake game, with a given rate
    // setTimeout is used to delay the start of the game to let the grid load first
    setTimeout(() => {
      // the initial position of the snake, the direction of the snake, the position of the apple, and the length of the snake
      let snake = [{ x: 0 + 1, y: 0 + 1 }];
      let direction = "right";
      let apple = { x: 0 + 1, y: 0 + 1 };

      for (let i = 0; i < rows; i++) {
        glowElementForever(i, 0);
        glowElementForever(i, columns - 1);
      }
      for (let i = 0; i < columns; i++) {
        glowElementForever(0, i);
        glowElementForever(rows - 1, i);
      }
      // the function to generate a new apple
      const newApple = () => {
        // dont generate the apple on the snake, or the edges of the grid
        apple = {
          x: Math.floor(Math.random() * (rows - 2)) + 1,
          y: Math.floor(Math.random() * (columns - 2)) + 1,
        };
        if (snake.some((cell) => cell.x === apple.x && cell.y === apple.y)) {
          newApple();
        }
      };
      newApple();

      // the function to move the snake
      const moveSnake = () => {
        // the new position of the snake's head
        let newHead = { x: snake[0].x, y: snake[0].y };
        if (direction === "up") newHead.x--;

        if (direction === "down") newHead.x++;

        if (direction === "left") newHead.y--;

        if (direction === "right") newHead.y++;

        // if the snake runs into itself or the edges of the grid, the game is over
        if (
          !ref.current.children[newHead.x * columns + newHead.y] ||
          snake.some((cell) => cell.x <= 0) ||
          snake.some((cell) => cell.y <= 0) ||
          snake.some((cell) => cell.x >= rows - 1) ||
          snake.some((cell) => cell.y >= columns - 1) ||
          snake.some((cell) => cell.x === newHead.x && cell.y === newHead.y)
        ) {
          // reset the game
          clearInterval(game);
          window.location.reload();
        }

        // if the snake eats the apple, the length of the snake increases and a new apple is generated
        if (newHead.x === apple.x && newHead.y === apple.y) {
          newApple();
        } else {
          snake.pop();
        }

        // the new position of the snake's head
        snake.unshift(newHead);

        // show the snake and the apple
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            // dont unglow the border cells
            if (
              (i === 0 || i === rows - 1 || j === 0 || j === columns - 1) &&
              !snake.some((cell) => cell.x === i && cell.y === j)
            ) {
              continue;
            }
            const element = ref.current.children[i * columns + j] || null;
            if (!element) return;
            element.classList.add(backgroundColor);
            element.classList.remove(primaryColor);
            element.classList.remove(secondaryColor);
          }
        }
        snake.forEach((cell) => {
          glowElementForever(cell.x, cell.y);
        });
        glowElementForever(apple.x, apple.y);
      };

      // the function to change the direction of the snake
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" && direction !== "down") direction = "up";
        if (e.key === "ArrowDown" && direction !== "up") direction = "down";
        if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
        if (e.key === "ArrowRight" && direction !== "left") direction = "right";
      });

      // run the game
      const game = setInterval(() => {
        moveSnake();
      }, rate);
    }, 1000);
    localStorage.setItem("mode", "snakeGame");
  };

  // ----- BLOAT CODE FOR TESTING -----

  window.addEventListener("keydown", (e) => {
    if (e.key === "0") {
      setHoverEffect(!hoverEffect);
      document.querySelector(".btn0") &&
        document.querySelector(".btn0").focus();
    }
    if (e.key === "1") {
      matrixRain(500, 1, 100, 1200);
      document.querySelector(".btn1") &&
        document.querySelector(".btn1").focus();
    }
    if (e.key === "2") {
      gameOfLife(200);
      document.querySelector(".btn2") &&
        document.querySelector(".btn2").focus();
    }
    if (e.key === "3") {
      firstOrderNuclearFission(200, 50);
      document.querySelector(".btn3") &&
        document.querySelector(".btn3").focus();
      !props.viewDetails && props.showDetails();
    }
    if (e.key === "4") {
      multiColor();
      document.querySelector(".btn4") &&
        document.querySelector(".btn4").focus();
    }
    if (e.key === "5") {
      snakeGame();
      document.querySelector(".btn5") &&
        document.querySelector(".btn5").focus();
    }
    if (e.key === "r") {
      localStorage.setItem("mode", "");
      window.location.reload();
    }
  });
  // eslint-disable-next-line
  if (localStorage.getItem("mode") == undefined)
    localStorage.setItem("mode", "matrixRain");
  if (localStorage.getItem("mode") === "matrixRain") {
    matrixRain(500, 1, 100, 1200);
  }
  if (localStorage.getItem("mode") === "gameOfLife") {
    gameOfLife(200);
  }
  if (localStorage.getItem("mode") === "firstOrderNuclearFission") {
    firstOrderNuclearFission(200, 50);
  }
  if (localStorage.getItem("mode") === "multiColor") {
    multiColor();
  }
  if (localStorage.getItem("mode") === "snakeGame") {
    snakeGame();
  }

  // ----- RETURN -----

  return (
    <div>
      {window.innerWidth >= 1200 ? (
        <div
          className={"flex items-center justify-between text-lg"}
          style={{
            width: `${cellSize * columns + gap * (columns - 1)}px`,
            height: `${cellSize}px`,
            marginBottom: `${gap}px`,
          }}
        >
          <div
            className="h-full flex items-center"
            style={{
              transition: "1s ease-in-out",
              opacity: props.viewDetails ? 0 : 1,
              pointerEvents: props.viewDetails ? "none" : "auto",
            }}
          >
            <button
              className={`text-white font-bold py-2 px-4 h-full text-xl rounded ${backgroundColor} hover:bg-cyan-600 focus:bg-cyan-600 focus:outline-none focus:border-none btn0`}
              style={{
                width: `${cellSize * 3 + gap * (3 - 1)}px`,
                borderRadius: `${(cellSize * borderRadius) / 100}px`,
                fontFamily: "Space Mono",
              }}
              onClick={() => {
                setHoverEffect(!hoverEffect);
              }}
            >
              Fn0
            </button>
            <button
              className={`text-white font-bold py-2 px-4 h-full text-xl rounded ${backgroundColor} hover:bg-cyan-600 focus:bg-cyan-600 focus:outline-none focus:border-none btn1`}
              style={{
                width: `${cellSize * 3 + gap * (3 - 1)}px`,
                borderRadius: `${(cellSize * borderRadius) / 100}px`,
                fontFamily: "Space Mono",
                marginLeft: `${gap}px`,
              }}
              onClick={() => {
                matrixRain(500, 1, 100, 800);
              }}
            >
              Fn1
            </button>
            <button
              className={`text-white font-bold py-2 px-4 h-full text-xl rounded ${backgroundColor} hover:bg-cyan-600 focus:bg-cyan-600 focus:outline-none focus:border-none btn2`}
              style={{
                width: `${cellSize * 3 + gap * (3 - 1)}px`,
                borderRadius: `${(cellSize * borderRadius) / 100}px`,
                fontFamily: "Space Mono",
                marginLeft: `${gap}px`,
              }}
              onClick={() => {
                gameOfLife(200);
              }}
            >
              Fn2
            </button>
            <button
              className={`text-white font-bold py-2 px-4 h-full text-xl rounded ${backgroundColor} hover:bg-cyan-600 focus:bg-cyan-600 focus:outline-none focus:border-none btn3`}
              style={{
                width: `${cellSize * 3 + gap * (3 - 1)}px`,
                borderRadius: `${(cellSize * borderRadius) / 100}px`,
                fontFamily: "Space Mono",
                marginLeft: `${gap}px`,
              }}
              onClick={() => {
                firstOrderNuclearFission(200, 50);
                !props.viewDetails && props.showDetails();
              }}
            >
              Fn3
            </button>
            <button
              className={`text-white font-bold py-2 px-4 h-full text-xl rounded ${backgroundColor} hover:bg-cyan-600 focus:bg-cyan-600 focus:outline-none focus:border-none btn4`}
              style={{
                width: `${cellSize * 3 + gap * (3 - 1)}px`,
                borderRadius: `${(cellSize * borderRadius) / 100}px`,
                fontFamily: "Space Mono",
                marginLeft: `${gap}px`,
              }}
              onClick={() => {
                multiColor();
              }}
            >
              Fn4
            </button>
            <button
              className={`text-white font-bold py-2 px-4 h-full text-xl rounded ${backgroundColor} hover:bg-cyan-600 focus:bg-cyan-600 focus:outline-none focus:border-none btn5`}
              style={{
                width: `${cellSize * 3 + gap * (3 - 1)}px`,
                borderRadius: `${(cellSize * borderRadius) / 100}px`,
                fontFamily: "Space Mono",
                marginLeft: `${gap}px`,
              }}
              onClick={() => {
                snakeGame();
              }}
            >
              Fn5
            </button>
          </div>
          <button
            className={`text-white font-bold py-2 px-4 h-full text-xl rounded ${backgroundColor} hover:bg-cyan-600 focus:bg-cyan-600 focus:outline-none focus:border-none`}
            style={{
              width: `${cellSize * 3 + gap * (3 - 1)}px`,
              borderRadius: `${(cellSize * borderRadius) / 100}px`,
              fontFamily: "Space Mono",
              marginLeft: `${gap}px`,
            }}
            onClick={() => {
              localStorage.setItem("mode", "");
              window.location.reload();
            }}
          >
            Rst
          </button>
        </div>
      ) : null}
      <div
        className="w-full h-full grid"
        ref={ref}
        style={{
          gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
          gridGap: `${gap}px`,
          pointerEvents: props.viewDetails ? "none" : "auto",
        }}
      >
        {
          // fill the grid with divs
          Array.from({ length: rows * columns }).map((_, i) => (
            <div
              key={i}
              className={"flex items-center justify-center " + backgroundColor}
              onMouseOver={(e) => {
                // glow the div when hovered over
                hoverEffect && glow(e);
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
                  hoverEffect && glowDim(e);
                }, 500);
                setTimeout(() => {
                  hoverEffect && glowOff(e);
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
