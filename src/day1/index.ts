import { Day } from "../day";

class Day1 extends Day {

    constructor(){
        super(1);
    }

    solveForPartOne(input: string): string {
        const elves = input.split(/\r?\n\r?\n/);
        let max = 0;
        elves.forEach(elf => {
            let cal = elf.split(/\r?\n/).reduce((p, c) => p + parseInt(c), 0);
            max = Math.max(cal, max);
        })
        return max + '';
    }

    solveForPartTwo(input: string): string {
        const elves = input.split(/\r?\n\r?\n/);
        const calCounts = elves.map(elf => elf.split(/\r?\n/).reduce((p, c) => p + parseInt(c), 0));
        calCounts.sort((a, b) => b - a);
        return (calCounts[0] + calCounts[1] + calCounts[2]) + '';
    }
}

export default new Day1;