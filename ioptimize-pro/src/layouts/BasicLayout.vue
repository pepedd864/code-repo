<script setup lang="ts"></script>

<template>
  <div>
    <router-link to="/auth/login">login</router-link>
    <br />
    <router-link to="/auth/register">register</router-link>
    <a-button type="primary">按钮</a-button>
    <a-button>按钮</a-button>
    <router-view />
  </div>
</template>

<style scoped></style>
