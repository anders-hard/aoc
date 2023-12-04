import { Day } from "../day";
import {splitByNewLine} from "../utils/stringUtils";

type Part = {
  num: number,
  start: number,
  end: number,
  rowIndex: number
}

const isPart = (grid: string[][], part: Part): boolean => {
  return !![
      ...(part.rowIndex > 0 ? grid[part.rowIndex - 1].slice(Math.max(part.start - 1, 0), Math.min(part.end + 2, grid[0].length)) : []),
      ...grid[part.rowIndex].slice(Math.max(part.start - 1, 0), Math.min(part.end + 2, grid[0].length)),
      ...(part.rowIndex < grid.length - 1 ? grid[part.rowIndex + 1].slice(Math.max(part.start - 1, 0), Math.min(part.end + 2, grid[0].length)) : []),
  ].find(ch => ['#', '%', '+', '*', '$', '-', '/', '@', '&', '='].includes(ch))
}

const findParts = (line: string[], rowIndex: number): Part[] => {
  const matches = line.join('').matchAll(/\d+/g);
  if (!matches) return [];
  return [...matches].map(match => ({
    num: parseInt(match[0]),
    start: match.index!,
    end: match.index! + match[0].length - 1,
    rowIndex,
  }))
}

const findGears = (line: string[], rowIndex: number): [number, number][] => {
  const matches = line.join('').matchAll(/\*/g);
  if (!matches) return [];
  return [...matches].map(match => ([rowIndex, match.index!]));
}

const getPartsForGear = (parts: Part[], [y, x]: [number, number]): Part[] => {
  return parts.filter(part => {
    return part.rowIndex >= y - 1 && part.rowIndex <= y + 1 && part.start <= x + 1 && part.end >= x - 1;
  })
}

class Day3 extends Day {

  constructor(){
    super(3);
  }

  solveForPartOne(input: string): string | number {
    const grid = splitByNewLine(input).map(line => line.split(''));
    return grid.reduce((sum, line, rowIndex) => {
      const parts = findParts(line, rowIndex);
      return parts.reduce((partSum, part) => {
        if (isPart(grid, part)) {
          partSum += part.num;
        }
        return partSum;
      }, sum)
    }, 0)
  }

  solveForPartTwo(input: string): string | number {
    const grid = splitByNewLine(input).map(line => line.split(''));
    const parts = grid.reduce((sum, line, rowIndex) => {
      const parts = findParts(line, rowIndex);
      return [...sum, ...parts];
    }, [] as Part[]);
    return grid.reduce((sum, line, rowIndex) => {
      const gears = findGears(line, rowIndex);
      return gears.reduce((gearSum, gear) => {
        const partsForGear = getPartsForGear(parts, gear);
        console.log(partsForGear);
        if (partsForGear.length == 2) {
          gearSum += partsForGear[0].num * partsForGear[1].num;
        }
        return gearSum;
      }, sum)
    }, 0)
  }
}

export default new Day3;
