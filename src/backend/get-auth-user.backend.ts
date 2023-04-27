import { API_URL } from '@/shared/config';
import { AuthUser } from '@/shared/models/auth-user.model';
import axios from 'axios';

export const getAuthUser = async () => {
  const response = await axios.get(`${API_URL}/auth/get-user`);
  return response.data as AuthUser;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data as AuthUser;
};

export const logout = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`);
  return response.data;
};
