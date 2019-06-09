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
    | 'opening_grouping'
    | 'closing_grouping'
    | 'punctuation'
    | 'keyword'
    | 'unquoted_name'
    | 'quoted_name'
    | 'placeholder_name'
    | 'number_literal'
    | 'quoted_literal'
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
    'closing_grouping': () => 'closing_grouping',
    'closing_quote': () => { throw new Error(); },
    'decimal_digit': () => 'number_literal',
    'horizontal_space': () => 'whitespace',
    'name_continue': () => { throw new Error(); },
    'name_start': () => 'unquoted_name',
    'opening_grouping': () => 'opening_grouping',
    'opening_quote': () => 'quoted_literal',
    'punctuation': () => 'punctuation',
    'toggling_quote': character => character.char === '`' ? 'quoted_name' : 'quoted_literal',
    'vertical_space': () => 'newline',
};

type PushRules = {
    [ruleName in TokenType]: (character: CodeCharacter | typeof eof, token: Readonly<Token>) => PushResult;
};
type PushResult =
    | ['emit', TokenType]
    | ['continue', TokenType | null]
;
const push: PushRules = {
    'whitespace'(character) {
        if (character.type === 'horizontal_space') return ['continue', null];
        return ['emit', 'whitespace'];
    },
    'newline'(character, token) {
        if ((token.characters[0].char === '\r') && (character.char === '\n')) return ['continue', null];
        return ['emit', 'newline'];
    },
    'comment'(character, token) {
        if (character.type !== 'vertical_space') return ['continue', null];
        return ['emit', 'comment'];
    },
    'opening_grouping'(character, token) {
        if (character.type === 'opening_grouping') return ['continue', null];
        return ['emit', 'opening_grouping'];
    },
    'closing_grouping'(character, token) {
        if (character.type === 'closing_grouping') return ['continue', null];
        return ['emit', 'closing_grouping'];
    },
    'punctuation'(character, token) {
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
    'keyword'(character, token) {
        throw new Error();
    },
    'unquoted_name'(character, token) {
        if (
            (character.type === 'name_start') ||
            (character.type === 'name_continue') ||
            (character.type === 'decimal_digit')
        ) return ['continue', null];
        if ((token.characters.length === 1) && (token.characters[0].char === '_')) {
            return ['emit', 'placeholder_name'];
        }
        return ['emit', 'unquoted_name'];
    },
    'quoted_name'(character, token) {
        if (token.characters.length === 1) return ['continue', null];
        if (token.characters[token.characters.length - 1].char !== '`') return ['continue', null];
        return ['emit', 'quoted_name'];
    },
    'placeholder_name'(character, token) {
        throw new Error();
    },
    'number_literal'(character, token) {
        // TODO
        return ['emit', 'number_literal'];
    },
    'quoted_literal'(character, token) {
        // TODO
        if (token.characters.length === 1) return ['continue', null];
        const first = token.characters[0].char;
        const last = token.characters[token.characters.length - 1].char;
        if (first !== last) return ['continue', null];
        return ['emit', 'quoted_literal'];
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
