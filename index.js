import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js';
import contactRoute from './routes/contact.route.js'
import skillsRoute from './routes/skill.route.js'




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

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
})
