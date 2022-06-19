import defaultSettings from '@/config/settings'
import { defineStore } from 'pinia'

export interface ISettings {
  showSettings?: boolean
  fixedHeader?: boolean
  sidebarLogo?: boolean
  tagsView?: boolean
}
export interface IData {
  key: 'showSettings' | 'fixedHeader' | 'sidebarLogo' | 'tagsView'
  value: boolean | undefined
}

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

// useSettingsStore
export const useSettingsStore = defineStore({
  id: 'useSettingsStore',
  state: (): ISettings => ({
    showSettings: showSettings,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    tagsView: true,
  }),
  getters: {},
  actions: {
    async changeSetting({ key, value }: IData) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.hasOwnProperty(key)) {
        this[key] = value
      }
    },
  },
})
