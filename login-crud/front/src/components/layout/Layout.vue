<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { asyncRouterMap } from '@/router'
import Icon from '@/components/Icon/Icon.vue'

const menuList = asyncRouterMap
const route = useRoute()
const router = useRouter()
const selectedKeys = ref(['1'])
const init = () => {
  const path = router.currentRoute.value.path
  const item = menuList.value.find((item) => item.path === path)
  if (item) {
    selectedKeys.value = [item.path]
  }
}
onMounted(() => {
  init()
})
</script>

<template>
  <div class="basic-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-sider theme="light" :collapsible="true">
        <div class="logo">
          <span>Logo</span>
        </div>
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
          <template v-for="item in menuList" :key="item.path">
            <a-sub-menu v-if="'children' in item" :key="item.path">
              <template #title>
                <Icon :icon="item.meta.icon" />
                <span>{{ item.name }}</span>
              </template>
              <a-menu-item v-for="subItem in item.children" :key="subItem.path">
                <router-link :to="subItem.path">
                  <Icon :icon="item.meta.icon" />
                  <span>{{ subItem.name }}</span>
                </router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item :key="item.path" v-else>
              <router-link :to="item.path">
                <Icon :icon="item.meta.icon" />
                <span>{{ item.name }}</span>
              </router-link>
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <span>
            <Icon :icon="route.meta?.icon" />
            {{ route.name }}
          </span>
        </a-layout-header>
        <a-layout-content>
          <slot></slot>
        </a-layout-content>
        <a-layout-footer style=""> Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<style lang="scss" scoped>
.basic-layout {
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    margin: 16px;
    background: rgba(205, 205, 205, 0.3);
    color: #000;
  }

  .ant-layout {
    --footer-padding: 10px;

    .ant-layout-header {
      background: #fff;
      color: #000;
    }

    .ant-layout-content {
      margin: 20px 16px;
      overflow: auto;
      max-height: calc(100vh - 70px - var(--footer-padding) * 2 - 20px - 40px);
    }

    .ant-layout-footer {
      text-align: center;
      padding: var(--footer-padding) 50px;
    }
  }
}
</style>
