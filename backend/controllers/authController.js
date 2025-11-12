const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }
        const user = await User.create({
            name,
            email,
            password,
            role: 'admin',
        });

        if (user) {
            res.status(201).json({
                success: true,
                message: 'Admin user registered successfully',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },

            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid user data',
            });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // If user exists AND password matches..
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            // Check if they are an 'admin'
            if (user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'Not authorized. This panel is for admins only.',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Login successful',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { registerAdmin, loginAdmin }