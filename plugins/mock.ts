import type { ServerResponse, IncomingMessage } from 'http'
import Mock from 'mockjs'
import url from 'url'
import type { Plugin } from 'vite'

const injectCode = `
import { mockXHR } from '@/mock/index'
mockXHR()
`
function parseJson(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    let body = ''
    let jsonStr = null
    req.on('data', function (chunk) {
      body += chunk
    })
    req.on('end', function () {
      try {
        jsonStr = JSON.parse(body)
      } catch (err) {
        jsonStr = null
      }
      resolve(jsonStr)
    })
  })
}

type iParams = {
  query?: Record<string, unknown>
  body?: Record<string, unknown>
}

function requestMiddleware() {
  const middleware = async (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { mocks } = await import('../src/mock/index')
    const Url = url.parse(req.url || '', true)
    const params: iParams = {}
    type MockItem = {
      url: string
      type: string
      response: (params: iParams) => void
    }
    const mock = mocks.find(
      (i: MockItem) =>
        i.url === Url.pathname?.replace('/dev-api', '') &&
        i.type === req.method?.toLocaleLowerCase()
    )
    if (mock) {
      console.log('request invoke:' + req.url)
      params.query = Url.query
      params.body = await parseJson(req)
      res.end(JSON.stringify(Mock.mock(mock.response(params))))
      return
    }
    next()
  }
  return middleware
}

export default function myPlugin(command: 'build' | 'serve'): Plugin {
  return {
    name: 'vite-plugin-mock',
    configureServer: async ({ middlewares }) => {
      const middleware = await requestMiddleware()
      middlewares.use(middleware)
    },
    // 在其他钩子中使用存储的配置
    transform(code, id) {
      if (command === 'build' && id.endsWith('/src/main.ts')) {
        // build: 由 Rollup 调用的插件
        return {
          code: `${code}\n${injectCode}`,
        }
      } else {
        return null
      }
    },
  }
}
