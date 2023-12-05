import { Day } from "../../day";

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
  totalHeight: number = 0;
  steps = 2022;
  grid: Char[][] = Array(100000).fill('').map(() => Array(7).fill(Char.EMPTY));

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

  heights = new Map<string, number>();
  startShape: string = '';
  startIndex = 0;
  shapeIndex = 0;

  toRest(shape: Shape) {
    shape.forEach(ch => this.grid[ch.y][ch.x] = Char.REST);
    this.height = Math.max(this.height, ...shape.map(ch => ch.y + 1));
    const heights = this.grid[0].map((_, c) => {
      let i = this.height;
      while (i >= 0 && this.grid[i][c] === Char.EMPTY) {
        --i;
      }
      return i;
    })

    if (this.heights.has(heights.join('.'))) {
      if (!this.startIndex) {
        this.startIndex = this.shapeIndex;
      } else {
        if (heights.join('.') === this.startShape) {
          console.log('duplicate startShape (startIndex: ' + this.startIndex + ') found at index : ' + this.shapeIndex + ' height: ' + (this.height + this.totalHeight));
        }
      }
    } else {
      this.startIndex = 0;
      this.heights.set(heights.join('.'), this.shapeIndex);
      this.startShape = heights.join('.');
    }

    const minimum = Math.min(...heights);
    if (minimum > 10000) {
      this.height -= 10000;
      this.totalHeight += 10000;
      this.grid.splice(0, 10000);
      this.grid.push(...Array(10000).fill('').map(() => Array(7).fill(Char.EMPTY)));
    }
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

    return this.totalHeight + this.height;
  }

  solveForPartTwo(input: string): number {
    this.height = 0;
    this.totalHeight = 0;
    this.startIndex = 0;
    this.shapeIndex = 0;
    this.startShape = '';
    this.heights = new Map<string, number>();
    // this.steps = (1000000000000 - 400) % 1400;
    // this.steps = 6392690 + (1000000000000 - 6392690) % 4325000;
    this.steps = 10000000;
    this.grid = Array(100000).fill('').map(() => Array(7).fill(Char.EMPTY));

    const wind: Wind[] = input.trim().split('') as Wind[];
    let tick = 0;

    for (let i = 0; i < this.steps; ++i) {
      if ((i - 400) % 1400 === 0) {
      // if ((i - 6392690) % 4325000 === 0) {
        console.log(this.height + this.totalHeight);
      }
      this.shapeIndex = i;
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
    // return 6610000 * 231211 + this.height + this.totalHeight;
    return this.height + this.totalHeight;
  }
}

export default new Day17;
