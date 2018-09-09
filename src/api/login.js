import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/authUser/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/authUser/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/authUser/logout',
    method: 'post'
  })
}
