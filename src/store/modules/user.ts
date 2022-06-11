import { defineStore } from 'pinia'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

export interface IUser {
  token: string
  name: string
  avatar: string
}

// UserStore
export const useUserStore = defineStore({
  id: 'useUserStore',
  state: (): IUser => ({
    token: getToken(),
    name: '',
    avatar: '',
  }),
  getters: {},
  actions: {
    async login(userInfo: API.LoginParams): Promise<null> {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then((response) => {
            const { data } = response.data
            this.token = data.token
            setToken(data.token)
            resolve(null)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async getInfo(): Promise<API.CurrentUser> {
      return new Promise((resolve, reject) => {
        getInfo(this.token)
          .then((response) => {
            const { data } = response.data
            if (!data) {
              return reject(
                new Error('Verification failed, please Login again.')
              )
            }

            const { name, avatar } = data
            this.name = name
            this.avatar = avatar
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async logout(): Promise<null> {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            removeToken() // must remove  token  first
            resetRouter()
            this.$reset()
            resolve(null)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async resetToken(): Promise<null> {
      return new Promise((resolve) => {
        removeToken() // must remove  token  first
        this.$reset()
        resolve(null)
      })
    },
  },
})
