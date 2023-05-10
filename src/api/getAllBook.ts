import request from '@/utils/request'

export function AllBook() {
  return request({
    url: '/search/poetry/grades.anys',
    method: "post"
  })
}