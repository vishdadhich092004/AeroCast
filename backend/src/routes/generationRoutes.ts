import { Router } from 'express';
import { getGenerationData } from '../controllers/generationController';

const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok', message: 'AeroCast API running' }));
router.get('/generation', getGenerationData);

export default router;
