import Models from '../Models/NewUser.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import AddCategory from '../Models/AddCategoryModel.js'
import OTPModel from '../Models/OTPModel.js';
import NewUser from '../Models/NewUser.js';

const SECRET_KEY = 'your_test_secret_key';

const otpStore = {};
// let storedOTP = null;

const generateOTP = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
};

class LoginController {

    // static LoginFunction = async (req, res) => {
    //     const { email, password } = req.body;

    //     const user = await Models.findOne({ email });

    //     if (!user) {
    //         return res.status(401).json({ message: 'User not found. Please register.' });
    //     }

    //     if (user.password !== password) {
    //         return res.status(400).json({ message: 'Invalid credentials. Please try again.' });
    //     }

    //     res.status(200).json({ message: 'User logged in successfully', role: user.role, username: user.name });
    // }

    static LoginFunction = async (req, res) => {
        const { email, googleId, password, name } = req.body;

        let user = await Models.findOne({ email });

        if (!user) {
            user = new Models({
                email: email,
                password: password,
                googleId: googleId,
                role: 'user',
                name: name || 'Google User'
            });

            await user.save();

            //generating for new users
            const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

            return res.status(201).json({
                message: 'New user created successfully',
                role: user.role,
                username: user.name,
                token: token
            });
        }

        if (user.password !== password && !googleId) {
            return res.status(400).json({ message: 'Invalid credentials. Please try again.' });
        }

        if (googleId && user.googleId !== googleId) {
            return res.status(400).json({ message: 'Google ID mismatch. Please try again.' });
        }

        //generating for old users (refreshing)
        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            message: 'User logged in successfully',
            role: user.role,
            username: user.name,
            token: token
        });
    };


    static RegisterFunction = async (req, res) => {
        const { Username, Email, Password } = req.body;
        console.log(Username, Email, Password);

        let Role = 'user';

        if (Email.includes('@admin.com')) {
            Role = 'admin';
        }

        try {
            const newUser = new Models({
                name: Username,
                email: Email,
                password: Password,
                role: Role || 'user'
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id, role: Role }, SECRET_KEY, { expiresIn: '1h' });
            console.log('Generated Token:', token);

            res.status(201).json({ message: 'User registered successfully', role: Role, name: Username, token });
        }

        catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Failed to register user' });
        }
    }

    static async SendOTP(req, res) {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        if (!email.endsWith('@gmail.com')) {
            return res.status(400).json({ success: false, message: 'Only Gmail addresses are allowed' });
        }

        const otp = generateOTP();

        try {
            const user = await Models.findOne({ email: email });

            if (!user) {
                return res.status(404).json({ success: false, message: 'Email not found' });
            }

            await OTPModel.create({ email: email, otp: otp });

            return res.status(200).json({ success: true, message: 'OTP sent successfully', email: email, otp: otp });
        }
        catch (error) {
            console.error('Error sending OTP:', error);
            return res.status(500).json({ success: false, message: 'Failed to send OTP' });
        }
    }

    static async CheckOTP(req, res) {
        const { otp, email, password } = req.body;

        if (!email || !otp || !password) {
            return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required' });
        }

        try {
            const otpRecord = await OTPModel.findOne({ email: email, otp: otp });

            if (!otpRecord) {
                return res.status(400).json({ success: false, message: 'Invalid OTP' });
            }

            if (otpRecord.used) {
                return res.status(400).json({ success: false, message: 'OTP has already been used' });
            }

            const now = new Date();
            if (now - otpRecord.createdAt > 600000) { // 10 minutes in milliseconds
                return res.status(400).json({ success: false, message: 'OTP has expired' });
            }

            otpRecord.used = true;
            await otpRecord.save();

            const user = await NewUser.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            user.password = password;
            await user.save();

            return res.status(200).json({ success: true, message: 'OTP verified and password updated successfully' });
        }
        catch (error) {
            console.error('Error verifying OTP and updating password:', error);
            return res.status(500).json({ success: false, message: 'Failed to verify OTP and update password' });
        }
    }

    static SearchQuery = async (req, res) => {
        try {
            const { query } = req.body;
            console.log('Received query:', query);

            if (!query || query.trim() === '') {
                return res.status(400).json({ message: 'Query is required' });
            }

            const trimmedQuery = query.trim();

            const ResultQuery = await AddCategory.find({
                $or: [
                    { category: { $regex: trimmedQuery, $options: 'i' } },
                    { brand: { $regex: trimmedQuery, $options: 'i' } },
                    { type: { $regex: trimmedQuery, $options: 'i' } },
                    { season: { $regex: trimmedQuery, $options: 'i' } },
                ]
            });

            console.log('Search results:', ResultQuery);

            if (ResultQuery.length === 0) {
                return res.status(404).json({ message: 'No matching results found' });
            }

            res.status(200).json({ message: 'Results found', results: ResultQuery });
        } catch (error) {
            console.error('Error during search:', error);
            res.status(500).json({ message: 'Error during search' });
        }
    }

    static refreshToken = async (req, res) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token is required' });
        }

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const user = await Models.findById(decoded.id);

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            const newToken = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({ message: 'Token refreshed successfully', token: newToken });

        }

        catch (error) {
            console.error('Error refreshing token:', error);
            res.status(401).json({ message: 'Invalid or expired token' });
        }
    }

}

export default LoginController;

