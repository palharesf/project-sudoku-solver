class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return { error: "Expected puzzle to be 81 characters long" };
    }
    const validChars = /^[1-9.]$/;
    for (let char of puzzleString) {
      if (!validChars.test(char)) {
        return { error: "Invalid characters in puzzle" };
      }
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let startCol = ((row - 1) * 9);
    let endCol = startCol + 9;
    let rowValues = puzzleString.slice(startCol, endCol);
    if (rowValues[column - 1] === value) return true;
    return rowValues.indexOf(value) === -1;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let colValues = [];
    for (let i = 0; i < 9; i++) {
      colValues.push(puzzleString[column - 1 + (i * 9)]);
    }
    if (colValues[row - 1] === value) return true;
    return colValues.indexOf(value) === -1;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let regionRow = Math.floor((row - 1) / 3) * 3;
    let regionCol = Math.floor((column - 1) / 3) * 3;
    let regionValues = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        regionValues.push(puzzleString[(regionRow + i) * 9 + (regionCol + j)]);
      }
    }
    if (regionValues[(row - 1) % 3 * 3 + (column - 1) % 3] === value) {
      return true;
    }
    return regionValues.indexOf(value) === -1;
  }

  solve(puzzleString) {
    let puzzle = puzzleString.split('');
    for (let i = 0; i < 81; i++) {
      if (puzzle[i] === '.') {
        for (let val = 1; val <= 9; val++) {
          if (this.checkRowPlacement(puzzle.join(''), Math.floor(i / 9) + 1, i % 9 + 1, val.toString()) &&
              this.checkColPlacement(puzzle.join(''), Math.floor(i / 9) + 1, i % 9 + 1, val.toString()) &&
              this.checkRegionPlacement(puzzle.join(''), Math.floor(i / 9) + 1, i % 9 + 1, val.toString())) {
            puzzle[i] = val.toString();
            const solved = this.solve(puzzle.join(''));
            if (solved) return solved;
            puzzle[i] = '.';
          }
        }
        return false;
      }
    }
    return puzzle.join('');
  }
}

module.exports = SudokuSolver;

