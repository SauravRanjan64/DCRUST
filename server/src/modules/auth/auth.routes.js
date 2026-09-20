import { Router } from 'express';
import AuthController from './auth.controller.js';
import { validate } from '../../middleware/validate.middleware.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authLimiter } from '../../middleware/rateLimiter.js';
import { loginSchema, consentSchema } from './auth.schema.js';

const router = Router();

router.post('/login', authLimiter, validate(loginSchema), AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/me', authenticate, AuthController.getMe);
router.post('/refresh', authenticate, AuthController.refresh);
router.post('/consent', authenticate, validate(consentSchema), AuthController.recordConsent);

export default router;
