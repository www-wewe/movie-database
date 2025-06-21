export interface Category {
  id: string
  createdAt: Date
  deletedAt: Date | undefined

  name: string
  picture: string | undefined
}
