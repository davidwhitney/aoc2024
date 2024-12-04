export default function(input: string) {
    const grid = input.split('\n').map(row => row.split(''));
    const width = grid.length;

    let totalFound = 0;
    
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
            const wordsFoundFromLocation = checkGridLocation(grid, x, y, "XMAS");
            totalFound += wordsFoundFromLocation;            
        }
    }
   
    return totalFound;
}

function checkGridLocation(grid: string[][], x: number, y: number, target: string) {
    const startValue = grid[x][y];
    if (startValue !== target[0]) {
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

        const targetCells: any[] = [
            grid[x][y]
        ];

        for (let i = 0; i < target.length - 1; i++) {
            const cell = grid[x + ((i + 1) * dx)]?.[y + ((i + 1) * dy)];
            targetCells.push(cell);
        }        

        const value = targetCells.join('');
        if (value === target) {
            matches++;
        }
    }

    return matches;
}