// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "portfolio.p2019@gmail.com",
//     pass: "hwva wmcg aohu wwod"
//   }
// });

// export default transporter;

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // 🔥 use 587 instead of 465
  secure: false, // true only for 465
  auth: {
    user: "portfolio.p2019@gmail.com",
    pass: "hwva wmcg aohu wwod"
  },
  tls: {
    rejectUnauthorized: false
  }
});

export default transporter;