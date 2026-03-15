import { Request, Response } from 'express';
import { ActualGeneration } from '../models/actualModel';
import { ForecastGeneration } from '../models/forecastModel';

export async function getGenerationData(req: Request, res: Response): Promise<void> {
  try {
    const { start, end, horizon } = req.query;

    const startTime = start ? new Date(start as string) : null;
    const endTime = end ? new Date(end as string) : null;
    const horizonHours = horizon ? parseInt(horizon as string, 10) : null;

    if (!startTime || isNaN(startTime.getTime())) {
      res.status(400).json({ error: 'Invalid or missing start date' });
      return;
    }
    if (!endTime || isNaN(endTime.getTime())) {
      res.status(400).json({ error: 'Invalid or missing end date' });
      return;
    }
    if (horizonHours === null || isNaN(horizonHours) || horizonHours < 0) {
      res.status(400).json({ error: 'Invalid or missing horizon (must be non-negative integer)' });
      return;
    }

    const actuals = await ActualGeneration.find({
      startTime: { $gte: startTime, $lte: endTime },
    }).sort({ startTime: 1 });

    const results = await Promise.all(
      actuals.map(async (actual) => {
        const cutoff = new Date(actual.startTime.getTime() - horizonHours * 3600000);

        const forecast = await ForecastGeneration.findOne({
          startTime: actual.startTime,
          publishTime: { $lte: cutoff },
        }).sort({ publishTime: -1 });

        return {
          time: actual.startTime.toISOString(),
          actual: actual.generation,
          forecast: forecast?.generation ?? null,
        };
      })
    );

    res.json(results);
  } catch (err) {
    console.error('getGenerationData error:', err);
    res.status(500).json({ error: 'Failed to fetch generation data' });
  }
}
