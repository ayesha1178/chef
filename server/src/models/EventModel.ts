import mongoose, { Schema, Document } from 'mongoose';
import { IEvent } from './types.js';

export interface IEventDocument extends Omit<IEvent, 'id'>, Document {}

const EventSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { 
      type: String, 
      required: true,
      enum: [
        'Competition', 
        'Workshop', 
        'Hackathon', 
        'Tech Talk', 
        'Seminar', 
        'Cultural', 
        'Networking', 
        'Club Activity'
      ]
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    registrationDeadline: { type: String, required: true },
    capacity: { type: Number, required: true, min: 1 },
    featured: { type: Boolean, default: false },
    edition: { type: String, default: 'VOL. 26' },
    highlights: [{ type: String }],
    organizer: {
      team: { type: String, default: 'VANTA Core Crew' },
      lead: { type: String, default: 'Club President' },
      contactEmail: { type: String, default: 'events@vanta.club' }
    }
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

export const EventModel = mongoose.models.Event || mongoose.model<IEventDocument>('Event', EventSchema);
