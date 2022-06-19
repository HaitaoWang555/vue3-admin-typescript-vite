<!-- 发送验证码 -->
<script setup lang="ts">
import { sendSms } from '@/api/public'

const attrs = useAttrs()

const sendCodes = reactive({
  code: 0,
  text: '发送验证码',
})

function resetText() {
  let num = 60

  let timer = setInterval(() => {
    num -= 1
    sendCodes.text = '重新获取（' + num + '）'
    if (num === 0) {
      clearInterval(timer)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(timer as any) = null
      sendCodes.text = '获取验证码'
      sendCodes.code = 0
    }
  }, 1000)
}
// 发送验证码
function sendCode() {
  sendCodes.text = '获取中'
  sendCodes.code = 1
  sendSms(attrs.params)
    .then((res) => {
      ElMessage({ message: res.data.message, type: 'success' })
      sendCodes.code = 2
      resetText()
    })
    .catch(() => {
      sendCodes.text = '获取验证码'
      sendCodes.code = 0
    })
}
</script>

<template>
  <el-button
    type="primary"
    :disabled="sendCodes.code === 2"
    :loading="sendCodes.code === 1"
    style="width: 100%"
    @click="sendCode"
  >
    {{ sendCodes.text }}
  </el-button>
</template>
