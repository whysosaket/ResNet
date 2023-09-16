import mongoose from "mongoose";

const requestSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    location: { type: [Number], index: { type: '2dsphere', sparse: true}},
    date:{type:Date, default: Date.now},
    type:[{type:String, required:true}],
    agency:[{type:mongoose.Schema.Types.ObjectId,
         ref:'agency'}]
})
export default mongoose.model("request", requestSchema);