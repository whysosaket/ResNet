import mongoose from "mongoose";

const agencySchema = new mongoose.Schema({
  agencyID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true, unique: true },
  location: { type: [Number], index: { type: "2dsphere", sparse: true } },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  distance: { type: mongoose.Decimal128, default: 0 },
});

export default mongoose.model("agency", agencySchema);
