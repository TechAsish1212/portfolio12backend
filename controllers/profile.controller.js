import { Profile } from "../models/Profile.model.js";
import cloudinary from "../utils/cloudinary.js";

// GET PROFILE
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

// ADD PROFILE
export const addProfile = async (req, res) => {
  try {
    const { name, title, github, linkedin } = req.body;

    const heroImage = req.files?.heroImage?.[0]?.path || "";
    const heroImage_public_id = req.files?.heroImage?.[0]?.public_id || "";

    const cv = req.files?.cv?.[0]?.path || "";
    const cv_public_id = req.files?.cv?.[0]?.public_id || "";

    const talkImg = req.files?.talkImg?.[0]?.path || "";
    const talkImg_public_id = req.files?.talkImg?.[0]?.public_id || "";

    const profileImg = req.files?.profileImg?.[0]?.path || "";
    const profileImg_public_id = req.files?.profileImg?.[0]?.public_id || "";

    const existingProfile = await Profile.findOne();
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists. Use update."
      });
    }

    const profile = await Profile.create({
      name,
      title,
      heroImage,
      heroImage_public_id,
      cv,
      cv_public_id,
      talkImg,
      talkImg_public_id,
      profileImg,
      profileImg_public_id,
      socialLinks: {
        github,
        linkedin
      }
    });

    res.status(201).json({
      success: true,
      data: profile,
      message: "Profile created successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { name, title, github, linkedin } = req.body;

    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    // TEXT UPDATE
    if (name) profile.name = name;
    if (title) profile.title = title;
    if (github) profile.socialLinks.github = github;
    if (linkedin) profile.socialLinks.linkedin = linkedin;

    // HERO IMAGE
    if (req.files?.heroImage?.length > 0) {
      if (profile.heroImage_public_id) {
        await cloudinary.uploader.destroy(profile.heroImage_public_id);
      }

      profile.heroImage = req.files.heroImage[0].path;
      profile.heroImage_public_id = req.files.heroImage[0].public_id;
    }

    // CV
    if (req.files?.cv?.length > 0) {
      if (profile.cv_public_id) {
        await cloudinary.uploader.destroy(profile.cv_public_id);
      }

      profile.cv = req.files.cv[0].path;
      profile.cv_public_id = req.files.cv[0].public_id;
    }

    // TALK IMAGE
    if (req.files?.talkImg?.length > 0) {
      if (profile.talkImg_public_id) {
        await cloudinary.uploader.destroy(profile.talkImg_public_id);
      }

      profile.talkImg = req.files.talkImg[0].path;
      profile.talkImg_public_id = req.files.talkImg[0].public_id;
    }

      // PROFILE IMAGE
    if (req.files?.profileImg?.length > 0) {
      if (profile.profileImg_public_id) {
        await cloudinary.uploader.destroy(profile.profileImg_public_id);
      }

      profile.profileImg = req.files.profileImg[0].path;
      profile.profileImg_public_id = req.files.profileImg[0].public_id;
    }

    await profile.save();

    res.status(200).json({
      success: true,
      data: profile,
      message: "Profile updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};