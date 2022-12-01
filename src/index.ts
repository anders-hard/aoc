import { Day } from './day';
import day1 from './day1/index';
// MORE IMPORTS HERE
const days: Day[] = [
    day1,
    // MORE DAYS HERE
];

async function runDay(dayId: number) {
  const resultPart1 = await days[dayId - 1].partOne();
  console.log("Part 1 result:\n");
  console.log(resultPart1);

  console.log("\n");

  const resultPart2 = await days[dayId - 1].partTwo();
  console.log("Part 2 result:\n");
  console.log(resultPart2);
}

console.log("\n\n\n   ADVENT OF CODE 2022 \n\n");
const params = process.argv.splice(2);
if (params.length) {
  runDay(parseInt(params[0], 10));
} else {
  console.log(`Usage: npm run start [day]`);
  console.log(`Available days: [ ${days.map((x) => x.id).join(", ")} ]`);
}
