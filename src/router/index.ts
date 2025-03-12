import { createRouter, createWebHistory, RouterView, type RouteRecordRaw } from 'vue-router'
import BasicLayout from '@/layouts/basicLayout/BasicLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue'

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

export const siderbarRoutes: siderbarRouteConfig[] = [
  {
    path: '/dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: {
      key: '/dashboard',
      icon: VideoCameraOutlined,
      label: 'Dashboard',
    },
  },
  {
    path: '/system',
    redirect: '/system/user',
    component: RouterView,
    meta: {
      key: '/sysetm',
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
    component: RouterView,
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
          key: '/system/user',
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
]

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '/login',
        component: () => import('@/views/LoginView.vue'),
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    redirect: siderbarRoutes[0].path,
    children: [...siderbarRoutes],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
