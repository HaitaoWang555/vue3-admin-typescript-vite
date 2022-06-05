import type { PersistOptions } from 'pinia-plugin-persist'
import { localStoragePrefix } from '@/config/settings'

// pinia持久化参数配置
const piniaPersistConfig = (key: string) => {
	const persist: PersistOptions = {
		enabled: true,
		strategies: [
			{
				key: localStoragePrefix + key,
				storage: localStorage,
				// storage: sessionStorage
			},
		],
	}
	return persist
}

export default piniaPersistConfig
