import { Personal } from "../models/Personal.model.js"

// Get all personal details
export const getPersonal = async (req, res) => {
    try {
        const personal = await Personal.find();

        return res.status(200).json({ success: true, data: personal, message: "All details fetched" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// Add personal details
export const addPersonal = async (req, res) => {
    try {
        const { name, professionalTitle } = req.body;
        const talkImage = req.files?.talkImage?.[0]?.path;
        const talkImage_public_id = req.files?.talkImage?.[0]?.filename;

        const profilePic = req.files?.profilePic?.[0]?.path;
        const profilePic_public_id = req.files?.profilePic?.[0]?.filename;

        if (!name || !professionalTitle || !talkImage || !profilePic) {
            return res.status(400).json({ success: false, error: "All fields required" });
        }

        const personal = new Personal({
            name,
            professionalTitle,
            talkImage,
            talkImage_public_id,
            profilePic,
            profilePic_public_id,
        });
        await personal.save();

        return res.status(200).json({ success: true, data: personal, message: "personal details created successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// update personal details 
export const updatePersonal = async (req, res) => {
    try {
        const { name, professionalTitle } = req.body;
        const personal = await Personal.findOne();

        if (!personal) {
            return res.status(404).json({
                success: false,
                error: "Profile not found",
            });
        }


        let updateData = {};

        if (name) updateData.name = name;
        if (professionalTitle) updateData.professionalTitle = professionalTitle;

        // Update Profile Picture
        if (req.files?.profilePic) {

            await cloudinary.uploader.destroy(personal.profilePic_public_id);

            updateData.profilePic = req.files.profilePic[0].path;
            updateData.profilePic_public_id = req.files.profilePic[0].filename;
        }

        // Update Talk Image
        if (req.files?.talkImage) {

            await cloudinary.uploader.destroy(personal.talkImage_public_id);

            updateData.talkImage = req.files.talkImage[0].path;
            updateData.talkImage_public_id = req.files.talkImage[0].filename;
        }

        const updatedProfile = await Personal.findByIdAndUpdate(
            personal._id,
            updateData,
            { new: true }
        );

        return res.status(200).json({
            success: true, data: updatedProfile, message: "Profile updated successfully",
        });

    } catch (error) {

        return res.status(500).json({ success: false, error: error.message });

    }
};