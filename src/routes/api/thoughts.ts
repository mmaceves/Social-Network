import { Router } from 'express';
import {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction
} from '../../controllers/thoughtController.js';

const router = Router();

router
  .route('/')
  .get(getAllThoughts)
  .post(createThoughts);

router
  .route('/:thoughtId')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

  router
  .route('/:thoughtId/reactions')
  .post(addReaction)

  router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

export default router;
