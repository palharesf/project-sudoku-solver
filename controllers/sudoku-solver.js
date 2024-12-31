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
    return rowValues.indexOf(value) === -1;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let colValues = [];
    for (let i = 0; i < 9; i++) {
      colValues.push(puzzleString[column - 1 + (i * 9)]);
    }
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
    return regionValues.indexOf(value) === -1;
  }

  solve(puzzleString) {
    // The solve function should handle solving any given valid puzzle string, not just the test inputs and solutions. You are expected to write out the logic to solve this.
  }
}

module.exports = SudokuSolver;

