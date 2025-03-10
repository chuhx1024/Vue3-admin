import request from '@/utils/request'
import { type IUserRes, type IUserAddreq } from '@/api/types/user'

// 用户列表
export const getUserList = () => {
  return request<IUserRes[]>({
    method: 'get',
    url: 'user/users/',
  })
}

// 用户创建
export const addUser = (data: IUserAddreq) => {
  return request<IUserRes[]>({
    method: 'post',
    url: 'user/users/',
    data,
  })
}
