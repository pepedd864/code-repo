<script setup>
import {useAppStore} from "@/stores/app.js"
import variables from '@/styles/variables.module.scss'

const app = useAppStore()
</script>

<template>
  <a-config-provider :theme="app.themeConfig">
    <a-select v-model:value="app.themeName" style="width: 240px">
      <a-select-option v-for="(color, name) in variables" :value="name"> {{ name }}:{{ color }}</a-select-option>
    </a-select>
    <a-select v-model:value="app.darkMode" style="width: 120px">
      <a-select-option value="dark">dark</a-select-option>
      <a-select-option value="light">light</a-select-option>
    </a-select>
    <a-button-group>
      <a-button type="primary">切换主题- {{ app.themeName }}</a-button>
      <a-button @click="app.toggleDarkMode">切换模式{{ app.darkModeComp }}</a-button>
    </a-button-group>
    <div class="test">test</div>
  </a-config-provider>
</template>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

.test {
  @include useTheme {
    background: getColor('primary');
  }
}
</style>
