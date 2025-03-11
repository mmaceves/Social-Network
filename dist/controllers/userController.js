import { User, Thought } from '../models/index.js';
export const headCount = async () => {
    const numberOfUsers = await User.aggregate()
        .count('userCount');
    return numberOfUsers;
};
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find();
        const userObj = {
            users,
            headCount: await headCount(),
        };
        res.json(userObj);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json({
                user,
                headCount: await headCount(),
            });
        }
        else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }
        const thought = await Thought.findOneAndUpdate({ users: req.params.userId }, { $pull: { users: req.params.userId } }, { new: true });
        if (!thought) {
            return res.status(404).json({
                message: 'User deleted, but no thought found',
            });
        }
        return res.json({ message: 'User successfully deleted' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
export const updateUser = async (req, res) => {
    console.log('You are updating a user');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { runValidators: true, new: true });
        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
export const addFriend = async (req, res) => {
    console.log('You are adding a friend');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { runValidators: true, new: true });
        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
export const removeFriend = async (req, res) => {
    console.log('You are removing a friend');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true });
        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
