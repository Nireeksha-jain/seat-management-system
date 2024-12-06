import User from '../models/User.js';
import UserDto from '../dtos/UserDto.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (userBody) => {
    const { clarkId, email, firstName, lastName, password, phoneNumber } = userBody;
    console.log(userBody);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ clarkId, email, firstName, lastName, password: hashedPassword, phoneNumber });
    await newUser.save();
    return new UserDto(newUser._id, newUser.clarkId, newUser.email, newUser.firstName, newUser.lastName, newUser.role, newUser.password, newUser.isActive, newUser.phoneNumber);
};

// Get all users
export const getAllUser = async () => {
    const users = await User.find();
    return users.map(user => new UserDto(user._id, user.clarkId, user.email, user.firstName, user.lastName, user.role, user.password, user.isActive, user.phoneNumber));
};

// Get user by ID
export const getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return new UserDto(user._id, user.clarkId, user.email, user.firstName, user.lastName, user.role, user.password, user.isActive, user.phoneNumber);
};

// Delete user by ID
export const deleteUserById = async (id) => {
    await User.findByIdAndDelete(id);
};

// Update user by ID
export const updateUserById = async (id, clarkId) => {
    const updatedUser = await User.findByIdAndUpdate(id, { clarkId }, { new: true });
    return new UserDto(updatedUser._id, updatedUser.clarkId, updatedUser.email, updatedUser.firstName, updatedUser.lastName, updatedUser.role, updatedUser.password, updatedUser.isActive, updatedUser.phoneNumber);
};

// Find user by email
export const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    return new UserDto(user._id, user.clarkId, user.email, user.firstName, user.lastName, user.role, user.password, user.isActive, user.phoneNumber);
};

// Decode Google token
export const decodeGoogleToken = (token) => {
    const decoded = jwt.decode(token);
    return decoded.email;
};

// Soft delete user
export const softDelete = async (email, value) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    user.isActive = value;
    await user.save();
    return `${user.email} active status of user has been changed to ${value}`;
};