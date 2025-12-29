import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    credits:{
        type:Number,
        default:20,
    }
})
//Hash the password before saving it to database
userSchema.pre('save', async function (){
    // Only hash the password if it has been modified (or is new)
    if(!this.isModified('password')){
        return;
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const user = mongoose.model('User', userSchema);

export default user;