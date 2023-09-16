import mongoose from "mongoose"

const agentSchema=new mongoose.Schema({
    name:{type: String, required: true},
    email:{type:String , required: true, unique:true},
    mobile:{type:Number, required: true, unique:true},
    date:{type:Date, default: Date.now },
    password:{type:String, required:true},
    agency:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'agency'
    }
})
export default mongoose.model("agent", agentSchema)