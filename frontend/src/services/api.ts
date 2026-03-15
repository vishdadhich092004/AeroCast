import axios from 'axios'
import type { GenerationData } from '../types/generation'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

/** Format datetime for API - BMRS data is in UTC, so we treat picker values as UTC */
function formatForApi(value: string): string {
  if (value.includes('T')) {
    const withSeconds = value.length === 16 ? `${value}:00` : value
    return `${withSeconds}Z`
  }
  return `${value}T00:00:00.000Z`
}

export async function getGenerationData(
  start: string,
  end: string,
  horizon: number
): Promise<GenerationData[]> {
  const { data } = await api.get<GenerationData[]>('/generation', {
    params: { start: formatForApi(start), end: formatForApi(end), horizon },
  })
  return data
}
