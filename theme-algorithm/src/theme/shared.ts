/**
 * 对外共享的方法
 * @author pepedd864
 * @date 2024/6/23
 */

import {getColorPalette} from "./utils/palette.ts";
import {themeSetting} from "./setting.ts";
import {themeVars} from "./vars.ts";
import {getRgb} from "./utils/colord.ts";

/**
 * 从字符串中获取CSS变量
 *
 * @param tokens Theme base tokens
 */
function getCssVarByTokens(tokens: Theme.ThemeToken) {
    const styles: string[] = [];

    function removeVarPrefix(value: string) {
        return value.replace('var(', '').replace(')', '');
    }

    function removeRgbPrefix(value: string) {
        return value.replace('rgb(', '').replace(')', '');
    }

    for (const [key, tokenValues] of Object.entries(themeVars)) {
        for (const [tokenKey, tokenValue] of Object.entries(tokenValues)) {
            let cssVarsKey = removeVarPrefix(tokenValue as string);
            let cssValue = tokens[key][tokenKey];

            if (key === 'colors') {
                cssVarsKey = removeRgbPrefix(cssVarsKey);
                const {r, g, b} = getRgb(cssValue);
                cssValue = `rgb(${r},${g},${b})`;
            }

            styles.push(`${cssVarsKey}: ${cssValue}`);
        }
    }

    return styles.join(';');
}

/**
 * 生成调色板颜色
 *
 * @param colors Theme colors
 */
function createThemePaletteColors(colors: Theme.ThemeColor) {
    const colorKeys = Object.keys(colors) as Theme.ThemeColorKey[];
    // 亮色模式
    const colorPaletteVar = {} as Theme.ThemePaletteColor;
    const textColorPaletteVar = {} as Theme.ThemePaletteColor;
    // 暗色模式
    const darkColorPaletteVar = {} as Theme.ThemePaletteColor;
    const darkTextColorPaletteVar = {} as Theme.ThemePaletteColor;

    // 主色键名
    const primaryColorKey = 'primary';
    // 沉浸式文本色 键名
    const immersiveTextKey = 'immersive-text';

    colorKeys.forEach(key => {
        const {
            colorMap,
            textColorMap
        } = getColorPalette(false, colors[key]!);
        const {
            colorMap: darkColorMap,
            textColorMap: darkTextColorMap
        } = getColorPalette(true, colors[key]!);

        colorPaletteVar[key] = colorMap.get(500)!
        darkColorPaletteVar[key] = darkColorMap.get(500)!

        colorMap.forEach((hex, number) => {
            colorPaletteVar[`${key}-${number}`] = hex;
        });

        darkColorMap.forEach((hex, number) => {
            darkColorPaletteVar[`${key}-${number}`] = hex;
        });

        if (key === primaryColorKey) {
            textColorMap.forEach((hex, number) => {
                textColorPaletteVar[`${immersiveTextKey}-${number}`] = hex;
            });

            darkTextColorMap.forEach((hex, number) => {
                darkTextColorPaletteVar[`${immersiveTextKey}-${number}`] = hex;
            });
        }
    });

    const themeTokens: Theme.ThemeToken = {
        colors: {
            ...colorPaletteVar,
            ...textColorPaletteVar,
            background: 'rgb(255, 255, 255)',
            text: 'rgb(0, 0, 0)'
        }
    }

    const darkThemeTokens: Theme.ThemeToken = {
        colors: {
            ...darkColorPaletteVar,
            ...darkTextColorPaletteVar,
            background: 'rgb(28, 28, 28)',
            text: 'rgb(255, 255, 255)'
        }
    }

    return {themeTokens, darkThemeTokens};
}

/**
 * 将颜色调色板添加或者更新到HTML
 */
function addColorsPaletteToHTML() {
    const colors: Theme.ThemeColor = {
        primary: themeSetting.themeColor
    }
    const {themeTokens, darkThemeTokens} = createThemePaletteColors(colors);
    const cssVarStr = getCssVarByTokens(themeTokens);
    const darkCssVarStr = getCssVarByTokens(darkThemeTokens);
    const styleId = 'palette-colors'
    const style = document.querySelector(`#${styleId}`) || document.createElement('style');
    style.id = styleId
    // 插入生成的调色盘颜色CSS变量
    style.innerHTML = `
    html {
        ${cssVarStr}
    }
    html.dark {
        ${darkCssVarStr}
    }
    `
    document.head.appendChild(style);
}

/**
 * 切换到暗色模式
 */
export function toggleToDarkMode() {
    document.documentElement.classList.toggle('dark', themeSetting.darkMode === 'dark');
}

/**
 * 初始化主题
 */
export function initTheme() {
    addColorsPaletteToHTML()
    toggleToDarkMode()
}
