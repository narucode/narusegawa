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
    context: SyntacticContext;
    lastCharacter: CodeCharacter | null;
    offset: number;
    col: number;
    row: number;
}

export function getInitialTokenizeState(): TokenizeState {
    return {
        current: null,
        context: getInitialSyntacticContext(),
        lastCharacter: null,
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
            const [action, tokenType] = push[state.current.type](
                character,
                state.current,
                state.context,
            );
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
        const [_, tokenType] = push[state.current.type](
            eofCharacter,
            state.current,
            state.context,
        );
        if (tokenType) state.current.type = tokenType;
        yield state.current;
    } finally {
        state.current = null;
        state.offset = 0;
        state.col = 0;
        state.row = 0;
    }
}

export interface SyntacticContext {
    blocks: SyntacticContextBlock[];
}

export interface SyntacticContextBlock {
    keywords: Set<string>;
}

export function getInitialSyntacticContext(): SyntacticContext {
    return {
        blocks: [{
            keywords: new Set([
                'assert', 'break', 'continue', 'else', 'false',
                'fn', 'for', 'if', 'new', 'package',
                'pub', 'return', 'static', 'switch', 'syntax',
                'test', 'true', 'type', 'use', 'var',
                'yield',
            ]),
        }],
    };
}

export function hasKeyword(context: SyntacticContext, keyword: string): boolean {
    return !!context.blocks.find(block => block.keywords.has(keyword));
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
    [ruleName in TokenType]: (
        character: CodeCharacter | typeof eof,
        token: Readonly<Token>,
        context: SyntacticContext,
    ) => PushResult;
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
    'comment'(character) {
        if (character.type !== 'vertical_space') return ['continue', null];
        return ['emit', 'comment'];
    },
    'opening_grouping'(character) {
        if (character.type === 'opening_grouping') return ['continue', null];
        return ['emit', 'opening_grouping'];
    },
    'closing_grouping'(character) {
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
    'keyword'() {
        throw new Error();
    },
    'unquoted_name'(character, token, context) {
        if (
            (character.type === 'name_start') ||
            (character.type === 'name_continue') ||
            (character.type === 'decimal_digit')
        ) return ['continue', null];
        if ((token.characters.length === 1) && (token.characters[0].char === '_')) {
            return ['emit', 'placeholder_name'];
        }
        if (hasKeyword(context, token.characters.map(character => character.char).join(''))) {
            return ['emit', 'keyword'];
        }
        return ['emit', 'unquoted_name'];
    },
    'quoted_name'(_character, token) {
        if (token.characters.length === 1) return ['continue', null];
        if (token.characters[token.characters.length - 1].char !== '`') return ['continue', null];
        return ['emit', 'quoted_name'];
    },
    'placeholder_name'() {
        throw new Error();
    },
    'number_literal'(character) {
        // TODO
        if (character.type === 'decimal_digit') return ['continue', null];
        return ['emit', 'number_literal'];
    },
    'quoted_literal'(_character, token) {
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
    return iterEq(a.characters.values(), b.characters.values());
}
export function cloneSyntacticContext(context: SyntacticContext): SyntacticContext {
    return {
        blocks: context.blocks.map(cloneSyntacticContextBlock),
    };
}
export function equalsSyntacticContext(a: SyntacticContext, b: SyntacticContext): boolean {
    if (a.blocks.length !== b.blocks.length) return false;
    return iterEq(a.blocks.values(), b.blocks.values());
}
export function cloneSyntacticContextBlock(block: SyntacticContextBlock): SyntacticContextBlock {
    return {
        keywords: new Set([...block.keywords]),
    };
}
export function equalsSyntacticContextBlock(a: SyntacticContextBlock, b: SyntacticContextBlock): boolean {
    if (a.keywords.size !== b.keywords.size) return false;
    return iterEq(a.keywords.values(), b.keywords.values());
}

function iterEq<T>(a: Iterator<T>, b: Iterator<T>): boolean {
    let ar: IteratorResult<T>, br: IteratorResult<T>;
    do {
        [ar, br] = [a.next(), b.next()];
        if (ar.value !== br.value) return false;
        if (ar.done !== br.done) return false;
    } while (!ar.done);
    return true;
}
