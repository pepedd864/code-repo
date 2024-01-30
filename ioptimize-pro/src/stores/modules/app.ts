import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { primaryColorEnumType } from '@/config/theme.config'
import variables from '@/styles/variables.module.scss'
import { theme } from 'ant-design-vue'

/**
 * app 配置 开启持久化
 */
export const useAppStore = defineStore(
  'app',
  () => {
    // ******* //
    // 颜色模式 //
    // ******* //
    const darkModeRef = ref<'auto' | 'dark' | 'light'>('auto')
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)') as MediaQueryList

    /**
     * 处理颜色模式变化
     */
    function handleDarkModeChange() {
      darkModeRef.value = darkModeQuery.matches ? 'dark' : 'light'
      document.documentElement.setAttribute('data-dark', darkModeRef.value)
    }

    // 计算之后的颜色模式
    const darkMode = computed({
      get() {
        if (darkModeRef.value === 'auto') {
          document.documentElement.setAttribute('data-darkMode', 'auto')
          handleDarkModeChange()
          darkModeQuery.addEventListener('change', handleDarkModeChange)
        }
        return darkModeRef.value
      },
      set(val) {
        darkModeRef.value = val
        if (darkModeRef.value === 'auto') {
          document.documentElement.setAttribute('data-darkMode', 'auto')
        } else {
          document.documentElement.removeAttribute('data-darkMode')
          document.documentElement.setAttribute('data-dark', darkModeRef.value)
        }
        if (document.documentElement.getAttribute('data-darkMode') === 'auto') {
          handleDarkModeChange()
          darkModeQuery.addEventListener('change', handleDarkModeChange)
        } else {
          darkModeQuery.removeEventListener('change', handleDarkModeChange)
        }
      },
    })
    // ******* //
    // 主题配置 //
    // ******* //
    const themeName = ref<primaryColorEnumType>('origin')
    const borderRadius = ref(0) // 可根据需要定制圆角修改功能，这也是实时响应的效果
    const themeConfig = computed(() => {
      document.documentElement.setAttribute('data-theme', themeName.value)
      document.documentElement.style.setProperty('--border-radius', borderRadius.value + 'px')
      // @ts-ignore
      return {
        token: {
          colorPrimary: variables[themeName.value] || '#27ba9b',
          colorSuccess: '#1dc779',
          colorWarning: '#ffb302',
          colorError: '#cf4444',
          colorInfo: variables[themeName.value] || '#27ba9b',
          wireframe: true,
          borderRadius: borderRadius, // 直角风格
        },
        algorithm: darkMode.value === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm, // 这里将调整ant-design-vue的主题模式
      }
    })
    return {
      themeName,
      borderRadius,
      themeConfig,
      darkModeRef, // 用于持久化 可怜的computed无法持久化
      darkMode,
    }
  },
  {
    persist: false, // 仅当测试时关闭持久化，或者根据你的应用需要定制
  },
)
