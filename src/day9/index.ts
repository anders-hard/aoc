import { Day } from "../day";
import { splitByNewLineWithMap } from '../utils/stringUtils';

type Grid = boolean[][];
type Direction = 'R' | 'L' | 'U' | 'D';
type Move = { direction: Direction, amount: number };
type Pos = { x: number, y: number };
const gridSize = 999
const startPos = Math.floor(gridSize / 2);

class Day9 extends Day {

  constructor(){
    super(9);
  }


  newGrid(): Grid {
    const iter = Array(gridSize).fill(undefined);
    const grid: boolean[][] = iter.map(() => []);
    iter.forEach((row, index) => {
      grid[index] = Array(gridSize).fill(false);
    });
    return grid;
  }

  calcVisited(grid: Grid): number {
    return grid.reduce((p, row) =>
        p + row.reduce((r, c) =>
            r + (c ? 1 : 0),
            0),
        0);
  }

  solveForPartOne(input: string): number {
    const moves: Move[] = splitByNewLineWithMap(input, (s) => ({ direction: s[0] as Direction, amount: parseInt(s.split(' ')[1]) }))
    const grid = this.newGrid();
    let [tailX, tailY] = [startPos, startPos];
    let [headX, headY] = [startPos, startPos];
    grid[tailX][tailY] = true;

    moves.forEach(move => {
      Array(move.amount).fill('').forEach(() => {
        switch (move.direction) {
          case 'U': ++headY; break;
          case 'D': --headY; break;
          case 'R': ++headX; break;
          case 'L': --headX; break;
        }
        // Diagonally
        if ((headX - tailX >= 2 && headY - tailY >= 1) || (headX - tailX >= 1 && headY - tailY >= 2)) {
          ++tailY;
          ++tailX;
        }
        if ((headX - tailX <= -2 && headY - tailY <= -1) || (headX - tailX <= -1 && headY - tailY <= -2)) {
          --tailY;
          --tailX;
        }
        if ((headX - tailX <= -2 && headY - tailY >= 1) || (headX - tailX <= -1 && headY - tailY >= 2)) {
          ++tailY;
          --tailX;
        }
        if ((headX - tailX >= 2 && headY - tailY <= -1) || (headX - tailX >= 1 && headY - tailY <= -2)) {
          --tailY;
          ++tailX
        }
        // Only horizontal or vertical
        if (headX - tailX > 1 && headY === tailY) {
          ++tailX;
        }
        if (headX - tailX < -1 && headY === tailY) {
          --tailX;
        }
        if (headY - tailY > 1 && headX === tailX) {
          ++tailY;
        }
        if (headY - tailY < -1 && headX === tailX) {
          --tailY;
        }

        grid[tailX][tailY] = true;
      })
    });

    return this.calcVisited(grid);
  }

  solveForPartTwo(input: string): number {
    const moves: Move[] = splitByNewLineWithMap(input, (s) => ({ direction: s[0] as Direction, amount: parseInt(s.split(' ')[1]) }))
    const grid = this.newGrid();
    let snake = [
      [startPos, startPos],
      [startPos, startPos],
      [startPos, startPos],
      [startPos, startPos],
      [startPos, startPos],
      [startPos, startPos],
      [startPos, startPos],
      [startPos, startPos],
      [startPos, startPos],
      [startPos, startPos],
    ];
    grid[snake[9][0]][snake[9][1]] = true;

    moves.forEach(move => {
      Array(move.amount).fill('').forEach(() => {
        switch (move.direction) {
          case 'U': ++snake[0][1]; break;
          case 'D': --snake[0][1]; break;
          case 'R': ++snake[0][0]; break;
          case 'L': --snake[0][0]; break;
        }

        for (let i = 1; i < snake.length; i++) {
          // Diagonally
          if ((snake[i - 1][0] - snake[i][0] >= 2 && snake[i - 1][1] - snake[i][1] >= 1) ||
              (snake[i - 1][0] - snake[i][0] >= 1 && snake[i - 1][1] - snake[i][1] >= 2)) {
            ++snake[i][1];
            ++snake[i][0];
          }
          if ((snake[i - 1][0] - snake[i][0] <= -2 && snake[i - 1][1] - snake[i][1] <= -1) ||
              (snake[i - 1][0] - snake[i][0] <= -1 && snake[i - 1][1] - snake[i][1] <= -2)) {
            --snake[i][1];
            --snake[i][0];
          }
          if ((snake[i - 1][0] - snake[i][0] <= -2 && snake[i - 1][1] - snake[i][1] >= 1) ||
              (snake[i - 1][0] - snake[i][0] <= -1 && snake[i - 1][1] - snake[i][1] >= 2)) {
            ++snake[i][1];
            --snake[i][0];
          }
          if ((snake[i - 1][0] - snake[i][0] >= 2 && snake[i - 1][1] - snake[i][1] <= -1) ||
              (snake[i - 1][0] - snake[i][0] >= 1 && snake[i - 1][1] - snake[i][1] <= -2)) {
            --snake[i][1];
            ++snake[i][0]
          }
          // Only horizontal or vertical
          if (snake[i - 1][0] - snake[i][0] > 1 && snake[i - 1][1] === snake[i][1]) {
            ++snake[i][0];
          }
          if (snake[i - 1][0] - snake[i][0] < -1 && snake[i - 1][1] === snake[i][1]) {
            --snake[i][0];
          }
          if (snake[i - 1][1] - snake[i][1] > 1 && snake[i - 1][0] === snake[i][0]) {
            ++snake[i][1];
          }
          if (snake[i - 1][1] - snake[i][1] < -1 && snake[i - 1][0] === snake[i][0]) {
            --snake[i][1];
          }
        }
        grid[snake[9][0]][snake[9][1]] = true;
      })
    });
    return this.calcVisited(grid);
  }
}

export default new Day9;
