import express from "express";
import {
  getPersonal,
  addPersonal,
  updatePersonal,
} from "../controllers/personal.controller.js";

import adminAuth from "../middlewares/adminAuth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getPersonal);

router.post(
  "/",
  adminAuth,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "talkImage", maxCount: 1 },
  ]),
  addPersonal
);

router.put(
  "/",
  adminAuth,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "talkImage", maxCount: 1 },
  ]),
  updatePersonal
);

export default router;