import { characterize } from '@narucode/characterizer';
import { tokenize, Token, TokenType } from '@narucode/tokenizer';
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

const dummyTokenizerState: IState = { clone() { return this; }, equals() { return true; } };
export const tokensProvider: TokensProvider = {
    getInitialState: () => dummyTokenizerState,
    tokenize: (line) => ({
        tokens: Array.from(tokenize(characterize(line)))
            .map(token => ({
                startIndex: token.offset,
                scopes: getScopeFromToken(token),
            })),
        endState: dummyTokenizerState,
    }),
};

function getScopeFromToken(token: Token): string {
    return scopeMap[token.type];
}

const scopeMap: { [tokenType in TokenType]: string } = {
    whitespace: 'white',
    newline: 'white',
    comment: 'comment.line.double-dash',
    openingGrouping: 'punctuation.section.parens.begin',
    closingGrouping: 'punctuation.section.parens.end',
    punctuation: 'keyword.operator',
    keyword: 'keyword',
    unquotedName: '',
    quotedName: 'variable.other',
    placeholderName: 'variable.other',
    numberLiteral: 'constant.numeric',
    quotedLiteral: 'string.quoted',
};
