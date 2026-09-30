import mongoose, { Schema, Document } from 'mongoose';
import { IAdmin } from './types.js';

export interface IAdminDocument extends Omit<IAdmin, 'id'>, Document {}

const AdminSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'Club Administrator' }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const AdminModel = mongoose.models.Admin || mongoose.model<IAdminDocument>('Admin', AdminSchema);
