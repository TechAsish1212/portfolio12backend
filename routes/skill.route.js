import express from "express";
import { addSkill, deleteSkill, getSkills, updateSkill } from "../controllers/skill.controller.js";
import adminAuth from "../middlewares/adminAuth.js";
import { upload } from "../middlewares/upload.js";

const router=express.Router();

// public route
router.get('/',getSkills);

// Admin route
router.post('/',upload.single('logo'),addSkill);
router.put('/:id',adminAuth,upload.single('logo'),updateSkill);
router.delete('/:id',adminAuth,deleteSkill);

export default router;