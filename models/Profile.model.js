import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  heroImage: {
    type: String,
  },
  heroImage_public_id: {
    type: String,
  },
  cv: {
    type: String,
  },
  cv_public_id: {
    type: String,
  },
  talkImg: {
    type: String
  },
  talkImg_public_id: {
    type: String
  },
   profileImg: {
    type: String
  },
  profileImg_public_id: {
    type: String
  },
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  socialLinks: {
    github: String,
    linkedin: String,
  }
}, { timestamps: true });

export const Profile=mongoose.model('Profile',profileSchema); 