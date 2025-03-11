import { Router } from 'express';
import thoughtRouter from './thoughts.js';
import userRouter from './users.js';
const router = Router();
router.use('/thoughts', thoughtRouter);
router.use('/users', userRouter);
export default router;
