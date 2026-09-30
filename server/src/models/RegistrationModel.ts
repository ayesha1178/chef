import mongoose, { Schema, Document } from 'mongoose';
import { IRegistration } from './types.js';

export interface IRegistrationDocument extends Omit<IRegistration, 'id'>, Document {}

const RegistrationSchema: Schema = new Schema(
  {
    eventId: { type: String, required: true, index: true },
    eventName: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    collegeYear: { type: String, required: true },
    phone: { type: String, required: true, trim: true },
    department: { type: String, trim: true },
    ticketId: { type: String, required: true, unique: true },
    registeredAt: { type: String, default: () => new Date().toISOString() },
    status: { type: String, enum: ['Confirmed', 'Waitlisted', 'Cancelled'], default: 'Confirmed' }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

RegistrationSchema.index({ eventId: 1, email: 1 });

export const RegistrationModel = mongoose.models.Registration || mongoose.model<IRegistrationDocument>('Registration', RegistrationSchema);
