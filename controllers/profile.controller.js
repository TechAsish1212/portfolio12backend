// import { Profile } from "../models/Profile.model.js";

import { Profile } from "../models/Profile.model.js";

// get profile
export const getProfile = async (req, res) => {
  try {

    const profile = await Profile.findOne();

    res.status(200).json({
      success: true,
      data: profile
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};


// Add profile 
export const addProfile = async (req, res) => {
  try {
    const { name, title, github, linkedin, } = req.body;
    const heroImage = req.files?.heroImage?.[0]?.path;
    const heroImage_public_id = req.files?.heroImage?.[0]?.filename;

    const cv = req.files?.cv?.[0]?.path;
    const cv_public_id = req.files?.cv?.[0]?.filename;

    const talkImg = req.files?.talkImg?.[0]?.path;
    const talkImg_public_id = req.files?.talkImg?.[0]?.filename;

    const existingProfile = await Profile.findOne();
    if (existingProfile) {
      return res.status(400).json({ success: false, error: "Profile already exists. please update your existing profile" });
    }

    const profile = new Profile({
      name,
      title,
      heroImage,
      heroImage_public_id,
      cv,
      cv_public_id,
      talkImg,
      talkImg_public_id,
      socialLinks: {
        github,
        linkedin
      }

    });

    await profile.save();

    return res.status(200).json({ success: true, data: profile, message: "Profile created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// update profile
export const updateProfile = async (req, res) => {
  try {
    const { name, title, github, linkedin } = req.body;

    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    if (name) profile.name = name;
    if (title) profile.title = title;
    if (github) profile.socialLinks.github = github;
    if (linkedin) profile.socialLinks.linkedin = linkedin;


    // HERO IMAGE UPDATE
    if (req.files?.heroImage) {

      if (profile.heroImage_public_id) {
        await cloudinary.uploader.destroy(profile.heroImage_public_id);
      }

      profile.heroImage = req.files.heroImage[0].path;
      profile.heroImage_public_id = req.files.heroImage[0].filename;
    }


    // RESUME UPDATE
    if (req.files?.cv) {

      if (profile.cv_public_id) {
        await cloudinary.uploader.destroy(profile.cv_public_id);
      }

      profile.cv = req.files.cv[0].path;
      profile.cv_public_id = req.files.cv[0].filename;
    }

    // Talk IMAGE Update
    if (req.files?.talkImg) {

      if (profile.talkImg_public_id) {
        await cloudinary.uploader.destroy(profile.talkImg_public_id);
      }

      profile.talkImg = req.files.talkImg[0].path;
      profile.talkImg_public_id = req.files.talkImg[0].filename;
    }

    await profile.save();

    res.status(200).json({ success: true, data: profile, message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}





// // GET PROFILE
// export const getProfile = async (req, res) => {
//   try {

//     const profile = await Profile.findOne();

//     res.status(200).json({
//       success: true,
//       data: profile
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       error: error.message
//     });

//   }
// };



// // ADD PROFILE
// export const addProfile = async (req, res) => {
//   try {

//     const { name, title, githubLink, linkedinLink } = req.body;

//     const heroImage = req.files?.heroImage?.[0]?.path;
//     const heroImage_public_id = req.files?.heroImage?.[0]?.filename;

//     const cv = req.files?.cv?.[0]?.path;
//     const cv_public_id = req.files?.cv?.[0]?.filename;

//     const existingProfile = await Profile.findOne();

//     if (existingProfile) {
//       return res.status(400).json({
//         success: false,
//         error: "Profile already exists. Please update your profile."
//       });
//     }

//     const profile = new Profile({

//       name,
//       title,

//       heroImage,
//       heroImage_public_id,

//       cv,
//       cv_public_id,

//       socialLinks: {
//         github: githubLink,
//         linkedin: linkedinLink
//       }

//     });

//     await profile.save();

//     res.status(201).json({
//       success: true,
//       data: profile,
//       message: "Profile created successfully"
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       error: error.message
//     });

//   }
// };




// // UPDATE PROFILE
// export const updateProfile = async (req, res) => {

//   try {

//     const { name, title, githubLink, linkedinLink } = req.body;

//     const profile = await Profile.findOne();

//     if (!profile) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found"
//       });
//     }

//     if (name) profile.name = name;
//     if (title) profile.title = title;

//     if (githubLink) profile.socialLinks.github = githubLink;
//     if (linkedinLink) profile.socialLinks.linkedin = linkedinLink;


//     // HERO IMAGE UPDATE
//     if (req.files?.heroImage) {

//       if (profile.heroImage_public_id) {
//         await cloudinary.uploader.destroy(profile.heroImage_public_id);
//       }

//       profile.heroImage = req.files.heroImage[0].path;
//       profile.heroImage_public_id = req.files.heroImage[0].filename;
//     }


//     // CV UPDATE
//     if (req.files?.cv) {

//       if (profile.cv_public_id) {
//         await cloudinary.uploader.destroy(profile.cv_public_id);
//       }

//       profile.cv = req.files.cv[0].path;
//       profile.cv_public_id = req.files.cv[0].filename;
//     }

//     await profile.save();

//     res.status(200).json({
//       success: true,
//       data: profile,
//       message: "Profile updated successfully"
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       error: error.message
//     });

//   }

// };