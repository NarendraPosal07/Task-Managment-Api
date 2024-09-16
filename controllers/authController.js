const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'errors',
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;
        const isExistUser = await User.findOne({ email });
        if (isExistUser) {
            return res.status(200).json({
                success: false,
                msg: 'Email already exists',
            });
        }
        const hashpass = await bcrypt.hash(password, 10);

        const user = new user({
            name,
            email,
            password: hashpass
        });
        const userData = await user.save();

        res.status(200).json({
            success: true,
            msg: 'User created successfully',
            data: userData
        });

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const generateToken = async (user) => {
    const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token
}

const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'errors',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;
        const userdata = await User.findOne({ email });
        if (!userdata) {
            return res.status(200).json({
                success: false,
                msg: 'Email and password is incorrect',
            });
        }
        const isMatch = await bcrypt.compare(password, userdata.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                msg: 'Email and password is incorrect',
            });
        }
        const token = await generateToken({ user: userdata });

        return res.status(200).json({
            success: true,
            msg: 'Login successful',
            token: token,
            tokenType: 'bearer',
            data: userdata
        });


    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const getProfile = async (req, res) => {
    try {
        const user_id = req.user._id;
        const userData = await User.findById(user_id);


        return res.status(200).json({
            success: true,
            msg: 'profile data',
            data: userData
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getProfile
}