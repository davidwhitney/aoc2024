export default function day2(input: string, dampen: boolean = false) {
    const lines = input.split('\n');
    
    const sequences = lines
        .map(line => line.split(' ')
        .filter(x => x !== ' ')
        .map(Number));

    const sequenceAndSafty = sequences.map(seq => {
        return { seq, safe: isSafeSequence(seq, dampen) };
    });

    return sequenceAndSafty.filter(x => x.safe).length;
}

function isSafeSequence(seq: number[], dampen: boolean) {
    let previousDirection = "";

    for (let i = 0; i < seq.length - 1; i++) {
        const current = seq[i];
        const next = seq[i + 1];

        const difference = Math.abs(current - next);
        const increasing = next > current;
        const decreasing = next < current;
        
        let safe = difference >= 1 && difference <= 3;

        if ((increasing && previousDirection === "decreasing")
            || (decreasing && previousDirection === "increasing")) {
            safe = false;
        }

        previousDirection = increasing ? "increasing" : "decreasing";

        if (!safe) {
            return false;
        }
    }

    return true;
}