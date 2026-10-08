import express from 'express';
import { createExperience, getAllExperiences } from '../controllers/experience.controller.js';
import adminAuth from '../middlewares/adminAuth.js';


const expRoutes=express.Router();

expRoutes.get('/',getAllExperiences);

expRoutes.post('/',adminAuth,createExperience);

export default expRoutes;