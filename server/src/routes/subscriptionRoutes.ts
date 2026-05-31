import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { subscribePlan, mySubscription } from '../controllers/subscriptionController';

const router = express.Router();

router.post('/subscribe/:planId', authMiddleware, subscribePlan);
router.get('/my-subscription', authMiddleware, mySubscription);

export default router;
