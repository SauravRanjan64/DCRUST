import { Router } from 'express';
import ResumeController from './resume.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/rbac.middleware.js';
import { handleResumeUpload } from '../../middleware/upload.middleware.js';

const router = Router();

router.use(authenticate);

// Student resume endpoints
router.get('/', authorize('STUDENT'), ResumeController.getResume);
router.post('/upload', authorize('STUDENT'), handleResumeUpload, ResumeController.uploadResume);
router.delete('/', authorize('STUDENT'), ResumeController.deleteResume);
router.post('/match', authorize('STUDENT', 'COMPANY', 'ADMIN'), ResumeController.matchResume);

export default router;
