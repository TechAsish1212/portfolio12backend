import { Quote } from "../models/Quote.model.js"

// get all quote
export const getQuote = async (req, res) => {
    try {
        const quote = await Quote.find();
        return res.status(200).json({ success: true, data: quote, message: "All Quote Details is fetch" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// create quote
export const addQuote = async (req, res) => {
    try {
        const { text, author } = req.body;
        if (!text || !author) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }
        const quote = new Quote({
            text,
            author,
        });

        // save in database
        await quote.save();

        return res.status(200).json({ success: true, data: quote, message: "Quote is created successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// update Quote
export const updateQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, author } = req.body;

        const existingQuote = await Quote.findById(id);

        if (!existingQuote) {
            return res.status(400).json({ success: false, error: "Quote record not found." });
        }

        const updateData = {};
        if (text) {
            updateData.text = text;
        }
        if (author) {
            updateData.author = author;
        }

        const quote = await Quote.findByIdAndUpdate(id, updateData, { new: true });
        return res.status(200).json({success:true,data:quote,message:"Quote is updated successfully."});
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// delete 
export const deleteQuote=async(req,res)=>{
    try {
        const {id}=req.params;
        const quote=await Quote.findByIdAndDelete(id);
        if(!quote){
            return res.status(400).json({success:false,error:"Quote record not found "});
        }
        return res.status(200).json({ success: true, data: quote, message: "Quote is deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}