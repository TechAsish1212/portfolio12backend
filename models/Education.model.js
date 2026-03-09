import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    school: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    }
}, { timestamps: true });


export const Education=mongoose.model('Education',educationSchema);