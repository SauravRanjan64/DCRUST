import { Router } from 'express';
import AdminController from './admin.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/rbac.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createJobSchema } from '../jobs/job.schema.js';

const router = Router();

router.use(authenticate);
router.use(authorize('ADMIN'));

router.get('/stats', AdminController.getStats);
router.get('/students', AdminController.getStudents);
router.get('/companies', AdminController.getCompanies);
router.patch('/companies/:id/verify', AdminController.verifyCompany);
router.get('/jobs', AdminController.getJobs);
router.post('/jobs', validate(createJobSchema), AdminController.createJob);
router.get('/applications', AdminController.getApplications);
router.get('/applications/export', AdminController.exportCsv);
router.get('/exports/csv', AdminController.exportCsv); // Compatibility alias
router.get('/audit', AdminController.getAuditLogs);

export default router;
