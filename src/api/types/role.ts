export type IRoleRes = {
  id: number
  rolename: string
  permission?: string
}

export type IRoleAddreq = {
  id: number
  rolename: string
}

export type IPremissionReq = {
  permission: string
  roleId: number
}
export type IPremissionRes = {
  id: number
  rolename: string
  permission: string
}
// export type IRolePremissionRes = {
//   id: number
//   rolename: string
// }
