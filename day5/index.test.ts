import fs from 'fs';
import { describe, it, assert, expect } from 'vitest';
import day5 from './index';

const testInput = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`.trim();

const fileContents = fs.readFileSync('./day5/input.txt', 'utf8')
const input = fileContents.trim();

describe('Day 4', () => {
    it("part 1 - example", () => {
        const result = day5(testInput);
        expect(result).toEqual(143);
    });

    it("part 1 - input", () => {
        const result = day5(input);
        expect(result).toEqual(4135);
    });
   
});

