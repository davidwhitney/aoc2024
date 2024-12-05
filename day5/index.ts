export default function(input: string) {
    const { orderRules, printSchedules } = parse(input);
    const validSchedules: number[][] = [];
    const invalidSchedules: number[][] = [];

    for (const schedule of printSchedules) {
        if (isValidSchedule(schedule, orderRules)) {
            validSchedules.push(schedule);
        } else {
            invalidSchedules.push(schedule);
        }
    }

    const correctedSchedules: number[][] = [];
    for (const schedule of invalidSchedules) {
        const corrected = reorder(schedule, orderRules);
        correctedSchedules.push(corrected);
        console.log("Corrected", schedule, corrected);
    }

    const validChecksum = validSchedules.reduce((acc, schedule) => {
        const middleIndex = Math.floor(schedule.length / 2);
        return acc + schedule[middleIndex]
    }, 0);

    const correctedChecksum = correctedSchedules.reduce((acc, schedule) => {
        const middleIndex = Math.floor(schedule.length / 2);
        return acc + schedule[middleIndex]
    }, 0);

    return [validChecksum, correctedChecksum];
}

function applicableRulesFor(schedule: number[], orderRules: number[][]) {
    const applicableRules: number[][] = [];
    for (const rule of orderRules) {
        if (schedule.includes(rule[0]) && schedule.includes(rule[1])) {
            applicableRules.push(rule);
        }
    }

    return applicableRules;
}

function reorder(schedule: number[], orderRules: number[][]) {    
    const applicableRules = applicableRulesFor(schedule, orderRules);
    let scheduleShuffled = [...schedule];

    do {
        for (const rule of applicableRules) {
            const [before, after] = rule;
            const beforeIndex = scheduleShuffled.indexOf(before);
            const afterIndex = scheduleShuffled.indexOf(after);

            if (beforeIndex > afterIndex) {
                const beforeIndex = scheduleShuffled.indexOf(before);
                const afterIndex = scheduleShuffled.indexOf(after);

                scheduleShuffled.splice(beforeIndex, 1);
                scheduleShuffled.splice(afterIndex, 0, before);
            }
        }
    } while (!isValidSchedule(scheduleShuffled, orderRules));

    return scheduleShuffled;
}

function isValidSchedule(schedule: number[], orderRules: number[][]) {
    const applicableRules = applicableRulesFor(schedule, orderRules);
    for (const [before, after] of applicableRules) {
        const beforeIndex = schedule.indexOf(before);
        const afterIndex = schedule.indexOf(after);

        if (beforeIndex > afterIndex) {
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
