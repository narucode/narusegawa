import { bisectLeft } from '@narucode/util';

export const zeros = [0x30, 0x660, 0x6F0, 0x7C0, 0x966, 0x9E6, 0xA66, 0xAE6, 0xB66, 0xBE6, 0xC66, 0xCE6, 0xD66, 0xDE6, 0xE50, 0xED0, 0xF20, 0x1040, 0x1090, 0x17E0, 0x1810, 0x1946, 0x19D0, 0x1A80, 0x1A90, 0x1B50, 0x1BB0, 0x1C40, 0x1C50, 0xA620, 0xA8D0, 0xA900, 0xA9D0, 0xA9F0, 0xAA50, 0xABF0, 0xFF10, 0x104A0, 0x10D30, 0x11066, 0x110F0, 0x11136, 0x111D0, 0x112F0, 0x11450, 0x114D0, 0x11650, 0x116C0, 0x11730, 0x118E0, 0x11C50, 0x11D50, 0x11DA0, 0x16A60, 0x16B50, 0x1D7CE, 0x1D7D8, 0x1D7E2, 0x1D7EC, 0x1D7F6, 0x1E140, 0x1E2F0, 0x1E950];
export const nines = [0x39, 0x669, 0x6F9, 0x7C9, 0x96F, 0x9EF, 0xA6F, 0xAEF, 0xB6F, 0xBEF, 0xC6F, 0xCEF, 0xD6F, 0xDEF, 0xE59, 0xED9, 0xF29, 0x1049, 0x1099, 0x17E9, 0x1819, 0x194F, 0x19D9, 0x1A89, 0x1A99, 0x1B59, 0x1BB9, 0x1C49, 0x1C59, 0xA629, 0xA8D9, 0xA909, 0xA9D9, 0xA9F9, 0xAA59, 0xABF9, 0xFF19, 0x104A9, 0x10D39, 0x1106F, 0x110F9, 0x1113F, 0x111D9, 0x112F9, 0x11459, 0x114D9, 0x11659, 0x116C9, 0x11739, 0x118E9, 0x11C59, 0x11D59, 0x11DA9, 0x16A69, 0x16B59, 0x1D7D7, 0x1D7E1, 0x1D7EB, 0x1D7F5, 0x1D7FF, 0x1E149, 0x1E2F9, 0x1E959];
export const getZero = (codePoint: number) => zeros[bisectLeft(nines, codePoint)];
export const getValue = (codePoint: number) => codePoint - getZero(codePoint);
