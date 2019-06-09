import {
    characterize,
    character,
} from '@narucode/characterizer';
import {
    tokenize,
    getInitialTokenizeState,
    cloneTokenizeState,
    equalsTokenizeState,
    Token,
    TokenType,
    TokenizeState,
} from '@narucode/tokenizer';
type LanguageConfiguration = import('monaco-editor/esm/vs/editor/editor.api').languages.LanguageConfiguration;
type TokensProvider = import('monaco-editor/esm/vs/editor/editor.api').languages.TokensProvider;
type IState = import('monaco-editor/esm/vs/editor/editor.api').languages.IState;

export const languageConfiguration: LanguageConfiguration = {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
        lineComment: '--',
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"', notIn: ['string'] },
        { open: '\'', close: '\'', notIn: ['string'] },
    ],
};

class MonacoTokenizerState implements IState {
    constructor(
        public tokenizeState: TokenizeState = getInitialTokenizeState(),
    ) {}
    clone() {
        return new MonacoTokenizerState(
            cloneTokenizeState(this.tokenizeState),
        );
    }
    equals(another: MonacoTokenizerState) {
        return equalsTokenizeState(this.tokenizeState, another.tokenizeState);
    }
}
export const tokensProvider: TokensProvider = {
    getInitialState: () => new MonacoTokenizerState(),
    tokenize: (line, state: MonacoTokenizerState) => {
        const tokens = tokenize(
            characterize(line),
            state.tokenizeState,
            character('\n'),
        );
        return {
            tokens: Array.from(tokens).map(token => ({
                startIndex: token.col,
                scopes: getScopeFromToken(token),
            })),
            endState: state,
        };
    },
};

function getScopeFromToken(token: Token): string {
    return scopeMap[token.type];
}

const scopeMap: { [tokenType in TokenType]: string } = {
    'whitespace': 'white',
    'newline': 'white',
    'comment': 'comment.line.double-dash',
    'opening_grouping': 'punctuation.section.parens.begin',
    'closing_grouping': 'punctuation.section.parens.end',
    'punctuation': 'keyword.operator',
    'keyword': 'keyword',
    'unquoted_name': '',
    'quoted_name': 'variable.other',
    'placeholder_name': 'variable.other',
    'number_literal': 'constant.numeric',
    'quoted_literal': 'string.quoted',
};
