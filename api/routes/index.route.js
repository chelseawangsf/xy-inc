import express from 'express';
import poiRoutes from './poi.route';

const router = express.Router();

// mount pois routes at /pois
router.use('/pois', poiRoutes);

export default router;
