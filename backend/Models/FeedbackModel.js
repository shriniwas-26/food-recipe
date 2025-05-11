import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema({
   
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    }
},{timestamps: true});

const feedbackModel = mongoose.model("Feedback",feedbackSchema);
export default feedbackModel;