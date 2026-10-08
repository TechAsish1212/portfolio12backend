import Experience from "../models/experience.model";

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
            endDate,
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