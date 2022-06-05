type TokenType = 'admin-token' | 'editor-token'

const tokens: {
  admin: {
    token: TokenType
  }
  editor: {
    token: TokenType
  }
} = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
}

const users: {
  'admin-token': API.CurrentUser
  'editor-token': API.CurrentUser
} = {
  'admin-token': {
    id: 5555,
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
  },
  'editor-token': {
    id: 6666,
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
  },
}

export default [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: (config: {
      body: {
        username: 'admin' | 'editor'
      }
    }): API.ResponseBodyType<{
      token?: TokenType
    }> | API.ErrorResponse => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          success: false,
          message: 'Account and password are incorrect.',
        }
      }

      return {
        code: 20000,
        success: true,
        data: token,
      }
    },
  },

  // get user info
  {
    url: '/vue-admin-template/user/info',
    type: 'get',
    response: (config: {
      query: {
        token: TokenType
      }
    }): API.ResponseBodyType<API.CurrentUser> | API.ErrorResponse => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          success: false,
          message: 'Login failed, unable to get user details',
        }
      }

      return {
        code: 20000,
        success: true,
        data: info,
      }
    },
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: (): API.ResponseBodyType<string> => {
      return {
        code: 20000,
        success: true,
        data: 'success',
      }
    },
  },
]
