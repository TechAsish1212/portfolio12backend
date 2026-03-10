import cloudinary from "../utils/cloudinary.js";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio_skills",
    allowed_formats: ["jpg", "png", "jpeg", "svg", "pdf"]
  }
});

export const upload = multer({ storage });

