import { Router } from 'express';
import NotificationService from './notification.service.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import ApiResponse from '../../utils/apiResponse.js';

const router = Router();

router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const notifications = await NotificationService.getUserNotifications(req.user.id);
    return ApiResponse.success(res, 'Notifications retrieved.', { notifications });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/read', async (req, res, next) => {
  try {
    const notification = await NotificationService.markAsRead(req.params.id, req.user.id);
    return ApiResponse.success(res, 'Notification marked as read.', { notification });
  } catch (err) {
    next(err);
  }
});

export default router;
