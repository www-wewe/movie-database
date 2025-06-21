import { ResponseSingle, User } from "../models";
import axiosInstance from './base'

export const userAuth = async () => {
    const resp = await axiosInstance.get<ResponseSingle<User>>('/user/auth-info');
    return resp.data;
}
