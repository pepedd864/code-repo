import './style.css'

// import {themeSetting} from "./theme/setting.ts";
// import {initTheme} from "./theme/shared.ts";
// import {getHex} from "./theme/utils/colord.ts";
//
// initTheme()
//
// const colorPaletteNumbers: Theme.ColorPaletteNumber[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
// // 生成测试代码
// document.querySelector<HTMLElement>('#app')!.innerHTML = `
// <div class="container">
//     <h3>背景色</h3>
//    <div class="box" style="background:var(--primary-color);">基准</div>
//     ${colorPaletteNumbers.map(number => `<div class="box" style="background:var(--primary-${number}-color);color: var(--immersive-text-${number}-color);">${number}<br/>${getHex(getComputedStyle(document.documentElement).getPropertyValue(`--primary-${number}-color`))}</div>`).join('')}
// </div>
// <div class="container">
//     <h3>文本色</h3>
//    <div class="box">测试</div>
//     ${colorPaletteNumbers.map(number => `<div class="box" style="color: var(--immersive-text-${number}-color);">测试-${number}</div>`).join('')}
// </div>
// <div>
//     <input type="color" id="color-picker" value="#1890ff">
//     <div>
//         <label for="dark-mode-switch">暗色模式</label>
//         <input type="radio" id="dark-mode-switch" name="mode">
//         <label for="light-mode-switch">亮色模式</label>
//         <input type="radio" id="light-mode-switch" name="mode">
//     </div>
// </div>
// `
//
// // 选择颜色和暗亮色模式
// const colorPicker = document.querySelector<HTMLInputElement>('#color-picker')!;
// const modeSwitches = document.querySelectorAll<HTMLInputElement>('input[name="mode"]');
//
// colorPicker.addEventListener('input', function () {
//     // 当用户选择颜色时，更新themeSetting.themeColor
//     themeSetting.themeColor = this.value;
// });
//
// modeSwitches.forEach(switchElement => {
//     switchElement.addEventListener('change', function () {
//         // 当用户切换模式时，更新themeSetting.darkMode
//         themeSetting.darkMode = this.id === 'dark-mode-switch' ? 'dark' : 'light';
//     });
// });
import {getHex, getHsl, mixColor} from "./theme/utils/colord.ts";
import {colord} from "colord";


function generatePalette(colorConfig) {
    // 调色盘数值数组
    const colorPaletteNumbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
    const len = colorPaletteNumbers.length
    // 生成的颜色数组
    let colorPalette = []
    const min = colorConfig.minLight // 亮度最小值
    const max = colorConfig.maxLight // 亮度最大值
    // 每个部分之间相隔的亮度
    const part = ((max - min) / 11) // 这个用于定位
    // 计算索引
    const hslC = getHsl(colorConfig.primaryColor)
    if (hslC.l < min) hslC.l = min
    if (hslC.l > max) hslC.l = max
    const index = (len - Math.floor((hslC.l - min) / part)) - 1
    // 添加到调色盘中
    colorPalette[index] = {
        num: colorPaletteNumbers[index],
        color: getHex(hslC),
        text: mixColor(hslC.l < 45 ? '#ffffff' : '#000000', getHex(hslC), 0.5)
    }
    // 根据当前值计算其他值
    for (let i = 0; i < len; i++) {
        if (i === index) {
            continue
        }
        const diff = i - index
        const newL = hslC.l - (diff * part)
        const newColor = colord({...hslC, l: Math.floor(newL)}).toHex()
        colorPalette[i] = {
            num: colorPaletteNumbers[i],
            color: newColor,
        }
    }

    // 计算字体颜色
    const midColor = colorPalette[Math.floor(len / 2)].color
    colorPalette = colorPalette.map(item => {
        const color = colord(item.color)
        const text = mixColor(color.toHsl().l < 50 ? '#ffffff' : '#000000', midColor, 0.5)
        return {
            ...item,
            text,
        }
    })
    return colorPalette
}

function addPaletteToHTML(palette) {
    function getCssVarStr(arr) {
        const cssVarArr = arr.map(item => {
            const cssVarPrimary = `--primary-${item.num}-color:${item.color};\n`
            const cssVarImmersiveText = `--immersive-text-${item.num}-color:${item.text};\n`
            return cssVarPrimary + cssVarImmersiveText
        })
        return cssVarArr.join('')
    }

    const cssVarStr = getCssVarStr(palette)

    const innerHTML = `
    html {
        ${cssVarStr}
        --background-color: #fff;
        --text-color: #000;
    }
    html.dark {
        ${cssVarStr}
        --background-color: #1C1C1CFF;
        --text-color: #fff;
    }
    `
    updateStyleToEle('palette-colors', innerHTML)
}

function addThemeClassToHTML() {
    function getThemeClass() {
        const colorPaletteNumbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
        const classStr = colorPaletteNumbers.map(num => {
            return `.bg-primary-${num} {background-color:var(--primary-${num}-color);color:var(--immersive-text-${num}-color)}\n`
        })
        return classStr.join(' ')
    }

    const classStr = getThemeClass()
    updateStyleToEle('theme-class', `${classStr}`)
}

function updateStyleToEle(styleId, innerHTML) {
    const style = document.querySelector(`#${styleId}`) || document.createElement('style');
    style.id = styleId
    style.innerHTML = innerHTML
    document.head.appendChild(style)
}

function initTheme(colorConfig) {
    const colorPalette = generatePalette(colorConfig)
    addPaletteToHTML(colorPalette)
    addThemeClassToHTML()
}

const setting = new Proxy({
    colorConfig: new Proxy({
        primaryColor: '#1890ff',
        minLight: 10,
        maxLight: 90
    }, {
        set: function (target, property, value) {
            target[property] = value;
            const colorPalette = generatePalette(setting.colorConfig)
            addPaletteToHTML(colorPalette)
            return true
        }
    }),
    darkMode: true,
}, {
    set: function (target, property, value) {
        target[property] = value;
        if (property === 'colorConfig') {
            const colorPalette = generatePalette(setting.colorConfig)
            addPaletteToHTML(colorPalette)
            return true
        }

        if (property === 'darkMode') {
            document.documentElement.classList.toggle('dark', value);
        }
        return true
    }
})

initTheme(setting.colorConfig)

const colorPaletteNumbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

document.querySelector<HTMLElement>('#app')!.innerHTML = `
<div class="container">
    ${colorPaletteNumbers.map((item: any) =>
    `<div class="box bg-primary-${item}">
${item}
</div>`
).join('')
}
</div>
<div>
<input type="color" id="color-picker" value="#1890ff">
<div>
     <label for="dark-mode-switch">暗色模式</label>
     <input type="radio" id="dark-mode-switch" name="mode">
     <label for="light-mode-switch">亮色模式</label>
     <input type="radio" id="light-mode-switch" name="mode">
 </div>
</div>
`

const colorPicker = document.querySelector<HTMLInputElement>('#color-picker')!;
const modeSwitches = document.querySelectorAll<HTMLInputElement>('input[name="mode"]');
colorPicker.addEventListener('input', function () {
    setting.colorConfig.primaryColor = this.value;
});

modeSwitches.forEach(switchElement => {
    switchElement.addEventListener('change', function () {
        // 当用户切换模式时，更新themeSetting.darkMode
        setting.darkMode = this.id === 'dark-mode-switch';
    });
});
