import { Skill } from "../models/Skill.model.js";

// Get all skills 
export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        return res.status(200).json({ success: true, data: skills });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.messsage })
    }
}

// Add new skill
export const addSkill = async (req, res) => {
    try {
        const { name } = req.body;
        const logo = req.file ? req.file.path : null;

        if (!name) {
            return res.status(401).json({ success: false, error: 'Skill is required' });
        }

        if (!logo) {
            return res.status(401).json({ success: false, error: 'Logo is required' });
        }

        const existingSkill=await Skill.findOne({name});
        if(existingSkill){
            return res.status(404).json({success:false,message:'Skill with this name already exists.'})
        }

        const skill = new Skill({ name, logo });
        // save in database
        await skill.save();
        return res.status(200).json({ success: true, data: skill, message: "Skill created Successfully" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, error: "Skill with this name already exists." })
        }

        return res.status(500).json({ success: false, error: error.messsage });
    }
}

// Update skill
export const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const logo = req.file ? req.file.path : undefined;

        // check if skill exists
        const existSkill = await Skill.findById(id);
        if (!existSkill) {
            return res.status(404).json({ success: false, error: 'Skill not found' });
        }

        const updateData = {};
        if (name) {
            updateData.name = name;
        }
        if (logo !== undefined) {
            updateData.logo = logo;
        }

        const skill = await Skill.findByIdAndUpdate(id, updateData, { new: true });
        return res.status(200).json({ success: true, data: skill, message: "Skill update Successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// Delete skill 
export const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = await Skill.findByIdAndDelete(id);
        if (!skill) {
            return res.status(404).json({ success: false, error: "Skill is not found." })
        }
        return res.status(200).json({ success: true, message: "Skill is deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }

}