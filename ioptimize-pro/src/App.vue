<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'

const app = useAppStore()
</script>

<template>
  <a-config-provider :theme="app.themeConfig">
    <router-view />
  </a-config-provider>
</template>

<style scoped></style>
