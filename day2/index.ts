export default function day2(input: string) {
    let total = 0;
    const lines = input.split('\n');

    console.log("Found", lines.length, "lines");

    for (const line of lines) {
        const numbers = line
            .split(' ')
            .filter(x => x !== ' ')
            .map(Number);

        console.log(numbers.length);

        const safe = isSafeSequence(numbers);
        if (safe) {
            total++;
        }
    }

  return total;
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