import fs from 'fs';
import { describe, it, assert } from 'vitest';
import day3 from './index';

const example = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`.trim();
const example2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))".trim();

const fileContents = fs.readFileSync('./day3/input.txt', 'utf8')
const input = fileContents.trim();

describe('Day 3', () => {
    it("part 1 - example", () => {
        const result = day3(example);
        assert.equal(result, 161);
    });

    it("part 1 - input", () => {
        const result = day3(input);
        assert.equal(result, 181345830);
    });

    it("part 2 - do and don't example", () => {
        const result = day3(example2, true);
        assert.equal(result, 48);
    });

    it("part 2 - do and don't input", () => {
        const result = day3(input, true);
        assert.equal(result, 98729041);
    });
});