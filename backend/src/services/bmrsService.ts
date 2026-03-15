import axios from 'axios';

// BMRS Elexon API - stream endpoints per assignment doc
// Docs: https://bmrs.elexon.co.uk/api-documentation/endpoint/datasets/FUELHH/stream
//       https://bmrs.elexon.co.uk/api-documentation/endpoint/datasets/WINDFOR/stream
const BASE_URL = 'https://data.elexon.co.uk/bmrs/api/v1/datasets';

interface FuelHHRow {
  startTime: string;
  publishTime: string;
  generation: number;
}

interface WindForRow {
  startTime: string;
  publishTime: string;
  generation: number;
}

/** Actual wind generation - FUELHH/stream, fuelType WIND, 30-min resolution */
export async function fetchActualWindData(): Promise<FuelHHRow[]> {
  const { data } = await axios.get<FuelHHRow[]>(
    `${BASE_URL}/FUELHH/stream`,
    {
      params: {
        settlementDateFrom: '2024-01-01',
        settlementDateTo: '2024-01-31',
        fuelType: 'WIND',
      },
    }
  );
  return Array.isArray(data) ? data : [];
}

/** Forecast wind generation - WINDFOR/stream, Jan 2024, horizon 0-48 hrs filtered in ingestion */
export async function fetchForecastWindData(): Promise<WindForRow[]> {
  const { data } = await axios.get<WindForRow[]>(
    `${BASE_URL}/WINDFOR/stream`,
    {
      params: {
        publishDateTimeFrom: '2024-01-01T00:00:00Z',
        publishDateTimeTo: '2024-01-31T23:59:59Z',
      },
    }
  );
  return Array.isArray(data) ? data : [];
}
