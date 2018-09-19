import request from '@/utils/request'

export function fetchMenu() {
  return request({
    url: '/wx/menu/wxbd140862c4f2afc6/get',
    method: 'get'
  })
}
export function createTest() {
  return request({
    url: '/wx/menu/wxbd140862c4f2afc6/create',
    method: 'get'
  })
}
export function deleteMenu() {
  return request({
    url: '/wx/menu/wxbd140862c4f2afc6/delete',
    method: 'get'
  })
}
export function createMenu(data) {
  return request({
    url: '/wx/menu/wxbd140862c4f2afc6/create',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data
  })
}

