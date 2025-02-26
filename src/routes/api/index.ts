import { Router } from 'express';
import { thoughtRouter } from './thoughtRoutes.js';
import { userRouter } from './userRoutes.js';

const router = Router();

router.use('/thought', thoughtRouter);
router.use('/user', userRouter);

export default router;
