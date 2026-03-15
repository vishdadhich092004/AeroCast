import mongoose, { Document, Schema } from 'mongoose';

export interface IActualGeneration extends Document {
  startTime: Date;
  generation: number;
}

const actualGenerationSchema = new Schema<IActualGeneration>(
  {
    startTime: { type: Date, required: true },
    generation: { type: Number, required: true },
  },
  { timestamps: false }
);

actualGenerationSchema.index({ startTime: 1 });

export const ActualGeneration = mongoose.model<IActualGeneration>(
  'ActualGeneration',
  actualGenerationSchema
);
