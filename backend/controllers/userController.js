import * as userService from '../services/userService.js';

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const userBody = req.body;
        const newUser = await userService.registerUser(userBody);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUser();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user by ID
export const deleteUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        await userService.deleteUserById(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user by ID
export const updateUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const { clarkId } = req.body;
        const updatedUser = await userService.updateUserById(userId, clarkId);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Find user by email
export const findUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};