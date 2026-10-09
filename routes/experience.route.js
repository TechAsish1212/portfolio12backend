import express from 'express';
import { createExperience, getAllExperiences, updateExperience } from '../controllers/experience.controller.js';
import adminAuth from '../middlewares/adminAuth.js';


const expRoutes=express.Router();

expRoutes.get('/',getAllExperiences);

expRoutes.post('/',adminAuth,createExperience);
expRoutes.put('/:id',adminAuth,updateExperience);

export default expRoutes;