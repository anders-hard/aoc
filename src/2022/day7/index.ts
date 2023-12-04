import { Day } from "../../day";
import { splitByNewLine } from '../../utils/stringUtils';
import { sortAsNumbers, sumArray } from '../../utils/numberUtils';

declare type CmdResp = { command: string, responses: string[] };
declare type Node = { name: string, parent?: Node, children: Node[], files: number[] };

class Day7 extends Day {

  constructor(){
    super(7);
  }

  printTree(tree: Node, indentation: number): string {
    let res = `${tree.name}: ${sumArray(tree.files)}`;
    tree.children.forEach(child => res += '\n' + Array(indentation).fill('').reduce((p) => p + '  ', '  ') + this.printTree(child, indentation + 1));
    return res
  }

  treeSize: number = 0;
  sizes: number[] = [];
  calcTree(tree: Node): number {
    let size = sumArray(tree.files);
    tree.children.forEach(child => {
      size += this.calcTree(child);
    });
    this.sizes.push(size);
    return size;
  }

  tree: Node = { name: '/', children: [], files: [] };
  solveForPartOne(input: string): number {
    const lines = splitByNewLine(input);

    // Parse input
    const cmdResps: CmdResp[] = lines.reduce((p, c) => {
      if (c.startsWith('$')) {
        p.push({ command: c.split('$ ')[1], responses: []});
      } else {
        p[p.length - 1].responses.push(c);
      }
      return p;
    }, [] as CmdResp[]);

    // Create tree
    let currentNode: Node = this.tree;
    cmdResps.forEach(({ command, responses }) => {
      if (command === 'cd /') {
        // Do nothing
      } else if (command === 'cd ..') {
        if (currentNode.parent) {
          currentNode = currentNode.parent;
        }
      } else if (command.startsWith('cd ')) {
        let goto = command.split('cd ')[1];
        currentNode = currentNode.children.find(child => child.name === goto)!;
      } else if (command === 'ls') {
        responses.forEach(resp => {
          if (resp.startsWith('dir ')) {
            const newDir = resp.split('dir ')[1];
            if (!currentNode.children.find(child => child.name === newDir)) {
              currentNode.children.push({ name: newDir, parent: currentNode, children: [], files: [] });
            }
          } else {
            currentNode.files.push(parseInt(resp.split(' ')[0]));
          }
        })
      }
    })

    this.treeSize = this.calcTree(this.tree);

    return sumArray(this.sizes.filter(size => size <= 100000));
  }

  solveForPartTwo(): number {
    const minDelete = this.treeSize - (70000000 - 30000000);
    const sortedSizes = sortAsNumbers(this.sizes);
    return sortedSizes.find(size => size >= minDelete)!;
  }
}

export default new Day7;
