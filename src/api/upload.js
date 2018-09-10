import request from '@/utils/request'

export function onUploadPicSuccess() {
  return request({
    url: '/api/idStrategy/build/taskId',
    method: 'get'
  })
}
