import mongoose from "mongoose";

const quoteSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
},{timestamps:true});

export const Quote=mongoose.model('Quote',quoteSchema); 