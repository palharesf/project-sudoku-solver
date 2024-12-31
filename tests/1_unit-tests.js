const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {
    suite('validate()', () => {
        test('handles a valid puzzle string of 81 characters', () => {
            solver = new Solver();
            const result = solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');
            assert.deepEqual(result, true);
        });

        test('handles a puzzle string with invalid characters (not 1-9 or .)', () => {
            solver = new Solver();
            const result = solver.validate("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.+");
            assert.deepEqual(result, { error: 'Invalid characters in puzzle' });
        });

        test('handles a puzzle string that is not 81 characters in length', () => {
            solver = new Solver();
            const result = solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37');
            assert.deepEqual(result, { error: 'Expected puzzle to be 81 characters long' });
        });
    });

    suite('checkRowPlacement()', () => {
        test('handles a valid row placement', () => {
            solver = new Solver();
            const result = solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 1, '1');
            assert.deepEqual(result, true);
        });

        test('handles an invalid row placement', () => {
            solver = new Solver();
            const result = solver.checkRowPlacement("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",1,4,"1");
            assert.deepEqual(result, false);
        });
    });

    suite('checkColPlacement()', () => {
        test('handles a valid column placement', () => {
            solver = new Solver();
            const result = solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 1, '1');
            assert.deepEqual(result, true);
        });

        test('handles an invalid column placement', () => {
            solver = new Solver();
            const result = solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 1, '3');
            assert.deepEqual(result, false);
        });
    });

    suite('checkRegionPlacement()', () => {
        test('handles a valid region placement', () => {
            solver = new Solver();
            const result = solver.checkRegionPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 1, '1');
            assert.deepEqual(result, true);
        });

        test('handles an invalid region placement', () => {
            solver = new Solver();
            const result = solver.checkRegionPlacement("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",1,7,"2");
            assert.deepEqual(result, false);
        });
    });

    suite('solve()', () => {
        test('valid puzzle string passes the solver', () => {
            solver = new Solver();
            const result = solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');
            assert.deepEqual(result, '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
        });

        test('invalid puzzle strings fail the solver', () => {
            solver = new Solver();
            const result = solver.solve("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.");
            assert.deepEqual(result, {error: "Expected puzzle to be 81 characters long",});
        });

        test('solver returns the expected solution for an incomplete puzzle', () => {
            solver = new Solver();
            const result = solver.solve("82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51");
            assert.deepEqual(result,"827549163531672894649831527496157382218396475753284916962415738185763249374928651");
        });
    });

});
