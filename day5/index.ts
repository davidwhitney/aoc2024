export default function(input: string) {
    const { orderRules, printSchedules } = parse(input);

    console.log(printSchedules);

    const validSchedules: number[][] = []

    for (const schedule of printSchedules) {
        const isValid = isValidSchedule(schedule, orderRules);
        if (isValid) {
            validSchedules.push(schedule);
        }
    }

    let checksum = 0;
    for (const schedule of validSchedules) {
        const middleIndex = Math.floor(schedule.length / 2);
        checksum += schedule[middleIndex];
    }

    return checksum;
}

function isValidSchedule(schedule: number[], orderRules: number[][]) {
    console.log("Assessing", schedule);

    const rulesClone = [...orderRules];
    const applicableRules: number[][] = [];

    for (const rule of rulesClone) {
        if (schedule.includes(rule[0]) && schedule.includes(rule[1])) {
            applicableRules.push(rule);
        }
    }

    console.log("Applicable rules count:", applicableRules.length + "/" + orderRules.length);

    for (const [before, after] of applicableRules) {
        const beforeIndex = schedule.indexOf(before);
        const afterIndex = schedule.indexOf(after);

        if (beforeIndex > afterIndex) {
            console.log(before, "should come before", after);
            console.log("Invalid schedule", schedule);
            return false;
        }
    }

    return true;
}

function parse(input: string): { orderRules: number[][], printSchedules: number[][] } {
    const orderRules: number[][] = [];
    const printSchedules: number[][] = []

    let secondBlock = false;
    const lines = input.split('\n');
    for (const line of lines) {
        if (line.trim().length === 0) {
            secondBlock = true;
            continue;
        }

        if (!secondBlock) {
            const [before, after] = line.split('|').map(x => x.trim()).map(x => parseInt(x));
            orderRules.push([before, after]);
        } else {
            const schedule = line.split(',').map(x => x.trim()).map(x => parseInt(x));
            printSchedules.push(schedule);
        }
    }

    return { orderRules, printSchedules };
}
