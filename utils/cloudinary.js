import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    // cloud_name: "dikzfrcc0",
    // api_key: 264713697245131,
    // api_secret: "2B-B8I6nt3ZbQg0e1En-pBlEVjQ"
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.CLOUDINARY_API_SECRET
    
});

export default cloudinary;
