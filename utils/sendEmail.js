import transporter from "../config/mailer.js";

const sendEmail = async ({ name, email, subject, message }) => {

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: "portfolio.p2019@gmail.com",
    subject: `New Portfolio Message: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; background:#f4f6f9; padding:40px;">
        
        <table align="center" width="600" style="background:white;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1)">
          
          <tr>
            <td style="background:#4f46e5;color:white;padding:20px;text-align:center">
              <h2 style="margin:0;">📩 New Portfolio Message</h2>
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
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;