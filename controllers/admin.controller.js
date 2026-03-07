import jwt from "jsonwebtoken";

export const adminLogin = (req, res) => {

    const { email, password } = req.body;

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {

        const token = jwt.sign(
            { role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid email or password"
    });
};