import './style.css'
import {themeSetting} from "./theme/setting.ts";
import {initTheme} from "./theme/shared.ts";

initTheme()

const colorPaletteNumbers: Theme.ColorPaletteNumber[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

// 生成测试代码
document.querySelector<HTMLElement>('#app')!.innerHTML = `
<div class="container">
    <h3>背景色</h3>
   <div class="box" style="background:var(--primary-color);">测试</div>
    ${colorPaletteNumbers.map(number => `<div class="box" style="background:var(--primary-${number}-color);color: var(--immersive-text-${number}-color);">测试-${number}</div>`).join('')}
</div>
<div class="container">
    <h3>文本色</h3>
   <div class="box">测试</div>
    ${colorPaletteNumbers.map(number => `<div class="box" style="color: var(--immersive-text-${number}-color);">测试-${number}</div>`).join('')}
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

// 在JavaScript中添加事件监听器
const colorPicker = document.querySelector<HTMLInputElement>('#color-picker')!;
const modeSwitches = document.querySelectorAll<HTMLInputElement>('input[name="mode"]');

colorPicker.addEventListener('input', function () {
    // 当用户选择颜色时，更新themeSetting.themeColor
    themeSetting.themeColor = this.value;
});

modeSwitches.forEach(switchElement => {
    switchElement.addEventListener('change', function () {
        // 当用户切换模式时，更新themeSetting.darkMode
        themeSetting.darkMode = this.id === 'dark-mode-switch' ? 'dark' : 'light';
    });
});
