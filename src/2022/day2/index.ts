import { Day } from "../../day";
import { splitByNewLine } from '../../utils/stringUtils';

type ELF = 'A' | 'B' | 'C'
type ME = 'X' | 'Y' | 'Z';
type RES = 'loss' | 'draw' | 'win';
type POINT = 1 | 2 | 3;

class Day2 extends Day {

    constructor(){
        super(2);
    }

    pointsByFigure: { [me in ME]: POINT } = {
        'X': 1,
        'Y': 2,
        'Z': 3
    }
    figureByPoints: { [point in POINT]: ME } = {
        1: 'X',
        2: 'Y',
        3: 'Z',
    }
    pointsByResult: { [res in RES]: number } = {
        'win': 6,
        'draw': 3,
        'loss': 0,
    }
    indexByShape: { [index in ELF | ME]: POINT } = {
        'A': 1,
        'B': 2,
        'C': 3,
        'X': 1,
        'Y': 2,
        'Z': 3,
    }
    resByChar: { [me in ME]: RES } = {
        'X': 'loss',
        'Y': 'draw',
        'Z': 'win',
    }

    calcPoints(elf: ELF, me: ME): number {
        const res =
            this.indexByShape[elf] === this.indexByShape[me] ? 'draw' :
                this.indexByShape[me] - this.indexByShape[elf] === 1 || this.indexByShape[me] - this.indexByShape[elf] === -2 ? 'win' : 'loss';
        return this.pointsByFigure[me] + this.pointsByResult[res];
    }

    calcMove(elf: ELF, res: RES): ME {
        if (res === 'draw') return this.figureByPoints[this.indexByShape[elf]];
        if (res === 'win') return this.figureByPoints[(this.indexByShape[elf] % 3) + 1 as POINT];
        return this.figureByPoints[((this.indexByShape[elf] + 1) % 3) + 1 as POINT];
    }

    solveForPartOne(input: string): number {
        const rounds = splitByNewLine(input);
        let points = 0;
        rounds.forEach(round => {
            const [elf, me] = round.split(' ');
            points = points + this.calcPoints(elf as ELF, me as ME);
        })
        return points;
    }

    solveForPartTwo(input: string): number {
        const rounds = splitByNewLine(input);
        let points = 0;
        rounds.forEach(round => {
            const [elf, res] = round.split(' ');
            const me = this.calcMove(elf as ELF, this.resByChar[res as ME]);
            points = points + this.calcPoints(elf as ELF, me);
        })
        return points;
    }
}

export default new Day2;
