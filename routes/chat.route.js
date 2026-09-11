// routes/chat.route.js
import express from 'express';
import { chatHandler } from '../controllers/chat.js'; 

const router = express.Router();
router.post('/chat', chatHandler);

export default router;