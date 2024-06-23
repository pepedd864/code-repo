/**
 * 生成调色盘颜色变量
 * @author pepedd864
 * @date 2024/6/23
 */

function createColorPaletteVars() {
    /* 颜色列表 */
    const colors: Theme.ThemeColorKey[] = ['primary','immersive-text']
    /* 颜色深度列表 */
    const colorPaletteNumbers: Theme.ColorPaletteNumber[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

    /** 生成和CSS变量对应的颜色变量 */
    /**
     * 他是这样的：
     * primary:"rgb(var(--primary-color))"
     * primary-50:"rgb(var(--primary-50-color))"
     * primary-100:"rgb(var(--primary-100-color))"
     * primary-200:"rgb(var(--primary-200-color))"
     * primary-300:"rgb(var(--primary-300-color))"
     * primary-400:"rgb(var(--primary-400-color))"
     * primary-500:"rgb(var(--primary-500-color))"
     * primary-600:"rgb(var(--primary-600-color))"
     * primary-700:"rgb(var(--primary-700-color))"
     * primary-800:"rgb(var(--primary-800-color))"
     * primary-900:"rgb(var(--primary-900-color))"
     * primary-950:"rgb(var(--primary-950-color))"
     */
    const colorPaletteVar = {} as Theme.ThemePaletteColor;

    colors.forEach(color => {
        colorPaletteVar[color] = `rgb(var(--${color}-color))`;
        colorPaletteNumbers.forEach(number => {
            colorPaletteVar[`${color}-${number}`] = `rgb(var(--${color}-${number}-color))`;
        });
    });

    return colorPaletteVar;
}

export const colorPaletteVars = createColorPaletteVars();

export const themeVars: Theme.ThemeToken = {
    colors: {
        ...colorPaletteVars,
        background: 'rgb(var(--background-color))',
        text: 'rgb(var(--text-color))'
    }
}

