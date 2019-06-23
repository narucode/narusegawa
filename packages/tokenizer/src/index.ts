import { CodeCharacter } from '@narucode/characterizer';

export interface Token {
    type: TokenType;
    offset: number;
    length: number;
}

export type TokenType =
    | 'unknown'
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

export const eof: CodeCharacter = {
    type: 'unclassified',
    char: '',
};

export interface TokenizeState {
    offset: number;
    startOffset: number;
    phase: Phase;
    context: SyntacticContext;
    characters: CodeCharacter[];
}

export function getInitialTokenizeState(): TokenizeState {
    return {
        offset: 0,
        startOffset: 0,
        phase: Phase.initial,
        context: getInitialSyntacticContext(),
        characters: [],
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
    eofCharacter: CodeCharacter | null = eof,
): IterableIterator<Token> {
    const endToken = (pushResult: PushResult) => {
        if (state.startOffset == null) throw new Error(); // assertion
        const type = (pushResult[0] === 'emit') ? pushResult[1] : 'unknown';
        const offset = state.startOffset;
        const length = state.offset - offset;
        if (length === 0) throw new Error(); // assertion
        state.startOffset = state.offset;
        state.phase = Phase.initial;
        state.characters = [];
        return { type, offset, length };
    };
    for (const character of characters) {
        try {
            let pushResult: PushResult;
            do {
                pushResult = pushTable[state.phase](character, state);
                if (pushResult[2]) state.characters.push(character);
                if (pushResult[0] === 'continue') {
                    state.phase = pushResult[1];
                } else if (pushResult[0] === 'emit') {
                    yield endToken(pushResult);
                }
            } while (!pushResult[2]);
        } finally {
            state.offset += character.char.length;
        }
    }
    if (!eofCharacter) return;
    if (state.startOffset == null) return;
    yield endToken(pushTable[state.phase](eofCharacter, state));
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

export function guessTokenTypeFromPhase(phase: Phase): TokenType {
    switch (phase) {
        default: return 'unknown';
        case Phase.whitespace: return 'whitespace';
        case Phase.newline: return 'newline';
        case Phase.comment: return 'comment';
        case Phase.opening_grouping: return 'opening_grouping';
        case Phase.closing_grouping: return 'closing_grouping';
        case Phase.punctuation: return 'punctuation';
        case Phase.keyword: return 'keyword';
        case Phase.unquoted_name: return 'unquoted_name';
        case Phase.quoted_name: return 'quoted_name';
        case Phase.placeholder_name: return 'placeholder_name';
        case Phase.number_literal: return 'number_literal';
        case Phase.quoted_literal: return 'quoted_literal';
    }
}

enum Phase {
    initial,
    whitespace,
    newline,
    newlineCr,
    comment,
    opening_grouping,
    closing_grouping,
    punctuation,
    keyword,
    unquoted_name,
    quoted_name,
    placeholder_name,
    number_literal,
    quoted_literal,
}
type PushRules = {
    [phase in Phase]: (
        character: Readonly<CodeCharacter | typeof eof>,
        state: Readonly<TokenizeState>,
    ) => PushResult;
};
type PushResult =
    | ['continue', Phase, boolean /* true: consume, false: spit */]
    | ['emit', TokenType, boolean /* true: consume, false: spit */]
;
const pushTable: PushRules = {
    [Phase.initial](character) {
        switch (character.type) {
            case 'closing_grouping': return ['continue', Phase.closing_grouping, false];
            case 'closing_quote': throw new Error();
            case 'decimal_digit': return ['continue', Phase.number_literal, false];
            case 'horizontal_space': return ['continue', Phase.whitespace, false];
            case 'name_continue': throw new Error();
            case 'name_start': return ['continue', Phase.unquoted_name, false];
            case 'opening_grouping': return ['continue', Phase.opening_grouping, false];
            case 'opening_quote': return ['continue', Phase.quoted_literal, false];
            case 'punctuation': return ['continue', Phase.punctuation, false];
            case 'toggling_quote': return ['continue', character.char === '`' ? Phase.quoted_name : Phase.quoted_literal, false];
            case 'vertical_space': return ['continue', Phase.newline, false];
            case 'unclassified': throw new Error();
        }
    },
    [Phase.whitespace](character) {
        if (character.type === 'horizontal_space') return ['continue', Phase.whitespace, true];
        return ['emit', 'whitespace', false];
    },
    [Phase.newline](character) {
        if (character.type === 'vertical_space') {
            if (character.char === '\r') return ['continue', Phase.newlineCr, true];
            return ['continue', Phase.newline, true];
        }
        return ['emit', 'newline', false];
    },
    [Phase.newlineCr](character) {
        return ['emit', 'newline', character.char === '\n'];
    },
    [Phase.comment](character) {
        if (character.type !== 'vertical_space') return ['continue', Phase.comment, true];
        return ['emit', 'comment', false];
    },
    [Phase.opening_grouping](character) {
        if (character.type === 'opening_grouping') return ['continue', Phase.opening_grouping, true];
        return ['emit', 'opening_grouping', false];
    },
    [Phase.closing_grouping](character) {
        if (character.type === 'closing_grouping') return ['continue', Phase.closing_grouping, true];
        return ['emit', 'closing_grouping', false];
    },
    [Phase.punctuation](character, { characters }) {
        if (character.type === 'punctuation') {
            if (
                (characters.length === 1) &&
                (characters[0].char === '-') &&
                (character.char === '-')
            ) {
                return ['continue', Phase.comment, true];
            }
            return ['continue', Phase.punctuation, true];
        }
        return ['emit', 'punctuation', false];
    },
    [Phase.keyword]() {
        throw new Error();
    },
    [Phase.unquoted_name](character, { characters, context }) {
        if (
            (character.type === 'name_start') ||
            (character.type === 'name_continue') ||
            (character.type === 'decimal_digit')
        ) return ['continue', Phase.unquoted_name, true];
        if ((characters.length === 1) && (characters[0].char === '_')) {
            return ['emit', 'placeholder_name', false];
        }
        if (hasKeyword(context, characters.map(character => character.char).join(''))) {
            return ['emit', 'keyword', false];
        }
        return ['emit', 'unquoted_name', false];
    },
    [Phase.quoted_name](_character, { characters }) {
        if (characters.length === 1) return ['continue', Phase.quoted_name, true];
        if (characters[characters.length - 1].char !== '`') return ['continue', Phase.quoted_name, true];
        return ['emit', 'quoted_name', false];
    },
    [Phase.placeholder_name]() {
        throw new Error();
    },
    [Phase.number_literal](character) {
        // TODO
        if (character.type === 'decimal_digit') return ['continue', Phase.number_literal, true];
        return ['emit', 'number_literal', false];
    },
    [Phase.quoted_literal](_character, { characters }) {
        // TODO
        if (characters.length < 2) return ['continue', Phase.quoted_literal, true];
        const first = characters[0].char;
        const last = characters[characters.length - 1].char;
        if (first !== last) return ['continue', Phase.quoted_literal, true];
        return ['emit', 'quoted_literal', false];
    },
}

export function cloneTokenizeState(tokenizeState: TokenizeState): TokenizeState {
    return {
        ...tokenizeState,
        characters: [...tokenizeState.characters],
        context: cloneSyntacticContext(tokenizeState.context),
    };
}
export function equalsTokenizeState(a: TokenizeState, b: TokenizeState): boolean {
    return (
        (a.phase === b.phase) &&
        (a.offset === b.offset) &&
        (a.startOffset === b.startOffset) &&
        iterEq(a.characters.values(), b.characters.values())
    );
}
export function cloneToken(token: Token): Token {
    return {
        type: token.type,
        offset: token.offset,
        length: token.length,
    };
}
export function equalsToken(a: Token | null, b: Token | null): boolean {
    if (!a) return !b;
    if (!b) return !a;
    if (a.type !== b.type) return false;
    if (a.offset !== b.offset) return false;
    if (a.length !== b.length) return false;
    return true;
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
