import request from '@/utils/request'

// 查询物资表格信息
export function materialInfo(data) {
  return request({
    url: '/server/materialInfo/list',
    method: 'post',
    data
  })
}

// 批量删除

// 上架/下架
export function changeMaterialStatus(params) {
  return request({
    url: '/server/materialInfo/changeMaterialStatus',
    method: 'post',
    params
  })
}

// 添加物资接口
export function addMaterial(params) {
  return request({
    url: '/server/materialInfo/addMaterialInfo',
    method: 'get',
    params
  })
}
