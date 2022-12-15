import { Day } from "../day";
import { splitByNewLine } from '../utils/stringUtils';
import { extractNumbers } from '../utils/arrayUtils';

type Pos = { x: number, y: number }

class Day15 extends Day {

  constructor(){
    super(15);
  }

  sensors: Pos[] = [];
  beacons: Pos[] = [];

  getDistance(pos1: Pos, pos2: Pos) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
  }

  parseInput(lines: string[]) {
    lines.forEach(line => {
      const [sensorX, sensorY, beaconX, beaconY] = extractNumbers(line);
      this.sensors.push({ x: sensorX, y: sensorY });
      this.beacons.push({ x: beaconX, y: beaconY });
    })
  }

  canContainBeacon(pos: Pos): boolean {
    if (this.beacons.find(p => p.x === pos.x && p.y === pos.y)) {
      return true;
    }
    return !this.sensors.find((sensor, index) => {
      const beacon = this.beacons[index];
      return this.getDistance(sensor, beacon) >= this.getDistance(pos, sensor);
    });
  }

  solveForPartOne(input: string): number {
    const lines = splitByNewLine(input);
    this.parseInput(lines);
    const allX: number[] = [...this.sensors.map(p => p.x), ...this.beacons.map(p => p.x)];
    const [xMin, xMax] = [Math.min(...allX), Math.max(...allX)]
    let count = 0;
    for (let i = xMin - 100; i <= xMax + 100; i++) {
      if (!this.canContainBeacon({ x: i, y: 2000000 })) {
        ++count;
      }
    }
    return count;
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day15;
