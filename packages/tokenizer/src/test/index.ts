import { characterize } from '@narucode/characterizer';
import { text2narufile, getText } from '@narucode/file';
import { tokenize } from '..';

const code = `
oldint := use naru core 0 (int)
hours := new type oldint
main := fn {
    delay := hours(4)
    #"#(delay)시간동안 기다리는 중" println()
}
`;
const file = text2narufile(code);

const characters = characterize(code);
const tokens = tokenize(characters);
for (const token of tokens) {
    console.log({
        text: getText(file, token),
        ...token,
    });
}
