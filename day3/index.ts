const mulRegex = /mul\((\d+),(\d+)\)/g;

export default function(block: string) {
    const occurrences = (block.match(mulRegex) || []);
    return occurrences.reduce((acc, occurrence) => {
        return acc + processOp(occurrence);
    }, 0);
}

function processOp(op: string) {    
    const matches = op.matchAll(mulRegex);
    if (!matches) {
        return 0;
    }

    for (const match of matches) {
        const x = parseInt(match[1]);
        const y = parseInt(match[2]);
        const result = x * y;

        return result;
    }

    return 0;    
}