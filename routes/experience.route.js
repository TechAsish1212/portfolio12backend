import express from 'express';
import { createExperience } from '../controllers/experience.controller.js';
import adminAuth from '../middlewares/adminAuth.js';


const expRoutes=express.Router();

expRoutes.post('/',adminAuth,createExperience);

export default expRoutes;