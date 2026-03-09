import express from 'express';
import { addEducation, deleteEducation, getEducation, updateEducation } from '../controllers/education.controller.js';
import adminAuth from '../middlewares/adminAuth.js';

const router = express.Router();

// In client
router.get('/', getEducation);

// Admin
router.post('/', adminAuth, addEducation);
router.put('/:id', adminAuth, updateEducation);
router.delete('/:id', adminAuth, deleteEducation);

export default router;