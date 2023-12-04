import { Day } from "../../day";
import { splitByNewLine } from '../../utils/stringUtils';
import { extractNumbers, permute } from '../../utils/arrayUtils';

type Node = {
  name: string,
  flowRate: number,
  next: Node[],
}

class Day16 extends Day {

  constructor(){
    super(16);
  }

  distances: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
  max: number = 0;
  nodes: Map<string, Node> = new Map<string, Node>();

  calcDistances() {
    [...this.nodes.values()].forEach(start => {
      const queue: Node[] = [...start.next];
      let distance = 0;
      const map = new Map<string, number>();
      map.set(start.name, 0);
      while (queue.length) {
        ++distance;
        const next: Node[] = [];
        queue.forEach(node => {
          map.set(node.name, distance);
          next.push(...node.next.filter(n => !map.has(n.name)));
        })
        queue.splice(0, queue.length);
        queue.push(...next);
      }
      map.delete(start.name);
      this.distances.set(start.name, map);
    });
  }

  parseInput(input:string): Node {
    const lines = splitByNewLine(input);
    const nexts = new Map<string, string[]>();
    lines.forEach(line => {
      const name = line.split('Valve ')[1].split(' has')[0];
      const flowRate = extractNumbers(line)[0];
      const next = line.split(/valves? /)[1].split(', ');
      nexts.set(name, next);
      this.nodes.set(name, { name, flowRate, next: [] });
    });
    this.nodes.forEach(node => {
      node.next = nexts.get(node.name)!.map(next => this.nodes.get(next)!);
    })

    this.calcDistances();

    return this.nodes.get('AA')!;
  }

  calcMostPotential(position: Node, open: Set<Node>, time: number): { potential: number, node: Node }[] {
    const possible = [...this.nodes.values()].filter(node => node.flowRate > 0 && !open.has(node)).map(n => {
      const dist = this.distances.get(position.name)!.get(n.name)!;
      const newTimeA = time + dist + 1;
      return {
        node: n,
        potential: (30 - newTimeA) * this.nodes.get(n.name)!.flowRate,
        distance: dist,
      }
    });

    possible.sort((a, b) => a.potential - b.potential).reverse();
    return possible.slice(0, 10);
  }

  step(position: Node, open: Set<Node>, pressure: number, time: number) {
    const next = this.calcMostPotential(position, open, time);
    // console.log(position.name, [...open.values()].map(o => o.name), pressure, time);
    if (!next.length) {
      this.max = Math.max(this.max, pressure);
      return;
    }
    next.forEach(n => {
      const dist = this.distances.get(position.name)!.get(n.node.name)!
      const newTime = time + dist + 1;
      if (newTime < 30) {
        this.step(n.node, new Set<Node>(open).add(n.node), pressure + (30 - newTime) * n.node.flowRate, newTime);
      } else {
        this.max = Math.max(this.max, pressure);
      }
    })
  }

  solveForPartOne(input: string): number {
    const start = this.parseInput(input);
    this.step(start, new Set<Node>(), 0, 0);
    return this.max;
  }

  getPressure(nodes: Node[]): number {
    let t = 0;
    let i = 0;
    let p = 0;
    while (t < 25 && i < nodes.length - 1) {
      t += this.distances.get(nodes[i].name)!.get(nodes[i + 1].name)! + 1;
      if (t < 25) {
        p += nodes[i + 1].flowRate * (25 - t);
      }
      ++i;
    }
    return p;
  }

  solveForPartTwo(input: string): number {
    this.distances = new Map<string, Map<string, number>>();
    this.max = 0;
    this.nodes = new Map<string, Node>();
    const start = this.parseInput(input);

    const possible = [...this.nodes.values()].filter(n => n.flowRate && n !== start);
    for (let i = 0; i < Math.pow(2, possible.length); i++) {
      const num = i.toString(2);
      const [me, elephant] =  [
        possible.filter((n, index) => index + num.length < possible.length || parseInt(num[index - (possible.length - num.length)]) === 0),
        possible.filter((n, index) => index + num.length >= possible.length && parseInt(num[index - (possible.length - num.length)]) === 1),
      ];
      if (me.length >= (possible.length - 1) / 2 && elephant.length >= (possible.length - 1) / 2) {
        const myPermutations = permute<Node>(me);
        let myItems: Node[];
        let myMax = 0;
        while (myItems = myPermutations.next().value) {
          myMax = Math.max(myMax, this.getPressure([start, ...myItems]));
        }
        const elephantPermutations = permute<Node>(elephant);
        let elephantItems: Node[];
        let elephantMax = 0;
        while (elephantItems = elephantPermutations.next().value) {
          elephantMax = Math.max(elephantMax, this.getPressure([start, ...elephantItems]));
        }
        const pressure = myMax + elephantMax;
        if (pressure > this.max) {
          console.log('New max: ' + pressure);
          this.max = Math.max(this.max, pressure);
        }
      }
    }
    return this.max;
  }
}

export default new Day16;
