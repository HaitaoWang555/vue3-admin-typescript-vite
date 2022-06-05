import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'
import { visualizer } from 'rollup-plugin-visualizer'
import { svgBuilder } from './plugins/svg'
import mockPlugin from './plugins/mock'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'

  const devPlugins = []

  if (!isBuild) {
    devPlugins.push()
  }

  return {
    optimizeDeps: {
      include: [],
    },
    resolve: {
      alias: {
        '@': pathSrc,
      },
    },
    plugins: [
      mockPlugin(command),
      Vue(),
      svgBuilder('./src/icons/svg/'),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'vue-router'],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver({ importStyle: 'sass', directives: true }),

          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],

        // Auto import for all module exports under directories
        dirs: [
          'src/store/modules',
        ],

        dts: true,

        // Generate corresponding .eslintrc-auto-import.json file.
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),

      Components({
        resolvers: [
          // Auto register icon components https://icones.js.org/
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver({ importStyle: 'sass', directives: true }),
        ],

        dts: true,
      }),

      Icons({
        autoInstall: true,
      }),

      Inspect(),
    ],
    build: {
      cssCodeSplit: false,
      minify: 'terser',
      /** 在 build 代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.log'],
        },
        output: {
          comments: false,
        },
      },
      rollupOptions: {
        plugins: [
          visualizer(() => {
            return {
              filename: path.join('dist', 'stats.html'),
              gzipSize: true,
            }
          }),
        ],
        manualChunks: {
          mockjs: ['mockjs'],
        },
      },
    },
  }
})
