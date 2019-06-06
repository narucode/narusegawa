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
                    type: guessingTokenTypeMap[character.type],
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
                type: guessingTokenTypeMap[character.type],
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

// TODO: 토큰타입만 갖고 구분 못하는 경우를 처리하려면 그냥 글자가 뭔지 봐야하지 않을까?
// `guessTokenTypeByFirstCharacter` 함수로 만들자
const guessingTokenTypeMap: { [codeType in CodeCharacterType]: TokenType } = {
    closingGrouping: 'closingGrouping',
    closingQuote: 'quotedLiteral', // TODO: `closingQuote`로는 토큰이 시작되면 안 됨
    decimalDigit: 'numberLiteral',
    horizontalSpace: 'whitespace',
    nameContinue: 'unquotedName', // TODO: `nameContinue`로는 토큰이 시작되면 안 됨
    nameStart: 'unquotedName',
    openingGrouping: 'openingGrouping',
    openingQuote: 'quotedLiteral',
    punctuation: 'punctuation',
    togglingQuote: 'quotedLiteral',
    verticalSpace: 'newline',
};

const eof = { type: '<EOF>', char: '<EOF>', codePoint: 0 };
type PushRules = {
    [ruleName in TokenType]: (character: CodeCharacter | typeof eof, token: Readonly<Token>) => PushResult;
};
type PushResult =
    | ['emit', TokenType]
    | ['continue', TokenType | null]
;
const push: PushRules = {
    whitespace(character) {
        if (character.type !== 'horizontalSpace') return ['emit', 'whitespace'];
        return ['continue', null];
    },
    newline(character, token) {
        if ((token.characters[0].char === '\r') && (character.char === '\n')) return ['continue', null];
        return ['emit', 'newline'];
    },
    comment(character, token) {
        // TODO
        return ['emit', 'comment'];
    },
    openingGrouping(character, token) {
        if (character.type !== 'openingGrouping') return ['emit', 'openingGrouping'];
        return ['continue', null];
    },
    closingGrouping(character, token) {
        if (character.type !== 'closingGrouping') return ['emit', 'closingGrouping'];
        return ['continue', null];
    },
    punctuation(character, token) {
        if (character.type !== 'punctuation') return ['emit', 'punctuation'];
        return ['continue', null];
    },
    keyword(character, token) {
        // TODO: error
        return ['emit', 'keyword'];
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
        // TODO
        return ['emit', 'quotedName'];
    },
    placeholderName(character, token) {
        // TODO: error
        return ['emit', 'placeholderName'];
    },
    numberLiteral(character, token) {
        // TODO
        return ['emit', 'numberLiteral'];
    },
    quotedLiteral(character, token) {
        // TODO
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
