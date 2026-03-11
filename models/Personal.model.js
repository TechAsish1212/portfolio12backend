import mongoose from 'mongoose';

const personalProfileSchema = new mongoose.Schema({
    profilePic: {
        type: String,
        required: true,
    },
    profilePic_public_id: {
        type: String,
        required: true,
    },

    talkImage: {
        type: String,
        required: true,
    },
    talkImage_public_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    professionalTitle: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const Personal = mongoose.model('Personal', personalProfileSchema);