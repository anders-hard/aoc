export const sortAsNumbers = (arr: number[]) => [...arr.sort((a, b) => a - b)];

export const sumArray = (arr: number[]): number => arr.reduce((p, c) => p + c, 0);