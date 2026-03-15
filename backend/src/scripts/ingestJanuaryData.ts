import 'dotenv/config';
import { connectDB } from '../config/db';
import { ActualGeneration } from '../models/actualModel';
import { ForecastGeneration } from '../models/forecastModel';
import { fetchActualWindData, fetchForecastWindData } from '../services/bmrsService';

async function run(): Promise<void> {
  await connectDB();

  // Step 1: Clear existing data
  await ActualGeneration.deleteMany({});
  await ForecastGeneration.deleteMany({});

  // Step 2: Fetch and insert actual wind data
  console.log('Fetching actual wind data...');
  const actualRows = await fetchActualWindData();

  // Deduplicate by startTime - keep latest publishTime (final outturn)
  const actualByStartTime = new Map<
    string,
    { startTime: string; generation: number; publishTime: string }
  >();
  for (const row of actualRows) {
    const existing = actualByStartTime.get(row.startTime);
    if (!existing || row.publishTime > existing.publishTime) {
      actualByStartTime.set(row.startTime, {
        startTime: row.startTime,
        generation: row.generation ?? 0,
        publishTime: row.publishTime,
      });
    }
  }

  const actualDocs = Array.from(actualByStartTime.values()).map((row) => ({
    startTime: new Date(row.startTime),
    generation: row.generation,
  }));

  if (actualDocs.length > 0) {
    await ActualGeneration.insertMany(actualDocs);
  }
  console.log(`Inserted ${actualDocs.length} actual records`);

  // Step 3: Fetch and insert forecast data (horizon 0-48 hrs)
  console.log('Fetching forecast data...');
  const forecastRows = await fetchForecastWindData();

  const forecastDocs: Array<{
    startTime: Date;
    publishTime: Date;
    generation: number;
    horizonHours: number;
  }> = [];

  for (const row of forecastRows) {
    const startTime = new Date(row.startTime);
    const publishTime = new Date(row.publishTime);
    const horizonHours = (startTime.getTime() - publishTime.getTime()) / 3600000;

    if (horizonHours >= 0 && horizonHours <= 48) {
      forecastDocs.push({
        startTime,
        publishTime,
        generation: row.generation ?? 0,
        horizonHours: Math.round(horizonHours * 100) / 100,
      });
    }
  }

  if (forecastDocs.length > 0) {
    await ForecastGeneration.insertMany(forecastDocs);
  }
  console.log(`Inserted ${forecastDocs.length} forecast records`);

  console.log('Ingestion complete.');
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
