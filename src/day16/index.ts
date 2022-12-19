import { Day } from "../day";
import { splitByNewLine } from '../utils/stringUtils';
import { extractNumbers } from '../utils/arrayUtils';
const BigSet = require('big-set');

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

  visited = new BigSet();

  stepsToString(steps: [string[], string[]]): string {
    return steps.map(s => s.join('.')).join('-');
  }

  stepsToString2(steps: [string[], string[]]): string {
    return steps.map(s => s.join('.')).reverse().join('-');
  }

  step2(position1: Node, position2: Node, left: Set<Node>, pressure: number, time1: number, time2: number, steps: [string[], string[]]) {
    const totalTime = 26;
    const next = [...left.values()];
    next.forEach(n => {
      const dist = this.distances.get(position1.name)!.get(n.name)!
      const newTime = time1 + dist + 1;
      const potential = (totalTime - newTime) * this.nodes.get(n.name)!.flowRate
      if (newTime < totalTime) {
        const newSteps: [string[], string[]] = [[...steps[0], n.name], [...steps[1]]];
        if (!this.visited.has(this.stepsToString(newSteps)) && !this.visited.has(this.stepsToString2(newSteps))) {
          this.visited.add(this.stepsToString(newSteps));
          const newLeft = new Set<Node>(left);
          newLeft.delete(n);
          this.step2(n, position2, newLeft, pressure + potential, newTime, time2, newSteps);
        }
      }
    })
    if (position1 !== position2 && time1 !== time2) {
      next.forEach(n => {
        const dist = this.distances.get(position2.name)!.get(n.name)!
        const newTime = time2 + dist + 1;
        const potential = (totalTime - newTime) * this.nodes.get(n.name)!.flowRate
        if (newTime < totalTime) {
          const newSteps: [string[], string[]] = [[...steps[0]], [...steps[1], n.name]];
          if (!this.visited.has(this.stepsToString(newSteps)) && !this.visited.has(this.stepsToString2(newSteps))) {
            this.visited.add(this.stepsToString(newSteps));
            const newLeft = new Set<Node>(left);
            newLeft.delete(n);
            this.step2(position1, n, newLeft, pressure + potential, time1, newTime, newSteps);
          }
        }
      })
    }
    if (pressure >= this.max) {
      console.log('New max: ' + pressure, steps);
      this.max = pressure;
    }
  }
  /*
  step3(position1: Node, position2: Node, left: Set<Node>, pressure: number, time: number, steps: [string[], string[]]) {
    const totalTime = 26;
    const next = [...left.values()];
    if (time2 >= time1) {
      next.forEach(n => {
        const dist = this.distances.get(position1.name)!.get(n.name)!
        const newTime = time1 + dist + 1;
        const potential = (totalTime - newTime) * this.nodes.get(n.name)!.flowRate
        if (newTime <= totalTime) {
          const newLeft = new Set<Node>(left);
          newLeft.delete(n);
          this.step2(n, position2, newLeft, pressure + potential, newTime, time2, [[...steps[0], n.name], [...steps[1]]]);
        }
      })
    } else {
      next.forEach(n => {
        const dist = this.distances.get(position2.name)!.get(n.name)!
        const newTime = time2 + dist + 1;
        const potential = (totalTime - newTime) * this.nodes.get(n.name)!.flowRate
        if (newTime <= totalTime) {
          const newLeft = new Set<Node>(left);
          newLeft.delete(n);
          this.step2(position1, n, newLeft, pressure + potential, time1, newTime, [[...steps[0]], [...steps[1], n.name]]);
        }
      })
    }
    if (pressure >= this.max) {
      console.log('New max: ' + pressure, steps);
      this.max = pressure;
    }
  }*/

  solveForPartOne(input: string): number {
    const start = this.parseInput(input);
    this.step(start, new Set<Node>(), 0, 0);
    return this.max;
  }

  solveForPartTwo(input: string): number {
    this.distances = new Map<string, Map<string, number>>();
    this.max = 0;
    this.nodes = new Map<string, Node>();
    const start = this.parseInput(input);
    this.visited.add(this.stepsToString([[start.name], [start.name]]));
    this.step2(start, start, new Set([...this.nodes.values()].filter(n => n.flowRate)), 0, 0, 0, [[start.name], [start.name]]);
    return this.max;
  }
}

export default new Day16;
