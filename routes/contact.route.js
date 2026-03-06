import express from 'express';
import { sendMessage } from '../controllers/contact.controller.js';

const router=express.Router();

router.post('/contact',sendMessage);

export default  router;