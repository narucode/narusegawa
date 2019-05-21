declare module 'regenerate' {
    type Value = string | number;
    interface ToStringOptions {
        bmpOnly: boolean;
        hasUnicodeFlag: boolean;
    }
    class Regenerate {
        add(args: Value[]): Regenerate;
        add(...args: Value[]): Regenerate;
        add(args: Regenerate): Regenerate;
        remove(args: Value[]): Regenerate;
        remove(...args: Value[]): Regenerate;
        remove(args: Regenerate): Regenerate;
        addRange(start: Value, end: Value): Regenerate;
        removeRange(start: Value, end: Value): Regenerate;
        intersection(codePoints: Value[]): Regenerate;
        intersection(codePoints: Regenerate): Regenerate;
        contains(value: Value): boolean;
        clone(): Regenerate;
        toString(options: ToStringOptions): string;
        toRegExp(flags: string): RegExp;
        valueOf(): number[];
        toArray(): number[];
    }
    interface RegenerateFn {
        (args: Value[]): Regenerate;
        (...args: Value[]): Regenerate;
        (args: Regenerate): Regenerate;
        version: string;
    }
    const regenerate: RegenerateFn;
    export = regenerate;
}
