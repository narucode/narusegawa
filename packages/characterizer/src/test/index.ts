import { characterize } from '..';

const code = `
oldint := use naru core 0 (int)
hours := new type oldint
main := fn {
    delay := hours(4)
    #"#(delay)시간동안 기다리는 중" println()
}
`;

for (const char of characterize(code)) {
    console.log(char);
}
