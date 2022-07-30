import request from '@/utils/request'

// 查询需求表格信息
export function conditionalPageQuery(data) {
  return request({
    url: '/server/userInfo/conditionalPageQuery',
    method: 'POST',
    data
  })
}

// 批量删除
export function userInfoDel(data) {
  return request({
    url: '/server/userInfo/userInfoDel',
    method: 'POST',
    params: data
  })
}

// 下载模板
export function templateDownload(params) {
  return request({
    url: '/server/userInfo/templateDownload',
    method: 'GET',
    params,
    responseType: 'blob'
  })
}

// 批量导入
export function userInfoImport(data) {
  return request({
    url: '/server/userInfo/userInfoImport',
    method: 'POST',
    data
  })
}
