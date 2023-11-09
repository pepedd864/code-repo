<script setup>
import {onMounted} from "vue"
import request from "@/utils/request";


let webSocket = null

function init() {
  if (typeof WebSocket === 'undefined') {
    console.error('您的浏览器不支持WebSocket')
    return
  }
  let clientId = Math.random().toString(36).substr(2)
  let socketUrl = import.meta.env.VITE_WS_URL + clientId
  webSocket = new WebSocket(socketUrl)
  webSocket.onopen = function () {
    console.log('WebSocket open')
  }
  webSocket.onmessage = function (event) {
    let output = document.getElementById('output')
    output.value = output.value + '\n' + event.data
  }
  webSocket.onclose = function () {
    console.log('WebSocket close')
  }
  webSocket.onerror = function (err) {
    console.log(err)
  }
  webSocket.send('hello world')
}

function send() {
  request({
    url: '/send',
    method: 'post',
    params: {
      msg: document.getElementById('input').value,
      clientId: document.getElementById('clientId').value
    },
  })
}

function sendAll() {
  request({
    url: '/sendAll',
    method: 'post',
    params: {
      msg: document.getElementById('input').value
    }
  })
}

onMounted(() => init())
</script>

<template>
  <div>
    <div>
      <label>输入：</label><textarea id="input"/>
    </div>
    <div>
      <label>客户端id：</label><textarea id="clientId"/>
    </div>
    <button @click="send">发送</button>
    <label>接收：</label><textarea id="output"/>
    <div>
      发送全局消息
      <button @click="sendAll">发送</button>
    </div>
  </div>
</template>

<style scoped>
</style>
