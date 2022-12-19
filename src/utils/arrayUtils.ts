export function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

export const extractNumbers = (s: string): number[] => [ ...s.matchAll(/[-\d]+/g)].map(s => parseInt(s[0]))

export const permute = <T>(arr: T[]) => {
  const l = arr.length,
      used = Array(l),
      data = Array(l);
  return function* backtracking(pos): Generator<T[]> {
    if (pos == l) yield data.slice();
    else for (let i = 0; i < l; ++i) if(!used[i]) {
      used[i] = true;
      data[pos] = arr[i];
      yield* backtracking(pos+1);
      used[i] = false;
    }
  }(0);
}