import { Router } from 'express';
import AuditService from './audit.service.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/rbac.middleware.js';
import ApiResponse from '../../utils/apiResponse.js';

const router = Router();

router.use(authenticate);
router.use(authorize('ADMIN'));

router.get('/', async (req, res, next) => {
  try {
    const auditLogs = await AuditService.getLogs(req.query);
    return ApiResponse.success(res, 'Audit logs retrieved.', { auditLogs });
  } catch (err) {
    next(err);
  }
});

export default router;
