import Post from '../models/Post.js';
import User from '../models/User.js';
import dotenv from 'dotenv';
import { users, posts } from '../data/index.js';
dotenv.config();

export const seedDb = async (req, res) => {
    try {
        const apiKey = req.headers['x-api-key'];
        const action = req.query.action;
        if (apiKey !== process.env.SEED_API_KEY) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (action === 'seed') {
            const seededUsers = await User.insertMany(users);
            const seededPosts = await Post.insertMany(posts);
            return res.status(200).json({
                message: 'DB seeded successfully.',
                users: seededUsers,
                posts: seededPosts
            });
        } else if (action === 'clean') {
            await User.deleteMany({});
            await Post.deleteMany({});
            return res
                .status(200)
                .json({ message: 'Database cleaned successfully.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
};
