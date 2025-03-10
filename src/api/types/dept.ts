export type IDeptRes = {
  id: number
  name: string
  desc: string
  parent_id: number
  children: IDeptRes[]
}

export type IDeptAddreq = {
  name: string
  desc: string
  parent_id: string
}
