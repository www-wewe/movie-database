import { type Movie, type ResponseMulti, type ResponseSingle, /* type Review */ } from '../models'
import axiosInstance from './base'

export const getAll = async (): Promise<ResponseMulti<Movie>> => {
  const response = await axiosInstance.get('/movie')
  return response.data
}

export const getSingle = async (id: string): Promise<ResponseSingle<Movie>> => {
  const response = await axiosInstance.get(`/movie/${id}`)
  return response.data
}

export const create = async (description: string, title: string, originalTitle: string, language: string, 
  directorId: string, categoryId: string, duration: number, cast: string, releaseDate: Date, picture?: string | undefined): Promise<ResponseSingle<Movie>> => {
  const response = await axiosInstance.post('/movie', { description, title, originalTitle, language, directorId, categoryId, duration, cast, releaseDate, picture })
  return response.data
}

export const update = async (id: string, description: string, title: string, originalTitle: string, language: string, 
  directorId: string, categoryId: string, duration: number, cast: string, releaseDate: Date, picture?: string | undefined): Promise<ResponseSingle<Movie>> => {
  const response = await axiosInstance.put(`/movie/${id}`, { description, title, originalTitle, language, directorId, categoryId, duration, cast, releaseDate, picture })
  return response.data
}

export const deleteMovie = async (id: string): Promise<ResponseSingle<Movie>> => {
  const response = await axiosInstance.delete(`/movie/${id}`)
  return response.data
}

export const addReview = async (movieId: string, content: string, userId: string, rating: number): Promise<ResponseSingle<Movie>> => {
  const response = await axiosInstance.post(`/movie/${movieId}/review`, { content, userId, rating })
  return response.data
}

export const deleteReview = async (movieId: string, reviewId: string): Promise<ResponseSingle<Movie>> => {
  const response = await axiosInstance.delete(`/movie/${movieId}/review/${reviewId}`)
  return response.data
}

export const getAllByCategory = async (categoryId: string): Promise<ResponseMulti<Movie>> => {
  const response = await axiosInstance.get(`/movie/category/${categoryId}`)
  return response.data
}

export const getAllByDirector = async (directorId: string): Promise<ResponseMulti<Movie>> => {
  const response = await axiosInstance.get(`/movie/director/${directorId}`)
  return response.data
}