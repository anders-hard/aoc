import { Day } from "../day";
import {splitByNewLine} from "../utils/stringUtils";

type CubeSet = {
  red: number,
  green: number,
  blue: number,
}
type Color = 'red' | 'green' | 'blue';

const parseGame = (game: string): CubeSet[] => {
  const sets = game.split(': ')[1].trim().split('; ');
  return sets.map(s => {
    const colors = s.split(', ');
    return colors.reduce((p, c) => {
      const [count, color] = c.split(' ');
      p[color as Color] = parseInt(count);
      return p;
    }, { red: 0, green: 0, blue: 0 } as CubeSet)
  })
}

const isOk = (cubeSets: CubeSet[]): boolean =>
  cubeSets.every(cubeSet => cubeSet.red <= 12 && cubeSet.green <= 13 && cubeSet.blue <= 14)

const getMinimum = (cubeSets: CubeSet[]): CubeSet => ({
  red: Math.max(...cubeSets.map(cs => cs.red)),
  green: Math.max(...cubeSets.map(cs => cs.green)),
  blue: Math.max(...cubeSets.map(cs => cs.blue)),
})

class Day2 extends Day {

  constructor(){
    super(2);
  }

  solveForPartOne(input: string): string | number {
    const games = splitByNewLine(input).map(line => parseGame(line));
    return games.reduce((p, c, i) => {
      if (isOk(c)) {
        p += i + 1
      }
      return p;
    }, 0);
  }

  solveForPartTwo(input: string): string | number {
    const games = splitByNewLine(input).map(line => parseGame(line));
    return games.reduce((p, c, i) => {
      const min = getMinimum(c);
      return p + min.red * min.green * min.blue;
    }, 0);
  }
}

export default new Day2;
