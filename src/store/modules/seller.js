import { add, addInfo } from '@/api/seller'

const seller = {
  state: {},
  mutations: {},
  actions: {
    AddSeller(state, sellerInfo) {
      const username = sellerInfo.username
      // console.log(username)
      return new Promise((resolve, reject) => {
        add(username, sellerInfo.password).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddSellerInfo(state, sellerInfo) {
      return new Promise((resolve, reject) => {
        addInfo(sellerInfo.userid, sellerInfo.username, sellerInfo.shopName, sellerInfo.shopUrl, sellerInfo.wechatId, sellerInfo.wechatName, sellerInfo.qqId, sellerInfo.qqName, sellerInfo.phoneNumber).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default seller
