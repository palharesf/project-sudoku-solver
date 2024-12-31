"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    const validPuzzle = solver.validate(puzzle);
    if (validPuzzle !== true) {
      return res.json(validPuzzle);
    }

    const letterToNumber = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
      H: 8,
      I: 9,
    };
    const row = letterToNumber[coordinate[0]];
    const column = Number(coordinate[1]);

    const validRow = solver.checkRowPlacement(puzzle, row, column, value);
    const validColumn = solver.checkColPlacement(puzzle, row, column, value);
    const validRegion = solver.checkRegionPlacement(puzzle, row, column, value);

    const validPlacement =
      validRow && validColumn && validRegion;
    if (validPlacement == true) {
      return res.json({ valid: validPlacement });
    } else {
      const conflict = [];
      if (!validPuzzle) conflict.push("puzzle");
      if (!validRow) conflict.push("row");
      if (!validColumn) conflict.push("column");
      if (!validRegion) conflict.push("region");
      res.json({ valid: validPlacement, conflict: conflict });
    }
  });

  app.route("/api/solve").post((req, res) => {
    if (!req.body.puzzle) {
      return res.json({ error: "Required field missing" });
    }

    const validPuzzle = solver.validate(req.body.puzzle);
    if (validPuzzle !== true) {
      return res.json(validPuzzle);
    }

    const solution = solver.solve(req.body.puzzle);
    if (!solution) {
      return res.json({ error: "Puzzle cannot be solved" });
    } else {
      return res.json({ solution: solution });
    }
  });
};
