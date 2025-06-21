import { Movie } from "./movieType"

export interface User {
  id: string
  createdAt: Date
  deletedAt: Date | undefined
  role: string

  userName: string
  email: string
  avatar: string | null

  isBlocked: boolean

  password: string

  favourites: Movie[]
  watchList: Movie[]
}
