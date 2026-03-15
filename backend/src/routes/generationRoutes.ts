import { Router } from 'express';
import { getGenerationData } from '../controllers/generationController';

const router = Router();

router.get('/generation', getGenerationData);

export default router;
