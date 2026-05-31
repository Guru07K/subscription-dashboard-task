import cron from 'node-cron';
import Subscription, { SubscriptionStatus } from '../models/Subscription';

const subscriptionCron = () => {
  // cron.schedule('*/1 * * * *', async () => {
  cron.schedule('0 0 * * *', async () => {
    try {
      const currentDate = new Date();

      await Subscription.updateMany({ status: SubscriptionStatus.Active, endDate: { $lt: currentDate } }, { $set: { status: 'expired' } });

      console.log('Expired subscriptions updated');
    } catch (error) {
      console.log(error);
    }
  });
};

export default subscriptionCron;
