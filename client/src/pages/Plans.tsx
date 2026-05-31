import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getPlans, subscribePlan } from '../api/planApi';
import { getMySubscription } from '../api/subscriptionApi';
import PlanCard from '../components/PlanCard';
import Loader from '../components/Loader';

interface Plan {
  _id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
}

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const data = await getPlans();

      setPlans(data.plans);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubscription = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      if (!token) return;

      const data = await getMySubscription(token);
      const subscriptions = data.subscription;
      const activeSubscription = subscriptions.find((subscription: any) => subscription.status === 'active');

      if (activeSubscription) {
        setActivePlanId(activeSubscription.plan._id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        toast.error('Please login first');
        return;
      }

      await subscribePlan(planId, token);

      setActivePlanId(planId);

      toast.success('Subscription Successful');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Subscription Failed');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchPlans();
      await fetchSubscription();
    };
    loadData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 dark:text-white">Subscription Plans</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan._id} plan={plan} activePlanId={activePlanId} handleSubscribe={handleSubscribe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;
