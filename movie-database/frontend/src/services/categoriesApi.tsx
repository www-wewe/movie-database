import { type ResponseMulti, type ResponseSingle, type Category } from '../models'
import axiosInstance from './base'

export const getAll = async (): Promise<ResponseMulti<Category>> => {
  const response = await axiosInstance.get('/category')
  return response.data
}

export const getSingle = async (id: string): Promise<ResponseSingle<Category>> => {
  const response = await axiosInstance.get(`/category/${id}`)
  return response.data
}

export const create = async (name: string, picture: string | undefined): Promise<ResponseSingle<Category>> => {
  const response = await axiosInstance.post('/category', { name, picture })
  return response.data
}

export const update = async (id: string, name: string | undefined, picture: string | undefined): Promise<ResponseSingle<Category>> => {
  const response = await axiosInstance.put(`/category/${id}`, { name, picture })
  return response.data
}

export const categoryDelete = async (id: string): Promise<ResponseSingle<Category>> => {
  const response = await axiosInstance.delete(`/category/${id}`)
  return response.data
}
