<script setup>
import {useAppStore} from "@/stores/app.js"
import variables from '@/styles/variables.module.scss'
import {ref} from "vue";

const app = useAppStore()
const backgroundColor = ref('red')

function toggleColor(color) {
  console.log(color)
  backgroundColor.value = color
}
</script>

<template>
  <a-config-provider :theme="app.themeConfig">
    <a-select v-model:value="app.themeName" style="width: 240px">
      <a-select-option v-for="(color, name) in variables" :value="name"> {{ name }}:{{ color }}</a-select-option>
    </a-select>
    <a-button-group>
      <a-button @click="toggleColor(variables[app.themeName])">切换主题- {{ app.themeName }}</a-button>
    </a-button-group>
    <div class="test">test</div>
  </a-config-provider>
</template>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

.test {
  background: v-bind(backgroundColor);
}
</style>
