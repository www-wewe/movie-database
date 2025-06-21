import { type ResponseMulti, type ResponseSingle, type Director } from '../models'
import axiosInstance from './base'

export const getAll = async (): Promise<ResponseMulti<Director>> => {
  const response = await axiosInstance.get('/director')
  return response.data
}

export const getSingle = async (id: string): Promise<ResponseSingle<Director>> => {
  const response = await axiosInstance.get(`/director/${id}`)
  return response.data
}

export const create = async (name: string, birthDate: Date, description: string, dateOfDeath?: Date | undefined, picture?: string | undefined): Promise<ResponseSingle<Director>> => {
  const response = await axiosInstance.post('/director', { name, birthDate, description, dateOfDeath, picture })
  return response.data
}

export const update = async (id: string, name: string, birthDate: Date, description: string, dateOfDeath?: Date | undefined, picture?: string | undefined): Promise<ResponseSingle<Director>> => {
  const response = await axiosInstance.put(`/director/${id}`, { name, birthDate, description, dateOfDeath, picture })
  return response.data
}

export const updateWithoutPictureDeath = async (id: string, name: string, birthDate: Date, description: string): Promise<ResponseSingle<Director>> => {
  const response = await axiosInstance.put(`/director/${id}`, { name, birthDate, description })
  return response.data
}

export const updateWithoutPicture = async (id: string, name: string, birthDate: Date, description: string, dateOfDeath: Date): Promise<ResponseSingle<Director>> => {
  const response = await axiosInstance.put(`/director/${id}`, { name, birthDate, description, dateOfDeath })
  return response.data
}

export const updateWithoutDeath = async (id: string, name: string, birthDate: Date, description: string, picture: string): Promise<ResponseSingle<Director>> => {
  const response = await axiosInstance.put(`/director/${id}`, { name, birthDate, description, picture })
  return response.data
}


export const directorDelete = async (id: string): Promise<ResponseSingle<Director>> => {
  const response = await axiosInstance.delete(`/director/${id}`)
  return response.data
}