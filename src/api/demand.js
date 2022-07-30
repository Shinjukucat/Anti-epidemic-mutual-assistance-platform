import request from '@/utils/request'

// 查询需求表格信息
export function findAllRequirementsUndelivered(params) {
  return request({
    url: '/server/requirements/conditionQuery/findAllRequirementsUndelivered',
    method: 'get',
    params
  })
}

// 导出
export function exportRequirementsInfo(params) {
  return request({
    url: '/server/requirements/exportRequirementsInfo',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
