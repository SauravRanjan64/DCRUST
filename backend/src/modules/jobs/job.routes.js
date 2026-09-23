import { Router } from 'express';
import JobController from './job.controller.js';
import ApplicationController from '../applications/application.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/rbac.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createJobSchema, updateJobSchema, queryJobSchema } from './job.schema.js';

const router = Router();

// Public / Authenticated list & details
router.get('/', validate(queryJobSchema, 'query'), JobController.getJobs);
router.get('/:id', JobController.getJobById);

// Eligibility check (Requirement #30)
router.get('/:jobId/eligibility', authenticate, authorize('STUDENT'), JobController.checkEligibility);

// Direct apply route under jobs (Requirement #31)
router.post('/:jobId/apply', authenticate, authorize('STUDENT'), ApplicationController.applyToJob);

// Admin & Company routes for creating & updating jobs
router.post('/', authenticate, authorize('ADMIN', 'COMPANY'), validate(createJobSchema), JobController.createJob);
router.put('/:id', authenticate, authorize('ADMIN', 'COMPANY'), validate(updateJobSchema), JobController.updateJob);

export default router;
