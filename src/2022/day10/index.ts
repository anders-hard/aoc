import { Day } from "../../day";
import { splitByNewLineWithMap } from '../../utils/stringUtils';

type Command = { cmd: 'noop' | 'addx', amount?: number};

class Day10 extends Day {

  constructor(){
    super(10);
  }

  solveForPartOne(input: string): number {
    const commands: Command[] = splitByNewLineWithMap(input, line =>
        ({ cmd: line.split(' ')[0] as 'noop' | 'addx', amount: parseInt(line.split(' ')[1]) }));

    let X = 1;
    let cycle = 0;
    let nextCycleRegister = 20;
    let total = 0;

    commands.forEach(command => {
      if (cycle === nextCycleRegister || (command.cmd === 'addx' && cycle + 2 >= nextCycleRegister) && nextCycleRegister <= 220) {
        total += X * nextCycleRegister;
        nextCycleRegister += 40;
      }
      if (command.cmd === 'noop') {
        ++cycle;
      } else {
        cycle += 2;
        X += command.amount!;
      }
    })

    return total;
  }

  paintCycle(cycle: number, X: number, res: string[][]) {
    const row = Math.floor(cycle / 40);
    const column = cycle % 40;
    if (column === X - 1 || column === X || column === X + 1) {
      res[row][column] = '#';
    }
  }

  solveForPartTwo(input: string): string {
    const commands: Command[] = splitByNewLineWithMap(input, line =>
        ({ cmd: line.split(' ')[0] as 'noop' | 'addx', amount: parseInt(line.split(' ')[1]) }));

    let X = 1;
    let cycle = 0;
    let res = [
      Array(40).fill('.'),
      Array(40).fill('.'),
      Array(40).fill('.'),
      Array(40).fill('.'),
      Array(40).fill('.'),
      Array(40).fill('.'),
    ]

    commands.forEach(command => {
      this.paintCycle(cycle, X, res);
      if (command.cmd === 'noop') {
        ++cycle;
      } else {
        this.paintCycle(cycle + 1, X, res);
        cycle += 2;
        X += command.amount!;
      }
    })

    return res.map(line => line.join('')).join('\n');
  }
}

export default new Day10;
