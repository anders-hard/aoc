import { Day } from "../../day";
import { splitByNewLine } from '../../utils/stringUtils';

class Day4 extends Day {

  constructor(){
    super(4);
  }

  solveForPartOne(input: string): number {
    const pairs = splitByNewLine(input);
    let sum = 0;
    pairs.forEach(pair => {
      const [elfOne, elfTwo] = pair.split(',');
      const [oneStart, oneEnd] = elfOne.split('-');
      const [twoStart, twoEnd] = elfTwo.split('-');
      if ((parseInt(oneStart) <= parseInt(twoStart) && parseInt(oneEnd) >= parseInt(twoEnd)) ||
          (parseInt(twoStart) <= parseInt(oneStart) && parseInt(twoEnd) >= parseInt(oneEnd))) {
        sum++;
      }
    })
    return sum;
  }

  solveForPartTwo(input: string): number {
    const pairs = splitByNewLine(input);
    let sum = 0;
    pairs.forEach(pair => {
      const [elfOne, elfTwo] = pair.split(',');
      const [oneStart, oneEnd] = elfOne.split('-');
      const [twoStart, twoEnd] = elfTwo.split('-');
      if (!(parseInt(oneEnd) < parseInt(twoStart) || parseInt(twoEnd) < parseInt(oneStart))) {
        sum++;
      }
    })
    return sum;
  }
}

export default new Day4;
