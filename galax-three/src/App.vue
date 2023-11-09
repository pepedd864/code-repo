<script setup lang="ts">
import { nextTick } from 'vue'
import Sketch from "@/sketch";

const createSketch = () => {
  const sketch = new Sketch()
  sketch.create()
}

nextTick(() => {
  setTimeout(() => {
    document.dispatchEvent(new CustomEvent('loaded'))
  }, 2000)
  createSketch()
})
</script>

<template>
  <div id="sketch"></div>
</template>

<style scoped></style>
