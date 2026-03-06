import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "portfolio.p2019@gmail.com",
    pass: "hwva wmcg aohu wwod"
  }
});

export default transporter;