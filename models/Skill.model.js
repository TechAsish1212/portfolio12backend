import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String }
});

export const Skill = mongoose.model('Skill', skillSchema);