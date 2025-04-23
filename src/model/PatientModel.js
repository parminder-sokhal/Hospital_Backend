import mongoose from 'mongoose';
import BaseModelSchema from './BaseModel';

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  contact: {
    phone: { type: String },
    email: { type: String, unique: true },
    address: { type: String }
  },
  bloodGroup: { type: String },

  ...BaseModelSchema.obj, // Include the base model schema fields
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;

