import { Education } from "../models/Education.model.js"

// Get all educations details
export const getEducation = async (req, res) => {
    try {
        const education = await Education.find();

        return res.status(200).json({ success: true, data: education, message: "All Education details fetching" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// Create Education Details
export const addEducation = async (req, res) => {
    try {
        const { school, date, description, degree } = req.body;
        if (!school || !date || !description || !degree) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const education = new Education({
            school,
            date,
            description,
            degree
        });

        // save in the database
        await education.save();

        return res.status(200).json({ success: true, data: education, message: "Education is created Successfully." })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

// Update Education
export const updateEducation = async (req, res) => {
    try {
        const { id } = req.params;
        const { school, date, description, degree } = req.body;

        const existingEducation = await Education.findById(id);
        if (!existingEducation) {
            return res.status(404).json({ success: false, error: "Education record is not found" });
        }

        const updateData = {};
        if (school) {
            updateData.school = school;
        }
        if (date) {
            updateData.date = date;
        }
        if (description) {
            updateData.description = description;
        }
        if (degree) {
            updateData.degree = degree;
        }

        const education = await Education.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({ success: true, data: education, message: "Education updated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// Delete Education 
export const deleteEducation = async (req, res) => {
    try {
        const { id } = req.params;

        const education = await Education.findByIdAndDelete(id);

        if (!education) {
            return res.status(404).json({ success: false, error: "Education record not found" });
        }

        return res.status(200).json({ success: true, data: education, message: "Education deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}