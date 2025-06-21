import { type User } from './userType'

export interface Review {
  id: string
  createdAt: Date
  editedAt: Date | undefined
  deletedAt: Date | undefined

  content: string
  movieId: string
  user: User // UserReviewData
  rating: number
}
