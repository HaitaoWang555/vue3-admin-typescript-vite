<script setup lang="ts">
import { submit } from '@/api/public'
import { ref, reactive, toRaw } from 'vue'
import { list } from './columns/advance'

const loading = ref(false)
const ProFormRef = ref()
const form = reactive({
  name: 'sssssss',
  url: '',
  owner: '',
  approver: '',
  dateRange: '',
  type: '',
  name2: 'ssssssssss',
  url2: '',
  owner2: '',
  approver2: '',
  dateRange2: '',
  type2: '',
})
const formList = list
function handleOk() {
  ProFormRef.value.handleSubmit()
}
function handleReset() {
  console.log(ProFormRef.value)
  ProFormRef.value.resetFormParam()
}
function onSubmit(callback: (params: string) => void) {
  const { name } = form
  console.log(name)
  console.log(toRaw(form))
  loading.value = true
  submit(form)
    .then((res) => {
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
    label-position="top"
    :layout="{ formWidth: '100%', labelWidth: '150px' }"
    class="pro-form-has-footer-bar"
    @pro-submit="onSubmit"
  >
    <template #title0>仓库管理</template>
    <template #roterText>
      <router-link
        to="/dashboard"
        style="position: relative; top: 24px; display: block; color: #1890ff"
      >
        去首页
      </router-link>
    </template>
    <template #title1>任务管理</template>
    <template #footerBtn>
      <div class="pro-form-footer-bar">
        <el-button @click="handleReset">重置</el-button>
        <el-button :loading="loading" type="primary" @click="handleOk">
          提交
        </el-button>
      </div>
    </template>
  </BaseProForm>
</template>
