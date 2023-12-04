import { Day } from "../../day";
import { splitByNewLine, splitByNewLineWithMap } from '../../utils/stringUtils';

type Node = {
  val: number,
  next: Node[],
  x: number,
  y: number,
}

const getValue = (letter: string): number => {
  if (letter === 'S') {
    return 0;
  } else if (letter === 'E') {
    return 25;
  } else {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').indexOf(letter);
  }
}

let seen: { [key: string]: Node } = {};

class Day12 extends Day {

  constructor(){
    super(12);
  }

  grid: string[][] = [];
  best: number[][] = [];
  queue: { node: Node, steps: number }[] = [];
  compareFunc: ((val: number, next: number) => boolean) | undefined;

  addNode(x: number, y: number): Node {
    const node: Node = { val: getValue(this.grid[y][x]), next: [], x, y };
    seen[x + '.' + y] = node;

    [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ].forEach(([xNew, yNew]) => {
      if (xNew >= 0 && xNew < this.grid[0].length && yNew >= 0 && yNew < this.grid.length) {
        if (this.compareFunc!(node.val, getValue(this.grid[yNew][xNew]))) {
          if (seen[xNew + '.' + yNew]) {
            node.next.push(seen[xNew + '.' + yNew]);
          } else {
            node.next.push(this.addNode(xNew, yNew));
          }
        }
      }
    });

    return node;
  }

  dijkstra(node: Node, steps: number) {
    if (!this.best[node.y][node.x]) {
      this.best[node.y][node.x] = steps;
      node.next.forEach(next => {
        this.queue.push({ node: next, steps: steps + 1 });
      });
    }
  }

  solveForPartOne(input: string): number {
    this.grid = splitByNewLineWithMap(input, (line) => line.split(''));
    this.compareFunc = (val, next) => next - val <= 1;
    seen = {};
    const start = this.addNode(0, 20);

    this.best = [];
    this.grid.forEach(row => {
      this.best.push(Array(row.length).fill(null));
    });
    this.queue = [{ node: start, steps: 0 }];
    this.best[20][0] = 0;
    while (this.queue.length > 0) {
      const next = this.queue.splice(0, 1)[0];
      this.dijkstra(next.node, next.steps);
    }
    return this.best[20][120];
  }

  solveForPartTwo(input: string): number {
    this.grid = splitByNewLineWithMap(input, (line) => line.split(''));
    this.compareFunc = (val, next) => next - val >= -1;
    seen = {};
    const start = this.addNode(120, 20);

    this.best = [];
    this.grid.forEach(row => {
      this.best.push(Array(row.length).fill(null));
    });
    this.queue = [{ node: start, steps: 0 }];
    this.best[20][120] = 0;
    while (this.queue.length > 0) {
      const next = this.queue.splice(0, 1)[0];
      this.dijkstra(next.node, next.steps);
    }

    let best: number;
    this.best.forEach((row, y) => {
      row.forEach((cell, x) => {
        if ((this.grid[y][x] === 'a' || this.grid[y][x] === 'S') && cell && (!best || best > cell)) {
          best = cell;
        }
      })
    })
    return best!;
  }
}

export default new Day12;
