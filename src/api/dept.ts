import request from '@/utils/request'
import { type IDeptRes, type IDeptAddreq } from '@/api/types/dept'

// 部门列表
export const getDeptList = () => {
  return request<IDeptRes[]>({
    method: 'get',
    url: 'dept/depts',
  })
}

// 部门创建
export const addDept = (data: IDeptAddreq) => {
  return request<IDeptRes>({
    method: 'post',
    url: 'dept/depts',
    data,
  })
}
