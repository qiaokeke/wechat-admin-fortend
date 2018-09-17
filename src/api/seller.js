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

export function addInfo(userid, username, shopName, shopUrl, wechatId, wechatName, qqId, qqName, phoneNumber) {
  return request({
    url: '/seller/info/add',
    method: 'post',
    data: {
      userid,
      username,
      shopName,
      shopUrl,
      wechatId,
      wechatName,
      qqId,
      qqName,
      phoneNumber
    }
  })
}

export function fetchList(query) {
  return request({
    url: '/seller/pageSellers',
    method: 'get',
    params: query
  })
}

export function updateSeller(data) {
  return request({
    url: '/seller/update',
    method: 'post',
    data
  })
}

export function createSeller(data) {
  return request({
    url: '/seller/create',
    method: 'post',
    data
  })
}

export function deleteSeller(data) {
  return request({
    url: '/seller/delete',
    method: 'post',
    data
  })
}
