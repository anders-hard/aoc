import { Day } from "../../day";
import { splitByNewLine } from '../../utils/stringUtils';

enum Char {
  STONE = '#',
  SAND = 'o',
  EMPTY = '.',
  SOURCE = '+',
}
type Chars = keyof typeof Char;

class Day14 extends Day {

  constructor(){
    super(14);
  }

  grid: Char[][] = Array(200).fill('').map(() => Array(1000).fill(Char.EMPTY));
  sandCount: number = 0;

  printGrid() {
    console.log(this.grid.map(line => line.slice(400, 600).join('')).join('\n') + '\n');
  }

  parseInput(lines: string[]) {
    lines.forEach(line => {
      const points = line.split(' -> ').map(point => point.split(',').map(v => parseInt(v)));
      points.forEach(([toX, toY], index, arr) => {
        if (index === 0) return;
        const [fromX, fromY] = arr[index - 1];
        if (toX > fromX) {
          let x = fromX;
          while (x <= toX) {
            this.grid[fromY][x] = Char.STONE;
            ++x;
          }
        }
        if (toX < fromX) {
          let x = fromX;
          while (x >= toX) {
            this.grid[fromY][x] = Char.STONE;
            --x;
          }
        }
        if (toY > fromY) {
          let y = fromY;
          while (y <= toY) {
            this.grid[y][fromX] = Char.STONE;
            ++y;
          }
        }
        if (toY < fromY) {
          let y = fromY;
          while (y >= toY) {
            this.grid[y][fromX] = Char.STONE;
            --y;
          }
        }
      })
    })
    this.grid[0][500] = Char.SOURCE;
  }

  fillSand(stopCondition: (x: number, y: number) => boolean) {
    let stop = false;
    while (!stop) {
      let stopGrain = false;
      let [x, y] = [500, 0];
      while (!stopGrain) {
        if (stopCondition(x, y)) {
          stopGrain = true;
          stop = true;
        } else if (this.grid[y + 1][x] === Char.EMPTY) {
          ++y;
        } else if (this.grid[y + 1][x - 1] === Char.EMPTY) {
          ++y;
          --x;
        } else if (this.grid[y + 1][x + 1] === Char.EMPTY) {
          ++y;
          ++x;
        } else {
          this.grid[y][x] = Char.SAND;
          ++this.sandCount;
          stopGrain = true;
        }
      }
    }
  }

  solveForPartOne(input: string): number {
    const lines = splitByNewLine(input);
    this.grid = Array(200).fill('').map(() => Array(1000).fill(Char.EMPTY));
    this.sandCount = 0;
    this.parseInput(lines)
    this.fillSand((x, y) => y + 1 === this.grid.length);
    return this.sandCount;
  }

  solveForPartTwo(input: string): number {
    const lines = splitByNewLine(input);
    this.grid = Array(200).fill('').map(() => Array(1000).fill(Char.EMPTY));
    this.sandCount = 0;
    this.parseInput(lines)
    this.fillSand((x, y) => this.grid[0][500] === Char.SAND);
    return this.sandCount;
  }
}

export default new Day14;
