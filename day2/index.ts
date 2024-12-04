export default function day2(input: string) {
    const lines = input.split('\n');
    
    const sequences = lines
        .map(line => line.split(' ')
        .filter(x => x !== ' ')
        .map(Number));

    const sequenceAndSafty = sequences.map(seq => {
        return { seq, safe: isSafeSequence(seq) };
    });

    return sequenceAndSafty.filter(x => x.safe).length;
}

function isSafeSequence(seq: number[]) {
    let previousDirection = "";

    for (let i = 1; i < seq.length; i++) {
        const prev = seq[i - 1];
        const current = seq[i];

        const difference = Math.abs(prev - current);
        const increasing = prev < current;
        const decreasing = prev > current;

        if (increasing && previousDirection === "decreasing") {
            console.log("Unsafe", seq);
            return false;
        }

        if (decreasing && previousDirection === "increasing") {
            console.log("Unsafe", seq);
            return false;
        }

        previousDirection = increasing ? "increasing" : "decreasing";

        const safe = difference >= 1 && difference <= 3;

        if (!safe) {
            console.log("Unsafe", seq);
            return false;
        }
    }

    console.log("Safe", seq);
    return true;
}