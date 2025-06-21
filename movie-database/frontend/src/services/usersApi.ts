import { type User, type ResponseMulti, type ResponseSingle } from '../models'
import axiosInstance from './base'

export const getAll = async (): Promise<ResponseMulti<User>> => {
  const response = await axiosInstance.get('/user')
  return response.data
}

export const getSingle = async (id: string): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.get(`/user/${id}`)
  return response.data
}

export const register = async (userName: string, email: string, password: string, avatar?: string | undefined): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.post('/user/registration', { userName, avatar, email, password})
  return response.data
}

export const login = async (email: string, password: string): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.post('/user/login', { email, password })
  return response.data
}

export const updateProfile = async (userName: string, avatar?: string | undefined): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.put(`/user/`, { userName, avatar })
  return response.data
}

export const updateProfileWithoutAvatar = async (userName: string): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.put(`/user/`, { userName })
  return response.data
}

export const deleteUser = async (id: string): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.delete(`/user/${id}`)
  return response.data
}

export const logout = async (): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.post('/user/logout', {})
  return response.data
}

export const addToFavourites = async (movieId: string): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.patch('/user/favourites/add', { movieId })
  return response.data
}

export const addToWatchList = async (movieId: string): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.patch('/user/watch-list/add', { movieId })
  return response.data
}

export const removeFromFavourites = async (movieId: string): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.patch('/user/favourites/remove', { movieId })
  return response.data
}

export const removeFromWatchList = async (movieId: string): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.patch('/user/watch-list/remove', { movieId })
  return response.data
}

export const block = async (id: string): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.patch(`/user/block/${id}`)
  return response.data
}

export const changePassword = async (oldPassword: string, newPassword: string): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.patch('/user/password', { oldPassword, newPassword })
  return response.data
}