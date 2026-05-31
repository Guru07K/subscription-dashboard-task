interface Plan {
  _id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
}

interface Props {
  plan: Plan;
  activePlanId: string | null;
  handleSubscribe: (id: string) => void;
}

const PlanCard = ({ plan, activePlanId, handleSubscribe }: Props) => {
  const isActive = activePlanId === plan._id;

  return (
    <div
      className={`bg-white dark:bg-gray-300 rounded-2xl p-6 shadow-sm border transition duration-300 ${isActive ? 'border-green-500' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold">{plan.name}</h2>

        {isActive && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Active</span>}
      </div>

      <p className="text-4xl font-bold mb-2">₹{plan.price}</p>
      <p className="text-gray-500 mb-5">{plan.duration} Days</p>

      <div className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <p key={index} className="text-gray-700">
            • {feature}
          </p>
        ))}
      </div>

      <button
        disabled={isActive}
        onClick={() => handleSubscribe(plan._id)}
        className={`w-full p-3 rounded-lg transition duration-300 ${
          isActive ? 'bg-green-500 text-white cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-800 text-white cursor-pointer'
        }`}>
        {isActive ? 'Current Plan' : 'Subscribe'}
      </button>
    </div>
  );
};

export default PlanCard;
