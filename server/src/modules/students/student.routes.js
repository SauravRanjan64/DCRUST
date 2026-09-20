import { Router } from 'express';
import StudentController from './student.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/rbac.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { updateStudentProfileSchema } from './student.schema.js';

const router = Router();

router.use(authenticate);

router.get('/profile', authorize('STUDENT'), StudentController.getProfile);
router.put('/profile', authorize('STUDENT'), validate(updateStudentProfileSchema), StudentController.updateProfile);
router.get('/stats', authorize('STUDENT'), StudentController.getStats);

export default router;
