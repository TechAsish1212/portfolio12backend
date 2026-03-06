import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import contactRoute from './routes/contact.route.js'

dotenv.config();

const app = express();

// port
const PORT = process.env.PORT;

// Database connected
connectDB()

// middleware
app.use(cors());
app.use(express.json());

// route define
app.use('/api',contactRoute);

app.get('/', (req, res) => {
    return res.send('Hii ! Everyone Welcome our website.');
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
})
