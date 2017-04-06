import express from 'express';
import poiRoutes from './poi.route';

const router = express.Router(); // eslint-disable-line new-cap

router.use('/pois', poiRoutes);

export default router;
