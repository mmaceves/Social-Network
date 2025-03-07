import { Router } from 'express';
const router = Router();
import {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction
} from '../../controllers/thoughtController.js';

router.route('/').get(getAllThoughts).post(createThoughts);

router
  .route('/:thoughtsId')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

  router
  .route('/:thoughtsId/reactions/:reactionId')
  .post(addReaction)
  .delete(deleteReaction);

export { router as thoughtRouter };
