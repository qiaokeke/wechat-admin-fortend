import request from '@/utils/request'

export function getTaskId() {
  return request({
    url: '/api/idStrategy/build/taskId',
    method: 'get'
  })
}
