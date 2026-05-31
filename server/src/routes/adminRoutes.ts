import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';
import { getAllSubscriptions } from '../controllers/adminController';
import { UserRole } from '../models/User';

const router = express.Router();

router.get('/subscriptions', authMiddleware, roleMiddleware(UserRole.Admin), getAllSubscriptions);

export default router;
