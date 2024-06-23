/**
 * 主题设置
 * @author pepedd864
 * @date 2024/6/23
 */
import {initTheme} from "./shared.ts";

/**
 * 主题设置
 */
export const themeSetting: Theme.ThemeSetting = new Proxy({
    darkMode: 'light',
    themeColor: '#1890ff',
}, {
    set: function (target: any, property: any, value: any) {
        // 当themeSetting对象的darkMode或themeColor属性被修改时，调用addColorsPaletteToHTML函数
        if (property === 'darkMode' || property === 'themeColor') {
            target[property] = value;
            initTheme()
            return true;
        }

        // 对于themeSetting对象的其他属性，只进行普通的赋值操作
        target[property] = value;
        return true;
    }
})
