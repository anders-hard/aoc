import { Day } from "../day";

enum Wind {
  LEFT = '<',
  RIGHT = '>',
}

enum Char {
  EMPTY = '.',
  STONE = '@',
  REST = '#',
}

type Pos = { x: number, y: number };

type Shape = Pos[];

class Day17 extends Day {

  constructor(){
    super(17);
  }

  height: number = 0;
  steps = 2022;
  grid: Char[][] = Array(10000).fill('').map(() => Array(7).fill(Char.EMPTY));

  fall(shape: Shape): boolean {
    shape.forEach(ch => --ch.y);
    if (shape.find(ch => ch.y < 0 || this.grid[ch.y][ch.x] === Char.REST)) {
      shape.forEach(ch => ++ch.y);
      return true;
    }
    return false;
  }

  blow(wind: Wind, shape: Shape) {
    if (wind === Wind.LEFT) {
      shape.forEach(ch => --ch.x);
      if (shape.find(ch => ch.x < 0 || this.grid[ch.y][ch.x] === Char.REST)) {
        shape.forEach(ch => ++ch.x);
      }
    } else {
      shape.forEach(ch => ++ch.x);
      if (shape.find(ch => ch.x > 6 || this.grid[ch.y][ch.x] === Char.REST)) {
        shape.forEach(ch => --ch.x);
      }
    }
  }

  toRest(shape: Shape) {
    shape.forEach(ch => this.grid[ch.y][ch.x] = Char.REST);
    this.height = Math.max(this.height, ...shape.map(ch => ch.y + 1));

    /*
    if (this.height > 1000) {
      this.height -= 1000;
      this.grid.slice(0, 1000);
      this.grid.push(...Array(1000).fill('').map(() => Array(7).fill(Char.EMPTY)))
    }
    */
  }

  spawnShape(i: number): Shape {
    const h = this.height + 3;
    return [
      [{ x: 2, y: h}, { x: 3, y: h}, { x: 4, y: h}, { x: 5, y: h}],
      [{ x: 2, y: h + 1}, { x: 3, y: h}, { x: 3, y: h + 1}, { x: 3, y: h + 2}, { x: 4, y: h + 1}],
      [{ x: 2, y: h}, { x: 3, y: h}, { x: 4, y: h}, { x: 4, y: h + 1 }, { x: 4, y: h + 2 }],
      [{ x: 2, y: h}, { x: 2, y: h + 1}, { x: 2, y: h + 2}, { x: 2, y: h + 3}],
      [{ x: 2, y: h}, { x: 2, y: h + 1}, { x: 3, y: h}, { x: 3, y: h + 1}],
    ][i % 5];
  }

  printGrid() {
    console.log(this.grid.map(row => row.join('')).slice(0, this.height).reverse().join('\n') + '\n');
  }

  solveForPartOne(input: string): number {
    const wind: Wind[] = input.trim().split('') as Wind[];
    let tick = 0;

    for (let i = 0; i < this.steps; ++i) {
      const shape = this.spawnShape(i);
      let resting = false;
      while (!resting) {
        // console.log('before blow', tick, wind[tick % wind.length], shape);
        this.blow(wind[tick % wind.length], shape);
        // console.log('after blow',  tick, wind[tick % wind.length], shape);
        resting = this.fall(shape);
        // console.log('fall', shape);
        ++tick;
      }
      this.toRest(shape);
      // this.printGrid();
    }

    return this.height;
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day17;
