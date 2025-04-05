import mongoose from 'mongoose';
import BaseModelSchema from './BaseModel';

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointmentDate: { type: Date, required: true },
    symptoms: { type: String },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
    createdAt: { type: Date, default: Date.now },
    ...BaseModelSchema.obj, // Include the base model schema fields
  });
  

  const Appointment = mongoose.model('Appointment', appointmentSchema);

  export default Appointment;
  