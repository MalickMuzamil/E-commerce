import express from 'express'
import LoginController from '../Controller/LoginController.js';

const router = express.Router();

router.post("/login", LoginController.LoginFunction);
router.post("/signup", LoginController.RegisterFunction);

router.post("/sendOTP", LoginController.SendOTP)
router.get("/sendOTP", LoginController.SendOTP)

router.post("/CheckOTP", LoginController.CheckOTP)

router.get("/refreshToken", LoginController.refreshToken)

export default router