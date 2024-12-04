const mulRegex = /mul\((\d+),(\d+)\)/g;

export default function(block: string, supportDoAndDont = false) {
    if (supportDoAndDont) {      
        block = preProcessBlock(block);;
    }

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

function preProcessBlock(block: string) {
    const blocks = block.split(/(don't)|(do)/g).filter(b => b && b.length > 0);

    let process = true;
    let newBlock = "";

    for (const b of blocks) {
        if (b === "do") {
            process = true;
            continue;
        } else if (b === "don't") {
            process = false;
            continue;
        }
        
        if (process) {
            newBlock += b;
        }
    }

    return newBlock;
}