<template>
  <div id="user-layout">
    <div class="container">
      <router-view class="user-form" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
#user-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#user-layout .container {
  width: 350px;
  margin-left: auto;
  margin-right: auto;
}

#user-layout .container .user-form {
  padding: 20px;
  border-radius: 10px;
}
</style>
