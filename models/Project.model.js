import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: String,
            required: true,
        },
    ],
    title: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    },
    webapp: {
        type: String,
        required: true,
    },
}, { timestamps: true });


export const Project=mongoose.model('Project',projectSchema);