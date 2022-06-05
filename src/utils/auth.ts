import { localStoragePrefix } from '@/config/settings'
const TokenKey = localStoragePrefix + 'Admin-Token'

export function getToken(): string {
  return localStorage.getItem(TokenKey) || ''
}

export function setToken(token: string): void {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken(): void {
  return localStorage.removeItem(TokenKey)
}
