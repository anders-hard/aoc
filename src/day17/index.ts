import { Day } from "../day";

enum Wind {
  LEFT = '<',
  RIGHT = '>',
}

enum Char {
  EMPTY = '.',
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

  printGrid(prev: number = 0) {
    console.log(this.grid.slice(prev, prev + 10).map(row => row.join('')).reverse().join('\n') + '\n');
    console.log(this.grid.slice(this.height - 10, this.height).map(row => row.join('')).reverse().join('\n') + '\n');
  }

  solveForPartOne(input: string): number {
    const wind: Wind[] = input.trim().split('') as Wind[];
    let tick = 0;

    for (let i = 0; i < this.steps; ++i) {
      const shape = this.spawnShape(i);
      let resting = false;
      while (!resting) {
        this.blow(wind[tick % wind.length], shape);
        resting = this.fall(shape);
        ++tick;
      }
      this.toRest(shape);
    }

    return this.height;
  }

  solveForPartTwo(input: string): number {
    this.height = 0;
    // this.steps = (1000000000000 - 400) % 1400;
    //this.steps = (1000000000000 - 50455) % 353185;
    this.steps = 50455 * 10;
    this.grid = Array(1000000).fill('').map(() => Array(7).fill(Char.EMPTY));

    const wind: Wind[] = input.trim().split('') as Wind[];
    let tick = 0;
    let prev = 0;

    for (let i = 0; i < this.steps; ++i) {
      if (i !== 0 && i % 50455 === 0) {
        this.printGrid(prev);
        console.log(this.height - prev);
        prev = this.height;
      }
      const shape = this.spawnShape(i);
      let resting = false;
      while (!resting) {
        this.blow(wind[tick % wind.length], shape);
        resting = this.fall(shape);
        ++tick;
      }
      this.toRest(shape);
    }
    // this.printGrid();
    // return 608 + 2120 * Math.floor((1000000000000 - 400) / 1400) + this.height;
    // return 76409 + 534823 * Math.floor((1000000000000 - 50455) / 353185) + this.height;
    return this.height;
  }
}

export default new Day17;
