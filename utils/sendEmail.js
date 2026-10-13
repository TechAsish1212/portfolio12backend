// utils/sendEmail.js
import { Resend } from "resend";

const sendEmail = async ({ name, email, subject, message }) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set in environment variables");
  }

  const resend = new Resend(apiKey);  

  const { data, error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: ["portfolio.p2019@gmail.com"],
    subject: `New Portfolio Message: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; background:#f4f6f9; padding:40px;">
        
        <table align="center" width="600" style="background:white;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1)">
          
          <tr>
            <td style="background:#4f46e5;color:white;padding:20px;text-align:center">
              <h2 style="margin:0;">&lt;Asish/kumar&gt;</h2>
            </td>
          </tr>

          <tr>
            <td style="padding:30px">

              <p style="font-size:16px;color:#333;">
                You have received a new message from your portfolio contact form.
              </p>

              <table width="100%" style="margin-top:20px;font-size:15px">
                
                <tr>
                  <td style="padding:8px 0;"><strong>Name:</strong></td>
                  <td>${name}</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;"><strong>Email:</strong></td>
                  <td>${email}</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;"><strong>Subject:</strong></td>
                  <td>${subject}</td>
                </tr>

              </table>

              <div style="margin-top:20px;padding:15px;background:#f1f5f9;border-radius:6px">
                <strong>Message:</strong>
                <p style="margin-top:10px;color:#444">${message}</p>
              </div>

              <div style="margin-top:30px;text-align:center">
                <a href="mailto:${email}" 
                   style="background:#4f46e5;color:white;padding:12px 25px;
                   text-decoration:none;border-radius:6px;font-size:14px">
                   Reply to ${name}
                </a>
              </div>

            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;text-align:center;padding:15px;font-size:13px;color:#888">
              © ${new Date().getFullYear()} Your Portfolio • Contact Notification
            </td>
          </tr>

        </table>

      </div>
    `
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message);
  }

  return data;
};

export default sendEmail;




// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const escapeHtml = (value = "") =>
//   String(value).replace(/[&<>"']/g, (char) => ({
//     "&": "&amp;",
//     "<": "&lt;",
//     ">": "&gt;",
//     '"': "&quot;",
//     "'": "&#39;",
//   })[char]);

// const sendEmail = async ({ name, email, subject, message }) => {
//   if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//     throw new Error("EMAIL_USER or EMAIL_PASS is missing");
//   }

//   const safeName = escapeHtml(name);
//   const safeEmail = escapeHtml(email);
//   const safeSubject = escapeHtml(subject);
//   const safeMessage = escapeHtml(message);

//   const info = await transporter.sendMail({
//     from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
//     to: "portfolio.p2019@gmail.com",
//     replyTo: email,
//     subject: `New Portfolio Message: ${subject}`,
//     text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
//     html: `
//       <div style="font-family:Arial,sans-serif;background:#f4f6f9;padding:40px;">
//         <table align="center" width="600"
//           style="max-width:100%;background:white;border-radius:10px;overflow:hidden;">
//           <tr>
//             <td style="background:#4f46e5;color:white;padding:20px;text-align:center;">
//               <h2 style="margin:0;">&lt;Asish/kumar&gt;</h2>
//             </td>
//           </tr>
//           <tr>
//             <td style="padding:30px;">
//               <p>You have received a new message from your portfolio contact form.</p>
//               <table width="100%" style="margin-top:20px;font-size:15px;">
//                 <tr><td><strong>Name:</strong></td><td>${safeName}</td></tr>
//                 <tr><td><strong>Email:</strong></td><td>${safeEmail}</td></tr>
//                 <tr><td><strong>Subject:</strong></td><td>${safeSubject}</td></tr>
//               </table>
//               <div style="margin-top:20px;padding:15px;background:#f1f5f9;border-radius:6px;">
//                 <strong>Message:</strong>
//                 <p style="white-space:pre-wrap;">${safeMessage}</p>
//               </div>
//               <div style="margin-top:30px;text-align:center;">
//                 <a href="mailto:${safeEmail}"
//                   style="background:#4f46e5;color:white;padding:12px 25px;text-decoration:none;border-radius:6px;">
//                   Reply to ${safeName}
//                 </a>
//               </div>
//             </td>
//           </tr>
//           <tr>
//             <td style="background:#f9fafb;text-align:center;padding:15px;font-size:13px;color:#888;">
//               © ${new Date().getFullYear()} Asish Kumar Bera • Portfolio Contact
//             </td>
//           </tr>
//         </table>
//       </div>
//     `,
//   });

//   console.log("Email sent successfully:", info.messageId);
//   return info;
// };

// export default sendEmail;
