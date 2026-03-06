import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        default:"Admin",
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    role:{
        type:String,
        enum:['admin','editor'],
        default:'admin'
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

userSchema.pre('save',async(next)=>{
    if(!this.isModified('password')){
        return next();
    }
    
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

// compare the password
userSchema.methods.comparePassword=async (candidatePassword)=>{
    return await bcrypt.compare(candidatePassword,this.password);
}

export const User=mongoose.model('User',userSchema);