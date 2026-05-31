import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/ErrorHandler/ErrorHandler';
import { UserRole } from '../models/User';

const roleMiddleware = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!roles.includes(user.role)) {
      next(new ErrorHandler(401, 'Access Denied'));
    }

    next();
  };
};

export default roleMiddleware;
