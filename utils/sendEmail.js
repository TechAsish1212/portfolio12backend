// import transporter from "../config/mailer.js";
// import {Resend} from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendEmail = async ({ name, email, subject, message }) => {

//   const mailOptions = {
//     from: `"Portfolio Contact" <${email}>`,
//     to: ["portfolio.p2019@gmail.com"],
//     subject: `New Portfolio Message: ${subject}`,
//     html: `
//       <div style="font-family: Arial, sans-serif; background:#f4f6f9; padding:40px;">
        
//         <table align="center" width="600" style="background:white;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1)">
          
//           <tr>
//             <td style="background:#4f46e5;color:white;padding:20px;text-align:center">
//               <h2 style="margin:0;">&lt;Asish/kumar&gt;</h2>
//             </td>
//           </tr>

//           <tr>
//             <td style="padding:30px">

//               <p style="font-size:16px;color:#333;">
//                 You have received a new message from your portfolio contact form.
//               </p>

//               <table width="100%" style="margin-top:20px;font-size:15px">
                
//                 <tr>
//                   <td style="padding:8px 0;"><strong>Name:</strong></td>
//                   <td>${name}</td>
//                 </tr>

//                 <tr>
//                   <td style="padding:8px 0;"><strong>Email:</strong></td>
//                   <td>${email}</td>
//                 </tr>

//                 <tr>
//                   <td style="padding:8px 0;"><strong>Subject:</strong></td>
//                   <td>${subject}</td>
//                 </tr>

//               </table>

//               <div style="margin-top:20px;padding:15px;background:#f1f5f9;border-radius:6px">
//                 <strong>Message:</strong>
//                 <p style="margin-top:10px;color:#444">${message}</p>
//               </div>

//               <div style="margin-top:30px;text-align:center">
//                 <a href="mailto:${email}" 
//                    style="background:#4f46e5;color:white;padding:12px 25px;
//                    text-decoration:none;border-radius:6px;font-size:14px">
//                    Reply to ${name}
//                 </a>
//               </div>

//             </td>
//           </tr>

//           <tr>
//             <td style="background:#f9fafb;text-align:center;padding:15px;font-size:13px;color:#888">
//               © ${new Date().getFullYear()} Your Portfolio • Contact Notification
//             </td>
//           </tr>

//         </table>

//       </div>
//     `
//   };

//   await transporter.sendMail(mailOptions);
// };

// export default sendEmail;


import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ name, email, subject, message }) => {

  const { data, error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: ["berarebati7679@gmail.com"],
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
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export default sendEmail;