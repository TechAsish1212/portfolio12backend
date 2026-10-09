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
            companyLogo:req.file?.path||"",
            position,
            employmentType,
            location,
            startDate,
            endDate: currentlyWorking==='true' ? undefined : endDate,
            currentlyWorking:currentlyWorking==="true",
            description,
            technologies:technologies?JSON.parse(technologies):[],
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

// export const updateExperience = async (req, res) => {
//     try {
//         const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

//         if (!exp) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Experience not found"
//             })
//         }

//         res.status(200).json({
//             success: true,
//             message: "Experience update successfully",
//             data: exp,
//         })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// }


export const updateExperience = async (req, res) => {
    try {
        const {
            companyName,
            position,
            employmentType,
            location,
            startDate,
            endDate,
            currentlyWorking,
            description,
            technologies,
        } = req.body;

        // Check if experience exists
        const existingExperience = await Experience.findById(req.params.id);

        if (!existingExperience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found",
            });
        }

        // Validate required fields
        if (
            !companyName ||
            !position ||
            !startDate ||
            !description
        ) {
            return res.status(400).json({
                success: false,
                message: "Company name, position, start date, and description are required",
            });
        }

        // Convert currentlyWorking to Boolean
        const isCurrentlyWorking =
            currentlyWorking === true ||
            currentlyWorking === "true";

        // Parse technologies
        let parsedTechnologies = existingExperience.technologies;

        if (technologies !== undefined) {
            parsedTechnologies =
                typeof technologies === "string"
                    ? JSON.parse(technologies)
                    : technologies;
        }

        // Update experience
        const updatedExperience = await Experience.findByIdAndUpdate(
            req.params.id,
            {
                companyName,
                companyLogo:
                    req.file?.path ||
                    existingExperience.companyLogo ||
                    "",
                position,
                employmentType,
                location,
                startDate,
                endDate: isCurrentlyWorking ? undefined : endDate,
                currentlyWorking: isCurrentlyWorking,
                description,
                technologies: parsedTechnologies,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Experience updated successfully",
            data: updatedExperience,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



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