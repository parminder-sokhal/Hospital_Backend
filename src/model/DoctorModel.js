import mongoose from "mongoose";
import BaseModelSchema from "./BaseModel.js";

const Schema = mongoose.Schema;
const doctorSchema = new Schema({
  name: { type: String, required: true },
  image: {
    public_id: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null, // Default to null if not provided
    },
  },
  specialization: { type: String, required: true },
  hospital: { type: String },
  about: { type: String },
  qualification: { type: String },
  awards: { type: String },
  experience: { type: Number },
  fees: { type: Number },
  availability: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  contact: {
    phone: { type: String },
    email: { type: String, unique: true },
  },
  slots: {
    type: [String], // Example: ['10:00 AM', '10:30 AM', '11:00 AM']
    default:  ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', ],
  },


  ...BaseModelSchema.obj, // Include the base model schema fields
});

const DOctor = mongoose.model("Doctor", doctorSchema);

export default DOctor;
