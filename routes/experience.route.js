// import express from 'express';
// import { createExperience, deleteExperience, getAllExperiences, updateExperience } from '../controllers/experience.controller.js';
// import adminAuth from '../middlewares/adminAuth.js';
// import { upload } from '../middlewares/upload.js';


// const expRoutes = express.Router();

// expRoutes.get('/', getAllExperiences);

// expRoutes.post('/', adminAuth, upload.single("companyLogo"), createExperience);
// expRoutes.put('/:id', adminAuth, upload.single("companyLogo"), updateExperience);
// expRoutes.delete('/:id', adminAuth, deleteExperience);

// export default expRoutes;


import express from "express";
import {
    createExperience,
    deleteExperience,
    getAllExperiences,
    updateExperience,
} from "../controllers/experience.controller.js";

import adminAuth from "../middlewares/adminAuth.js";
import { upload } from "../middlewares/upload.js";

const expRoutes = express.Router();

expRoutes.get("/", getAllExperiences);

const experienceUploads = upload.fields([
    { name: "companyLogo", maxCount: 1 },
    { name: "Image", maxCount: 1 },
]);

expRoutes.post(
    "/",
    adminAuth,
    experienceUploads,
    createExperience
);

expRoutes.put(
    "/:id",
    adminAuth,
    experienceUploads,
    updateExperience
);

expRoutes.delete("/:id", adminAuth, deleteExperience);

export default expRoutes;