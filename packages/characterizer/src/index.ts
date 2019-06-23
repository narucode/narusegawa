import * as data from './data';

export function* characterize(text: string): IterableIterator<CodeCharacter> {
    for (const char of text) yield character(char);
}

export function character(char: string): CodeCharacter {
    return Object.freeze({
        type: characterType(char),
        char,
    });
}

export function characterType(char: string): CodeCharacter['type'] {
    if (data.closingGroupingRegex.test(char)) return 'closing_grouping';
    if (data.closingQuoteRegex.test(char)) return 'closing_quote';
    if (data.decimalDigitRegex.test(char)) return 'decimal_digit';
    if (data.horizontalSpaceRegex.test(char)) return 'horizontal_space';
    if (data.nameContinueRegex.test(char)) return 'name_continue';
    if (data.nameStartRegex.test(char)) return 'name_start';
    if (data.openingGroupingRegex.test(char)) return 'opening_grouping';
    if (data.openingQuoteRegex.test(char)) return 'opening_quote';
    if (data.punctuationRegex.test(char)) return 'punctuation';
    if (data.togglingQuoteRegex.test(char)) return 'toggling_quote';
    if (data.verticalSpaceRegex.test(char)) return 'vertical_space';
    return 'unclassified';
}

export interface CodeCharacter {
    type: CodeCharacterType;
    char: string;
}

export type CodeCharacterType =
    | 'closing_grouping'
    | 'closing_quote'
    | 'decimal_digit'
    | 'horizontal_space'
    | 'name_continue'
    | 'name_start'
    | 'opening_grouping'
    | 'opening_quote'
    | 'punctuation'
    | 'toggling_quote'
    | 'vertical_space'
    | 'unclassified'
;
