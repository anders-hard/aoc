import { Day } from "../day";
import { splitByNewLine } from '../utils/stringUtils';
import { chunks } from '../utils/arrayUtils';
import { intersect } from '../utils/setUtils';

class Day3 extends Day {

  constructor(){
    super(3);
  }

  getPriority(ch: string) {
    return '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').indexOf(ch);
  }

  getTypes(elf: string) {
    return elf.split('').reduce((p, c) => p.add(c), new Set<string>());
  }

  solveForPartOne(input: string): number {
    const elves = splitByNewLine(input);
    let sum = 0;
    elves.forEach(elf => {
      const [part1, part2] = [elf.slice(0, elf.length / 2), elf.slice(elf.length / 2)];
      const typesOne = this.getTypes(part1);
      const typesTwo = this.getTypes(part2);
      const duplicate = intersect(typesOne, typesTwo);
      sum += this.getPriority(duplicate.entries().next().value[0]);
    })
    return sum;
  }

  solveForPartTwo(input: string): number {
    const elves = splitByNewLine(input);
    let sum = 0;
    const parts: string[][] = [...chunks(elves, 3)];
    parts.forEach(part => {
      const typesOne = this.getTypes(part[0])
      const typesTwo = this.getTypes(part[1]);
      const typesThree = this.getTypes(part[2]);
      const duplicate = intersect(typesThree, intersect(typesOne, typesTwo));
      sum += this.getPriority(duplicate.entries().next().value[0]);
    })
    return sum;
  }
}

export default new Day3;
