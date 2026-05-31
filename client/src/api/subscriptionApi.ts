import API from './axios';

export const getMySubscription = async (token: string) => {
  const response = await API.get('/my-subscription', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
