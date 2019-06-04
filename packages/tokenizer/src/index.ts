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
                    characters: [],
                    offset,
                    col,
                    row,
                };
            }
            const pushAction: PushAction = push[currentToken.type](character, currentToken);
            if (pushAction !== PushAction.Spit) currentToken.characters.push(character);
            if (pushAction === PushAction.Continue) continue;
            yield currentToken;
            const isNewline = currentToken.type === 'newline';
            currentToken = (pushAction === PushAction.Consume) ? null : {
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
    if (currentToken) yield currentToken;
}

// TODO: 토큰타입만 갖고 구분 못하는 경우를 처리하려면 그냥 글자가 뭔지 봐야하지 않을까?
// `guessTokenTypeByFirstCharacter` 함수로 만들자
const guessingTokenTypeMap: { [codeType in CodeCharacterType]: TokenType } = {
    closingGrouping: 'closingGrouping',
    closingQuote: 'quotedName',
    decimalDigit: 'numberLiteral',
    horizontalSpace: 'whitespace',
    nameContinue: 'unquotedName',
    nameStart: 'unquotedName',
    openingGrouping: 'openingGrouping',
    openingQuote: 'quotedName',
    punctuation: 'punctuation',
    togglingQuote: 'quotedName',
    verticalSpace: 'newline',
};

type PushRules = {
    [ruleName in TokenType]: (character: CodeCharacter, token: Readonly<Token>) => PushAction;
};
enum PushAction {
    Continue,
    Consume,
    Spit,
}
const push: PushRules = {
    whitespace(character) {
        return (character.type === 'horizontalSpace') ? PushAction.Continue : PushAction.Spit;
    },
    newline(character, token) {
        if (token.characters.length) {
            const first = token.characters[0].char;
            const second = character.char;
            if (first === '\r' && second === '\n') return PushAction.Consume;
            return PushAction.Spit;
        }
        if (character.char === '\r') return PushAction.Continue;
        return PushAction.Consume;
    },
    comment(character, token) {
        // TODO
        return PushAction.Consume;
    },
    openingGrouping(character, token) {
        return (character.type === 'openingGrouping') ? PushAction.Continue : PushAction.Spit;
    },
    closingGrouping(character, token) {
        return (character.type === 'closingGrouping') ? PushAction.Continue : PushAction.Spit;
    },
    punctuation(character, token) {
        return (character.type === 'punctuation') ? PushAction.Continue : PushAction.Spit;
    },
    keyword(character, token) {
        // TODO
        return PushAction.Consume;
    },
    unquotedName(character, token) {
        return (
            (character.type === 'nameStart') ||
            (character.type === 'nameContinue') ||
            (character.type === 'decimalDigit')
        ) ? PushAction.Continue : PushAction.Spit;
    },
    operatorName(character, token) {
        // TODO
        return PushAction.Consume;
    },
    quotedName(character, token) {
        // TODO
        return PushAction.Consume;
    },
    placeholderName(character, token) {
        // TODO
        return PushAction.Consume;
    },
    numberLiteral(character, token) {
        // TODO
        return PushAction.Consume;
    },
    quotedLiteral(character, token) {
        // TODO
        return PushAction.Consume;
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
    | 'operatorName'
    | 'quotedName'
    | 'placeholderName'
    | 'numberLiteral'
    | 'quotedLiteral'
;
