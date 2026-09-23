import { Router } from 'express';
import CompanyController from './company.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/rbac.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { updateCompanyProfileSchema } from './company.schema.js';

const router = Router();

router.use(authenticate);
router.use(authorize('COMPANY'));

router.get('/profile', CompanyController.getProfile);
router.put('/profile', validate(updateCompanyProfileSchema), CompanyController.updateProfile);
router.get('/stats', CompanyController.getStats);
router.get('/drives', CompanyController.getDrives);
router.get('/applicants', CompanyController.getApplicants);
router.post('/applications/:applicationId/shortlist', CompanyController.shortlistApplicant);
router.post('/applications/:applicationId/reject', CompanyController.rejectApplicant);

export default router;
