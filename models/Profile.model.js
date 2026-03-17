import mongoose from "mongoose";

// const profileSchema = new mongoose.Schema(
//   {
//     heroImage: {
//       type: String,
//       required: true,
//     },

//     heroImage_public_id: {
//       type: String,
//       required: true,
//     },

//     resume: {
//       type: String,
//       required: true,
//     },

//     resume_public_id: {
//       type: String,
//       required: true,
//     },

//     githubLink: {
//       type: String,
//       required: true,
//     },

//     linkedinLink: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export const Profile = mongoose.model("Profile", profileSchema);


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