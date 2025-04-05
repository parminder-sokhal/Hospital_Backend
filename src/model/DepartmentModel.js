import mongoose from 'mongoose';
import BaseModelSchema from './BaseModel';

const Schema = mongoose.Schema;
const departmentSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    ...BaseModelSchema.obj, // Include the base model schema fields
  });
  
  const Department = mongoose.model('Department', departmentSchema);

  export default Department;