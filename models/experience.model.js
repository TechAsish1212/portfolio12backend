import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    companyLogo: {
      type: String,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: [
        "Full-time",
        "Part-time",
        "Internship",
        "Freelance",
        "Contract",
      ],
    },

    location: {
      type: String,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    currentlyWorking: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      required: true,
    },

    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

experienceSchema.pre("validate", function () {
  if (this.currentlyWorking) {
    this.endDate = undefined;
  }
});

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;