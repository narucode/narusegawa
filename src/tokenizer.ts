import { CodeCharacter } from './characterizer';

export interface Token {
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

function* tokenize(): IterableIterator<Token> {
    // TODO
}
