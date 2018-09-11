import request from '@/utils/request'

export function getTaskId() {
  return request({
    url: '/api/idStrategy/build/taskId',
    method: 'get'
  })
}

export function addTask(taskId, taskName, sellerId, chargeAmount, taskAmount, gift, giftPicUrl, preheatTime, publishTime, finishTime) {
  return request({
    url: '/task/add',
    method: 'post',
    data: {
      taskId,
      taskName,
      sellerId,
      chargeAmount,
      taskAmount,
      gift,
      giftPicUrl,
      preheatTime,
      publishTime,
      finishTime
    }
  })
}

export function fetchList(query) {
  return request({
    url: '/task/pageTasks',
    method: 'get',
    params: query
  })
}
