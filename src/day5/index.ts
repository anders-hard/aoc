import { Day } from "../day";
import { splitByNewLine } from '../utils/stringUtils';

class Day5 extends Day {

  constructor(){
    super(5);
  }

  parseInput(input: string): [string[][], string[]] {
    const inp = splitByNewLine(input)
    const stacks: string[][] = [[], [], [], [], [], [], [], [], []];
    for (let i = 7; i >= 0; i--) {
      for (let j = 1; j < 36; j += 4) {
        if (inp[i][j] !== ' ') {
          stacks[(j-1)/4].push(inp[i][j]);
        }
      }
    }
    return [stacks, inp.slice(10)];
  }

  solveForPartOne(input: string): string {
    const [stacks, moves] = this.parseInput(input);
    moves.forEach(move => {
      const [moveCount, from, to] = move.match(/\d+/g)!.slice();
      for (let i = 0; i < parseInt(moveCount); i++) {
        const item = stacks[parseInt(from) - 1].pop();
        stacks[parseInt(to) - 1].push(item!);
      }
    })
    return stacks.map(s => s[s.length - 1]).join('');
  }

  solveForPartTwo(input: string): string {
    const [stacks, moves] = this.parseInput(input);
    moves.forEach(move => {
      const [moveCount, from, to] = move.match(/\d+/g)!.slice();
      const fromStack = stacks[parseInt(from) - 1];
      const items = fromStack.splice(fromStack.length - parseInt(moveCount));
      stacks[parseInt(to) - 1].push(...items);
    })
    return stacks.map(s => s[s.length - 1]).join('');
  }
}

export default new Day5;
