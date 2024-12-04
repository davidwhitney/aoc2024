import fs from 'fs';
import { describe, it, assert } from 'vitest';
import day2 from '.';

const testInput = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`.trim();

const fileContents = fs.readFileSync('./day2/input.txt', 'utf8')
const input = fileContents.trim();

describe('Day 2', () => {
    it("part 1 - are reports safe example", () => {
        const result = day2(testInput);
        assert.equal(result, 2);
    });
    
    it("part 1 - are reports safe example", () => {
        const result = day2(input);
        assert.equal(result, 479);
    });

    it("part 2 - are reports safe example", () => {
        const result = day2(testInput, true);
        assert.equal(result, 4);
    });
        
    it("part 2 - are reports safe example", () => {
        const result = day2(input, true);
        assert.equal(result, 531);
    });
});