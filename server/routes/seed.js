import express from 'express';
import { seedDb } from '../controllers/seed.js';

const router = express.Router();

router.post('/', seedDb);

export default router;
