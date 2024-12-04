export default function(input: string) {
    const grid = input.split('\n').map(row => row.split(''));
    const width = grid.length;

    let totalFound = 0;
    
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
            const wordsFoundFromLocation = checkGridLocation(grid, x, y);
            totalFound += wordsFoundFromLocation;            
        }
    }
   
    return totalFound;
}

function checkGridLocation(grid: string[][], x: number, y: number) {
    const startValue = grid[x][y];
    if (startValue !== 'X') {
        return 0;
    }

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
        const nextThreeCells = [
            grid[x + dx]?.[y + dy],
            grid[x + (2 * dx)]?.[y + (2 * dy)],
            grid[x + (3 * dx)]?.[y + (3 * dy)]
        ];

        const value = "X" + nextThreeCells.join(''); //?
        if (value === 'XMAS') {
            matches++; //?
        }
    }

    return matches;
}