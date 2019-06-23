import { CodeCharacter, CodeCharacterType, character } from '@narucode/characterizer';

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
    startOffset: number | null;
    phase: Phase;
    context: SyntacticContext;
    characters: CodeCharacter[];
}

export function getInitialTokenizeState(): TokenizeState {
    return {
        offset: 0,
        startOffset: null,
        phase: Phase.none,
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
    const startToken = (character: CodeCharacter) => {
        state.startOffset = state.offset;
        state.characters = [character];
        state.phase = initialPhaseMap[character.type](character);
    };
    const endToken = (pushResult: PushResult) => {
        if (state.startOffset == null) throw new Error();
        const type = (pushResult[0] === 'emit') ? pushResult[1] : 'unknown';
        const offset = state.startOffset;
        const length = state.offset - offset;
        state.startOffset = null;
        state.phase = Phase.none;
        return { type, offset, length };
    };
    for (const character of characters) {
        try {
            if (state.startOffset == null) {
                startToken(character);
                continue;
            }
            const pushResult = push[state.phase](
                character,
                state.characters,
                state.context,
            );
            if (pushResult[0] === 'continue') {
                const nextPhase = pushResult[1];
                if (nextPhase) state.phase = nextPhase;
                state.characters.push(character);
                continue;
            } else if (pushResult[0] === 'emit') {
                yield endToken(pushResult);
                startToken(character);
            }
        } finally {
            state.offset += character.char.length;
        }
    }
    if (!eofCharacter) return;
    if (state.startOffset == null) return;
    const pushResult = push[state.phase](
        eofCharacter,
        state.characters,
        state.context,
    );
    yield endToken(pushResult);
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

const initialPhaseMap: { [codeType in CodeCharacterType]: (character: CodeCharacter) => Phase } = {
    'closing_grouping': () => Phase.closing_grouping,
    'closing_quote': () => { throw new Error(); },
    'decimal_digit': () => Phase.number_literal,
    'horizontal_space': () => Phase.whitespace,
    'name_continue': () => { throw new Error(); },
    'name_start': () => Phase.unquoted_name,
    'opening_grouping': () => Phase.opening_grouping,
    'opening_quote': () => Phase.quoted_literal,
    'punctuation': () => Phase.punctuation,
    'toggling_quote': character => character.char === '`' ? Phase.quoted_name : Phase.quoted_literal,
    'vertical_space': () => Phase.newline,
    'unclassified': () => { throw new Error(); },
};

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
    none,
    whitespace,
    newline,
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
        character: CodeCharacter | typeof eof,
        characters: Readonly<CodeCharacter[]>,
        context: SyntacticContext,
    ) => PushResult;
};
type PushResult =
    | ['emit', TokenType]
    | ['continue', Phase | null]
;
const push: PushRules = {
    [Phase.none]() { throw new Error(); },
    [Phase.whitespace](character) {
        if (character.type === 'horizontal_space') return ['continue', null];
        return ['emit', 'whitespace'];
    },
    [Phase.newline](character, characters) {
        if ((characters[0].char === '\r') && (character.char === '\n')) return ['continue', null];
        return ['emit', 'newline'];
    },
    [Phase.comment](character) {
        if (character.type !== 'vertical_space') return ['continue', null];
        return ['emit', 'comment'];
    },
    [Phase.opening_grouping](character) {
        if (character.type === 'opening_grouping') return ['continue', null];
        return ['emit', 'opening_grouping'];
    },
    [Phase.closing_grouping](character) {
        if (character.type === 'closing_grouping') return ['continue', null];
        return ['emit', 'closing_grouping'];
    },
    [Phase.punctuation](character, characters) {
        if (character.type === 'punctuation') {
            if (
                (characters.length === 1) &&
                (characters[0].char === '-') &&
                (character.char === '-')
            ) {
                return ['continue', Phase.comment];
            }
            return ['continue', null];
        }
        return ['emit', 'punctuation'];
    },
    [Phase.keyword]() {
        throw new Error();
    },
    [Phase.unquoted_name](character, characters, context) {
        if (
            (character.type === 'name_start') ||
            (character.type === 'name_continue') ||
            (character.type === 'decimal_digit')
        ) return ['continue', null];
        if ((characters.length === 1) && (characters[0].char === '_')) {
            return ['emit', 'placeholder_name'];
        }
        if (hasKeyword(context, characters.map(character => character.char).join(''))) {
            return ['emit', 'keyword'];
        }
        return ['emit', 'unquoted_name'];
    },
    [Phase.quoted_name](_character, characters) {
        if (characters.length === 1) return ['continue', null];
        if (characters[characters.length - 1].char !== '`') return ['continue', null];
        return ['emit', 'quoted_name'];
    },
    [Phase.placeholder_name]() {
        throw new Error();
    },
    [Phase.number_literal](character) {
        // TODO
        if (character.type === 'decimal_digit') return ['continue', null];
        return ['emit', 'number_literal'];
    },
    [Phase.quoted_literal](_character, characters) {
        // TODO
        if (characters.length === 1) return ['continue', null];
        const first = characters[0].char;
        const last = characters[characters.length - 1].char;
        if (first !== last) return ['continue', null];
        return ['emit', 'quoted_literal'];
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
