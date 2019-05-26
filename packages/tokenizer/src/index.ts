import { CodeCharacter } from '@narucode/characterizer';

export function* tokenize(characters: IterableIterator<CodeCharacter>): IterableIterator<Token> {
    let offset = 0;
    let col = 0;
    let row = 0;
    let currentToken: Token | null = null;
    for (const character of characters) {
        try {
            if (!currentToken) {
                currentToken = {
                    type: guessTokenTypeByFirstCharacter(character),
                    characters: [character],
                    offset,
                    col,
                    row,
                };
            } else {
                const pushAction = push[currentToken.type](character, currentToken);
                if (pushAction !== PushAction.Spit) currentToken.characters.push(character);
                if (pushAction === PushAction.Continue) continue;
                yield currentToken;
                const isNewline = currentToken.type === 'newline';
                currentToken = (pushAction === PushAction.Consume) ? null : {
                    type: guessTokenTypeByFirstCharacter(character),
                    characters: [character],
                    offset,
                    col,
                    row,
                };
                if (isNewline) {
                    col = -1;
                    ++row;
                }
            }
        } finally {
            ++offset;
            ++col;
        }
    }
    if (currentToken) yield currentToken;
}

function guessTokenTypeByFirstCharacter(character: CodeCharacter): TokenType {
    if (character.type === 'horizontalSpace') return 'whitespace';
    // TODO
    throw new Error(`unknown first character: ${character.char}`);
}

type PushRules = {
    [ruleName in TokenType]: (character: CodeCharacter, token: Readonly<Token>) => PushAction;
};
enum PushAction {
    Continue,
    Consume,
    Spit,
}
const push: PushRules = {
    whitespace(character, token) {
        // TODO
        return PushAction.Consume;
    },
    newline(character, token) {
        // TODO
        return PushAction.Consume;
    },
    comment(character, token) {
        // TODO
        return PushAction.Consume;
    },
    delimiter(character, token) {
        // TODO
        return PushAction.Consume;
    },
    punctuation(character, token) {
        // TODO
        return PushAction.Consume;
    },
    keyword(character, token) {
        // TODO
        return PushAction.Consume;
    },
    bareName(character, token) {
        // TODO
        return PushAction.Consume;
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
    | 'delimiter'
    | 'punctuation'
    | 'keyword'
    | 'bareName'
    | 'operatorName'
    | 'quotedName'
    | 'placeholderName'
    | 'numberLiteral'
    | 'quotedLiteral'
;
