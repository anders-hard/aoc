import { Day } from "../../day";
import { splitByNewLine } from '../../utils/stringUtils';

declare type Tree = { height: number, visible: boolean, highest: number };

class Day8 extends Day {

  constructor(){
    super(8);
  }
  solveForPartOne(input: string): number {
    const treeRows = splitByNewLine(input);
    const forest: Tree[][] = treeRows.map((treeRow) =>
      treeRow.split('').map(tree => ({ height: parseInt(tree), visible: false, highest: 0 })));

    for (let i = 0; i < forest.length; i++) {
      for (let j = 0; j < forest[i].length; j++) {
        if (j === 0 || forest[i][j - 1].highest < forest[i][j].height) {
          forest[i][j].visible = true;
        }
        forest[i][j].highest = j === 0 ? forest[i][j].height : Math.max(forest[i][j - 1].highest, forest[i][j].height);
      }
      for (let j = forest[i].length - 1; j >= 0; j--) {
        if (j === forest[i].length - 1 || forest[i][j + 1].highest < forest[i][j].height) {
          forest[i][j].visible = true;
        }
        forest[i][j].highest = j === forest[i].length - 1 ? forest[i][j].height : Math.max(forest[i][j + 1].highest, forest[i][j].height);
      }
    }

    for (let i = 0; i < forest[0].length; i++) {
      for (let j = 0; j < forest.length; j++) {
        if (j === 0 || forest[j - 1][i].highest < forest[j][i].height) {
          forest[j][i].visible = true;
        }
        forest[j][i].highest = j === 0 ? forest[j][i].height : Math.max(forest[j - 1][i].highest, forest[j][i].height);
      }
      for (let j = forest.length - 1; j >= 0; j--) {
        if (j === forest.length - 1 || forest[j + 1][i].highest < forest[j][i].height) {
          forest[j][i].visible = true;
        }
        forest[j][i].highest = j === forest.length - 1 ? forest[j][i].height : Math.max(forest[j + 1][i].highest, forest[j][i].height);
      }
    }

    let visible = 0;
    forest.forEach(row => {
      row.forEach(tree => {
        if (tree.visible) {
          visible++;
        }
      })
    })

    return visible;
  }

  calcTree(tree: Tree, rIndex: number, cIndex: number, forest: Tree[][]) {
    return [
      (rIndex: number, cIndex: number) => [rIndex + 1, cIndex],
      (rIndex: number, cIndex: number) => [rIndex - 1, cIndex],
      (rIndex: number, cIndex: number) => [rIndex, cIndex + 1],
      (rIndex: number, cIndex: number) => [rIndex, cIndex - 1],
    ].map((func) => {
      let seen = 0;
      let [i, j] = func(rIndex, cIndex);
      let stop = false;
      while (i >= 0 && i < forest.length && j >= 0 && j < forest[0].length && !stop) {
        ++seen;
        if (forest[i][j].height >= tree.height) {
          stop = true;
        }
        [i, j] = func(i, j);
      }
      return seen;
    }).reduce((p, c) => p * c, 1);
  }

  solveForPartTwo(input: string): number {
    const treeRows = splitByNewLine(input);
    const forest: Tree[][] = treeRows.map((treeRow) =>
      treeRow.split('').map(tree => ({ height: parseInt(tree), visible: false, highest: 0 })));

    let best = 0;
    forest.forEach((row, rIndex) => {
      row.forEach((tree, cIndex) => {
        const treeVal = this.calcTree(tree, rIndex, cIndex, forest);
        if (treeVal > best) {
          best = treeVal;
        }
      })
    })

    return best;
  }
}

export default new Day8;
