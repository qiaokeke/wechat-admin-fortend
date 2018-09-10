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
