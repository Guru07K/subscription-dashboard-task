import { NextFunction, Request, Response } from 'express';
import Plan from '../models/Plan';

export const getPlans = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const plans = await Plan.find();

    res.status(200).json({
      success: true,
      plans,
    });
  } catch (error) {
    next(error);
  }
};
