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

  canContainBeacon2(pos: Pos): boolean {
    if (this.beacons.find(p => p.x === pos.x && p.y === pos.y) || this.sensors.find(p => p.x === pos.x && p.y === pos.y)) {
      return false;
    }
    return !this.sensors.find((sensor, index) => {
      const beacon = this.beacons[index];
      return this.getDistance(sensor, beacon) >= this.getDistance(pos, sensor);
    });
  }

  found: Pos | undefined = undefined;

  checkPerimeter(pos: Pos, distance: number) {
    const perimeter: Pos[] = [];
    for (let i = 0; i <= distance; i++) {
      perimeter.push(
          { x: pos.x + i, y: pos.y + distance + 1 - i },
          { x: pos.x + i, y: pos.y - distance - 1 + i },
          { x: pos.x - distance - 1 + i, y: pos.y + i },
          { x: pos.x - distance - 1 + i, y: pos.y - i },
      );
    }
    perimeter.forEach(spot => {
      if (spot.x <= 4000000 && spot.x >= 0 && spot.y <= 4000000 && spot.y >= 0 && this.canContainBeacon2(spot)) {
        console.log('found', spot);
        this.found = spot;
      }
    })
  }

  solveForPartTwo(input: string): number {
    this.sensors = [];
    this.beacons = [];
    const lines = splitByNewLine(input);
    this.parseInput(lines);
    this.sensors.forEach((s, index) => this.checkPerimeter(s, this.getDistance(s, this.beacons[index])));
    return this.found!.x * 4000000 + this.found!.y;
  }
}

export default new Day15;
