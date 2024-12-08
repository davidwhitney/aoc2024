type Direction = 'N' | 'E' | 'S' | 'W';
type Location = { row: number, col: number };
type Position = Location & { direction: Direction };

const movement = new Map<Direction, { row: number, col: number }>();
movement.set('N', { row: -1, col: 0 });
movement.set('E', { row: 0, col: 1 });
movement.set('S', { row: 1, col: 0 });
movement.set('W', { row: 0, col: -1 });

export default function walk(input: string | string[][]) {
    let { map, currentLoc } = parseMap(input);

    let loopDetected = false;
    const visited: Location[] = [currentLoc];
    
    while (true) {       
        const delta = movement.get(currentLoc.direction)!;
        const nextLoc: Position = { 
            row: currentLoc.row + delta.row, 
            col: currentLoc.col + delta.col, 
            direction: currentLoc.direction 
        };

        if (!inBounds(nextLoc, map)) {
            break;
        }

        switch (map[nextLoc.row][nextLoc.col]) {
            case '#':
            case 'O':
                currentLoc = { ...currentLoc, direction: turnRight(currentLoc.direction) };
                break;                
            case '.':
                if (!visited.some(x => locationEquals(x, nextLoc))) {
                    visited.push({ col: nextLoc.col, row: nextLoc.row });
                }

                currentLoc = { ...nextLoc };
                break;
        }

    }

    return { visited, loopDetected };
}

export function countInfiniteLoopObstructions(input: string) {
    const regularRoutePath = walk(input);

    let loopsFound = 0;
    for (const location of regularRoutePath.visited) {
        const { map, currentLoc } = parseMap(input, false);

        if (locationEquals(location, currentLoc)) {
            // Don't obstruct start position
            continue;
        }

        // Add obstruction on route
        map[location.row][location.col] = 'O';
        const { loopDetected } = walk(map);

        if (loopDetected) {
            loopsFound++;
        }
    }

    return loopsFound;
}

function parseMap(input: string | string[][], removeStart = true) {
    const map = Array.isArray(input) 
        ? input 
        : input.split('\n').map(row => row.split(''));

    const { row, col } = findStartPosition(map);

    if (removeStart) {
        map[row][col] = '.';
    }

    return {
        map: map,
        currentLoc: { row, col, direction: 'N' } as Position
    };
}

function findStartPosition(map: string[][]) {
    const startRow = map.findIndex(row => row.includes('^'));
    const startCol = map[startRow].indexOf('^');
    return { row: startRow, col: startCol };
}

function locationEquals(a: Location, b: Location) {
    return a.row === b.row && a.col === b.col;
}

function positionEquals(a: Position, b: Position) {
    return locationEquals(a, b) && a.direction === b.direction;
}

function inBounds(position: Location, map: string[][]) {    
    return position.row >= 0 
        && position.row < map.length 
        && position.col >= 0 
        && position.col < map[0].length;
}

function turnRight(direction: Direction): Direction {
    const indexOfCurrentDirection = Array.from(movement.keys()).indexOf(direction);
    return Array.from(movement.keys())[(indexOfCurrentDirection + 1) % 4];
}