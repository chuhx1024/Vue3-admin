import request from '@/utils/request'
import { type IRoleRes, type IRoleAddreq } from '@/api/types/role'

// 角色列表
export const getRoleList = () => {
  return request<IRoleRes[]>({
    method: 'get',
    url: 'role/roles',
  })
}

// 角色创建
export const addRole = (data: IRoleAddreq) => {
  return request<IRoleRes[]>({
    method: 'post',
    url: 'role/roles',
    data,
  })
}
