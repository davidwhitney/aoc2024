import fs from 'fs';

let input = `
3   4
4   3
2   5
1   3
3   9
3   3`.trim();

const fileContents = fs.readFileSync('input.txt', 'utf8')
input = fileContents.trim();
const asLines = input.split('\n');

const asPairs = asLines.map(line => line.split('   '));
const list1 = asPairs.map(pair => parseInt(pair[0]));
const list2 = asPairs.map(pair => parseInt(pair[1]));

function part1() {
    const orderedList1 = list1.sort((a, b) => a - b);
    const orderedList2 = list2.sort((a, b) => a - b);
    const pairs = orderedList1.map((num, i) => [num, orderedList2[i]]);

    const pairsWithDistance = pairs.map(pair => {
        const [first, second] = pair;
        return [first, second, Math.abs(first - second)];
    });

    return pairsWithDistance.reduce((acc, values) => acc + values[2], 0);
}

function part2() {
    return list1.reduce((acc, value) => {
        const occurances = list2.filter(x => x === value).length;
        return acc += (value * occurances);
    }, 0);
}

part1(); //?
part2(); //?