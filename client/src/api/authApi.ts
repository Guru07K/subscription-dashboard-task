import API from './axios';

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const response = await API.post('/auth/register', data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await API.post('/auth/login', data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};

export const refreshTokenApi = async (refreshToken: string) => {
  const response = await API.post('/auth/refresh-token', {
    refreshToken,
  });
  return response.data;
};
