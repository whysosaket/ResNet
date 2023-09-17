import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  requestID: { type: String, required: true, unique: true },
  location: { type: [Number], index: { type: "2dsphere", sparse: true } },
  date: { type: Date, default: Date.now },
  type: [{ type: String, required: true }],
  image: {
    type: String,
  },
  victims: {
    type: String,
  },
  severity: {
    type: Number,
  },
  details: {
    type: String
  },
  agency: [{ type: mongoose.Schema.Types.ObjectId, ref: "agency" }],
  status: { type: String, default: "pending" },
});
export default mongoose.model("request", requestSchema);
