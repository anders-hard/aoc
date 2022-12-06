import { Day } from "../day";

class Day6 extends Day {

  constructor(){
    super(6);
  }

  isUnique(chars: string): boolean {
    return new Set(chars.split('')).size === chars.length;
  }

  solveForPartOne(input: string): number {
    let startIndex = 0;
    while (!this.isUnique(input.slice(startIndex, startIndex + 4))) {
      ++startIndex;
    }
    return startIndex + 4;
  }

  solveForPartTwo(input: string): number {
    let startIndex = 0;
    while (!this.isUnique(input.slice(startIndex, startIndex + 14))) {
      ++startIndex;
    }
    return startIndex + 14;
  }
}

export default new Day6;
