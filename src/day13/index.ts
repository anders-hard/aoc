import { Day } from "../day";
import { splitByDoubleNewLine, splitByNewLine } from '../utils/stringUtils';

type List = (number | List)[]

class Day13 extends Day {

  constructor(){
    super(13);
  }

  compare(left: List, right: List): boolean {
    const l = left.length? left[0] : null;
    const r = right.length? right[0] : null;
    if (l === null && r !== null) {
      return true;
    } else if (l !== null && r === null) {
      return false;
    } else if (typeof l === 'number' && typeof r === 'number') {
      if (l === r) {
        return this.compare(left.slice(1), right.slice(1));
      } else {
        return l < r;
      }
    } else if (Array.isArray(l) && Array.isArray(r)) {
      return this.compare(l, r);
    } else if (typeof l === 'number' && Array.isArray(r)) {
      return this.compare([l], r);
    } else if (Array.isArray(l) && typeof r === 'number') {
      return this.compare(l, [r]);
    }
    return true;
  }

  solveForPartOne(input: string): number {
    const pairs = splitByDoubleNewLine(input).map(pair => splitByNewLine(pair));
    return pairs.reduce((p, [left, right], index) => p +=
      (this.compare(JSON.parse(left), JSON.parse(right)) ? index + 1 : 0), 0);
  }

  solveForPartTwo(input: string): number {
    const pairs = splitByDoubleNewLine(input).map(pair => splitByNewLine(pair));
    const all = pairs.reduce((p, c) => [...p, JSON.parse(c[0]), JSON.parse(c[1])], [] as List[]);
    all.sort((a, b) => this.compare(a, b) ? -1 : 1);
    const stringList = all.map(list => JSON.stringify(list));
    return (stringList.indexOf('[[2]]') + 1) * (stringList.indexOf('[[6]]') + 1);
  }
}

export default new Day13;
