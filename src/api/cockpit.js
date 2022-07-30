import request from '@/utils/request'

// 查询近7天每日需求量
export function countDemandTrend(params) {
  return request({
    url: '/server/cockpit/countDemandTrend',
    method: 'get',
    params
  })
}

// 查询派送情况
export function countSendStatus(params) {
  return request({
    url: '/server/cockpit/countSendStatus',
    method: 'get',
    params
  })
}

// 查询物资库存情况
export function countMaterialTrend(params) {
  return request({
    url: '/server/cockpit/countMaterialTrend',
    method: 'get',
    params
  })
}

// 查询健康码状态
export function countHealthCodeColor(params) {
  return request({
    url: '/server/cockpit/countHealthCodeColor',
    method: 'get',
    params
  })
}

// 查询数据更新状态
export function countHealthDataUpdate(params) {
  return request({
    url: '/server/cockpit/countHealthDataUpdate',
    method: 'get',
    params
  })
}

// 查询所有人员隔离状态
export function countQuarantineStatus(params) {
  return request({
    url: '/server/cockpit/countQuarantineStatus',
    method: 'get',
    params
  })
}

// 查询需求情况
export function countDemandStatus(params) {
  return request({
    url: '/server/cockpit/countDemandStatus',
    method: 'get',
    params
  })
}
