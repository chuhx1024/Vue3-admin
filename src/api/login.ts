import request from '@/utils/request'
import { type ILoginRes, type ILoginReq } from '@/api/types/login'
import { type UserState } from '@/stores/modules/user/types'

// 用户登录
export const login = (data: ILoginReq) => {
  return request<ILoginRes>({
    method: 'POST',
    url: '/base/login',
    data: new URLSearchParams(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request<UserState>({
    method: 'GET',
    url: '/base/user_info',
  })
}
// 获取用户路由权限
export const getUserMenu = () => {
  return request<any>({
    method: 'GET',
    url: '/base/menus',
  })
}
