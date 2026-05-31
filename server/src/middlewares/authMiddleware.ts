import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/ErrorHandler/ErrorHandler';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ErrorHandler(401, 'Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    (req as any).user = decoded;

    next();
  } catch (error: any) {
    next(error);
  }
};

export default authMiddleware;
