export function bisect(
    a: number[],
    x: number,
    lo: number = 0,
    hi: number = a.length,
) {
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (x < a[mid]) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

export function bisectLeft(
    a: number[],
    x: number,
    lo: number = 0,
    hi: number = a.length,
) {
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (a[mid] < x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
