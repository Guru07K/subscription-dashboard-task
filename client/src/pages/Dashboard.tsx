import { useEffect, useState } from 'react';
import { getMySubscription } from '../api/subscriptionApi';
import Loader from '../components/Loader';

interface Subscription {
  status: string;
  startDate: string;
  endDate: string;
  plan: {
    name: string;
    price: number;
    duration: number;
    features: string[];
  };
}

const Dashboard = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      const data = await getMySubscription(token as string);
      const subscriptions: Subscription[] = data.subscription;

      if (!subscriptions.length) {
        setSubscription(null);
        return;
      }

      const activeSubscription = subscriptions.find((subscription) => subscription.status === 'active');

      if (activeSubscription) {
        setSubscription(activeSubscription);
        return;
      }

      const sortedExpiredSubscriptions = subscriptions
        .filter((subscription) => subscription.status === 'expired')
        .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());

      setSubscription(sortedExpiredSubscriptions[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!subscription) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex justify-center items-center px-4">
        <div className="bg-white dark:bg-gray-300 rounded-2xl p-4 shadow-sm w-full max-w-sm text-center">
          <h1 className="text-lg font-bold mb-2">No Subscription Found</h1>
          <p className="text-sm text-gray-500">Subscribe to a plan to view dashboard details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 px-4 py-4">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Your Subscription Plan</h1>

      <div className="max-w-sm mx-auto">
        <div className="bg-white dark:bg-gray-300 rounded-2xl shadow-sm p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold">My Subscription</h2>
              <p className="text-xs text-gray-500">Details</p>
            </div>

            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                subscription.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
              {subscription.status}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">{subscription.plan.name}</h3>

            <p className="text-2xl font-bold">₹{subscription.plan.price}</p>

            <p className="text-xs text-gray-500">{subscription.plan.duration} Days Plan</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-sm mb-2">Features</h3>

            <div className="space-y-1">
              {subscription.plan.features.map((feature, index) => (
                <p key={index} className="text-xs text-gray-700">
                  • {feature}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-100 dark:bg-gray-200 rounded-lg p-2">
              <p className="text-xs text-gray-500">Start Date</p>

              <p className="font-semibold text-xs">{new Date(subscription.startDate).toLocaleDateString()}</p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-200 rounded-lg p-2">
              <p className="text-xs text-gray-500">End Date</p>

              <p className="font-semibold text-xs">{new Date(subscription.endDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
