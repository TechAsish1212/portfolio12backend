import { Contact } from "../models/Contact.model.js";
import sendEmail from "../utils/sendEmail.js";

export const sendMessage = async (req, res) => {
  try {

    // fetch data from client
    const { name, email, subject, message } = req.body;

    // every field required
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // save in database
    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    // send email
    await sendEmail({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact
    });

  } catch (error) {

    console.error("Contact Controller Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};