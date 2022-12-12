import { Day } from "../day";
import { splitByDoubleNewLine, splitByNewLine } from '../utils/stringUtils';
import { sortAsNumbers, sumArray } from '../utils/numberUtils';

type Monkey = {
  items: number[],
  op: (old: number) => number,
  test: (num: number) => boolean,
  ifTrue: number,
  ifFalse: number,
  inspectCount: number,
}

const monkeys: Monkey[] = [
  {
    items: [91, 66],
    op: (old) => old * 13,
    test: (num) => num % 19 === 0,
    ifTrue: 6,
    ifFalse: 2,
    inspectCount: 0,
  }, {
    items: [78, 97, 59],
    op: (old) => old + 7,
    test: (num) => num % 5 === 0,
    ifTrue: 0,
    ifFalse: 3,
    inspectCount: 0,
  },{
    items: [57, 59, 97, 84, 72, 83, 56, 76],
    op: (old) => old + 6,
    test: (num) => num % 11 === 0,
    ifTrue: 5,
    ifFalse: 7,
    inspectCount: 0,
  },{
    items: [81, 78, 70, 58, 84],
    op: (old) => old + 5,
    test: (num) => num % 17 === 0,
    ifTrue: 6,
    ifFalse: 0,
    inspectCount: 0,
  },{
    items: [60],
    op: (old) => old + 8,
    test: (num) => num % 7 === 0,
    ifTrue: 1,
    ifFalse: 3,
    inspectCount: 0,
  },{
    items: [57, 69, 63, 75, 62, 77, 72],
    op: (old) => old * 5,
    test: (num) => num % 13 === 0,
    ifTrue: 7,
    ifFalse: 4,
    inspectCount: 0,
  },{
    items: [73, 66, 86, 79, 98, 87],
    op: (old) => old * old,
    test: (num) => num % 3 === 0,
    ifTrue: 5,
    ifFalse: 2,
    inspectCount: 0,
  },{
    items: [95, 89, 63, 67],
    op: (old) => old + 2,
    test: (num) => num % 2 === 0,
    ifTrue: 1,
    ifFalse: 4,
    inspectCount: 0,
  },
]

class Day11 extends Day {

  constructor(){
    super(11);
  }

  solveForPartOne(): number {
    Array(20).fill('').forEach(round => {
      monkeys.forEach(monkey => {
        monkey.items.forEach(item => {
          let worry = monkey.op(item);
          worry = Math.floor(worry / 3);
          ++monkey.inspectCount;
          if (monkey.test(worry)) {
            monkeys[monkey.ifTrue].items.push(worry);
          } else {
            monkeys[monkey.ifFalse].items.push(worry);
          }
        })
        monkey.items = [];
      })
    });
    return sortAsNumbers(monkeys.map(monkey => monkey.inspectCount)).reverse().slice(0, 2).reduce((p, c) => c * p, 1);
  }

  solveForPartTwo(input: string): number {
    Array(10000).fill('').forEach(round => {
      monkeys.forEach(monkey => {
        monkey.items.forEach(item => {
          let worry = monkey.op(item);
          worry = worry % (2 * 3 * 13 * 7 * 17 * 11 * 5 * 19);
          ++monkey.inspectCount;
          if (monkey.test(worry)) {
            monkeys[monkey.ifTrue].items.push(worry);
          } else {
            monkeys[monkey.ifFalse].items.push(worry);
          }
        })
        monkey.items = [];
      })
    });
    return sortAsNumbers(monkeys.map(monkey => monkey.inspectCount)).reverse().slice(0, 2).reduce((p, c) => c * p, 1);
  }
}

export default new Day11;
