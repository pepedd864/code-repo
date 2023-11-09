<script setup>
import { defineProps } from 'vue'

defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
  },
})
</script>
<template>
  <component
      v-if="icon"
      :is="icon"
      :style="{ 'font-size': `${size ? size : null}px` }"
  />
</template>
