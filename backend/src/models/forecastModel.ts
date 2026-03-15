import mongoose, { Document, Schema } from 'mongoose';

export interface IForecastGeneration extends Document {
  startTime: Date;
  publishTime: Date;
  generation: number;
  horizonHours: number;
}

const forecastGenerationSchema = new Schema<IForecastGeneration>(
  {
    startTime: { type: Date, required: true },
    publishTime: { type: Date, required: true },
    generation: { type: Number, required: true },
    horizonHours: { type: Number, required: true },
  },
  { timestamps: false }
);

forecastGenerationSchema.index({ startTime: 1, publishTime: -1 });

export const ForecastGeneration = mongoose.model<IForecastGeneration>(
  'ForecastGeneration',
  forecastGenerationSchema
);
