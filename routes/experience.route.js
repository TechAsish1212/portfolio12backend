import express from 'express';
import { createExperience, deleteExperience, getAllExperiences, updateExperience } from '../controllers/experience.controller.js';
import adminAuth from '../middlewares/adminAuth.js';
import { upload } from '../middlewares/upload.js';


const expRoutes = express.Router();

expRoutes.get('/', getAllExperiences);

expRoutes.post('/', adminAuth, upload.single("companyLogo"), createExperience);
expRoutes.put('/:id', adminAuth, upload.single("companyLogo"), updateExperience);
expRoutes.delete('/:id', adminAuth, deleteExperience);

export default expRoutes;