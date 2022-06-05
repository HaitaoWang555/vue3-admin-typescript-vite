declare namespace API {
  type ResponseBodyType<T> = {
    message?: string
    timestamp?: number
    data: T
    code: number
    success: boolean
  }

  type CurrentUser = {
    id: number
    name: string
    avatar: string
    introduction: string
    roles: string[]
  }

  type LoginResult = {
    token: string
  }

  type PageParams = {
    current?: number
    pageSize?: number
  }

  type RuleListItem = {
    key?: number
    disabled?: boolean
    href?: string
    avatar?: string
    name?: string
    owner?: string
    desc?: string
    callNo?: number
    status?: number
    updatedAt?: string
    createdAt?: string
    progress?: number
  }

  type RuleList = {
    data?: RuleListItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type FakeCaptcha = {
    code?: number
    status?: string
  }

  type LoginParams = {
    username: string
    password: string
  }

  type ErrorResponse = {
    /** 业务约定的错误码 */
    code: number
    /** 业务上的错误信息 */
    message?: string
    /** 业务上的请求是否成功 */
    success: false
  }
  type NoticeIconItemType = 'notification' | 'message' | 'event'

  type NoticeIconItem = {
    id?: string
    extra?: string
    key?: string
    read?: boolean
    clickClose?: boolean
    avatar?: string
    title?: string
    status?: string
    datetime?: string
    description?: string
    type?: NoticeIconItemType
  }

  type NoticeIconList = {
    data?: NoticeIconItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }
  type TableItemType = 'published' | 'draft' | 'deleted'

  type TableItem = {
    id?: string
    title?: string
    status?: TableItemType
    author?: string
    displayTime?: string
    pageviews?: number
  }

  type TableList = {
    data?: TableItem[]
    total?: number
    success?: boolean
  }
}
