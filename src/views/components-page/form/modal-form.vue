<script setup lang="ts">
import { submit } from '@/api/public'
import { reactive, ref } from 'vue'
import { list } from './columns/list'

const dialogVisible = ref(false)
const fullscreen = ref(false)
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
function onSubmit() {
  loading.value = true
  submit(form)
    .then((res) => {
      ElMessage({ message: res.data.message, type: 'success' })
      dialogVisible.value = false
    })
    .finally(() => {
      loading.value = false
    })
}
function open1() {
  fullscreen.value = false
  dialogVisible.value = true
}
function open2() {
  fullscreen.value = true
  dialogVisible.value = true
}
</script>

<template>
  <el-button
    style="display: block; margin: 20px auto"
    type="primary"
    @click="open1"
  >
    打开 modal-form
  </el-button>
  <el-button
    style="display: block; margin: 20px auto"
    type="primary"
    @click="open2"
  >
    打开全屏 modal-form
  </el-button>

  <BaseProDialog
    v-model:value="dialogVisible"
    width="50%"
    title="ModalForm title"
    :confirm-loading="loading"
    :fullscreen="fullscreen"
    @ok="handleOk"
  >
    <BaseProForm
      ref="ProFormRef"
      :form-param="form"
      :form-list="formList"
      :no-footer="true"
      :layout="{ formWidth: '560px', labelWidth: '150px' }"
      @pro-submit="onSubmit"
    />
  </BaseProDialog>
</template>
