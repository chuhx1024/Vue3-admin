import { getToken } from '@/utils/handleCookie'
import { usePermissionStore } from '@/stores/modules/permission'
import router from '@/router'

const addDynamicRoutes = async () => {
  const token = getToken()
  // 没有token
  if (!token) {
    return
  }
  // 有token
  try {
    const { generateRoutes } = usePermissionStore()
    const accessRoutes = await generateRoutes()
    console.log(accessRoutes, 1234567)
    console.log()
    accessRoutes.forEach((route) => {
      !router.hasRoute(route.name) && router.addRoute(route)
    })
  } catch (error) {
    console.log(error)
  }
}

export default addDynamicRoutes
