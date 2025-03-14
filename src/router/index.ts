import { createRouter, createWebHistory, RouterView, type RouteRecordRaw } from 'vue-router'
import BasicLayout from '@/layouts/basicLayout/BasicLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue'
import addDynamicRoutes from './premission'

export interface RouteMeta {
  key: string
  hidden?: boolean
  icon: Component
  label: string
  requiresAuth?: boolean
  [key: string]: string | number | boolean | object | null | undefined | React.ReactNode //允许其他自定义属性
}

export type siderbarRouteConfig = RouteRecordRaw & {
  meta: RouteMeta
  children?: siderbarRouteConfig[]
}

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: markRaw(BasicLayout),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: {
          key: '/dashboard',
          icon: VideoCameraOutlined,
          label: 'Dashboard',
        },
      },
    ],
  },
  {
    path: '/login',
    component: markRaw(LoginLayout),
    children: [
      {
        path: '/login',
        component: () => import('@/views/LoginView.vue'),
        meta: {
          key: '/login',
          hidden: true,
          icon: UploadOutlined,
          label: '登录',
        },
      },
    ],
  },
]
export const permissionRouters = [
  {
    path: '/',
    component: markRaw(BasicLayout),
    children: [
      {
        path: '/system',
        redirect: '/system/user',
        component: markRaw(RouterView),
        meta: {
          key: '/system',
          icon: VideoCameraOutlined,
          label: '系统管理',
        },
        children: [
          {
            path: '/system/user',
            component: () => import('@/views/system/user/index.vue'),
            meta: {
              key: '/system/user',
              icon: UserOutlined,
              label: '用户管理',
            },
          },
          {
            path: '/system/dept',
            component: () => import('@/views/system/dept/index.vue'),
            meta: {
              key: '/system/dept',
              icon: UserOutlined,
              label: '部门管理',
            },
          },
          {
            path: '/system/role',
            component: () => import('@/views/system/role/index.vue'),
            meta: {
              key: '/system/role',
              icon: UserOutlined,
              label: '角色管理',
            },
          },
        ],
      },
      {
        path: '/dev',
        redirect: '/dev/menu',
        component: markRaw(RouterView),
        meta: {
          key: '/dev',
          icon: VideoCameraOutlined,
          label: '开发辅助',
        },
        children: [
          {
            path: '/dev/menu',
            component: () => import('@/views/dev/menu/index.vue'),
            meta: {
              key: '/dev/menu',
              icon: UserOutlined,
              label: '菜单管理',
            },
          },
        ],
      },

      {
        path: '/about',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          key: '/about',
          icon: UploadOutlined,
          label: '关于我们',
        },
      },
      {
        path: '/about9',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          key: '/about0',
          hidden: true,
          icon: UploadOutlined,
          label: '关于我们',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: baseRoutes,
})
export async function setupRouter(app: any) {
  await addDynamicRoutes()
  app.use(router)
}

export default router
