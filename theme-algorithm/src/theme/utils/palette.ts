/**
 * 调色板 工具
 * @author pepedd864
 * @date 2024/6/23
 */
import {getHex, getHsl, getHsv, isValidColor, mixColor} from "./colord.ts";
import {AnyColor, HsvColor} from "colord"

/** Hue step */
const hueStep = 2;
/** Saturation step, light color part */
const saturationStep = 16;
/** Saturation step, dark color part */
const saturationStep2 = 5;
/** Brightness step, light color part */
const brightnessStep1 = 5;
/** Brightness step, dark color part */
const brightnessStep2 = 15;
/** Light color count, main color up */
const lightColorCount = 5;
/** Dark color count, main color down */
const darkColorCount = 4;

/** 暗色模式的颜色映射表 */
const darkColorMap = [
    {index: 7, opacity: 0.15},
    {index: 6, opacity: 0.25},
    {index: 5, opacity: 0.3},
    {index: 5, opacity: 0.45},
    {index: 5, opacity: 0.65},
    {index: 5, opacity: 0.85},
    {index: 5, opacity: 0.9},
    {index: 4, opacity: 0.93},
    {index: 3, opacity: 0.95},
    {index: 2, opacity: 0.97},
    {index: 1, opacity: 0.98}
];

/**
 * 提供一个颜色，获得颜色调色板
 *
 * @param darkMode
 * @param color
 */
export function getColorPalette(darkMode: boolean, color: string) {
    const colorMap = new Map<Theme.ColorPaletteNumber, string>();
    const textColorMap = new Map<Theme.ColorPaletteNumber, string>();

    const {colors, texts} = getAntDColorPalette(color, darkMode);

    const colorNumbers: Theme.ColorPaletteNumber[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    colorNumbers.forEach((number, index) => {
        colorMap.set(number, colors[index]);
        textColorMap.set(number, texts[index]);
    })

    return {colorMap, textColorMap}
}

/**
 * 获得 AntD 颜色调色板
 *
 * @param color - Color
 * @param darkTheme - Dark theme
 * @param darkThemeMixColor - Dark theme mix color (default: #141414)
 */
export function getAntDColorPalette(color: AnyColor, darkTheme = false, darkThemeMixColor = '#141414') {
    const indexes: Theme.ColorIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const patterns = indexes.map(index => getAntDPaletteColorByIndex(color, index));

    // 获得文本颜色
    const textPattern: string[] = patterns.map((item) => {
        const mixColorHex = getLuminance(item) < 45 ? '#ffffff' : '#000000';
        return mixColor(mixColorHex, item, 0.35);
    }).map(item => getHex(item))

    // 暗色模式
    if (darkTheme) {
        const darkPatterns = darkColorMap.map(({index, opacity}) => {
            return mixColor(darkThemeMixColor, patterns[index], opacity);
        }).map(item => getHex(item));
        // 获得文本颜色
        const darkTextPattern: string[] = darkPatterns.map((item) => {
            const mixColorHex = getLuminance(item) < 45 ? '#ffffff' : '#000000';
            return mixColor(mixColorHex, item, 0.35);
        }).map(item => getHex(item))
        return {colors: darkPatterns, texts: darkTextPattern};
    }

    return {colors: patterns, texts: textPattern};
}

/**
 * 通过颜色索引获得 AntD 调色板颜色
 *
 * @param color - Color
 * @param index - The color index of color palette (the main color index is 6)
 * @returns Hex color
 */
export function getAntDPaletteColorByIndex(color: AnyColor, index: Theme.ColorIndex): string {
    if (!isValidColor(color)) {
        throw new Error('invalid input color value');
    }

    if (index === 6) {
        return getHex(color);
    }

    const isLight = index < 6;
    const hsv = getHsv(color);
    const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;

    // 通过 HSV 调整 获得各种颜色
    const newHsv: HsvColor = {
        h: getHue(hsv, i, isLight),
        s: getSaturation(hsv, i, isLight),
        v: getValue(hsv, i, isLight)
    };

    return getHex(newHsv);
}

/**
 * Get hue
 *
 * @param hsv - Hsv format color
 * @param i - The relative distance from 6
 * @param isLight - Is light color
 */
function getHue(hsv: HsvColor, i: number, isLight: boolean) {
    let hue: number;

    const hsvH = Math.round(hsv.h);

    if (hsvH >= 60 && hsvH <= 240) {
        hue = isLight ? hsvH - hueStep * i : hsvH + hueStep * i;
    } else {
        hue = isLight ? hsvH + hueStep * i : hsvH - hueStep * i;
    }

    if (hue < 0) {
        hue += 360;
    }

    if (hue >= 360) {
        hue -= 360;
    }

    return hue;
}

/**
 * Get saturation
 *
 * @param hsv - Hsv format color
 * @param i - The relative distance from 6
 * @param isLight - Is light color
 */
function getSaturation(hsv: HsvColor, i: number, isLight: boolean) {
    if (hsv.h === 0 && hsv.s === 0) {
        return hsv.s;
    }

    let saturation: number;

    if (isLight) {
        saturation = hsv.s - saturationStep * i;
    } else if (i === darkColorCount) {
        saturation = hsv.s + saturationStep;
    } else {
        saturation = hsv.s + saturationStep2 * i;
    }

    if (saturation > 100) {
        saturation = 100;
    }

    if (isLight && i === lightColorCount && saturation > 10) {
        saturation = 10;
    }

    if (saturation < 6) {
        saturation = 6;
    }

    return saturation;
}

/**
 * Get value of hsv
 *
 * @param hsv - Hsv format color
 * @param i - The relative distance from 6
 * @param isLight - Is light color
 */
function getValue(hsv: HsvColor, i: number, isLight: boolean) {
    let value: number;

    if (isLight) {
        value = hsv.v + brightnessStep1 * i;
    } else {
        value = hsv.v - brightnessStep2 * i;
    }

    if (value > 100) {
        value = 100;
    }

    return value;
}

/**
 * 获得亮度
 * @param color
 */
function getLuminance(color: AnyColor) {
    return getHsl(color).l;
}