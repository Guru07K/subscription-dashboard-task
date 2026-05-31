import API from './axios';

export const getAllSubscriptions = async (token: string) => {
  const response = await API.get('/admin/subscriptions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
