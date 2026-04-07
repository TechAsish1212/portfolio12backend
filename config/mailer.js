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
  port: 587,          // ✅ IMPORTANT
  secure: false,      // ✅ IMPORTANT (must be false for 587)
  auth: {
    user: "portfolio.p2019@gmail.com",
    pass: "hwva wmcg aohu wwod",
  },
  family: 4,          // ✅ FORCE IPv4 (fixes ENETUNREACH)
});

export default transporter;