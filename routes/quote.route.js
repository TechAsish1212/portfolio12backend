import express from 'express';
import { addQuote, deleteQuote, getQuote, updateQuote } from '../controllers/quote.controller.js';
import adminAuth from '../middlewares/adminAuth.js';

const router=express.Router();

// in client
router.get('/',getQuote);

// admin
router.post('/',adminAuth,addQuote);
router.put('/:id',adminAuth,updateQuote);
router.delete('/:id',adminAuth,deleteQuote);

export default router;