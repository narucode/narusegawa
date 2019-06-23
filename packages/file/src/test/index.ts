import {
    text2narufile,
    iterLines,
    getPosition,
} from '..';

const narufile = text2narufile(`
oldint := use naru core 0 (int)
hours := new type oldint
main := fn {
    delay := hours(4)
    #"#(delay)시간동안 기다리는 중" println()
}
`);

console.log({
    lines: Array.from(iterLines(narufile)),
    typePosition: getPosition(narufile, narufile.text.indexOf('type')),
});
