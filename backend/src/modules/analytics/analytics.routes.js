import { Router } from 'express';
import AnalyticsController from './analytics.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/rbac.middleware.js';

const router = Router();

router.use(authenticate);
router.get('/dashboard', authorize('ADMIN', 'COMPANY'), AnalyticsController.getDashboard);

export default router;
