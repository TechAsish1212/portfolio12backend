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



// import multer from "multer";
// import cloudinary from "../utils/cloudinary.js";
// import streamifier from "streamifier";

// // Multer memory storage
// const storage = multer.memoryStorage();
// const up = multer({ storage });

// // Middleware to upload to Cloudinary and set req.file.path
// export const upload = (fieldName) => {
//   return [
//     up.single(fieldName),
//     async (req, res, next) => {
//       try {
//         if (!req.file) return next();

//         const result = await new Promise((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream(
//             {
//               folder: "portfolio_skills",
//               resource_type: "auto",
//             },
//             (error, result) => {
//               if (error) return reject(error);
//               resolve(result);
//             }
//           );

//           streamifier.createReadStream(req.file.buffer).pipe(stream);
//         });

//         // ✅ THIS IS THE KEY LINE (matches your controller)
//         req.file.path = result.secure_url;

//         next();
//       } catch (error) {
//         return res.status(500).json({
//           success: false,
//           error: error.message,
//         });
//       }
//     },
//   ];
// };