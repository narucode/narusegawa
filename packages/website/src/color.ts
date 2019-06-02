type ColorType =
    | 'foreground'
    | 'background'
    | 'positive'
    | 'neutral'
    | 'negative'
    | number // hue
;

type Importance = number; // 0~2 - 0: trivial, 1: normal, 2: important

export function getColor(colorType: ColorType, importance: Importance = 1) {
    switch (colorType) {
        case 'foreground': return (importance > 1) ? 'white' : '#d4d4d4';
        case 'background': return (importance > 1) ? '#264f78' : '#1e1e1e';
        case 'positive': return 'green';
        case 'neutral': return 'yellow';
        case 'negative': return 'red';
        default:
            return `hsl(${ colorType }deg, ${ 50 * (importance / 2) }%, 50%)`;
    }
}
