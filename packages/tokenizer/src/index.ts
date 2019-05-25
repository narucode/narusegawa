import { CodeCharacter } from '@narucode/characterizer';

export function* tokenize(characters: IterableIterator<CodeCharacter>): IterableIterator<Token> {
    let offset = 0;
    for (const character of characters) {
        try {
            yield {
                type: 'whitespace',
                characters: [character],
                offset,
                row: 0,
                col: 0,
            };
        } finally {
            ++offset;
        }
    }
}

export interface Token {
    type: TokenType;
    characters: CodeCharacter[];
    offset: number;
    /**
     * zero based row offset
     */
    row: number;
    /**
     * zero based column offset
     */
    col: number;
}

export type TokenType =
    | 'whitespace'
    | 'newline'
    | 'comment'
    | 'delimiter'
    | 'punctuation'
    | 'keyword'
    | 'bareName'
    | 'operatorName'
    | 'quotedName'
    | 'placeholderName'
    | 'numberLiteral'
    | 'quotedLiteral'
;
