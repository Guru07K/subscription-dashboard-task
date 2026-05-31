import { useEffect, useState } from 'react';
import { getAllSubscriptions } from '../api/adminApi';

interface Subscription {
  _id: string;
  status: string;
  startDate: string;
  endDate: string;
  user: {
    name: string;
    email: string;
  };
  plan: {
    name: string;
    price: number;
  };
}

const AdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const data = await getAllSubscriptions(token as string);
      setSubscriptions(data.subscriptions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 dark:text-white">All Subscriptions</h1>

        <div className="bg-white dark:bg-gray-300 shadow-sm overflow-x-auto">
          <table className="w-full min-w-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Plan</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">End Date</th>
              </tr>
            </thead>

            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription._id} className="border-t border-gray-200">
                  <td className="p-4 font-medium">{subscription.user.name}</td>
                  <td className="p-4 text-gray-600">{subscription.user.email}</td>
                  <td className="p-4">{subscription.plan.name}</td>
                  <td className="p-4">₹{subscription.plan.price}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        subscription.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                      {subscription.status}
                    </span>
                  </td>

                  <td className="p-4">{new Date(subscription.endDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptions;
