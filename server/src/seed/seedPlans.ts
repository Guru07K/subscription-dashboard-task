import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db';
import Plan from '../models/Plan';

connectDB();

const seedPlans = async () => {
  try {
    await Plan.deleteMany();

    await Plan.insertMany([
      [
        {
          name: 'Starter',
          price: 299,
          duration: 15,
          features: ['1 User', 'Email Support', 'Basic Dashboard'],
        },

        {
          name: 'Basic',
          price: 499,
          duration: 30,
          features: ['1 User', 'Basic Support', 'Limited Access'],
        },

        {
          name: 'Pro',
          price: 999,
          duration: 30,
          features: ['5 Users', 'Priority Support', 'Full Access'],
        },

        {
          name: 'Premium',
          price: 1499,
          duration: 60,
          features: ['10 Users', 'Priority Support', 'Advanced Reports'],
        },

        {
          name: 'Enterprise',
          price: 1999,
          duration: 30,
          features: ['Unlimited Users', '24/7 Support', 'Advanced Analytics'],
        },

        {
          name: 'Ultimate',
          price: 2999,
          duration: 90,
          features: ['Unlimited Users', '24/7 Dedicated Support', 'All Features Access'],
        },
      ],
    ]);

    console.log('Plans Seeded');

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedPlans();
