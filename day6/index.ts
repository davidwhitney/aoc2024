type Direction = 'N' | 'E' | 'S' | 'W';
type Location = { row: number, col: number };
type Position = Location & { direction: Direction };

const movement = new Map<Direction, { row: number, col: number }>();
movement.set('N', { row: -1, col: 0 });
movement.set('E', { row: 0, col: 1 });
movement.set('S', { row: 1, col: 0 });
movement.set('W', { row: 0, col: -1 });

export default function(input: string) {
    let { map, currentLoc } = parseMap(input);
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
            case '.':
                if (!visited.some(x => locationEquals(x, nextLoc))) {
                    visited.push({ col: nextLoc.col, row: nextLoc.row });
                }

                currentLoc = { ...nextLoc };
                break;
            case '#':
                currentLoc = { ...currentLoc, direction: turnRight(currentLoc.direction) };
                break;
        }
    }

    return visited;
}

function parseMap(input: string) {
    const rows = input.split('\n');
    const map = rows.map(row => row.split(''));
    
    const startRow = map.findIndex(row => row.includes('^'));
    const startCol = map[startRow].indexOf('^');
    map[startRow][startCol] = '.';

    return {
        map: map,
        currentLoc: { row: startRow, col: startCol, direction: 'N' } as Position
    };
}

function locationEquals(a: Location, b: Location) {
    return a.row === b.row && a.col === b.col;
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