import Experience from "../models/experience.model.js";

export const createExperience = async (req, res) => {
    try {
        const { companyName, companyLogo, position, employmentType, location, startDate, endDate, currentlyWorking, description, technologies } = req.body;

        if (!companyName || !position || !startDate || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        const experience = await Experience.create({
            companyName,
            companyLogo,
            position,
            employmentType,
            location,
            startDate,
            endDate: currentlyWorking ? undefined : endDate,
            currentlyWorking,
            description,
            technologies
        });

        return res.status(201).json({
            success: true,
            message: "Experience created successfully",
            data: experience
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


export const getAllExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ startDate: -1 });

        res.status(200).json({
            success: true,
            count: experiences.length,
            data: experiences,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateExperience = async (req, res) => {
    try {
        const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!exp) {
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Experience update successfully",
            data: exp,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const deleteExperience = async (req, res) => {
    try {
        const exp = await Experience.findOneAndDelete(req.params.id);

        if (!exp) {
            return res.status(404).json({
                success: false,
                message: "Experience not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Experience deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}