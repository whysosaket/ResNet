import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    name:{type: String, required: true},
    email:{type:String , required: true, unique:true},
    mobile:{type:Number, required: true, unique:true},
    date:{type:Date, default: Date.now },
    password:{type:String, required:true},
    points:{type:Number, default: 100}
});


export default mongoose.model("user", userSchema);