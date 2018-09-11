import { getTaskId, addTask } from '@/api/task'

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
    },
    AddTask(state, taskInfo) {
      return new Promise((resolve, reject) => {
        addTask(
          taskInfo.taskId,
          taskInfo.taskName,
          taskInfo.sellerId,
          taskInfo.chargeAmount,
          taskInfo.taskAmount,
          taskInfo.gift,
          taskInfo.giftPicUrl,
          taskInfo.preheatTime,
          taskInfo.publishTime,
          taskInfo.finishTime
        ).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default task
