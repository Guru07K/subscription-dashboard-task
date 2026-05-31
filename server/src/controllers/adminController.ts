import { NextFunction, Request, Response } from 'express';
import Subscription from '../models/Subscription';
import ErrorHandler from '../utils/ErrorHandler/ErrorHandler';

export const getAllSubscriptions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const subscriptions = await Subscription.find().populate('user', 'name email').populate('plan');

    res.status(200).json({
      success: true,
      subscriptions,
    });
  } catch (error: any) {
    next(error);
  }
};
