import mongoose, { Schema } from 'mongoose';

const BaseModelSchema = new mongoose.Schema({
  deletedAt: { type: Date },
  isdeleted: { type: Boolean, default: false },
  deletedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  isLive: { type: Boolean, default: true },
},
{
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

export default BaseModelSchema; 
