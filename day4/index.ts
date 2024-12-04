export default function(input: string) {
    const grid = Grid.fromText(input);
    const target = "XMAS";
    const crossTarget = "MAS";
    const crossTargetReversed = "SAM";

    let totalFound = 0;
    let crossFound = 0;

    for (const [x, y] of grid.locations()) {    
        const wordSearchMatches = grid.getValue(wordSearchMatchPatternFor(x, y, target.length));
        const crossMatches = grid.getValue(crossPatternFor(x, y));
        const crossMatched = crossMatches.every(c => c === crossTarget || c === crossTargetReversed);

        totalFound += wordSearchMatches.filter(c => c === target).length;      
        crossFound += crossMatched ? 1: 0;        
    }
   
    return [totalFound, crossFound];
}

class Grid {
    constructor(private grid: string[][]) {}

    public* locations() {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                yield [x, y];
            }
        }
    }

    public getValue(locations: number[][][] | Generator<number[][]>) {
        locations = Array.isArray(locations) ? locations : [...locations];
        return locations.map((coords) => coords.map(([x, y]) => this.grid[y]?.[x]).join(''));
    }

    static fromText(input: string) {
        return new Grid(input.split('\n').map(row => row.split('')));
    }
}

function* wordSearchMatchPatternFor(x: number, y: number, length: number) {
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
    
    for (const [dx, dy] of directions) {
        const locations: number[][] = [];

        for (let i = 0; i < length; i++) {
            const location = [x + ((i) * dx), y + ((i) * dy)];
            locations.push(location);
        }

        yield locations;
    }    
}

function* crossPatternFor(x: number, y: number) {
    yield [[x - 1, y - 1], [x, y], [x + 1, y + 1]];
    yield [[x + 1, y - 1], [x, y], [x - 1, y + 1]];
    yield [[x - 1, y + 1], [x, y], [x + 1, y - 1]];
    yield [[x + 1, y + 1], [x, y], [x - 1, y - 1]];    
}
