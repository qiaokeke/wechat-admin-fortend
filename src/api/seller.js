import request from '@/utils/request'

export function add(username, password) {
  return request({
    url: '/seller/account/add',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
