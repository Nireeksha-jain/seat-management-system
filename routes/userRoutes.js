import express from 'express';
import {
    registerUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById,
    findUserByEmail
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.delete('/:userId', deleteUserById);
router.put('/:userId', updateUserById);
router.get('/findByEmail/:email', findUserByEmail);

export default router;