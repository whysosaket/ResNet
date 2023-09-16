import mongoose from "mongoose";

const requestScehma= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    location: { type: [Number], index: { type: '2dsphere', sparse: true}},
    date:{type:Date, default: Date.now},
    type:{type:String},
    agency:[{type:mongoose.Schema.Types.ObjectId,
         ref:'agency'}]
})