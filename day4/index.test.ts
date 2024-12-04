import fs from 'fs';
import { describe, it, assert } from 'vitest';
import day4 from './index';

const testInput = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.trim();

const fileContents = fs.readFileSync('./day4/input.txt', 'utf8')
const input = fileContents.trim();

describe('Day 4', () => {
    it("part 1 - example", () => {
        const result = day4(testInput);
        assert.equal(result[0], 18);
        assert.equal(result[1], 9);
    });

    it("part 1 - examinputple", () => {
        const result = day4(input);
        assert.equal(result[0], 2567);
        assert.equal(result[1], 2029);
    });
   
});

