import express from 'express';
import { register, login, refreshAccessToken, logout, getMe } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', logout);
router.get('/me', authMiddleware, getMe);

export default router;
