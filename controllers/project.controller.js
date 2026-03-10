import { Project } from "../models/Project.model.js"

// Get All Projects
export const getProjects = async (req, res) => {
    try {
        const project = await Project.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: project, message: "All projects details are fetch" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// Create Projects
export const addProjects = async (req, res) => {
    try {
        const { title, description, tags, webapp, github } = req.body;
        const image = req.file?.path;

        if (!title || !description || !tags || !webapp || !github || !image) {
            return res.status(400).json({ success: false, error: "All fields are required." });
        }

        const tagsArray = tags.split(',').map(tag => tag.trim());

        const projects = new Project({
            title,
            description,
            tags: tagsArray,
            webapp,
            github,
            image,
        })
        await projects.save();
        return res.status(200).json({ success: true, data: projects, message: "Project added successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// Update Projects
export const updateProjects = async (req, res) => {
    try {

        const { id } = req.params;
        const { title, description, tags, webapp, github } = req.body;
        const image = req.file?.path;

        const existingProjects = await Project.findById(id);

        if (!existingProjects) {
            return res.status(404).json({
                success: false,
                error: "Project record not found."
            });
        }

        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (webapp !== undefined) updateData.webapp = webapp;
        if (github !== undefined) updateData.github = github;
        if (image !== undefined) updateData.image = image;

        if (tags !== undefined) {
            const tagsArray = tags.split(",").map(tag => tag.trim());
            updateData.tags = tagsArray;
        }

        const projects = await Project.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        return res.status(200).json({
            success: true,
            data: projects,
            message: "Project updated successfully."
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error: error.message
        });

    }
};

// Delete Projects
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ success: false, error: "Project record not found" });
        }
        return res.status(200).json({ success: true, data: project, message: "Project deleted successfully." });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}