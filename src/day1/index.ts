import { Day } from "../day";
import {reverseString, splitByNewLine} from "../utils/stringUtils";
import {match} from "assert";

const numbers = /[0123456789]/;
const numbers2 = /(?=([0123456789]|one|two|three|four|five|six|seven|eight|nine))/g;
const values: { [key: string]: string } = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}

const findDigit = (s: string): string => s.match(numbers)![0];
const findNumber = (s: string): number => parseInt(findDigit(s) + findDigit(reverseString(s)));
const findNumber2 = (s: string): number => {
  const matches = [...s.matchAll(numbers2)].map(m => m[1]);
  return parseInt(values[matches![0]] + values[matches![matches!.length - 1]]);
}

class Day1 extends Day {

  constructor(){
    super(1);
  }

  solveForPartOne(input: string): string {
    return splitByNewLine(input).reduce((p, c) => p + findNumber(c), 0).toString()
  }

  solveForPartTwo(input: string): string {
    return splitByNewLine(input).reduce((p, c) => p + findNumber2(c), 0).toString()
  }
}

export default new Day1;
