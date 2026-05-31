import { NextFunction, Request, Response } from 'express';
import Plan from '../models/Plan';
import Subscription, { SubscriptionStatus } from '../models/Subscription';
import ErrorHandler from '../utils/ErrorHandler/ErrorHandler';

export const subscribePlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { planId } = req.params;
    const user = (req as any).user;

    const existingSubscription = await Subscription.findOne({ user: user.userId, status: SubscriptionStatus.Active });

    if (existingSubscription) {
      throw new ErrorHandler(400, 'You already have an active subscription');
    }

    const plan = await Plan.findById(planId);

    if (!plan) {
      throw new ErrorHandler(404, 'Plan not found');
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration);
    // endDate.setMinutes(endDate.getMinutes() + 2);

    const subscription = await Subscription.create({
      user: user.userId,
      plan: plan._id,
      startDate,
      endDate,
      status: SubscriptionStatus.Active,
    });

    res.status(201).json({
      success: true,
      message: 'Subscription successful',
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const mySubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = (req as any).user;

    const subscription = await Subscription.find({
      user: user.userId,
      // status: SubscriptionStatus.Active,
    }).populate('plan');

    res.status(200).json({
      success: true,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};
