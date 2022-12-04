
export const intersect = <T>(a: Set<T>, b: Set<T>) => new Set([...a].filter(i => b.has(i)));