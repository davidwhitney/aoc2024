import fs from 'fs';
import { describe, it, assert, expect } from 'vitest';
import predictPath, { countInfiniteLoopObstructions } from './index';

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

const fileContents = fs.readFileSync('./input.txt', 'utf8')
const input = fileContents.trim();

describe('Day 4', () => {
    it("part 1 - example", () => {
        const { visited } = predictPath(example);
        expect(visited.length).toEqual(41);
    });

    it("part 1 - input", () => {
        const { visited } = predictPath(input);
        expect(visited.length).toEqual(5095);
    });

    // it("part 2 - example", () => {
    //     const count = countInfiniteLoopObstructions(example);
    //     expect(count).toEqual(6);
    // });

    // it("part 2 - input", () => {
    //     const count = countInfiniteLoopObstructions(input);
    //     expect(count).toEqual(6);
    // });
   
});

