import { Profile } from "../models/Profile.model.js";

// get profile
export const getProfile = async (req, res) => {
    try {

        const profile = await Profile.findOne();

        res.status(200).json({
            success: true,
            data: profile
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }
};


// Add profile 
export const addProfile = async (req, res) => {
    try {
        const { githubLink, linkedinLink } = req.body;
        const heroImage = req.files?.heroImage?.[0]?.path;
        const heroImage_public_id = req.files?.heroImage?.[0]?.filename;

        const resume = req.files?.resume?.[0]?.path;
        const resume_public_id = req.files?.resume?.[0]?.filename;

        const existingProfile = await Profile.findOne();
        if (existingProfile) {
            return res.status(400).json({ success: false, error: "Profile already exists. please update your existing profile" });
        }

        const profile = new Profile({
            githubLink,
            linkedinLink,
            heroImage,
            heroImage_public_id,
            resume,
            resume_public_id
        });

        await profile.save();

        return res.status(200).json({ success: true, data: profile, message: "Profile created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// update profile
export const updateProfile = async (req, res) => {
    try {
        const { githubLink, linkedinLink } = req.body;

        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        if (githubLink) profile.githubLink = githubLink;
        if (linkedinLink) profile.linkedinLink = linkedinLink;


        // HERO IMAGE UPDATE
        if (req.files?.heroImage) {

            if (profile.heroImage_public_id) {
                await cloudinary.uploader.destroy(profile.heroImage_public_id);
            }

            profile.heroImage = req.files.heroImage[0].path;
            profile.heroImage_public_id = req.files.heroImage[0].filename;
        }


        // RESUME UPDATE
        if (req.files?.resume) {

            if (profile.resume_public_id) {
                await cloudinary.uploader.destroy(profile.resume_public_id);
            }

            profile.resume = req.files.resume[0].path;
            profile.resume_public_id = req.files.resume[0].filename;
        }

        await profile.save();

        res.status(200).json({ success: true, data: profile, message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}