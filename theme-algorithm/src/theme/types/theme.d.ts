declare namespace Theme {
    /** 暗色模式 */
    type DarkMode = 'light' | 'dark' | 'auto';
    /** 颜色深度列表 */
    type ColorPaletteNumber = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
    type ColorIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

    /** 其他颜色，常和组件库组合使用 */
    interface OtherColor {
        info: string;
        success: string;
        warning: string;
        error: string;
    }

    /** 主要的颜色，作为主题色 */
    interface ThemeColor {
        primary: string; // 主色
        'immersive-text'?: string; // 文本沉浸色 这个地方比较特殊
    }

    type ThemeColorKey = keyof ThemeColor;

    /** 颜色调色板 */
    type ThemePaletteColor = {
        [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string;
    };

    /** 所有的颜色变量 */
    interface ThemeTokenColor extends ThemePaletteColor {
        background: string;
        text: string;
    }

    /** 所有样式变量 */
    type ThemeToken = {
        colors: ThemeTokenColor;
        [key: string]: any;
    }

    /** 颜色设置 */
    interface ThemeSetting {
        darkMode: DarkMode;
        themeColor: string
        otherColor?: OtherColor
    }
}
