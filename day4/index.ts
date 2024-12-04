import { start } from "repl";

export default function(input: string) {
    const grid = input.split('\n').map(row => row.split(''));
    const width = grid.length;

    let totalFound = 0;
    let crossFound = 0;
    
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < width; x++) {
            const wordsFoundFromLocation = checkGridLocation(grid, x, y, "XMAS");
            totalFound += wordsFoundFromLocation;       
            crossFound += checkGridLocationForX_Mas(grid, x, y, "MAS");     
        }
    }

    console.log(`Total found: ${totalFound}`);
    console.log(`Cross found: ${crossFound}`);
   
    return [totalFound, crossFound];
}

function checkGridLocation(grid: string[][], x: number, y: number, target: string) {
    let matches = 0;

    const directions = [
        [1, 0], 
        [-1, 0], 
        [0, 1], 
        [0, -1],
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1]
    ];

    for (const direction of directions) {
        const [dx, dy] = direction;

        const targetCells: any[] = [
            grid[y][x]
        ];

        for (let i = 0; i < target.length - 1; i++) {
            const cell = grid[y + ((i + 1) * dy)]?.[x + ((i + 1) * dx)];
            targetCells.push(cell);
        }        

        const value = targetCells.join('');
        if (value === target) {
            matches++;
        }
    }

    return matches;
}

function checkGridLocationForX_Mas(grid: string[][], x: number, y: number, target: string) {
    let matches = 0;
    const reversedTarget = target.split('').reverse().join('');

    const directions = [
        [-1, -1],
        [1, -1],
    ];

    const captures: string[] = [];

    for (const direction of directions) {
        const [dx, dy] = direction;

        const targetCells: any[] = [
            grid[y + dy]?.[x + dx],
            grid[y][x],
            grid[y - dy]?.[x - dx]
        ];

        const value = targetCells.join('');
        captures.push(value);
    }

    if (captures.every(c => c === target || c === reversedTarget)) {
        matches++;
    }

    return matches;
}