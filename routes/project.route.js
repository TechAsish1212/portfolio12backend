import express from 'express';
import { addProjects, deleteProject, getProjects, updateProjects } from '../controllers/project.controller.js';
import adminAuth from '../middlewares/adminAuth.js';
import { upload } from '../middlewares/upload.js';

const router=express.Router();

// In client
router.get('/',getProjects);

// Admin
router.post('/',adminAuth,upload.single('image'),addProjects);
router.put('/:id',adminAuth,upload.single('image'),updateProjects);
router.delete('/:id',adminAuth,deleteProject);

export default router;