<script setup lang="ts">
import { submit } from '@/api/public'
import { list } from './columns/list'

const loading = ref(false)
const ProFormRef = ref()
const form = reactive({
  name: '',
  region: '',
  date: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const formList = list
function handleOk() {
  ProFormRef.value.handleSubmit()
}
function handleReset() {
  ProFormRef.value.resetFormParam()
}
function onSubmit(callback: (params: string) => void) {
  loading.value = true
  submit(form)
    .then((res) => {
      console.log(res.data.message)

      ElMessage({ message: res.data.message, type: 'success' })
      const cbStatus = 'fulfilled'
      callback(cbStatus) // reset form
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <BaseProForm
    ref="ProFormRef"
    :form-param="form"
    :form-list="formList"
    :layout="{ formWidth: '560px', labelWidth: '150px' }"
    @pro-submit="onSubmit"
  >
    <template #footerBtn>
      <el-button :loading="loading" type="primary" @click="handleOk">
        提交
      </el-button>
      <el-button @click="handleReset">重置</el-button>
    </template>
  </BaseProForm>
</template>
