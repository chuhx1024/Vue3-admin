export interface Project {
  id: number | string
  name: string
  alias: string
  creator: string
}
export interface UserState {
  username: string
  id: string | number
  email: string
  full_name: string
  roles: any[]
  dept: object
}
