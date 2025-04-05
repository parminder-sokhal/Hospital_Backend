import mongoose from "mongoose";
import BaseModelSchema from "./BaseModel";

const Schema = mongoose.Schema;
const doctorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialization: { type: String, required: true },
  qualification: { type: String },
  experience: { type: Number },
  contact: {
    phone: { type: String },
    email: { type: String, unique: true },
  },
  department: { type: Schema.Types.ObjectId, ref: "Department" },
  createdAt: { type: Date, default: Date.now },

  ...BaseModelSchema.obj, // Include the base model schema fields
});

const DOctor = mongoose.model("Doctor", doctorSchema);

export default DOctor;
