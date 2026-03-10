import express from 'express';
import { addProfile, getProfile, updateProfile } from '../controllers/profile.controller.js';
import adminAuth from '../middlewares/adminAuth.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

// in client
router.get('/', getProfile);

// admin
router.post('/', adminAuth, upload.fields([{ name: "heroImage", maxCount: 1 }, { name: "resume", maxCount: 1 }]), addProfile);
router.put('/', adminAuth, upload.fields([{ name: "heroImage", maxCount: 1 }, { name: "resume", maxCount: 1 }]), updateProfile);

export default router;