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
          key: '/user/add',
          icon: UserOutlined,
          label: '用户管理',
        },
      },
    ],
  },

  {
    path: '/user/add',
    component: RouterView,
    meta: {
      key: '/user/add',
      icon: UserOutlined,
      label: '用户管理',
    },
    children: [
      {
        path: '/user/add',
        component: () => import('@/views/userManager/CreateUserView.vue'),
        meta: {
          key: '/user/add',
          icon: UserOutlined,
          label: '新建用户',
        },
      },
      {
        path: '/user/list',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          key: '/user/list',
          icon: UserOutlined,
          label: '用户列表',
        },
      },
    ],
  },
  {
    path: '/role/list',
    component: RouterView,
    meta: {
      key: '/role/list',
      icon: UserOutlined,
      label: '角色管理',
    },
    children: [
      {
        path: '/role/list',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          key: '/role/list',
          icon: UserOutlined,
          label: '角色列表',
        },
      },
      {
        path: '/role/add',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          key: '/role/add',
          icon: UserOutlined,
          label: '新建角色',
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
