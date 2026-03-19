// import express from 'express';
// import { upload } from '../middlewares/upload.js';
// import { addProfile, getProfile, updateProfile } from '../controllers/profile.controller.js';

// const router = express.Router();

// router.get('/', getProfile);
// router.post('/', 
//     upload.fields([
//         { name: 'heroImage', maxCount: 1 },
//         { name: 'cv', maxCount: 1 },
//         { name: 'talkImg', maxCount: 1 }
//     ]),
//     addProfile
// );
// router.put('/', 
//     upload.fields([
//         { name: 'heroImage', maxCount: 1 },
//         { name: 'cv', maxCount: 1 },
//         { name: 'talkImg', maxCount: 1 }
//     ]),
//     updateProfile
// );

// export default router;


import express from "express";
import { upload } from "../middlewares/upload.js";
import {
  addProfile,
  getProfile,
  updateProfile
} from "../controllers/profile.controller.js";

const router = express.Router();

// GET
router.get("/", getProfile);

// ADD
router.post(
  "/",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "cv", maxCount: 1 },
    { name: "talkImg", maxCount: 1 },
    { name: "profileImg", maxCount: 1 },
  ]),
  addProfile
);

// UPDATE
router.put(
  "/",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "cv", maxCount: 1 },
    { name: "talkImg", maxCount: 1 },
    { name: "profileImg", maxCount: 1 },
  ]),
  updateProfile
);

export default router;