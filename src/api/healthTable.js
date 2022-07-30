import request from '@/utils/request'

// 查询健康表格数据
export function getHealthInfo(data) {
  return request({
    url: '/server/healthInfo/getHealthInfo',
    method: 'post',
    data
  })
}

// 导出
export function exportHealthInfo(params) {
  return request({
    url: '/server/healthInfo/exportHealthInfo',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
