import fs from 'fs';
import { describe, it, assert, expect } from 'vitest';
import predictPath from './index';

const example = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.trim();

const fileContents = fs.readFileSync('./day6/input.txt', 'utf8')
const input = fileContents.trim();

describe('Day 4', () => {
    it("part 1 - example", () => {
        const path = predictPath(example);
        expect(path.length).toEqual(41);
    });

    it("part 1 - input", () => {
        const path = predictPath(input);
        expect(path.length).toEqual(5095);
    });
   
});

