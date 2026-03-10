import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import contactRoute from './routes/contact.route.js'
import skillsRoute from './routes/skill.route.js'
import adminRoute from './routes/admin.route.js';
import educationRoute from './routes/education.route.js';
import quoteRoute from './routes/quote.route.js'
import projectRoute from './routes/project.route.js';

const app = express();

// port
const PORT = process.env.PORT;

// Database connected
connectDB()

// middleware
app.use(cors());
app.use(express.json());

// route define
app.use('/api', contactRoute);
app.use('/api/skills', skillsRoute);
app.use('/api/admin', adminRoute);
app.use('/api/education', educationRoute);
app.use('/api/quote',quoteRoute);
app.use('/api/project',projectRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
})
