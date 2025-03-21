export type IUserRes = {
  email: string
  full_name: string
  id: number
  username: string
}

export type IUserAddreq = {
  email: string
  full_name: string
  username: string
  password: string
  roles: number[]
  dept_id: string
}
