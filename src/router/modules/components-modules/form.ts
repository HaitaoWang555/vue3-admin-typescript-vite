import { RouterView } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import BaseForm from '@/views/components-page/form/base-form.vue'
import AdvancedForm from '@/views/components-page/form/advanced-form.vue'
import ModalForm from '@/views/components-page/form/modal-form.vue'
import LinkageForm from '@/views/components-page/form/linkage-form.vue'
import StepForm from '@/views/components-page/form/step-form.vue'

const formRouter: RouteRecordRaw = {
  path: 'form',
  component: RouterView,
  name: 'Form',
  meta: { title: 'Form' },
  redirect: '/components/form/base-form',
  children: [
    {
      path: 'base-form',
      name: 'Form',
      component: BaseForm,
      meta: { title: 'Base Form' },
    },
    {
      path: 'advanced-form',
      name: 'AdvancedForm',
      component: AdvancedForm,
      meta: { title: 'Advanced Form' },
    },
    {
      path: 'modal-form',
      name: 'ModalForm',
      component: ModalForm,
      meta: { title: 'Modal Form' },
    },
    {
      path: 'linkage-form',
      name: 'LinkageForm',
      component: LinkageForm,
      meta: { title: 'Linkage Form' },
    },
    {
      path: 'step-form',
      name: 'StepForm',
      component: StepForm,
      meta: { title: 'Step Form' },
    },
  ],
}

export default formRouter
