export const splitByNewLine = (s: string): string[] => s.split(/\r?\n/);

export const splitByDoubleNewLine = (s: string): string[] => s.split(/\r?\n\r?\n/);

export const splitByNewLineWithMap = <T>(s: string, mapFunc: (str: string) => T): T[] => splitByNewLine(s).map(str => mapFunc(str));

export const reverseString = (s: string) => s.split('').reverse().join('');