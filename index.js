const { Engine, Render, Runner, World, Bodies } = Matter;

const cells = 3;
const width = 600;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true,
    width,
    height
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
];
World.add(world, walls);

// Maze generation
const shuffle = arr => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepThroughCell = (row, column) => {
  // If i have visited the cell at [row,column] return
  if (grid[row][column]) {
    return;
  }
  // Mark this cell as being visited
  grid[row][column] = true;
  // Assemble randomly-ordered list of all neightbrs
  const neighbors = shuffle([
    [row - 1, column, "up"],
    [row, column + 1, "right"][(row + 1, column, "down")],
    [row, column - 1, "left"]
  ]);

  console.log(neighbors);
  // For each neighbour...
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;
    //See if that neignour is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells
    )
      continue;

    // If we have visited that neignour, continue to next neighbou
    if (grid[nextRow][nextColumn]) {
      continue;
    }
    // Remove a wall form either horizontal or verticals array
    if (direction === "left") {
      verticals[row][column - 1] = true;
    } else if (direction === "right") {
      verticals[row][column] = true;
    }
  }
  // Visit that next cell
};

stepThroughCell(1, 1);

// const grid = [];

// for (let i = 0; i < 3; i++) {
//   grid.push([]);
//   for (let j = 0; j < 3; j++) {
//     grid[i].push(false);
//   }
// }

// console.log(grid);

// const {
//   Engine,
//   Render,
//   Runner,
//   World,
//   Bodies,
//   MouseConstraint,
//   Mouse
// } = Matter;

// const width = 800;
// const height = 600;

// const engine = Engine.create();
// const { world } = engine;
// const render = Render.create({
//   element: document.body,
//   engine: engine,
//   optionns: {
//     wireframes: false,
//     width,
//     height
//   }
// });
// Render.run(render);
// Runner.run(Runner.create(), engine);

// World.add(
//   world,
//   MouseConstraint.create(engine, {
//     mouse: Mouse.create(render.canvas)
//   })
// );

// // Walls
// const walls = [
//   Bodies.rectangle(400, 0, 800, 49, {
//     isStatic: true
//   }),
//   Bodies.rectangle(400, 600, 800, 40, {
//     isStatic: true
//   }),
//   Bodies.rectangle(0, 300, 40, 600, {
//     isStatic: true
//   }),
//   Bodies.rectangle(800, 300, 40, 600, {
//     isStatic: true
//   })
// ];

// World.add(world, walls);

// // Random Shapes
// for (let i = 0; i < 40; i++) {
//   if (Math.random() > 0.5) {
//     World.add(
//       world,
//       Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50)
//     );
//   } else {
//     World.add(
//       world,
//       Bodies.circle(Math.random() * width, Math.random() * height, 35, {
//         render: {
//           fillStyle: "red"
//         }
//       })
//     );
//   }
// }
