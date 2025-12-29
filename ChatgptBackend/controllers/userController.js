import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Chat from "../models/Chat.js";

//Genrate TOken
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "3d",
    })
}

// Check if database is connected
const checkDBConnection = () => {
    if (mongoose.connection.readyState !== 1) {
        throw new Error('Database not connected. Please check your MongoDB connection.');
    }
}

//API to register user
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, email, and password"
            });
        }

        checkDBConnection();

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const user = await User.create({
            name,
            email,
            password
        });

        const token = generateToken(user._id)
        return res.status(201).json({
            success: true,
            token
        })

    }
    catch (err) {
        console.error('Registration Error Details:', {
            message: err.message,
            name: err.name,
            stack: err.stack
        });

        // Handle Mongoose validation errors
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: Object.values(err.errors).map(e => e.message).join(', ')
            });
        }

        // Handle duplicate key error (unique email)
        if (err.code === 11000 || err.code === 11001) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message || 'Registration failed'
        })
    }
}

// API to login user
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        checkDBConnection();
        const user = await User.findOne({ email });
        if (user) {
            const isMatched = await user.matchPassword(password);
            if (isMatched) {
                const token = generateToken(user._id);
                return res.json({ success: true, token })
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid Credentials'
                })
            }
        }
        return res.json({ success: false, message: "Invalid Credentials" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
//API to get user Data

export const getUser = async (req, res, next) => {
    try {
        const user = req.user;
        return res.json({ success: true, user })

    } catch (error) {
        return res.json({ success: false, message: error.message })

    }
}
//API to get Published images

export const getPublishedImages = async (req, res,) => {
    try {
        const publishedImageMessages = await Chat.aggregate([
            { $unwind: "$messages" },
            {
                $match: {
                    "messages.isImage": true,
                    "messages.isPublished": true
                }
            },
            {
                $project: {
                    _id: 0,
                    imageUrl: "$messages.content",
                    userName: "$userName",
                    messages: 1
                }
            }

        ])
        return res.json({ success: true, images: publishedImageMessages.reverse() })
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}