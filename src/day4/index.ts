import { Day } from "../day";
import {splitByNewLine} from "../utils/stringUtils";
import {intersect} from "../utils/setUtils";

type Card = {
  winningNumbers: string[],
  yourNumbers: string[],
  value?: number,
}
const getValueOfCard = (card: Card): number => {
  const myWinningNumbers = intersect(new Set(card.winningNumbers), new Set(card.yourNumbers));
  return myWinningNumbers.size ? Math.pow(2, myWinningNumbers.size - 1) : 0;
}

const parseCard = (line: string): Card => {
  const nums = line.split(': ')[1].split(' | ');
  return {
    winningNumbers: nums[0].split(' ').filter(n => n !== ''),
    yourNumbers: nums[1].split(' ').filter(n => n !== ''),
  }
}

const getValueOfCard2 = (allCards: Card[], index: number): number => {
  const card = allCards[index];
  const myWinningNumbers = intersect(new Set(card.winningNumbers), new Set(card.yourNumbers));
  return [...myWinningNumbers].reduce((p, c, i) => p + allCards[index + i + 1].value!, 1);
}

class Day4 extends Day {

  constructor(){
    super(4);
  }

  solveForPartOne(input: string): string | number {
    return splitByNewLine(input).reduce((p, c) => {
      return p + getValueOfCard(parseCard(c))
    }, 0)
  }

  solveForPartTwo(input: string): string | number {
    const cards = splitByNewLine(input).map(line => parseCard(line));
    [...cards].reverse().forEach((card, index) => card.value = getValueOfCard2(cards, cards.length - index - 1));
    return cards.reduce((p, c) => {
      return p + c.value!;
    }, 0)
  }
}

export default new Day4;
