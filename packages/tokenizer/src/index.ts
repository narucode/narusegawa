import { CodeCharacter, CodeCharacterType } from '@narucode/characterizer';

export function* tokenize(characters: IterableIterator<CodeCharacter>): IterableIterator<Token> {
    let offset = 0;
    let col = 0;
    let row = 0;
    let currentToken: Token | null = null;
    for (const character of characters) {
        try {
            if (!currentToken) {
                currentToken = {
                    type: guessTokenType[character.type](character),
                    characters: [character],
                    offset,
                    col,
                    row,
                };
                continue;
            }
            const [action, tokenType] = push[currentToken.type](character, currentToken);
            if (tokenType) currentToken.type = tokenType;
            if (action === 'continue') {
                currentToken.characters.push(character);
                continue;
            }
            yield currentToken;
            const isNewline = currentToken.type === 'newline';
            currentToken = {
                type: guessTokenType[character.type](character),
                characters: [character],
                offset,
                col,
                row,
            };
            if (isNewline) {
                col = -1;
                ++row;
            }
        } finally {
            ++offset;
            ++col;
        }
    }
    if (!currentToken) return;
    const [_, tokenType] = push[currentToken.type](eof, currentToken);
    if (tokenType) currentToken.type = tokenType;
    yield currentToken;
}

const guessTokenType: { [codeType in CodeCharacterType]: (character: CodeCharacter) => TokenType } = {
    closingGrouping: () => 'closingGrouping',
    closingQuote: () => { throw new Error(); },
    decimalDigit: () => 'numberLiteral',
    horizontalSpace: () => 'whitespace',
    nameContinue: () => { throw new Error(); },
    nameStart: () => 'unquotedName',
    openingGrouping: () => 'openingGrouping',
    openingQuote: () => 'quotedLiteral',
    punctuation: () => 'punctuation',
    togglingQuote: character => character.char === '`' ? 'quotedName' : 'quotedLiteral',
    verticalSpace: () => 'newline',
};

const eof = { type: '<EOF>', char: '<EOF>', codePoint: 0 } as const;
type PushRules = {
    [ruleName in TokenType]: (character: CodeCharacter | typeof eof, token: Readonly<Token>) => PushResult;
};
type PushResult =
    | ['emit', TokenType]
    | ['continue', TokenType | null]
;
const push: PushRules = {
    whitespace(character) {
        if (character.type === 'horizontalSpace') return ['continue', null];
        return ['emit', 'whitespace'];
    },
    newline(character, token) {
        if ((token.characters[0].char === '\r') && (character.char === '\n')) return ['continue', null];
        return ['emit', 'newline'];
    },
    comment(character, token) {
        if (character.type !== 'verticalSpace') return ['continue', null];
        return ['emit', 'comment'];
    },
    openingGrouping(character, token) {
        if (character.type === 'openingGrouping') return ['continue', null];
        return ['emit', 'openingGrouping'];
    },
    closingGrouping(character, token) {
        if (character.type === 'closingGrouping') return ['continue', null];
        return ['emit', 'closingGrouping'];
    },
    punctuation(character, token) {
        if (character.type === 'punctuation') {
            if (
                (token.characters.length === 1) &&
                (token.characters[0].char === '-') &&
                (character.char === '-')
            ) {
                return ['continue', 'comment'];
            }
            return ['continue', null];
        }
        return ['emit', 'punctuation'];
    },
    keyword(character, token) {
        throw new Error();
    },
    unquotedName(character, token) {
        if (
            (character.type === 'nameStart') ||
            (character.type === 'nameContinue') ||
            (character.type === 'decimalDigit')
        ) return ['continue', null];
        if ((token.characters.length === 1) && (token.characters[0].char === '_')) {
            return ['emit', 'placeholderName'];
        }
        return ['emit', 'unquotedName'];
    },
    quotedName(character, token) {
        if (token.characters.length === 1) return ['continue', null];
        if (token.characters[token.characters.length - 1].char !== '`') return ['continue', null];
        return ['emit', 'quotedName'];
    },
    placeholderName(character, token) {
        throw new Error();
    },
    numberLiteral(character, token) {
        // TODO
        return ['emit', 'numberLiteral'];
    },
    quotedLiteral(character, token) {
        // TODO
        if (token.characters.length === 1) return ['continue', null];
        const first = token.characters[0].char;
        const last = token.characters[token.characters.length - 1].char;
        if (first !== last) return ['continue', null];
        return ['emit', 'quotedLiteral'];
    },
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
    | 'openingGrouping'
    | 'closingGrouping'
    | 'punctuation'
    | 'keyword'
    | 'unquotedName'
    | 'quotedName'
    | 'placeholderName'
    | 'numberLiteral'
    | 'quotedLiteral'
;
