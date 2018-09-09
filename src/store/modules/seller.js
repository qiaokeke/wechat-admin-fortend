import { add } from '@/api/seller'

const seller = {
  state: {},
  mutations: {},
  actions: {
    AddSeller(sellerInfo) {
      const username = sellerInfo.username
      return new Promise((resolve, reject) => {
        add(username, sellerInfo.password).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default seller
