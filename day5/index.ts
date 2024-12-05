export default function(input: string) {
    const { orderRules, printSchedules } = parse(input);
    
    const validSchedules = printSchedules.filter(schedule => isValidSchedule(schedule, orderRules));
    const invalidSchedules = printSchedules.filter(schedule => !isValidSchedule(schedule, orderRules));
    const correctedSchedules = invalidSchedules.map(schedule => reorder(schedule, orderRules));

    return [
        checksum(validSchedules), 
        checksum(correctedSchedules)
    ];
}

function checksum(schedules: number[][]) {
    return schedules.reduce((acc, schedule) => {
        const middleIndex = Math.floor(schedule.length / 2);
        return acc + schedule[middleIndex]
    }, 0);
}

function applicableRulesFor(schedule: number[], orderRules: number[][]) {
    return orderRules.filter(([before, after]) => schedule.includes(before) && schedule.includes(after));
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
