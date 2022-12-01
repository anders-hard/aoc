import { Day } from "../day";
import { splitByDoubleNewLine, splitByNewLine, splitByNewLineWithMap } from '../utils/stringUtils';
import { sortAsNumbers, sumArray } from '../utils/numberUtils';

class Day1 extends Day {

    constructor(){
        super(1);
    }

    solveForPartOne(input: string): number {
        const elves = splitByDoubleNewLine(input);
        let max = 0;
        elves.forEach(elf => {
            let cal = sumArray(splitByNewLineWithMap(elf, parseInt));
            max = Math.max(cal, max);
        })
        return max;
    }

    solveForPartTwo(input: string): number {
        const elves = splitByDoubleNewLine(input);
        const calCounts = elves.map(elf => sumArray(splitByNewLineWithMap(elf, parseInt)));
        const [one, two, three] = sortAsNumbers(calCounts).reverse();
        return one + two + three;
    }
}

export default new Day1;