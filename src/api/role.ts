import request from '@/utils/request'
import {
  type IRoleRes,
  type IRoleAddreq,
  type IPremissionReq,
  type IPremissionRes,
} from '@/api/types/role'

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

// 设置权限
export const setRolePermission = (data: IPremissionReq) => {
  const { roleId, permission } = data
  return request<IRoleRes[]>({
    method: 'post',
    url: `role/roles/${roleId}/permission`,
    data: { permission },
  })
}

// 根据id获取角色信息
export const getRoleById = (id: number) => {
  return request<IPremissionRes>({
    method: 'get',
    url: `role/roles/${id}`,
  })
}
