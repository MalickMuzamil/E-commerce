import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 600 }, 
    used: { type: Boolean, default: false },
});

const Otp = mongoose.model('Otp', otpSchema);
export default Otp;