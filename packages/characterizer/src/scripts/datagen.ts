import * as fs from 'fs';

import regenerate from 'regenerate';
import patternSyntaxCodePoints from 'unicode-12.1.0/Binary_Property/Pattern_Syntax/code-points';
import closePunctuationCodePoints from 'unicode-12.1.0/General_Category/Close_Punctuation/code-points';
import finalPunctuationCodePoints from 'unicode-12.1.0/General_Category/Final_Punctuation/code-points';
import decimalNumberCodePoints from 'unicode-12.1.0/General_Category/Decimal_Number/code-points';
import idContinueCodePoints from 'unicode-12.1.0/Binary_Property/ID_Continue/code-points';
import idStartCodePoints from 'unicode-12.1.0/Binary_Property/ID_Start/code-points';
import openPunctuationCodePoints from 'unicode-12.1.0/General_Category/Open_Punctuation/code-points';
import initialPunctuationCodePoints from 'unicode-12.1.0/General_Category/Initial_Punctuation/code-points';

const toStringOptions = {
    bmpOnly: false,
    hasUnicodeFlag: true,
};

function r2js(name: string, r: ReturnType<typeof import('regenerate')>) {
    return [
        // `export const ${name}CodePoints = ${JSON.stringify(r.toArray())};`,
        // `export const ${name}Symbols = ${JSON.stringify(r.toArray().map(codePoint => String.fromCodePoint(codePoint)))};`,
        `export const ${name}Regex = /${r.toString(toStringOptions)}/u;`,
    ].join('\n');
}

const closingDelimiter = regenerate(patternSyntaxCodePoints).intersection(closePunctuationCodePoints);
const closingQuote = regenerate(patternSyntaxCodePoints).intersection(finalPunctuationCodePoints);
const decimalDigit = regenerate(decimalNumberCodePoints);
const horizontalSpace = regenerate(0x0009, 0x0020, 0x00A0, 0x200E, 0x200F, 0xFEFF);
const nameStart = regenerate(idStartCodePoints).add(0x005F);
const nameContinue = regenerate(idContinueCodePoints).remove(nameStart).remove(decimalDigit);
const openingDelimiter = regenerate(patternSyntaxCodePoints).intersection(openPunctuationCodePoints);
const openingQuote = regenerate(patternSyntaxCodePoints).intersection(initialPunctuationCodePoints);
const togglingQuote = regenerate(0x0022, 0x0027, 0x0060);
const punctuation =
    regenerate(patternSyntaxCodePoints)
    .remove(openingQuote)
    .remove(closingQuote)
    .remove(togglingQuote)
    .remove(openingDelimiter)
    .remove(closingDelimiter)
;
const verticalSpace = regenerate(0x000A, 0x000B, 0x000C, 0x000D, 0x0085, 0x2028, 0x2029);

const data = ([
    ['closingDelimiter', closingDelimiter],
    ['closingQuote', closingQuote],
    ['decimalDigit', decimalDigit],
    ['horizontalSpace', horizontalSpace],
    ['nameContinue', nameContinue],
    ['nameStart', nameStart],
    ['openingDelimiter', openingDelimiter],
    ['openingQuote', openingQuote],
    ['punctuation', punctuation],
    ['togglingQuote', togglingQuote],
    ['verticalSpace', verticalSpace],
] as const).map(([name, r]) => r2js(name, r)).join('\n') + '\n';

console.log(data);
fs.writeFileSync('./src/data.ts', data);
