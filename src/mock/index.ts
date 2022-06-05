import table from './table'
import user from './user'
import Mock from 'mockjs'
import { param2Obj } from './utils'

type iParams = {
  query?: Record<string, unknown>
  body?: Record<string, unknown>
}
type MockItem = {
  url: string
  type: string
  response: (params: iParams) => void
}

const mocks = [...user, ...table] as MockItem[]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    // eslint-disable-next-line prefer-rest-params
    this.proxy_send(...arguments)
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function XHR2ExpressReqWrap(respond) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url),
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(
      new RegExp(i.url),
      i.type || 'get',
      XHR2ExpressReqWrap(i.response)
    )
  }
}

export { mocks, mockXHR }
