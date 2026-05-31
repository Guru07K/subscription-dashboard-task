import API from './axios';

export const getPlans = async () => {
  const response = await API.get('/plans');
  return response.data;
};

export const subscribePlan = async (planId: string, token: string) => {
  const response = await API.post(
    `/subscribe/${planId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
