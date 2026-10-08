import express from 'express';
import { createExperience } from '../controllers/experience.controller';
import adminAuth from '../middlewares/adminAuth';


const expRoutes=express.Router();

expRoutes.post('/',adminAuth,createExperience);

export default expRoutes;