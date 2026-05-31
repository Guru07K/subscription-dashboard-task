import mongoose, { Document, Schema } from 'mongoose';

export interface IPlan extends Document {
  name: string;
  price: number;
  features: string[];
  duration: number;
}

const planSchema = new Schema<IPlan>(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    features: [
      {
        type: String,
      },
    ],

    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model<IPlan>('Plan', planSchema);

export default Plan;
