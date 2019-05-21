export function* characterize(text: string): IterableIterator<CodeCharacter> {
    for (const char of text) {
        const codePoint = char.codePointAt(0)!;
        yield { type: characterType(codePoint), char, codePoint } as CodeCharacter;
    }
}

function characterType(codePoint: number): CodeCharacter['type'] {
    if (isClosingDelimiter(codePoint)) return 'closingDelimiter';
    if (isClosingQuote(codePoint)) return 'closingQuote';
    if (isDecimalDigit(codePoint)) return 'decimalDigit';
    if (isHorizontalSpace(codePoint)) return 'horizontalSpace';
    if (isNameContinue(codePoint)) return 'nameContinue';
    if (isNameStart(codePoint)) return 'nameStart';
    if (isOpeningDelimiter(codePoint)) return 'openingDelimiter';
    if (isOpeningQuote(codePoint)) return 'openingQuote';
    if (isPunctuation(codePoint)) return 'punctuation';
    if (isTogglingQuote(codePoint)) return 'togglingQuote';
    if (isVerticalSpace(codePoint)) return 'verticalSpace';
    return null as never;
}

function isClosingDelimiter(codePoint: number) {
    if (codePoint === 0x29) return true;
    if (codePoint === 0x5d) return true;
    if (codePoint === 0x7d) return true;
    if (codePoint === 0x2046) return true;
    if (codePoint === 0x2309) return true;
    if (codePoint === 0x230b) return true;
    if (codePoint === 0x232a) return true;
    if (codePoint === 0x2769) return true;
    if (codePoint === 0x276b) return true;
    if (codePoint === 0x276d) return true;
    if (codePoint === 0x276f) return true;
    if (codePoint === 0x2771) return true;
    if (codePoint === 0x2773) return true;
    if (codePoint === 0x2775) return true;
    if (codePoint === 0x27c6) return true;
    if (codePoint === 0x27e7) return true;
    if (codePoint === 0x27e9) return true;
    if (codePoint === 0x27eb) return true;
    if (codePoint === 0x27ed) return true;
    if (codePoint === 0x27ef) return true;
    if (codePoint === 0x2984) return true;
    if (codePoint === 0x2986) return true;
    if (codePoint === 0x2988) return true;
    if (codePoint === 0x298a) return true;
    if (codePoint === 0x298c) return true;
    if (codePoint === 0x298e) return true;
    if (codePoint === 0x2990) return true;
    if (codePoint === 0x2992) return true;
    if (codePoint === 0x2994) return true;
    if (codePoint === 0x2996) return true;
    if (codePoint === 0x2998) return true;
    if (codePoint === 0x29d9) return true;
    if (codePoint === 0x29db) return true;
    if (codePoint === 0x29fd) return true;
    if (codePoint === 0x2e23) return true;
    if (codePoint === 0x2e25) return true;
    if (codePoint === 0x2e27) return true;
    if (codePoint === 0x2e29) return true;
    if (codePoint === 0x3009) return true;
    if (codePoint === 0x300b) return true;
    if (codePoint === 0x300d) return true;
    if (codePoint === 0x300f) return true;
    if (codePoint === 0x3011) return true;
    if (codePoint === 0x3015) return true;
    if (codePoint === 0x3017) return true;
    if (codePoint === 0x3019) return true;
    if (codePoint === 0x301b) return true;
    if (codePoint === 0x301e) return true;
    if (codePoint === 0x301f) return true;
    if (codePoint === 0xfd3e) return true;
    return false;
}

function isClosingQuote(codePoint: number) {
    if (codePoint === 0x2019) return true;
    if (codePoint === 0x203a) return true;
    if (codePoint === 0x201d) return true;
    if (codePoint === 0xbb) return true;
    if (codePoint === 0x2e03) return true;
    if (codePoint === 0x2e05) return true;
    if (codePoint === 0x2e0a) return true;
    if (codePoint === 0x2e0d) return true;
    if (codePoint === 0x2e1d) return true;
    if (codePoint === 0x2e21) return true;
    return false;
}

function isDecimalDigit(codePoint: number) {
    // TODO
    if (codePoint === 0x0) return true;
    return false;
}

function isHorizontalSpace(codePoint: number) {
    // TODO
    if (codePoint === 0x0) return true;
    return false;
}

function isNameContinue(codePoint: number) {
    // TODO
    if (codePoint === 0x0) return true;
    return false;
}

function isNameStart(codePoint: number) {
    // TODO
    if (codePoint === 0x0) return true;
    return false;
}

function isOpeningDelimiter(codePoint: number) {
    // TODO
    if (codePoint === 0x0) return true;
    return false;
}

function isOpeningQuote(codePoint: number) {
    // TODO
    if (codePoint === 0x0) return true;
    return false;
}

function isPunctuation(codePoint: number) {
    // TODO
    if (codePoint === 0x0) return true;
    return false;
}

function isTogglingQuote(codePoint: number) {
    // TODO
    if (codePoint === 0x0) return true;
    return false;
}

function isVerticalSpace(codePoint: number) {
    // TODO
    if (codePoint === 0x0) return true;
    return false;
}

export type CodeCharacter =
    | ClosingDelimiterCharacter
    | ClosingQuoteCharacter
    | DecimalDigitCharacter
    | HorizontalSpaceCharacter
    | NameContinueCharacter
    | NameStartCharacter
    | OpeningDelimiterCharacter
    | OpeningQuoteCharacter
    | PunctuationCharacter
    | TogglingQuoteCharacter
    | VerticalSpaceCharacter;

export interface ClosingDelimiterCharacter { type: 'closingDelimiter'; char: string; codePoint: number; }
export interface ClosingQuoteCharacter { type: 'closingQuote'; char: string; codePoint: number; }
export interface DecimalDigitCharacter { type: 'decimalDigit'; char: string; codePoint: number; }
export interface HorizontalSpaceCharacter { type: 'horizontalSpace'; char: string; codePoint: number; }
export interface NameContinueCharacter { type: 'nameContinue'; char: string; codePoint: number; }
export interface NameStartCharacter { type: 'nameStart'; char: string; codePoint: number; }
export interface OpeningDelimiterCharacter { type: 'openingDelimiter'; char: string; codePoint: number; }
export interface OpeningQuoteCharacter { type: 'openingQuote'; char: string; codePoint: number; }
export interface PunctuationCharacter { type: 'punctuation'; char: string; codePoint: number; }
export interface TogglingQuoteCharacter { type: 'togglingQuote'; char: string; codePoint: number; }
export interface VerticalSpaceCharacter { type: 'verticalSpace'; char: string; codePoint: number; }
