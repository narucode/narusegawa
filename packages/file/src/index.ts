export interface NaruFile {
    uri?: string;
    text: string;
    /**
     * newline token 바로 다음에 오는 글자의 utf-16 오프셋으로 이루어진 배열입니다.
     */
    lines: number[];
}

export const text2narufile = (text: string): NaruFile => ({ text, lines: getLines(text) });

export function* iterLines(narufile: NaruFile) {
    let lastLineOffset = 0;
    for (const lineOffset of narufile.lines) {
        yield narufile.text.substring(lastLineOffset, lineOffset);
        lastLineOffset = lineOffset;
    }
    yield narufile.text.substr(lastLineOffset);
}

export interface Position {
    /**
     * zero based column offset
     */
    col: number;
    /**
     * zero based row offset
     */
    row: number;
}

export function getPosition(file: NaruFile, offset: number): Position {
    const row = bisect(file.lines, offset);
    const col = (row === 0) ? 0 : offset - file.lines[row - 1];
    return { col, row };
}

export function getLines(text: string): number[] {
    const result: number[] = [];
    for (let i = 0; i < text.length; ++i) {
        const char = text[i];
        switch (char) {
            case '\r': if (text[i + 1] === '\n') continue;
            case '\n':
            case '\x85':
            case '\u2028':
            case '\u2029':
                result.push(i + 1);
                break;
        }
    }
    return result;
}

function bisect(
    a: number[],
    x: number,
    lo: number = 0,
    hi: number = a.length,
) {
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (x < a[mid]) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
