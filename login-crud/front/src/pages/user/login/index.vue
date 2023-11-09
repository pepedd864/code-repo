<script setup>
import {ref} from "vue";
import request from "@/utils/request.js";
import router from "@/router/index.js";
import {message} from "ant-design-vue";
import {useUserStore} from "@/stores/index.js";

const userStore = useUserStore()
const logining = ref(false)
const formRef = ref(null)
const form = ref({
  username: 'zfa',
  password: 'R769UqF0M2',
  // uuid: '',
})
const rules = ref({
  username: [{required: true, message: '请输入帐户名', trigger: 'blur'}],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}],
})

const handleSubmit = async () => {
  formRef.value.validate().then(
      async () => {
        logining.value = true
        const {data} = await request({
          url: '/user/login',
          method: 'post',
          data: form.value,
        })
        if (data.code === 0) {
          message.error(data.msg)
          logining.value = false
          return
        }
        userStore.token = data.data.token
        userStore.userInfo = data.data.userVO
        logining.value = false
        message.success('登录成功')
        router.push('/')
      }
  )
}
</script>

<template>
  <div class="main-user">
    <div class="title">登录</div>
    <a-form id="login-form" ref="formRef" :model="form" :rules="rules">
      <a-form-item name="username">
        <a-input
            v-model:value="form.username"
            size="large"
            placeholder="账户: admin"
        >
          <template #prefix>
            <Icon icon="UserOutlined"/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
            v-model:value="form.password"
            size="large"
            placeholder="密码: admin123"
        >
          <template #prefix>
            <Icon icon="LockOutlined"/>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="rememberMe">
        <div class="user-login-other">
          <a-checkbox>
            记住密码
          </a-checkbox>
        </div>
      </a-form-item>
      <a-form-item style="margin-top: 24px">
        <a-button
            size="large"
            type="primary"
            html-type="submit"
            class="login-button"
            :loading="logining"
            :disabled="logining"
            @click="handleSubmit"
        >
          确定
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.main-user {
  min-width: 260px;
  width: 368px;
  margin: 0 auto;

  .title {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 24px;
  }
}

#login-form {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    line-height: 22px;

    .register {
      float: right;
    }
  }
}
</style>
