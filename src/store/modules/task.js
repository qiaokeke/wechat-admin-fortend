import { getTaskId } from '@/api/task'

const task = {
  state: {},
  mutations: {},
  actions: {
    GetTaskId() {
      return new Promise((resolve, reject) => {
        getTaskId().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default task
