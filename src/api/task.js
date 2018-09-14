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

export function createTask(data) {
  return request({
    url: '/task/add',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/task/pageTasks',
    method: 'get',
    params: query
  })
}

export function updateTask(data) {
  return request({
    url: '/task/update',
    method: 'post',
    data
  })
}

export function deleteTask(data) {
  return request({
    url: '/task/delete',
    method: 'post',
    data
  })
}
