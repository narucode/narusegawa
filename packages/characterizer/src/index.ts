import * as data from './data';

export function* characterize(text: string): IterableIterator<CodeCharacter> {
    for (const char of text) {
        const codePoint = char.codePointAt(0)!;
        yield { type: characterType(char), char, codePoint } as CodeCharacter;
    }
}

function characterType(char: string): CodeCharacter['type'] {
    if (data.closingDelimiterRegex.test(char)) return 'closingDelimiter';
    if (data.closingQuoteRegex.test(char)) return 'closingQuote';
    if (data.decimalDigitRegex.test(char)) return 'decimalDigit';
    if (data.horizontalSpaceRegex.test(char)) return 'horizontalSpace';
    if (data.nameContinueRegex.test(char)) return 'nameContinue';
    if (data.nameStartRegex.test(char)) return 'nameStart';
    if (data.openingDelimiterRegex.test(char)) return 'openingDelimiter';
    if (data.openingQuoteRegex.test(char)) return 'openingQuote';
    if (data.punctuationRegex.test(char)) return 'punctuation';
    if (data.togglingQuoteRegex.test(char)) return 'togglingQuote';
    if (data.verticalSpaceRegex.test(char)) return 'verticalSpace';
    throw new Error(`unknown character: ${char}`);
}

export interface CodeCharacter {
    type: CodeCharacterType;
    char: string;
    codePoint: number;
}

export type CodeCharacterType =
    | 'closingDelimiter'
    | 'closingQuote'
    | 'decimalDigit'
    | 'horizontalSpace'
    | 'nameContinue'
    | 'nameStart'
    | 'openingDelimiter'
    | 'openingQuote'
    | 'punctuation'
    | 'togglingQuote'
    | 'verticalSpace'
;
