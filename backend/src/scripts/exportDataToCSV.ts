import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fetchActualWindData, fetchForecastWindData } from '../services/bmrsService';

async function run(): Promise<void> {
    const analysisDir = path.resolve(__dirname, '../../../analysis');

    if (!fs.existsSync(analysisDir)) {
        fs.mkdirSync(analysisDir, { recursive: true });
    }

    // --- Actual Data Export ---
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
        startTime: new Date(row.startTime).toISOString(),
        generation: row.generation,
    }));

    if (actualDocs.length > 0) {
        const csvHeader = 'startTime,generation\n';
        const csvContent = actualDocs.map(r => `${r.startTime},${r.generation}`).join('\n');
        fs.writeFileSync(path.join(analysisDir, 'actual_wind.csv'), csvHeader + csvContent, 'utf-8');
        console.log(`Exported ${actualDocs.length} actual records to actual_wind.csv`);
    }

    // --- Forecast Data Export ---
    console.log('Fetching forecast data...');
    const forecastRows = await fetchForecastWindData();

    const forecastDocs: Array<{
        startTime: string;
        publishTime: string;
        generation: number;
        horizonHours: number;
    }> = [];

    for (const row of forecastRows) {
        const startTime = new Date(row.startTime);
        const publishTime = new Date(row.publishTime);
        const horizonHours = (startTime.getTime() - publishTime.getTime()) / 3600000;

        if (horizonHours >= 0 && horizonHours <= 48) {
            forecastDocs.push({
                startTime: startTime.toISOString(),
                publishTime: publishTime.toISOString(),
                generation: row.generation ?? 0,
                horizonHours: Math.round(horizonHours * 100) / 100,
            });
        }
    }

    if (forecastDocs.length > 0) {
        const csvHeader = 'startTime,publishTime,generation,horizonHours\n';
        const csvContent = forecastDocs.map(r => `${r.startTime},${r.publishTime},${r.generation},${r.horizonHours}`).join('\n');
        fs.writeFileSync(path.join(analysisDir, 'forecast_wind.csv'), csvHeader + csvContent, 'utf-8');
        console.log(`Exported ${forecastDocs.length} forecast records to forecast_wind.csv`);
    }

    console.log('CSV Export complete.');
}

run()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
