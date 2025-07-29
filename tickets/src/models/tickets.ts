import mongoose, { Document, Schema } from 'mongoose';

interface ITicketBase {
  title: string;
  price: number;
  userId: string;
}

export interface ITicketInput extends ITicketBase {}

export interface ITicketDocument extends ITicketBase, Document {
  createdAt: string;
  updatedAt: string;
}

const ticketSchema: Schema<ITicketDocument> = new Schema<ITicketDocument>(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const TicketModel = mongoose.model<ITicketDocument>(
  'Ticket',
  ticketSchema
);
