// import cloudinary from "../utils/cloudinary.js";
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from "multer";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "portfolio_skills",
//     resource_type: "auto",
//     allowed_formats: ["jpg", "png", "jpeg", "svg", "pdf"]
//   }
// });

// export const upload = multer({ storage });


import cloudinary from "../utils/cloudinary.js";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.fieldname === "cv") {
      return {
        folder: "portfolio/cv",
        resource_type: "raw", // ✅ Use "raw" for PDFs and documents, not "auto"
        allowed_formats: ["pdf", "doc", "docx"],
        type: "upload",
        access_mode: "public",
      };
    }

    // For images
    return {
      folder: "portfolio/images",
      resource_type: "image",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "svg"],
      type: "upload",
      access_mode: "public",
    };
  },
});

export const upload = multer({ storage });