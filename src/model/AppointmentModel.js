import mongoose from 'mongoose';
import BaseModelSchema from './BaseModel.js';

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    timeSlot: {
      type: String,
      required: true,
    },
    symptoms: { type: String },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
    ...BaseModelSchema.obj, // Include the base model schema fields
  });
  

  const Appointment = mongoose.model('Appointment', appointmentSchema);

  export default Appointment;
  