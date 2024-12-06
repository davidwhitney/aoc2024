type Direction = 'N' | 'E' | 'S' | 'W';
type Location = { row: number, col: number };
type Position = Location & { direction: Direction };

const directionDeltas = new Map<Direction, { row: number, col: number }>();
directionDeltas.set('N', { row: -1, col: 0 });
directionDeltas.set('E', { row: 0, col: 1 });
directionDeltas.set('S', { row: 1, col: 0 });
directionDeltas.set('W', { row: 0, col: -1 });

export default function(input: string) {
    const rows = input.split('\n');
    const map = rows.map(row => row.split(''));
    
    const startRow = map.findIndex(row => row.includes('^'));
    const startCol = map[startRow].indexOf('^');
    map[startRow][startCol] = '.';

    let position: Position = { row: startRow, col: startCol, direction: 'N' };
    const visited: Location[] = [
        { col: startCol, row: startRow }
    ];
    
    while (true) {
        const delta = directionDeltas.get(position.direction)!;
        const nextPosition: Position = { 
            row: position.row + delta.row, 
            col: position.col + delta.col, 
            direction: position.direction 
        };

        if (!inBounds(nextPosition, map)) {
            break;
        }

        const nextChar = map[nextPosition.row][nextPosition.col];
        switch (nextChar) {
            case '.':
                if (!visited.some(visit => visit.row === nextPosition.row && visit.col === nextPosition.col)) {
                    visited.push({ col: nextPosition.col, row: nextPosition.row });
                }

                position = { ...nextPosition };
                break;
            case '#':
                position = { ...position, direction: turnRight(position.direction) };
                break;
        }
    }

    return visited;
}

function inBounds(position: Location, map: string[][]) {    
    return position.row >= 0 
        && position.row < map.length 
        && position.col >= 0 
        && position.col < map[0].length;
}

function turnRight(direction: Direction): Direction {
    const indexOfCurrentDirection = Array.from(directionDeltas.keys()).indexOf(direction);
    return Array.from(directionDeltas.keys())[(indexOfCurrentDirection + 1) % 4];
}