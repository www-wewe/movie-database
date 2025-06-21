import { type Category } from './categoryType'
import { type Director } from './directorType'
import { type Review } from './reviewType'

export interface Movie {
  id: string
  createdAt: Date
  deletedAt: Date | undefined

  title: string
  originalTitle: string
  description: string
  language: string

  director: Director
  category: Category

  duration: number
  cast: string

  picture: string | undefined
  releaseDate: Date
  reviews: Review[]
}
