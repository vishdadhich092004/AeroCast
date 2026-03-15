import axios from 'axios'
import type { GenerationData } from '../types/generation'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

export async function getGenerationData(
  start: string,
  end: string,
  horizon: number
): Promise<GenerationData[]> {
  const { data } = await api.get<GenerationData[]>('/generation', {
    params: { start, end, horizon },
  })
  return data
}
