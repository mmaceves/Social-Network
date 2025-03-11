import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';
const router = Router();
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);
router
    .route('/:userId')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser);
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);
export default router;
