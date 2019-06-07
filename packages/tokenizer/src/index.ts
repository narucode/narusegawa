import { CodeCharacter, CodeCharacterType } from '@narucode/characterizer';

export interface Token {
    type: TokenType;
    characters: Readonly<CodeCharacter>[];
    offset: number;
    /**
     * zero based column offset
     */
    col: number;
    /**
     * zero based row offset
     */
    row: number;
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

export const eof = {
    type: '<EOF>',
    char: '',
    codePoint: -1,
} as const;

export interface TokenizeState {
    current: Token | null;
    offset: number;
    col: number;
    row: number;
}

export function getInitialTokenizeState(): TokenizeState {
    return {
        current: null,
        offset: 0,
        col: 0,
        row: 0,
    };
}

/**
 * @param characters 토큰화에 사용할 코드 문자열입니다.
 * @param state 토큰화 상태입니다.
 *              이전 토큰화 처리중 중간에 끊어진 상태를 이어받아서 계속 처리할 수 있습니다.
 *              인자로 넣어준 상태는 토큰화 처리중 변경됩니다.
 * @param eofCharacter 토큰화를 끝맺기 위한 코드 문자입니다.
 */
export function* tokenize(
    characters: Iterable<CodeCharacter>,
    state: TokenizeState = getInitialTokenizeState(),
    eofCharacter: CodeCharacter | typeof eof | null = eof,
): IterableIterator<Token> {
    for (const character of characters) {
        try {
            if (!state.current) {
                state.current = {
                    type: guessTokenType[character.type](character),
                    characters: [character],
                    offset: state.offset,
                    col: state.col,
                    row: state.row,
                };
                continue;
            }
            const [action, tokenType] = push[state.current.type](character, state.current);
            if (tokenType) state.current.type = tokenType;
            if (action === 'continue') {
                state.current.characters.push(character);
                continue;
            }
            yield state.current;
            const isNewline = state.current.type === 'newline';
            state.current = {
                type: guessTokenType[character.type](character),
                characters: [character],
                offset: state.offset,
                col: state.col,
                row: state.row,
            };
            if (isNewline) {
                state.col = -1;
                ++state.row;
            }
        } finally {
            ++state.offset;
            ++state.col;
        }
    }
    if (!eofCharacter) return;
    try {
        if (!state.current) return;
        const [_, tokenType] = push[state.current.type](eofCharacter, state.current);
        if (tokenType) state.current.type = tokenType;
        yield state.current;
    } finally {
        state.current = null;
        state.offset = 0;
        state.col = 0;
        state.row = 0;
    }
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

export function cloneTokenizeState(tokenizeState: TokenizeState): TokenizeState {
    return {
        ...tokenizeState,
        current: tokenizeState.current && cloneToken(tokenizeState.current),
    };
}
export function equalsTokenizeState(a: TokenizeState, b: TokenizeState): boolean {
    return (
        (a.offset === b.offset) &&
        (a.col === b.col) &&
        (a.row === b.row) &&
        equalsToken(a.current, b.current)
    );
}
export function cloneToken(token: Token): Token {
    return {
        type: token.type,
        characters: [...token.characters],
        offset: token.offset,
        col: token.col,
        row: token.row,
    };
}
export function equalsToken(a: Token | null, b: Token | null): boolean {
    if (!a) return !b;
    if (!b) return !a;
    if (a.type !== b.type) return false;
    if (a.offset !== b.offset) return false;
    if (a.col !== b.col) return false;
    if (a.row !== b.row) return false;
    if (a.characters.length !== b.characters.length) return false;
    for (let i = 0; i < a.characters.length; ++i) {
        const [aChar, bChar] = [a.characters[i], b.characters[i]];
        if (aChar.codePoint !== bChar.codePoint) return false;
    }
    return true;
}
