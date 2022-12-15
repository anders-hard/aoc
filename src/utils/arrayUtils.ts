export function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

export const extractNumbers = (s: string): number[] => [ ...s.matchAll(/[-\d]+/g)].map(s => parseInt(s[0]))